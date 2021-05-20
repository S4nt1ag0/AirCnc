import React, { useState } from 'react';
import api from '../../Services/api';
import { useHistory } from 'react-router-dom'

 function Login() {
     const history = useHistory();
    const [email, setEmail] = useState('');

    async function handleSubmit(event : any){
        event.preventDefault('');
        if(email===''){
          alert('email não preenchido, porfavor insira um email valido')
        }else{
          api.post('/login',{email}).then((response)=>{
          localStorage.setItem('user', response.data._id );
          history.push('/dashboard');
          }).catch((err)=>{
            alert('parece que o servidor está offline no momento :/ , tente novamente mais tarde')
          });
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