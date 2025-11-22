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

  const filteredMedicines = selectedVillage === 'all'
    ? medicineStatus
    : medicineStatus.filter(m => m.villageId === selectedVillage);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'ok': return 'ok';
      case 'low': return 'low';
      case 'critical': return 'critical';
      default: return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-primary p-3 rounded-xl">
              <Pill className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                Predictive Medicine Pipeline
              </h1>
              <p className="text-muted-foreground">
                AI-powered medicine shortage prediction and monitoring
              </p>
            </div>
          </div>
        </div>

        {/* AI Insight Box */}
        <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-accent">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle className="text-primary">AI Predictions</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Rampur - Paracetamol Shortage Alert</p>
                <p className="text-sm text-muted-foreground">
                  AI predicts critical shortage in 5 days. Current stock: 50 units. Required: 200 units.
                  Recommended action: Order 150+ units immediately.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Biswan - Azithromycin Critical</p>
                <p className="text-sm text-muted-foreground">
                  AI predicts stockout in 3 days. Immediate supply needed for 50+ units.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <TrendingDown className="h-5 w-5 text-warning mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Khairabad - ORS Low Stock</p>
                <p className="text-sm text-muted-foreground">
                  With ongoing heatwave, ORS demand likely to increase. Stock up recommended.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-2">
            Filter by Village
          </label>
          <Select value={selectedVillage} onValueChange={setSelectedVillage}>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue placeholder="Select village" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Villages</SelectItem>
              {villages.map(v => (
                <SelectItem key={v.id} value={v.id}>{v.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Medicine Status Table/Cards */}
        <div className="grid gap-4">
          {filteredMedicines.map((medicine, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        {medicine.medicine}
                      </h3>
                      <Badge variant={getStatusVariant(medicine.status)}>
                        {medicine.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {medicine.villageName}, {villages.find(v => v.id === medicine.villageId)?.district}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="text-foreground">
                        <strong>Stock:</strong> {medicine.currentStock} units
                      </span>
                      <span className="text-foreground">
                        <strong>Required:</strong> {medicine.requiredStock} units
                      </span>
                      {medicine.predictedShortageIn && (
                        <span className="text-warning font-medium">
                          <strong>Shortage in:</strong> {medicine.predictedShortageIn} days
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMedicines.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">No medicine data available for selected village.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Medicine;
