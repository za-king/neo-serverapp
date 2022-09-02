const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bycript = require("bcryptjs");
const jwt = require('jsonwebtoken')

router.get("/",async(req,res)=>{
  try {
    const listOfUsers =await Users.findAll()
  res.json(listOfUsers)
  } catch (error) {
    console.log(error);
  }
  
})

router.get("/:id",async(req, res) =>{
  try {
    const product = await Users.findAll({
        where: {
            id: req.params.id
        }
    });
    res.send(product[0]);
} catch (err) {
    console.log(err);
}
} )



router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    bycript.hash(password, 10).then((hash) => {
      Users.create({
        username: username,
        password: hash,
      });
  
      res.json("success");
    });
  } catch (error) {
    console.log(error);
  }
 
});

//delete
router.delete("/:id", async(req,res) =>{
  try {
    await Users.destroy({
      where: {
          id: req.params.id
      }
  });
  res.json({
      "message": "Users Deleted"
  });
  } catch (error) {
    console.log(error)
  }
})

router.post("/login", async (req, res) => {

  try {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username: username } });
  
    if (!user) {
      res.json({ error: "User Does'nt Exist" });
    } else {
      bycript.compare(password, user.password).then((match) => {
        if (!match) {
          res.json({ error: "wrong pass  and username" });
        } else {
          const accesToken = jwt.sign({username : user.username, id: user.id}, "scretKeyUser")
          res.cookie('token2',accesToken, { httpOnly: true });
          res.json({accesToken : accesToken, id: user.id} );
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
 
});

module.exports = router;
