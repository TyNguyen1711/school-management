import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { routeAccessMap } from './libs/setting'
import { create } from 'domain'
import { NextResponse } from 'next/server'

const matchers = Object.keys(routeAccessMap).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccessMap[route],
}))
// console.log('Route Matchers:', matchers)

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims } = await auth()
  // console.log('Session Claims:', sessionClaims)
  const role = (sessionClaims?.metadata as { role: string })?.role
 

  // console.log('User Role:', role)
  for(const { matcher, allowedRoles } of matchers) {
    if(matcher(req) && !allowedRoles.includes(role!)) {
      return NextResponse.redirect(new URL(`/${role}`, req.url))
    }
}})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}