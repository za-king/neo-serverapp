const express = require("express");
const app = express();
const router = express.Router();
const { BuktiEvent } = require("../models");
const fs = require("fs");

const upload = require("../middleware/buktiEventImage.js");
const path = require("path");

router.post("/", upload, async (req, res) => {
  const data = {
    ...req.body,
    url: `${req.protocol}://${req.get('host')}/buktievent/${req.file.filename}`,
    image: req.file.filename,
  };

  await BuktiEvent.create(data);
  res.json(data);
});

router.get("/", async (req, res) => {
  const listOfBuktiEvent = await BuktiEvent.findAll();
  res.json(listOfBuktiEvent);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const data = await BuktiEvent.findByPk(id);
  res.json(data);
});


//deleteByID
router.delete("/:id", async (req, res) => {
  const buktievent = await BuktiEvent.findOne({
    where: {
      id: req.params.id,
    },
  });

  if(!buktievent) return res.status(404).json({msg: "not found data"})
  try {
    const filepath = `./buktievent/${buktievent.image}`;
    fs.unlinkSync(filepath)
    await BuktiEvent.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "BuktiEvent Deleted",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
