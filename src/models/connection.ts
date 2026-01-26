export const serverAPI =
  process.env.NEXT_PUBLIC_ENVIRONMENT == 'production'
    ? 'https://132.18.38.133/'
    : 'http://localhost:5000/';
