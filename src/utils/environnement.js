export const isBrowser = () => typeof window !== 'undefined';

export const isLocation = (location) => isBrowser() && window.location.pathname.includes(location);

export const runInBrowser = (callback) => isBrowser() && callback();

export const accessInBrowser = (access) => isBrowser() && access;
