import { GET_LISTS, ADD_LIST, REMOVE_LIST } from '../actions/types';

const initialState = []
 function Reducer(state = initialState, action){
     switch(action.type){
        case GET_LISTS:
            return action.lists
        case ADD_LIST:
            return [...state, action.list]
        case REMOVE_LIST:
            return state.filter(list => list.id !== action.list.id)
        default:
            return state
     }
 }

 export default Reducer;