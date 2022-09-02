const express = require("express");
const app = express();
const router = express.Router();
const { BuktiKonsul } = require("../models");
const fs = require("fs");

const upload = require("../middleware/buktiKonsulImage.js");
const path = require("path");

router.post("/", upload, async (req, res) => {
  const data = {
    ...req.body,
    url: `${req.protocol}://${req.get('host')}/buktikonsul/${req.file.filename}`,
    image: req.file.filename,
  };

  try {
    
  await BuktiKonsul.create(data);
  res.json(data);
  } catch (error) {
    console.log(error);
  }

});

router.get("/", async (req, res) => {

  try {
    const listOfBuktiKonsul = await BuktiKonsul.findAll();
  res.json(listOfBuktiKonsul);
  } catch (error) {
    console.log(error);
  }
  
});

router.get("/byId/:id", async (req, res) => {
  try {
    const id = req.params.id;
  const data = await BuktiKonsul.findByPk(id);
  res.json(data);
  } catch (error) {
    console.log(error);
  }
  
});

//deleteByID
router.delete("/:id", async (req, res) => {
  
  try {
  const buktikonsul = await BuktiKonsul.findOne({
    where: {
      id: req.params.id,
    },
  });

  if(!buktikonsul) return res.status(404).json({msg: "not found data"})
  
    const filepath = `./buktikonsul/${buktikonsul.image}`;
    fs.unlinkSync(filepath)
    await BuktiKonsul.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Bukti Konsul Deleted",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
