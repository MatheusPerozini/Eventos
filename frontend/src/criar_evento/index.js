import React, {useEffect , useState} from 'react'
import './stylesheet.css'
import Hamburguer from '../menu'
import {useHistory} from 'react-router-dom'
import api from '../services/api'

export default async function Criar_evento(){
  const idEvento = localStorage.getItem("evento_click");
  const id = localStorage.getItem('id')
  const history = useHistory();

    const [nome , setNome] = useState('');
    const [descricao , setdescricao] = useState('');
    const [data , setdata] = useState('');
    const [lugar , setlugar] = useState('');
    const [status , setstatus] = useState(false);
    const [privacidade , setprivacidade] = useState(false);
    const [horas , setHoras] = useState('');
    const [convidados , setConvidados] = useState([]);


  //fazer uma função para quando foi enviar os dados
  //async function Createevente(e){ e.preventDefault(); e bota o resto}
  async function CreateEvent(e){
    e.preventDefault();

    const dados = {
      nome,
      descricao,
      data,
      lugar,
      status,
      horas,
      privacidade
    };

    try {
      await api.post('/evento' , dados ,{
        headers : {
          authorization : id
        }
      })

      alert('Evento criado com sucesso')
    }catch (error) {
      alert('Tente novamente')
    }

  }
    
    //lista os convidados , fazer no use effect
    useEffect(() => {api.get('/convidados' , {
      params : {
        id : idEvento
      }
    }).then(response => setConvidados(response.data.lista))})
  
      return(
      <div className="criar_evento">
          <Hamburguer />
          <h1>
          <input id='nome_evento' type='text' onChange={e => setNome(e.target.value)}
          placeholder='clique para alterar o nome do evento' maxLength='45'/>
        </h1>
        <p id='aaaa'>organizador : <input type='text'/></p>
        <p>local : <input type='text' onChange={e => setlugar(e.target.value)}/></p>
        <p>data : <input type='date' onChange={e => setdata(e.target.value)}/></p>
        <p>horas : <input type='time' onChange={e => setHoras(e.target.value)}/></p>
        <p>público</p>
        <label class="switch">
        <input type="checkbox" onClick={() => setprivacidade(!privacidade)} defaultChecked={privacidade}/>
        <span class="slider"></span>
        </label>
        <p>privado</p>
        <textarea placeholder='Clique para colocar uma descrição ao seu evento' 
        cols="40" rows="5"id='descricao' onChange={e => setdescricao(e.target.value)}></textarea>
        <p>Status do evento : </p>
        <p> confirmado</p>
        <label class="switch">
        <input type="checkbox" onClick={() => setstatus(!status)} defaultChecked={status}/>
        <span class="slider"></span>
        </label>
        <p> não ocorrera</p>
        <p>Lista de convidados :</p>
        <button id='botao_convidar'
        onClick={history.push('/lista')}>Editar lista de convidados</button>
        {convidados.map(e => (
          <div id='convidados' >
          <button id='descricao_convidado'
          style={e.lista.status_convidados ? {backgroundColor : 'blue'} : {backgroundColor : 'red'}}>
          <p >{//nome do convidados
                  api.get('/dados' , e.data.lista.id_usuario)
                  .then(resp => resp.data.data.nome)}</p>
          <div>
            <p >{e.lista.itens}</p>
          </div>
          <p>clique para mais informações</p>
          </button>
        </div>
        ))}
          <button id='botao_criar_evento' onClick={() => CreateEvent}>SALVAR</button>
      </div>
      )
  };
