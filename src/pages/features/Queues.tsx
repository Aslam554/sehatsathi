import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { hospitals } from '@/lib/mockData';
import { Calendar, Clock, Ticket, Star } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

// 🌍 Extra nearby hospitals with richer info (static demo data)
const nearbyHospitals = [
  {
    name: 'PHC Rampur',
    address: 'Rampur Main Road, Near Panchayat Bhawan',
    phone: '+91-98765-10001',
    timings: '9:00 AM – 4:00 PM',
    rating: 4.3,
    reviews: 128,
    tag: 'Government Hospital',
    features: ['Free OPD', 'Maternal Care', 'Basic Lab', 'Vaccination']
  },
  {
    name: 'CHC Biswan',
    address: 'Biswan Road, Bus Stand ke paas',
    phone: '+91-98765-10002',
    timings: '24x7 Emergency',
    rating: 4.6,
    reviews: 201,
    tag: 'Emergency Hub',
    features: ['24x7 Emergency', 'Ambulance', 'X-Ray', 'Minor Surgery']
  },
  {
    name: 'District Hospital Sitapur',
    address: 'Civil Lines, Sitapur',
    phone: '+91-98765-10003',
    timings: '8:00 AM – 8:00 PM',
    rating: 4.1,
    reviews: 340,
    tag: 'Referral Center',
    features: ['Specialists', 'ICU Support', 'Blood Bank', 'Govt Schemes Desk']
  },
  {
    name: 'Janta Hospital',
    address: 'Talab Chauraha, Market Road',
    phone: '+91-98765-10004',
    timings: '9:00 AM – 9:00 PM',
    rating: 4.4,
    reviews: 96,
    tag: 'Affordable Care',
    features: ['Low cost OPD', 'Pathology', 'Pharmacy', 'Child Care']
  },
  {
    name: 'Anand Clinic & Maternity Home',
    address: 'Station Road, Opp. Petrol Pump',
    phone: '+91-98765-10005',
    timings: '10:00 AM – 7:00 PM',
    rating: 4.7,
    reviews: 152,
    tag: 'Women & Child',
    features: ['Gynaecology', 'Child Specialist', 'Ultrasound']
  },
  {
    name: 'Rural Care Centre Khairabad',
    address: 'Khairabad Bazar, Masjid ke paas',
    phone: '+91-98765-10006',
    timings: '8:30 AM – 6:00 PM',
    rating: 4.2,
    reviews: 88,
    tag: 'Rural Focus',
    features: ['General Physician', 'Tele-Consult', 'Health Camps']
  },
  {
    name: 'Lifeline Emergency Center',
    address: 'Highway Chauraha, Toll Plaza ke kareeb',
    phone: '+91-98765-10007',
    timings: '24x7',
    rating: 4.8,
    reviews: 230,
    tag: 'Critical Care',
    features: ['24x7 Trauma', 'Ambulance', 'Quick Triage']
  },
  {
    name: 'Sunrise Nursing Home',
    address: 'Mandir Road, Old Town',
    phone: '+91-98765-10008',
    timings: '9:00 AM – 8:30 PM',
    rating: 4.0,
    reviews: 74,
    tag: 'Nursing Home',
    features: ['Indoor Beds', 'Post-op Care', 'Physiotherapy']
  },
  {
    name: 'Sai MediCare Clinic',
    address: 'Bus Stand ke saamne, Sai Chowk',
    phone: '+91-98765-10009',
    timings: '10:00 AM – 6:30 PM',
    rating: 4.5,
    reviews: 119,
    tag: 'Family Clinic',
    features: ['Family Physician', 'Diabetes Care', 'BP Monitoring']
  },
  {
    name: 'Arogya Multi-Speciality',
    address: 'Bypass Road, New Colony',
    phone: '+91-98765-10010',
    timings: '9:00 AM – 10:00 PM',
    rating: 4.6,
    reviews: 189,
    tag: 'Multi-Speciality',
    features: ['Ortho', 'Neuro OPD', 'Cardio OPD']
  }
];

const Queues = () => {
  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [bookedTokens, setBookedTokens] = useState<any[]>([]);

  const selectedHospitalData = hospitals.find((h) => h.id === selectedHospital);

  // 🔐 Load tokens from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('queueTokens');
      if (stored) {
        setBookedTokens(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Failed to load tokens from localStorage', err);
    }
  }, []);

  // 💾 Save tokens to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('queueTokens', JSON.stringify(bookedTokens));
    } catch (err) {
      console.error('Failed to save tokens to localStorage', err);
    }
  }, [bookedTokens]);

  const handleBookToken = () => {
    if (selectedHospital && selectedDept && patientName && patientPhone) {
      const newToken = {
        id: `TKN${Date.now()}`,
        hospitalId: selectedHospital,
        hospital: selectedHospitalData?.name,
        department: selectedDept,
        tokenNumber: Math.floor(Math.random() * 90) + 10,
        estimatedWait: selectedHospitalData?.avgWaitTime || 30,
        patient: patientName,
        phone: patientPhone,
        status: 'Upcoming'
      };

      setBookedTokens((prev) => [newToken, ...prev]);

      // Reset form
      setPatientName('');
      setPatientPhone('');
      setSelectedDept('');
    }
  };

  const getTagColor = (tag: string) => {
    if (tag.includes('Government')) return 'bg-emerald-100 text-emerald-800';
    if (tag.includes('Emergency') || tag.includes('Critical'))
      return 'bg-red-100 text-red-800';
    if (tag.includes('Affordable')) return 'bg-amber-100 text-amber-800';
    if (tag.includes('Women')) return 'bg-pink-100 text-pink-800';
    if (tag.includes('Multi')) return 'bg-blue-100 text-blue-800';
    return 'bg-slate-100 text-slate-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f3f7ed] via-[#e7f0da] to-[#dbe6cd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-primary p-3 rounded-xl shadow-md">
              <Calendar className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-[#2f4f32]">
                Hospital Queue Token System
              </h1>
              <p className="text-[#58745a] text-sm mt-1">
                Book your turn, skip the physical rush — खासकर ग्रामीण मरीजों के लिए.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Hospital List + Nearby */}
          <div className="space-y-8">
            {/* Available Hospitals (from mockData) */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Live Queue – Partner Hospitals
              </h2>
              <div className="space-y-4">
                {hospitals.map((hospital) => (
                  <Card
                    key={hospital.id}
                    className={`hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${
                      selectedHospital === hospital.id ? 'ring-2 ring-primary/60' : ''
                    }`}
                    onClick={() => setSelectedHospital(hospital.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-foreground text-lg">
                          {hospital.name}
                        </h3>
                        <Badge variant="secondary" className="text-[10px]">
                          Live Queue
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {hospital.location}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {hospital.departments.map((dept) => (
                          <Badge key={dept} variant="outline" className="text-[11px]">
                            {dept}
                          </Badge>
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

            {/* Nearby Hospitals – richer info */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Nearby Hospitals & Rankings
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {nearbyHospitals.map((h, idx) => (
                  <Card
                    key={h.name}
                    className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white/90 border border-[#b7c9a5] fade-in-up"
                    style={{ animationDelay: `${idx * 70}ms` }}
                  >
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-sm text-[#2f4f32]">{h.name}</p>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${getTagColor(
                            h.tag
                          )}`}
                        >
                          {h.tag}
                        </span>
                      </div>
                      <p className="text-xs text-[#5b6a4a]">{h.address}</p>
                      <p className="text-xs text-[#3f4b2f]">
                        📞 <span className="font-mono">{h.phone}</span>
                      </p>
                      <p className="text-xs text-[#3f4b2f]">⏰ {h.timings}</p>

                      <div className="flex items-center gap-1 text-xs mt-1">
                        <Star className="h-3 w-3 text-amber-500 fill-amber-400" />
                        <span className="font-semibold">{h.rating.toFixed(1)}</span>
                        <span className="text-[10px] text-muted-foreground">
                          ({h.reviews} reviews)
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-2">
                        {h.features.map((f) => (
                          <span
                            key={f}
                            className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Token Booking Form + My Tokens */}
          <div className="space-y-6">
            {/* Booking Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Book Queue Token</CardTitle>
                <CardDescription>
                  Reserve your spot in the hospital queue (demo simulation).
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Hospital</Label>
                    <Select
                      value={selectedHospital}
                      onValueChange={setSelectedHospital}
                    >
                      <SelectTrigger>
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
                    className="w-full"
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
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>My Tokens</CardTitle>
                  <CardDescription>
                    Saved in this browser (local storage) – demo tokens.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {bookedTokens.map((token) => (
                      <div
                        key={token.id}
                        className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 p-4 rounded-xl flex flex-col gap-1 token-slide"
                      >
                        <div className="flex items-center justify-between">
                          <Badge variant="success">
                            Token #{token.tokenNumber}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground">
                            {token.id}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-[#23402a]">
                          {token.hospital}
                        </p>
                        <p className="text-xs text-[#4d5b3c]">{token.department}</p>
                        <p className="text-xs text-[#3b4a32] mt-1">
                          👤 {token.patient} • 📞 {token.phone}
                        </p>
                        <p className="text-xs text-[#23402a] mt-1">
                          Estimated wait:{' '}
                          <strong>~{token.estimatedWait} min</strong>
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

      {/* Small CSS animations for fade-in cards + token slide */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .fade-in-up {
            animation: fadeInUp 0.5s ease-out both;
          }

          @keyframes tokenSlide {
            from {
              opacity: 0;
              transform: translateX(12px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          .token-slide {
            animation: tokenSlide 0.4s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default Queues;
