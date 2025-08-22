'use client';
import { useState, useEffect } from 'react';

import {
  SiApplemusic,
  SiApplemusicHex,
  SiSpotify,
  SiSpotifyHex,
} from '@icons-pack/react-simple-icons';
import {
  ArrowRight,
  Zap,
  Users,
  CheckCircle,
  Star,
  Play,
  Shuffle,
  BarChart3,
  ChevronDown,
} from 'lucide-react';

import Footer from '@/presentation/components/footer';
import Header from '@/presentation/components/header';
import { Badge } from '@/presentation/components/ui/badge';
import { Button } from '@/presentation/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/presentation/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/presentation/components/ui/collapsible';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Zap className="h-6 w-6 text-white" />,
      title: 'Smart Matching',
      description: 'AI-powered song detection and matching across platforms',
    },
    {
      icon: <Shuffle className="h-6 w-6 text-white" />,
      title: 'Cross-Platform',
      description: 'Seamless transfer between Spotify and Apple Music',
    },
    {
      icon: <Users className="h-6 w-6 text-white" />,
      title: 'Bulk Transfer',
      description: 'Migrate multiple playlists simultaneously',
    },
  ];

  const capabilities = [
    {
      title: 'Smart Assignment',
      subtitle: 'Right song, right match',
      description:
        'Intelligently matches songs based on audio fingerprints, metadata, and user preferences. No more guesswork — the right song reaches the right playlist.',
    },
    {
      title: 'Visual Progress',
      subtitle: 'Clarity at a glance',
      description:
        "Track every migration's status with intuitive progress bars and clear indicators. Quickly spot failed matches and what needs your attention next.",
    },
    {
      title: 'Real-Time Updates',
      subtitle: 'Stay in sync',
      description:
        'Watch your playlists migrate in real time — see progress updates instantly. Stay informed without refreshing or waiting on status updates.',
    },
    {
      title: 'Multiple Views',
      subtitle: 'Work your way',
      description:
        "Switch seamlessly between list, grid, and timeline views to match how you organize music. Whether planning or tracking, you're always in control.",
    },
  ];

  const stats = [
    { number: '50K+', label: 'Playlists Migrated Weekly' },
    { number: '96%', label: 'Song Match Success Rate' },
    { number: '4.9/5', label: 'User Satisfaction Score' },
  ];

  const workflow = [
    {
      title: 'Dynamic Song Matching',
      description:
        'Songs are automatically matched using advanced audio fingerprinting and metadata analysis.',
    },
    {
      title: 'Context-Aware Preview',
      description:
        'Preview matches with confidence scores and manual correction options before migration.',
    },
    {
      title: 'Built-In Intelligence',
      description:
        'AI analyzes your music preferences to improve future matching accuracy and suggest similar songs.',
    },
    {
      title: 'Cross-Platform Sync',
      description:
        'Seamlessly sync playlists across multiple music services with real-time collaboration features.',
    },
  ];

  const plans = [
    {
      name: 'Basic',
      price: '$0',
      period: 'Free forever',
      features: [
        '3 playlist migrations per month',
        'Basic song matching',
        'Standard support',
      ],
      popular: false,
    },
    {
      name: 'Pro',
      price: '$9',
      period: 'Billed monthly',
      features: [
        'Unlimited migrations',
        'Advanced AI matching',
        'Priority support',
        'Batch processing',
        'Migration history',
      ],
      popular: true,
    },
    {
      name: 'Teams',
      price: '$29',
      period: 'Billed monthly',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Advanced analytics',
        'API access',
        'Custom integrations',
      ],
      popular: false,
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Music Enthusiast',
      content:
        'Finally switched from Spotify to Apple Music without losing my 200+ playlists. The matching was incredible!',
    },
    {
      name: 'Mike Rodriguez',
      role: 'DJ & Producer',
      content:
        "I've tried many migration tools — this is the first that actually understands music and gets the matches right.",
    },
    {
      name: 'Emma Thompson',
      role: 'Playlist Curator',
      content:
        'Saved me hours of manual work. The preview feature let me fix matches before migration. Perfect!',
    },
  ];

  const faqs = [
    {
      q: 'How accurate is the song matching?',
      a: 'Our AI achieves 96% accuracy by combining audio fingerprinting, metadata analysis, and machine learning. You can preview and adjust matches before migration.',
    },
    {
      q: 'Which music services are supported?',
      a: "Currently we support Spotify and Apple Music, with YouTube Music and Amazon Music coming soon. We're constantly adding new platforms.",
    },
    {
      q: "What happens to songs that can't be matched?",
      a: 'Unmatched songs are clearly highlighted in the preview. You can manually search for alternatives or choose to skip them. We maintain a list for future reference.',
    },
    {
      q: 'Is my music data secure?',
      a: "Absolutely. We use OAuth authentication, never store your passwords, and encrypt all data. We only access what's needed for migration and delete temporary data afterward.",
    },
    {
      q: 'Can I migrate playlists in both directions?',
      a: 'Yes! You can migrate from Spotify to Apple Music and vice versa. You can also maintain sync between platforms with our Pro plan.',
    },
  ];

  return (
    <>
      <Header />
      <main>
        <div className="bg-background min-h-screen">
          {/* Hero Section */}
          <section className="flex min-h-dvh items-center px-4 pt-32 pb-20 sm:px-6 lg:px-8">
            <div className="mx-auto flex min-h-full max-w-7xl flex-col items-center justify-center gap-y-16 text-center">
              <div
                className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              >
                <h1 className="mb-6 text-5xl leading-tight font-bold md:text-7xl">
                  Migrate Your Music,{' '}
                  <span className="bg-gradient-brand bg-clip-text text-transparent">
                    Seamlessly
                  </span>
                </h1>
                <p className="text-muted-foreground mx-auto mb-8 max-w-3xl text-xl">
                  Transfer playlists across your favorite music services with
                  intelligent song matching. Never lose your carefully curated
                  music collections again.
                </p>
                <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button
                    size="lg"
                    variant="default"
                    // className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-lg px-8 py-6 group"
                  >
                    Start Migration
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    // className="text-lg px-8 py-6"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Watch Demo
                  </Button>
                </div>
              </div>

              {/* Hero Visual */}
              {/* <div className="relative max-w-4xl mx-auto">
            <Card className="p-8 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                      <Music className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">My Spotify Playlists</h3>
                      <p className="text-sm text-muted-foreground">247 songs • 15 playlists</p>
                    </div>
                  </div>
                  <Card className="p-4 bg-muted/50">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Road Trip Hits</span>
                        <Badge variant="secondary" className="text-green-600">
                          ✓ Ready
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Workout Energy</span>
                        <Badge variant="secondary" className="text-green-600">
                          ✓ Ready
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Chill Vibes</span>
                        <Badge variant="secondary" className="text-green-600">
                          ✓ Ready
                        </Badge>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="flex justify-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-white animate-pulse" />
                  </div>
                </div>
              </div>
            </Card>
          </div> */}

              {/* Trust Indicators */}
              <div className="">
                <p className="text-muted-foreground mb-4 text-sm opacity-60">
                  We support follow servives:
                </p>
                <div className="flex items-center justify-center space-x-8">
                  <div className="flex items-center space-x-2">
                    <SiSpotify className="h-6 w-6" color={SiSpotifyHex} />
                    <span className="text-muted-foreground font-medium opacity-60">
                      Spotify
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <SiApplemusic className="h-6 w-6" color={SiApplemusicHex} />
                    <span className="text-muted-foreground font-medium opacity-60">
                      Apple Music
                    </span>
                  </div>
                  {/* <div className="flex items-center space-x-2">
                <Chrome className="w-6 h-6 text-red-500" />
                <span className="font-medium text-muted-foreground">YouTube Music (Coming Soon)</span>
              </div> */}
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="mb-16 text-center">
                <h2 className="mb-6 text-4xl font-bold md:text-5xl">
                  Migration Features
                </h2>
                <p className="text-muted-foreground mx-auto max-w-3xl text-xl">
                  Made for how you actually listen to music. From casual
                  listeners to serious audiophiles, PlaylistSync adapts to your
                  music habits — not the other way around.
                </p>
              </div>

              <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-3">
                {features.map((feature, index) => (
                  <Card
                    key={index}
                    className="group border-2 p-8 transition-all hover:border-pink-200 hover:shadow-lg"
                  >
                    <CardContent className="p-0">
                      <div className="bg-primary mb-6 flex h-12 w-12 items-center justify-center rounded-lg transition-transform group-hover:scale-110">
                        {feature.icon}
                      </div>
                      <CardTitle className="mb-4">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Detailed Features */}
              <div className="space-y-20">
                {capabilities.map((capability, index) => (
                  <div
                    key={index}
                    className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
                  >
                    <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                      <div className="space-y-4">
                        <Badge
                          variant="secondary"
                          className="bg-pink-50 text-pink-600"
                        >
                          {capability.subtitle}
                        </Badge>
                        <h3 className="text-3xl font-bold">
                          {capability.title}
                        </h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                          {capability.description}
                        </p>
                      </div>
                    </div>
                    <div
                      className={
                        index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''
                      }
                    >
                      <Card className="bg-muted/50 p-8">
                        <div className="flex h-64 w-full items-center justify-center rounded-lg bg-gradient-to-br from-pink-50 to-rose-50">
                          <BarChart3 className="h-16 w-16 text-pink-400" />
                        </div>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl text-center">
              <h2 className="mb-6 text-4xl font-bold">Proof In The Numbers</h2>
              <p className="text-muted-foreground mx-auto mb-16 max-w-3xl text-xl">
                Built to scale, proven to perform. Behind every number is a
                music lover achieving more — see how smart matching, speed, and
                satisfaction come together.
              </p>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-primary mb-4 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
                      {stat.number}
                    </div>
                    <p className="text-muted-foreground text-lg">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Workflow Section */}
          <section className="px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="mb-16 text-center">
                <h2 className="mb-6 text-4xl font-bold">Get Things Done</h2>
                <p className="text-muted-foreground mx-auto max-w-3xl text-xl">
                  Handle complex migrations without the chaos. Adapts to your
                  music library and listening habits — keeping playlists
                  organized, songs matched, and decisions clear.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {workflow.map((item, index) => (
                  <Card
                    key={index}
                    className="p-8 transition-all hover:shadow-lg"
                  >
                    <CardHeader className="p-0 pb-4">
                      <CardTitle>{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <CardDescription>{item.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section
            id="pricing"
            className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8"
          >
            <div className="mx-auto max-w-7xl">
              <div className="mb-16 text-center">
                <h2 className="mb-6 text-4xl font-bold">
                  Plans That Grow With You
                </h2>
                <p className="text-muted-foreground mb-8 text-xl">
                  Choose the plan that fits your music migration needs
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {plans.map((plan, index) => (
                  <Card
                    key={index}
                    className={`p-8 ${plan.popular ? 'relative border-pink-200 shadow-lg' : ''}`}
                  >
                    {plan.popular && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
                        Most Popular
                      </Badge>
                    )}
                    <CardHeader className="pb-8 text-center">
                      <CardTitle className="mb-2 text-2xl">
                        {plan.name}
                      </CardTitle>
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold">{plan.price}</span>
                        <span className="text-muted-foreground ml-2">
                          /{plan.period}
                        </span>
                      </div>
                    </CardHeader>

                    <CardContent className="flex-1">
                      <ul className="mb-8 space-y-4">
                        {plan.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="text-muted-foreground flex items-center"
                          >
                            <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        variant={plan.popular ? 'default' : 'outline'}
                      >
                        Get Started
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="mb-16 text-center">
                <h2 className="mb-6 text-4xl font-bold">
                  What Music Lovers Are Saying
                </h2>
                <p className="text-muted-foreground text-xl">
                  Real stories from users who seamlessly migrated their music
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {testimonials.map((testimonial, index) => (
                  <Card
                    key={index}
                    className="p-8 transition-all hover:shadow-lg"
                  >
                    <CardContent className="p-0">
                      <div className="mb-4 flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-5 w-5 fill-current text-yellow-400"
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        &quot;{testimonial.content}&quot;
                      </p>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-muted-foreground text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <div className="mb-16 text-center">
                <h2 className="mb-6 text-4xl font-bold">FAQ</h2>
                <p className="text-muted-foreground text-xl">
                  Answers to help you get started faster
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Collapsible key={index}>
                    <Card>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className="hover:bg-muted/50 flex h-auto w-full items-center justify-between px-8 py-6 text-left font-semibold"
                        >
                          <span>{faq.q}</span>
                          <ChevronDown className="text-muted-foreground h-5 w-5" />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="px-8 pb-6">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.a}
                        </p>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-foreground text-background px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <div className="rounded-2xl p-12">
                <h2 className="mb-6 text-4xl font-bold">
                  Ready to migrate your music library?
                </h2>
                <p className="text-muted mb-8 text-xl">
                  Join thousands of music lovers who&apos;ve successfully
                  migrated their playlists with PlaylistSync.
                </p>
                <Button size="lg" variant="default">
                  Start Your Migration
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
