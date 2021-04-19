import React , {useEffect , useState} from 'react'
import {useHistory} from 'react-router-dom'
import api from '../services/api'
import voltar from '../voltar.png'
import './stylesheet.css'

export default function Lista(){
    const history = useHistory();
    
    const idEvento = localStorage.getItem('evento_click');
    const [users , setusers] = useState([]);
    const [todos , settodos] = useState([]);
    const [visible , setvisible] = useState(false);
    const [color , setColor] = useState(false);

    const visibility = {
        transform : visible ? 'translate : (101%)' : 'translate : (0%)'
    }
    
    useEffect(() => {
        api.get(`/convidados/${idEvento}`).then(resp => setusers(resp.data.lista))
    } , [idEvento])

    useEffect(() => {
        api.get('/users').then(resp => settodos(resp.data.data[0]))
        settodos(todos.filter(e => e.id != users.id_usuario[0]));
    },[todos , users])

    return(
        <div className='editar_convidados'>
            <button id='voltar' onClick={() => history.goBack()}><img src={voltar}/></button>
            <button onClick={() => setvisible(!visible)}>Adicionar convidados</button>
            <div className='usuarios' style={visibility}>
                <button id='voltar_back' onClick={() => {setvisible(!visible);
                localStorage.removeItem('evento_click')}}>Voltar à lista</button>
                {todos.map(e => {
                    <div className='oUsuario' style={color ? {backgroundColor : 'green'} : {backgroundColor : 'red'}}>
                        <p>{e.nome}</p>
                        <button className='adicionar' 
                        onClick={() => {setusers(users.push(e.id)); 
                            api.post(`/refresh/${idEvento}` , e.id);
                            setColor(!color)}
                        }>Adicionar a lista</button>
                    </div>
                })}
            </div>
            <div className='lista'>
            {users.map(e =>(
                    //alterar o ngc para buscar nome ,pq o resto ja ta suave
                    <div className='dados' style={e.status_convidado ? 
                    {backgroundColor : 'green'} : {backgroundColor : 'red'}}>
                        <p>{e.itens}</p>
                        <p>{api.get('/dados' , {id : e.id_usuario}).then(resp => resp.data.dados[0].nome)}</p>
                        <button className='excluir' onClick={() => 
                        {setusers(users.splice(users.indexOf(e.id_usuario) , 1));
                        api.post(`/refresh/${idEvento}`,users)}}>Excluir convidado</button>
                    </div>
                ))}
        </div>
    </div>
)
/*
NÃO ESQUECE DE BOTAR O NOME DAS CLASSES E DIVS  
{todos.map(e => {
                    <div className='oUsuario'>
                        <p>{e.nome}</p>
                        <button className='adicionar' onClick={() => setusers(users.push(e.id))}>Adicionar a lista</button>
                    </div>
                })}

                {users.map(e =>{
                    //alterar o ngc para buscar nome ,pq o resto ja ta suave
                    <div className='dados' style={e.status ? 
                    {backgroundColor : 'green'} : {backgroundColor : 'red'}}>
                        <p>{e.itens}</p>
                        <p>{api.get('/dados' , {id : e.id_usuario}).then(resp => resp.data.nome)}</p>
                        <button className='excluir' onClick={() => 
                        {setusers(users.splice(users.indexOf(e.id_usuario) , 1));
                        api.post(`/refresh/${idEvento}`,users)}}>Excluir convidado</button>
                    </div>
                })}
            */}