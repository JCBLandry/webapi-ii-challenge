const express = require('express');

const PostsRouter = require('./posts-router.js');

const server = express();


server.use('/api/post', PostsRouter);
server.use(express.json());

server.get('/', (req, res) => {
    res.send(`
      <h2>Challenge API</h>
      <p>Welcome Nerevar my old friend.</p>
    `);
  });

// add an endpoint that returns all the messages for a hub
// add an endpoint for adding new message to a hub

module.exports = server;