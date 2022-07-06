import { useState } from 'react';
import './Login.css';

function Login() {
    const [state, setState] = useState({
        username: "",
        password: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(state.email, state.password)
        // TODO add in a call to the login api
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