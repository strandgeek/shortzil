import { fromBech32Address } from "@zilliqa-js/crypto";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { client } from "../client";
import { EditUrlModal } from "../components/EditUrlModal";
import { Topbar } from "../components/Topbar";
import { TransferModal } from "../components/TransferModal";

export const TableRow: FC<any> = ({ link, onTransfer }) => {
  const [editOpen, setEditOpen] = useState(false)
  const [transferOpen, setTransferOpen] = useState(false)
  return (
    <tr>
      <EditUrlModal
        open={editOpen}
        setOpen={setEditOpen}
        initialUrl={link.url}
        slug={link.slug}
      />
      <TransferModal
        open={transferOpen}
        setOpen={setTransferOpen}
        tokenId={link.tokenId}
        onTransfer={onTransfer}
      />
      <td>#{link.tokenId}</td>
      <td>
        {process.env.REACT_APP_BASE_URL}/{link.slug}
      </td>
      <td>
        <div className="tooltip" data-tip="Edit URL">
          <button className="btn btn-sm btn-circle btn-outline" onClick={() => setEditOpen(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
        </div>
        <div className="tooltip ml-2" data-tip="Transfer Ownership">
          <button className="btn btn-sm btn-circle btn-outline" onClick={() => setTransferOpen(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};

export const MyLinks = () => {
  const [links, setLinks] = useState<any>([]);
  const removeTokenIdFromLinks = (tokenId: number) => {
    setLinks((links: any) => links.filter((link: any) => link.tokenId !== tokenId))
  }
  const fetchLinks = async () => {
    try {
      if (
        window &&
        typeof window.zilPay !== "undefined" &&
        window.zilPay.wallet.isEnable
      ) {
        const zilliqa = window.zilPay;
        const connectedAccountAddress = fromBech32Address(
          zilliqa.wallet.defaultAccount.bech32
        );
        const { data } = await client.get(
          `/users/${connectedAccountAddress.toLowerCase()}/links`
        );
        setLinks(data.data);
      }
    } catch (error) {
      toast.error("Could not fetch list of links");
      console.log(error);
    }
  };
  useEffect(() => {
    window.setTimeout(() => {
      fetchLinks();
    }, 200);
  }, []);
  return (
    <>
      <Topbar />
      <div>
        <div className="mt-24 w-screen flex items-center justify-center">
          <div>
            <table className="table w-full">
              <thead>
                <tr>
                  <th>NFT Token ID</th>
                  <th>Short Link</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {links.map((link: any) => (
                  <TableRow
                    key={link.tokenId}
                    link={link}
                    onTransfer={() => removeTokenIdFromLinks(link.tokenId)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
