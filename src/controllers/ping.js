'use strict';



const PingController = {

  ping: (request, reply) => {

    reply.send({
      message: 'pong'
    });
  }
};



module.exports = PingController;