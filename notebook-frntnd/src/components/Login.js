import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"", password:""})
    let navigate = useNavigate();
    const host = "https://ruyaqr.deta.dev"
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            //   "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjYmM2MzJhZTI2MDE5ODA3Mjc4YWRjIn0sImlhdCI6MTY1NzU1NjY0NX0.7vSXMTn4HzY8X059oTJhF8waxQ2y2PhWgyiCFL_RBcQ'
      
            },
            body: JSON.stringify({email:credentials.email, password:credentials.password})
        });
        const json = await response.json()
        console.log(json)
        if(json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            props.showAlert("LoggedIn Successfully", "success")
            navigate("/")
        }
        else
        {
            // alert("Invalid")
            props.showAlert("Invalid", "danger")
        }
    }

    const onChange = (e)=>{
        setCredentials({ ...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div className='mt-2'>
            <h2 className='my-2'>Login to add your notes</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={credentials.email} onChange={onChange}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login