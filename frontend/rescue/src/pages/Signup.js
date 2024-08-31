import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
// import { set } from 'mongoose'

function SignUp() {
    // const [users, setUsers] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();


    useEffect(() => {
        fetchUsers();
    }, [])

    const fetchUsers = () => {
        axios
        .get('http://localhost:3001/signup')
        .then((res) => {
            // console.log(res.data)
        })
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        axios
        .post('http://localhost:3001/signup', { name, email, password })
        .then(() => {
            alert('Registration Successful')
            setName('')
            setEmail('')
            setPassword('')
            fetchUsers();
            navigate('/login')
        })
        .catch((error) => {
            console.log('Unable to register user')
        })

    }

  return (
    <div>
        <div>
            <form 
            onSubmit={handleSubmit}>
                {/* Email Input */}
                <label>Name</label>
                <br />
                <input
                type='text'
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)} />
                <br />
                <br />
                 {/*Username Input */}
                 <label>Email</label>
                <br />
                <input
                type='text'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
                <br />
                <br />
                 {/* Password Input */}
                 <label>Password</label>
                <br />
                <input 
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
                <br />
                <br />
                {/* Button */}
                <button
                type='submit'>Sign Up</button>
                <p>You agree to our terms and policies.</p>
                    <Link
                        to="/login"
                        style={{ borderColor: '#fbc02d', color: '#333', fontWeight: 'bold', transition: 'background-color 0.3s ease, color 0.3s ease' }}
                    >   
                        Login
                    </Link>
            </form>
        </div>
    </div>
  )
}

export default SignUp