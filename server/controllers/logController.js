const Express = require('express');
const router = Express.Router();
const validateJWT = require("../middleware/validate-jwt"); 
const { LogModel } = require('../models');  

  
/* 
=======================
Log Create
 */
    router.post('/create', validateJWT, async (req, res) => {
      const { description, definition, result } = req.body.log;
      const { id } = req.user;
      const logEntry = {
        description, 
        definition,
        result,
        owner_id: id
      }

    try{
       const newLog = await LogModel.create(logEntry);
       res.status(200).json(newLog);
    } catch (err) {
        res.status(500).json({ error: err});
    }
});


/* 
=========================
 Get Logs
 */
router.get("/", async (req, res) => {
  try{
    const entries = await LogModel.findAll();
    res.status(200).json(entries);
  } catch (err) {
        res.status(500).json({ error: err});
      }
});

  
 /*
=======================
Get Logs by id     
*/
router.get("/:id", async (req, res)=> {
  try {
    const locatedWorkout = await LogModel.findAll({
      where:{ id: req.params.id},
    });
    res
    .status(200)
    .json({ message: "workout successfully retrieved", locatedWorkout});
  } catch (err) {
    res.status(500).json({ message: `failed to retrieve workout: ${err}`});
  }
});


/*
=======================
Update Logs  //! isnt valdating   
*/
 router.put("/update/:id", validateJWT, async (req, res) => {
  const { description, definition, result } = req.body;

  try {
    await LogModel.update ({ description, definition, result }, {where: { id:req.params.id }, returning: true })
    .then((result) => {
      res.status(200).json({
        message: "Workout log successfully updated",
      });
    });
   
  } catch (err) {
    res.status(500).json({
      message: `Failed to update workout log: ${err}`
    })
   }
 });



/*
=======================
Delete Logs               //! isn't validating
*/

router.delete("/:id", validateJWT, async (req, res) => {
  try{
    const query = {
      where: {
       id: req.params.id
    }
  };
    await LogModel.destroy(query);
    res.status(200).json({
      message: "log has successfully been deleted"
    })
  } catch (err) {
    res.status(500).json({
      message: "failed to deleted"
    })
  }
})

    module.exports = router;