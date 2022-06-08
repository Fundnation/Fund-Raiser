export const idlFactory = ({ IDL }) => {
  const ProjectId = IDL.Nat;
  const NFTInfo = IDL.Record({ 'number' : IDL.Nat, 'priceE8S' : IDL.Nat });
  const Time = IDL.Int;
  const CanisterIdText = IDL.Text;
  const definite_canister_settings = IDL.Record({
    'freezing_threshold' : IDL.Nat,
    'controllers' : IDL.Opt(IDL.Vec(IDL.Principal)),
    'memory_allocation' : IDL.Nat,
    'compute_allocation' : IDL.Nat,
  });
  return IDL.Service({
    'acceptCycles' : IDL.Func([], [], []),
    'availableCycles' : IDL.Func([], [IDL.Nat], ['query']),
    'createEscrowCanister' : IDL.Func(
        [ProjectId, IDL.Principal, IDL.Vec(NFTInfo), Time, IDL.Nat],
        [],
        [],
      ),
    'getProjectEscrowCanisterPrincipal' : IDL.Func(
        [ProjectId],
        [IDL.Opt(CanisterIdText)],
        ['query'],
      ),
    'test' : IDL.Func([], [definite_canister_settings], []),
    'wallet_receive' : IDL.Func([], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
