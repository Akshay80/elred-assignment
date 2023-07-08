import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import ComponentA from "./Components/ComponentA";
import EditComponentA from "./Components/EditComponentA";

function App() {
  return (
    // Implementation of Routing Here
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ComponentA />} />
          <Route path="EditComponentA" element={<EditComponentA />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
