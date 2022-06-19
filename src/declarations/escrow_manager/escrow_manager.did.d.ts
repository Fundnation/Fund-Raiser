import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type CanisterIdText = string;
export type ProjectId = bigint;
export interface definite_canister_settings {
  'freezing_threshold' : bigint,
  'controllers' : [] | [Array<Principal>],
  'memory_allocation' : bigint,
  'compute_allocation' : bigint,
}
export interface _SERVICE {
  'acceptCycles' : ActorMethod<[], undefined>,
  'availableCycles' : ActorMethod<[], bigint>,
  'createEscrowCanister' : ActorMethod<[ProjectId, Principal], undefined>,
  'getProjectEscrowCanisterPrincipal' : ActorMethod<
    [ProjectId],
    [] | [CanisterIdText],
  >,
  'test' : ActorMethod<[], definite_canister_settings>,
  'wallet_receive' : ActorMethod<[], undefined>,
}
