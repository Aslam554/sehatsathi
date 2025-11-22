import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { schemes } from '@/lib/mockData';

import {
  ShieldCheck,
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

// 🔹 GOVT TOP 4 SCHEMES (Static Data)
const govtSchemes = [
  {
    name: "Ayushman Bharat - PMJAY",
    short: "Har garib pariwar ko 5 lakh tak ka ilaj muft.",
    eligibility: "BPL/SECC list families.",
    benefit: "₹5,00,000 tak ka cashless treatment.",
    link: "https://pmjay.gov.in",
    color: "from-green-100 to-green-50",
  },
  {
    name: "Janani Suraksha Yojana (JSY)",
    short: "Safe delivery aur maa-bachche ki suraksha.",
    eligibility: "Pregnant women (BPL / SC-ST).",
    benefit: "₹1400–₹2000 delivery support.",
    link: "https://nhm.gov.in",
    color: "from-emerald-100 to-emerald-50",
  },
  {
    name: "PM Matru Vandana Yojana (PMMVY)",
    short: "गर्भवती महिलाओं को आर्थिक सहायता.",
    eligibility: "पहली बार maa ban rahi women.",
    benefit: "₹5,000 maternity benefit.",
    link: "https://pmmvy.gov.in",
    color: "from-orange-100 to-orange-50",
  },
  {
    name: "Rashtriya Bal Swasthya Karyakram (RBSK)",
    short: "0–18 saal ke bachchon ka full health checkup.",
    eligibility: "School/Anganwadi children.",
    benefit: "Heart, eyes, disability, anemia check.",
    link: "https://nhm.gov.in",
    color: "from-blue-100 to-blue-50",
  },
];

const Schemes = () => {
  const [aadhaar, setAadhaar] = useState('');
  const [checked, setChecked] = useState(false);
  const [eligibilityResults, setEligibilityResults] = useState<any[]>([]);

  const handleCheck = () => {
    if (aadhaar.length >= 12) {
      const results = schemes.map((scheme) => ({
        ...scheme,
        eligible: Math.random() > 0.3,
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


        {/* -------------------------------------------------------
             TOP GOVT SCHEMES SECTION
        ------------------------------------------------------- */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-[#2f4f32] text-center">
            🏛️ Government Health Schemes
          </h1>
          <p className="text-center text-[#4a5d3c] mb-10">
            Har gaon — har parivaar ke liye zaroori 4 health schemes.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {govtSchemes.map((s, i) => (
              <Card
                key={i}
                className={`bg-gradient-to-br ${s.color} border border-[#9fb894] shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300`}
              >
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-[#2f4f32]">
                    {s.name}
                  </CardTitle>
                  <CardDescription className="text-[#4e633d]">{s.short}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-2 text-[#3f4b2f]">
                  <p><strong>Eligibility:</strong> {s.eligibility}</p>
                  <p><strong>Benefits:</strong> {s.benefit}</p>

                  <Button
                    asChild
                    className="mt-2 bg-green-700 hover:bg-green-800 text-white"
                  >
                    <a href={s.link} target="_blank" rel="noreferrer">
                      Visit Website <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>


        {/* -------------------------------------------------------
            MAIN CHECKER SECTION
        ------------------------------------------------------- */}
        {/* Stats row (after check) */}
        {checked && (
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="p-4">
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                  Total schemes checked
                </p>
                <p className="mt-2 text-2xl font-semibold">{totalSchemes}</p>
              </CardContent>
            </Card>

            <Card className="bg-emerald-50 border-emerald-200">
              <CardContent className="p-4">
                <p className="text-[11px] uppercase tracking-widest text-emerald-800">
                  Eligible
                </p>
                <p className="mt-2 text-2xl font-semibold text-emerald-900">
                  {eligibleCount}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-rose-50 border-rose-200">
              <CardContent className="p-4">
                <p className="text-[11px] uppercase tracking-widest text-rose-800">
                  Not eligible
                </p>
                <p className="mt-2 text-2xl font-semibold text-rose-900">
                  {notEligibleCount}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">

          {/* -------------------------------------------------------
              LEFT SIDE — Form + schemes list
          ------------------------------------------------------- */}
          <div>
            <Card className="shadow-lg bg-gradient-to-br from-white via-background to-emerald-50 dark:from-slate-900">
              <CardHeader>
                <CardTitle>Check Eligibility</CardTitle>
                <CardDescription>
                  Enter your Aadhaar number to simulate scheme eligibility (demo only).
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <Label>Aadhaar Number</Label>
                  <Input
                    value={aadhaar}
                    onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, '').slice(0, 12))}
                    placeholder="Enter 12-digit Aadhaar"
                    maxLength={12}
                    className="text-center tracking-[0.25em]"
                  />
                </div>

                <div className="bg-accent p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">DigiLocker-style auto verification</p>
                      <p className="text-xs text-muted-foreground">
                        Aadhaar, caste, income & residence proof auto-fetch hoga.
                      </p>
                    </div>
                  </div>
                </div>

                <Button disabled={aadhaar.length < 12} onClick={handleCheck} className="w-full">
                  Check Eligibility
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Demo only — no real data is used.
                </p>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Available Schemes</CardTitle>
                <CardDescription>All schemes included in this checker.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {schemes.map((scheme) => (
                  <div key={scheme.id} className="p-3 rounded-xl border">
                    <p className="font-medium">{scheme.name}</p>
                    <p className="text-xs text-muted-foreground">{scheme.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>


          {/* -------------------------------------------------------
              RIGHT SIDE — Results viewer
          ------------------------------------------------------- */}
          <div>
            {checked ? (
              <div className="space-y-4">
                {eligibilityResults.map((result) => (
                  <Card
                    key={result.id}
                    className={`transition-all ${
                      result.eligible
                        ? 'bg-emerald-50 border-emerald-200'
                        : 'bg-rose-50 border-rose-200'
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{result.name}</CardTitle>
                          <CardDescription>{result.description}</CardDescription>
                        </div>

                        {result.eligible ? (
                          <Badge variant="success">
                            <CheckCircle2 className="h-4 w-4 mr-1" /> Eligible
                          </Badge>
                        ) : (
                          <Badge variant="destructive">
                            <XCircle className="h-4 w-4 mr-1" /> Not Eligible
                          </Badge>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent>
                      {result.eligible ? (
                        <>
                          <p className="font-medium">Benefits:</p>
                          <ul className="space-y-1">
                            {result.benefits.map((b, i) => (
                              <li key={i} className="flex gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-success" /> {b}
                              </li>
                            ))}
                          </ul>

                          {result.documentsNeeded.length > 0 && (
                            <div className="mt-3 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                              <p className="font-medium text-sm">Documents Needed:</p>
                              <p className="text-xs text-muted-foreground">
                                {result.documentsNeeded.join(', ')}
                              </p>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="bg-background p-3 rounded-lg border mt-2">
                          <p className="font-medium text-sm">Possible reasons (demo):</p>
                          <p className="text-xs text-muted-foreground">
                            Income / age / address mismatch or required proofs missing.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-80 text-center">
                <ShieldCheck className="h-16 w-16 text-primary mb-4" />
                <p className="text-muted-foreground">Enter Aadhaar to check eligibility.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Schemes;
