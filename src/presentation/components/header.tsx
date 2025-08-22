import Link from 'next/link';

import { Menu } from 'lucide-react';

import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
const NavigationMenu = ({ mobile = false }) => (
  <div
    className={`${mobile ? 'flex flex-col space-y-4' : 'hidden items-center space-x-8 md:flex'}`}
  >
    <a href="#features" className="">
      <Button variant="ghost">Features</Button>
    </a>
    <a href="#pricing">
      <Button variant="ghost">Pricing</Button>
    </a>
    <a href="#faq">
      <Button variant="ghost">FAQ</Button>
    </a>
  </div>
);
export default function Header() {
  return (
    // <header className="bg-background/90 fixed top-0 z-50 w-full border-b backdrop-blur-md">
    <header className="fixed top-0 z-50 w-full">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-brand flex h-8 w-8 items-center justify-center rounded-lg">
              <Music className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">PlaylistSync</span>
          </div> */}
        <div></div>

        <nav className="shadow-sidebar-primary hidden items-center space-x-3 rounded-2xl border shadow-2xl backdrop-blur-2xl md:flex">
          <a href="#features">
            <Button variant="ghost">Features</Button>
          </a>
          <a href="#pricing">
            <Button variant="ghost">Pricing</Button>
          </a>
          <a href="#faq">
            <Button variant="ghost">FAQ</Button>
          </a>
        </nav>

        <div className="hidden items-center space-x-4 md:flex">
          <Button variant="ghost">Sign In</Button>
          <Link href="/auth" passHref scroll={false}>
            <Button variant="default">Get Started</Button>
          </Link>
        </div>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="mt-6 flex flex-col space-y-6">
              {/* <NavigationMenu mobile /> */}
              <div className="flex flex-col space-y-2">
                <Button variant="ghost">Sign In</Button>
                <Button variant="default">Get Started</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        {/* </div> */}
      </div>
    </header>
  );
}
