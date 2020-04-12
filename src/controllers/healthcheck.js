'use strict';



const HealthCheckController = {

  index: (request, reply) => {

    reply.code(200).send({
      status: 'ok'
    });
  }
};



module.exports = HealthCheckController;