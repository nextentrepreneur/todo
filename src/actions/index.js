import { GET_LISTS, ADD_LIST, REMOVE_LIST } from './types';
import db from "../Config/firebase";
/**
 * ACTION CREATORS
 */

 export const addList = (list) => ({ type: ADD_LIST, list});
 export const removeList = (list) => ({ type: REMOVE_LIST, list});
 export const getLists = (lists) => ({ type: GET_LISTS, lists});

 /**
  * THUNKS
  */

  export function getListsThunk() {
      return dispatch => {
          const lists = [];
          db.once('value', snap => {
              snap.forEach(data => {
                  let id = data.key;
                  let listContent = data.val().listContent;
                  lists.push({ id : id, listContent : listContent});
                 // console.log(lists);
              })
          })
          .then(() => dispatch(getLists(lists)))
      };
  }

  /**
   * LISTENERS
   */

   export function watchListADDEvent(dispatch) {
       db.on('child_added', (snap) => {
           dispatch(addList({ id: snap.key, listContent: snap.val().listContent}));
       });
   }

   export function watchListRemoveEvent(dispatch) {
       db.on('child_removed', (snap) => {
           dispatch(removeList({ id: snap.key, listContent : snap.val().listContent}))
       });
   }

  