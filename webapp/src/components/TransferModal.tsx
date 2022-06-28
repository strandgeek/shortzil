import classNames from "classnames";
import { FC, useState } from "react";
import { transfer } from "../web3/zilliqa";
import { Modal, ModalProps } from "./Modal";

interface TransferModalProps extends Pick<ModalProps, "open" | "setOpen"> {
  tokenId: number;
  onTransfer: () => void;
}

export const TransferModal: FC<TransferModalProps> = ({
  tokenId,
  open,
  setOpen,
  onTransfer,
}) => {
  const [loading, setLoading] = useState(false)
  const [toAddress, setToAddress] = useState("");
  const onSave = async () => {
    setLoading(true)
    try {
      await transfer(toAddress, tokenId)
      setOpen(false)
      onTransfer()
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  const saveClassname = classNames(
    'btn btn-primary',
    {
      loading,
    }
  )
  return (
    <Modal open={open} setOpen={loading ? (() => {}) : setOpen}>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">To Address (Recipient)</span>
        </label>
        <input
          type="text"
          placeholder="0x1235..."
          className="input input-bordered w-full"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
        />
      </div>
      <div className="mt-4 flex items-center float-right">
        <button className="btn btn-ghost mr-2" onClick={() => setOpen(false)} disabled={loading}>
          Cancel
        </button>
        <button className={saveClassname} onClick={() => onSave()} disabled={loading}>
          {loading ? 'Transfering...' : 'Transfer'}
        </button>
      </div>
    </Modal>
  );
};
