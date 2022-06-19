import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Types "./types";
import Text "mo:base/Text";

module {
  //creating types for variiables that will be used in the program 
  type NewUserProfile = Types.NewUserProfile;
  type NewProject = Types.NewProject;
  type Profile = Types.Profile;
  type Project = Types.Project;
  type ProjectId = Types.ProjectId;
  type ProjectStatus = Types.ProjectStatus;
  type UserId = Types.UserId;
//creating a class for the database 
  public class Directory() {

    //creating immutable variables where data is going to be stored 
    let userMapping = HashMap.HashMap<UserId, Profile>(1, isEqUserId, Principal.hash); 
    let projectMapping = HashMap.HashMap<ProjectId, Project>(1, isEqProjectId, Text.hash);
    let userToProjectsMapping = HashMap.HashMap<UserId, [ProjectId]>(1, isEqUserId, Principal.hash);

    // Users

    public func createOne(userId: UserId, profile: NewUserProfile) {
      userMapping.put(userId, makeProfile(userId, profile));
    };

    public func updateOne(userId: UserId, profile: Profile) {
      userMapping.put(userId, profile);
    };

    public func getUser(userId: UserId): ?Profile {
      userMapping.get(userId)
    };

    public func getMultipleUsers(userIds: [UserId]): [Profile] {
      func getProfile(userId: UserId): Profile {
        switch (userMapping.get(userId)) {
          case null {
            {
              bio = "";
              id = userId;
              img = "";
              firstName = "";
              lastName = "";
            };
          };
          case (?profile) { profile };
        };
      };
      Array.map<UserId, Profile>(userIds, getProfile)
    };

    public func findUserBy(term: Text): [Profile] {
      var profiles : Buffer.Buffer<Profile> = Buffer.Buffer<Profile>(1);
      for ((id, profile) in userMapping.entries()) {
        let fullName = profile.firstName # " " # profile.lastName;
        if (includesText(fullName, term)) {
          profiles.add(profile);
        };
      };
      profiles.toArray();
    };

    // Projects 

    public func createProject(userId: UserId, newProject: NewProject): Project {
      let project = makeProject(userId, newProject);
      projectMapping.put(project.id, project);
      switch (userToProjectsMapping.get(userId)) {
        case (null) { userToProjectsMapping.put(userId, [project.id]); };
        case (?projects) { userToProjectsMapping.put(userId, Array.append<ProjectId>(projects, [project.id])); };
      };
      project;
    };

    public func deleteProject(projectId: ProjectId) : ?Project {
      let p = projectMapping.get(projectId);
      switch (p) {
        case null { };
        case (?project) {
          switch (userToProjectsMapping.get(project.owner)) {
            case null { };
            case (?projects) {
              func idsNotEqual (curId: ProjectId) : Bool { isEqProjectId(curId, projectId) != true };
              let newProjects = Array.filter<ProjectId>(projects, idsNotEqual);
              userToProjectsMapping.put(project.owner, newProjects);
            };
          };
        };
      };
      projectMapping.remove(projectId);
    };
    public func getProject(projectId: ProjectId): ?Project {
      projectMapping.get(projectId)
    };

    public func getProjects(userId: UserId): [Project] {
      switch (userToProjectsMapping.get(userId)) {
        case (null) { [] };
        case (?projects) {
          func getProject(projectId: ProjectId): Project {
            switch (projectMapping.get(projectId)) {
              case null {
                {
                  category = "";
                  cover = "";
                  description = "";
                  //discordLink = "";
                  goal = 0;
                  id = projectId;
                  //nftVolume = 0;
                  owner = userId;
                  rewards = "";
                  status = null;
                  story = "";
                  tags = [];
                  title = "";
                  //twitterLink = "";
                  walletId = "";
                  //wetransferLink = "";
                };
              };
              case (?project) { project };
            }
          };
          Array.map<ProjectId, Project>(projects, getProject)
        };
      };
    };

    public func listProjects() : [Project] {
      Iter.toArray(projectMapping.vals())
    };

    public func updateProject(project: Project) {
      projectMapping.put(project.id, project);
    };

    public func updateProjectStatus(project: Project, status: ProjectStatus) {
      projectMapping.put(project.id, {
        category = project.category;
        cover = project.cover;
        description = project.description;
        //discordLink = project.discordLink;
        goal = project.goal;
        id = project.id;
        //nftVolume = project.nftVolume;
        owner = project.owner;
        rewards = project.rewards;
        status = status;
        story = project.story;
        tags = project.tags;
        title = project.title;
        //twitterLink = project.twitterLink;
        walletId = project.walletId;
        //wetransferLink = project.wetransferLink;
      });
    };
    /*
    public query func seeProjetcs() {
      for(id) in projectMapping.entries(){
        return projectMapping.get(id)
      }
      
    }*/

    // Upgrade helpers

    public func getUserArray() : [(UserId, Profile)] {
      Iter.toArray(userMapping.entries())
    };

    public func getProjectArray() : [(ProjectId, Project)] {
      Iter.toArray(projectMapping.entries())
    };

    public func getUserToProjectArray() : [(UserId, [ProjectId])] {
      Iter.toArray(userToProjectsMapping.entries())
    };

    public func initializeUserMap(users: [(UserId, Profile)]) {
      for ((userId, profile) in users.vals()) {
        userMapping.put(userId, profile);
      };
    };

    public func initializeProjectMap(projects: [(ProjectId, Project)]) {
      for ((projectId, project) in projects.vals()) {
        projectMapping.put(projectId, project);
      };
    };

    public func initializeUserToProjectMap(userToProjects: [(UserId, [ProjectId])]) {
      for ((userId, projects) in userToProjects.vals()) {
        userToProjectsMapping.put(userId, projects);
      };
    };

    // Helpers

    func makeProfile(userId: UserId, profile: NewUserProfile): Profile {
      {
        bio = profile.bio;
        firstName = profile.firstName;
        id = userId;
        img = profile.img;
        lastName = profile.lastName;
      }
    };

    public var projectIdGenerator : Nat = 0;
    public func makeProject(userId: UserId, project: NewProject): Project {
      projectIdGenerator += 1;
      {
        category = project.category;
        cover = project.cover;
        description = project.description;
        //discordLink = project.discordLink;
        goal = project.goal;
        id = Nat.toText(projectIdGenerator);
        //nftVolume = project.nftVolume;
        owner = userId;
        rewards = project.rewards;
        status = ?#submitted;
        story = project.story;
        tags = project.tags; 
        title = project.title;
        //twitterLink = project.twitterLink;
        walletId = project.walletId;
        //wetransferLink = project.wetransferLink;
      };
    };

    func includesText(string: Text, term: Text): Bool {
      let stringArray = Iter.toArray<Char>(string.chars());
      let termArray = Iter.toArray<Char>(term.chars());

      var i = 0;
      var j = 0;

      while (i < stringArray.size() and j < termArray.size()) {
        if (stringArray[i] == termArray[j]) {
          i += 1;
          j += 1;
          if (j == termArray.size()) { return true; }
        } else {
          i += 1;
          j := 0;
        }
      };
      false
    };

    public func textToNat(t : Text) : ?Nat {
      var i : Nat = 0;
      while (i <= projectIdGenerator) {
        if (t == Nat.toText(i)) { return ?i; };
        i += 1;
      };
      return null;
    };

  };

  func isEqUserId(x: UserId, y: UserId): Bool { x == y };
  func isEqProjectId(x: ProjectId, y: ProjectId): Bool { x == y };
};
    