import React, {useState, useEffect, useMemo} from 'react';
import { Link } from 'react-router-dom'
import api from  '../../Services/api';
import io from 'socket.io-client';
import './styles.css';
import trash from '../../Assets/images/trash.svg';

export default function Dashboard() {
    const [spots, setSpots] = useState<any[]>([])
    const userid = localStorage.getItem('user');
    const [reservas,setReservas] = useState<any[]>([])

    useEffect(()=>{
        async function loadSpost(){
            const response = await api.get('/dashboardspots', {
            headers:{ user: userid }
            })
        setSpots(response.data)
        }
        loadSpost()
    },[userid]);
    
    const socket = useMemo(
    () => io(`${api.defaults.baseURL}`, { query: { user: userid } }),
    [userid],
  );

  useEffect(()=>{
      socket.on('booking_request', (data:any) =>{
          console.log(data)
      setReservas([...reservas, data])
  })
  },[reservas,socket])

  async function handleAccept(id:String) {

      await api.post(`/booking/${id}/approvals`)
      setReservas(reservas.filter(reserva => reserva._id !== id));
      
  }

  async function handleReject(id:String) {

      await api.post(`/booking/${id}/rejections`)
      setReservas(reservas.filter(reserva => reserva._id !== id));
      
  }

  async function handleDelete(id:String) {
      await api.put('/deleteSpot',{spotId:id}).then((response)=>{
          if(response.data==='ok'){
              setSpots(spots.filter(spot => spot._id !== id));
              alert('spot excluido com sucesso!')
          }else{
              alert('parece que ocorreu algum problema e não foi possivel excluir o spot, porfavor tente novamente')
          }
      })
      
      
  }
  

    return(
        <>
            <ul className="notifications">
                {reservas.map(reserva=>(
                    <li key={reserva._id}>
                    <p>
                    <strong>{reserva.user.email}</strong> está solicitando uma reserva em <strong>{reserva.spot.company}</strong> para a data : <strong>{reserva.date}</strong> 
                    </p>
                    <button className="buttonAccept" onClick={()=>handleAccept(reserva._id)}>ACEITAR</button>
                    <button className="buttonReject" onClick={()=>handleReject(reserva._id)}>REJEITAR</button>
                    </li>
                ))}
            </ul>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${api.defaults.baseURL}${spot.thumbnail_url})`}} />
                        <div className="spot-list-container-name">
                        <strong>{spot.company}</strong>
                            <button onClick={()=>{handleDelete(spot._id)}}>
                                <img src={trash} alt="delete spot" />
                            </button>
                        </div>
                        <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
                    </li>
                ))}
            </ul>

            <Link to="/new">
                <button className="btn"> Cadastro novo spot </button>
                
            </Link>
        </>
    );
}