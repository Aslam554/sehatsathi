import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ambulances, villages, hospitals } from '@/lib/mockData';
import {
  Ambulance as AmbulanceIcon,
  Phone,
  MapPin,
  Navigation,
  Clock,
  Activity,
  AlertTriangle
} from 'lucide-react';
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
  const [search, setSearch] = useState('');

  const totalAmbulances = ambulances.length;
  const availableCount = ambulances.filter(a => a.status === 'available').length;
  const onTripCount = ambulances.filter(a => a.status === 'on-trip').length;

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'available': return 'ok';
      case 'on-trip': return 'low';
      case 'offline': return 'critical';
      default: return 'default';
    }
  };

  const getStatusCardClasses = (status: string) => {
    if (status === 'available')
      return 'border-emerald-100 bg-emerald-50/70 dark:border-emerald-900/60 dark:bg-emerald-950/40';
    if (status === 'on-trip')
      return 'border-amber-100 bg-amber-50/70 dark:border-amber-900/60 dark:bg-amber-950/40';
    if (status === 'offline')
      return 'border-slate-200 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-900/40';
    return 'border-slate-100 bg-card';
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

  const filteredAmbulances = ambulances.filter(a => {
    const q = search.toLowerCase();
    return (
      a.vehicleNumber.toLowerCase().includes(q) ||
      a.location.toLowerCase().includes(q) ||
      a.driver.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-background to-slate-50 dark:from-slate-950 dark:via-background dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-red-500 to-rose-500 p-3 rounded-2xl shadow-lg shadow-red-500/30">
              <AmbulanceIcon className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-rose-100/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-rose-700 dark:bg-rose-900/50 dark:text-rose-100">
                Emergency Network
              </p>
              <h1 className="mt-3 text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                Smart Ambulance Mesh
              </h1>
              <p className="mt-1 text-sm sm:text-base text-muted-foreground max-w-xl">
                Real-time ambulance visibility and intelligent dispatch for rural &amp; semi-urban
                clusters.
              </p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3 max-w-md text-sm">
            <div className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">
                Total units
              </p>
              <p className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-50">
                {totalAmbulances}
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 px-4 py-3 shadow-sm dark:border-emerald-800 dark:bg-emerald-950/60">
              <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-200">
                Available
              </p>
              <p className="mt-1 text-xl font-semibold text-emerald-900 dark:text-emerald-50">
                {availableCount}
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50/80 px-4 py-3 shadow-sm dark:border-amber-800 dark:bg-amber-950/60">
              <p className="text-[11px] uppercase tracking-[0.18em] text-amber-700 dark:text-amber-200">
                On trip
              </p>
              <p className="mt-1 text-xl font-semibold text-amber-900 dark:text-amber-50">
                {onTripCount}
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Ambulance List */}
          <div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  Available Ambulances
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-100">
                    Live status
                  </span>
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Filter by vehicle number, location or driver name.
                </p>
              </div>

              <Dialog open={emergencyOpen} onOpenChange={setEmergencyOpen}>
                <DialogTrigger asChild>
                  <Button variant="destructive" className="gap-2">
                    <AlertTriangle className="mr-1 h-4 w-4" />
                    Simulate Emergency
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Emergency Simulation</DialogTitle>
                    <DialogDescription>
                      Select patient location and nearest hospital to simulate an ambulance
                      dispatch.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 pt-2">
                    <div className="space-y-2">
                      <Label>Patient Location (Village)</Label>
                      <Select value={patientLocation} onValueChange={setPatientLocation}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select village" />
                        </SelectTrigger>
                        <SelectContent>
                          {villages.map(v => (
                            <SelectItem key={v.id} value={v.id}>
                              {v.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Nearest Hospital</Label>
                      <Select value={nearestHospital} onValueChange={setNearestHospital}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select hospital" />
                        </SelectTrigger>
                        <SelectContent>
                          {hospitals.map(h => (
                            <SelectItem key={h.id} value={h.id}>
                              {h.name}
                            </SelectItem>
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

            {/* Search bar */}
            <div className="mb-4">
              <Input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by vehicle number, driver or location..."
                className="bg-background/70"
              />
            </div>

            <div className="space-y-4">
              {filteredAmbulances.map(ambulance => (
                <Card
                  key={ambulance.id}
                  className={`hover:shadow-lg transition-all hover:-translate-y-[2px] border ${getStatusCardClasses(
                    ambulance.status
                  )}`}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground text-lg">
                            {ambulance.vehicleNumber}
                          </h3>
                          <Activity
                            className={`h-4 w-4 ${
                              ambulance.status === 'available'
                                ? 'text-emerald-500'
                                : ambulance.status === 'on-trip'
                                ? 'text-amber-500'
                                : 'text-slate-400'
                            }`}
                          />
                        </div>
                        <Badge variant={getStatusVariant(ambulance.status)} className="text-[11px]">
                          {ambulance.status.toUpperCase().replace('-', ' ')}
                        </Badge>
                      </div>
                      <div className="text-right text-xs text-muted-foreground">
                        <p className="flex items-center justify-end gap-1">
                          <Clock className="h-3 w-3" />
                          Last ping: {ambulance.lastUpdated || '2 mins ago'}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-foreground">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate">{ambulance.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {ambulance.driver} • {ambulance.contact}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredAmbulances.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-6">
                  No ambulances match your search.
                </p>
              )}
            </div>
          </div>

          {/* Right: Map Placeholder / Simulation Result */}
          <div>
            <Card className="h-full border-none bg-gradient-to-br from-white via-background to-rose-50 shadow-lg dark:from-slate-950 dark:via-slate-950 dark:to-rose-950/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Emergency Route
                  <span className="rounded-full bg-rose-100 px-2 py-[2px] text-[11px] font-medium text-rose-700 dark:bg-rose-900/60 dark:text-rose-100">
                    Simulation
                  </span>
                </CardTitle>
                <CardDescription>
                  Visual overview of the assigned ambulance, ETA, and route steps.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {simulation ? (
                  <div className="space-y-5">
                    <div className="bg-emerald-50/80 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-200/70 dark:border-emerald-900">
                      <p className="text-sm font-medium text-emerald-800 dark:text-emerald-100 mb-1 flex items-center gap-2">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-emerald-50">
                          ✓
                        </span>
                        Ambulance Assigned
                      </p>
                      <p className="text-sm text-foreground">
                        <strong>{simulation.ambulance.vehicleNumber}</strong> dispatched from{' '}
                        {simulation.ambulance.location}
                      </p>
                      <p className="text-sm text-foreground">
                        Driver: <strong>{simulation.ambulance.driver}</strong>
                      </p>
                      <p className="text-sm text-foreground">
                        Contact: <strong>{simulation.ambulance.contact}</strong>
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-foreground mb-1">
                          Estimated Time of Arrival
                        </p>
                        <p className="text-3xl font-bold text-primary flex items-center gap-2">
                          <Clock className="h-6 w-6" />
                          {simulation.eta}
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground text-right">
                        <p>Traffic: Moderate</p>
                        <p>Route optimized via mesh network</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">Route:</p>
                      <ol className="space-y-3">
                        {simulation.route.map((step: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-foreground">
                            <span className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center text-xs flex-shrink-0 shadow-sm">
                              {idx + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="mt-4 flex gap-3">
                      <Button
                        onClick={() => setSimulation(null)}
                        variant="outline"
                        className="w-full rounded-full"
                      >
                        Clear Simulation
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-72 text-center">
                    <div className="relative mb-4">
                      <div className="bg-rose-100 p-6 rounded-full dark:bg-rose-900/40">
                        <Navigation className="h-10 w-10 text-rose-600 dark:text-rose-200" />
                      </div>
                      <div className="absolute inset-0 animate-ping rounded-full bg-rose-200/40 dark:bg-rose-900/40" />
                    </div>
                    <p className="text-base font-medium text-foreground mb-1">
                      No active emergency simulation
                    </p>
                    <p className="text-sm text-muted-foreground mb-4 max-w-sm">
                      Run a quick simulation to see how ambulances are allocated and how routes
                      are generated for patients.
                    </p>
                    <Button onClick={() => setEmergencyOpen(true)} className="rounded-full px-6">
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
