import React , {useState , useEffect}from 'react';
import {BrowserRouter , Route , Switch} from 'react-router-dom';

import Login from './logon';
import Register from './register';
import Calendario from './calendario';
import Criar_evento from './criar_evento';
import Consulta from './Consultar_eventos';
import Ver_evento from './ver_evento';
import Lista from './lista';

import Teste from './teste';
// botando a api para poder criar uma nova rota toda vez que for criado um novo evento
//import api from './services/api'

export default function Routes(){
/*
    const [incident , setIncidents] = useState([])
    const response =  api.get('/all')

    useEffect(()=> {
        response.
        then(response => setIncidents(response.data.lista))
    })*/

    return(
        <BrowserRouter >
            <Switch>
                <Route path='/' exact component={Login}/>
                <Route path='/calendario'  component={Calendario}/>
                <Route path='/register' component={Register}/>
                <Route path='/criar' component={Criar_evento}/>
                <Route path='/consulta' component={Consulta}/>
                <Route path='/lista' component={Lista}/>
                <Route path='/visualizar' component={Ver_evento}/>

                <Route path='/teste' component={Teste}/>
            </Switch>
        </BrowserRouter>
        )
 }
/*
</BrowserRouter>{incident.map(e  => (
                    <Route path={`/visualizar/${e.id_evento}`} component={Ver_evento}
                    />
                )
                    )}
*/