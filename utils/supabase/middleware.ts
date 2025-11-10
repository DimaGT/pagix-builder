// utils/supabase/middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Skip auth check for API routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    return supabaseResponse
  }

  // Extract locale from pathname (e.g., /en/dashboard -> en)
  const pathnameLocale = request.nextUrl.pathname.split('/')[1]
  const locales = ['en', 'he']
  const currentLocale = locales.includes(pathnameLocale) ? pathnameLocale : 'en'
  
  // Remove locale prefix for route checking
  const pathnameWithoutLocale = request.nextUrl.pathname.replace(`/${currentLocale}`, '') || '/'

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If user is logged in and tries to access login/signup, redirect to dashboard
  if (user && (pathnameWithoutLocale.startsWith('/login') || pathnameWithoutLocale.startsWith('/signup'))) {
    const url = request.nextUrl.clone()
    url.pathname = `/${currentLocale}/dashboard`
    return NextResponse.redirect(url)
  }

  // Define public routes (without locale prefix)
  const publicRoutes = ['/login', '/signup', '/verify-phone', '/email-confirmation', '/error']
  const isPublicRoute = publicRoutes.some(route => pathnameWithoutLocale.startsWith(route))

  // If no user and trying to access protected routes, redirect to login
  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone()
    url.pathname = `/${currentLocale}/login`
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}