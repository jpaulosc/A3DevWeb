import {
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import { AuthProvider, useAuth } from "./context/manageAuthContext"
import { ManagerModeProvider } from "./context/managerModeContext"

import PortraitLayout from "./components/Layouts/PortraitLayout";
import LandscapeLayout from "./components/Layouts/LandscapeLayout";

import Home from "./pages/Home";
import Platforms from "./pages/Platforms";
import ForgotPassword from "./pages/ForgotPassword";
import Panel from "./pages/Panel";
import New from "./pages/New";
import WantToWatch from "./pages/WantToWatch";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Serie from "./pages/Serie";
import { default as SerieEdit } from "./pages/Serie/Edit";
import FavoriteSeries from "./pages/FavoriteSeries";

function App() {
  return (
    <AuthProvider>
      <ManagerModeProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Guest */}
            <Route element={<PortraitLayout />}>
              <Route index element={<SignIn />} />
              <Route path="sign-up" element={<SignUp />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="serie/edit/:serieId" element={<SerieEdit />} />
              <Route path="new" element={<New />} />
            </Route>
            {/* Logged */}
            <Route element={<LandscapeLayout />}>
              <Route path="home" element={<Home />} />
              <Route path="serie/:serieId" element={<Serie />} />
              <Route path="favorite-series" element={<FavoriteSeries />} />
              <Route path="panel" element={<Panel />} />
              <Route path="platforms" element={<Platforms />} />
              <Route path="want-to-watch" element={<WantToWatch />} />
            </Route>
          </Route>
        </Routes>
      </ManagerModeProvider>
    </AuthProvider>
  );
}

function Layout() {
  const { isLoading } = useAuth();
  return (
    <>
      {isLoading ? 'loading...' : (
        <>
          <Outlet />
        </>
      )}
    </>
  );
}

export default App;
