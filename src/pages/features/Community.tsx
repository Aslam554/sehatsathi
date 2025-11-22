import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { volunteers } from '@/lib/mockData';
import {
  Users,
  Heart,
  QrCode,
  Phone,
  MapPin,
  Droplets,
  Sparkles,
  HandHeart,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Community = () => {
  const [volunteerName, setVolunteerName] = useState('');
  const [volunteerRole, setVolunteerRole] = useState('');
  const [volunteerVillage, setVolunteerVillage] = useState('');
  const [volunteerContact, setVolunteerContact] = useState('');

  const bloodDonors = volunteers.filter((v) => v.role === 'blood-donor');
  const firstAidVolunteers = volunteers.filter((v) => v.role === 'first-aid');
  const riders = volunteers.filter((v) => v.role === 'rider');

  const totalVolunteers = volunteers.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-background to-sky-50 dark:from-slate-950 dark:via-background dark:to-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-3 rounded-2xl shadow-lg shadow-emerald-500/30">
              <Users className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-100">
                Community Network
              </p>
              <h1 className="mt-3 text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                Rural Health Community Network
              </h1>
              <p className="mt-1 text-sm sm:text-base text-muted-foreground max-w-xl">
                Connect with donors, first-aid volunteers, and riders who can help in medical
                emergencies across villages.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 max-w-md text-sm">
            <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">
                Total volunteers
              </p>
              <p className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-50">
                {totalVolunteers}
              </p>
            </div>
            <div className="rounded-2xl border border-rose-200 bg-rose-50/80 px-4 py-3 shadow-sm dark:border-rose-800 dark:bg-rose-950/70">
              <p className="text-[11px] uppercase tracking-[0.18em] text-rose-700 dark:text-rose-200">
                Blood donors
              </p>
              <p className="mt-1 text-xl font-semibold text-rose-900 dark:text-rose-50">
                {bloodDonors.length}
              </p>
            </div>
            <div className="rounded-2xl border border-sky-200 bg-sky-50/80 px-4 py-3 shadow-sm dark:border-sky-800 dark:bg-sky-950/70">
              <p className="text-[11px] uppercase tracking-[0.18em] text-sky-700 dark:text-sky-200">
                First-aid & riders
              </p>
              <p className="mt-1 text-xl font-semibold text-sky-900 dark:text-sky-50">
                {firstAidVolunteers.length + riders.length}
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Volunteer Networks */}
          <div className="lg:col-span-2 space-y-6">
            {/* Blood Donors */}
            <Card className="border-none bg-gradient-to-br from-rose-50 via-background to-rose-100 dark:from-rose-950/50 dark:via-slate-950 dark:to-rose-900/40 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <Droplets className="h-5 w-5 text-destructive" />
                      <CardTitle>Blood Donors Network</CardTitle>
                    </div>
                    <CardDescription>
                      Available blood donors in your connected villages.
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-[11px] rounded-full">
                    {bloodDonors.length} donors
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {bloodDonors.map((donor) => (
                    <div
                      key={donor.id}
                      className="border border-rose-100 dark:border-rose-900/70 bg-background/80 p-4 rounded-2xl"
                    >
                      <div className="flex items-start justify-between mb-2 gap-2">
                        <div>
                          <p className="font-medium text-foreground">{donor.name}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {donor.village}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <Badge
                            variant={donor.available ? 'success' : 'secondary'}
                            className="text-[11px]"
                          >
                            {donor.bloodGroup}
                          </Badge>
                          {!donor.available && (
                            <span className="text-[10px] text-muted-foreground">
                              Unavailable now
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{donor.contact}</span>
                      </div>
                    </div>
                  ))}
                  {bloodDonors.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      No donors listed yet. Encourage community members to register.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* First Aid Volunteers */}
            <Card className="border-none bg-gradient-to-br from-emerald-50 via-background to-emerald-100 dark:from-emerald-950/50 dark:via-slate-950 dark:to-emerald-900/40 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-success" />
                    <CardTitle>First-Aid Volunteers</CardTitle>
                  </div>
                  <Badge variant="outline" className="text-[11px] rounded-full">
                    {firstAidVolunteers.length} trained
                  </Badge>
                </div>
                <CardDescription>Trained volunteers ready to help with basic care.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {firstAidVolunteers.map((volunteer) => (
                    <div
                      key={volunteer.id}
                      className="border border-emerald-100 dark:border-emerald-900/70 bg-background/80 p-4 rounded-2xl"
                    >
                      <p className="font-medium text-foreground mb-1">{volunteer.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4" />
                        <span>{volunteer.village}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{volunteer.contact}</span>
                      </div>
                    </div>
                  ))}
                  {firstAidVolunteers.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      No first-aid volunteers added yet.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Transport Riders */}
            <Card className="border-none bg-gradient-to-br from-sky-50 via-background to-sky-100 dark:from-sky-950/50 dark:via-slate-950 dark:to-sky-900/40 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <CardTitle>Transport / Rider Volunteers</CardTitle>
                  </div>
                  <Badge variant="outline" className="text-[11px] rounded-full">
                    {riders.length} riders
                  </Badge>
                </div>
                <CardDescription>
                  Riders who can help with emergency transport to clinics &amp; hospitals.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {riders.map((rider) => (
                    <div
                      key={rider.id}
                      className="border border-sky-100 dark:border-sky-900/70 bg-background/80 p-4 rounded-2xl"
                    >
                      <p className="font-medium text-foreground mb-1">{rider.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4" />
                        <span>{rider.village}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{rider.contact}</span>
                      </div>
                    </div>
                  ))}
                  {riders.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      No riders registered yet. Invite local bike / auto owners.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Join & Donate */}
          <div className="space-y-6">
            {/* Register as Volunteer */}
            <Card className="border-none bg-gradient-to-br from-white via-background to-emerald-50 shadow-lg dark:from-slate-950 dark:via-slate-950 dark:to-emerald-950/60">
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <CardTitle>Become a Volunteer</CardTitle>
                    <CardDescription>Join the rural health support network.</CardDescription>
                  </div>
                  <HandHeart className="h-6 w-6 text-emerald-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Name</Label>
                    <Input
                      value={volunteerName}
                      onChange={(e) => setVolunteerName(e.target.value)}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <Label>Role</Label>
                    <Select value={volunteerRole} onValueChange={setVolunteerRole}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blood-donor">Blood Donor</SelectItem>
                        <SelectItem value="first-aid">First-Aid Volunteer</SelectItem>
                        <SelectItem value="rider">Transport Rider</SelectItem>
                        <SelectItem value="general">General Volunteer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Village</Label>
                    <Input
                      value={volunteerVillage}
                      onChange={(e) => setVolunteerVillage(e.target.value)}
                      placeholder="Your village"
                    />
                  </div>
                  <div>
                    <Label>Contact</Label>
                    <Input
                      value={volunteerContact}
                      onChange={(e) => setVolunteerContact(e.target.value)}
                      placeholder="Phone number"
                      type="tel"
                    />
                  </div>
                  <Button className="w-full rounded-full">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Register
                  </Button>
                  <p className="text-[11px] text-muted-foreground text-center">
                    In a real app, we&apos;d verify via OTP and map you to the right village
                    cluster.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Donation Section */}
            <Card className="bg-gradient-to-br from-primary/15 via-background to-emerald-100 dark:from-primary/30 dark:via-slate-950 dark:to-emerald-950/50 border-none shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <QrCode className="h-5 w-5 text-primary" />
                  <CardTitle>Support Rural Health</CardTitle>
                </div>
                <CardDescription>Donate to strengthen the community response.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-background p-5 rounded-2xl border border-border/70 mb-4">
                  <div className="bg-muted h-40 rounded-xl flex items-center justify-center">
                    <QrCode className="h-20 w-20 text-muted-foreground" />
                  </div>
                  <p className="text-center text-sm text-muted-foreground mt-3">
                    Scan QR to donate (demo QR)
                  </p>
                </div>
                <p className="text-sm text-foreground">
                  Your contributions can fund emergency medicines, ambulance fuel, training
                  sessions, and small stipends for volunteers in remote villages.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
