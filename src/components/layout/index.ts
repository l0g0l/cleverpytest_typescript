interface User {
    color:string
    id:number
    name:string
    email:string 
    phone:number 
    website:string

}
interface Post {
    userId:number
    id:number
    title:string 
    body:string

}
interface Comment {
    postId:number
    id:number 
    name:string 
    body:string
}
interface Redux_Posts {
    posts:[]
    posts_loaded:boolean
}
interface Redux_Users {
    users:[]
    users_loaded:boolean

}

interface Redux_Comments {
    comments:[]
    comments_loaded:boolean
}

interface Redux_Login {
   
    is_logged:boolean
}



export type {
    User,
    Comment,
    Post,
    Redux_Posts,
    Redux_Users,
    Redux_Comments,  
    Redux_Login
}