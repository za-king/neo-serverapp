const express = require("express");
const db = require("../models");
const router = express.Router();
const { Orders } = require("../models");
const validateTokenUser = require("../middleware/authUser");

router.get("/", async (req, res) => {

  try {
    const listOfOrders = await Orders.findAll({ include: [db.Users, db.Events] });
  res.json(listOfOrders);
  } catch (error) {
    console.log(error);
  }
  
});

//getById
router.get("/byId/:id", async (req, res) => {
  try {
    const id = req.params.id;
  const order = await Orders.findOne({
    where: {
      id: id,
    },
    include: [db.Users, db.Events],
  });
  res.json(order);
  } catch (error) {
    console.log(error);
  }
  
});

router.post("/", async (req, res) => {
  try {
    let today = new Date().toLocaleDateString();
  console.log(today);
  var today1 = new Date();
  var tomorrow = new Date(today1.getTime() + 24 * 60 * 60 * 1000);
  console.log(tomorrow);

  const data = {
    ...req.body,
    order_time_limit :tomorrow
  };
 
  await Orders.create(data);
  res.json(data);
  } catch (error) {
    
  }

  
});

router.put("/:id", async (req, res) => {
  try {
    await Orders.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Order Updated",
    });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Orders.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Order Deleted",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
