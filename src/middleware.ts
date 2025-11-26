import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { format } from 'date-fns';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/agencies(.*)',
  '/contacts(.*)',
]);

export default clerkMiddleware(async (auth, req) => {

  if (isProtectedRoute(req)) await auth.protect();


  if (req.nextUrl.pathname === '/contacts') {

    const res = NextResponse.next();

    const COOKIE_NAME = 'usage_journalier';
    const MAX_DAILY_VIEWS = 50;
    const today = format(new Date(), 'yyyy-MM-dd');
    const INCREMENT = 10; 

    let currentCount = 0;
    const cookie = req.cookies.get(COOKIE_NAME);

    if (cookie) {
      try {
        const parsed = JSON.parse(cookie.value);
        if (parsed.date === today) {
          currentCount = parsed.count;
        }
      } catch(e) {}
    }

    if (currentCount <= MAX_DAILY_VIEWS) {
        const newCount = currentCount + INCREMENT;

        res.cookies.set(COOKIE_NAME, JSON.stringify({
            date: today,
            count: newCount
        }), { secure: true, httpOnly: true });
    }

    return res;
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};