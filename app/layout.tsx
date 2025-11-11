import {NextIntlClientProvider} from 'next-intl';
import "./globals.css"
import { Toaster } from '@/components/ui/sonner';
type Props = {
  children: React.ReactNode;
};
 
export default async function RootLayout({children}: Props) {
  return (
    <html>
      <body  >
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <Toaster/>
      </body>
    </html>
  );
}