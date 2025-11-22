import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Play, Pause, RotateCcw, X } from 'lucide-react';

const Wellness = () => {
  const [concentrationMode, setConcentrationMode] = useState(false);
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 minutes in seconds
  const [pomodoroType, setPomodoroType] = useState<'work' | 'break'>('work');

  useEffect(() => {
    let interval: any;
    if (pomodoroActive && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime((prev) => prev - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      setPomodoroActive(false);
      // Switch type when timer completes
      if (pomodoroType === 'work') {
        setPomodoroType('break');
        setPomodoroTime(5 * 60);
      } else {
        setPomodoroType('work');
        setPomodoroTime(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [pomodoroActive, pomodoroTime, pomodoroType]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetPomodoro = () => {
    setPomodoroActive(false);
    setPomodoroType('work');
    setPomodoroTime(25 * 60);
  };

  if (concentrationMode) {
    return (
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />

        <Button
          onClick={() => setConcentrationMode(false)}
          variant="outline"
          size="icon"
          className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur border-white/30 text-foreground/90"
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="relative z-10 text-center text-white space-y-6 px-4">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs tracking-wide uppercase">
            <Sparkles className="h-3 w-3" />
            Deep focus mode
          </p>
          <h1 className="text-5xl lg:text-7xl font-bold mb-2 drop-shadow-lg">
            Take a Deep Breath
          </h1>
          <p className="text-xl lg:text-2xl max-w-2xl mx-auto opacity-90">
            You are safe. You are calm. You are focused.
          </p>
          <p className="text-lg lg:text-xl max-w-xl mx-auto opacity-80">
            Close your eyes. Inhale for 4 counts, hold for 4, exhale for 4. Let your thoughts
            slow down like a quiet village evening.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-background to-sky-50 dark:from-emerald-950/40 dark:via-background dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-3 rounded-2xl shadow-lg shadow-emerald-500/30">
              <Sparkles className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-emerald-100/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
                Wellness Studio
              </p>
              <h1 className="mt-3 text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                AI Well-Being Studio
              </h1>
              <p className="mt-1 text-sm sm:text-base text-muted-foreground max-w-xl">
                Gentle tools to help you reset, focus, and breathe — inspired by calm rural
                life and mindful work.
              </p>
            </div>
          </div>

          {/* Small stats */}
          <div className="grid grid-cols-2 gap-3 max-w-xs text-sm">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3 shadow-sm dark:bg-emerald-900/20 dark:border-emerald-900">
              <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-200">
                Today&apos;s streak
              </p>
              <p className="mt-1 text-lg font-semibold text-emerald-900 dark:text-emerald-100">
                3 days 🔥
              </p>
            </div>
            <div className="rounded-2xl border border-sky-100 bg-sky-50/70 px-4 py-3 shadow-sm dark:bg-sky-900/20 dark:border-sky-900">
              <p className="text-[11px] uppercase tracking-[0.18em] text-sky-700 dark:text-sky-200">
                Total calm time
              </p>
              <p className="mt-1 text-lg font-semibold text-sky-900 dark:text-sky-100">
                42 min
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="meditation" className="w-full">
          <TabsList className="relative mx-auto mb-8 flex w-full max-w-xl items-center justify-between rounded-full bg-muted/60 p-1 shadow-sm">
            <TabsTrigger
              value="meditation"
              className="flex-1 rounded-full data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-foreground text-xs sm:text-sm px-2 py-1"
            >
              Meditation
            </TabsTrigger>
            <TabsTrigger
              value="concentration"
              className="flex-1 rounded-full data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-foreground text-xs sm:text-sm px-2 py-1"
            >
              Concentration
            </TabsTrigger>
            <TabsTrigger
              value="pomodoro"
              className="flex-1 rounded-full data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-foreground text-xs sm:text-sm px-2 py-1"
            >
              Pomodoro
            </TabsTrigger>
          </TabsList>

          {/* Meditation Tab */}
          <TabsContent value="meditation">
            <Card className="border-none bg-gradient-to-br from-emerald-50/80 via-background to-sky-50/80 shadow-lg dark:from-emerald-950/40 dark:to-slate-950">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  Guided Rural Meditation
                  <span className="rounded-full bg-emerald-100 px-2 py-[2px] text-xs font-medium text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-100">
                    Calm • 10–15 min
                  </span>
                </CardTitle>
                <CardDescription>
                  Calming meditation practices inspired by village mornings, fields, and
                  quiet evenings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-5 lg:grid-cols-2">
                  {/* Morning card */}
                  <div className="group rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-emerald-900 dark:bg-emerald-950/40">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-xl shadow-sm dark:bg-emerald-900/80">
                          🌅
                        </span>
                        <div>
                          <h3 className="font-semibold text-foreground">Morning Village Calm</h3>
                          <p className="text-xs text-emerald-700/80 dark:text-emerald-200/80">
                            10 min • Soft start to your day
                          </p>
                        </div>
                      </div>
                      <span className="rounded-full bg-white/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-700 dark:bg-emerald-900/70 dark:text-emerald-100">
                        Morning
                      </span>
                    </div>

                    <p className="mb-3 text-sm text-muted-foreground">
                      Imagine a peaceful village morning: birds chirping, cool breeze, the
                      smell of fresh earth. Let that quietness soften your thoughts.
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      Close your eyes and picture yourself walking on a village path at dawn.
                      The sun rises gently, farmers start their day, water flows from a hand
                      pump, children laugh in the distance. Feel grounded, simple, and safe.
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-xs text-emerald-800/80 dark:text-emerald-100/70">
                        Best with headphones and slow breathing.
                      </p>
                      <Button size="sm" className="gap-1 rounded-full px-4 py-1.5 text-xs">
                        <Play className="h-3.5 w-3.5" />
                        Start session
                      </Button>
                    </div>
                  </div>

                  {/* Evening card */}
                  <div className="group rounded-2xl border border-amber-100 bg-amber-50/80 p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-amber-900 dark:bg-amber-950/40">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-xl shadow-sm dark:bg-amber-900/80">
                          🌾
                        </span>
                        <div>
                          <h3 className="font-semibold text-foreground">Evening Gratitude</h3>
                          <p className="text-xs text-amber-700/80 dark:text-amber-200/80">
                            8 min • Gentle reflection
                          </p>
                        </div>
                      </div>
                      <span className="rounded-full bg-white/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-amber-700 dark:bg-amber-900/70 dark:text-amber-100">
                        Evening
                      </span>
                    </div>

                    <p className="mb-3 text-sm text-muted-foreground">
                      Reflect on your day with gratitude, inspired by simple rural life and
                      community values.
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      Think of three things you&apos;re grateful for: the food you ate, the
                      people who helped you, the roof over your head. Like a farmer grateful
                      for the harvest, appreciate life&apos;s small, steady blessings.
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-xs text-amber-800/80 dark:text-amber-100/70">
                        Perfect before sleep or after study.
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1 rounded-full border-amber-200 text-xs dark:border-amber-800"
                      >
                        <Play className="h-3.5 w-3.5" />
                        Play audio
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Concentration Mode Tab */}
          <TabsContent value="concentration">
            <Card className="border-none bg-gradient-to-br from-sky-50 via-background to-emerald-50 shadow-lg dark:from-slate-950/40 dark:to-emerald-950/30">
              <CardHeader>
                <CardTitle>Deep Concentration Mode</CardTitle>
                <CardDescription>
                  A distraction-free full-screen environment with nature visuals and soft
                  breathing prompts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 lg:grid-cols-[1.4fr,1fr] items-center">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      When you need to drop into flow state, enter concentration mode. Your
                      screen transforms into a calm nature scene with a gentle breathing
                      script so you can reset before deep work.
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1.5">
                      <li>• Full-screen calming village landscape</li>
                      <li>• Soft overlay text for 4–4–4 breathing</li>
                      <li>• Minimal UI, no extra distractions</li>
                    </ul>
                    <Button onClick={() => setConcentrationMode(true)} className="w-full lg:w-auto gap-2" size="lg">
                      <Sparkles className="mr-1 h-5 w-5" />
                      Enter Concentration Mode
                    </Button>
                  </div>

                  <div className="relative mx-auto h-44 w-full max-w-xs overflow-hidden rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-200 via-emerald-200 to-emerald-300 shadow-md dark:border-sky-900 dark:from-sky-900/60 dark:via-emerald-900/60 dark:to-emerald-800/70">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.85),_transparent_60%)] dark:bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.7),_transparent_60%)]" />
                    <div className="relative flex h-full flex-col items-center justify-center gap-2 text-center text-sky-900 dark:text-sky-50">
                      <p className="text-xs uppercase tracking-[0.25em] opacity-80">
                        Preview
                      </p>
                      <p className="text-lg font-semibold">Breathe • Focus • Flow</p>
                      <p className="px-6 text-xs opacity-80">
                        Screen fades, thoughts slow down, and your mind gets ready for deep
                        work.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pomodoro Tab */}
          <TabsContent value="pomodoro">
            <Card className="border-none bg-gradient-to-br from-background via-emerald-50/60 to-sky-50/80 shadow-lg dark:from-slate-950/40 dark:via-slate-950 dark:to-emerald-950/40">
              <CardHeader>
                <CardTitle>Pomodoro Focus Timer</CardTitle>
                <CardDescription>
                  Stay productive with structured work &amp; rest cycles — perfect for study
                  and coding sprints.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Timer Display */}
                  <div className="text-center">
                    <div className="relative mx-auto mb-4 flex h-44 w-44 items-center justify-center rounded-full bg-gradient-to-br from-emerald-200/80 via-background to-sky-100/80 shadow-lg shadow-emerald-500/20 dark:from-emerald-900/40 dark:via-slate-950 dark:to-sky-900/40">
                      <div className="absolute inset-[10%] rounded-full border border-emerald-300/60 dark:border-emerald-700/70" />
                      <div className="text-5xl lg:text-6xl font-bold text-foreground">
                        {formatTime(pomodoroTime)}
                      </div>
                    </div>
                    <p className="text-lg font-medium text-foreground">
                      {pomodoroType === 'work' ? 'Work Session' : 'Break Time'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {pomodoroType === 'work'
                        ? 'Focus fully on one task — no multitasking.'
                        : 'Step away, stretch, hydrate, and relax your eyes.'}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-sky-500 transition-all duration-1000"
                      style={{
                        width: `${
                          (((pomodoroType === 'work' ? 25 * 60 : 5 * 60) - pomodoroTime) /
                            (pomodoroType === 'work' ? 25 * 60 : 5 * 60)) *
                          100
                        }%`,
                      }}
                    />
                  </div>

                  {/* Controls */}
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Button
                      onClick={() => setPomodoroActive(!pomodoroActive)}
                      size="lg"
                      className="flex-1 max-w-xs gap-2 rounded-full"
                    >
                      {pomodoroActive ? (
                        <>
                          <Pause className="h-5 w-5" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="h-5 w-5" />
                          Start
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={resetPomodoro}
                      variant="outline"
                      size="lg"
                      className="rounded-full"
                    >
                      <RotateCcw className="h-5 w-5 mr-2" />
                      Reset
                    </Button>
                  </div>

                  {/* Info */}
                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 dark:border-emerald-900 dark:bg-emerald-950/40">
                    <h4 className="font-medium text-foreground mb-2">
                      How the Pomodoro rhythm works
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1.5">
                      <li>• Work for 25 minutes with deep focus on a single task.</li>
                      <li>• Take a short 5-minute break to relax your eyes and body.</li>
                      <li>• Repeat this cycle 4 times for one full &quot;set&quot;.</li>
                      <li>• After 4 cycles, enjoy a longer 15–30 minute break.</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Wellness;
