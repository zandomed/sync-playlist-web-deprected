import { headers } from 'next/headers';
import Link from 'next/link';

import {
  SiApplemusic,
  SiApplemusicHex,
  SiSpotify,
  SiSpotifyHex,
} from '@icons-pack/react-simple-icons';
import { ArrowRight } from 'lucide-react';

import { auth } from '@/lib/auth';
import Footer from '@/presentation/components/footer';
import Header from '@/presentation/components/header';
import { Button } from '@/presentation/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/presentation/components/ui/card';

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      <Header />
      <main>
        <div className="bg-background min-h-screen">
          {/* Hero Section */}
          <section className="flex items-center px-4 pt-50 pb-20 sm:px-6 lg:px-8">
            <div className="mx-auto flex min-h-full max-w-7xl flex-col items-center justify-center gap-y-10 text-center">
              <div className="transform transition-all duration-1000">
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
                <div className="group flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link href={session ? '/dashboard' : '/login'}>
                    <Button
                      size="lg"
                      variant="default"
                      className="px-8 text-lg"
                    >
                      Start Migration
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Trust Indicators */}
              <div>
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
          <section
            id="features"
            className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8"
          >
            <div className="mx-auto max-w-7xl">
              <div className="mb-16 text-center">
                <h3 className="mb-6 text-4xl font-bold md:text-4xl">
                  Connect your streaming services
                </h3>
                <p className="text-muted-foreground mx-auto max-w-3xl text-xl">
                  Made for how you actually listen to music. From casual
                  listeners to serious audiophiles, PlaylistSync adapts to your
                  music habits — not the other way around.
                </p>
              </div>

              <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-2">
                <Card className="group hover:border-primary border-2 p-8 transition-all hover:shadow-lg">
                  <CardContent className="flex flex-col items-center p-0">
                    <div className="mb-6 flex h-15 w-15 items-center justify-center rounded-lg bg-white transition-transform group-hover:scale-110">
                      <SiSpotify className="text-spotify-primary h-10 w-10"></SiSpotify>
                    </div>
                    <CardTitle className="mb-4 text-xl">Spotify</CardTitle>
                    <CardDescription>
                      Connect your Spotify account
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full text-base">
                      Connect
                      <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardFooter>
                </Card>
                <Card className="group hover:border-primary border-2 p-8 transition-all hover:shadow-lg">
                  <CardContent className="flex flex-col items-center p-0">
                    <div className="mb-6 flex h-15 w-15 items-center justify-center rounded-lg bg-white transition-transform group-hover:scale-110">
                      <SiApplemusic className="text-apple-music-primary h-10 w-10"></SiApplemusic>
                    </div>
                    <CardTitle className="mb-4 text-xl">Apple Music</CardTitle>
                    <CardDescription>
                      Connect your Apple Music account
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full text-base">
                      Connect
                      <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </section>
          {/* How it works */}
          <section className="px-4 py-16">
            <div className="container mx-auto max-w-4xl">
              <h3 className="text-foreground mb-12 text-center text-3xl font-bold">
                How it works
              </h3>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold">
                    1
                  </div>
                  <h4 className="mb-2 text-xl font-semibold">
                    Connect your accounts
                  </h4>
                  <p className="text-muted-foreground">
                    Authorize secure access to your favorite streaming services
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold">
                    2
                  </div>
                  <h4 className="mb-2 text-xl font-semibold">
                    Select playlists
                  </h4>
                  <p className="text-muted-foreground">
                    Choose which playlists you want to migrate and to which
                    service to transfer them
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold">
                    3
                  </div>
                  <h4 className="mb-2 text-xl font-semibold">
                    Enjoy your playlists
                  </h4>
                  <p className="text-muted-foreground">
                    Enjoy your playlists on your new streaming service
                  </p>
                </div>
              </div>
            </div>
          </section>
          {/* CTA Section */}
          <section className="bg-primary text-primary-foreground px-4 py-16">
            <div className="container mx-auto max-w-2xl text-center">
              <h3 className="mb-4 text-3xl font-bold">
                Are you ready to migrate your playlists?
              </h3>
              <p className="mb-8 text-lg opacity-90">
                Join thousands of users who have successfully migrated their
                playlists
              </p>
              <Link href={session ? '/dashboard' : '/login'}>
                <Button size="lg" variant="secondary" className="px-8 text-lg">
                  Start Migration
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
