import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/manageAuthContext"
import logo from "../assets/images/logo.svg";
import prime_video from "../assets/images/prime_video.svg";
import hbo from "../assets/images/hbo.svg";
import netflix from "../assets/images/netflix.svg";

function Platforms() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.status) {
      navigate("/");
    }
  }, [auth.status, navigate]);

  return (
    <div className=" bg-[#CC3434] p-5 flex flex-col h-screen w-screen overflow-hidden">
      <div className="bg-[#D9D9D9] rounded-md flex flex-col flex-1">
        <nav>
          <img className="ml-12" src={logo} width={178} height={178} alt="logo" />
        </nav>
        <div className="flex items-center justify-center teste">
          <Link to="/">
            <img className="ml-12" src={prime_video} width={264} height={264} alt="prime video" />
          </Link>
          <Link to="/">
            <img className="ml-12" src={netflix} width={264} height={264} alt="netflix" />
          </Link>
          <Link to="/">
            <img className="ml-12" src={hbo} width={264} height={264} alt="hbo" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Platforms;
