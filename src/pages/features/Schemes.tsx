import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { schemes } from '@/lib/mockData';
import { ShieldCheck, FileText, CheckCircle2, XCircle, AlertCircle, Sparkles } from 'lucide-react';

const Schemes = () => {
  const [aadhaar, setAadhaar] = useState('');
  const [checked, setChecked] = useState(false);
  const [eligibilityResults, setEligibilityResults] = useState<any[]>([]);

  const handleCheck = () => {
    if (aadhaar.length >= 12) {
      // Mock eligibility check
      const results = schemes.map((scheme) => ({
        ...scheme,
        eligible: Math.random() > 0.3, // Random eligibility for demo
        documentsNeeded: Math.random() > 0.5 ? ['Income Certificate', 'Residence Proof'] : [],
      }));
      setEligibilityResults(results);
      setChecked(true);
    }
  };

  const totalSchemes = schemes.length;
  const eligibleCount = eligibilityResults.filter((r) => r.eligible).length;
  const notEligibleCount = eligibilityResults.length - eligibleCount;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-background to-sky-50 dark:from-slate-950 dark:via-background dark:to-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-3 rounded-2xl shadow-lg shadow-emerald-500/30">
              <ShieldCheck className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-100">
                Benefit Finder
              </p>
              <h1 className="mt-3 text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                Government Scheme Eligibility
              </h1>
              <p className="mt-1 text-sm sm:text-base text-muted-foreground max-w-xl">
                Check which health schemes you may qualify for, using Aadhaar + DigiLocker style
                verification.
              </p>
            </div>
          </div>

          {/* Quick summary (shown after check, otherwise hint) */}
          
            <div className="flex items-center gap-2 mb-1">
              {/* <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-300" /> */}
              {/* <span className="font-semibold text-emerald-900 dark:text-emerald-50">
                Instant pre-check (demo)
              </span> */}
            </div>
            {/* <p className="text-[11px] text-emerald-800 dark:text-emerald-200">
              No real Aadhaar data is used. This is only a mock predictor for UI demo.
            </p> */}
          
        </div>

        {/* Stats row (after check) */}
        {checked && (
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <Card className="border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-950/70">
              <CardContent className="p-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">
                  Total schemes checked
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-50">
                  {totalSchemes}
                </p>
              </CardContent>
            </Card>
            <Card className="border-emerald-200 bg-emerald-50/80 dark:border-emerald-900 dark:bg-emerald-950/70">
              <CardContent className="p-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-200">
                  Eligible
                </p>
                <p className="mt-2 text-2xl font-semibold text-emerald-900 dark:text-emerald-50">
                  {eligibleCount}
                </p>
              </CardContent>
            </Card>
            <Card className="border-rose-200 bg-rose-50/80 dark:border-rose-900 dark:bg-rose-950/70">
              <CardContent className="p-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-rose-700 dark:text-rose-200">
                  Not eligible
                </p>
                <p className="mt-2 text-2xl font-semibold text-rose-900 dark:text-rose-50">
                  {notEligibleCount}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Check Eligibility Form + schemes info */}
          <div>
            <Card className="border-none bg-gradient-to-br from-white via-background to-emerald-50 shadow-lg dark:from-slate-950 dark:via-slate-950 dark:to-emerald-950/50">
              <CardHeader>
                <CardTitle>Check Eligibility</CardTitle>
                <CardDescription>
                  Enter your Aadhaar number to simulate scheme eligibility (demo only).
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Aadhaar Number</Label>
                    <Input
                      value={aadhaar}
                      onChange={(e) =>
                        setAadhaar(e.target.value.replace(/\D/g, '').slice(0, 12))
                      }
                      placeholder="Enter 12-digit Aadhaar"
                      maxLength={12}
                      className="bg-background/80 tracking-[0.25em] text-center"
                    />
                    <p className="text-[11px] text-muted-foreground">
                      We only accept digits. This is a front-end simulation for demo purposes.
                    </p>
                  </div>

                  <div className="bg-accent/80 p-4 rounded-2xl border border-border/60">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-full bg-primary/10 p-2">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground mb-1">
                          DigiLocker-style auto document fetch
                        </p>
                        <p className="text-xs text-muted-foreground">
                          In a real system, we would securely fetch Aadhaar, income, caste, and
                          residence proofs to pre-check eligibility without manual photocopies.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleCheck}
                    disabled={aadhaar.length < 12}
                    className="w-full rounded-full"
                  >
                    Check Eligibility
                  </Button>
                  <p className="text-[11px] text-muted-foreground text-center">
                    By proceeding, you agree this is a demo and no real data is being verified.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Available Schemes Info */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Available Schemes</CardTitle>
                <CardDescription>
                  Government health schemes that are part of this eligibility check.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {schemes.map((scheme) => (
                    <div
                      key={scheme.id}
                      className="border border-border/70 p-3 rounded-xl bg-background/80"
                    >
                      <p className="font-medium text-foreground text-sm">{scheme.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {scheme.description}
                      </p>
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
                <h2 className="text-xl font-semibold text-foreground">
                  Eligibility Results
                </h2>
                <p className="text-xs text-muted-foreground mb-2">
                  These results are randomly generated for demo – in production they would be
                  based on official rules + documents.
                </p>

                {eligibilityResults.map((result) => (
                  <Card
                    key={result.id}
                    className={`transition-all hover:shadow-md hover:-translate-y-[2px] ${
                      result.eligible
                        ? 'border-emerald-200 bg-emerald-50/80 dark:border-emerald-900 dark:bg-emerald-950/40'
                        : 'border-rose-200 bg-rose-50/80 dark:border-rose-900 dark:bg-rose-950/40'
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{result.name}</CardTitle>
                          <CardDescription className="mt-1">
                            {result.description}
                          </CardDescription>
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
                      {result.eligible ? (
                        <>
                          <div className="mb-3">
                            <p className="text-sm font-medium text-foreground mb-1">
                              Benefits you can claim:
                            </p>
                            <ul className="space-y-1">
                              {result.benefits.map((benefit: string, idx: number) => (
                                <li
                                  key={idx}
                                  className="text-sm text-muted-foreground flex items-start gap-2"
                                >
                                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {result.documentsNeeded.length > 0 && (
                            <div className="bg-warning/10 p-3 rounded-xl border border-warning/20">
                              <div className="flex items-start gap-2">
                                <AlertCircle className="h-4 w-4 text-warning mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-foreground">
                                    Extra documents needed:
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {result.documentsNeeded.join(', ')}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="bg-background/80 p-3 rounded-xl border border-border/60">
                          <p className="text-sm font-medium text-foreground mb-1">
                            Why you may not be eligible (demo):
                          </p>
                          <p className="text-xs text-muted-foreground">
                            In a real system, this section would explain income, age, location or
                            document reasons for ineligibility, and suggest alternate schemes.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-96 text-center">
                <div className="relative mb-4">
                  <div className="bg-emerald-100 p-6 rounded-full dark:bg-emerald-900/40">
                    <ShieldCheck className="h-12 w-12 text-emerald-700 dark:text-emerald-200" />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-emerald-200/40 dark:bg-emerald-900/40 animate-ping" />
                </div>
                <p className="text-muted-foreground mb-1">
                  Enter your Aadhaar number to check eligibility.
                </p>
                <p className="text-sm text-muted-foreground max-w-sm">
                  We&apos;ll show you a demo of how different schemes could be auto-verified
                  using existing documents.
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
