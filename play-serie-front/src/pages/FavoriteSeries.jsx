import { useState, useEffect } from "react";
import { UserService } from "../services/UserService";
import Series from "../components/Series";
import { useAuth } from "../context/manageAuthContext";

function FavoriteSeries() {
  const [series, setSeries] = useState([]);
  const { member } = useAuth();

  const userId = member?.id;
  useEffect(() => {
    async function loadSeries() {
      try {
        const formData = {
          userId
        };
        const result = await UserService.getUserSeries(formData, "GOSTEI");
        setSeries(result);
      } catch (err) {
        console.log(err.message);
      }
    }
    loadSeries();
  }, [userId]);

  return (<Series memberId={userId} series={series} />);
}

export default FavoriteSeries;
