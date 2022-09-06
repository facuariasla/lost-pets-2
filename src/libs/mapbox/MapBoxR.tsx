import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import {
  Button,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
const MapBoxR = ({ formLat, formLng }: any) => {
  const mapContainer = useRef<any>(null);
  const map = useRef<any>(null);
  const [lng, setLng] = useState(-68.06014203613013);
  const [lat, setLat] = useState(-38.95622024618729);
  const [zoom, setZoom] = useState(4);
  const [locationUpdate, setlocationUpdate] = useState(false);
  const [markerLat, setMarkerLat] = useState();
  const [markerLng, setMarkerLng] = useState();
  const marker = useRef<any>(null);

  const buttonGreenie = useColorModeValue("#97EA9F", "#508A55");

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    console.log("actualizado");
  }, [locationUpdate]);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, [locationUpdate]);

  useEffect(() => {
    map.current.on("click", (e: any) => {
      var coordinates = e.lngLat;
      console.log("Lng:", coordinates.lng, "Lat:", coordinates.lat);
      setMarkerLat(coordinates.lat);
      setMarkerLng(coordinates.lng);

      marker?.current?.remove();
      marker.current = new mapboxgl.Marker();
      marker.current.setLngLat(coordinates).addTo(map.current as any);

      // Info que va hacia el FORM NewPet
      formLat(coordinates.lat);
      formLng(coordinates.lng);
    });
  }, [locationUpdate]);

  const myLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude);

        setLng(position.coords.longitude);
        setLat(position.coords.latitude);
        setZoom(14);
        setlocationUpdate(!locationUpdate);
      });
    } else {
      console.log("Geolocalizacion no disponible");
    }
  };

  return (
    <Stack align="center" justify="center">
      <Text w="90%" textAlign="center" fontWeight="500">
        Clickeá o tocá donde fue la última vez que viste a tu mascota (Las
        coordenadas no se van a compartir con nadie)
      </Text>
      <div ref={mapContainer} className="map-container" />
      {/* <div className="sidebar">
        Longitud: {lng} | Latitud: {lat} | Zoom: {zoom}
      </div> */}
      <Button
        type="button"
        w="100%"
        onClick={myLocation}
        bgColor={buttonGreenie}
      >
        Ir a mi ubicación aproximada
      </Button>
      <Stack w="100%"></Stack>
    </Stack>
  );
};

export default MapBoxR;
