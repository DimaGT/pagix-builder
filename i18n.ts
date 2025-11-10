import {getRequestConfig} from 'next-intl/server';
import {cookies} from 'next/headers';
 
export default getRequestConfig(async () => {
  // Read locale from cookie, fallback to 'en'
  const cookieStore = cookies();
  const locale = (await cookieStore).get('NEXT_LOCALE')?.value || 'en';
 
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});