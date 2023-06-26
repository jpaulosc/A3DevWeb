
import React, { useEffect, useState } from "react";
import { UserService } from "../services/UserService";
import Series from "../components/Series";
import { useAuth } from "../context/manageAuthContext";

function WantToWatch() {
  const [series, setSeries] = useState([]);
  const { member } = useAuth();
  const userId = member?.id;

  useEffect(() => {
    async function loadSeries() {
      try {
        const formData = {
          userId
        };
        const result = await UserService.getUserSeries(formData, "DESEJO_ASSISTIR");
        setSeries(result);
      } catch (err) {
        console.log(err.message);
      }
    }
    loadSeries();
  }, [userId]);

  return (<Series memberId={userId} series={series} />);
}

export default WantToWatch;
