import { Link, useNavigate, NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import SearchSeries from "./Series/SearchSeries";
import { useManagerMode } from "../context/managerModeContext";
import { useAuth } from "../context/manageAuthContext"

function Navbar(props) {
  const auth = useAuth();
  let navigate = useNavigate();
  const { setManagerMode } = useManagerMode();

  const navLinks = [
    {
      'path': '/home',
      'title': 'Home'
    },
    {
      'path': '/favorite-series',
      'title': 'Lista de Favoritos'
    },
    {
      'path': '/want-to-watch',
      'title': 'Desejo Assistir'
    }
  ]

  return (
    <nav className="bg-black px-5 py-1 flex items-center">
      <Link to="/home">
        <img width={123} height={123} src={logo} />
      </Link>
      <div className="flex justify-between flex-1 items-start">
        <div className="flex gap-9 ml-12 items-center">
          {navLinks.map((item, key) => {
            return (
              <NavLink key={key} to={item.path} className={({ isActive }) => isActive ? "text-white hover:opacity-70 text-xl relative group transition-all duration-300 font-semibold underline" : "text-white hover:opacity-70 text-xl relative group transition-all duration-300"}>
                {item.title}
              </NavLink>
            )
          })}
          <button type="button" className="cursor-pointer text-white hover:opacity-70 text-xl" onClick={() => setManagerMode((prevState) => !prevState)}>Modo Edição</button>
          <SearchSeries search={props.search} onSearch={props.onSearch} />
        </div>
        <div className="flex items-center flex-col pr-10">
          <div className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <strong className=" text-white">Olá, {auth.member.name}</strong>
          </div>
          <div className="w-full text-end underline">
            <button onClick={() => { auth.signout(() => navigate("/")); }} className="text-white cursor-pointer text-xs">Sair</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
