import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/manageAuthContext"
import { ManagerModeProvider } from "./context/managerModeContext"

import Serie from "./pages/serie";
import EditSerie from "./pages/serie/edit";
import New from "./pages/new";
import Panel from "./pages/panel";
import FavoriteSeries from "./pages/favorites-series";
import Platforms from "./pages/platforms";
import WantToWatch from "./pages/wantToWatch";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";
import ForgotPassword from "./pages/forgot-password";
import Home from "./pages/home";

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Remove the server-side injected CSS
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    setLoading(false)
  }, []);

  return (
    <AuthProvider>
      <ManagerModeProvider>
        <Routes>
          {loading ? ("...") : (
            <>
              <Route path="serie/edit/:id" element={<EditSerie />} />
              <Route path="serie/:id" element={<Serie />} />
              <Route path="favorite-series" element={<FavoriteSeries />} />
              <Route path="forgotPassword" element={<ForgotPassword />} />
              <Route path="home" element={<Home />} />
              <Route path="new" element={<New />} />
              <Route path="panel" element={<Panel />} />
              <Route path="platforms" element={<Platforms />} />
              <Route index element={<SignIn />} />
              <Route path="signUp" element={<SignUp />} />
              <Route path="wantToWatch" element={<WantToWatch />} />
            </>
          )}
        </Routes>
        <ToastContainer />
      </ManagerModeProvider>
    </AuthProvider>
  );
}

export default App;
