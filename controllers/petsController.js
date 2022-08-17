const { getPetsModel } = require("../models/petsModel");

async function getPets(req, res) {
  try {
    const allPets = getPetsModel();
  
    res.send(allPets);
    // res.send(req.query.type);
  } catch (err) {
    res.status(500).send(err);
  }
}


module.exports = { getPets};
