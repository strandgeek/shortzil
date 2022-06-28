import classNames from "classnames";
import { useState } from "react";
import { toast } from "react-toastify";
import { validateSlug, validateUrl } from "../utils/validate";
import { mintSlugUrl } from "../web3/zilliqa";

export const GenerateForm = () => {
  const [loading, setLoading] = useState(false);
  const [slug, setSlug] = useState("");
  const [url, setUrl] = useState("");
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    slug?: string;
    url?: string;
  }>({});

  const shortUrl = `${process.env.REACT_APP_BASE_URL}/${slug}`

  const generateShortUrl = async () => {
    setLoading(true);
    try {
      if (window.zilPay.wallet.isEnable) {
        const success = await mintSlugUrl(slug, url);
        if (success) {
          setSuccess(true);
          // @ts-ignore
          if (typeof party !== "undefined") {
            // @ts-ignore
            const { confetti, variation } = party;
            confetti(document.body, {
              count: variation.range(140, 200),
              size: variation.range(0.8, 1.2),
              spread: variation.range(5, 10),
            });
          }
        }
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
        slug: isValid
          ? undefined
          : 'Invalid Slug. Characters allowed: a-z, 0-9 and "-"',
      };
    });
  };

  const copyShortUrlToClipboard = async () => {
    try {
      await window.navigator.clipboard.writeText(shortUrl)
      toast.success('Short URL copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy Short URL');
    }
  }

  const resetForm = () => {
    setSlug('');
    setUrl('');
    setValidationErrors({})
    setSuccess(false)
    setLoading(false);
  }

  const btnEnabled =
    url !== "" &&
    slug !== "" &&
    !validationErrors.url &&
    !validationErrors.slug;

  return (
    <div>
      {success && (
        <div className="w-[360px] text-center">
          <h2 className="text-center text-2xl mb-4">Success! URL Generated</h2>
          <div className="form-control">
            <div className="input-group">
              <input
                type="text"
                className="input input-lg input-bordered w-full"
                value={shortUrl}
              />
              <button className="btn btn-square btn-lg" onClick={() => copyShortUrlToClipboard()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                  />
                </svg>
              </button>
            </div>
          </div>
          <button className="btn btn-link mt-4" onClick={resetForm}>Shorten Another URl</button>
        </div>
      )}
      {!success && (
        <div className="w-[480px]">
          <div className="form-control w-full">
            <label className="input-group">
              <span className="bg-gray-100">shortzil.xyz/</span>
              <input
                type="text"
                placeholder="my-slug"
                className="input input-bordered input-lg w-full"
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
      )}
    </div>
  );
};
