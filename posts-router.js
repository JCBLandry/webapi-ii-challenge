const express = require('express');

const posts = require('./data/db.js');

const router = express.Router();
// URI: /api/hubs

router.post('/', async (req, res) => {
  
  try{
      const newPost = await posts.insert(req.body);
      res.status(201).json(newPost);
  } catch {
      console.log(error);
      res.status(500).json({
          message: 'Error saving hub message',
      })
  }
});  

router.post('/:id/comments', async (req, res) => {
  const messageInfo = {...req.body, post_id: req.params.id };

  try{
      const savedMessage = await posts.addMessage(messageInfo);
      res.status(201).json(savedMessage);
  } catch{
      console.log(error);
      res.status(500).json({
          message: 'Error saving hub message',
      })
  }
});  

router.get('/', async (req, res) => {
  try {
    const postsList = await posts.find(req.body);
    res.status(200).json(postsList);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the hubs',
    });
  }
});



  module.exports = router; 