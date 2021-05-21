import React, { useState, useContext } from 'react';
import AuthContext from '../../contexts/AuthContext'

 function Login() {
    const [email, setEmail] = useState('');
    const { signIn } = useContext(AuthContext);

    async function handleSubmit(event : any){
        event.preventDefault('');
        if(email===''){
          alert('email não preenchido, porfavor insira um email valido')
        }else{
          signIn(email);
        }
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