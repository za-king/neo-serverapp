const express = require("express");
const router = express.Router();
const { Events } = require("../models");
const fs = require("fs");
const upload = require("../middleware/images.js");


//getall
router.get("/", async (req, res) => {
  const listOfEvents = await Events.findAll();
  res.json(listOfEvents);
});

//getById
router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const event = await Events.findByPk(id);
  res.json(event);
});

//deleteByID
router.delete("/:id", async (req, res) => {
  const event = await Events.findOne({
    where: {
      id: req.params.id,
    },
  });

  if(!event) return res.status(404).json({msg: "not found data"})
  try {
    const filepath = `./images/${event.image}`;
    fs.unlinkSync(filepath)
    await Events.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Events Deleted",
    });
  } catch (error) {
    console.log(error);
  }
});

//add event
router.post("/", upload, async (req, res) => {
  
  const data = {
    ...req.body,
    url: `${req.protocol}://${req.get('host')}/getimage/${req.file.filename}`,
    image: req.file.filename
  };

  await Events.create(data);
  res.json(data);
});

router.post("/upload/:id", upload, async (req, res) => {});

//update event
router.put("/:id",upload, async (req, res) => {
  
  const event = await Events.findOne({
    where: {
      id: req.params.id,
    },
  });
  if(!event) return res.status(404).json({msg: "not found data"})
  console.log(req.file === undefined)
  console.log(event.image)
  try {
    if (req.file === undefined){
      const data = {
        ...req.body,
        url: `${req.protocol}://${req.get('host')}/getimage/${event.image}`,
        image: event.image
      };
      await Events.update(data, {
        where: {
          id: req.params.id,
        },
      });
      res.json({
        message: "events Updated",
        
      });
    }else{
      const oldpath = `./images/${event.image}`;
      fs.unlinkSync(oldpath)
    const data = {
      ...req.body,
      url: `${req.protocol}://${req.get('host')}/getimage/${req.file.filename}`,
      image: req.file.filename
    };
    await Events.update(data, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "events Updated",
      
    });
    }
  } catch (err) {
    console.log(err);
  }


  
});

module.exports = router;
