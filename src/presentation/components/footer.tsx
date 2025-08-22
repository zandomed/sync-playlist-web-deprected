import { Music } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-foreground text-background border-t px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center space-x-2">
              <div className="bg-gradient-brand flex h-8 w-8 items-center justify-center rounded-lg">
                <Music className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">PlaylistSync</span>
            </div>
            <p className="text-muted">
              Seamlessly migrate your music between platforms.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Product</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted hover:text-background transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted hover:text-background transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted hover:text-background transition-colors"
                >
                  API
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted hover:text-background transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted hover:text-background transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted hover:text-background transition-colors"
                >
                  Status
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Company</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted hover:text-background transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted hover:text-background transition-colors"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted hover:text-background transition-colors"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-muted mt-12 border-t pt-8 text-center">
          <p className="text-muted">
            © 2025 Miguel Mendoza. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
