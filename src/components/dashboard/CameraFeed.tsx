import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import {
  Maximize2,
  MinusCircle,
  PlusCircle,
  Video,
  VideoOff,
} from "lucide-react";

interface CameraFeedProps {
  id?: string;
  name?: string;
  isOnline?: boolean;
  streamUrl?: string;
  detections?: Array<{
    type: string;
    confidence: number;
    timestamp: string;
  }>;
  onMaximize?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
}

const CameraFeed = ({
  id = "cam-1",
  name = "Camera 1",
  isOnline = true,
  streamUrl = "https://images.unsplash.com/photo-1506147854445-5a3f534191f8?w=600&h=400&fit=crop",
  detections = [
    { type: "Person", confidence: 0.98, timestamp: "2024-03-20T14:30:00Z" },
    { type: "Vehicle", confidence: 0.95, timestamp: "2024-03-20T14:30:05Z" },
  ],
  onMaximize = () => {},
  onZoomIn = () => {},
  onZoomOut = () => {},
}: CameraFeedProps) => {
  return (
    <Card className="relative w-full h-full bg-gray-900 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 p-2 flex justify-between items-center bg-gradient-to-b from-black/70 to-transparent z-10">
        <div className="flex items-center gap-2">
          <Badge variant={isOnline ? "default" : "destructive"} className="h-6">
            {isOnline ? (
              <Video className="h-4 w-4" />
            ) : (
              <VideoOff className="h-4 w-4" />
            )}
            <span className="ml-1">{name}</span>
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/20"
                  onClick={onZoomOut}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Zoom Out</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/20"
                  onClick={onZoomIn}
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Zoom In</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/20"
                  onClick={onMaximize}
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Maximize</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="relative w-full h-full">
        <img
          src={streamUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
        <div className="flex flex-wrap gap-2">
          {detections.map((detection, index) => (
            <Badge
              key={`${detection.type}-${index}`}
              variant="secondary"
              className="bg-blue-500/20 text-blue-200"
            >
              {detection.type} ({Math.round(detection.confidence * 100)}%)
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default CameraFeed;
