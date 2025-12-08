// import api from '@/services/axios';
import api from '@/services/magicFetch';
import Cookies from 'js-cookie';

export const login = async (user: string, password: string) => {
  try {
    const response = await api.auth.postLogin({
      body: { identifier: user, password },
    });

    const status: number = response.status;

    if (status == 200) {
      const { accessToken } = response.data;

      Cookies.set('accessToken', accessToken);
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
};

export const cookieData = async () => {
  const cookie = Cookies.get('accessToken');

  return cookie;
};
