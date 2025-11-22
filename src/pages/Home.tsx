import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Ambulance,
  Pill,
  Users,
  Calendar,
  ShieldCheck,
  CloudRain,
  Sparkles,
  ArrowRight,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

// 7 village images
import v1 from '@/assets/village/v1.jpg';
import v2 from '@/assets/village/v2.jpg';
import v3 from '@/assets/village/v3.jpg';
import v4 from '@/assets/village/v4.jpg';
import v5 from '@/assets/village/v5.jpg';
import v6 from '@/assets/village/v6.jpg';
import v7 from '@/assets/village/v7.jpg';

// ---- HERO SLIDES DATA ----
const SLIDES = [
  {
    image: v1,
    title: 'सरकारी स्वास्थ्य योजनाएँ अब हर गाँव तक',
    description:
      'Ayushman Bharat, PMJAY, JSY jaise schemes ka seedha aur clear info – bina dalal, bina confusion.'
  },
  {
    image: v2,
    title: 'आपदा + स्वास्थ्य अलर्ट एक ही प्लेटफ़ॉर्म पर',
    description:
      'Barsaat, flood, heatwave ke saath doctor-verified health advisory – ek hi message mein gaon tak.'
  },
  {
    image: v3,
    title: 'किसानों के लिए मौसम और खेती सलाह',
    description:
      'Mausam, pani aur mitti ke hisaab se simple खेती सलाह – paani bachao, fasal bachao.'
  },
  {
    image: v4,
    title: 'आशा वर्कर और ANM का डिजिटल साथी',
    description:
      'ASHA didi ke haath mein simple app – ghar-ghar health data, follow-up aur reminders.'
  },
  {
    image: v5,
    title: 'दवाइयों की कमी अब पहले से दिखेगी',
    description:
      'Gaon ki pharmacy aur PHC ka stock pehle hi track – dawai khatam hone se pehle alert.'
  },
  {
    image: v6,
    title: 'सुंदर भारतीय गाँव, अब स्मार्ट गाँव',
    description:
      'Digital queue, schemes info, health alerts – sab milkar ek smart rural health network banate hain.'
  },
  {
    image: v7,
    title: 'गाँव में भी तेज़ और सटीक 108 सहायता',
    description:
      'Smart 108 routing se ambulance ko milta hai best kaccha-raasta route – waqt par pahunchne ke liye.'
  }
];

const Home = () => {
  const modules = [
    {
      icon: Pill,
      title: 'Gaon Pharmacy Intelligence',
      description:
        'Dawai kis din khatam ho sakti hai — system pehle hi bata deta hai.',
      link: '/features/medicine'
    },
    {
      icon: Ambulance,
      title: 'Rural 108 Assist',
      description: 'Ambulance ka best kaccha-road route aur live tracking.',
      link: '/features/ambulance'
    },
    {
      icon: Calendar,
      title: 'Digital Queue Tokens',
      description:
        '“Aapka number 7 hai” — hospital queue ka simple digital system.',
      link: '/features/queues'
    },
    {
      icon: ShieldCheck,
      title: 'Yojana Eligibility',
      description: 'PMJAY, Janani Suraksha — ek-click eligibility check.',
      link: '/features/schemes'
    },
    {
      icon: CloudRain,
      title: 'Disaster + Health Alerts',
      description: 'Barsaat + health advisory ek message me.',
      link: '/features/disaster'
    },
    {
      icon: Users,
      title: 'Gaon Sahayata Network',
      description: 'Blood donors, ASHA workers, volunteers — sab ek jagah.',
      link: '/features/community'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 7000); // 7 seconds per slide
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      {/* 🔔 RUNNING SCROLLING ANNOUNCEMENT */}
      <div className="bg-amber-100 text-amber-900 py-2 overflow-hidden border-y border-amber-300">
        <div className="animate-marquee whitespace-nowrap font-medium text-sm">
          🚜 Gaon Safai Abhiyan kal subah 7 baje •  
          🏃 Run For Health – Sunday 6:30 AM •  
          🩺 Free BP Checkup Camp – Anganwadi Center 10 AM •  
          📢 Naye Doctor ki joining – PHC Center Monday •  
          💧 Jal Kalash Yojna verification aaj 3 PM •  
          🌱 Kisan Soil Health Card registration open till Friday •  
        </div>
      </div>

      {/* 🌤 FIXED RIGHT-SIDE WIDGET */}
      <div className="hidden lg:block">
        <div className="fixed top-32 right-6 z-40 w-72 rounded-2xl bg-white/80 backdrop-blur-xl border border-primary/20 shadow-2xl p-5 space-y-5 animate-slide-left">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-primary text-lg">🌤 गाँव का मौसम</h4>
            <span className="text-xs text-muted-foreground">Aaj</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-5xl font-bold text-primary">32°C</div>
            <div className="text-sm text-muted-foreground leading-tight">
              हल्की गर्मी  
              <br />
              20% बारिश का चांस
            </div>
          </div>
          <div className="rounded-xl bg-red-50 p-4 border border-red-200">
            <p className="text-xs font-semibold text-red-700">
              🌫 AQI: 132 (Moderate)
            </p>
            <p className="text-[11px] text-red-600">
              धूल ज़्यादा — सांस की दिक्कत वाले मास्क पहनें।
            </p>
          </div>
          <div className="rounded-xl bg-primary/10 p-3 text-xs leading-relaxed">
            🌾 <span className="font-semibold">खेती सलाह:</span>  
            “शाम को हल्की सिंचाई kar lo, hawa badhiya hai.”
          </div>
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-3">
            <p className="text-xs font-semibold text-amber-700 mb-1">
              🔮 अगले 3 दिन
            </p>
            <ul className="text-[11px] text-muted-foreground space-y-1">
              <li>• Kal halka 2mm barish.</li>
              <li>• ORS/Zinc ki demand badh sakti hai.</li>
              <li>• Machhar zyada honge — dengue risk up.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 🌄 NEW HERO – 7 IMAGE VILLAGE CAROUSEL */}
      <section className="relative h-[80vh] sm:h-[85vh] w-full overflow-hidden rounded-b-3xl shadow-xl mb-12">
        {/* Background slides */}
        <div className="absolute inset-0">
          {SLIDES.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${slide.image})` }}
            />
          ))}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/55 to-black/70" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div className="space-y-6 max-w-3xl animate-fadeIn">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full mb-2">
              <Sparkles className="h-4 w-4 text-green-300" />
              <span className="text-xs font-semibold uppercase tracking-wide text-green-100">
                SehatSathi X • Gaon ke liye bana
              </span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-white drop-shadow-xl leading-tight">
              भारत के गाँवों तक  
              <span className="block text-green-300">
                डिजिटल स्वास्थ्य और सुविधा
              </span>
            </h1>

            <div className="space-y-2">
              <p className="text-2xl font-semibold text-green-100 drop-shadow-lg">
                {SLIDES[currentSlide].title}
              </p>
              <p className="text-base lg:text-lg text-white/90 drop-shadow-md leading-relaxed">
                {SLIDES[currentSlide].description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/dashboard">
                  शुरू करें <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                <Link to="/features/schemes">सरकारी योजनाएँ देखें</Link>
              </Button>
            </div>

            {/* Slide dots */}
            <div className="flex justify-center gap-2 pt-2">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  className={`h-2.5 w-2.5 rounded-full transition-all ${
                    idx === currentSlide
                      ? 'bg-green-300 w-5'
                      : 'bg-white/40 hover:bg-white/70'
                  }`}
                  onClick={() => setCurrentSlide(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMS + SOLUTIONS */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-3xl lg:text-4xl font-bold mb-2">
            Gaon ki asli problems — jise hum solve kar rahe hain
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
            Line me wait, ambulance late, yojana ka info missing — rural healthcare
            ka sach humne system me dala.
          </p>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* PROBLEMS */}
            <Card className="border-2 border-destructive/20">
              <CardHeader>
                <CardTitle className="text-destructive">Ground Problems</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p>• Dawai khatam milti hai jab zaroorat sabse zyada hoti hai.</p>
                <p>• Ambulance ka time estimate nahi hota.</p>
                <p>• Hospital me queue fight hoti rehti.</p>
                <p>• PMJAY/JSY ka pata nahi kaun eligible.</p>
                <p>• Barsaat me dengue warning late milti.</p>
              </CardContent>
            </Card>

            {/* SOLUTIONS */}
            <Card className="border-2 border-emerald-400/30">
              <CardHeader>
                <CardTitle className="text-emerald-600">Smart Solutions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p>• AI se 3 din pehle medicine alert.</p>
                <p>• Smart 108 routing — kaccha raasta bhi count.</p>
                <p>• Digital queue tokens — no fight, clear number.</p>
                <p>• Aadhaar se instant scheme eligibility.</p>
                <p>• Flood + dengue health advisory ek saath.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ⭐ EXPLORE OUR MODULES – RURAL PATTERN EDITION (STYLE B) */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#eef4e7] via-[#e3edda] to-[#d6e6cb]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#2f4f32]">Explore Our Modules</h2>
            <p className="text-lg text-[#4a5d3c] mt-2">
              Gaon ki asli zarooraton ko dhyaan me rakhkar banaya gaya digital health system.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((module, index) => {
              const Icon = module.icon;

              const patterns = [
                'bg-[radial-gradient(circle_at_top_left,#cddfc4,transparent)]',
                'bg-[radial-gradient(circle_at_bottom_right,#d0e1c8,transparent)]',
                'bg-[linear-gradient(135deg,rgba(210,230,195,0.7),transparent)]',
                'bg-[radial-gradient(circle,#dfead4,transparent)]',
                'bg-[linear-gradient(45deg,#d8e7c8,transparent)]',
                'bg-[radial-gradient(circle_at_bottom_left,#d4e3c5,transparent)]'
              ];

              return (
                <Card
                  key={module.title}
                  className={`
                    relative overflow-hidden
                    border border-[#9bb891]
                    rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.08)]
                    backdrop-blur-sm 
                    hover:shadow-[0_12px_28px_rgba(0,0,0,0.15)]
                    hover:-translate-y-2 
                    transition-all duration-300
                    ${patterns[index % patterns.length]}
                  `}
                >
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 via-green-400 to-green-600 opacity-70" />
                  <CardHeader>
                    <div className="bg-green-700/90 p-4 rounded-xl w-fit mb-4 shadow-md border border-green-900/50">
                      <Icon className="h-7 w-7 text-green-100" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-[#2f4f32]">
                      {module.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-[#4e633d] leading-relaxed">
                      {module.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-green-700 text-green-700 hover:bg-green-700 hover:text-white transition-all duration-300 font-medium"
                    >
                      <Link to={module.link}>
                        Explore
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 🌾 GAON NOTICE BOARD – ENGLISH + REAL BOARD STYLE */}
<section className="py-20 bg-gradient-to-br from-[#eef3e6] via-[#e4ecd8] to-[#dbe6cd]">
  <div className="max-w-5xl mx-auto px-6">
    
    <h2 className="text-4xl font-bold text-center text-[#2f4f32] mb-10 flex items-center justify-center gap-2">
      🪧 Village Notice Board
    </h2>

    <div className="
      bg-[#fefaf0]
      border-[7px] border-[#b48a5a]
      rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.25)]
      p-10 relative
      bg-[url('v1.jpg')]
      bg-cover bg-center
    ">
      {/* Pins */}
      <div className="absolute -top-4 left-10 h-6 w-6 bg-red-600 rounded-full shadow-md border border-red-800"></div>
      <div className="absolute -top-4 right-10 h-6 w-6 bg-blue-600 rounded-full shadow-md border border-blue-800"></div>

      {/* Board Items */}
      <ul className="space-y-5 text-lg text-[#3f4b2f] font-semibold bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-[#c6b48a] shadow-inner">
        <li>📢 <b>Vaccination Camp:</b> Friday • PHC Center • 9 AM</li>
        <li>🚜 <b>Farmer Advisory Meeting:</b> Tomorrow 6 PM • Panchayat Hall</li>
        <li>💧 <b>Water Supply Update:</b> Tanker arriving twice this week</li>
        <li>👩‍⚕️ <b>ASHA Worker Training:</b> Sunday • Anganwadi • 11 AM</li>
        <li>🏫 <b>Mid-Day Meal Notice:</b> New menu starts next week</li>
      </ul>
    </div>
  </div>
</section>


      {/* 🧡 RURAL STORIES CAROUSEL – PURE HINDI */}
      <section className="py-20 bg-gradient-to-br from-[#eef3e6] via-[#e4ecd8] to-[#dbe6cd]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-[#3f6b45] mb-10">
            🧡 गाँव की असली कहानियाँ
          </h2>

          <div className="overflow-hidden relative">
            <div className="flex gap-6 animate-slide-carousel">
              <div className="min-w-[350px] bg-white/80 border border-[#b7c9a5] rounded-2xl p-6 shadow-lg">
                <p className="text-lg font-semibold text-[#3f4b2f]">
                  “अब एम्बुलेंस का सही रास्ता ऐप में दिख जाता है — वक़्त पर मदद मिलती है।”
                </p>
                <p className="text-sm text-[#6a7556] mt-2">— आशा दीदी, रामपुर</p>
              </div>

              <div className="min-w-[350px] bg-white/80 border border-[#b7c9a5] rounded-2xl p-6 shadow-lg">
                <p className="text-lg font-semibold text-[#3f4b2f]">
                  “दवाई खत्म होने का अलर्ट पहले मिल जाता है — दुकान संभालना आसान हो गया।” 
                </p>
                <p className="text-sm text-[#6a7556] mt-2">— रमेश, किराना दुकान</p>
              </div>

              <div className="min-w-[350px] bg-white/80 border border-[#b7c9a5] rounded-2xl p-6 shadow-lg">
                <p className="text-lg font-semibold text-[#3f4b2f]">
                  “क्यू-टोकन से हॉस्पिटल में झगड़ा ही खत्म — सबका नंबर बराबरी से आता है।” 
                </p>
                <p className="text-sm text-[#6a7556] mt-2">— सीता देवी, गाँववाली</p>
              </div>
            </div>
          </div>

          <style>
            {`
              @keyframes slide-carousel {
                0% { transform: translateX(0); }
                33% { transform: translateX(-360px); }
                66% { transform: translateX(-720px); }
                100% { transform: translateX(0); }
              }
              .animate-slide-carousel {
                animation: slide-carousel 14s infinite linear;
              }
            `}
          </style>
        </div>
      </section>

      {/* 🎉 FESTIVAL HEALTH ALERTS – THEME MATCHED */}
      <section className="py-20 bg-gradient-to-br from-[#f1f6eb] via-[#e3eed7] to-[#d8e4c7]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-[#3f6b45] mb-10">
            🎉 त्योहारों में स्वास्थ्य सलाह
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/80 border border-[#b7c9a5] p-6 rounded-2xl shadow-lg">
              <h3 className="font-bold text-xl text-[#3f4b2f] mb-2">🪔 दिवाली</h3>
              <p className="text-[#5f7050]">
                पटाखों का धुआँ ज़्यादा — अस्थमा वाले लोग मास्क ज़रूर पहनें।
              </p>
            </div>

            <div className="bg-white/80 border border-[#b7c9a5] p-6 rounded-2xl shadow-lg">
              <h3 className="font-bold text-xl text-[#3f4b2f] mb-2">🪁 मकर संक्रांति</h3>
              <p className="text-[#5f7050]">
                छत पर फिसलने और चोट लगने के केस बढ़ते हैं — बच्चों पर नज़र रखें।
              </p>
            </div>

            <div className="bg-white/80 border border-[#b7c9a5] p-6 rounded-2xl shadow-lg">
              <h3 className="font-bold text-xl text-[#3f4b2f] mb-2">🌈 होली</h3>
              <p className="text-[#5f7050]">
                रासायनिक रंग से एलर्जी हो सकती है — जितना हो सके ऑर्गेनिक रंग ही इस्तेमाल करें।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔮 AI FUTURE PREDICTION */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            🔮 अगला 7 दिन – Rural Health Future Prediction
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-primary/10 shadow-md">
              <CardContent className="p-5">
                <p className="text-xl font-semibold text-primary">💊 Medicine Demand</p>
                <p className="text-sm mt-1 text-muted-foreground">
                  Garmi ke kaaran ORS, Glucose aur Paracetamol ki demand badhne ke chances.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-amber-50 shadow-md">
              <CardContent className="p-5">
                <p className="text-xl font-semibold text-amber-700">🦟 Disease Risk</p>
                <p className="text-sm mt-1 text-muted-foreground">
                  Barsaat ke baad dengue/malaria ka halka-sa risk upar — machhar-daani aur सफाई zaroori.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 shadow-md">
              <CardContent className="p-5">
                <p className="text-xl font-semibold text-blue-700">🚑 Emergency Load</p>
                <p className="text-sm mt-1 text-muted-foreground">
                  Heat exhaustion, chakkar, BP problems ke cases badh sakte — paani, ORS aur आराम zaroori.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
<section className="bg-gradient-to-br from-green-700 via-green-800 to-green-900 py-24">
  <div className="max-w-4xl mx-auto text-center px-6">
    
    <Heart className="h-16 w-16 text-green-200 mx-auto mb-6 drop-shadow-md" />

    <h2 className="text-4xl lg:text-5xl font-extrabold text-white drop-shadow-lg mb-4 leading-tight">
      गाँव का स्वास्थ्य बदलने का वक़्त आ गया है।
    </h2>

    <p className="text-lg text-green-200/90 max-w-2xl mx-auto mb-10 leading-relaxed">
      Villagers, volunteers, ASHA workers — everyone deserves a simple, smart and reliable digital health companion.
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button
        asChild
        size="lg"
        className="bg-white text-green-800 hover:bg-green-100 font-semibold shadow-md"
      >
        <Link to="/dashboard">Get Started</Link>
      </Button>

      <Button
        asChild
        size="lg"
        variant="outline"
        className="
          border-green-200 text-green-200 
          hover:bg-green-200 hover:text-green-900
          font-medium shadow-md
        "
      >
        <Link to="/features/community">Become a Volunteer</Link>
      </Button>
    </div>
  </div>
</section>


      {/* GLOBAL CSS ANIMATIONS */}
      <style>
        {`
          .animate-marquee {
            display: inline-block;
            padding-left: 100%;
            animation: marquee 18s linear infinite;
          }
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }

          @keyframes slide-left {
            from { opacity: 0; transform: translateX(30px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .animate-slide-left {
            animation: slide-left 0.8s ease-out forwards;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 1.1s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
