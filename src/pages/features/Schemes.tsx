import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { schemes } from '@/lib/mockData';
import { ShieldCheck, FileText, CheckCircle2, XCircle, AlertCircle, ExternalLink } from 'lucide-react';

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
      const results = schemes.map(scheme => ({
        ...scheme,
        eligible: Math.random() > 0.3,
        documentsNeeded: Math.random() > 0.5 ? ['Income Certificate', 'Residence Proof'] : [],
      }));
      setEligibilityResults(results);
      setChecked(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ------------------------------------------------------- */}
        {/* TOP SECTION: MAIN GOVERNMENT SCHEMES */}
        {/* ------------------------------------------------------- */}
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
                  <CardTitle className="text-2xl font-bold text-[#2f4f32]">{s.name}</CardTitle>
                  <CardDescription className="text-[#4e633d]">{s.short}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-2 text-[#3f4b2f]">
                  <p><strong>Eligibility:</strong> {s.eligibility}</p>
                  <p><strong>Benefits:</strong> {s.benefit}</p>

                  <Button
                    asChild
                    className="mt-2 bg-green-700 hover:bg-green-800 text-white"
                  >
                    <a href={s.link} target="_blank">
                      Visit Website <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>


        {/* ------------------------------------------------------- */}
        {/* EXISTING SECTION: Aadhaar Eligibility Checker */}
        {/* ------------------------------------------------------- */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Left: Form */}
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

                  {/* DigiLocker Info */}
                  <div className="bg-accent p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                      <FileText className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground mb-1">
                          DigiLocker Integration
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Aadhaar, income certificate & residence proof auto-fetch hoga.
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

            {/* Available Schemes List */}
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
                          <Badge variant="success">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Eligible
                          </Badge>
                        ) : (
                          <Badge variant="destructive">
                            <XCircle className="h-3 w-3 mr-1" />
                            Not Eligible
                          </Badge>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent>
                      {result.eligible && (
                        <>
                          <p className="text-sm font-medium mb-2">Benefits:</p>
                          <ul className="space-y-1 mb-3">
                            {result.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                                {benefit}
                              </li>
                            ))}
                          </ul>

                          {result.documentsNeeded.length > 0 && (
                            <div className="bg-warning/10 p-3 rounded-lg border border-warning/20">
                              <p className="text-sm font-medium">Documents Needed:</p>
                              <p className="text-xs text-muted-foreground">
                                {result.documentsNeeded.join(", ")}
                              </p>
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
                <ShieldCheck className="h-12 w-12 text-primary mb-4" />
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
