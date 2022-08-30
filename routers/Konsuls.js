const express = require("express");
const db = require("../models");
const router = express.Router();
const { Konsuls } = require("../models");
const validateTokenUser =require('../middleware/authUser')


//getall
router.get("/",async(req,res)=>{
    const listOfKonsultasi =await Konsuls.findAll({include : [db.Users]})
    res.json(listOfKonsultasi)
})

//getById
router.get("/byId/:id", async (req, res) =>{
    const id = req.params.id
    const konsultasi = await Konsuls.findByPk(id,{include : [db.Users]});
    res.json(konsultasi)
})


//post

router.post("/",validateTokenUser,  async (req, res) =>{
    const data = {
       ...req.body
    }
    
    await Konsuls.create(data)
    res.json(data)
})

//delete
router.delete("/:id", async(req,res) =>{
    try {
      await Konsuls.destroy({
        where: {
            id: req.params.id
        }
    });
    res.json({
        "message": "Konsul Deleted"
    });
    } catch (error) {
      console.log(error)
    }
  })

  router.put("/byId/:id",async (req,res) =>{
    try {
      await Konsuls.update(req.body, {
          where: {
              id: req.params.id
          }
      });
      res.json({
          "message": "Konsul Updated"
      });
  } catch (err) {
      console.log(err);
  }
  })

module.exports = router