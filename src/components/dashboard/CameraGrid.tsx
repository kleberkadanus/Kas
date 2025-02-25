import React, { useState } from "react";
import CameraFeed from "./CameraFeed";
import { Button } from "@/components/ui/button";
import { Grid2X2, Grid3X3, Maximize2 } from "lucide-react";

interface CameraGridProps {
  cameras?: Array<{
    id: string;
    name: string;
    isOnline: boolean;
    streamUrl: string;
    detections: Array<{
      type: string;
      confidence: number;
      timestamp: string;
    }>;
  }>;
  layout?: "2x2" | "3x3";
  onLayoutChange?: (layout: "2x2" | "3x3") => void;
}

const CameraGrid = ({
  cameras = [
    {
      id: "cam-1",
      name: "Entrance",
      isOnline: true,
      streamUrl:
        "https://images.unsplash.com/photo-1506147854445-5a3f534191f8?w=600&h=400&fit=crop",
      detections: [
        { type: "Person", confidence: 0.98, timestamp: "2024-03-20T14:30:00Z" },
      ],
    },
    {
      id: "cam-2",
      name: "Parking Lot",
      isOnline: true,
      streamUrl:
        "https://images.unsplash.com/photo-1587955415523-2f21c1acf318?w=600&h=400&fit=crop",
      detections: [
        {
          type: "Vehicle",
          confidence: 0.95,
          timestamp: "2024-03-20T14:30:00Z",
        },
      ],
    },
    {
      id: "cam-3",
      name: "Lobby",
      isOnline: true,
      streamUrl:
        "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=600&h=400&fit=crop",
      detections: [],
    },
    {
      id: "cam-4",
      name: "Back Door",
      isOnline: false,
      streamUrl:
        "https://images.unsplash.com/photo-1557418776-4c6d8029c935?w=600&h=400&fit=crop",
      detections: [],
    },
  ],
  layout = "2x2",
  onLayoutChange = () => {},
}: CameraGridProps) => {
  const [maximizedCamera, setMaximizedCamera] = useState<string | null>(null);

  const gridClassName = layout === "2x2" ? "grid-cols-2" : "grid-cols-3";

  if (maximizedCamera) {
    const camera = cameras.find((c) => c.id === maximizedCamera);
    if (camera) {
      return (
        <div className="w-full h-full bg-gray-950 p-4">
          <div className="mb-4 flex justify-end">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setMaximizedCamera(null)}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-[calc(100%-48px)]">
            <CameraFeed
              {...camera}
              onMaximize={() => setMaximizedCamera(null)}
            />
          </div>
        </div>
      );
    }
  }

  return (
    <div className="w-full h-full bg-gray-950 p-4">
      <div className="mb-4 flex justify-end gap-2">
        <Button
          variant={layout === "2x2" ? "secondary" : "outline"}
          size="icon"
          onClick={() => onLayoutChange("2x2")}
        >
          <Grid2X2 className="h-4 w-4" />
        </Button>
        <Button
          variant={layout === "3x3" ? "secondary" : "outline"}
          size="icon"
          onClick={() => onLayoutChange("3x3")}
        >
          <Grid3X3 className="h-4 w-4" />
        </Button>
      </div>
      <div className={`grid ${gridClassName} gap-4 h-[calc(100%-48px)]`}>
        {cameras.map((camera) => (
          <CameraFeed
            key={camera.id}
            {...camera}
            onMaximize={() => setMaximizedCamera(camera.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CameraGrid;
