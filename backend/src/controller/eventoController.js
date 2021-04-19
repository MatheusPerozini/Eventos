const connection = require('../database/connection');

module.exports = {
    async atualizar(req,resp){
        const {id , status} = req.body;
        const {id_evento} = req.params;

        const att = await connection('convidados').where('id_usuario',id)
        .andWhere('id_evento',id_evento).update({status_convidado : status});

        return resp.json({att});
    },
    async dados_eventos(req , resp){
        const {id} = req.params;

        const dados = await connection('eventos').where('id' , id).select("*");

        if(dados){
            return resp.json({dados})
        } else{
            return resp.status(401).send();
        }
    },
    async admin(req , resp){
        const {id} = req.params;
        const evento_id = req.headers.authorization;

        const incicent = await connection('eventos').where('id',id).select('evento_id').first();
        
        if(incicent.evento_id != evento_id){
            return resp.status(401)
        }else{
            return resp.status(200)
        }
    },
    async todos_eventos(req,resp){
        const lista = await connection('eventos').select('id');

        return resp.json({lista})
    },
    //information
    async status_convidado(req ,resp){
        const {id} = req.body;
        const data = await connection('convidados').where('id_usuario' , id).select("*");

        return resp.json({data})
    },
    async dados_convidados(req , resp){
        const {id} = req.body
        const data = connection('users').where('id' , id).select("*")

        return resp.json({data})
    },
    async convidados(req ,resp){
        const {id} = req.params
        const lista = await connection('convidados').where('id_evento',id).select('*');

        return resp.json({lista})
    },
    async ver(req , resp){
        //fazer um for loop onde a partir dos eventos id que aparacer , ira checar se é array
        //para assim poder buscar os evento_id igual na tabela eventos
        //e dar select *
        const {id} = req.body; // id do usuraio e não do evento
        const lista = await connection('convidados').where('id_usuario' , id).select('id_evento');

        if(lista){
            if(Array.isArray(lista)){
                for(var m = 0 ; m < lista.length ; m++){
                    var data = await connection('eventos').where('id' , lista[m].id_evento)
                    .select('*');
                }
            }else{
                var data = await connection('eventos').where('id' , lista.id_evento).select('*');
            }return resp.json({data});
        }else{
            return resp.json({mano : 'vc  n ta em nennum evento'})
        }
    },
    async atualizar_informacoes(req , resp){
        const {nome , descricao , data ,lugar , status , privacidade} = req.body;
        const evento_id = req.headers.authorization;
        const {id} = req.params;

        const incident = await connection('eventos').where('id',id).select('evento_id').first();

        if(incident.evento_id != evento_id){
            return resp.status(401).json({error : 'not permitted'})
        }else{
            await connection('eventos').where('id', id).update({
                nome,
                descricao,
                data,
                lugar,
                status,
                privacidade
            })
        }
    },
    async atualizar_convidados(req ,resp) {
        const {id_usuario} = req.body;
        const {id} = req.params;

        const evento = await connection('eventos').where('id',id).select('id').first();

        if(evento){
            if(Array.isArray(id_usuario)){
                for(var i = 0 ; i < id_usuario.length ; i++){
                var convidado = await connection('convidados').where('id_usuario' , id_usuario[i]).select('id_usuario').first();
                if(!convidado){
                    await connection('convidados').insert({
                        id_evento : id ,
                        id_usuario  : id_usuario[i]})
                }else{
                continue;
                }
            }var excluidos = await connection('convidados').where('id_evento',id).select('id_usuario');
            for(var a = 0; a < excluidos.length; a++){
                 if(!id_usuario.includes(excluidos[a].id_usuario)){
                    await connection('convidados').where('id_usuario',excluidos[a].id_usuario).delete();
                }
             }
            }else{
            await connection('convidados').insert({id_usuario , id_evento : id })}
            return resp.json({deu : "porraaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"})
        }else{
            return resp.status(401).json({error : 'not permitted'})};
    },
    async create(req , resp) {
        const {nome , descricao ,data , lugar , status ,privacidade , horas} = req.body;
        const evento_id = req.headers.authorization;

        const [id] = await connection('eventos').insert({
            nome ,
            descricao ,
            data ,
            lugar ,
            status ,
            privacidade,
            horas,
            evento_id
        })

        return resp.json({id})
    },
    async delete(req , resp) {
        const {id} = req.params;
        const evento_id = req.headers.authorization;

        const incident = await connection('eventos').where('id',id).select('evento_id').first();
        const convidados = await connection('convidados').where('id_evento' , id);

        if(incident && convidados){
            if(incident.evento_id != evento_id){
                return resp.status(401).json({error : 'not permitted'})
            }
        await connection('eventos').where('id',id).delete();
        await connection('convidados').where('id_evento' , id).delete();
        return resp.status(201).send();
        }else{
            return resp.status(401).json({error : 'not permitted'})
        }
    }
}