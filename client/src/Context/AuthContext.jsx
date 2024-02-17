import {useState,useEffect, useContext,createContext} from 'react';
// import axios from 'axios';
const AuthContext=createContext();

//eslint-disable-next-line
const AuthProvider=({children})=>{
    const [auth,setAuth]=useState({
        user:null,
        token:"",
    });

    // //eslint-disable-next-line
    // axios.defaults.headers.common["Authorization"] = auth?.token;
    useEffect(()=>{
        const data=localStorage.getItem('auth');
        if(data){           
            const parseData=JSON.parse(data);           
            setAuth({
                ...auth,
                user:parseData.user,
                token:parseData.token,
            })
        }
        //default axios
    },[]);
    return(
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

//CUSTOM HOOK
const useAuth=()=>useContext(AuthContext);

export {useAuth,AuthProvider}