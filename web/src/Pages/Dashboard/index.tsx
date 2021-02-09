import React, {useState, useEffect, useMemo} from 'react';
import { Link } from 'react-router-dom'
import api from  '../../Services/api';
import io from 'socket.io-client';
import './styles.css'
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

  

    return(
        <>
            <ul className="notifications">
                {reservas.map(reserva=>(
                    <li key={reserva._id}>
                    <p>
                    <strong>{reserva.user.email}</strong> está solicitando uma reserva em <strong>{reserva.spot.company}</strong> para a data : <strong>{reserva.date}</strong> 
                    </p>
                    <button onClick={()=>handleAccept(reserva._id)}>ACEITAR</button>
                    <button onClick={()=>handleReject(reserva._id)}>REJEITAR</button>
                    </li>
                ))}
            </ul>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${api.defaults.baseURL}${spot.thumbnail_url})`}} />
                        <strong>{spot.company}</strong>
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