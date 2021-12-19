import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from "./header/Header"
import Footer from "./footer/Footer"
import Card from '../Card'
import Select from './Select'
import ScrollToTop from '../ScrollToTop'
import { useDispatch, useSelector } from 'react-redux'
import { removePost } from '../../store/reducers/postsReducers';
import { ActionType } from '../../store/actions-types/index'
import { RootState } from '../../store/reducers/postsReducers';
import { User, Comment, Post, Redux_Posts, Redux_Users, Redux_Comments, Redux_Login } from './index';



const Layout = () => {
    const posts_redux: Redux_Posts = useSelector((state: RootState) => state.posts); //traerte lo que contenga el store de los posts (posts y posts_loaded)
    const users_redux: Redux_Users = useSelector((state: RootState) => state.users);//traerte lo que contenga el store de los users (users y users_loaded)
    const comments_redux: Redux_Comments = useSelector((state: RootState) => state.comments);//traerte lo que contenga el store de los users (users y users_loaded)
    const login_redux: Redux_Login = useSelector((state: RootState) => state.login);//traerte lo que contenga el store del login
    const dispatch = useDispatch(); //llamo a la función para poder utilizarla

    const colores = ["#6f4794", "#b32f4e", "#91724d", "#91a80c", "#967403", "#3b6422", "#389c94", "#c27b41", "#4543c5", "#3a3d3c"]

    const [userFilter, setUserFilter] = useState<String | Number>("All") //show all post 


    useEffect(() => {
        const getPosts = async () => {
            try {
                const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
                dispatch({ // esto es lo que hace que se guarden en el store los posts
                    type: ActionType.LOAD_POSTS,
                    data: res.data,
                    posts_loaded: true
                })
            }
            catch (error) {
                dispatch({
                    type: ActionType.LOAD_POSTS_ERROR,
                    data: error,
                    posts_loaded: false
                })
            }
        }
        const getUsers = async () => {
            try {
                const res = await axios.get(`https://jsonplaceholder.typicode.com/users`)
                res.data.forEach(function (user: User, index: number) {
                    user.color = colores[index]
                })
                dispatch({// esto es lo que hace que se guarden en el store los users
                    type: ActionType.LOAD_USERS,
                    data: res.data,
                    users_loaded: true
                })
            }
            catch (error) {
                dispatch({
                    type: ActionType.LOAD_USERS_ERROR,
                    data: error,
                    users_loaded: false
                })
            }
        }
        const getComments = async () => {
            try {
                const res = await axios.get(`https://jsonplaceholder.typicode.com/comments`)

                dispatch({// esto es lo que hace que se guarden en el store los comentarios
                    type: ActionType.LOAD_COMMENTS,
                    data: res.data,
                    comments_loaded: true
                })
            }
            catch (error) {
                dispatch({
                    type: ActionType.LOAD_COMMENTS_ERROR,
                    data: error,
                    comments_loaded: false
                })
            }
        }
        getPosts()
        getUsers()
        getComments()
        // eslint-disable-next-line
    }, [dispatch])

    const deletePost = (postid: number) => {
        console.log(postid)
        dispatch(removePost(postid)) //importo la función removePost del post.js y la paso por parámetro al dispatch, esto es otra forma de componer el action para pasarselo al dispatch
        console.log(posts_redux)
    }

    return (
        <>
            <header>
                <Header />
            </header>

            <main>
                <ScrollToTop />
                {users_redux.users_loaded
                    ?
                    <Select setuserfilter={setUserFilter} datausers={users_redux.users} />
                    :
                    <div>Loading users</div>
                }
                {/*posts it's an array, I iterate it and I paint as many cards as there are posts. */}
                <div className="container-cards">
                    {posts_redux.posts_loaded && users_redux.users_loaded && comments_redux.comments_loaded
                        ?
                        // eslint-disable-next-line
                        userFilter == "All"
                            ?
                            posts_redux.posts.map(((item: Post) => {
                                const user = users_redux.users.filter((user: User) => user.id === item.userId)[0]
                                // eslint-disable-next-line
                                const comments: Array<Comment> = comments_redux.comments.filter((comment: Comment) => comment.postId == item.id)

                                return (
                                    <div className="cards" key={item.id}>
                                        <Card
                                            dataposts={item}
                                            delete_post={deletePost}
                                            datausers={user}
                                            datacomments={comments}
                                            islogged={login_redux.is_logged} />
                                    </div>
                                )
                            }))
                            :
                            // eslint-disable-next-line
                            posts_redux.posts.filter((post: Post) => post.userId == userFilter).map(((item: Post) => {
                                const user = users_redux.users.filter((user: User) => user.id === item.userId)[0]
                                // eslint-disable-next-line
                                const comments = comments_redux.comments.filter((comment: Comment) => comment.postId == item.id)

                                return (
                                    <div className="cards" key={item.id}>
                                        <Card
                                            dataposts={item}
                                            delete_post={deletePost}
                                            datausers={user}
                                            datacomments={comments}
                                            islogged={login_redux.is_logged} />
                                    </div>
                                )
                            }))
                        :
                        <div>Loading</div>
                    }
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Layout
