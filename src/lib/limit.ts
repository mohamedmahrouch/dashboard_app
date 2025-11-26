import { cookies } from 'next/headers';
import { format } from 'date-fns';

export const MAX_DAILY_VIEWS = 50;

// La fonction attend maintenant l'ID de l'utilisateur
export async function getUsageStatus(userId: string) {
  const cookieStore = await cookies();
  
  // On cherche le cookie spécifique à cet utilisateur
  const COOKIE_NAME = `usage_${userId}`;
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
