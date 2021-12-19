import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from "./header/Header"
import Footer from "./footer/Footer"
import Card from '../../components/Card'
import Select from './Select'
import ScrollToTop from '../ScrollToTop'
import { useDispatch, useSelector } from 'react-redux'
import { removePost } from '../../store/posts'



const Layout = () => {
    const posts_redux = useSelector(state => state.posts); //traerte lo que contenga el store de los posts (posts y posts_loaded)
    const users_redux = useSelector(state => state.users);//traerte lo que contenga el store de los users (users y users_loaded)
    const comments_redux = useSelector(state => state.comments);//traerte lo que contenga el store de los users (users y users_loaded)
    const login_redux = useSelector(state => state.login);//traerte lo que contenga el store del login
    const dispatch = useDispatch(); //llamo a la función para poder utilizarla

    const [userFilter, setUserFilter] = useState("All") //show all post 
    const colores = ["#6f4794","#b32f4e",  "#91724d", "#91a80c", "#967403", "#3b6422", "#389c94", "#c27b41", "#4543c5", "#3a3d3c"]


    useEffect(() => {
        const getPosts = async () => {
            try {
                const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
                dispatch({ // esto es lo que hace que se guarden en el store los posts
                    type: 'LOAD_POSTS',
                    data: res.data,
                    posts_loaded: true
                })
            }
            catch (error) {
                dispatch({
                    type: 'LOAD_POSTS_ERROR',
                    data: error,
                    posts_loaded: false
                })
            }
        }
        const getUsers = async () => {
            try {
                const res = await axios.get(`https://jsonplaceholder.typicode.com/users`)
                res.data.forEach(function (user, index) {
                    user.color = colores[index]
                })
                dispatch({// esto es lo que hace que se guarden en el store los users
                    type: 'LOAD_USERS',
                    data: res.data,
                    users_loaded: true
                })
            }
            catch (error) {
                dispatch({
                    type: 'LOAD_USERS_ERROR',
                    data: error,
                    users_loaded: false
                })
            }
        }
        const getComments = async () => {
            try {
                const res = await axios.get(`https://jsonplaceholder.typicode.com/comments`)
                res.data.forEach(function (comments, index) {
                    comments.postid = posts_redux.posts[index]
                })
                dispatch({// esto es lo que hace que se guarden en el store los comentarios
                    type: 'LOAD_COMMENTS',
                    data: res.data,
                    comments_loaded: true
                })
            }
            catch (error) {
                dispatch({
                    type: 'LOAD_COMMENTS_ERROR',
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

    const deletePost = (postid) => {
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
                    <Select userfilter={userFilter} setuserfilter={setUserFilter} datausers={users_redux.users} />
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
                            posts_redux.posts.map((item => {
                                const user = users_redux.users.filter(user => user.id === item.userId)[0]
                                // eslint-disable-next-line
                                const comments = comments_redux.comments.filter(comment => comment.postId == item.id)

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
                            posts_redux.posts.filter(post => post.userId == userFilter).map((item => {
                                const user = users_redux.users.filter(user => user.id === item.userId)[0]
                                // eslint-disable-next-line
                                const comments = comments_redux.comments.filter(comment => comment.postId == item.id)

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
