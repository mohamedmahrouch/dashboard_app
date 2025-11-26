import { cookies } from 'next/headers';
import { format } from 'date-fns';

export const MAX_DAILY_VIEWS = 50;
export const COOKIE_NAME = 'usage_journalier';


export async function getUsageStatus() {
  const cookieStore = await cookies();
  const usageCookie = cookieStore.get(COOKIE_NAME);
  const today = format(new Date(), 'yyyy-MM-dd');
  
  let count = 0;

  if (usageCookie) {
    try {
      const parsed = JSON.parse(usageCookie.value);
      if (parsed.date === today) {
        count = parsed.count;
      }
    } catch (e) {}
  }

  return {
    count: count,
    limit: MAX_DAILY_VIEWS,
    allowed: count <= MAX_DAILY_VIEWS
  };
}