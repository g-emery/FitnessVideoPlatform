import FetchVideos from "./FetchVideos";
import NavBar from "./NavBar";

function App() {

  return (
    <div className="main">
      <div className="navBar">
        <NavBar />
      </div>

      <div className="fetchVideos">
        <FetchVideos />
      </div>
    </div>

  );
}

export default App;
