//Definimos los tipos de Actions, definimos la funcion del Reducer y 
import { combineReducers } from 'redux';
const REMOVE_POST = 'REMOVE_POST';
const LOAD_POSTS = 'LOAD_POSTS'
const LOAD_POSTS_ERROR = 'LOAD_POSTS_ERROR'
const LOAD_USERS = 'LOAD_USERS'
const LOAD_USERS_ERROR = 'LOAD_USERS_ERROR'
const LOAD_COMMENTS = 'LOAD_COMMENTS'
const LOAD_COMMENTS_ERROR = 'LOAD_COMMENTS_ERROR'
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'


export function removePost(post) {
    console.log(post)
    return {
        type: REMOVE_POST,
        post,
    }
}
//Dispatch es la manera de poder actualizar el store
//Reducer. Inicilizamos el state siempre, en este caso con un obj de posts [] y varaible de control que nos sirve para saber si los post están vacíos o no (false) y necesita el action como parámetros obligatorios
function posts(state = { posts: [], posts_loaded: false }, action) {
    switch (action.type) {
        case LOAD_POSTS: //Action
            return {
                ...state,
                posts: action.data,
                posts_loaded: action.posts_loaded
            };
        case LOAD_POSTS_ERROR://Action
            return {
                ...state,
                posts: action.data,
                posts_loaded: action.posts_loaded
            };
        case REMOVE_POST://Action
            const filtered = state.posts.filter(a => a.id !== action.post)
            return {
                posts: [...filtered],
                posts_loaded: true
            };
        default:
            return state;
    }
}
//Reducer
function users(state = { users: [], users_loaded: false }, action) {
    switch (action.type) {
        case LOAD_USERS:
            return {
                ...state,
                users: action.data,
                users_loaded: action.users_loaded
            }
        case LOAD_USERS_ERROR:
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
function comments(state = { comments: [], comments_loaded: false }, action) {
    switch (action.type) {
        case LOAD_COMMENTS:
            return {
                ...state,
                comments: action.data,
                comments_loaded: action.comments_loaded
            }
        case LOAD_COMMENTS_ERROR:
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
function login(state = { is_logged: false }, action) {
    switch (action.type) {
        case LOGIN: //Action
            return {
                ...state,
                is_logged: action.is_logged,
            };
        case LOGOUT://Action
            return {
                ...state,
                is_logged: false,
            };
        default:
            return state;
    }
}

// Funcion que permite combinar distintas funciones de Reducer para manejar distintos tipos de datos dentro del store
const postApp = combineReducers({
    posts: posts,
    users: users,
    comments: comments,
    login: login
});

export default postApp;