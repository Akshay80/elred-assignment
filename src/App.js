import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import HomeScreen from "./Components/HomeScreen";
import EditAboutMe from "./Components/Edit/EditAboutMe";
import ResumeScreen from "./Components/ResumeScreen";
import EditSkills from "./Components/Edit/EditSkills";

function App() {
  return (
    // Implementation of Routing Here
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="edit-about-me" element={<EditAboutMe />} />
          <Route path="resume" element={<ResumeScreen />} />
          <Route path="skills" element={<EditSkills />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
