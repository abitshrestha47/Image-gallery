/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Navbar = ({showSearchBar}) => {
    const SearchInput = styled.input`
    padding: 8px;
    margin-left: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 200px;
    `;
    const [login, setLogin] = useState(false);

    const navigate=useNavigate();
    const searchHandle=async (e)=>{
        if(e.key==='Enter' && e.target.value.trim()!==''){
          try {
            const tags=e.target.value.toLowerCase();
            navigate(`/search/${encodeURIComponent(tags)}`); 
          } catch (error) {
            console.log(error);
          }
        }
      }

    const handleLogout = () => {
        localStorage.removeItem('auth');
        window.location.href = '/';
    }
    useEffect(() => {
        async function validateUser() {
            try {
                const storedToken = localStorage.getItem('auth');
                const headers = {};
                if (storedToken) {
                    const parsedToken = JSON.parse(storedToken);
                    headers.Authorization = `Bearer ${parsedToken.token}`;
                }

                const response = await axios.get(`http://localhost:8000/user-auth`, { headers });
                if (response.data.message === "rquires JWT") {
                    setLogin(false);
                } else if (response.data.message === 'jwt expired') {
                    setLogin(false);
                }
                else if (response.data.message === 'invalid token') {
                    setLogin(false);
                }
                else {
                    setLogin(true);
                }
            } catch (error) {
                console.log(error);
            }
        }
        validateUser();
    }, []);

    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <img src="../src/assets/images/picasa.png" className="logo" />
                    <a className="navbar-brand" href="#">Pixtures</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    {showSearchBar && <SearchInput  type='search' placeholder='enter your search . . .' className='ms-4' onKeyDown={searchHandle}/>}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to='/' className="nav-link" aria-disabled="true">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/upload' className="nav-link" aria-disabled="true">Upload</NavLink>
                            </li>
                            <li className="nav-item">
                                {login ? <NavLink className="nav-link nav-logout" onClick={handleLogout}>Logout</NavLink>
                                    : <NavLink to='/login' className="nav-link">Login</NavLink>}
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            {login ? <NavLink to='/profile' className="btn join btn-outline-success">Profile</NavLink> : <NavLink to='/signup' className="btn join btn-outline-success">Join</NavLink>}
                        </form>

                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar