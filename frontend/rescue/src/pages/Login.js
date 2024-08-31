import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom'


function Login() {
    // const [users, setUsers] = useState([])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, [])

    const fetchUsers = () => {
        axios
        .get('http://localhost:3001/register')
        .then((res) => {
            console.log(res.data)
        })
    }


    const handleLogin =  async (event) => {
        event.preventDefault();
        try {
            const response = await axios
            .post('http://localhost:3001/login', { email, password })
            const token = response.data.token
            alert('Login successful')
            setEmail('')
            setPassword('')
            fetchUsers();
            navigate('/home')
            window.location.reload();
            localStorage.setItem('token', token)
        } catch (error) {
            console.log('Login Error', error)
        }
    }


  return (
    <div>
         <div >
            <form 
            onSubmit={handleLogin}
            >
                 {/*Username Input */}
                 <label>Email</label>
                <br />
                <input 
                type='text'
                placeholder='email'
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
                type='submit'>Login</button>
                <p className='text-center mt-3'>You agree to our terms and policies.</p>
                    <Link
                        to="/signup"
                        style={{ borderColor: '#fbc02d', color: '#333', fontWeight: 'bold', transition: 'background-color 0.3s ease, color 0.3s ease' }}
                    >
                        Create Account
                    </Link>
            </form>
        </div>
        
    </div>
  )
}

export default Login