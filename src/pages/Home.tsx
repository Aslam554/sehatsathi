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
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import heroImage from '@/assets/hero-image.jpg';

const Home = () => {
  const modules = [
    {
      icon: Pill,
      title: 'Medicine Availability',
      description: 'AI-powered prediction of medicine shortages before they happen',
      link: '/features/medicine',
    },
    {
      icon: Ambulance,
      title: 'Smart Emergency',
      description: 'Intelligent ambulance dispatch and emergency response network',
      link: '/features/ambulance',
    },
    {
      icon: Calendar,
      title: 'Queue Tokens',
      description: 'Skip long waits with digital hospital queue management',
      link: '/features/queues',
    },
    {
      icon: ShieldCheck,
      title: 'Health Schemes',
      description: 'Auto-check eligibility for government health schemes',
      link: '/features/schemes',
    },
    {
      icon: CloudRain,
      title: 'Disaster Alerts',
      description: 'Combined disaster warnings with health advisories',
      link: '/features/disaster',
    },
    {
      icon: Users,
      title: 'Community Network',
      description: 'Connect with blood donors, volunteers, and health supporters',
      link: '/features/community',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-accent px-4 py-2 rounded-full">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  AI-Powered Rural Health Intelligence
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                From <span className="text-primary">Sick-Care</span> to{' '}
                <span className="text-primary">Smart-Care</span>
              </h1>
              
              <p className="text-lg text-muted-foreground">
                SehatSathi X connects rural India to better health support through predictive 
                intelligence, emergency networks, and community care.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-base">
                  <Link to="/dashboard">
                    Open Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base">
                  <Link to="/features/ambulance">Try Emergency Support</Link>
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="Rural Indian village with health center"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem-Solution Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              The Challenge We're Solving
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Rural India faces critical health challenges. We're building intelligent solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Problems */}
            <Card className="border-2 border-destructive/20">
              <CardHeader>
                <CardTitle className="text-destructive">Problems</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-destructive/10 p-2 rounded-lg mt-0.5">
                    <div className="h-2 w-2 bg-destructive rounded-full" />
                  </div>
                  <p className="text-sm text-foreground">
                    Medicine shortages discovered too late
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-destructive/10 p-2 rounded-lg mt-0.5">
                    <div className="h-2 w-2 bg-destructive rounded-full" />
                  </div>
                  <p className="text-sm text-foreground">
                    Slow emergency response and ambulance delays
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-destructive/10 p-2 rounded-lg mt-0.5">
                    <div className="h-2 w-2 bg-destructive rounded-full" />
                  </div>
                  <p className="text-sm text-foreground">
                    Long hospital queues with no queue management
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-destructive/10 p-2 rounded-lg mt-0.5">
                    <div className="h-2 w-2 bg-destructive rounded-full" />
                  </div>
                  <p className="text-sm text-foreground">
                    Low awareness of government health schemes
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-destructive/10 p-2 rounded-lg mt-0.5">
                    <div className="h-2 w-2 bg-destructive rounded-full" />
                  </div>
                  <p className="text-sm text-foreground">
                    Disasters and health crises not reaching villages in time
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Solutions */}
            <Card className="border-2 border-success/20">
              <CardHeader>
                <CardTitle className="text-success">Our Solutions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-success/10 p-2 rounded-lg mt-0.5">
                    <div className="h-2 w-2 bg-success rounded-full" />
                  </div>
                  <p className="text-sm text-foreground">
                    <strong>Predictive Medicine Pipeline:</strong> AI forecasts shortages days in advance
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-success/10 p-2 rounded-lg mt-0.5">
                    <div className="h-2 w-2 bg-success rounded-full" />
                  </div>
                  <p className="text-sm text-foreground">
                    <strong>Smart Ambulance Mesh:</strong> Real-time dispatch and route optimization
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-success/10 p-2 rounded-lg mt-0.5">
                    <div className="h-2 w-2 bg-success rounded-full" />
                  </div>
                  <p className="text-sm text-foreground">
                    <strong>Digital Queue Tokens:</strong> Book your turn, skip the wait
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-success/10 p-2 rounded-lg mt-0.5">
                    <div className="h-2 w-2 bg-success rounded-full" />
                  </div>
                  <p className="text-sm text-foreground">
                    <strong>Auto Scheme Eligibility:</strong> Check what benefits you qualify for instantly
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-success/10 p-2 rounded-lg mt-0.5">
                    <div className="h-2 w-2 bg-success rounded-full" />
                  </div>
                  <p className="text-sm text-foreground">
                    <strong>Disaster-Health Alerts:</strong> Combined warnings with health advisories
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Explore Our Modules
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive health intelligence for rural communities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <Card key={module.title} className="group hover:shadow-xl transition-all hover:scale-105">
                  <CardHeader>
                    <div className="bg-primary p-3 rounded-xl w-fit mb-3 group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{module.title}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
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

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="h-16 w-16 text-primary-foreground mx-auto mb-6" />
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Join the Rural Health Revolution
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8">
            Whether you're a villager seeking care, a volunteer wanting to help, or a health worker 
            improving services—SehatSathi X is here for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-base">
              <Link to="/dashboard">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to="/features/community">Become a Volunteer</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
