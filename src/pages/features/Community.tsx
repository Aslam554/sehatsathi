import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { volunteers } from '@/lib/mockData';
import { Users, Heart, QrCode, Phone, MapPin, Droplets } from 'lucide-react';
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

  const bloodDonors = volunteers.filter(v => v.role === 'blood-donor');
  const firstAidVolunteers = volunteers.filter(v => v.role === 'first-aid');
  const riders = volunteers.filter(v => v.role === 'rider');

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-primary p-3 rounded-xl">
              <Users className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                Rural Health Community Network
              </h1>
              <p className="text-muted-foreground">
                Connect with volunteers, donors, and health supporters
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Volunteer Networks */}
          <div className="lg:col-span-2 space-y-6">
            {/* Blood Donors */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-destructive" />
                  <CardTitle>Blood Donors Network</CardTitle>
                </div>
                <CardDescription>Available blood donors in your region</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {bloodDonors.map(donor => (
                    <div key={donor.id} className="border border-border p-4 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-foreground">{donor.name}</p>
                          <p className="text-sm text-muted-foreground">{donor.village}</p>
                        </div>
                        <Badge variant={donor.available ? 'success' : 'secondary'}>
                          {donor.bloodGroup}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{donor.contact}</span>
                      </div>
                      {!donor.available && (
                        <p className="text-xs text-muted-foreground mt-2">Currently unavailable</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* First Aid Volunteers */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-success" />
                  <CardTitle>First-Aid Volunteers</CardTitle>
                </div>
                <CardDescription>Trained volunteers ready to help</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {firstAidVolunteers.map(volunteer => (
                    <div key={volunteer.id} className="border border-border p-4 rounded-lg">
                      <p className="font-medium text-foreground mb-1">{volunteer.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4" />
                        <span>{volunteer.village}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{volunteer.contact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Transport Riders */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <CardTitle>Transport / Rider Volunteers</CardTitle>
                </div>
                <CardDescription>Riders available for emergency transport</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {riders.map(rider => (
                    <div key={rider.id} className="border border-border p-4 rounded-lg">
                      <p className="font-medium text-foreground mb-1">{rider.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4" />
                        <span>{rider.village}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{rider.contact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Join & Donate */}
          <div className="space-y-6">
            {/* Register as Volunteer */}
            <Card>
              <CardHeader>
                <CardTitle>Become a Volunteer</CardTitle>
                <CardDescription>Join the community health network</CardDescription>
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
                  <Button className="w-full">Register</Button>
                </div>
              </CardContent>
            </Card>

            {/* Donation Section */}
            <Card className="bg-gradient-to-br from-primary/10 to-accent">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <QrCode className="h-5 w-5 text-primary" />
                  <CardTitle>Support Rural Health</CardTitle>
                </div>
                <CardDescription>Donate for emergency medical support</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-background p-6 rounded-lg border border-border mb-4">
                  <div className="bg-muted h-40 rounded-lg flex items-center justify-center">
                    <QrCode className="h-20 w-20 text-muted-foreground" />
                  </div>
                  <p className="text-center text-sm text-muted-foreground mt-3">
                    Scan QR to donate
                  </p>
                </div>
                <p className="text-sm text-foreground">
                  Your donations directly support emergency medicines, ambulance fuel, 
                  and volunteer stipends in rural areas.
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
