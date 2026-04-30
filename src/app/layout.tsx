import './globals.css';
import AiAgent from '@/components/AiAgent';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <AiAgent /> 
      </body>
    </html>
  );
}