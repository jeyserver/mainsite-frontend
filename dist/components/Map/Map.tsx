import { MapContainer, Marker, TileLayer } from 'react-leaflet';

const Map = () => {
  const position: any = [32.708873, 51.660673];

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}></Marker>
    </MapContainer>
  );
};

export default Map;
