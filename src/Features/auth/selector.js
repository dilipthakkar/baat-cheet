import { createSelector } from "reselect";
const auth = (state) => state.auth;

export const loadingSelector = createSelector(auth, (data) => data.loading);

export const isSignupSelector = createSelector(auth, (data) => data.isSignup);

export const isLoginSelector = createSelector(auth, (data) => data.isLogin);

export const messageSelector = createSelector(auth, (data) => data.message);

export const errorSelector = createSelector(auth, (data) => data.error);

export const userSelector = createSelector(auth, (data) => data.user);
