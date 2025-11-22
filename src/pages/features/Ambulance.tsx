import { useState, useEffect } from "react";
import {
  Ambulance as AmbulanceIcon,
  Phone,
  MapPin,
  Navigation,
  Timer,
  Activity,
  Route,
  Play,
  Pause
} from "lucide-react";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { ambulances, villages, hospitals } from "@/lib/mockData";

const Ambulance = () => {
  const [open, setOpen] = useState(false);
  const [patientLocation, setPatientLocation] = useState("");
  const [nearestHospital, setNearestHospital] = useState("");
  const [simulation, setSimulation] = useState(null);
  const [progress, setProgress] = useState(0); // route progress 0–100
  const [isRunning, setIsRunning] = useState(false);

  const getStatusVariant = (status) => {
    switch (status) {
      case "available":
        return "ok";
      case "on-trip":
        return "low";
      case "offline":
        return "critical";
      default:
        return "default";
    }
  };

  // ---------------------------------------------
  // 🚑 AUTO MOVEMENT SIMULATION (progress bar)
  // ---------------------------------------------
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setIsRunning(false);
          return 100;
        }
        return p + 2;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isRunning]);

  // ---------------------------------------------
  // 🚑 SIMULATION START HANDLER
  // ---------------------------------------------
  const handleSimulate = () => {
    const amb = ambulances.find((a) => a.status === "available");
    if (amb && patientLocation && nearestHospital) {
      setSimulation({
        ambulance: amb,
        patientLocation,
        hospital: hospitals.find((h) => h.id === nearestHospital)?.name,
        route: [
          `🚑 Ambulance departing from ${amb.location}`,
          `📍 Picking patient at ${villages.find((v) => v.id === patientLocation)?.name}`,
          `🏥 Heading to ${hospitals.find((h) => h.id === nearestHospital)?.name}`,
          `✔ Patient safely reached hospital`
        ]
      });

      setProgress(0);
      setIsRunning(true);
      setOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eef7ea] via-[#e5f0d6] to-[#d9e7c4]">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-green-700 p-3 rounded-xl shadow-md">
            <AmbulanceIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-[#2f4f32]">Smart Ambulance Mesh</h1>
            <p className="text-[#4e633d]">Realtime routing • ETA tracking • Village emergency dispatch</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT – Ambulance List */}
          <div>
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#2f4f32]">Available Ambulances</h2>

              {/* Emergency Modal */}
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-red-600 hover:bg-red-700">
                    <AmbulanceIcon className="mr-2 h-4 w-4" />
                    Simulate Emergency
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Simulate Emergency Dispatch</DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4 pt-2">
                    <div>
                      <Label>Patient Location</Label>
                      <Select value={patientLocation} onValueChange={setPatientLocation}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select village" />
                        </SelectTrigger>
                        <SelectContent>
                          {villages.map((v) => (
                            <SelectItem key={v.id} value={v.id}>{v.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Nearest Hospital</Label>
                      <Select value={nearestHospital} onValueChange={setNearestHospital}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select hospital" />
                        </SelectTrigger>
                        <SelectContent>
                          {hospitals.map((h) => (
                            <SelectItem key={h.id} value={h.id}>{h.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      className="w-full bg-green-700 hover:bg-green-800"
                      disabled={!patientLocation || !nearestHospital}
                      onClick={handleSimulate}
                    >
                      Start Simulation
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Ambulance List */}
            <div className="space-y-4">
              {ambulances.map((a) => (
                <Card key={a.id} className="shadow hover:shadow-xl transition-all bg-white/80 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="flex justify-between mb-2">
                      <h3 className="text-lg font-semibold">{a.vehicleNumber}</h3>
                      <Badge variant={getStatusVariant(a.status)}>
                        {a.status.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <p className="flex gap-2 items-center text-[#3f4b2f]">
                        <MapPin className="h-4 w-4 text-green-600" />
                        {a.location}
                      </p>

                      <p className="flex gap-2 items-center text-[#3f4b2f]">
                        <Phone className="h-4 w-4 text-green-600" />
                        {a.driver} • {a.contact}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* RIGHT – Simulation + Route Tracker */}
          <div>
            <Card className="shadow-xl bg-white/80 backdrop-blur border border-green-200">
              <CardHeader>
                <CardTitle>Emergency Route</CardTitle>
                <CardDescription>Live simulation timeline</CardDescription>
              </CardHeader>

              <CardContent>
                {simulation ? (
                  <div className="space-y-6">

                    {/* LIVE STATUS BOX */}
                    <div className="bg-green-100 border border-green-600/30 rounded-xl p-4 shadow-sm">
                      <p className="text-green-800 font-semibold flex items-center gap-2">
                        <Activity className="h-4 w-4" />
                        Live Dispatch Status
                      </p>

                      <p className="text-sm mt-1 text-green-900">
                        {progress < 100
                          ? `Ambulance en route... (${progress}%)`
                          : "Patient safely reached hospital ✔"}
                      </p>
                    </div>

                    {/* TIMELINE STEPS */}
                    <div>
                      <ol className="space-y-3 text-sm">
                        {simulation.route.map((step, i) => (
                          <li
                            key={i}
                            className={`flex items-start gap-3 ${
                              i * 33 <= progress ? "text-green-800" : "text-gray-500"
                            }`}
                          >
                            <span
                              className={`
                                h-6 w-6 flex items-center justify-center rounded-full text-xs
                                ${
                                  i * 33 <= progress
                                    ? "bg-green-700 text-white"
                                    : "bg-gray-300 text-gray-600"
                                }
                              `}
                            >
                              {i + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* MOVING ROUTE TRACKER */}
                    <div className="relative h-32 bg-[url('https://i.imgur.com/1Q9Z1Z1.png')] bg-cover rounded-xl overflow-hidden border border-green-400 shadow-md">
                      {/* Road Line */}
                      <div className="absolute top-1/2 left-4 right-4 h-1 bg-green-900/60"></div>

                      {/* Moving dot */}
                      <div
                        className="absolute top-1/2 -translate-y-1/2 h-6 w-6 bg-green-600 rounded-full border-2 border-white shadow-lg transition-all"
                        style={{ left: `${progress}%` }}
                      ></div>
                    </div>

                    {/* ETA */}
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Estimated Time</p>
                      <p className="text-3xl font-bold text-green-700">
                        {progress < 100 ? `${Math.max(2, 15 - Math.floor(progress / 7))} min` : "Arrived"}
                      </p>
                    </div>

                    {/* Controls */}
                    <div className="flex gap-3">
                      <Button onClick={() => setIsRunning(!isRunning)} className="flex-1">
                        {isRunning ? (
                          <>
                            <Pause className="h-4 w-4 mr-2" /> Pause
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" /> Resume
                          </>
                        )}
                      </Button>

                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setSimulation(null);
                          setProgress(0);
                          setIsRunning(false);
                        }}
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                ) : (
                  // IF NO SIMULATION
                  <div className="flex flex-col items-center justify-center h-64">
                    <Navigation className="h-14 w-14 text-green-700 mb-4" />
                    <p className="text-gray-600 mb-4">No active emergency simulation</p>
                    <Button onClick={() => setOpen(true)}>Start Simulation</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes slide {
            from { transform: translateX(-20px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          .animate-slide {
            animation: slide .4s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default Ambulance;
