import React  , {useState}from 'react';
import './stylesheet.css';
import {useHistory} from 'react-router-dom'
import api from '../services/api'

export default function Login() {
    const [email , setEmail] = useState("piroca@gmail.com");
    const [pass , setPassword] = useState("dick");

    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        const data = {
            email,
            pass
        }
        
        try{
            const response = await api.post('/login' , data)

            localStorage.setItem('id' , response.data.user[0].id)
            localStorage.setItem('nome',response.data.user[0].nome)

            alert(`Bem vindo ${response.data.user[0].nome}`)
            history.push('/calendario')
        }catch(err){
            alert("Dados incorretos , tente novamente.");
        }
    }
    return(
        <div className='Logon'>
            <h1>App de eventos</h1>
            <form className='login' onSubmit={handleLogin}>
            <p>Login : <input placeholder='Digite seu login' value={email}
            onChange={e => setEmail(e.target.value)}/></p>
            <p>Senha : <input type='password' placeholder='Digite sua senha'value={pass}
            onChange={e => setPassword(e.target.value)}/></p> 
            <button type="submit">ENTRAR</button>
            </form>
        </div>
    )
};
