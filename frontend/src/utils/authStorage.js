const ACCESS = 'portfolio_jwt_access';
const REFRESH = 'portfolio_jwt_refresh';

export function setTokens(access, refresh) {
    if (access) localStorage.setItem(ACCESS, access);
    if (refresh) localStorage.setItem(REFRESH, refresh);
}

export function getAccessToken() {
    return localStorage.getItem(ACCESS);
}

export function getRefreshToken() {
    return localStorage.getItem(REFRESH);
}

export function clearTokens() {
    localStorage.removeItem(ACCESS);
    localStorage.removeItem(REFRESH);
}

export function isLoggedIn() {
    return Boolean(getAccessToken());
}
