/* eslint-disable no-undef */
// eslint-disable-next-line max-len
export const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const ApiEndpoint = process.env.GATSBY_API_ENDPOINT as string;

export const GoogleClientId = process.env.GATSBY_GOOGLE_LOGIN_CLIENT_ID as string;

export const AccessToken = process.env.GATSBY_ACCESS_TOKEN as string;
