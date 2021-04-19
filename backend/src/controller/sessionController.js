const connection = require('../database/connection');

module.exports = {
    async create(req , resp){
        const {id} = req.body;
        const evento = await connection('eventos').where('id',id).select('nome').first();

        if(!evento){
            return resp.status(400).json({error : 'not found'});
        }
    }
}