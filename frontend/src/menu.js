import React ,{useState} from 'react'
import barrinha from './menu.svg'
import {Link , useHistory } from 'react-router-dom'

export default function Hamburguer(){
  const history = useHistory();

  async function logout(){
    localStorage.clear();
    history.push('/')
  }; 
  const [visible,setVisible] = useState(false);

const visivel = {
  transform: visible ? 'translate(0%)' : 'translate(-101%)'
}
return(
        <div>
          <button id='barrinha' onClick={() => setVisible(!visible)}><img src={barrinha}/></button>
            <div id='menu' style={visivel}>
              <button onClick={() => setVisible(!visible)} id='barrinha_dentro'>
                  <img src={barrinha}/>
                </button>
                <Link >ver perfil</Link>
                <Link to='/criar'>criar evento</Link>
                <Link to='/calendario'>consultar eventos</Link>
                <Link to='/consulta'>historico de eventos</Link>
                <Link onClick={logout}>Sair</Link>
            </div>
        </div>
);}