const { getPetByIdModel } = require("../models/petsModel");
const { getUserByIdModel } = require("../models/usersModel");

const isQueryValid = (req, res, next) => {
  if (req.query.type === "") {
    res.status(400).send("Type query empty");
    return;
  }
  if (req.query.adoptionStatus === "") {
    res.status(400).send("Adoption status query empty");
    return;
  }

  if (req.query.height === "") {
    res.status(400).send("Height query empty");
    return;
  }

  if (req.query.weight === "") {
    res.status(400).send("Weight query empty");
    return;
  }

  if (req.query.name === "") {
    res.status(400).send("Name query empty");
    return;
  }

  next();
};

async function getPetInfo(req,res,next){
  const petInfo = await getPetByIdModel(req.body.petId);
  if(petInfo){
  req.body.pet = petInfo;
  next()
  return;
  }
  res.status(400).send("Pet dont exist")
}

async function getUserInfo2(req, res, next) {
  const user = await getUserByIdModel(req.body.id);

  if (user) {
    req.body.user = user;
    next();
    return;
  }
  res.status(400).send("User dont exist");
}

module.exports = { isQueryValid, getPetInfo, getUserInfo2 };
