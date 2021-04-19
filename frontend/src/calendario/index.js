import React, { useState , useEffect } from 'react'
import './stylesheet.css'
import Hamburguer from '../menu'
import api from '../services/api'

export default function Calendario(){
const date = new Date();
date.setDate(1);
var final_anterior = Array.from(Array(date.getDay()).keys());
var meses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
var indice = 0;

const id = localStorage.getItem("id")
//const [convites , setConvites] = useEffect([]);
const [datas , setDatas] = useEffect([]);
/*
useEffect(() => {
  api.get("/information" , {id}).then(resp => setConvites(resp.data.data.id_evento))
}
 , [id])

useEffect(() => {
  for(let h = 0 ; h <= convites.length ; h++){
    api.get(`/convidados/${convites[h]}`).then(resp => setDatas(resp.data.lista))
  }
} , [convites])
*/
//faz o indexof do numero que ele pegar de data , se o numero for menor do q 
//os dias que na semana , ele vai colorir(tem q pensar isso tbm)
//vai surgir um texto que ao clicar vai para o eventos historico e vai mudar a cor
//ele salva como data , ent tem q pegar os 2 primeiras strings para dar o indexof
//dps ele vai fazer as contas sempre adicionando com o final do mes anterior

const titulo = meses[date.getMonth()] ;

// a table em largura e altura
const linhas = Array.from(Array(6).keys());
const colunas = Array.from(Array(7).keys());
var sub_dias_no_mes = Array.from(Array(42).keys());

var i = 0;

var total_dias;

// os elementos na table
var dias_no_mes = sub_dias_no_mes.map(function(e){
  if(date.getMonth() == 1){
    if(e > 29){
      total_dias = 29
      return e - 29;
      }
      final_anterior[i] = final_anterior[i] - 1  ;
    }
  if((date.getMonth() % 2) == 0){
    total_dias = 31
    if(e > 31){ 
      return e - 31;
    }
    final_anterior[i] = (31 - final_anterior[i]);
  } else {
    total_dias = 30
    if(e > 30){
      return e - 30;
    } final_anterior[i] = (30 - final_anterior[i]);
  }
    return e++ , i++;
  }
);

//tira o primeiro elemento , que é 0
dias_no_mes.shift();

//tirar os nan
var final = final_anterior.filter(function (el) {
  return !Number.isNaN(el);
});

for(let g = 0 ; g < final.length ; g++){
//adicionar os dias dos meses anteriores
  dias_no_mes.unshift(final[g]);
}

// cria um array a partir de achar o primeiro valor de 1 , assim bota na coluna
//pro final acha o segundo valor de 1 e todos os subsquestes ficam com o CSS mudado
var index = Array.from(Array(dias_no_mes.indexOf(1)).keys());
var next_mes = Array.from(Array(dias_no_mes.lastIndexOf(1) - total_dias + final.length).keys());
//var resultado =  dias_no_mes.lastIndexOf(1) - total_dias
// - total_dias - final.length  
var p = 0;
var ultima_linha = 0;
var linha_complemento;
//logica para poder pintar as linhas do mes subsequente
if(total_dias + final.length < 35){
  ultima_linha = 4
  linha_complemento = 5
}else{
  ultima_linha = 5
  linha_complemento = 7;
}

for(let y = 0 ; y <= datas.length ; y++){
  var str = datas[y].charAt(0) + datas[y].charAt(1);
  var dia = dias_no_mes.indexOf(str) - final.length;

  if(dia <= 7){
    var c = str;
    var l = 0;
  }if(dia <= 14 && dia > 7){
    var c = dia - 7;
    var l = 1;
  }if(dia <= 21 && dia > 14){
    var c = dia - 14;
    var l = 2;
  }if(dia <= 28 && dia > 21){
    var c = dia - 21;
    var l = 3;
  }if(dia <= 31 && dia > 28){
    var c = dia - 28;
    var l = 4;
  }
  /*
  var numerosPaint = [];

  numerosPaint.push(str);
  */
};
//TESTAR só  , n vou botar botão que mostra todos os meses do ano foda-se
    return(
        <div className='Consultar'>
          < Hamburguer />
            <h1 className='mes'> {titulo} </h1>
            <div >
            <table id='calendario'>
              <tbody>
                {linhas.map((linha) => (
                  <tr key={linha}>
                  {colunas.map((coluna , e) => (
                  <td
                  key={coluna} onLoad={colunas.map(()=> (e < index.length) ? e = e : e++)
                    //ficar de olho neste next_mes.lenght
                    ,(coluna > next_mes.length) ? p = coluna : p++}
                  style={(linha == 0 && coluna == e) ? {filter : 'brightness(0.6)'} : 
                  (linha == ultima_linha && coluna == p) ? {filter : 'brightness(0.6)'} :
                  (linha == linha_complemento && coluna == coluna) ? {filter : 'brightness(0.6)'} :
                  {filter : 'brightness(1)'}}
                ><p></p>
                {(linha == l && coluna == c) ? <button style={{backgroundColor : 'green'}}>Você tem um evento marcado,clique para saber mais</button> : 0}
                &nbsp;{dias_no_mes[indice++]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
            </div>
        </div>
    );
}