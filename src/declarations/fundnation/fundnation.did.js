export const idlFactory = ({ IDL }) => {
  const ProjectId__1 = IDL.Text;
  const Link = IDL.Text;
  const NewUserProfile = IDL.Record({
    'bio' : IDL.Text,
    'img' : Link,
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const NewProject = IDL.Record({
    'title' : IDL.Text,
    'goal' : IDL.Float64,
    'cover' : Link,
    'tags' : IDL.Vec(IDL.Text),
    'description' : IDL.Text,
    'story' : IDL.Text,
    'rewards' : IDL.Text,
    'category' : IDL.Text,
    'walletId' : IDL.Text,
  });
  const ProjectId = IDL.Text;
  const ProjectStatus = IDL.Opt(
    IDL.Variant({
      'fully_funded' : IDL.Null,
      'submitted' : IDL.Null,
      'whitelist' : IDL.Null,
      'live' : IDL.Null,
      'approved' : IDL.Null,
    })
  );
  const UserId = IDL.Principal;
  const Project = IDL.Record({
    'id' : ProjectId,
    'status' : ProjectStatus,
    'title' : IDL.Text,
    'owner' : UserId,
    'goal' : IDL.Float64,
    'cover' : Link,
    'tags' : IDL.Vec(IDL.Text),
    'description' : IDL.Text,
    'story' : IDL.Text,
    'rewards' : IDL.Text,
    'category' : IDL.Text,
    'walletId' : IDL.Text,
  });
  const Date = IDL.Text;
  const MarketplaceLink = IDL.Variant({
    'ccc' : Link,
    'other' : Link,
    'entrepot' : Link,
  });
  const MarketplaceLinks = IDL.Vec(MarketplaceLink);
  const Profile = IDL.Record({
    'id' : UserId,
    'bio' : IDL.Text,
    'img' : Link,
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const UserId__1 = IDL.Principal;
  const ProjectState = IDL.Variant({
    'closed' : IDL.Null,
    'whitelist' : IDL.Vec(IDL.Principal),
    'live' : IDL.Null,
    'noproject' : IDL.Null,
  });
  const Profile__1 = IDL.Record({
    'id' : UserId,
    'bio' : IDL.Text,
    'img' : Link,
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const Project__1 = IDL.Record({
    'id' : ProjectId,
    'status' : ProjectStatus,
    'title' : IDL.Text,
    'owner' : UserId,
    'goal' : IDL.Float64,
    'cover' : Link,
    'tags' : IDL.Vec(IDL.Text),
    'description' : IDL.Text,
    'story' : IDL.Text,
    'rewards' : IDL.Text,
    'category' : IDL.Text,
    'walletId' : IDL.Text,
  });
  const ProjectWithOwner = IDL.Record({
    'owner' : Profile__1,
    'project' : Project__1,
  });
  const ProjectStatus__1 = IDL.Opt(
    IDL.Variant({
      'fully_funded' : IDL.Null,
      'submitted' : IDL.Null,
      'whitelist' : IDL.Null,
      'live' : IDL.Null,
      'approved' : IDL.Null,
    })
  );
  return IDL.Service({
    'addWhitelist' : IDL.Func([ProjectId__1, IDL.Vec(IDL.Principal)], [], []),
    'adminCreateProfile' : IDL.Func([IDL.Principal, NewUserProfile], [], []),
    'adminCreateProject' : IDL.Func([IDL.Principal, NewProject], [Project], []),
    'approveProject' : IDL.Func([ProjectId__1], [], []),
    'archiveProject' : IDL.Func([ProjectId__1], [], []),
    'closeProject' : IDL.Func([ProjectId__1], [], []),
    'createFirstProject' : IDL.Func(
        [NewUserProfile, NewProject],
        [Project],
        [],
      ),
    'createProfile' : IDL.Func([NewUserProfile], [], []),
    'createProject' : IDL.Func([NewProject], [Project], []),
    'deleteProject' : IDL.Func([ProjectId__1], [IDL.Opt(Project)], []),
    'getLaunchDate' : IDL.Func([ProjectId__1], [IDL.Opt(Date)], ['query']),
    'getMarketplaceLinks' : IDL.Func(
        [ProjectId__1],
        [MarketplaceLinks],
        ['query'],
      ),
    'getMyProfile' : IDL.Func([], [Profile], ['query']),
    'getMyProjects' : IDL.Func([], [IDL.Vec(Project)], ['query']),
    'getOwnId' : IDL.Func([], [UserId__1], ['query']),
    'getOwnIdText' : IDL.Func([], [IDL.Text], ['query']),
    'getProfile' : IDL.Func([UserId__1], [Profile], ['query']),
    'getProject' : IDL.Func([ProjectId__1], [Project], ['query']),
    'getProjectState' : IDL.Func([ProjectId__1], [ProjectState], ['query']),
    'getProjectWithOwner' : IDL.Func(
        [ProjectId__1],
        [ProjectWithOwner],
        ['query'],
      ),
    'getProjectWithOwnerAndMarketplace' : IDL.Func(
        [ProjectId__1],
        [
          IDL.Record({
            'owner' : Profile,
            'marketplaceLinks' : MarketplaceLinks,
            'project' : Project,
          }),
        ],
        ['query'],
      ),
    'getProjects' : IDL.Func([UserId__1], [IDL.Vec(Project)], ['query']),
    'getWhitelist' : IDL.Func(
        [ProjectId__1],
        [IDL.Vec(IDL.Principal)],
        ['query'],
      ),
    'greet' : IDL.Func([], [IDL.Text], []),
    'healthcheck' : IDL.Func([], [IDL.Bool], []),
    'isAdmin' : IDL.Func([], [IDL.Bool], ['query']),
    'listProjects' : IDL.Func(
        [IDL.Vec(ProjectStatus__1)],
        [IDL.Vec(ProjectWithOwner)],
        ['query'],
      ),
    'pay' : IDL.Func([IDL.Nat64, ProjectId__1], [], ['oneway']),
    'putLaunchDate' : IDL.Func([ProjectId__1, Date], [], []),
    'resetWhitelist' : IDL.Func([ProjectId__1], [], []),
    'searchProfiles' : IDL.Func([IDL.Text], [IDL.Vec(Profile)], ['query']),
    'setMarketplaceLinks' : IDL.Func([ProjectId__1, MarketplaceLinks], [], []),
    'setProjectFullyFunded' : IDL.Func([ProjectId__1], [], []),
    'unapproveProject' : IDL.Func([ProjectId__1], [], []),
    'updateProfile' : IDL.Func([Profile], [], []),
    'updateProject' : IDL.Func([Project], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
