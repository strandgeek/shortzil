import { Link } from "react-router-dom";
import logoLight from "../assets/img/logo-light.svg";

export const Topbar = () => {
  return (
    <header className="App-header mt-16">
    <div className="w-full px-16 text-center flex items-center justify-center mt-8">
      <div className="w-full">
      <div className="flex items-center justify-center w-full">
        <img src={logoLight} className="h-12" alt="shortzil logo" />
      </div>
        <p className="block mt-2 text-gray-500">
          Descentralized URL Shortner
        </p>
        <div className="flex items-center justify-center w-full">
          <ul className="menu menu-horizontal bg-base-100 rounded-box mt-4 text-gray">
            <Link to="/" className="btn btn-link">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
            <Link to="/my-links" className="btn btn-link">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              My Links
            </Link>
            <Link to="/about" className="btn btn-link">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              About
            </Link>
          </ul>
        </div>
      </div>
    </div>
  </header>
  )
}
