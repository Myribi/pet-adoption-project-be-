const Pet = require("../models/petsModel");

async function getPets(req, res) {
  try {
    if (req.query.name) {
      let reqName = new RegExp(`${req.query.name}`, "i");
      req.query.name = reqName;
    }

    if (req.query.weight === "<20lbs") {
      req.query.weight = { $lt: 20 };
    } else if (req.query.weight === "20-50lbs") {
      req.query.weight = { $gte: 20, $lt: 50 };
    } else if (req.query.weight === "50-70lbs") {
      req.query.weight = { $gte: 50, $lt: 80 };
    } else {
      req.query.weight = { $gte: 80 };
    }

    if (req.query.height === "<20cm") {
      req.query.height = { $lt: 20 };
    } else if (req.query.height === "20-50cm") {
      req.query.height = { $gte: 20, $lt: 50 };
      console.log(req.query.height);
    } else if (req.query.height === "50-70cm") {
      req.query.height = { $gte: 50, $lt: 80 };
    } else {
      req.query.height = { $gte: 80 };
    }

    const allPets = await Pet.find(req.query);
    res.send(allPets);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getPetById(req, res) {
  try {
    petById = await Pet.findById(req.params.id);
    res.send(petById);
  } catch (err) {
    res.status(500).send("fetching pet failed, try again later");
  }
}

module.exports = { getPets, getPetById };
