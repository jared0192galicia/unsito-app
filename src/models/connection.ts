export const serverAPI =
  process.env.NEXT_PUBLIC_ENVIRONMENT == 'production'
    ? 'http://132.18.38.133:5000/'
    : 'http://localhost:5000/';
