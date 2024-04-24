import 'react-tabs/style/react-tabs.css';
import { Routes, Route } from "react-router";
import './App.css';
import CandidatePage from "./pages/candidate/candidate.page";
import MegaversePage from "./pages/megaverse/megaverse.page";
import { PrivateRoute } from "./privateRoutes/private.route";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<CandidatePage/>}
      />
      <Route
        path="/map"
        element={
          <PrivateRoute
            path="/map"
            component={MegaversePage}
          />
        }
      />
    </Routes>
  );
}

export default App;
