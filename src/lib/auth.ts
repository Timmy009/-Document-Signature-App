import { signOutUserApi } from '@/services/apis/auth';

export const LOCAL_STORAGE_KEY = {
  ACCESS_TOKEN: 'ACCCESS_TOKEN',
  REFRESH_ACCESS_TOKEN: 'REFRESH_ACCESS_TOKEN',
  SHOW_COOKIE_CONSENT: 'SHOW_COOKIE_CONSENT',
  REDIRECT_KEY: 'course-mate-redirect-url',
};
const clearLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
  localStorage.removeItem(LOCAL_STORAGE_KEY.REFRESH_ACCESS_TOKEN);
};

export const genericSignout = async () => {
  const refreshToken = localStorage.getItem(
    LOCAL_STORAGE_KEY.REFRESH_ACCESS_TOKEN
  )!;

  await signOutUserApi({ refreshToken }).then(() => {
    clearLocalStorage(); //clear local storage
    window.location.reload(); //reload page
  });
};
