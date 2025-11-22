import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { disasterAlerts } from '@/lib/mockData';
import { CloudRain, AlertTriangle, Wind, Droplets } from 'lucide-react';

const Disaster = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'flood': return CloudRain;
      case 'heatwave': return Droplets;
      case 'storm': return Wind;
      default: return AlertTriangle;
    }
  };

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case 'critical': return 'critical';
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const hours = Math.floor((Date.now() - new Date(timestamp).getTime()) / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours === 1) return '1 hour ago';
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return days === 1 ? '1 day ago' : `${days} days ago`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-primary p-3 rounded-xl">
              <CloudRain className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                Disaster + Health Alerts
              </h1>
              <p className="text-muted-foreground">
                Combined disaster warnings with health advisories
              </p>
            </div>
          </div>
        </div>

        {/* Today's Risk Snapshot */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-destructive/20 bg-destructive/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-destructive p-2 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-destructive-foreground" />
                </div>
                <h3 className="font-semibold text-foreground">High Risk</h3>
              </div>
              <p className="text-2xl font-bold text-destructive">1</p>
              <p className="text-sm text-muted-foreground">Active high alerts</p>
            </CardContent>
          </Card>

          <Card className="border-warning/20 bg-warning/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-warning p-2 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-warning-foreground" />
                </div>
                <h3 className="font-semibold text-foreground">Medium Risk</h3>
              </div>
              <p className="text-2xl font-bold text-warning">1</p>
              <p className="text-sm text-muted-foreground">Active medium alerts</p>
            </CardContent>
          </Card>

          <Card className="border-success/20 bg-success/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-success p-2 rounded-lg">
                  <CloudRain className="h-5 w-5 text-success-foreground" />
                </div>
                <h3 className="font-semibold text-foreground">Low Risk</h3>
              </div>
              <p className="text-2xl font-bold text-success">1</p>
              <p className="text-sm text-muted-foreground">Active low alerts</p>
            </CardContent>
          </Card>
        </div>

        {/* Alert Timeline */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Active Alerts</h2>
          <div className="space-y-4">
            {disasterAlerts.map(alert => {
              const Icon = getIcon(alert.type);
              return (
                <Card key={alert.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="bg-accent p-3 rounded-xl">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle className="text-lg capitalize">{alert.type} Alert</CardTitle>
                            <Badge variant={getSeverityVariant(alert.severity) as any}>
                              {alert.severity.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{alert.region}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {getTimeAgo(alert.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-accent p-4 rounded-lg border border-border">
                      <p className="text-sm font-medium text-foreground mb-1">Health Advisory:</p>
                      <p className="text-sm text-foreground">{alert.healthAdvisory}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disaster;
