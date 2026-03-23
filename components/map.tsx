"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Location } from "@/lib/types";

// Fix for default marker icons in Next.js
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

interface MapProps {
  locations: Location[];
  showDeliveryZone?: boolean;
  deliveryCenter?: [number, number];
  deliveryRadiusKm?: number;
  className?: string;
}

export function Map({
  locations,
  showDeliveryZone = false,
  deliveryCenter,
  deliveryRadiusKm = 15,
  className = "h-[400px] w-full rounded-lg",
}: MapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className={`${className} flex items-center justify-center bg-muted`}>
        <p className="text-muted-foreground">Načítám mapu...</p>
      </div>
    );
  }

  const center: [number, number] = deliveryCenter ||
    (locations.length > 0
      ? locations[0].coordinates
      : [50.0755, 14.4378]);

  return (
    <MapContainer
      center={center}
      zoom={showDeliveryZone ? 10 : 11}
      className={className}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {showDeliveryZone && deliveryCenter && (
        <Circle
          center={deliveryCenter}
          radius={deliveryRadiusKm * 1000}
          pathOptions={{
            color: "#22c55e",
            fillColor: "#22c55e",
            fillOpacity: 0.1,
          }}
        />
      )}

      {locations.map((location) => (
        <Marker key={location.id} position={location.coordinates}>
          <Popup>
            <div className="min-w-[200px]">
              <h3 className="font-semibold">{location.name}</h3>
              <p className="text-sm text-muted-foreground">
                {location.address}
              </p>
              <p className="text-sm text-muted-foreground">{location.city}</p>
              <p className="mt-2 text-sm">
                <strong>Tel:</strong> {location.phone}
              </p>
              <p className="text-sm">
                <strong>Otevřeno:</strong> {location.hours}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
