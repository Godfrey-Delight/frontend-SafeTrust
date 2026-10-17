import { useEffect, useRef } from "react";
import { DivIcon, type Marker as LeafletMarker } from "leaflet";
import { Marker } from "react-leaflet";
import { formatListingPrice } from "@/components/listings/formatListingPrice";

interface PriceMarkerProps {
  id: string;
  position: [number, number];
  price: number;
  selected?: boolean;
  onSelect?: (id: string) => void;
}

/**
 * A price pin rendered as a local CSS marker (`.price-pin`, see
 * `globals.css`), never a CDN icon. Reused by both the results map (with
 * selection) and the hotel-detail map (static, no `onSelect`).
 */
export function PriceMarker({
  id,
  position,
  price,
  selected = false,
  onSelect,
}: PriceMarkerProps) {
  const label = `${formatListingPrice(price)} per month`;
  const icon = new DivIcon({
    className: "", // no default Leaflet square
    html: `<span class="price-pin${selected ? " is-selected" : ""}">${formatListingPrice(price)}</span>`,
    iconSize: undefined,
  });

  // Leaflet computes the marker's accessible name from its visible text
  // content (just the price) before falling back to `title`, so `title`
  // alone never surfaces "per month" to assistive tech. Set aria-label on
  // the icon element directly once Leaflet creates it.
  //
  // This needs a ref object read inside its own effect, not a callback ref:
  // react-leaflet's ref uses useImperativeHandle (a layout effect), which
  // commits before the layer's own passive effect that actually calls
  // map.addLayer(). A callback ref fires too early and getElement() is
  // still null; a useEffect in this parent runs after the child's effects.
  const markerRef = useRef<LeafletMarker | null>(null);
  useEffect(() => {
    markerRef.current?.getElement()?.setAttribute("aria-label", label);
  }, [label]);

  return (
    <Marker
      ref={markerRef}
      position={position}
      icon={icon}
      keyboard
      title={label}
      eventHandlers={onSelect ? { click: () => onSelect(id) } : undefined}
    />
  );
}
