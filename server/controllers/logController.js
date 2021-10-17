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
Update Logs  //! isnt validating   
*/
router.put("/update/:id", validateJWT, async (req, res) => {
  const { description, definition, result } = req.body;

  try {
    await LogModel.update ({ description, definition, result }, {where: { id:req.params.id }, returning: true })
    .then((res) => {
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


//  router.put("/update/:id", validateJWT, async (req, res) => {
//    const { description, definition, result } = req.body.log;
//    const logId = req.params.entryId;
//    const userId = req.user.id;

//  const query = {
//           where: {
//             id: logId,
//             owner: userId
//           }
//        };

//   const updatedLog = {
//            description: description,
//            definition: definition,
//            result: result
//          };

//         try {
//             const update = await LogModel.update(updatedLog, query);
//             res.status(200).json(update);
//             } catch (err) {
//             res.status(500).json({ error: err });
//             }
//            });

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
      message: "failed to delete"
    })
  }
});

// router.delete("/:id", validateJWT, async (req, res) => {
//   const userId = req.user.id;
//   const logId = req.params.id;

//     try {
//          const query = {
//           where: {
//              id: logId,
//             owner: userId
//             }
//           };

//       await LogModel.destroy(query);
//        res.status(200).json({ message: "Log Entry Deleted" });
//      } catch (err) {
//        res.status(500).json({ error: err
        //  });
//      }
//    });

    module.exports = router;