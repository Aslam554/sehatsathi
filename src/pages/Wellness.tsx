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
        setPomodoroTime(prev => prev - 1);
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
          backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
        
        <Button
          onClick={() => setConcentrationMode(false)}
          variant="outline"
          size="icon"
          className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur"
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="relative z-10 text-center text-white space-y-6 px-4">
          <h1 className="text-5xl lg:text-7xl font-bold mb-4">
            Take a Deep Breath
          </h1>
          <p className="text-xl lg:text-2xl max-w-2xl mx-auto opacity-90">
            You are safe. You are calm. You are focused.
          </p>
          <p className="text-lg lg:text-xl max-w-xl mx-auto opacity-80">
            Close your eyes. Breathe in slowly for 4 counts. Hold for 4. Breathe out for 4.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-primary p-3 rounded-xl">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                AI Well-Being Studio
              </h1>
              <p className="text-muted-foreground">
                Focus, meditation, and wellness tools
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="meditation" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl mb-8">
            <TabsTrigger value="meditation">Meditation</TabsTrigger>
            <TabsTrigger value="concentration">Concentration</TabsTrigger>
            <TabsTrigger value="pomodoro">Pomodoro</TabsTrigger>
          </TabsList>

          {/* Meditation Tab */}
          <TabsContent value="meditation">
            <Card>
              <CardHeader>
                <CardTitle>Guided Rural Meditation</CardTitle>
                <CardDescription>
                  Calming meditation practices inspired by rural life
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-accent p-6 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-3">Morning Village Calm</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Imagine the peaceful morning in a village. Birds chirping, cool breeze, 
                      the smell of fresh earth. Let this tranquility wash over you.
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      Close your eyes. Picture yourself walking on a village path at dawn. 
                      The sun is gently rising. You can hear farmers starting their day, 
                      the sound of water from a hand pump, children laughing in the distance. 
                      Feel the connection to nature and simplicity.
                    </p>
                  </div>

                  <div className="bg-accent p-6 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-3">Evening Gratitude</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Reflect on the day with gratitude, inspired by rural community values
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      Think of three things you're grateful for today. The food you ate, 
                      the people who helped you, the roof over your head. Like a farmer 
                      grateful for the harvest, appreciate life's simple blessings.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Concentration Mode Tab */}
          <TabsContent value="concentration">
            <Card>
              <CardHeader>
                <CardTitle>Deep Concentration Mode</CardTitle>
                <CardDescription>
                  Full-screen calming environment for deep focus
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Enter a distraction-free full-screen mode with a calming natural background 
                    and guided breathing prompts.
                  </p>
                  <Button 
                    onClick={() => setConcentrationMode(true)}
                    className="w-full"
                    size="lg"
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Enter Concentration Mode
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pomodoro Tab */}
          <TabsContent value="pomodoro">
            <Card>
              <CardHeader>
                <CardTitle>Pomodoro Focus Timer</CardTitle>
                <CardDescription>
                  Stay productive with timed work and break sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Timer Display */}
                  <div className="text-center">
                    <div className="inline-block bg-gradient-to-br from-primary/20 to-accent p-8 rounded-full mb-4">
                      <div className="text-6xl lg:text-8xl font-bold text-foreground">
                        {formatTime(pomodoroTime)}
                      </div>
                    </div>
                    <p className="text-lg text-muted-foreground">
                      {pomodoroType === 'work' ? 'Work Session' : 'Break Time'}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-1000"
                      style={{
                        width: `${((pomodoroType === 'work' ? 25 * 60 : 5 * 60) - pomodoroTime) / (pomodoroType === 'work' ? 25 * 60 : 5 * 60) * 100}%`
                      }}
                    />
                  </div>

                  {/* Controls */}
                  <div className="flex gap-4 justify-center">
                    <Button
                      onClick={() => setPomodoroActive(!pomodoroActive)}
                      size="lg"
                      className="flex-1 max-w-xs"
                    >
                      {pomodoroActive ? (
                        <>
                          <Pause className="mr-2 h-5 w-5" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-5 w-5" />
                          Start
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={resetPomodoro}
                      variant="outline"
                      size="lg"
                    >
                      <RotateCcw className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Info */}
                  <div className="bg-accent p-4 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">How it works:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Work for 25 minutes with full focus</li>
                      <li>• Take a 5-minute break</li>
                      <li>• Repeat the cycle</li>
                      <li>• After 4 cycles, take a longer 15-30 minute break</li>
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
