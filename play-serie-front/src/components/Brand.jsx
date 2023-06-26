import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

function Brand() {
  return (
    <Link to="/" className="cursor-pointer">
      <img src={logo} width={170} height={170} alt="Logo do site" />
    </Link>
  );
}

export default Brand;
