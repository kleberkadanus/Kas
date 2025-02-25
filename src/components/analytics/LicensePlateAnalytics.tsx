import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Car, Play, Square } from "lucide-react";

interface LicensePlate {
  plate: string;
  confidence: number;
  timestamp: string;
}

interface LicensePlateAnalyticsProps {
  rtspUrl?: string;
  mqttConfig?: {
    broker: string;
    topic: string;
    username?: string;
    password?: string;
  };
}

const LicensePlateAnalytics = ({
  rtspUrl = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  mqttConfig = {
    broker: "mqtt://localhost:1883",
    topic: "license-plates",
  },
}: LicensePlateAnalyticsProps) => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [detections, setDetections] = useState<LicensePlate[]>([]);
  const [settings, setSettings] = useState({
    rtspUrl,
    mqttBroker: mqttConfig.broker,
    mqttTopic: mqttConfig.topic,
  });

  // Real detection will be implemented when backend is ready
  useEffect(() => {
    if (isStreaming) {
      // Connect to backend service for real-time plate detection
      console.log("Started streaming, waiting for detections...");
    }
  }, [isStreaming]);

  const toggleStream = () => {
    setIsStreaming(!isStreaming);
  };

  return (
    <Card className="w-full h-full bg-gray-900 p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Car className="h-5 w-5 text-blue-500" />
          <h2 className="text-lg font-semibold text-white">
            License Plate Analytics
          </h2>
        </div>
        <Button
          variant={isStreaming ? "destructive" : "default"}
          size="sm"
          onClick={toggleStream}
          className="w-24"
        >
          {isStreaming ? (
            <>
              <Square className="h-4 w-4 mr-2" /> Stop
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" /> Start
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-400">RTSP URL</label>
          <Input
            value={settings.rtspUrl}
            onChange={(e) =>
              setSettings({ ...settings, rtspUrl: e.target.value })
            }
            className="bg-gray-800 border-gray-700"
            placeholder="rtsp://example.com/stream"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-400">MQTT Broker</label>
          <Input
            value={settings.mqttBroker}
            onChange={(e) =>
              setSettings({ ...settings, mqttBroker: e.target.value })
            }
            className="bg-gray-800 border-gray-700"
            placeholder="mqtt://localhost:1883"
          />
        </div>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-4">
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          {isStreaming ? (
            <ReactPlayer
              url={settings.rtspUrl}
              playing={isStreaming}
              controls
              width="100%"
              height="100%"
              config={{
                file: {
                  attributes: {
                    style: { objectFit: "cover" },
                  },
                },
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <Car className="h-12 w-12" />
            </div>
          )}
        </div>
        <div className="bg-gray-800 rounded-lg p-4 overflow-auto">
          <div className="space-y-3">
            {detections.map((detection, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-900 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="bg-blue-500/20 text-blue-200"
                  >
                    {detection.plate}
                  </Badge>
                  <span className="text-sm text-gray-400">
                    Confidence: {Math.round(detection.confidence * 100)}%
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(detection.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LicensePlateAnalytics;
