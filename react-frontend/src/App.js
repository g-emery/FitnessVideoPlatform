import FetchVideos from "./pages/FetchVideos";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/videos" element={
          <ProtectedRoute>
          <FetchVideos />
          </ProtectedRoute>
        } 
        />
      </Routes>
    </Router>



    // <div className="main">
    //   <div className="navBar">
    //     <NavBar />
    //   </div>

    //   <div className="fetchVideos">
    //     <Register />
    //     <Login />
    //     <FetchVideos />
    //   </div>
    // </div>

  );
}

export default App;
