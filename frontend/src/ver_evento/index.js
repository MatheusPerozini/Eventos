import React , {useEffect , useState} from 'react'
import './stylesheet.css'
import api from '../services/api'
import {useHistory} from 'react-router-dom'
import Hamburguer from '../menu'

export default function Ver_evento(){
  const id = localStorage.getItem("evento_click");
  const id_user = localStorage.getItem('id')

  const [convidados , setConvidados] = useState([]);
  const [status , setStatus] = useState([]);

  const history = useHistory();
  
  useEffect(() => {
    api.get('/convidados' , {
      params : {
        id : id
      }
    }).then(resp => setConvidados(resp.data.lista))
  } , [id])

  const resp = api.get(`/information/${id}`);
  const user = api.get('/dados' , {id : id_user})

  try{
    api.post(`/check/${id}` , {
        headers : {
            authorization : id_user
        }
    })
    var autorizado = true;
  }catch(err){
    var autorizado = false;
  }

  async function definirStatus(e){
    setStatus(!status);
    try{
      await api.post(`/alterar/${id}` , {id : id_user , status})
    }catch(err){
      alert('Tente novamente')
    }
  }
//excluir evento né
  async function handledelete(e){
    try{
        await api.delete(`/evento/${e}`,{
          headers : {
            authorization : id_user
          }
        })
        localStorage.removeItem("evento_click")
        alert('foi krlll')
    }catch(err){
        alert('foi não')
    }
}

    return(
        <div className="criar_evento">
        <Hamburguer />
        <h1>
        <p id='nome_evento'>{resp.data.dados[0].nome}</p>
      </h1>
      {autorizado ? (
      <div>
      <button id='excluir' onClick={() => {handledelete(id);
      localStorage.removeItem("evento_click")
      history.push('/consulta');}
      }>Excluir evento</button>
      </div>) : ''}
      <p id='aaaa'>organizador : <p>{user.data.data[0].nome}</p></p>
      <p>local : <p>{resp.data.dados[0].lugar}</p></p>
      <p>data : <p>{resp.data.dados[0].data}</p></p>
      <p>horas : <p>{resp.data.dados[0].horas}</p></p>
      <p>público</p>
      <label class="switch">
      <input type="checkbox" defaultChecked={resp.data.dados[0].privacidade} />
      <span class="slider"></span>
      </label>
      <p>privado</p>
      <p id='descricao'>{resp.data.dados[0].descricao}</p>
      <p>Status do evento : </p>
      <p> confirmado</p>
      <label class="switch">
      <input type="checkbox" defaultChecked={resp.data.dados[0].status} />
      <span class="slider"></span>
      </label>
      <p> não ocorrera</p>
      <p>Lista de convidados :</p>
      {convidados.map(e => 
        (<div id='convidados'>
          <button id='descricao_convidado'>
          <p >{api.get('/dados' , e.id_usuario).then(resp => resp.data.data[0].nome)}</p>
          <div>
            <p >{e.itens}</p>
          </div>
          </button>
      </div>))}
      {autorizado ?
      (<div>
      <p>confirmar presença</p>
      <label class="switch">
      <input type="checkbox" onClick={() => definirStatus} defaultChecked={status}/>
      <span class="slider"></span>
      </label>
      <p>Não confirmar presença</p>
      </div>) : ''}
        {autorizado ?
          (<button id='botao_criar_evento' onClick={() => {history.push('/criar_evento')}}>Editar evento</button>) : ''}
    </div>
    )
}