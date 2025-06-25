export const isTokenExpired = (token: string): boolean => {
  try {
    const [, payloadBase64] = token.split(".");
    const payload = JSON.parse(atob(payloadBase64));
    const now = Date.now() / 1000;
    return payload.exp && payload.exp < now;
  } catch (e) {
    return true;
  }
};
