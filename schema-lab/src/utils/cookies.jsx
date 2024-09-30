import Cookies from 'js-cookie';

// Function to set a cookie
export const setLoginCookie = (token, days) => {
    const expiration = process.env.EXPIRE_COOKIE_IN_DAYS
    Cookies.set('authToken', token, { expires: parseInt(expiration, 1), path: '/' });
};

export const getCookie = () => {
    const token = Cookies.get('authToken');
    return token;
};

export const rmCookie = () => {
    Cookies.remove('authToken');
};