import { toast } from "react-toastify";
import { Long, bytes, units } from "@zilliqa-js/util";
import { fromBech32Address, toBech32Address } from "@zilliqa-js/crypto";
import { waitForTx } from "../utils/waitForTx";

declare global {
  interface Window {
    zilPay: any;
  }
}


export const mintSlugUrl = async (slug: string, url: string) => {
  const zilliqa = window.zilPay;
  console.log(zilliqa.wallet.defaultAccount)
  const to = fromBech32Address(zilliqa.wallet.defaultAccount.bech32);
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS || "";
  const amount = units.toQa(0, units.Units.Zil);
  const gasPrice = units.toQa('1000', units.Units.Li)

  const CHAIN_ID = 333;
  const MSG_VERSION = 1;
  const VERSION = bytes.pack(CHAIN_ID, MSG_VERSION);

  const contract = contractAddress.substring(2);
  const ftAddr = toBech32Address(contract);
  try {
    const contract = zilliqa.contracts.at(ftAddr);
    const tx = await contract.call(
      "Mint",
      [
        {
          vname: "to",
          type: "ByStr20",
          value: to,
        },
        {
          vname: "slug",
          type: "String",
          value: slug,
        },
        {
          vname: "url",
          type: "String",
          value: url,
        },
      ],
      {
        version: VERSION,
        amount,
        gasPrice,
        gasLimit: Long.fromNumber(9000)
      }
    );
    const txn = await waitForTx(tx.ID)
    if (!txn.success) {
      toast.error('Transaction failed')
    } else {
      toast.success('Success! Short URL created successfully')
    }
  } catch (err) {
    console.log(err);
  }
};
