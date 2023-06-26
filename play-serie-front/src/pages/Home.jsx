import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import netflix from "../assets/netflix.svg";
import prime_video from "../assets/prime_video.svg";
import hbo from "../assets/hbo.svg";
import { SeriesService } from "../services/SeriesServices";
import Series from "../components/Series";
import { useAuth } from "../context/manageAuthContext"

function Home() {
  const {member } = useAuth();
  const [series, setSeries] = useState([]);

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
        return <img src={netflix} width={37} height={37} />;
      case "hbo":
        return <img src={hbo} width={37} height={37} />;
      case "prime":
        return <img src={prime_video} width={37} height={37} />;
    }
  }

  return (
    <>
      <div className=" bg-[#D9D9D9] mb-3">
        <Link to="/new" className="flex gap-2 items-center px-2 rounded-md font-medium text-lg py-3 bg-black text-white hover:bg-stone-800">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Adicionar Série
        </Link >
      </div>
      <Series memberId={member?.id} series={series} onGetPlatform={getPlatform} />
    </>
  );
}

export default Home;
