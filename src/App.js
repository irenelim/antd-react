import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import HistoryMenu from "./components/HistoryMenu";
import Map from "./components/Map";
import Search from "./components/Search";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./store/Slices/userSlice";

function App() {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user)
    dispatch(fetchUser());
  }, [dispatch, user]);

  return (
    <div className="App">
      <div className="dropdown-container">
      <HistoryMenu />
      </div>
      <div className="search-container">
        <Search />
      </div>
      
      <Map />
      
    </div>
  );
}

export default App;
