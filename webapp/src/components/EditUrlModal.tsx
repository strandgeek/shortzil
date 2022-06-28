import classNames from "classnames";
import { FC, useState } from "react";
import { updateSlugUrl } from "../web3/zilliqa";
import { Modal, ModalProps } from "./Modal";

interface EditUrlModalProps extends Pick<ModalProps, "open" | "setOpen"> {
  slug: string;
  initialUrl?: string;
}

export const EditUrlModal: FC<EditUrlModalProps> = ({
  open,
  setOpen,
  slug,
  initialUrl,
}) => {
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState(initialUrl || "");
  const onSave = async () => {
    setLoading(true)
    try {
      await updateSlugUrl(slug, url)
      setOpen(false)
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
          <span className="label-text">Paste the new URL</span>
        </label>
        <input
          type="text"
          placeholder="https://mywebsite.com?abc=1234"
          className="input input-bordered w-full"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div className="mt-4 flex items-center float-right">
        <button className="btn btn-ghost mr-2" onClick={() => setOpen(false)} disabled={loading}>
          Cancel
        </button>
        <button className={saveClassname} onClick={() => onSave()} disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </Modal>
  );
};
