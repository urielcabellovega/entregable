import { HashRouter, Routes, Route } from "react-router-dom";
import CharacterInfo from "./Components/CharacterInfo";
import Characters from "./Components/Characters";
import Login from "./Components/Login";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/characters" element={<Characters />} />
            <Route path="/characters/:id" element={<CharacterInfo />} />
          </Route>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;