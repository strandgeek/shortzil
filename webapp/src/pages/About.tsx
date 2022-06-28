import { Topbar } from "../components/Topbar";

export const About = () => {
  return (
    <>
      <Topbar />
      <div>
        <div className="mt-24 w-screen flex items-center justify-center">
          <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto my-24">
            <p>
              Hello! I am StrandGeek and shortzil is the project I developed for the Zilliqa Open Track
              Challenge. You can see more details here: <a target="_blank" href="https://shortzil.xyz/hackathon" rel="noreferrer">https://shortzil.xyz/hackathon</a>
            </p>

            <p>
              The main idea is that anyone can reserve a unique name (slug) to
              shorten a url. Once a person generates a shortened link, they have
              ownership of that slug and only they can change the shortened link
              URL. As this slug is an NFT, it can be transferred to someone else
              or even sold on a marketplace.
            </p>

            <p className="font-bold">
              So it's time to take advantage of the platform being launched now
              and grab the best names!
            </p>

            <p className="italic">
              Note: This project is currently running on the testnet network.
              After the hackathon, depending on people's interest, I will make
              this project available running on the mainnet. Also, this project
              is completely Open-Source and available on github.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
