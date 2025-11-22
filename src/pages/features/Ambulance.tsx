import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ambulances, villages, hospitals } from '@/lib/mockData';
import { Ambulance as AmbulanceIcon, Phone, MapPin, Navigation } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const Ambulance = () => {
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [patientLocation, setPatientLocation] = useState('');
  const [nearestHospital, setNearestHospital] = useState('');
  const [simulation, setSimulation] = useState<any>(null);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'available': return 'ok';
      case 'on-trip': return 'low';
      case 'offline': return 'critical';
      default: return 'default';
    }
  };

  const handleSimulate = () => {
    // Mock simulation
    const availableAmbulance = ambulances.find(a => a.status === 'available');
    if (availableAmbulance && patientLocation && nearestHospital) {
      setSimulation({
        ambulance: availableAmbulance,
        patientLocation,
        hospital: hospitals.find(h => h.id === nearestHospital)?.name || 'Hospital',
        eta: '12 minutes',
        route: [
          `Start from ${availableAmbulance.location}`,
          `Pick up patient from ${villages.find(v => v.id === patientLocation)?.name}`,
          `Transport to ${hospitals.find(h => h.id === nearestHospital)?.name}`,
        ],
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-primary p-3 rounded-xl">
              <AmbulanceIcon className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                Smart Ambulance Mesh
              </h1>
              <p className="text-muted-foreground">
                Real-time ambulance tracking and intelligent emergency dispatch
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Ambulance List */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">Available Ambulances</h2>
              <Dialog open={emergencyOpen} onOpenChange={setEmergencyOpen}>
                <DialogTrigger asChild>
                  <Button variant="destructive">
                    <AmbulanceIcon className="mr-2 h-4 w-4" />
                    Simulate Emergency
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Emergency Simulation</DialogTitle>
                    <DialogDescription>
                      Select patient location and nearest hospital to simulate ambulance dispatch
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Patient Location (Village)</Label>
                      <Select value={patientLocation} onValueChange={setPatientLocation}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select village" />
                        </SelectTrigger>
                        <SelectContent>
                          {villages.map(v => (
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
                          {hospitals.map(h => (
                            <SelectItem key={h.id} value={h.id}>{h.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button 
                      onClick={handleSimulate} 
                      className="w-full"
                      disabled={!patientLocation || !nearestHospital}
                    >
                      Run Simulation
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {ambulances.map(ambulance => (
                <Card key={ambulance.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground text-lg mb-1">
                          {ambulance.vehicleNumber}
                        </h3>
                        <Badge variant={getStatusVariant(ambulance.status)} className="mb-2">
                          {ambulance.status.toUpperCase().replace('-', ' ')}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-foreground">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{ambulance.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{ambulance.driver} • {ambulance.contact}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right: Map Placeholder / Simulation Result */}
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Emergency Route</CardTitle>
                <CardDescription>Simulated ambulance dispatch and route</CardDescription>
              </CardHeader>
              <CardContent>
                {simulation ? (
                  <div className="space-y-4">
                    <div className="bg-success/10 p-4 rounded-lg border border-success/20">
                      <p className="text-sm font-medium text-success mb-2">
                        ✓ Ambulance Assigned
                      </p>
                      <p className="text-sm text-foreground">
                        <strong>{simulation.ambulance.vehicleNumber}</strong> dispatched
                      </p>
                      <p className="text-sm text-foreground">
                        Driver: {simulation.ambulance.driver}
                      </p>
                      <p className="text-sm text-foreground">
                        Contact: {simulation.ambulance.contact}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">Estimated Time:</p>
                      <p className="text-2xl font-bold text-primary">{simulation.eta}</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">Route:</p>
                      <ol className="space-y-2">
                        {simulation.route.map((step: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                            <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs flex-shrink-0">
                              {idx + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <Button 
                      onClick={() => setSimulation(null)} 
                      variant="outline" 
                      className="w-full"
                    >
                      Clear Simulation
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <div className="bg-accent p-6 rounded-full mb-4">
                      <Navigation className="h-12 w-12 text-primary" />
                    </div>
                    <p className="text-muted-foreground mb-4">
                      No active emergency simulation
                    </p>
                    <Button onClick={() => setEmergencyOpen(true)}>
                      Start Simulation
                    </Button>
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
