const express = require('express');

const PostsRouter = require('./posts-router.js');

const server = express();

server.use(express.json());
server.use('/api/posts', PostsRouter);


server.get('/', (req, res) => {
    res.send(`
      <h2>Challenge API</h>
      <p>Welcome Nerevar my old friend.</p>
    `);
  });


module.exports = server;