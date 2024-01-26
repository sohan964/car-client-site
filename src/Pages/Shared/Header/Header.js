import React, { useContext } from 'react';
import logo from '../../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
const Header = () => {

    const {user, logOut} = useContext(AuthContext);
    const handleLogOut =() =>{
        logOut()
        .then(()=>{

        })
        .catch(error => console.error(error));
    }


    const menuItems = <>
        <li className='font-semibold'><Link to="/">Home</Link></li>
        {   
            user?.uid?
            <>
            <li><Link to='/orders'>Orders</Link></li>
            <li className='font-semibold'><button onClick={handleLogOut}>LogOut</button></li>
            </>
            :
            <>
            <li className='font-semibold'><Link to="/login">Login</Link></li>
            <li className='font-semibold'><Link to="/signup">Sign Up</Link></li>
            </>
        }
        
    </>

    return (
        <div className="navbar h-20 pt-12 mb-12 bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl">
                    <img src={logo} alt="" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {menuItems}
                </ul>
            </div>
            <div className="navbar-end">
                <button className="btn btn-warning">Appointment</button>
            </div>
        </div>
    );
};

export default Header;