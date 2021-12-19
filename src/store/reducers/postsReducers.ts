//Definimos los tipos de Actions, definimos la funcion del Reducer y 
import { Actions } from '../actions/index'
import { ActionType } from '../actions-types/index'
import { combineReducers } from 'redux';
import { Post } from '../../components/layout/index';



export function removePost(post: number) {
    // console.log(post)
    return {
        type: ActionType.REMOVE_POST,
        post,
    }
}


//Dispatch es la manera de poder actualizar el store
//Reducer. Inicilizamos el state siempre, en este caso con un obj de posts [] y varaible de control que nos sirve para saber si los post están vacíos o no (false) y necesita el action como parámetros obligatorios
function posts(state = { posts: [], posts_loaded: false }, action: Actions) {
    switch (action.type) {
        case ActionType.LOAD_POSTS: //Action
            return {
                ...state,
                posts: action.data,
                posts_loaded: action.posts_loaded
            };
        case ActionType.LOAD_POSTS_ERROR://Action
            return {
                ...state,
                posts: action.data,
                posts_loaded: action.posts_loaded
            };
        case ActionType.REMOVE_POST://Action
            const filtered = state.posts.filter((a: Post) => a.id !== action.post)
            return {
                posts: [...filtered],
                posts_loaded: true
            };
        default:
            return state;
    }
}
//Reducer
function users(state = { users: [], users_loaded: false }, action: Actions) {
    switch (action.type) {
        case ActionType.LOAD_USERS:
            return {
                ...state,
                users: action.data,
                users_loaded: action.users_loaded
            }
        case ActionType.LOAD_USERS_ERROR:
            return {
                ...state,
                users: action.data,
                users_loaded: action.users_loaded
            }
        default:
            return state;
    }
}
//Reducer
function comments(state = { comments: [], comments_loaded: false }, action: Actions) {
    switch (action.type) {
        case ActionType.LOAD_COMMENTS:
            return {
                ...state,
                comments: action.data,
                comments_loaded: action.comments_loaded
            }
        case ActionType.LOAD_COMMENTS_ERROR:
            return {
                ...state,
                comments: action.data,
                comments_loaded: action.comments_loaded
            }
        default:
            return state;
    }
}
//Este reducer lo creo en false para guardarlo así en el store
function login(state = { is_logged: false }, action: Actions) {
    switch (action.type) {
        case ActionType.LOGIN: //Action
            return {
                ...state,
                is_logged: action.is_logged,
            };
        case ActionType.LOGOUT://Action
            return {
                ...state,
                is_logged: false,
            };
        default:
            return state;
    }
}


export const postApp = combineReducers({
    posts: posts,
    users: users,
    comments: comments,
    login: login
});

export type RootState = ReturnType<typeof postApp>




