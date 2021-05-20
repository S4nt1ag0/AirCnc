import React, {useState, useMemo} from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../Services/api';

import './styles.css'

import camera from '../../Assets/images/camera.svg';
export default function New() {
    const history = useHistory();
    const [thumbnail, setThumbnail] = useState('')
    const [company, setCompany ] =useState('')
    const [techs, setTechs ] = useState('')
    const [price, setPrice ] = useState('')

    const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

    async function handleSubmit(event: any){
        event.preventDefault();
        if(Number(price)){
            const data = new FormData();
            const user = localStorage.getItem('user');

            data.append('thumbmail',thumbnail)
            data.append('company',company)
            data.append('techs',techs)
            data.append('price',`${price}`)

            await api.post('/spots',data,{
                headers:{user}
            });
            history.push('/dashboard');
        }else{
            alert('o preço digitado não é um numero, verifique se não colocou , no lugar do .')
        }
        }
        
       


    return(
        <form onSubmit={handleSubmit}>
            <label id="thumbnail" style={{backgroundImage:`url(${preview})`}}>
            <input
          type="file"
          onChange={(event: any) => setThumbnail(event.target.files[0])}
          className={thumbnail ? 'has-thumbnail': ''}
        />
            <img src={camera} alt="Select img" />
            </label>
            <label htmlFor="company">EMPRESA *</label>
            <input 
                id="company"
                placeholder="Sua empresa incrível"
                value={company}
                onChange={event => setCompany(event.target.value)}
            />

            <label htmlFor="techs">TECNOLOGIAS * <span>(seporadas por vírgula)</span> </label>
            <input 
                id="techs"
                placeholder="Quais tecnologias usam?"
                value={techs}
                onChange={event => setTechs(event.target.value)}
            />

            <label htmlFor="price">VALOR DA DIÁRIA * <span>(em branco pra GRATUITO)</span></label>
            <input
                id="price"
                placeholder="Valor cobrado por dia"
                value={price}
                onChange={event => setPrice(event.target.value)}
            />
            <button type="submit" className="btn">Cadastrar</button>
        </form>
    )
}