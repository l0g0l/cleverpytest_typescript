import {ActionType} from '../actions-types/index'

interface Load_Posts {
    type:ActionType.LOAD_POSTS
    data:string
    posts_loaded:string
}
interface Remove_Posts {
    type:ActionType.REMOVE_POST
    post:number
  
}
interface  Load_Post_Error {
    type:ActionType.LOAD_POSTS_ERROR
    data:string
    posts_loaded:string
}
interface  Load_Users {
    type:ActionType.LOAD_USERS
    data:string
    users_loaded:string
}
interface  Load_Users_Error {
    type:ActionType.LOAD_USERS_ERROR
    data:string
    users_loaded:string
}
interface  Load_Comments {
    type:ActionType.LOAD_COMMENTS
    data:string
    comments_loaded:string
}
interface  Load_Comments_Errors {
    type:ActionType.LOAD_COMMENTS_ERROR
    data:string
    comments_loaded:string
}
interface Login {
    type:ActionType.LOGIN
    is_logged:boolean
}
interface Logout {
    type:ActionType.LOGOUT
}

export type Actions = Load_Posts | Remove_Posts | Load_Post_Error | Load_Users | Load_Users_Error  | Load_Comments | Load_Comments_Errors | Login | Logout