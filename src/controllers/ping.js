'use strict';



const PingController = {

  ping: (request, reply) => {

    reply.code(200).send({
      message: 'pong'
    });
  }
};



module.exports = PingController;