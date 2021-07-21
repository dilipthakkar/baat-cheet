import {createSelector} from "reselect"
const conversation = state=>state.conversation ; 

export const loadingSelector = createSelector(
    conversation,
    data=>data.loading
); 


export const messageSelector = createSelector(
    conversation,
    data=>data.message
); 


export const errorSelector = createSelector(
    conversation,
    data=>data.error
); 

export const allConversationSelector = createSelector(
    conversation,
    data=>data.list
); 


export const nowConersationSelector = createSelector(
    conversation,
    data=>data.conversation
); 