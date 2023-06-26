import { useState } from "react";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";

function LandscapeLayout() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Navbar search={search} onSearch={setSearch} />
      <main className="p-3 bg-[#D9D9D9] h-full">
        <div className="flex flex-col gap-3">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default LandscapeLayout;
