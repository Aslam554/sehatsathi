import { 
  Pill, 
  Ambulance, 
  Users, 
  Calendar, 
  CloudRain, 
  ShieldCheck,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';
import SummaryCard from '@/components/dashboard/SummaryCard';
import { medicineStatus, ambulances, hospitals, disasterAlerts } from '@/lib/mockData';

const Dashboard = () => {
  // Calculate summary stats
  const criticalMedicines = medicineStatus.filter(m => m.status === 'critical').length;
  const availableAmbulances = ambulances.filter(a => a.status === 'available').length;
  const totalQueue = hospitals.reduce((sum, h) => sum + h.currentQueue, 0);
  const activeAlerts = disasterAlerts.filter(a => a.severity === 'high' || a.severity === 'critical').length;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Rural Health Dashboard
          </h1>
          <p className="text-muted-foreground">
            Real-time health intelligence for your region
          </p>
        </div>

        {/* Summary Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <SummaryCard
            title="Medicine Availability"
            icon={Pill}
            value={`${criticalMedicines} Critical`}
            description={`${medicineStatus.length} medicines tracked across villages`}
            status={criticalMedicines > 0 ? 'critical' : 'ok'}
            actionLabel="View Details"
            actionLink="/features/medicine"
          />

          <SummaryCard
            title="Emergency Services"
            icon={Ambulance}
            value={`${availableAmbulances}/${ambulances.length}`}
            description="Ambulances available for dispatch"
            status={availableAmbulances > 0 ? 'ok' : 'critical'}
            actionLabel="Emergency Hub"
            actionLink="/features/ambulance"
          />

          <SummaryCard
            title="Hospital Queues"
            icon={Calendar}
            value={totalQueue}
            description={`Total patients waiting across ${hospitals.length} facilities`}
            status="ok"
            actionLabel="Book Token"
            actionLink="/features/queues"
          />

          <SummaryCard
            title="Disaster Alerts"
            icon={CloudRain}
            value={activeAlerts}
            description="Active high-priority health alerts"
            status={activeAlerts > 0 ? 'low' : 'ok'}
            actionLabel="View Alerts"
            actionLink="/features/disaster"
          />

          <SummaryCard
            title="Health Schemes"
            icon={ShieldCheck}
            value="4 Active"
            description="Government schemes available for eligibility check"
            actionLabel="Check Eligibility"
            actionLink="/features/schemes"
          />

          <SummaryCard
            title="Community Network"
            icon={Users}
            value="Active"
            description="Blood donors, volunteers & riders ready to help"
            actionLabel="Join Network"
            actionLink="/features/community"
          />
        </div>

        {/* Quick Insights */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* AI Insights */}
          <div className="bg-gradient-to-br from-primary/10 to-accent p-6 rounded-2xl border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary p-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-lg text-foreground">AI Predictions</h3>
            </div>
            <ul className="space-y-2">
              <li className="text-sm text-foreground">
                • <strong>Rampur:</strong> Paracetamol shortage predicted in 5 days
              </li>
              <li className="text-sm text-foreground">
                • <strong>Biswan:</strong> Azithromycin critically low (3 days)
              </li>
              <li className="text-sm text-foreground">
                • <strong>Heatwave Alert:</strong> Increased ORS demand expected
              </li>
            </ul>
          </div>

          {/* Urgent Actions */}
          <div className="bg-gradient-to-br from-warning/10 to-accent p-6 rounded-2xl border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-warning p-2 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-warning-foreground" />
              </div>
              <h3 className="font-semibold text-lg text-foreground">Needs Attention</h3>
            </div>
            <ul className="space-y-2">
              <li className="text-sm text-foreground">
                • {criticalMedicines} medicines at critical stock levels
              </li>
              <li className="text-sm text-foreground">
                • {activeAlerts} active disaster health alerts
              </li>
              <li className="text-sm text-foreground">
                • {ambulances.filter(a => a.status === 'offline').length} ambulances offline - maintenance needed
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
