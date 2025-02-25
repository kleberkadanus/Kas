import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Users, Car, Bell, Activity } from "lucide-react";

interface MetricWidgetProps {
  title?: string;
  value?: string | number;
  change?: number;
  icon?: React.ReactNode;
}

const MetricWidget = ({
  title = "Metric",
  value = "0",
  change = 0,
  icon = <Activity className="h-4 w-4" />,
}: MetricWidgetProps) => (
  <Card className="p-4 bg-gray-900 text-white">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
      <div className="p-2 bg-gray-800 rounded-full">{icon}</div>
    </div>
    <div className="mt-2 flex items-center gap-1">
      <ArrowUpRight
        className={`h-4 w-4 ${change >= 0 ? "text-green-500" : "text-red-500"}`}
      />
      <span
        className={`text-sm ${change >= 0 ? "text-green-500" : "text-red-500"}`}
      >
        {Math.abs(change)}%
      </span>
    </div>
  </Card>
);

interface MetricsPanelProps {
  metrics?: {
    peopleCount?: number;
    vehicleCount?: number;
    activeAlerts?: number;
    motionEvents?: number;
  };
  recentEvents?: Array<{
    type: string;
    description: string;
    timestamp: string;
  }>;
}

const MetricsPanel = ({
  metrics = {
    peopleCount: 24,
    vehicleCount: 8,
    activeAlerts: 3,
    motionEvents: 156,
  },
  recentEvents = [
    {
      type: "Person",
      description: "Person detected at Camera 1",
      timestamp: "2 mins ago",
    },
    {
      type: "Vehicle",
      description: "Vehicle entered restricted area",
      timestamp: "5 mins ago",
    },
    {
      type: "Alert",
      description: "Motion detected after hours",
      timestamp: "10 mins ago",
    },
  ],
}: MetricsPanelProps) => {
  return (
    <div className="w-full h-full bg-gray-950 p-4">
      <Tabs defaultValue="overview" className="h-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList className="bg-gray-800">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">Recent Events</TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm">
            View All Analytics
          </Button>
        </div>

        <TabsContent value="overview" className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricWidget
              title="People Detected"
              value={metrics.peopleCount}
              change={12}
              icon={<Users className="h-4 w-4" />}
            />
            <MetricWidget
              title="Vehicles Detected"
              value={metrics.vehicleCount}
              change={-5}
              icon={<Car className="h-4 w-4" />}
            />
            <MetricWidget
              title="Active Alerts"
              value={metrics.activeAlerts}
              change={8}
              icon={<Bell className="h-4 w-4" />}
            />
            <MetricWidget
              title="Motion Events"
              value={metrics.motionEvents}
              change={15}
              icon={<Activity className="h-4 w-4" />}
            />
          </div>
        </TabsContent>

        <TabsContent value="events" className="m-0">
          <Card className="bg-gray-900">
            <ScrollArea className="h-[200px] w-full">
              <div className="p-4 space-y-4">
                {recentEvents.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded-lg bg-gray-800"
                  >
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="outline"
                        className={`
                          ${
                            event.type === "Person"
                              ? "bg-blue-500/20 text-blue-200"
                              : event.type === "Vehicle"
                                ? "bg-green-500/20 text-green-200"
                                : "bg-yellow-500/20 text-yellow-200"
                          }
                        `}
                      >
                        {event.type}
                      </Badge>
                      <span className="text-sm text-gray-300">
                        {event.description}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {event.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MetricsPanel;
