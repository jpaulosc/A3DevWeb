import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/manageAuthContext"
import netflix from "../assets/images/netflix.svg";
import prime_video from "../assets/images/prime_video.svg";
import hbo from "../assets/images/hbo.svg";
import { SeriesService } from "../services/SeriesServices";
import Series from "../components/serie/serie";
import Navbar from "../components/navbar/Navbar";

const Home = () => {
  const [series, setSeries] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await SeriesService.getAll();
        setSeries(response);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  function getPlatform(name) {
    const nameFormated = name.toLowerCase();
    switch (nameFormated) {
      case "netflix":
        return <img width={37} height={37} src={netflix} alt="netflix" />;
      case "hbo":
        return <img width={37} height={37} src={hbo} alt="hbo" />;
      case "prime":
        return <img width={37} height={37} src={prime_video} alt="prime video" />;
      default:
        return "";
    }
  }

  const filteredSeries = useMemo(() => (
    series?.filter(serie => serie.name.toLowerCase().includes(search.toLowerCase()))
  ), [series, search]);

  return (
    <>
      <Navbar search={search} onSearch={setSearch} />
      <main className="p-3 bg-[#D9D9D9] h-full">
        <div className=" bg-[#D9D9D9] mb-3">
          <button className="flex gap-2 items-center px-2 rounded-md font-medium text-lg py-3 bg-black text-white hover:scale-110" onClick={() => navigate("/new")}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Adicionar Série
          </button>
        </div>
        <Series userId={auth.data?.user.id} series={filteredSeries} onGetPlatform={getPlatform} />
      </main>
    </>
  );
};

export default Home;
