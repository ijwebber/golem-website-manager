import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { login } from '../../utils/Login';
import './Login.css';

function Login() {
    const [state, setState] = useState({
        username: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(state.username, state.password).then((res) => {
            if (res.success) {
                navigate(0);
            } else {
                console.log(res.errors)
            }
        })
    }

    const handleChange = (e) => { // Update the state with any change in the input
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        })
    }

    return (
        <div className='Login'>
            <h1>LOGIN</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>USERNAME</label>
                    <input type="username" name="username" onChange={handleChange} required />
                </div>
                <div className="input-container">
                    <label>PASSWORD</label>
                    <input type="password" name="password" onChange={handleChange}required />
                </div>
                <div className="button-container">
                    <button type="submit">SUBMIT</button>
                </div>
            </form>
        </div>
    );
}

export default Login;