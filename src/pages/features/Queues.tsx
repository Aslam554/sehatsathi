import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { hospitals } from '@/lib/mockData';
import { Calendar, Clock, Ticket, Sparkles, MapPin } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Queues = () => {
  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [bookedTokens, setBookedTokens] = useState<any[]>([]);

  const selectedHospitalData = hospitals.find((h) => h.id === selectedHospital);

  const handleBookToken = () => {
    if (selectedHospital && selectedDept && patientName && patientPhone) {
      const newToken = {
        id: `TKN${Date.now()}`,
        hospital: selectedHospitalData?.name,
        department: selectedDept,
        tokenNumber: Math.floor(Math.random() * 100) + 1,
        estimatedWait: selectedHospitalData?.avgWaitTime || 30,
        patient: patientName,
        phone: patientPhone,
      };
      setBookedTokens((prev) => [...prev, newToken]);
      // Reset form
      setPatientName('');
      setPatientPhone('');
      setSelectedDept('');
    }
  };

  const totalHospitals = hospitals.length;
  const avgWaitOverall =
    hospitals.reduce((sum, h) => sum + (h.avgWaitTime || 0), 0) /
    (hospitals.length || 1);
  const totalQueue = hospitals.reduce((sum, h) => sum + (h.currentQueue || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-background to-emerald-50 dark:from-slate-950 dark:via-background dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-sky-500 to-emerald-500 p-3 rounded-2xl shadow-lg shadow-sky-500/30">
              <Calendar className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-sky-100/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-700 dark:bg-sky-900/60 dark:text-sky-100">
                Smart Queues
              </p>
              <h1 className="mt-3 text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                Hospital Queue Token System
              </h1>
              <p className="mt-1 text-sm sm:text-base text-muted-foreground max-w-xl">
                Book a digital token, track the queue remotely, and reach the hospital exactly
                when your turn is near.
              </p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3 max-w-md text-sm">
            <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">
                Hospitals
              </p>
              <p className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-50">
                {totalHospitals}
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 px-4 py-3 shadow-sm dark:border-emerald-800 dark:bg-emerald-950/70">
              <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-200">
                Avg wait
              </p>
              <p className="mt-1 text-xl font-semibold text-emerald-900 dark:text-emerald-50">
                ~{Math.round(avgWaitOverall)} min
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50/80 px-4 py-3 shadow-sm dark:border-amber-800 dark:bg-amber-950/70">
              <p className="text-[11px] uppercase tracking-[0.18em] text-amber-700 dark:text-amber-200">
                People in queue
              </p>
              <p className="mt-1 text-xl font-semibold text-amber-900 dark:text-amber-50">
                {totalQueue}
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Hospital List */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  Available Hospitals
                  <span className="rounded-full bg-emerald-50 px-2 py-[2px] text-[11px] font-medium text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-100">
                    Live queues
                  </span>
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  See departments, queue load and approximate waiting time.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {hospitals.map((hospital) => (
                <Card
                  key={hospital.id}
                  className={`hover:shadow-lg transition-all hover:-translate-y-[2px] cursor-pointer ${
                    selectedHospital === hospital.id
                      ? 'border-primary/40 ring-1 ring-primary/30'
                      : ''
                  }`}
                  onClick={() => {
                    setSelectedHospital(hospital.id);
                    setSelectedDept(''); // reset dept when hospital changes
                  }}
                >
                  <CardContent className="p-5">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-foreground text-lg mb-1">
                            {hospital.name}
                          </h3>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                            {hospital.location}
                          </p>
                        </div>
                        <Badge variant="secondary" className="text-[11px]">
                          {hospital.currentQueue === 0
                            ? 'No queue'
                            : `${hospital.currentQueue} waiting`}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {hospital.departments.map((dept) => (
                          <Badge
                            key={dept}
                            variant="outline"
                            className="text-[11px] rounded-full px-3 py-1"
                          >
                            {dept}
                          </Badge>
                        ))}
                      </div>

                      <div className="mt-1 flex items-center justify-between text-xs sm:text-sm">
                        <div className="flex items-center gap-2 text-foreground">
                          <Ticket className="h-4 w-4 text-muted-foreground" />
                          <span>
                            Current Queue:{' '}
                            <span className="font-medium">{hospital.currentQueue}</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-foreground">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>
                            ~<span className="font-medium">{hospital.avgWaitTime}</span> min
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right: Token Booking Form + My Tokens */}
          <div className="space-y-6">
            <Card className="border-none bg-gradient-to-br from-white via-background to-emerald-50 shadow-lg dark:from-slate-950 dark:via-slate-950 dark:to-emerald-950/50">
              <CardHeader>
                <CardTitle>Book Queue Token</CardTitle>
                <CardDescription>
                  Reserve your turn and arrive closer to your expected token time.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Hospital</Label>
                    <Select value={selectedHospital} onValueChange={setSelectedHospital}>
                      <SelectTrigger className="bg-background/80">
                        <SelectValue placeholder="Choose hospital" />
                      </SelectTrigger>
                      <SelectContent>
                        {hospitals.map((h) => (
                          <SelectItem key={h.id} value={h.id}>
                            {h.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedHospitalData && (
                      <p className="text-xs text-muted-foreground">
                        Current queue:{' '}
                        <span className="font-medium">
                          {selectedHospitalData.currentQueue} patients
                        </span>{' '}
                        • Avg wait ~
                        <span className="font-medium">{selectedHospitalData.avgWaitTime} min</span>
                      </p>
                    )}
                  </div>

                  {selectedHospitalData && (
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Select value={selectedDept} onValueChange={setSelectedDept}>
                        <SelectTrigger className="bg-background/80">
                          <SelectValue placeholder="Choose department" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedHospitalData.departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Patient Name</Label>
                    <Input
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="Enter patient name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      placeholder="Enter phone number"
                      type="tel"
                    />
                  </div>

                  <Button
                    onClick={handleBookToken}
                    disabled={
                      !selectedHospital || !selectedDept || !patientName || !patientPhone
                    }
                    className="w-full gap-2 rounded-full"
                  >
                    <Ticket className="h-4 w-4" />
                    Book Token
                  </Button>

                  <p className="text-[11px] text-muted-foreground text-center">
                    You&apos;ll receive your token ID and estimated wait time instantly.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* My Tokens */}
            {bookedTokens.length > 0 && (
              <Card className="border-none bg-gradient-to-br from-emerald-50 via-background to-sky-50 dark:from-emerald-950/40 dark:via-slate-950 dark:to-sky-950/40">
                <CardHeader>
                  <CardTitle>My Tokens</CardTitle>
                  <CardDescription>
                    Keep this page open to quickly check your token &amp; waiting time.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {bookedTokens.map((token) => (
                      <div
                        key={token.id}
                        className="bg-accent/70 p-4 rounded-2xl border border-border/60"
                      >
                        <div className="flex items-center justify-between mb-2 gap-3">
                          <Badge variant="success" className="rounded-full px-3 py-1 text-[11px]">
                            Token #{token.tokenNumber}
                          </Badge>
                          <span className="text-[11px] text-muted-foreground">{token.id}</span>
                        </div>
                        <p className="text-sm font-medium text-foreground">{token.hospital}</p>
                        <p className="text-xs text-muted-foreground">{token.department}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Patient: <span className="font-medium">{token.patient}</span> •{' '}
                          {token.phone}
                        </p>
                        <p className="text-xs text-foreground mt-2">
                          Estimated wait:{' '}
                          <strong>~{token.estimatedWait} minutes</strong>
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Queues;
