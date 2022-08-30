const express = require("express");
const db = require("../models");
const router = express.Router();
const { Orders } = require("../models");
const validateTokenUser = require("../middleware/authUser");

router.get("/", async (req, res) => {
  const listOfOrders = await Orders.findAll({ include: [db.Users, db.Events] });
  res.json(listOfOrders);
});

//getById
router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const order = await Orders.findOne({
    where: {
      id: id,
    },
    include: [db.Users, db.Events],
  });
  res.json(order);
});

router.post("/", async (req, res) => {

  let today = new Date().toLocaleDateString();
  console.log(today);
  var today1 = new Date();
  var tomorrow = new Date(today1.getTime() + 24 * 60 * 60 * 1000);
  console.log(tomorrow);

  
//   const tomorrow  = new Date(); // The Date object returns today's timestamp
//   const config = {
//     year:  'numeric',
//     month: 'short',
//     day:   '2-digit'
//   };
//   tomorrow.setDate(tomorrow.getDate() + 1)
//   const dateTimeFormat = new Intl.DateTimeFormat('default', config);

// // This will return "Apr 09, 2020"
// console.log(dateTimeFormat.format(tomorrow));
  const data = {
    ...req.body,
    order_time_limit :tomorrow
  };
 
  await Orders.create(data);
  res.json(data);
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
