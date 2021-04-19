import React ,{useState , useEffect} from 'react'
import api from '../services/api'
import './stylesheet.css'

export default function Teste(){
    const [user , setuser] = useState([]);

    useEffect(() => {
        api.get('/users').then(resp => setuser(resp.data.data))
    })

    return(
        <div className='teste'>
            <p>here it is</p>
            {user.map(e => (
                <div>
                    <p>{e.id}</p>
                    <p>foi pora </p>
                </div>
            ))}
        </div>
    )
}