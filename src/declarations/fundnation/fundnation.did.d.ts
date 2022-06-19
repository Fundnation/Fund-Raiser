import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type Date = string;
export type Link = string;
export type MarketplaceLink = { 'ccc' : Link } |
  { 'other' : Link } |
  { 'entrepot' : Link };
export type MarketplaceLinks = Array<MarketplaceLink>;
export interface NewProject {
  'title' : string,
  'goal' : number,
  'cover' : Link,
  'tags' : Array<string>,
  'description' : string,
  'story' : string,
  'rewards' : string,
  'category' : string,
  'walletId' : string,
}
export interface NewUserProfile {
  'bio' : string,
  'img' : Link,
  'lastName' : string,
  'firstName' : string,
}
export interface Profile {
  'id' : UserId,
  'bio' : string,
  'img' : Link,
  'lastName' : string,
  'firstName' : string,
}
export interface Profile__1 {
  'id' : UserId,
  'bio' : string,
  'img' : Link,
  'lastName' : string,
  'firstName' : string,
}
export interface Project {
  'id' : ProjectId,
  'status' : ProjectStatus,
  'title' : string,
  'owner' : UserId,
  'goal' : number,
  'cover' : Link,
  'tags' : Array<string>,
  'description' : string,
  'story' : string,
  'rewards' : string,
  'category' : string,
  'walletId' : string,
}
export type ProjectId = string;
export type ProjectId__1 = string;
export type ProjectState = { 'closed' : null } |
  { 'whitelist' : Array<Principal> } |
  { 'live' : null } |
  { 'noproject' : null };
export type ProjectStatus = [] | [
  { 'fully_funded' : null } |
    { 'submitted' : null } |
    { 'whitelist' : null } |
    { 'live' : null } |
    { 'approved' : null }
];
export type ProjectStatus__1 = [] | [
  { 'fully_funded' : null } |
    { 'submitted' : null } |
    { 'whitelist' : null } |
    { 'live' : null } |
    { 'approved' : null }
];
export interface ProjectWithOwner {
  'owner' : Profile__1,
  'project' : Project__1,
}
export interface Project__1 {
  'id' : ProjectId,
  'status' : ProjectStatus,
  'title' : string,
  'owner' : UserId,
  'goal' : number,
  'cover' : Link,
  'tags' : Array<string>,
  'description' : string,
  'story' : string,
  'rewards' : string,
  'category' : string,
  'walletId' : string,
}
export type UserId = Principal;
export type UserId__1 = Principal;
export interface _SERVICE {
  'addWhitelist' : ActorMethod<[ProjectId__1, Array<Principal>], undefined>,
  'adminCreateProfile' : ActorMethod<[Principal, NewUserProfile], undefined>,
  'adminCreateProject' : ActorMethod<[Principal, NewProject], Project>,
  'approveProject' : ActorMethod<[ProjectId__1], undefined>,
  'archiveProject' : ActorMethod<[ProjectId__1], undefined>,
  'closeProject' : ActorMethod<[ProjectId__1], undefined>,
  'createFirstProject' : ActorMethod<[NewUserProfile, NewProject], Project>,
  'createProfile' : ActorMethod<[NewUserProfile], undefined>,
  'createProject' : ActorMethod<[NewProject], Project>,
  'deleteProject' : ActorMethod<[ProjectId__1], [] | [Project]>,
  'getLaunchDate' : ActorMethod<[ProjectId__1], [] | [Date]>,
  'getMarketplaceLinks' : ActorMethod<[ProjectId__1], MarketplaceLinks>,
  'getMyProfile' : ActorMethod<[], Profile>,
  'getMyProjects' : ActorMethod<[], Array<Project>>,
  'getOwnId' : ActorMethod<[], UserId__1>,
  'getOwnIdText' : ActorMethod<[], string>,
  'getProfile' : ActorMethod<[UserId__1], Profile>,
  'getProject' : ActorMethod<[ProjectId__1], Project>,
  'getProjectState' : ActorMethod<[ProjectId__1], ProjectState>,
  'getProjectWithOwner' : ActorMethod<[ProjectId__1], ProjectWithOwner>,
  'getProjectWithOwnerAndMarketplace' : ActorMethod<
    [ProjectId__1],
    {
      'owner' : Profile,
      'marketplaceLinks' : MarketplaceLinks,
      'project' : Project,
    },
  >,
  'getProjects' : ActorMethod<[UserId__1], Array<Project>>,
  'getWhitelist' : ActorMethod<[ProjectId__1], Array<Principal>>,
  'greet' : ActorMethod<[], string>,
  'healthcheck' : ActorMethod<[], boolean>,
  'isAdmin' : ActorMethod<[], boolean>,
  'listProjects' : ActorMethod<
    [Array<ProjectStatus__1>],
    Array<ProjectWithOwner>,
  >,
  'pay' : ActorMethod<[bigint, ProjectId__1], undefined>,
  'putLaunchDate' : ActorMethod<[ProjectId__1, Date], undefined>,
  'resetWhitelist' : ActorMethod<[ProjectId__1], undefined>,
  'searchProfiles' : ActorMethod<[string], Array<Profile>>,
  'setMarketplaceLinks' : ActorMethod<
    [ProjectId__1, MarketplaceLinks],
    undefined,
  >,
  'setProjectFullyFunded' : ActorMethod<[ProjectId__1], undefined>,
  'unapproveProject' : ActorMethod<[ProjectId__1], undefined>,
  'updateProfile' : ActorMethod<[Profile], undefined>,
  'updateProject' : ActorMethod<[Project], undefined>,
}
