import { NextResponse } from 'next/server';
import api from './services/magicFetch';
// import { preslowAPI } from '@models/connection';

const visitPages = ['/', '/calendario', '/noticias', '/eventos'];

export async function middleware(request: any) {
  const pathname = request.nextUrl.pathname;
  if (visitPages.includes(pathname)) {
    console.log('🚀 ~ request.nextUrl.pathname:', pathname);

    try {
      api.visits.post({ body: { page: pathname || '/' } });
    } catch (error) {
      console.error('Error recording page visit:', error);
    }

    return;
  }

  if (request.nextUrl.pathname == '/entrar') {
    const response: any = await validateToken(request);

    if (response) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // const response: any = await validateToken(request);

  // if (!response) {
  //   return NextResponse.redirect(new URL('/entrar', request.url));
  // }
}

async function validateToken(request: any) {
  const cookie = request.cookies.get('accessToken');
  const token = cookie && cookie.value;

  if (!token) {
    return false;
  }

  try {
    // const { status } = await fetch(`${preslowAPI}/sesion/validar`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`
    //   },
    //   body: JSON.stringify({ token })
    // });

    const status = 200;
    return status >= 200 && status < 300;
  } catch {
    return false;
  }
}

async function validatePasswordToken(token: string) {
  try {
    // const { status } = await fetch(
    //   `${preslowAPI}/sesion/validar-cambiar-clave`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ token })
    //   }
    // );

    const status = 200;

    return status >= 200 && status < 300;
  } catch {
    return false;
  }
}

export const config = {
  matcher: ['/', '/noticias', '/calendario', '/eventos', '/admin/:path*'],
};
