import React , {useState} from 'react'
import './stylesheet.css'
import {useHistory} from 'react-router-dom'
import api from '../services/api'

/*deixar apenas que possa digitar numeros no celular
function isNumberKey(evt)
      {
         var charCode = (evt.which) ? evt.which : evt.keyCode
         if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true;
      }
*/

//CONSERTAR O BUG DO ENVIAR FORMULARIO VAZI0
//MDS CONCERTA , COMO EU FIZ ISSO , JESUS CRISTO
const inputs = document.getElementsByTagName('input')
const senha = document.getElementById('senha')
const confirmar = document.getElementById('confirmar')

document.getElementsByTagName('button').onSubmit = function check() { 
    for(let i = 0; i <= inputs.lenght ; i++){
    if(inputs[i].value == "" || inputs[i].value == null ){
        return false
    } else if (senha.value !== confirmar.value){
        //fazer aparecer erro falando que a senha não ta igual
        return false
    }
}
}


export default function Register(){
    const[nome,setNome] = useState('');
    const[pass,setPassword] = useState('');
    const[email,setEmail] = useState('');
    const[celular,setCelular] = useState('');

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const data = {
            nome,
            pass,
            email,
            celular
        };
        try{
            await api.post('/register' , data)
            
            alert('Conta criada com sucesso');
            history.push('/');
        }catch(err){
            alert('Digite os dados completos ou tente novamente');
        }

    }
    return(
      <div className='register'>
            <h1>CRIAR CONTA</h1>
            <form className='dados' onSubmit={handleRegister}>
                <p>Nome : <input placeholder=' Digite seu nome' type='text' value={nome} 
                onChange={e => setNome(e.target.value)}/></p>
                <p>Email : <input placeholder=' Digite seu Email' type='email' value={email} 
                onChange={e => setEmail(e.target.value)}/></p>
                <p>Senha : <input placeholder=' Digite sua senha' minLength='5' type='password' id='senha' value={pass} 
                onChange={e => setPassword(e.target.value)}/></p>
                <p>Confirmar Senha : <input placeholder=' Confirme sua senha' type='password' id='confirmar' ></input></p>
                <p>Celular : <input placeholder=' Digite seu numero de celular' maxLength='11' minLength='9' type='text' 
                className='celular'value={celular}  onChange={e => setCelular(e.target.value)}/></p>
                <button onSubmit="return check()">CONFIRMAR</button>
            </form>
        </div>
        );
}