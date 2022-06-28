import { GenerateForm } from "../components/GenerateForm";
import { Topbar } from "../components/Topbar";

export const Home = () => {
  return (
    <>
      <Topbar />
      <div>
        <div className="mt-24 w-screen flex items-center justify-center">
          <GenerateForm />
        </div>
      </div>
    </>
  );
};
