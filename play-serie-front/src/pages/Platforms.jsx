import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import prime_video from "../assets/prime_video.svg";
import hbo from "../assets/hbo.svg";
import netflix from "../assets/netflix.svg";

function Platforms() {
  return (
    <div className=" bg-[#CC3434] p-5 flex flex-col h-screen w-screen overflow-hidden">
      <div className="bg-[#D9D9D9] rounded-md flex flex-col flex-1">
        <nav>
          <img className="ml-12" src={logo} width={178} height={178}  />
        </nav>
        <div className="flex items-center justify-center teste">
          <Link to="/">
            <img className="ml-12" src={prime_video} width={264} height={264}  />
          </Link>
          <Link to="/">
            <img className="ml-12" src={netflix} width={264} height={264}  />
          </Link>
          <Link to="/">
            <img className="ml-12" src={hbo} width={264} height={264}  />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Platforms;
