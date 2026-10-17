"use client";

import "leaflet/dist/leaflet.css";
import type { ReactNode } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { clientEnv } from "@/config/env";

interface BaseMapProps {
  center: [number, number];
  zoom?: number;
  children?: ReactNode;
  onTileError?: () => void;
  className?: string;
}

/**
 * Shared Leaflet canvas: tile URL and attribution come from
 * `NEXT_PUBLIC_MAP_TILE_URL` / `NEXT_PUBLIC_MAP_ATTRIBUTION` (see
 * `next.config.ts`, which derives the CSP `img-src` origin from the same
 * variable). Never render a marker icon from a CDN here; callers supply
 * local CSS markers via `children` (see `PriceMarker`).
 */
export function BaseMap({
  center,
  zoom = 8,
  children,
  onTileError,
  className,
}: BaseMapProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      className={className ?? "h-full w-full"}
    >
      <TileLayer
        url={clientEnv.NEXT_PUBLIC_MAP_TILE_URL}
        attribution={clientEnv.NEXT_PUBLIC_MAP_ATTRIBUTION}
        eventHandlers={onTileError ? { tileerror: onTileError } : undefined}
      />
      {children}
    </MapContainer>
  );
}
