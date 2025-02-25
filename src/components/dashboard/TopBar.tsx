import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Car,
  Menu,
  PersonStanding,
  Settings,
  Shield,
  UserCircle2,
} from "lucide-react";

interface TopBarProps {
  systemStatus?: "online" | "warning" | "error";
  aiFeatures?: {
    facialRecognition: boolean;
    licensePlateDetection: boolean;
    motionAnalysis: boolean;
  };
  onToggleFeature?: (feature: string) => void;
  onOpenSettings?: () => void;
  onOpenMenu?: () => void;
}

const TopBar = ({
  systemStatus = "online",
  aiFeatures = {
    facialRecognition: true,
    licensePlateDetection: true,
    motionAnalysis: true,
  },
  onToggleFeature = () => {},
  onOpenSettings = () => {},
  onOpenMenu = () => {},
}: TopBarProps) => {
  const statusColors = {
    online: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
  };

  return (
    <div className="w-full h-16 bg-gray-900 border-b border-gray-800 px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onOpenMenu}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-blue-500" />
          <span className="text-lg font-semibold text-white hidden md:inline">
            Security Dashboard
          </span>
        </div>

        <Badge
          variant="outline"
          className={`${statusColors[systemStatus]} bg-opacity-10 border-opacity-50`}
        >
          <div
            className={`w-2 h-2 rounded-full ${statusColors[systemStatus]} mr-2`}
          />
          System {systemStatus.charAt(0).toUpperCase() + systemStatus.slice(1)}
        </Badge>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-6">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2">
                  <PersonStanding className="h-5 w-5 text-gray-400" />
                  <Switch
                    checked={aiFeatures.facialRecognition}
                    onCheckedChange={() => onToggleFeature("facialRecognition")}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Facial Recognition</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-gray-400" />
                  <Switch
                    checked={aiFeatures.licensePlateDetection}
                    onCheckedChange={() =>
                      onToggleFeature("licensePlateDetection")
                    }
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>License Plate Detection</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-gray-400" />
                  <Switch
                    checked={aiFeatures.motionAnalysis}
                    onCheckedChange={() => onToggleFeature("motionAnalysis")}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Motion Analysis</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenSettings}
            className="text-gray-400 hover:text-white"
          >
            <Settings className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white"
          >
            <UserCircle2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
