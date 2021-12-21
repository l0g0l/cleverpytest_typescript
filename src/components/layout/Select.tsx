import { ChangeEvent } from 'react';
import { Link } from 'react-router-dom'
import { User } from './index';



interface props {
    setuserfilter: Function
    datausers: []
}


const Select = ({ setuserfilter, datausers }: props) => {

    const handleChange = ({ target }: ChangeEvent<HTMLSelectElement>) => {
        const { value } = target

        setuserfilter(value)
    }

    //doing this .map of datausers show in the each option the name of de user
    return (
        <>
            <div className="container-label">
                <p className="label-txt1">You can filter the posts by selecting the publisher on the drop down</p>
            </div>
            <div className="select">
                <select name="users" id="users" onChange={handleChange}>
                    <option value="All" className="option1">All</option>
                    {datausers.map(((item: User) => {
                        return (
                            <option style={{ color: item.color }} value={item.id} key={item.id}>{item.name}</option>
                        )
                    }))}
                </select>
            </div>
            <p className="label-txt2">Don't you like a post? to delete it <Link to="/login" className="link-login">Login</Link></p>

        </>
    )
}

export default Select
