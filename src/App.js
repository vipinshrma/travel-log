import * as React from "react";
import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import env from "dotenv";
import { logEnteries } from "./Api";
import { FiMapPin } from "react-icons/fi";
import { RiMapPin2Fill } from "react-icons/ri";
import LogEntryForm from "./LogEntryForm";

env.config();

const App = () => {
  const [logs, setLogs] = useState([]);
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [showPopup, setShowPopup] = useState({});
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.6,
    longitude: -95.665,
    zoom: 3,
  });

  const getEnteries = () => {
    const fetchData = async () => {
      const logs = await logEnteries();
      setLogs(logs);
    };
    fetchData();
  };

  React.useEffect(() => {
    getEnteries();
  }, []);

  const showAddMarkupPopup = (event) => {
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation({
      longitude,
      latitude,
    });
  };

  return (
    <ReactMapGL
      onDblClick={(event) => showAddMarkupPopup(event)}
      {...viewport}
      mapStyle="mapbox://styles/vipinshrma12/ckeiat99934wz19rtsa1kffpu"
      mapboxApiAccessToken={
        "pk.eyJ1IjoidmlwaW5zaHJtYTEyIiwiYSI6ImNrZWk0ZmgzMDIybDAyem1pdWt2NWlsaWEifQ.pYkgqBhRiVx5wR42Uk8YxA"
      }
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {logs.map((entry) => {
        return (
          <React.Fragment key={entry._id}>
            <Marker
              latitude={entry.latitude}
              longitude={entry.longitude}
              offsetLeft={-12}
              offsetTop={-24}
            >
              <div
                onClick={() =>
                  setShowPopup({
                    [entry._id]: true,
                  })
                }
              >
                <FiMapPin
                  style={{
                    color: "green",
                    width: "24px",
                    height: "40px",
                  }}
                />
              </div>
            </Marker>
            {showPopup[entry._id] ? (
              <Popup
                latitude={entry.latitude}
                longitude={entry.longitude}
                closeButton={showPopup}
                closeOnClick={showPopup}
                dynamicPosition={true}
                onClose={() => setShowPopup({ [entry._id]: false })}
                anchor="top"
              >
                <div
                  style={{
                    width: "100vw",
                    maxWidth: "400px",
                  }}
                >
                  <h3>{entry.title}</h3>
                  <h5>{entry.comments}</h5>
                  <small>
                    Visited on :{new Date(entry.visitDate).toLocaleDateString()}{" "}
                  </small>
                  {entry.image ? (
                    <img
                      className="log-img"
                      src={entry.image}
                      width="auto"
                      height="200px"
                    />
                  ) : null}
                </div>
              </Popup>
            ) : null}
          </React.Fragment>
        );
      })}
      {addEntryLocation && (
        <>
          <Marker
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            offsetLeft={-20}
            offsetTop={-40}
          >
            <div>
              <RiMapPin2Fill
                style={{
                  color: "red",
                  width: "40px",
                  height: "40px",
                }}
              />
            </div>
          </Marker>
          <Popup
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            closeButton={true}
            closeOnClick={false}
            dynamicPosition={true}
            onClose={() => setAddEntryLocation(null)}
            anchor="top"
          >
            <div style={{ maxWidth: "400px", padding: "1rem" }}>
              <LogEntryForm
                onClose={() => {
                  setAddEntryLocation(null);
                  getEnteries();
                }}
                location={addEntryLocation}
              />
            </div>
          </Popup>
        </>
      )}
    </ReactMapGL>
  );
};

export default App;
