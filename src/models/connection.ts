export const serverAPI =
  process.env.NEXT_PUBLIC_ENVIRONMENT == 'production'
    ? 'https://api-unsito.devjared.com/'
    : 'http://localhost:5000/';
