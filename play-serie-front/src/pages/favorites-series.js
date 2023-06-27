import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import { useAuth } from "../context/manageAuthContext"
import { UserService } from "../services/UserService";
import Series from "../components/serie/serie";

const FavoriteSeries = () => {
  const [series, setSeries] = useState([]);
  const auth = useAuth();
  const userId = auth?.data?.user.id;

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
  return (
    <div className="flex flex-col gap-3">
      <Navbar />
      <Series series={series} userId={userId} />
    </div>
  );
};

export default FavoriteSeries;
