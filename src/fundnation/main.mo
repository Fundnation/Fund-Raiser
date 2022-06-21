import Array            "mo:base/Array";
import Debug            "mo:base/Debug";
import Database         "./database";
import Error            "mo:base/Error";
import Iter             "mo:base/Iter";
import Nat              "mo:base/Nat";
import Principal        "mo:base/Principal";
import Text             "mo:base/Text";
import Trie             "mo:base/Trie";
import Account          "./account";
import Result           "mo:base/Result";
import Types            "./types";
import Utils            "./utils";
import Nat64            "mo:base/Nat64";
import Time             "mo:base/Time";
import Buffer           "mo:base/Buffer";

actor FundNation { 
    type NewUserProfile = Types.NewUserProfile;
    type NewProject = Types.NewProject;
    type Profile = Types.Profile;
    type Project = Types.Project;
    type ProjectId = Types.ProjectId;
    type ProjectStatus = Types.ProjectStatus;
    type ProjectWithOwner = Types.ProjectWithOwner;
    type UserId = Types.UserId;

    type EMProjectId = Nat;
    type EMCanisterId = Principal; 

    stable var users        : [(UserId, Profile)]               = [];
    stable var projects     : [(ProjectId, Project)]            = [];
    stable var userProjects : [(UserId, [ProjectId])]           = [];
    stable var nextProject  : Nat                               = 0;

    // Main database
    var db: Database.Directory = Database.Directory();

    // Upgrade functions
    system func preupgrade() {
        users           := db.getUserArray();
        projects        := db.getProjectArray();
        userProjects    := db.getUserToProjectArray();
        nextProject     := db.projectIdGenerator;
    };

    system func postupgrade() {
        db.initializeUserMap(users);
        db.initializeProjectMap(projects);
        db.initializeUserToProjectMap(userProjects);
        db.projectIdGenerator := nextProject;
        Debug.print(Nat.toText(nextProject));
        users := [];
        projects := [];
        userProjects := [];
    };
    
    type Date = Text;
    stable var launchDates : Trie.Trie<ProjectId, Date> = Trie.empty();
    func eqDate (a: Date, b: Date) : Bool { a == b };
    func getProjectIdkey (pid: ProjectId) : Trie.Key<ProjectId> {
        { key = pid; hash = Text.hash(pid); };
    };
    public shared(msg) func putLaunchDate(pid: ProjectId, date: Date) : async () {
        assert(Utils.isAdmin(msg.caller));
        launchDates := Trie.put<ProjectId, Date>(launchDates, getProjectIdkey(pid), eqDate, date).0;
    };
    public query func getLaunchDate(pid: ProjectId) : async ?Date {
        Trie.get<ProjectId, Date>(launchDates, getProjectIdkey(pid), eqDate);
    };

    public func healthcheck(): async Bool { true };

    public shared(msg) func greet(): async Text {
        "Hello " # Utils.getProfile(db, msg.caller).firstName # "!"
    };


    public shared query(msg) func getMyProfile(): async Profile {
        Utils.getProfile(db, msg.caller)
    };

    public shared(msg) func createProfile(profile: NewUserProfile): async () {
        db.createOne(msg.caller, profile);
    };

    public shared(msg) func adminCreateProfile(principal: Principal, profile: NewUserProfile): async () {
        assert(Utils.isAdmin(principal));
        db.createOne(principal, profile);
    };

    public shared(msg) func updateProfile(profile: Profile): async () {
        if(Utils.hasAccess(msg.caller, profile)) {
            db.updateOne(profile.id, profile);
        };
    };

    public query func getProfile(userId: UserId): async Profile {
        Utils.getProfile(db, userId)
    };

    public query func searchProfiles(term: Text): async [Profile] {
        db.findUserBy(term)
    };

    public shared query(msg) func getMyProjects() : async [Project] {
        db.getProjects(msg.caller)
    };

    public shared(msg) func createFirstProject(profile: NewUserProfile, project: NewProject): async Project {
        db.createOne(msg.caller, profile);
        db.createProject(msg.caller, project);
    };

    public shared(msg) func createProject(project: NewProject): async Project {
        db.createProject(msg.caller, project)
    };

    public shared(msg) func adminCreateProject(principal: Principal, project: NewProject): async Project {
        assert(Utils.isAdmin(msg.caller));
        db.createProject(principal, project)
    };

    public shared(msg) func updateProject(project: Project): async () {
        assert(Utils.hasProjectAccess(msg.caller, project));
        assert(Utils.isAdmin(msg.caller));
        db.updateProject(project);
    };

    public shared(msg) func deleteProject(projectId: ProjectId): async ?Project {
        assert(Utils.hasProjectAccess(msg.caller, await getProject(projectId)));
        db.deleteProject(projectId);
    };

    public query func getProject(projectId: ProjectId): async Project {
        Utils.getProject(db, projectId)
    };

    public query func getProjectWithOwner(projectId: ProjectId): async ProjectWithOwner {
        Utils.getProjectWithOwner(db, Utils.getProject(db, projectId))
    };

    public query func getProjectWithOwnerAndMarketplace(projectId: ProjectId): async {
        project: Project; owner: Profile; marketplaceLinks: MarketplaceLinks;
    } {
        let pAndO = Utils.getProjectWithOwner(db, Utils.getProject(db, projectId));
        switch(_getMarketplaceLinks(projectId)) {
            case (?links) { { project = pAndO.project; owner = pAndO.owner; marketplaceLinks = links; } };
            case (null) { { project = pAndO.project; owner = pAndO.owner; marketplaceLinks = []; }; };
        };
    };

    public query func getProjects(userId: UserId): async [Project] {
        db.getProjects(userId)
    };

    public query func listProjects(statuses: [ProjectStatus]): async [ProjectWithOwner] {
        func getProjectWithOwner(p: Project) : ProjectWithOwner { 
            Utils.getProjectWithOwner(db, p);
        };
        let projectsWithOwners = Array.map(db.listProjects(), getProjectWithOwner);
        switch (statuses.size()) { 
            case 0 { projectsWithOwners };
            case _ { Array.filter(projectsWithOwners, func (p: ProjectWithOwner) : Bool { 
                switch(Array.find(statuses, func (s: ProjectStatus) : Bool { s == p.project.status })) {
                    case null { false };
                    case _ { true };
                };
            }); 
            };
        };
    };

    public shared(msg) func approveProject(pid: ProjectId): async () {
        assert(Utils.isAdmin(msg.caller));
        switch (db.getProject(pid)) {
            case (?p) { 
                assert(p.status == ?#submitted);
                db.updateProjectStatus(p, ?#approved);
            };
            case null { throw Error.reject("No project with this id.") };
        };
    };

    public shared(msg) func unapproveProject(pid: ProjectId): async () {
        assert(Utils.isAdmin(msg.caller));
        switch (db.getProject(pid)) {
            case (?p) { 
                assert(p.status == ?#approved);
                db.updateProjectStatus(p, ?#submitted);
            };
            case null { throw Error.reject("No project with this id.") };
        }; 
    };

    public shared(msg) func closeProject(pid: ProjectId) : async () {
        assert(Utils.isAdmin(msg.caller));
        switch (db.getProject(pid)) {
            case (?p) { 
                assert(p.status == ?#whitelist or p.status == ?#live);
                db.updateProjectStatus(p, ?#approved);
            };
            case null { throw Error.reject("No project with this id.") };
        }; 
    };

    public shared(msg) func setProjectFullyFunded(pid: ProjectId): async () {
        assert(Utils.isAdmin(msg.caller));
        switch (db.getProject(pid)) {
            case (?p) { 
                assert(p.status == ?#whitelist or p.status == ?#live);
                db.updateProjectStatus(p, ?#fully_funded);
            };
            case null { throw Error.reject("No project with this id.") };
        };
    };

    public shared(msg) func archiveProject(pid: ProjectId): async () {
        assert(Utils.isAdmin(msg.caller));
        switch (db.getProject(pid)) {
            case (?p) { 
                assert(p.status == ?#whitelist or p.status == ?#live);
                db.updateProjectStatus(p, null);
            };
            case null { throw Error.reject("No project with this id.") };
        };
    };

    stable var whitelists   : Trie.Trie<ProjectId, [Principal]> = Trie.empty();

    public query func getWhitelist(pid: ProjectId): async [Principal] {
        _getWhitelist(pid);
    };
    public shared(msg) func addWhitelist(pid: ProjectId, principals: [Principal]): async () {
        //assert(Utils.isAdmin(msg.caller));
        switch (Trie.get<ProjectId, [Principal]>(whitelists, projectIdKey(pid), Text.equal)) {
            case (?ps) {
                let newPs = Array.append<Principal>(ps, principals);
                whitelists := Trie.put<ProjectId, [Principal]>(whitelists, projectIdKey(pid), pidsAreEqual, newPs).0;
            };
            case null {
                whitelists := Trie.put<ProjectId, [Principal]>(whitelists, projectIdKey(pid), pidsAreEqual, principals).0;
            };
        };
    };
    public shared(msg) func resetWhitelist(pid: ProjectId): async () {
        assert(Utils.isAdmin(msg.caller));
        whitelists := Trie.put<ProjectId, [Principal]>(whitelists, projectIdKey(pid), pidsAreEqual, []).0;
    };

    type ProjectState = {
        #whitelist: [Principal];
        #live;
        #closed;
        #noproject;
    };
    public query func getProjectState(pid: ProjectId) : async ProjectState {
        switch (db.getProject(pid)) {
            case (?p) {
                switch (p.status) {
                    case (?#whitelist) {
                        let whitelist = _getWhitelist(pid);
                        #whitelist(whitelist);
                    };
                    case (?#live) {
                        #live;
                    };
                    case _ {
                        #closed;
                    };
                };
            };
            case null { #noproject };
        };
    };

    func _getWhitelist(pid: ProjectId) : [Principal] {
        switch (Trie.get<ProjectId, [Principal]>(whitelists, projectIdKey(pid), Text.equal)) {
            case (?principals) { principals;};
            case null { return []; };
        };
    };

    func pidsAreEqual(p1: ProjectId, p2: ProjectId) : Bool { p1 == p2 };
    func projectIdKey (p: ProjectId) : Trie.Key<ProjectId> {
        { key = p; hash = Text.hash(p) };
    };


    type MarketplaceLinks = Types.MarketplaceLinks;
    stable var marketplaceLinks : Trie.Trie<ProjectId, MarketplaceLinks> = Trie.empty();

    public query func getMarketplaceLinks(pid: ProjectId): async MarketplaceLinks {
        switch (_getMarketplaceLinks(pid)) {
            case (?links) { links; };
            case null { []; };
        };
    };

    public shared(msg) func setMarketplaceLinks(pid: ProjectId, links: MarketplaceLinks): async () {
        assert(Utils.isAdmin(msg.caller));
        marketplaceLinks := Trie.put<ProjectId, MarketplaceLinks>(marketplaceLinks, projectIdKey(pid), Text.equal, links).0;
    };

    func _getMarketplaceLinks(pid: ProjectId): ?MarketplaceLinks {
        Trie.get<ProjectId, MarketplaceLinks>(marketplaceLinks, projectIdKey(pid), Text.equal);
    };

    public shared query(msg) func getOwnId(): async UserId { msg.caller };

    public shared query(msg) func getOwnIdText(): async Text { Principal.toText(msg.caller) };

    public shared query(msg) func isAdmin(): async Bool {
        Utils.isAdmin(msg.caller)
    };
    
    type AccountBalanceArgs = Types.AccountBalanceArgs;  // defining datatypes
    type ICPTs = Types.ICPTs;
    type SendArgs = Types.SendArgs;

    let FEE : Nat64 = 5_000;
    let FundNation_ACCOUNT = "7db8cbc2ff6e575b414218d96b991ac0dee483509dc78c46b373bf8bf2f9f00d";


    // You need to input the ledger canister thats created
    let Ledger = actor "rrkah-fqaaa-aaaaa-aaaaq-cai" : actor { 
        send_dfx : shared SendArgs -> async Nat64;
        account_balance_dfx : shared query AccountBalanceArgs -> async ICPTs; //ledger canister
    };
    func getPrincipal () : Principal {
        return Principal.fromActor(FundNation);
    };
    func pay_func(amount : Nat64, projectId : ProjectId) : async (){
        let defaultAccountId = Account.getAccountId(getPrincipal(), Utils.defaultSubaccount());
        let ledger_id = Principal.fromText("ykvog-riaaa-aaaak-qaqxq-cai");
        let ledger_acc = Account.getAccountId(ledger_id, Utils.defaultSubaccount());

        func destruct() : async Text {
            let userdets = Utils.getProject(db, projectId);
            let {category; cover;  description;goal;id;owner;rewards;status;story;tags;title;walletId} = userdets;
            return walletId;
        };
        let walletid = await destruct();
        let trans = await Ledger.send_dfx({
            memo = Nat64.fromNat(0); 
            from_subaccount = ?Utils.subBlobToSubNat8Arr(defaultAccountId);
            to = Utils.accountIdToHex(Account.getAccountId(ledger_id,Utils.defaultSubaccount()));
            amount = {e8s = amount};
            created_at_time = Time.now();
        });
        let trans1 = await Ledger.send_dfx({
            memo = Nat64.fromNat(2); 
            from_subaccount = ?Utils.subBlobToSubNat8Arr(ledger_acc);
            to = walletid;
            amount = {e8s = amount - FEE} ;
            created_at_time = Time.now();
        });
        let trans2 = await Ledger.send_dfx({
            memo = Nat64.fromNat(0); 
            from_subaccount = ?Utils.subBlobToSubNat8Arr(ledger_acc);
            to = FundNation_ACCOUNT;
            amount = {e8s = amount - FEE} ;
            created_at_time = Time.now();

        });
    };
    public func pay(amount : Nat64, projectId : ProjectId) {
        let pay = await pay_func(amount,projectId);

    };

};
