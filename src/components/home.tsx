import React, { useState } from "react";
import TopBar from "./dashboard/TopBar";
import SideNav from "./dashboard/SideNav";
import CameraGrid from "./dashboard/CameraGrid";
import MetricsPanel from "./dashboard/MetricsPanel";
import LicensePlateAnalytics from "./analytics/LicensePlateAnalytics";

interface HomeProps {
  systemStatus?: "online" | "warning" | "error";
  aiFeatures?: {
    facialRecognition: boolean;
    licensePlateDetection: boolean;
    motionAnalysis: boolean;
  };
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
  metrics?: {
    peopleCount: number;
    vehicleCount: number;
    activeAlerts: number;
    motionEvents: number;
  };
}

const Home = ({
  systemStatus = "online",
  aiFeatures = {
    facialRecognition: true,
    licensePlateDetection: true,
    motionAnalysis: true,
  },
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
  metrics = {
    peopleCount: 24,
    vehicleCount: 8,
    activeAlerts: 3,
    motionEvents: 156,
  },
}: HomeProps) => {
  const [gridLayout, setGridLayout] = useState<"2x2" | "3x3">("2x2");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-gray-950">
      <div
        className={`${menuOpen ? "block" : "hidden"} lg:block fixed lg:relative lg:flex z-50`}
      >
        <SideNav
          alerts={[
            {
              id: "1",
              type: "Motion Detected",
              message: "Movement detected in Zone A",
              timestamp: new Date().toISOString(),
              severity: "high",
            },
            {
              id: "2",
              type: "Face Detected",
              message: "Unknown person identified",
              timestamp: new Date().toISOString(),
              severity: "medium",
            },
            {
              id: "3",
              type: "System Alert",
              message: "Camera 2 offline",
              timestamp: new Date().toISOString(),
              severity: "low",
            },
          ]}
          onAlertClick={(alertId) => console.log("Alert clicked:", alertId)}
          onNavigate={(path) => console.log("Navigate to:", path)}
        />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar
          systemStatus={systemStatus}
          aiFeatures={aiFeatures}
          onToggleFeature={(feature) => console.log("Toggle feature:", feature)}
          onOpenSettings={() => console.log("Open settings")}
          onOpenMenu={() => setMenuOpen(!menuOpen)}
        />

        <div className="flex-1 overflow-hidden">
          <CameraGrid
            cameras={cameras}
            layout={gridLayout}
            onLayoutChange={setGridLayout}
          />
        </div>

        <div className="h-64 border-t border-gray-800">
          <MetricsPanel metrics={metrics} />
        </div>
      </div>
    </div>
  );
};

export default Home;
