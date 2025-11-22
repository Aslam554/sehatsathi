import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { schemes } from '@/lib/mockData';
import { ShieldCheck, FileText, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

const Schemes = () => {
  const [aadhaar, setAadhaar] = useState('');
  const [checked, setChecked] = useState(false);
  const [eligibilityResults, setEligibilityResults] = useState<any[]>([]);

  const handleCheck = () => {
    if (aadhaar.length >= 12) {
      // Mock eligibility check
      const results = schemes.map(scheme => ({
        ...scheme,
        eligible: Math.random() > 0.3, // Random eligibility for demo
        documentsNeeded: Math.random() > 0.5 ? ['Income Certificate', 'Residence Proof'] : [],
      }));
      setEligibilityResults(results);
      setChecked(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-primary p-3 rounded-xl">
              <ShieldCheck className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                Government Scheme Eligibility
              </h1>
              <p className="text-muted-foreground">
                Check which health schemes you qualify for
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Check Eligibility Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Check Eligibility</CardTitle>
                <CardDescription>
                  Enter your Aadhaar number to check scheme eligibility
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Aadhaar Number</Label>
                    <Input 
                      value={aadhaar}
                      onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, '').slice(0, 12))}
                      placeholder="Enter 12-digit Aadhaar" 
                      maxLength={12}
                    />
                  </div>

                  <div className="bg-accent p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                      <FileText className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground mb-1">
                          DigiLocker Integration
                        </p>
                        <p className="text-xs text-muted-foreground">
                          We will auto-fetch documents from DigiLocker including Aadhaar, 
                          income certificate, caste certificate, and residence proof for 
                          instant eligibility verification.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleCheck}
                    disabled={aadhaar.length < 12}
                    className="w-full"
                  >
                    Check Eligibility
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Available Schemes Info */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Available Schemes</CardTitle>
                <CardDescription>Government health schemes you can check</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {schemes.map(scheme => (
                    <div key={scheme.id} className="border border-border p-3 rounded-lg">
                      <p className="font-medium text-foreground text-sm">{scheme.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{scheme.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Results */}
          <div>
            {checked ? (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">Eligibility Results</h2>
                {eligibilityResults.map(result => (
                  <Card key={result.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{result.name}</CardTitle>
                          <CardDescription className="mt-1">{result.description}</CardDescription>
                        </div>
                        {result.eligible ? (
                          <Badge variant="success" className="ml-2">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Eligible
                          </Badge>
                        ) : (
                          <Badge variant="destructive" className="ml-2">
                            <XCircle className="h-3 w-3 mr-1" />
                            Not Eligible
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {result.eligible && (
                        <>
                          <div className="mb-3">
                            <p className="text-sm font-medium text-foreground mb-1">Benefits:</p>
                            <ul className="space-y-1">
                              {result.benefits.map((benefit: string, idx: number) => (
                                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {result.documentsNeeded.length > 0 && (
                            <div className="bg-warning/10 p-3 rounded-lg border border-warning/20">
                              <div className="flex items-start gap-2">
                                <AlertCircle className="h-4 w-4 text-warning mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-foreground">
                                    Documents Needed:
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {result.documentsNeeded.join(', ')}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-96 text-center">
                <div className="bg-accent p-6 rounded-full mb-4">
                  <ShieldCheck className="h-12 w-12 text-primary" />
                </div>
                <p className="text-muted-foreground mb-2">
                  Enter your Aadhaar to check eligibility
                </p>
                <p className="text-sm text-muted-foreground">
                  We'll show which schemes you qualify for
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schemes;
