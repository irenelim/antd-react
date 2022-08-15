import { useEffect, useState } from "react";
import ReactMapGL from "react-map-gl"; // { Marker, Popup }
import { useSelector } from "react-redux";

function Map() {
  const { selectedLoc } = useSelector((state) => state.place);
  const { user } = useSelector((state) => state.user);
  const [viewState, setViewState] = useState(null);

  useEffect(() => {
      setViewState((prev) => ({
        ...prev,
        longitude: selectedLoc?.lng || user?.lng,
        latitude: selectedLoc?.lat || user?.lat,
      }));
  }, [selectedLoc, user]);

  return viewState ? (
    <ReactMapGL
      {...viewState}
      zoom={11}
      width="100%"
      height="100%"
      mapStyle="mapbox://styles/irenelim/ckugqcvja64lf18qjkfrfev73"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_KEY}
    />
  ) : null;
}

export default Map;
