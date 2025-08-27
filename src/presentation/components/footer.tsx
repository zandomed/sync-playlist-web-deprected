export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-border border-t px-4 py-8">
      <div className="container mx-auto text-center">
        <p className="text-muted-foreground">
          © {year} Miguel Mendoza. All rights reserved.
        </p>
        <p className="text-muted-foreground mt-2 text-sm">
          Your privacy is important to us. We do not store any of your personal
          data or playlist information.
        </p>
      </div>
    </footer>
  );
}
