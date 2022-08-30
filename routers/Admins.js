const express = require("express");
const router = express.Router();
const { Admins } = require("../models");
const bycript = require("bcryptjs");
const jwt = require('jsonwebtoken')
const validateToken =require('../middleware/authAdmin')



//get All
router.get("/",validateToken,async(req,res)=>{
  const listOfAdmin =await Admins.findAll()
  res.json(listOfAdmin)
})


//get byId
router.get("/:id",async(req, res) =>{
  try {
    const product = await Admins.findAll({
        where: {
            id: req.params.id
        }
    });
    res.send(product[0]);
} catch (err) {
    console.log(err);
}
} )


//update
router.put("/:id",async (req,res) =>{
  try {
    await Admins.update(req.body, {
        where: {
            id: req.params.id
        }
    });
    res.send({
        "message": "Admins Updated"
    });
} catch (err) {
    console.log(err);
}
})

//delete
router.delete("/:id", async(req,res) =>{
  try {
    await Admins.destroy({
      where: {
          id: req.params.id
      }
  });
  res.json({
      "message": "Admins Deleted"
  });
  } catch (error) {
    console.log(error)
  }
})

//Create
router.post("/", async (req, res) => {
  const { username, password, role } = req.body;
  bycript.hash(password, 10).then((hash) => {
    Admins.create({
      username: username,
      password: hash,
      role: role
    });

    res.json("success");
  });
});



//login
router.post("/login",async (req, res) => {
  const { username, password,role } = req.body;

  const admin = await Admins.findOne({ where: { username: username } });

  if (!admin) {
    res.json({ error: "User Does'nt Exist" });
  } else {
    bycript.compare(password, admin.password).then((match) => {
      if (!match) {
        res.json({ error: "wrong pass  and username" });
      } else {
        // res.json("LOGING IN");

        const accesToken = jwt.sign({username : admin.username, id: admin.id}, "scretKey")
        res.cookie('token',accesToken, { httpOnly: true });
        res.json({accesToken :accesToken,role:admin.role});
      }
    });
  }
});

module.exports = router;
