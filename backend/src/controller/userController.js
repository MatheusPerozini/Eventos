const crypto = require('crypto');
const connection = require('../database/connection');
const bcrypt = require('bcrypt');

module.exports = {
    async usuarios(req , resp){
        const data = await connection('users').select('*');

        return resp.json({data});
    },
    async atualizar_preferencias(req,resp){
        const {id , status , itens} = req.body;
        const {id_evento} = req.params;

        await connection('convidados').where('id_evento' ,id_evento).andWhere('id_usuario',id)
        .update({
            status,
            itens
        });
    },
    async create(req , resp) {
        const {email , celular , nome , pass} = req.body;

        const id = crypto.randomBytes(4).toString('HEX');
        const password = bcrypt.hashSync(pass , 10);
    
        const data = await connection('users').insert({
            id ,
            email ,
            celular,
            nome,
            password
        })
    
        return resp.json({data});
    },
    async login(req , resp){
        const {email , pass} = req.body;

        const password = await connection('users').where('email',email).select('password').first();

        const check_pass = bcrypt.compareSync(pass,password.password);
        
        const user = await connection('users').where('email' , email);

        if(!check_pass){
            return resp.json({ae : 'deu nao'});
        }else{
            return resp.json({user})
        }
    }
}