const Express = require('express');
const router = Express.Router();
const validateJWT = require("../middleware/validate-jwt"); 
const { LogModel } = require('../models');  

 // Import the Log Model   
    /* 
    =======================
      Log Create
    =======================
    */
    router.post('/create', validateJWT, async (req, res) => {
      const { description, definition, result, } = req.body;
      const { id } = req.user;
      const logEntry = {
        description, 
        definition,
        result,
        owner: id
      }

    try{
       const newLog = await LogModel.create(logEntry);
       res.status(200).json(newLog);
    } catch (err) {
        res.status(500).json({ error: err});
    }
    // LogModel.create(logEntry)
});

    module.exports = router;