import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { disasterAlerts } from '@/lib/mockData';
import { CloudRain, AlertTriangle, Wind, Droplets, Sparkles, ThermometerSun } from 'lucide-react';

const Disaster = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'flood':
        return CloudRain;
      case 'heatwave':
        return ThermometerSun;
      case 'storm':
        return Wind;
      default:
        return AlertTriangle;
    }
  };

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'critical';
      case 'high':
        return 'destructive';
      case 'medium':
        return 'warning';
      case 'low':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getSeverityLabel = (severity: string) => {
    if (severity === 'critical') return 'Critical';
    if (severity === 'high') return 'High';
    if (severity === 'medium') return 'Medium';
    if (severity === 'low') return 'Low';
    return 'Info';
  };

  const getTimeAgo = (timestamp: string) => {
    const hours = Math.floor(
      (Date.now() - new Date(timestamp).getTime()) / (1000 * 60 * 60)
    );
    if (hours < 1) return 'Just now';
    if (hours === 1) return '1 hour ago';
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return days === 1 ? '1 day ago' : `${days} days ago`;
  };

  const criticalCount = disasterAlerts.filter(a => a.severity === 'critical').length;
  const highCount = disasterAlerts.filter(a => a.severity === 'high').length;
  const medLowCount = disasterAlerts.filter(
    a => a.severity === 'medium' || a.severity === 'low'
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-background to-emerald-50 dark:from-slate-950 dark:via-background dark:to-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-sky-500 to-emerald-500 p-3 rounded-2xl shadow-lg shadow-sky-500/30">
              <CloudRain className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-sky-100/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-700 dark:bg-sky-900/60 dark:text-sky-100">
                Early Warning
              </p>
              <h1 className="mt-3 text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                Disaster + Health Alerts
              </h1>
              <p className="mt-1 text-sm sm:text-base text-muted-foreground max-w-xl">
                Combined view of weather disasters and connected health risks across your
                rural network.
              </p>
            </div>
          </div>

          {/* Small highlight pill */}
          <div className="inline-flex items-center gap-2 self-start rounded-2xl border border-amber-100 bg-amber-50/80 px-4 py-3 text-xs shadow-sm dark:border-amber-900 dark:bg-amber-950/50">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span className="font-medium text-amber-800 dark:text-amber-100">
              AI links heavy rain, heatwaves &amp; outbreaks for faster response.
            </span>
          </div>
        </div>

        {/* Today's Risk Snapshot */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-rose-200 bg-gradient-to-br from-rose-50 via-background to-rose-100/60 dark:from-rose-950/60 dark:via-slate-950 dark:to-rose-900/40 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-rose-500 p-2 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-rose-50" />
                </div>
                <h3 className="font-semibold text-foreground">Critical Alerts</h3>
              </div>
              <p className="text-3xl font-bold text-rose-600 dark:text-rose-300">
                {criticalCount}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Immediate attention required • Highest health impact
              </p>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-background to-amber-100/60 dark:from-amber-950/60 dark:via-slate-950 dark:to-amber-900/40 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-amber-500 p-2 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-amber-50" />
                </div>
                <h3 className="font-semibold text-foreground">High Risk</h3>
              </div>
              <p className="text-3xl font-bold text-amber-600 dark:text-amber-300">
                {highCount}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Likely to escalate without early intervention
              </p>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 via-background to-emerald-100/60 dark:from-emerald-950/60 dark:via-slate-950 dark:to-emerald-900/40 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-emerald-500 p-2 rounded-lg">
                  <CloudRain className="h-5 w-5 text-emerald-50" />
                </div>
                <h3 className="font-semibold text-foreground">Moderate / Low</h3>
              </div>
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-300">
                {medLowCount}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Keep monitoring • Prepare stock &amp; outreach
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Alert Timeline */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Active Alerts Timeline
          </h2>
          <p className="text-xs text-muted-foreground mb-4">
            Ordered by latest first • Each alert bundles both disaster info and
            health advice.
          </p>

          <div className="relative space-y-4">
            {/* vertical line for timeline on md+ */}
            <div className="pointer-events-none absolute left-4 top-0 hidden h-full border-l border-border/60 md:block" />

            {disasterAlerts.map(alert => {
              const Icon = getIcon(alert.type);
              return (
                <div key={alert.id} className="relative md:pl-10">
                  {/* timeline dot */}
                  <div className="hidden md:flex absolute left-3 top-8 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-background bg-primary shadow-sm" />
                  <Card className="hover:shadow-lg transition-all hover:-translate-y-[2px]">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="bg-accent p-3 rounded-xl">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <CardTitle className="text-base capitalize">
                                {alert.type} Alert
                              </CardTitle>
                              <Badge
                                variant={getSeverityVariant(alert.severity) as any}
                                className="text-[11px]"
                              >
                                {getSeverityLabel(alert.severity)}
                              </Badge>
                              <span className="rounded-full bg-muted px-2 py-[2px] text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                                {alert.region}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Updated {getTimeAgo(alert.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-5">
                      <div className="rounded-2xl border border-border/60 bg-accent/60 p-4">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.18em] mb-1">
                          Health advisory
                        </p>
                        <p className="text-sm text-foreground leading-relaxed">
                          {alert.healthAdvisory}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disaster;
