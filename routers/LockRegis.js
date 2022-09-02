const express = require("express");
const router = express.Router();
const { LockRegis } = require("../models");



router.get("/", async (req, res) => {
  try {
    const listOfLock = await LockRegis.findAll();
    res.json(listOfLock);
  } catch (error) {
    
  }
    
  });

router.post("/", async (req, res) => {
  const data = {
    ...req.body,
  };

  try {
    await LockRegis.create(data);
  res.json(data);
  } catch (error) {
    
  }
  
});

router.put("/:id", async (req, res) => {


  try {
    const lock = await LockRegis.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!lock) return res.status(404).json({ msg: "not found data" });
    const data = {
        ...req.body,
    
      };
    await LockRegis.update(data, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "lock Updated",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
