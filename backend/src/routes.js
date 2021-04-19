const express = require('express');
const {celebrate , Segments , Joi} = require('celebrate');
const routes = express.Router();

const eventoController = require('./controller/eventoController');
const userController = require('./controller/userController');
const sessionController = require('./controller/sessionController');

routes.post('session' , sessionController.create);

routes.post('/register',celebrate({
    [Segments.BODY] : Joi.object().keys({
        nome : Joi.string().required(),
        email : Joi.string().required().email(),
        celular : Joi.string().required().length(11),
        pass : Joi.string().required()
    })
}), userController.create);

routes.post('/login',celebrate({
    [Segments.BODY] : Joi.object().keys({
        email : Joi.string().required().email(),
        pass : Joi.string().required()
    })
}) , userController.login);

routes.get('/users', userController.usuarios);

routes.post('/status/:id_evento',celebrate({
    [Segments.BODY] : Joi.object().keys({
        id : Joi.string().required().length(8),
        status : Joi.boolean().required(),
        itens : Joi.string()
    }),[Segments.PARAMS] : Joi.object().keys({
        id_evento : Joi.number().required()
    })
}),userController.atualizar_preferencias)

routes.post('/alterar/:id_evento' ,celebrate({
    [Segments.PARAMS] : Joi.object().keys({
        id_evento : Joi.number().required()
    }),[Segments.BODY] : Joi.object().keys({
        id : Joi.string().required().length(8),
        status : Joi.boolean().required()
    })
}), eventoController.atualizar);

routes.get('/check:id' , celebrate({
    [Segments.PARAMS] : Joi.object().keys({
        id : Joi.number().required()
    }),[Segments.HEADERS] : Joi.object({
        evento_id : Joi.string().required().length(8)
    }).unknown()
}),eventoController.admin);

routes.get('/information/:id',celebrate({
    [Segments.PARAMS] : Joi.object().keys({
        id : Joi.number().required()
    })
}) , eventoController.dados_eventos);

routes.get('/information' , celebrate({
    [Segments.BODY] : Joi.object().keys({
        id : Joi.string().required().length(8)
    })
}),eventoController.status_convidado)

routes.get('/dados',celebrate({
    [Segments.BODY] : Joi.object().keys({
        id : Joi.string().required().length(8)
    })
}),eventoController.dados_convidados);

routes.get('/all',eventoController.todos_eventos)

routes.get('/convidados/:id',celebrate({
    [Segments.PARAMS] : Joi.object().keys({
        id : Joi.number().required()
    })
}) , eventoController.convidados)

routes.get('/ver' ,celebrate({
    [Segments.BODY] : Joi.object().keys({
        id : Joi.string().required().length(8)
    })
}), eventoController.ver);

routes.post('/evento',celebrate({
    [Segments.BODY] : Joi.object().keys({
        nome : Joi.string().required(),
        descricao : Joi.string(),
        data : Joi.string().required(),
        lugar : Joi.string().required(),
        status : Joi.boolean().required(),
        horas : Joi.string().required(),
        privacidade : Joi.boolean().required()
    }),[Segments.HEADERS] : Joi.object({
        evento_id : Joi.string().required().length(8)
    }).unknown()
}),eventoController.create);

routes.post('/refresh/:id' ,celebrate({
    [Segments.BODY] : Joi.object().keys({
        id_usuario : Joi.string().required().length(8)
    }),[Segments.PARAMS] : Joi.object().keys({
        id : Joi.number().required()
    })
}),eventoController.atualizar_convidados);

routes.delete('/evento/:id', celebrate({
    [Segments.PARAMS] : Joi.object().keys({
        id : Joi.number().required()
    }),[Segments.HEADERS] : Joi.object({
        authorization : Joi.string().required().length(8)
    }).unknown()
}),eventoController.delete);

routes.post('/update/:id', eventoController.atualizar_informacoes)

module.exports = routes;