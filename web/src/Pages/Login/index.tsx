import React, { useState } from 'react';
import api from '../../Services/api';
import { useHistory } from 'react-router-dom'

 function Login() {
     const history = useHistory();
    const [email, setEmail] = useState('');

    async function handleSubmit(event : any){
        event.preventDefault('');
        const response = await api.post('/login',{email});
        const {_id} = response.data;
        console.log(_id)
        localStorage.setItem('user', _id );
        history.push('/dashboard');
    }


    return(
        <>
          <p>
            Oferça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
          </p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">E-mail*:</label>
            <input 
            type="email"
            id="email"
            placeholder="digite seu melhor email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            />
            
            <button type="submit" className="btn">Entrar</button>
          </form>
        </>
    );
}
export default Login;