import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { hospitals } from '@/lib/mockData';
import { Calendar, Clock, Ticket } from 'lucide-react';
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

  const selectedHospitalData = hospitals.find(h => h.id === selectedHospital);

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
      setBookedTokens([...bookedTokens, newToken]);
      // Reset form
      setPatientName('');
      setPatientPhone('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-primary p-3 rounded-xl">
              <Calendar className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                Hospital Queue Token System
              </h1>
              <p className="text-muted-foreground">
                Book your turn, skip the wait
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Hospital List */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Available Hospitals</h2>
            <div className="space-y-4">
              {hospitals.map(hospital => (
                <Card key={hospital.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground text-lg mb-2">
                      {hospital.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">{hospital.location}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {hospital.departments.map(dept => (
                        <Badge key={dept} variant="secondary">{dept}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-foreground">
                        <Ticket className="h-4 w-4 text-muted-foreground" />
                        <span>Current Queue: {hospital.currentQueue}</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>~{hospital.avgWaitTime} min</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right: Token Booking Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Book Queue Token</CardTitle>
                <CardDescription>Reserve your spot in the hospital queue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Select Hospital</Label>
                    <Select value={selectedHospital} onValueChange={setSelectedHospital}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose hospital" />
                      </SelectTrigger>
                      <SelectContent>
                        {hospitals.map(h => (
                          <SelectItem key={h.id} value={h.id}>{h.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedHospitalData && (
                    <div>
                      <Label>Department</Label>
                      <Select value={selectedDept} onValueChange={setSelectedDept}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose department" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedHospitalData.departments.map(dept => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div>
                    <Label>Patient Name</Label>
                    <Input 
                      value={patientName} 
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="Enter patient name" 
                    />
                  </div>

                  <div>
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
                    disabled={!selectedHospital || !selectedDept || !patientName || !patientPhone}
                    className="w-full"
                  >
                    Book Token
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* My Tokens */}
            {bookedTokens.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>My Tokens</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {bookedTokens.map(token => (
                      <div key={token.id} className="bg-accent p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="success">Token #{token.tokenNumber}</Badge>
                          <span className="text-xs text-muted-foreground">{token.id}</span>
                        </div>
                        <p className="text-sm font-medium text-foreground">{token.hospital}</p>
                        <p className="text-xs text-muted-foreground">{token.department}</p>
                        <p className="text-xs text-foreground mt-2">
                          Estimated wait: <strong>~{token.estimatedWait} minutes</strong>
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
