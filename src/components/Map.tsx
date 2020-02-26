import React, { useState } from "react";
import ReactMapGL, {
  Marker,
  NavigationControl,
  FullscreenControl
} from "react-map-gl";
import PlaceIcon from "@material-ui/icons/PlaceSharp";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  navControl: {
    position: "absolute",
    left: 20,
    top: 30
  },
  screenControl: {
    position: "absolute",
    right: 20,
    top: 30
  }
}));

interface IProps {
  latitude: number;
  longitude: number;
  className?: string;
}

export default function Map({ latitude, longitude, ...extra }: IProps) {
  // The initial lat and long will be what the prop set it as.
  const classes = useStyles();
  const [viewport, setViewport] = useState({
    height: 500,
    zoom: 8,
    latitude,
    longitude
  });
  return (
    <ReactMapGL
      width={"100%"}
      {...extra}
      {...viewport}
      mapStyle="mapbox://styles/adcar/ck72mywpg15151ip9mhcq5rf0"
      mapboxApiAccessToken="pk.eyJ1IjoiYWRjYXIiLCJhIjoiY2s3Mmx4bDBsMDNxYzNkdXU5NWltZGVvZyJ9.Uo3QYldK-CAOvn0LnIqwmQ"
      onViewportChange={setViewport}
    >
      <Marker
        latitude={latitude}
        longitude={longitude}
        offsetLeft={-20}
        offsetTop={-10}
      >
        <PlaceIcon color="secondary" fontSize="large" />
      </Marker>
      <NavigationControl className={classes.navControl} />
      {/*<FullscreenControl className={classes.screenControl} />*/}
    </ReactMapGL>
  );
}
