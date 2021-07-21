import { createSelector } from "reselect";
const common = (state) => state.common;

export const messageSelector = createSelector(common, (data) => data.message);

export const errorSelector = createSelector(common, (data) => data.error);
