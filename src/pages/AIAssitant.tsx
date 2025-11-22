import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Bot,
  User,
  Sparkles,
  HeartPulse,
  Apple,
  Send,
  Stethoscope,
  Info,
} from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";

const AIAssistant = () => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Namaste 👋 Main SehatSaathi AI hoon. Apne symptoms, lifestyle ya health se related sawal likhiye. Main aapko general guidance aur diet ideas dunga. Doctor ka replacement nahi hoon, sirf ek smart saathi hoon."
    }
  ]);

  const [dietForm, setDietForm] = useState({
    gender: "",
    age: "",
    weight: "",
    height: "",
    profession: "",
    activity: ""
  });
  const [dietPlan, setDietPlan] = useState(null);

  // ---------------- CHAT HANDLERS ----------------

  const handleSend = () => {
    if (!userInput.trim()) return;

    const userMsg = { role: "user", content: userInput.trim() };
    const updated = [...messages, userMsg];

    // Demo AI reply (yahan baad me Gemini integrate kar sakte ho)
    const aiReply = generateDemoHealthReply(userInput);

    setMessages([...updated, { role: "assistant", content: aiReply }]);
    setUserInput("");
  };

  const handleQuickPrompt = (text) => {
    setUserInput(text);
  };

  const generateDemoHealthReply = (text) => {
    // Very simple demo logic – NO real diagnosis / medicines
    return (
      "Maine aapka message padha:\n\n" +
      `“${text.slice(0, 130)}${text.length > 130 ? "..." : ""}”\n\n` +
      "⚕️ Kuch general health pointers:\n" +
      "• Agar bukhaar / thakan / body pain ho raha ho, pani zyada peeje, sookhi cheezein kam kijiye.\n" +
      "• Tez, tel wali, bahut tikhi cheezein kuch din avoid karein.\n" +
      "• Halka ghar ka khana (khichdi, dal–chawal, dahi, phal) prefer karein.\n" +
      "• Agar 1–2 din se zyada tak problem rahe ya bohot severe ho, turant doctor / PHC visit karein.\n\n" +
      "Yeh sirf general information hai, proper diagnosis ke liye hamesha trained doctor se milna zaroori hai."
    );
  };

  // ---------------- DIET PLAN HANDLERS ----------------

  const handleDietChange = (field, value) => {
    setDietForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerateDiet = () => {
    const plan = buildDemoDietPlan(dietForm);
    setDietPlan(plan);
  };

  const buildDemoDietPlan = ({ gender, age, weight, height, profession, activity }) => {
    // Dummy text for now – can be replaced by Gemini output later
    const summaryParts = [];

    if (age) summaryParts.push(`Age approx: ${age} yrs`);
    if (weight && height) summaryParts.push(`Weight/Height: ${weight} kg / ${height} cm`);
    if (profession) summaryParts.push(`Work: ${profession}`);
    if (activity) summaryParts.push(`Activity: ${activity}`);

    const summary =
      "Yeh ek general balanced diet suggestion hai, jo simple Indian ghar ke khane par based hai. " +
      "Final diet plan ke liye hamesha doctor ya certified dietician se baat karein.\n\n" +
      (summaryParts.length ? "Profile: " + summaryParts.join(" • ") : "");

    return {
      summary,
      meals: [
        {
          name: "Subah (Breakfast)",
          items: [
            "1–2 phulka / poha / upma ya oats",
            "1 glass doodh / dahi ya chaach",
            "1 seasonal fruit (kela, seb, papita)",
          ]
        },
        {
          name: "Dopahar (Lunch)",
          items: [
            "1–2 katori dal / chana / rajma",
            "1 plate sabzi (hari sabzi include karein)",
            "2–3 phulka / 1 katori chawal",
            "Salad (kheera, gajar, pyaaz, nimbu)",
          ]
        },
        {
          name: "Shaam (Snacks)",
          items: [
            "Namak kam wala chana / moong / makhana",
            "Hari chai / doodh / nimbu pani (kam cheeni)",
          ]
        },
        {
          name: "Raat (Dinner)",
          items: [
            "Halka khana – dal + sabzi + 1–2 phulka",
            "Raat ko fried cheezein aur bahut heavy khana avoid karein",
            "Sone se 2 ghante pehle khana kha lein",
          ]
        },
        {
          name: "General Habits",
          items: [
            "Paani: din bhar me 6–8 glass (medical condition ke hisaab se adjust)",
            "Meetha, cold drink aur deep-fried cheezein limit karein",
            "Roz thoda chalna / halki exercise (agar doctor ne mana na kiya ho)",
          ]
        }
      ]
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eef7ff] via-[#eaf5ed] to-[#f5f8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* PAGE HEADER */}
        <div className="flex flex-col gap-3 mb-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-600 to-green-500 shadow-lg">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                SehatSaathi AI Assistant
              </h1>
              <p className="text-sm md:text-base text-slate-600">
                Smart health Q&A + personalised diet ideas (demo). Gemini API yahan integrate hoga.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs md:text-sm text-slate-500 bg-white/60 border border-slate-200 rounded-xl px-3 py-2 shadow-sm">
            <Info className="h-4 w-4 text-amber-500" />
            <span>
              Important: Yeh demo hai. Real diagnosis / dawa ke liye doctor se hi consult karein.
            </span>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid gap-8 lg:grid-cols-[1.8fr_minmax(320px,1.1fr)]">

          {/* LEFT – CHAT PANEL */}
          <Card className="border-blue-100 shadow-xl bg-white/80 backdrop-blur">
            <CardHeader className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3 justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-blue-50">
                    <HeartPulse className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      Health Chat (General Guidance)
                    </CardTitle>
                    <CardDescription className="text-xs md:text-sm">
                      Symptoms, daily routine, lifestyle — poochho, AI general suggestions dega.
                    </CardDescription>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live (Demo)
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-4 flex flex-col h-[520px]">
              {/* Chat messages area */}
              <div className="flex-1 rounded-xl border border-slate-100 bg-slate-50/60 p-3 overflow-y-auto space-y-3">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`
                        max-w-[90%] md:max-w-[75%] px-3 py-2 rounded-2xl text-sm whitespace-pre-line
                        ${
                          msg.role === "user"
                            ? "bg-blue-600 text-white rounded-br-sm shadow-md"
                            : "bg-white text-slate-800 border border-slate-100 rounded-bl-sm shadow-sm"
                        }
                      `}
                    >
                      <div className="flex items-center gap-1 mb-1 text-[10px] uppercase tracking-wide opacity-70">
                        {msg.role === "user" ? (
                          <>
                            <User className="h-3 w-3" /> You
                          </>
                        ) : (
                          <>
                            <Bot className="h-3 w-3" /> SehatSaathi AI
                          </>
                        )}
                      </div>
                      <p>{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick prompts */}
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  "Bukhaar, halka sir dard aur thakan hai",
                  "Gas, acidity aur pet me jalna ho raha hai",
                  "Raat ko neend nahi aati, stress zyada hai"
                ].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handleQuickPrompt(p)}
                    className="text-[11px] md:text-xs px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 transition"
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* Input area */}
              <div className="mt-4 flex flex-col gap-2 md:flex-row">
                <Textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Apna health concern / symptoms / life-style describe karein (Hindi/English mix allowed)..."
                  className="min-h-[60px] md:min-h-[40px] text-sm"
                />
                <Button
                  className="md:self-end md:h-[60px] flex items-center gap-2"
                  onClick={handleSend}
                >
                  <Send className="h-4 w-4" />
                  <span className="hidden md:inline">Ask AI</span>
                  <span className="md:hidden">Send</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* RIGHT – DIET PLANNER */}
          <Card className="border-emerald-100 shadow-xl bg-white/85 backdrop-blur">
            <CardHeader className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-50">
                  <Apple className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Smart Diet Suggestion</CardTitle>
                  <CardDescription className="text-xs md:text-sm">
                    Gender, age, weight, work-style ke basis par simple balanced diet chart (demo).
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 pt-4">
              {/* Form */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Gender</Label>
                    <Select
                      value={dietForm.gender}
                      onValueChange={(v) => handleDietChange("gender", v)}
                    >
                      <SelectTrigger className="h-9 text-xs">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs">Age (years)</Label>
                    <Input
                      className="h-9 text-xs"
                      value={dietForm.age}
                      onChange={(e) => handleDietChange("age", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Weight (kg)</Label>
                    <Input
                      className="h-9 text-xs"
                      value={dietForm.weight}
                      onChange={(e) => handleDietChange("weight", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Height (cm)</Label>
                    <Input
                      className="h-9 text-xs"
                      value={dietForm.height}
                      onChange={(e) => handleDietChange("height", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs">Profession / Work Nature</Label>
                  <Input
                    className="h-9 text-xs"
                    value={dietForm.profession}
                    onChange={(e) =>
                      handleDietChange("profession", e.target.value)
                    }
                    placeholder="Student / Farmer / Office job / Field work..."
                  />
                </div>

                <div>
                  <Label className="text-xs">Activity Level</Label>
                  <Select
                    value={dietForm.activity}
                    onValueChange={(v) => handleDietChange("activity", v)}
                  >
                    <SelectTrigger className="h-9 text-xs">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (zyada sitting)</SelectItem>
                      <SelectItem value="moderate">Moderate (thoda walking)</SelectItem>
                      <SelectItem value="high">High (field / physical work)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  className="w-full mt-2 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700"
                  onClick={handleGenerateDiet}
                >
                  <Sparkles className="h-4 w-4" />
                  Generate Diet Idea (Demo)
                </Button>
              </div>

              {/* GENERATED PLAN */}
              {dietPlan && (
                <div className="mt-4 space-y-3 border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                    <Stethoscope className="h-4 w-4 text-emerald-500" />
                    General information only — personalised plan ke liye doctor/dietician se baat karein.
                  </div>

                  <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-3 text-xs whitespace-pre-line text-slate-700">
                    {dietPlan.summary}
                  </div>

                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {dietPlan.meals.map((meal, idx) => (
                      <div
                        key={idx}
                        className="border border-emerald-100 bg-emerald-50/70 rounded-lg p-2.5"
                      >
                        <p className="text-xs font-semibold text-emerald-800 mb-1">
                          {meal.name}
                        </p>
                        <ul className="text-xs text-slate-700 list-disc pl-4 space-y-0.5">
                          {meal.items.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    className="w-full text-xs mt-1"
                    type="button"
                    onClick={() => navigator.clipboard.writeText(JSON.stringify(dietPlan, null, 2))}
                  >
                    Copy Plan (Text)
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
