import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sync Playlist',
  description: 'Sync your playlist across platforms',
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>;

export default function RootLayout(props: RootLayoutProps) {
  const { children, modal } = props;
  return (
    <html>
      <body>
        {children}
        {modal}
        <div id="modal-root" />
      </body>
    </html>
  );
}
