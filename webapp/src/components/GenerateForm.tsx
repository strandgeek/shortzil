import classNames from "classnames";
import { useState } from "react";
import { validateSlug, validateUrl } from "../utils/validate";
import { mintSlugUrl } from "../web3/zilliqa";

export const GenerateForm = () => {
  const [loading, setLoading] = useState(false);
  const [slug, setSlug] = useState("");
  const [url, setUrl] = useState("");
  const [validationErrors, setValidationErrors] = useState<{
    slug?: string;
    url?: string;
  }>({});

  const generateShortUrl = async () => {
    setLoading(true);
    try {
      if (window.zilPay.wallet.isEnable) {
        await mintSlugUrl(slug, url);
      } else {
        const isConnect = await window.zilPay.wallet.connect();
        if (isConnect) {
          // this.updateWelcomeMsg();
        } else {
          alert("Not able to call setHello as transaction is rejected");
        }
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const btnClassname = classNames("btn btn-primary btn-block btn-lg mt-4", {
    loading: loading,
  });

  const onUrlChange = (e: any) => {
    const url = e.target.value;
    setUrl(url);
    const isValid = validateUrl(url);
    setValidationErrors((validationErrors) => {
      return { ...validationErrors, url: isValid ? undefined : "Invalid URL" };
    });
  };

  const onSlugChange = (e: any) => {
    const slug = e.target.value;
    setSlug(slug);
  };

  const onSlugBlur = () => {
    const isValid = validateSlug(slug);
    setValidationErrors((validationErrors) => {
      return {
        ...validationErrors,
        slug: isValid ? undefined : "Invalid Slug. Characters allowed: a-z, 0-9 and \"-\"",
      };
    });
  }

  const btnEnabled =
    url !== "" &&
    slug !== "" &&
    !validationErrors.url &&
    !validationErrors.slug;

  return (
    <div className="max-w-md">
      <div className="form-control w-full">
        <label className="input-group">
          <span className="bg-gray-100">shortzil.xyz/</span>
          <input
            type="text"
            placeholder="my-slug"
            className="input input-bordered input-lg"
            onChange={onSlugChange}
            onBlur={onSlugBlur}
            value={slug}
          />
        </label>
        {validationErrors.slug && (
          <label className="label">
            <span className="label-text-alt text-sm text-red-500">
              {validationErrors.slug}
            </span>
          </label>
        )}
      </div>
      <div className="form-control w-full mt-4">
        <input
          type="text"
          placeholder="https://mywebsite.com?abc=1234"
          className="input input-bordered input-lg"
          onChange={onUrlChange}
          value={url}
        />
        {validationErrors.url && (
          <label className="label">
            <span className="label-text-alt text-sm text-red-500">
              {validationErrors.url}
            </span>
          </label>
        )}
      </div>
      <button
        className={btnClassname}
        onClick={() => generateShortUrl()}
        disabled={!btnEnabled}
      >
        {loading ? "Shortening URL..." : "Shorten URL"}
      </button>
    </div>
  );
};
