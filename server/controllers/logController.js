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
router.get("/:id", validateJWT, async (req, res)=> {
  const { id } = req.params;

  try {
    const locatedWorkout = await LogModel.findAll({
      where:{ 
        id: id,
      },
  });
    res.status(200)
    .json({ message: "workout successfully retrieved", locatedWorkout});
  } catch (err) {
    res.status(500).json({ message: `failed to retrieve workout: ${err}`});
  }
});


/*
=======================
Update Logs   //!Doesn't give correct error message when failed/says it updates other users post but doesn't actually update
*/

router.put("/update/:id", validateJWT, async (req, res ) => {
  const {description, definition, result } = req.body.log;

  try {
    const updateLog = await LogModel.update({description,definition,result}, {where:{id: req.params.id, owner_id: req.user.id}})
    res.status(200).json({message: "updated successfully", updateLog })

  }catch (error) {
    res.status(500).json({ message: "update failed", updateLog})

  }
});

/*
=======================
Delete Logs               //! Validates but says it deletes another user's log but it actually doesn't
*/

router.delete("/:id", validateJWT, async (req, res) => {

  try{
    const query = {
      where: {
       id: req.params.id,
       owner_id: req.user.id
    }
  };
    await LogModel.destroy(query);
    res.status(200).json({
      message: "log has successfully been deleted"
    })
  } catch (err) {
    res.status(500).json({
      message: "failed to delete"
    })
  }
});


    module.exports = router;