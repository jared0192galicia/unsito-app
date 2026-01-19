export const serverAPI =
  process.env.NEXT_PUBLIC_ENVIRONMENT == 'production'
    ? 'https://api.citas.devjared.com/'
    : 'http://localhost:5000/';
