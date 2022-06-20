import { idlFactory } from "../../../declarations/fundnation/fundnation.did.js";
import BigNumber from "bignumber.js";
const connect = async () => {
  try {
    const publicKey = await window.ic.plug.requestConnect();
    console.log(`The connected user's public key is:`, publicKey);
    const nnsCanisterId = "ykvog-riaaa-aaaak-qaqxq-cai";
    const whitelist = [nnsCanisterId];

    // Initialise Agent, expects no return value
    await window?.ic?.plug?.requestConnect({
      whitelist,
      // host: "http://127.0.0.1:8000/?canisterId=ryjl3-tyaaa-aaaaa-aaaba-cai",
    });

    // A partial Interface factory
    // for the NNS Canister UI
    // Check the `plug authentication - nns` for more

    // Create an actor to interact with the NNS Canister
    // we pass the NNS Canister id and the interface factory
    const NNSUiActor = await window.ic.plug.createActor({
      canisterId: nnsCanisterId,
      interfaceFactory: idlFactory,
    });

    // We can use any method described in the Candid (IDL)
    // for example the get_stats()
    // See https://github.com/dfinity/nns-dapp/blob/cd755b8/canisters/nns_ui/nns_ui.did
    // const stats = await NNSUiActor.getMyProfile();
    // // const stats = await NNSUiActor;
    // console.log("NNS stats", stats);
  //  const act = await NNSUiActor.createProject({
  //     title: "Common",
  //     // status:"live",
  //     goal: 42.00,
  //     cover: "html",
  //     tags: ["health"],
  //     description: "ksdjfsjfd",
  //     story: "fksdjfkjsdfjkds",
  //     rewards: "dklskfdklf",
  //     category: "ksdflksflks",
  //     walletId: window.ic.plug.accountId,
  //   });
  //   console.log("Projects", act)
    return NNSUiActor;
  } catch (e) {
    console.log(e);
  }
  // await  window.ic.plug.requestConnect();
};

export default connect;
