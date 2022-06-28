import React from "react";
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import { mintSlugUrl } from "./web3/zilliqa";
import { ToastContainer } from "react-toastify";

function App() {
  const connectWallet = async () => {
    await window.zilPay.wallet.connect();
  }
  const generateShortUrl = async () => {
    if (window.zilPay.wallet.isEnable) {
      console.log("Hello World");
      await mintSlugUrl(
        "myslug2",
        "https://gitcoin.co"
      );
    } else {
      const isConnect = await window.zilPay.wallet.connect();
      if (isConnect) {
        // this.updateWelcomeMsg();
      } else {
        alert("Not able to call setHello as transaction is rejected");
      }
    }
  };

  return (
    <div className="App">
      <ToastContainer />
      <header className="App-header">
        <button onClick={() => connectWallet()}>Connect Wallet</button>
        <button onClick={() => generateShortUrl()}>Generate</button>
      </header>
    </div>
  );
}

export default App;
