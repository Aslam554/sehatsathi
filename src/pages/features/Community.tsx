import { useEffect, useState } from "react";
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

import {
  Users,
  Heart,
  QrCode,
  Phone,
  MapPin,
  Droplets,
  Radio,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// --------------------
// DEFAULT DATA
// --------------------
const DEFAULT_VOLUNTEERS = [
  {
    id: "v1",
    name: "Ramesh",
    role: "blood-donor",
    village: "Rampur",
    contact: "9876543210",
    bloodGroup: "O+",
    available: true,
  },
  {
    id: "v2",
    name: "Sita Devi",
    role: "first-aid",
    village: "Biswan",
    contact: "9876500010",
    available: true,
  },
  {
    id: "v3",
    name: "Aman",
    role: "rider",
    village: "Tikri",
    contact: "9000001111",
    available: false,
  },
];

const Community = () => {
  const [volunteers, setVolunteers] = useState([]);

  // NEW volunteer fields
  const [volunteerName, setVolunteerName] = useState("");
  const [volunteerRole, setVolunteerRole] = useState("");
  const [volunteerVillage, setVolunteerVillage] = useState("");
  const [volunteerContact, setVolunteerContact] = useState("");

  // --------------------
  // LOAD LOCAL STORAGE
  // --------------------
  useEffect(() => {
    const stored = localStorage.getItem("volunteers");
    if (stored) {
      setVolunteers(JSON.parse(stored));
    } else {
      setVolunteers(DEFAULT_VOLUNTEERS);
    }
  }, []);

  // AUTO SAVE
  useEffect(() => {
    localStorage.setItem("volunteers", JSON.stringify(volunteers));
  }, [volunteers]);

  // --------------------
  // ADD NEW VOLUNTEER
  // --------------------
  const addVolunteer = () => {
    if (!volunteerName || !volunteerRole || !volunteerVillage || !volunteerContact) return;

    const newEntry = {
      id: crypto.randomUUID(),
      name: volunteerName,
      role: volunteerRole,
      village: volunteerVillage,
      contact: volunteerContact,
      available: true,
      bloodGroup: volunteerRole === "blood-donor" ? "O+" : null,
    };

    setVolunteers([newEntry, ...volunteers]);

    setVolunteerName("");
    setVolunteerRole("");
    setVolunteerVillage("");
    setVolunteerContact("");
  };

  // --------------------
  // SIMULATION (ONLINE/OFFLINE)
  // --------------------
  const toggleStatus = (id) => {
    setVolunteers(
      volunteers.map((v) =>
        v.id === id ? { ...v, available: !v.available } : v
      )
    );
  };

  // FILTERS
  const bloodDonors = volunteers.filter((v) => v.role === "blood-donor");
  const firstAidVolunteers = volunteers.filter((v) => v.role === "first-aid");
  const riders = volunteers.filter((v) => v.role === "rider");

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eef4e7] via-[#e4ecd8] to-[#dae6cd]">
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-green-700 p-3 rounded-xl shadow-md">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-[#2f4f32]">
              🌾 Rural Community Health Network
            </h1>
            <p className="text-[#58745a]">
              Real community help from nearby villages — Blood, First-Aid, Riders
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT SIDE LISTS */}
          <div className="lg:col-span-2 space-y-8">

            {/* BLOOD DONORS */}
            <Card className="border-green-300 bg-white/70 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-red-600" />
                  <CardTitle className="text-[#2f4f32]">Blood Donors</CardTitle>
                </div>
                <CardDescription>
                  Verified blood donors from nearby villages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {bloodDonors.map((donor) => (
                    <div
                      key={donor.id}
                      className="border rounded-xl bg-white p-4 shadow-sm hover:shadow-lg transition"
                    >
                      <div className="flex justify-between mb-2">
                        <p className="font-semibold text-[#2f4f32]">
                          {donor.name}
                        </p>
                        <Badge
                          className={`px-3 ${
                            donor.available ? "bg-red-600 text-white" : "bg-gray-400"
                          }`}
                        >
                          {donor.bloodGroup}
                        </Badge>
                      </div>

                      <p className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {donor.village}
                      </p>

                      <p className="flex items-center gap-2 text-sm my-1">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        {donor.contact}
                      </p>

                      <Button
                        size="sm"
                        variant={donor.available ? "destructive" : "default"}
                        className="mt-2"
                        onClick={() => toggleStatus(donor.id)}
                      >
                        <Radio className="h-4 w-4 mr-1" />
                        {donor.available ? "Go Offline" : "Go Online"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* FIRST AID */}
            <Card className="border-green-300 bg-white/70 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-[#2f4f32]">First-Aid Volunteers</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {firstAidVolunteers.map((v) => (
                    <div
                      key={v.id}
                      className="border rounded-xl p-4 bg-white hover:shadow-lg transition"
                    >
                      <p className="font-medium text-[#2f4f32]">{v.name}</p>
                      <p className="flex items-center gap-2 text-sm text-muted-foreground my-1">
                        <MapPin className="h-4 w-4" /> {v.village}
                      </p>
                      <p className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4" /> {v.contact}
                      </p>

                      <Button
                        size="sm"
                        variant={v.available ? "destructive" : "default"}
                        className="mt-2"
                        onClick={() => toggleStatus(v.id)}
                      >
                        <Radio className="h-4 w-4 mr-1" />
                        {v.available ? "Go Offline" : "Go Online"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* RIDERS */}
            <Card className="border-green-300 bg-white/70 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-[#2f4f32]">Transport Riders</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {riders.map((r) => (
                    <div
                      key={r.id}
                      className="border rounded-xl p-4 bg-white hover:shadow-lg transition"
                    >
                      <p className="font-medium text-[#2f4f32]">{r.name}</p>

                      <p className="flex items-center gap-2 text-sm text-muted-foreground my-1">
                        <MapPin className="h-4 w-4" /> {r.village}
                      </p>

                      <p className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4" /> {r.contact}
                      </p>

                      <Button
                        size="sm"
                        variant={r.available ? "destructive" : "default"}
                        className="mt-2"
                        onClick={() => toggleStatus(r.id)}
                      >
                        <Radio className="h-4 w-4 mr-1" />
                        {r.available ? "Go Offline" : "Go Online"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT SIDE: REGISTER + DONATION */}
          <div className="space-y-8">

            {/* REGISTER */}
            <Card className="shadow-xl bg-white/70 border-green-200 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-[#2f4f32]">
                  Become a Volunteer
                </CardTitle>
                <CardDescription>Join your village help network</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">

                  <div>
                    <Label>Name</Label>
                    <Input
                      value={volunteerName}
                      onChange={(e) => setVolunteerName(e.target.value)}
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
                        <SelectItem value="first-aid">First-Aid</SelectItem>
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
                    />
                  </div>

                  <div>
                    <Label>Contact</Label>
                    <Input
                      value={volunteerContact}
                      onChange={(e) => setVolunteerContact(e.target.value)}
                    />
                  </div>

                  <Button className="w-full bg-green-700 hover:bg-green-800" onClick={addVolunteer}>
                    Add Volunteer
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* DONATION */}
            <Card className="border-green-400 bg-gradient-to-br from-green-100 to-green-200 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <QrCode className="h-5 w-5 text-green-700" />
                  <CardTitle>Support Rural Health</CardTitle>
                </div>
                <CardDescription>Donate for medicines, ambulance & training</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="p-6 bg-white rounded-xl border text-center shadow">
                  <QrCode className="h-24 w-24 mx-auto text-green-700" />
                  <p className="text-xs text-muted-foreground mt-3">
                    Scan QR to donate
                  </p>
                </div>

                <p className="text-sm text-[#3f4b2f] mt-4">
                  Your contribution helps villagers during emergencies.
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
