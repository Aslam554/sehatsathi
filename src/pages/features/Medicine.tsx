import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { medicineStatus, villages } from '@/lib/mockData';
import { Pill, AlertCircle, TrendingDown, Sparkles } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Medicine = () => {
  const [selectedVillage, setSelectedVillage] = useState<string>('all');

  const filteredMedicines =
    selectedVillage === 'all'
      ? medicineStatus
      : medicineStatus.filter((m) => m.villageId === selectedVillage);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'ok':
        return 'ok';
      case 'low':
        return 'low';
      case 'critical':
        return 'critical';
      default:
        return 'default';
    }
  };

  const getStatusCardClasses = (status: string) => {
    if (status === 'ok')
      return 'border-emerald-100 bg-emerald-50/70 dark:border-emerald-900/60 dark:bg-emerald-950/40';
    if (status === 'low')
      return 'border-amber-100 bg-amber-50/70 dark:border-amber-900/60 dark:bg-amber-950/40';
    if (status === 'critical')
      return 'border-rose-100 bg-rose-50/75 dark:border-rose-900/60 dark:bg-rose-950/40';
    return 'border-slate-100 bg-card';
  };

  const totalItems = medicineStatus.length;
  const lowCount = medicineStatus.filter((m) => m.status === 'low').length;
  const criticalCount = medicineStatus.filter((m) => m.status === 'critical').length;

  const getVillageLabel = (id: string) => villages.find((v) => v.id === id)?.district ?? '';

  const getStockPercent = (current: number, required: number) => {
    if (!required) return 0;
    const pct = (current / required) * 100;
    return Math.max(0, Math.min(100, pct));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-background to-sky-50 dark:from-slate-950 dark:via-background dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-3 rounded-2xl shadow-lg shadow-emerald-500/30">
              <Pill className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-100">
                Supply Intelligence
              </p>
              <h1 className="mt-3 text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                Predictive Medicine Pipeline
              </h1>
              <p className="mt-1 text-sm sm:text-base text-muted-foreground max-w-xl">
                AI-powered monitoring of key medicines across connected villages, so shortages
                are caught before they happen.
              </p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3 max-w-md text-sm">
            <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">
                Total records
              </p>
              <p className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-50">
                {totalItems}
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50/80 px-4 py-3 shadow-sm dark:border-amber-800 dark:bg-amber-950/70">
              <p className="text-[11px] uppercase tracking-[0.18em] text-amber-700 dark:text-amber-200">
                Low stock
              </p>
              <p className="mt-1 text-xl font-semibold text-amber-900 dark:text-amber-50">
                {lowCount}
              </p>
            </div>
            <div className="rounded-2xl border border-rose-200 bg-rose-50/80 px-4 py-3 shadow-sm dark:border-rose-800 dark:bg-rose-950/70">
              <p className="text-[11px] uppercase tracking-[0.18em] text-rose-700 dark:text-rose-200">
                Critical
              </p>
              <p className="mt-1 text-xl font-semibold text-rose-900 dark:text-rose-50">
                {criticalCount}
              </p>
            </div>
          </div>
        </div>

        {/* AI Insight Box */}
        <Card className="mb-8 border-primary/20 bg-gradient-to-br from-emerald-50 via-background to-sky-50 dark:from-emerald-950/40 dark:via-slate-950 dark:to-sky-950/40 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <div>
                <CardTitle className="text-sm sm:text-base">AI Predictions</CardTitle>
                <CardDescription>Upcoming risks flagged by the prediction model</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-start gap-3 rounded-xl bg-amber-50/80 p-3 dark:bg-amber-950/40">
              <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Rampur • Paracetamol Shortage</p>
                <p className="text-muted-foreground">
                  Critical shortage predicted in <span className="font-semibold">5 days</span>.
                  Current stock: <strong>50</strong> units, required:{' '}
                  <strong>200</strong>. Recommended: order{' '}
                  <strong className="text-amber-700 dark:text-amber-300">150+</strong> units.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl bg-rose-50/85 p-3 dark:bg-rose-950/40">
              <AlertCircle className="h-5 w-5 text-rose-600 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Biswan • Azithromycin Critical</p>
                <p className="text-muted-foreground">
                  Stockout predicted in <span className="font-semibold">3 days</span>. Immediate
                  resupply required for at least <strong>50</strong> units.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl bg-amber-50/80 p-3 dark:bg-amber-950/40">
              <TrendingDown className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Khairabad • ORS Low</p>
                <p className="text-muted-foreground">
                  Heatwave is increasing dehydration cases. ORS consumption is expected to rise;
                  proactive stock-up is advised.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filter + legend */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Filter by Village
            </label>
            <Select value={selectedVillage} onValueChange={setSelectedVillage}>
              <SelectTrigger className="w-full md:w-72 bg-background/80">
                <SelectValue placeholder="Select village" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Villages</SelectItem>
                {villages.map((v) => (
                  <SelectItem key={v.id} value={v.id}>
                    {v.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground md:justify-end">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 dark:bg-emerald-950/60">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              OK
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 dark:bg-amber-950/60">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Low
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-1 dark:bg-rose-950/60">
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              Critical
            </span>
          </div>
        </div>

        {/* Medicine Status Cards */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredMedicines.map((medicine, idx) => {
            const district = getVillageLabel(medicine.villageId);
            const pct = getStockPercent(medicine.currentStock, medicine.requiredStock);

            return (
              <Card
                key={idx}
                className={`hover:shadow-lg transition-all hover:-translate-y-[2px] border ${getStatusCardClasses(
                  medicine.status
                )}`}
              >
                <CardContent className="p-5 flex flex-col gap-4 h-full">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-semibold text-foreground">
                          {medicine.medicine}
                        </h3>
                        <Badge variant={getStatusVariant(medicine.status)} className="text-[11px]">
                          {medicine.status.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {medicine.villageName}
                        {district ? ` • ${district}` : ''}
                      </p>
                    </div>
                    {medicine.predictedShortageIn && (
                      <div className="rounded-full bg-background/70 px-3 py-1 text-[11px] font-medium text-rose-700 dark:text-rose-200">
                        T-{medicine.predictedShortageIn} days
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex flex-wrap gap-4">
                      <span className="text-foreground">
                        <strong>Stock:</strong> {medicine.currentStock} units
                      </span>
                      <span className="text-foreground">
                        <strong>Required:</strong> {medicine.requiredStock} units
                      </span>
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between text-[11px] text-muted-foreground">
                        <span>Stock level</span>
                        <span>{Math.round(pct)}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            medicine.status === 'critical'
                              ? 'bg-rose-500'
                              : medicine.status === 'low'
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto flex justify-end">
                    <Button variant="outline" size="sm" className="rounded-full px-4">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredMedicines.length === 0 && (
          <Card className="mt-6">
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">
                No medicine data available for the selected village.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Medicine;
