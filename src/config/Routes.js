//New Update of Swich, now is Routes and components are elements and inside braquets put a component sintaxis
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../views/home/Home';
import Login from '../views/login/Login';
import SignUp from '../views/signUp/SignUp';


const Routing = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
            </Routes>
        </Router>

    );
}
export default Routing
