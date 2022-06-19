import Buffer "mo:base/Buffer";
import Principal "mo:base/Principal";
import Time "mo:base/Time";



module {
  public type UserId = Principal;
  public type ProjectId = Text;

  // general types
  public type Image = [Int8];
  public type Link = Text;
  public type ProjectStatus = ?{ 
    #submitted;
    #approved; // approved submissions can be shown on frontend
    #whitelist;
    #live;
    #fully_funded;
  };

  public type NewUserProfile = {
    bio: Text;
    firstName: Text;
    img: Link;
    lastName: Text;
  };

  public type Profile = {
    bio: Text;
    firstName: Text;
    id: UserId;
    img: Link;
    lastName: Text;
  };

  public type NewProject = {
    category: Text;
    cover: Link;
    description: Text;
    goal: Float;
    rewards: Text;
    story: Text;
    tags: [Text]; 
    title: Text;
    walletId: Text;
  };

  public type Project = {
    category: Text;
    cover: Link;
    description: Text;
    goal: Float;
    id: ProjectId;
    owner: UserId;
    rewards: Text;
    status: ProjectStatus;
    story: Text;
    tags: [Text];
    title: Text;
    walletId: Text;
  };
  public type ProjectWithOwner = {
    project: Project;
    owner: Profile;
  };

  // Marketplace stuff
  public type MarketplaceLink = {
    #entrepot: Link;
    #ccc: Link;
    #other: Link;
  };

  public type MarketplaceLinks = [MarketplaceLink];

  public type NFTInfo = {
        number      : Nat;
        priceE8S    : Nat;
    };

    public type AccountId           = Blob;
    public type AccountIdText       = Text;
    public type Subaccount          = Nat;
    public type SubaccountNat8Arr   = [Nat8];
    public type SubaccountBlob      = Blob;
    public type SubaccountStatus    = { 
        #empty;     // empty and waiting for a transfer
        #cancelled; // transfer has been cancelled
        #confirmed; // transfer has been confirmed by frontend, 
                    // now we need to check that we recieved the funds
        #funded;    // funds recieved
    };


    // LEDGER
    public type AccountBalanceArgs  = { account : AccountIdText };
    public type ICPTs               = { e8s     : Nat64     };
    public type SendArgs            = {
        memo            : Nat64;
        amount          : ICPTs;
        from_subaccount : ?SubaccountNat8Arr;
        to              : AccountIdText;
        created_at_time : Time.Time;
    };

    // ESCROW STATS
    public type NFTStats = {
        number          : Nat;
        priceE8S        : Nat;
        sold            : Nat;
        openSubaccounts : Nat;
    };
    public type EscrowStats         = {
        endTime     : Time.Time;
        nftStats    : [NFTStats];
    };
};