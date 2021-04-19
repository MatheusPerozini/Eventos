import React , {useEffect, useState}from 'react'
import Hamburguer from '../menu'
import './stylesheet.css'
import {useHistory} from 'react-router-dom'
import api from '../services/api'

export default function Consulta(){
    const [incident , setIncidents] = useState([])

    const history = useHistory();
    const evento_id = localStorage.getItem('id')

    useEffect(() => {
        api.get('/ver' , {evento_id})
        .then(e => {setIncidents(e.data.data)})
    } , [evento_id])

    return(
        <div className='consulta'>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <Hamburguer/>
            <h1>Consulta de eventos</h1>
            <div id='utilidades'>
                <button>Eventos ativos</button>
                <button>Eventos passados</button>
                <form class="example">
                    <input type="text" placeholder="Pesquisar por nome , data ..." name="search"/>
                    <button type="submit"><i class="fa fa-search"></i></button>
                </form>
            </div>
            {incident.map( e =>(
            <div className='eventos_consultar'
            style={e.status_convidado ? {backgroundColor : 'green'} : {backgroundColor : 'red'}}>
            <h3>{e.nome}</h3>
            <p>{e.data}</p>
            <p>{e.horas}</p>
            <p>{e.lugar}</p>
            <p>{e.privacidade ? 'publico' : 'privado'}</p>
            <button onClick={() => history.push(`/visualizar/${e.id}`),
            localStorage.setItem("evento_click" , e.id)}>
                Clique para mais informações
                </button>
            </div> ))}
        </div>
    )
}