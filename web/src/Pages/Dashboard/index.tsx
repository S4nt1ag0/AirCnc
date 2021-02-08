import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import api from  '../../Services/api';
import './styles.css'
export default function Dashboard() {
    useEffect(()=>{
        const id = localStorage.getItem('user');
        async function loadSpost(){
            const response = await api.get('/dashboardspots', {
            headers:{ user: id }
            })
        setSpots(response.data)
        }
        loadSpost()
    },[]);

    const [spots, setSpots] = useState<any[]>([])

    return(
        <>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})`}} />
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