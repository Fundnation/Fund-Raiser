import Array "mo:base/Array";
import Database "./database";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Types "./types";

import Blob     "mo:base/Blob";
import Nat8     "mo:base/Nat8";
import Nat32    "mo:base/Nat32";

import Hex      "./hex";

module {
  type NewUserProfile = Types.NewUserProfile;
  type Profile = Types.Profile;
  type Project = Types.Project;
  type ProjectId = Types.ProjectId;
  type ProjectWithOwner = Types.ProjectWithOwner;
  type UserId = Types.UserId;

  // Profiles

  public func getProfile(db: Database.Directory, userId: UserId): Profile {
    let existing = db.getUser(userId);
    switch (existing) {
      case (?existing) { existing };
      case (null) {
        {
          bio = "";
          firstName = "";
          id = userId;
          img = "";
          lastName = "";
        }
      };
    };
  };

  // Projects

  public func getProject(db: Database.Directory, projectId: ProjectId): Project {
    let existing = db.getProject(projectId);
    switch (existing) {
      case (?existing) { existing };
      case (null) {
        {
          category = "";
          cover = "";
          description = "";
          goal = 0;
          id = "";
          owner = Principal.fromText("");
          rewards = "";
          status= null;
          story = "";
          tags = [];
          title = "";
          walletId = "";
        }
      };
    };
  };

  public func getProjectWithOwner(db: Database.Directory, p: Project): ProjectWithOwner {
    {
      project =p;
      owner = getProfile(db, p.owner);
    }
  };

  // Connections

  public func includes(x: UserId, xs: [UserId]): Bool {
    func isX(y: UserId): Bool { x == y };
    switch (Array.find<UserId>(xs, isX)) {
      case (null) { false };
      case (_) { true };
    };
  };

  // Authorization

  let adminIds: [Text] = [
    "r2elc-owpqf-3nhtr-uttt5-xza37-y4xlk-cfns7-xuwkj-h7e52-uojwc-iqe",
    "r2elc-owpqf-3nhtr-uttt5-xza37-y4xlk-cfns7-xuwkj-h7e52-uojwc-iqe",
    "wumae-66jd7-ml547-4s7j2-hvkod-oocmx-sj3tc-6fjhr-cbgvu-thpm3-kae", // Luke's local default
    "st2gz-phs6f-4w7d2-b625f-rh5vn-lumml-wxbhq-lcxnw-ob7yh-fhhwp-zqe", // Max's internet identity
    "ryjl3-tyaaa-aaaaa-aaaba-cai"
  ];

  public func isAdmin(userId: UserId): Bool {
    func identity(x: Text): Bool { x == Principal.toText(userId) };
    Option.isSome(Array.find<Text>(adminIds,identity))
  };

  public func hasAccess(userId: UserId, profile: Profile): Bool {
    userId == profile.id or isAdmin(userId)
  };

  public func hasProjectAccess(userId: UserId, project: Project): Bool {
    userId == project.owner or isAdmin(userId)
  };


  type AccountId = Types.AccountId;
    type AccountIdText = Types.AccountIdText;
    type Subaccount = Types.Subaccount;
    type SubaccountBlob = Types.SubaccountBlob;
    type SubaccountNat8Arr = Types.SubaccountNat8Arr;

    // Account helpers 

    public func accountIdToHex (a : AccountId) : AccountIdText {
        Hex.encode(Blob.toArray(a));
    };

    public func hexToAccountId (h : AccountIdText) : AccountId {
        Blob.fromArray(Hex.decode(h));
    };    

    public func defaultSubaccount () : SubaccountBlob {
        Blob.fromArrayMut(Array.init(32, 0 : Nat8))
    };

    public func natToBytes (n : Nat) : [Nat8] {
        nat32ToBytes(Nat32.fromNat(n));
    };

    public func nat32ToBytes (n : Nat32) : [Nat8] {
        func byte(n: Nat32) : Nat8 {
            Nat8.fromNat(Nat32.toNat(n & 0xff))
        };
        [byte(n >> 24), byte(n >> 16), byte(n >> 8), byte(n)]
    };

    public func subToSubBlob (sub : Subaccount) : SubaccountBlob {
        let n_byte = func(i : Nat) : Nat8 {
            assert(i < 32);
            let shift : Nat = 8 * (32 - 1 - i);
            Nat8.fromIntWrap(sub / 2**shift)
        };
        Blob.fromArray(Array.tabulate<Nat8>(32, n_byte))
    };

    public func subBlobToSubNat8Arr (sub : SubaccountBlob) : SubaccountNat8Arr {
        let subZero : [var Nat8] = [var 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        let subArray = Blob.toArray(sub);
        let sizeDiff = subZero.size()-subArray.size();
        var i = 0;
        while (i < subZero.size()) {
            if (i >= sizeDiff) {
                subZero[i] := subArray[i - sizeDiff];
            };
            i += 1;
        };
        Array.freeze<Nat8>(subZero);
    };
};