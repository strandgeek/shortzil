import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { GenerateForm } from "./components/GenerateForm";

function App() {
  const connectWallet = async () => {
    await window.zilPay.wallet.connect();
  }

  return (
    <div className="App">
      <ToastContainer />
      <header className="App-header">
        <button onClick={() => connectWallet()}>Connect Wallet</button>

        <div className="w-screen h-screen flex items-center justify-center">
          <GenerateForm />
        </div>
      </header>
    </div>
  );
}

export default App;
