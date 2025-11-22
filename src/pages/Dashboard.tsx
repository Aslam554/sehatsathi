import {
  Pill,
  Ambulance,
  Users,
  Calendar,
  CloudRain,
  ShieldCheck,
  AlertTriangle,
  TrendingUp,
  LayoutDashboard
} from "lucide-react";

import SummaryCard from "@/components/dashboard/SummaryCard";

// Mock fallback data
import {
  medicineStatus as MOCK_MEDICINE,
  ambulances as MOCK_AMB,
  hospitals as MOCK_HOSP,
  disasterAlerts as MOCK_ALERTS
} from "@/lib/mockData";

import { useEffect, useState } from "react";

const Dashboard = () => {
  // ----------------------
  // LOCAL STORAGE STATES
  // ----------------------

  const [medicineStatus, setMedicineStatus] = useState([]);
  const [ambulances, setAmbulances] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [disasterAlerts, setDisasterAlerts] = useState([]);

  // Sidebar State
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Load from LS
  useEffect(() => {
    const load = (key, fallback) => {
      const data = localStorage.getItem(key);
      if (!data) return fallback;
      try {
        return JSON.parse(data);
      } catch {
        return fallback;
      }
    };

    setMedicineStatus(load("medicineStatus", MOCK_MEDICINE));
    setAmbulances(load("ambulances", MOCK_AMB));
    setHospitals(load("hospitals", MOCK_HOSP));
    setDisasterAlerts(load("disasterAlerts", MOCK_ALERTS));
  }, []);

  // Auto-save
  useEffect(
    () =>
      localStorage.setItem("medicineStatus", JSON.stringify(medicineStatus)),
    [medicineStatus]
  );
  useEffect(
    () => localStorage.setItem("ambulances", JSON.stringify(ambulances)),
    [ambulances]
  );
  useEffect(
    () => localStorage.setItem("hospitals", JSON.stringify(hospitals)),
    [hospitals]
  );
  useEffect(
    () => localStorage.setItem("disasterAlerts", JSON.stringify(disasterAlerts)),
    [disasterAlerts]
  );

  // ----------------------
  // Summary Calculations
  // ----------------------

  const criticalMedicines = medicineStatus.filter(
    (m) => m.status === "critical"
  ).length;
  const availableAmbulances = ambulances.filter(
    (a) => a.status === "available"
  ).length;
  const totalQueue = hospitals.reduce((s, h) => s + h.currentQueue, 0);
  const activeAlerts = disasterAlerts.filter(
    (a) => a.severity === "high" || a.severity === "critical"
  ).length;

  // ----------------------
  // SIDEBAR MENU ITEMS
  // ----------------------

  const MENU = [
    { label: "Overview", icon: LayoutDashboard },
    { label: "Medicine", icon: Pill },
    { label: "Ambulance", icon: Ambulance },
    { label: "Queues", icon: Calendar },
    { label: "Alerts", icon: CloudRain },
    { label: "Schemes", icon: ShieldCheck },
    { label: "Community", icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f3f7ed] via-[#e7f0da] to-[#dbe6cd] flex">

      {/* -------------------------------------------
          🌿 SIDEBAR 
      ---------------------------------------------*/}
      <div
        className={`
          h-screen bg-[#e8efd8] border-r border-[#b7c9a5] shadow-xl
          transition-all duration-500 sticky top-0
          ${sidebarOpen ? "w-64" : "w-20"}
        `}
      >
        {/* Toggle Button */}
        <div className="flex justify-end p-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
          >
            {sidebarOpen ? "<" : ">"}
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="mt-4 px-3 space-y-3">
          {MENU.map((item, idx) => {
            const Icon = item.icon;

            return (
              <button
                key={idx}
                className="
                  flex items-center gap-4 w-full px-3 py-3 rounded-xl
                  hover:bg-green-200 text-[#3f4b2f] font-medium
                  transition-all
                "
              >
                <Icon className="h-5 w-5" />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* -------------------------------------------
          🌿 MAIN CONTENT
      ---------------------------------------------*/}
      <div
        className="
          flex-1 p-10 animate-fadePage
        "
      >
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#3f6b45] drop-shadow-sm">
            🌾 Rural Health Dashboard
          </h1>
          <p className="text-[#58745a] text-sm mt-1">
            Real-time rural health intelligence • Smart village insights
          </p>
        </div>

        {/* SUMMARY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <SummaryCard
            title="Medicine Availability"
            icon={Pill}
            value={`${criticalMedicines} Critical`}
            description={`${medicineStatus.length} medicines tracked across villages`}
            status={criticalMedicines > 0 ? "critical" : "ok"}
            actionLabel="View Details"
            actionLink="/features/medicine"
            classy
          />

          <SummaryCard
            title="Emergency Services"
            icon={Ambulance}
            value={`${availableAmbulances}/${ambulances.length}`}
            description="Ambulances available for dispatch"
            status={availableAmbulances > 0 ? "ok" : "critical"}
            actionLabel="Emergency Hub"
            actionLink="/features/ambulance"
            classy
          />

          <SummaryCard
            title="Hospital Queues"
            icon={Calendar}
            value={totalQueue}
            description={`Total patients waiting across ${hospitals.length} facilities`}
            status="ok"
            actionLabel="Book Token"
            actionLink="/features/queues"
            classy
          />

          <SummaryCard
            title="Disaster Alerts"
            icon={CloudRain}
            value={activeAlerts}
            description="Active high-priority health alerts"
            status={activeAlerts > 0 ? "low" : "ok"}
            actionLabel="View Alerts"
            actionLink="/features/disaster"
            classy
          />

          <SummaryCard
            title="Health Schemes"
            icon={ShieldCheck}
            value="4 Active"
            description="Government schemes available for eligibility check"
            actionLabel="Check Eligibility"
            actionLink="/features/schemes"
            classy
          />

          <SummaryCard
            title="Community Network"
            icon={Users}
            value="Active"
            description="Blood donors, volunteers & riders ready to help"
            actionLabel="Join Network"
            actionLink="/features/community"
            classy
          />
        </div>

        {/* INSIGHTS ROW */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* AI INSIGHTS */}
          <div className="p-6 rounded-2xl border backdrop-blur-lg shadow-lg bg-gradient-to-br from-green-100/60 to-white/80 border-green-200">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-green-600 p-2 rounded-lg shadow-md">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-semibold text-lg text-[#2f4f32]">
                AI Predictions
              </h3>
            </div>

            <ul className="space-y-3 text-sm text-[#3b4d33]">
              <li>• <b>Rampur:</b> Paracetamol shortage predicted in 5 days</li>
              <li>• <b>Biswan:</b> Azithromycin critically low (3 days)</li>
              <li>• <b>Heatwave Alert:</b> ORS demand expected to spike</li>
            </ul>
          </div>

          {/* URGENT ROW */}
          <div className="p-6 rounded-2xl border backdrop-blur-lg shadow-lg bg-gradient-to-br from-orange-100/60 to-white/80 border-orange-200">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-orange-500 p-2 rounded-lg shadow-md">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-semibold text-lg text-[#5f3d1f]">
                Needs Attention
              </h3>
            </div>

            <ul className="space-y-3 text-sm text-[#4d3b28]">
              <li>• {criticalMedicines} medicines critically low</li>
              <li>• {activeAlerts} high severity disaster alerts</li>
              <li>
                • {ambulances.filter((a) => a.status === "offline").length}{" "}
                ambulances offline
              </li>
            </ul>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes fadePage {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadePage {
            animation: fadePage .8s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;
