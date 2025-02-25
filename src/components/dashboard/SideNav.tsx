import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Bell,
  Camera,
  ChevronRight,
  Home,
  Settings,
  Shield,
  Users,
  AlertTriangle,
  Car,
} from "lucide-react";

interface Alert {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  severity: "low" | "medium" | "high";
}

interface SideNavProps {
  alerts?: Alert[];
  onAlertClick?: (alertId: string) => void;
  onNavigate?: (path: string) => void;
}

const SideNav = ({
  alerts = [
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
  ],
  onAlertClick = () => {},
  onNavigate = undefined,
}: SideNavProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const navItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: Camera, label: "Cameras", path: "/cameras" },
    { icon: Car, label: "License Plates", path: "/license-plate" },
    { icon: Users, label: "People", path: "/people" },
    { icon: Shield, label: "Security", path: "/security" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const getSeverityColor = (severity: Alert["severity"]) => {
    switch (severity) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="w-[280px] h-full bg-gray-900 border-r border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="w-6 h-6 text-blue-500" />
          <h2 className="text-lg font-semibold text-white">Security System</h2>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
              onClick={() => navigate(item.path)}
              variant={pathname === item.path ? "secondary" : "ghost"}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-gray-400" />
              <h3 className="text-sm font-medium text-gray-300">
                Recent Alerts
              </h3>
            </div>
            <Badge variant="outline" className="text-xs">
              {alerts.length} New
            </Badge>
          </div>
        </div>

        <ScrollArea className="h-[calc(100%-6rem)]">
          <div className="p-4 space-y-3">
            {alerts.map((alert) => (
              <Card
                key={alert.id}
                className="p-3 bg-gray-800/50 hover:bg-gray-800 cursor-pointer transition-colors"
                onClick={() => onAlertClick(alert.id)}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-1 rounded-full ${getSeverityColor(
                      alert.severity,
                    )}`}
                  >
                    <AlertTriangle className="w-3 h-3 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-200">
                        {alert.type}
                      </p>
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </div>
                    <p className="text-xs text-gray-400 mt-1 truncate">
                      {alert.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default SideNav;
