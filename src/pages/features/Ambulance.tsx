import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ambulances, villages, hospitals } from "@/lib/mockData";

import {
  Ambulance as AmbulanceIcon,
  Phone,
  MapPin,
  Navigation,
  Clock,
  Activity,
  AlertTriangle,
} from "lucide-react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const Ambulance = () => {
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [patientLocation, setPatientLocation] = useState("");
  const [nearestHospital, setNearestHospital] = useState("");
  const [simulation, setSimulation] = useState<any>(null);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "available":
        return "ok";
      case "on-trip":
        return "low";
      case "offline":
        return "critical";
      default:
        return "secondary";
    }
  };

  const handleSimulate = () => {
    const availableAmbulance = ambulances.find(
      (a) => a.status === "available"
    );

    if (availableAmbulance && patientLocation && nearestHospital) {
      setSimulation({
        ambulance: availableAmbulance,
        patientLocation,
        hospital:
          hospitals.find((h) => h.id === nearestHospital)?.name || "Hospital",
        eta: "12 minutes",
        route: [
          `Start from ${availableAmbulance.location}`,
          `Pick up patient from ${
            villages.find((v) => v.id === patientLocation)?.name
          }`,
          `Transport to ${
            hospitals.find((h) => h.id === nearestHospital)?.name
          }`,
        ],
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary p-3 rounded-xl">
            <AmbulanceIcon className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
              Smart Ambulance Mesh
            </h1>
            <p className="text-muted-foreground">
              Real-time ambulance tracking and emergency dispatch
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT — AMBULANCE LIST */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Available Ambulances
            </h2>

            <div className="space-y-4">
              {ambulances.map((ambulance) => (
                <Card key={ambulance.id} className="hover:shadow-lg transition">
                  <CardContent className="p-6">
                    <div className="flex justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {ambulance.vehicleNumber}
                        </h3>
                        <Badge variant={getStatusVariant(ambulance.status)}>
                          {ambulance.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{ambulance.location}</span>
                      </div>

                      <div className="flex gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {ambulance.driver} • {ambulance.contact}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* RIGHT — EMERGENCY SIMULATION */}
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Emergency Route Simulation</CardTitle>
                <CardDescription>
                  See how ambulance will reach your location
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* FORM */}
                <div className="space-y-4 mb-6">
                  <div>
                    <Label>Patient Location (Village)</Label>
                    <Select
                      value={patientLocation}
                      onValueChange={setPatientLocation}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select village" />
                      </SelectTrigger>
                      <SelectContent>
                        {villages.map((v) => (
                          <SelectItem key={v.id} value={v.id}>
                            {v.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Nearest Hospital</Label>
                    <Select
                      value={nearestHospital}
                      onValueChange={setNearestHospital}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select hospital" />
                      </SelectTrigger>
                      <SelectContent>
                        {hospitals.map((h) => (
                          <SelectItem key={h.id} value={h.id}>
                            {h.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleSimulate}
                    disabled={!patientLocation || !nearestHospital}
                    className="w-full"
                  >
                    Run Simulation
                  </Button>
                </div>

                {/* RESULTS */}
                {simulation ? (
                  <div className="space-y-4">
                    <div className="bg-success/10 border border-success/20 p-4 rounded-lg">
                      <p className="font-medium text-success">✓ Ambulance Assigned</p>
                      <p className="text-sm">
                        {simulation.ambulance.vehicleNumber} dispatched
                      </p>
                      <p className="text-sm">ETA: {simulation.eta}</p>
                    </div>

                    <div>
                      <p className="font-medium mb-2">Route:</p>
                      <ol className="space-y-2">
                        {simulation.route.map((step: string, idx: number) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm"
                          >
                            <span className="bg-primary text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                              {idx + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setSimulation(null)}
                    >
                      Clear Simulation
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <div className="bg-accent p-6 rounded-full mb-4">
                      <Navigation className="h-12 w-12 text-primary" />
                    </div>
                    <p className="text-muted-foreground">
                      No simulation running yet
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ambulance;
