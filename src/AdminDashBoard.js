import React from 'react'
import Button from "@mui/material/Button";
import {  useHistory } from 'react-router-dom'

    


function AdminDashBoard(props) {

    const history = useHistory();
    function signout(){
        localStorage.removeItem('token');
        localStorage.removeItem('type');
        localStorage.removeItem('username');
        history.push('/users/signin')
        props.setUserSign(false)
        props.setAdminsign(false)
    }
    
    return (
        <div className='wrapper'>
           <h1>Website Under Construction....</h1>
           <Button className="m-2"  type= "submit" variant="contained" onClick={signout}>Signout</Button>
        </div>
    )
}

export default AdminDashBoard
