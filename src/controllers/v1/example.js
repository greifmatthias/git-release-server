'use strict';



const ExampleController = {

  index: (request, reply) => {

    reply.send({
      message: 'example'
    });
  },

  get: (request, reply) => {

    reply.send({
      message: `GET ${request.params.id}`
    });
  }
};



module.exports = ExampleController;