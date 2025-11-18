import FetchVideos from "./FetchVideos";
import Login from "./Login";
import NavBar from "./NavBar";
import Register from "./Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

  return (

    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/videos" element={<FetchVideos />} />
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
