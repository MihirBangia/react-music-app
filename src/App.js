import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import UseRoutes from "./components/routes/routes";
import { createContext } from "react";

export const SongContext = createContext("");
function App() {
  return (
    <div className="App">
      <div className="body" />

      <Router>
        <UseRoutes />
      </Router>
    </div>
  );
}

export default App;
