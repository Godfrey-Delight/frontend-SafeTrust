"use client";

import { BaseMap } from "@/features/listings/map/BaseMap";
import { PriceMarker } from "@/features/listings/map/PriceMarker";

interface MapProps {
  coordinates: [number, number];
  hotelName: string;
  price: number;
}

const HotelMap: React.FC<MapProps> = ({ coordinates, hotelName, price }) => {
  return (
    <BaseMap center={coordinates} zoom={13}>
      <PriceMarker id={hotelName} position={coordinates} price={price} />
    </BaseMap>
  );
};

export default HotelMap;
