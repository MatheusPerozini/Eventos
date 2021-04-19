
exports.up = function(knex) {
    return knex.schema.createTable('eventos',function(table){
        table.increments();
        table.string('nome').notNullable();
        table.string('descricao');
        table.string('data').notNullable();
        table.string('horas').notNullable();
        table.string('lugar').notNullable();
        table.boolean('status').notNullable();
        table.boolean('privacidade').notNullable();

        table.string('evento_id').notNullable();
        table.foreign('evento_id').references('id').inTable('users');
    })
    .createTable('convidados',function(table){
        table.string('id_evento').notNullable();
        table.foreign('id_evento').references('id').inTable('eventos');

        table.string('id_usuario').notNullable();
        table.foreign('id_usuario').references('id').inTable('users');

        table.string('itens');
        table.boolean('status_convidado').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTable("eventos")
    .dropTable('convidados')
};
