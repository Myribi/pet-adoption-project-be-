const { petModel } = require("../models/petsModel");
const { userModel } = require("../models/usersModel");

async function getPets(req, res) {
  try {
    if (req.query.name) {
      let reqName = new RegExp(`${req.query.name}`, "i");
      req.query.name = reqName;
    }

    if (req.query.weight) {
      if (req.query.weight === "<20lbs") {
        req.query.weight = { $lt: 20 };
      } else if (req.query.weight === "20-50lbs") {
        req.query.weight = { $gte: 20, $lt: 50 };
      } else if (req.query.weight === "50-70lbs") {
        req.query.weight = { $gte: 50, $lt: 80 };
      } else {
        req.query.weight = { $gte: 80 };
      }
    }

    if (req.query.height) {
      if (req.query.height === "<20cm") {
        req.query.height = { $lt: 20 };
      } else if (req.query.height === "20-50cm") {
        req.query.height = { $gte: 20, $lt: 50 };
      } else if (req.query.height === "50-70cm") {
        req.query.height = { $gte: 50, $lt: 80 };
      } else {
        req.query.height = { $gte: 80 };
      }
    }

    const allPets = await petModel.find(req.query);


    res.send(allPets);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getPetById(req, res) {
  try {
    const petById = await petModel.findById(req.params.id);
    res.send(petById);
  } catch (err) {
    res.status(500).send("fetching pet failed, try again later");
  }
}

async function addPet(req, res) {
  const {
    type,
    name,
    adoptionStatus,
    picUrl,
    height,
    weight,
    color,
    bio,
    hypoallergnic,
    dietery,
    breed,
  } = req.body;
  try {
    const newPet = await petModel.create({
      type: type,
      name: name,
      adoptionStatus: adoptionStatus,
      picture: picUrl,
      height: height,
      weight: weight,
      color: color,
      bio: bio,
      hypoallergnic: hypoallergnic,
      dietery: dietery,
      breed: breed,
    });
    await newPet.save();
    await res.send(newPet);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function fosterOrAdopt(req, res) {
  try {
    let petStatus;
    if (req.body.statusChange === "Adopted" ) {
      petStatus = await petModel.findOneAndUpdate(
        { _id: req.body.petId },
        { adoptionStatus: "Adopted" }
      );
      const adoptPet = await userModel.findOneAndUpdate(
        { _id: req.body.id },
        { $push: { adoptedPets: req.body.petId } }
      );
      const removeFromFavPets = await userModel.findOneAndUpdate(
        { _id: req.body.id },
        { $pull: { favPets: req.body.petId } }
      );
      const removeFromFosteredPets = await userModel.findOneAndUpdate(
        { _id: req.body.id },
        { $pull: { fosteredPets: req.body.petId }}
      );

    } else if (req.body.statusChange === "Fostered") {
      petStatus = await petModel.findOneAndUpdate(
        { _id: req.body.petId },
        { adoptionStatus: "Fostered" }
      );
      const fosterPet = await userModel.findOneAndUpdate(
        { _id: req.body.id },
        { $push: { fosteredPets: req.body.petId } }
      );
    } else if (req.body.statusChange === "Return"){
      petStatus = await petModel.findOneAndUpdate(
        { _id: req.body.petId },
        { adoptionStatus: "Available" }
      );
      const returnFosPets = await userModel.findOneAndUpdate(
      { _id: req.body.id },
      { $pull: { fosteredPets: req.body.petId }},
    )
    const returnAdPets = await userModel.findOneAndUpdate(
      { _id: req.body.id },
      { $pull: { adoptedPets: req.body.petId }},
    )}
    res.send({ ok: true });
  } catch (error) {
    console.log(error);
  }
}

async function getFosteredAdoptedPets(req, res) {
  try {
    const fostered = await Promise.all(
      req.body.user.fosteredPets.map(async (id) => {
        const fos = await petModel.findOne({ _id: id });
        return fos;
      })
    );

    const adopted = await Promise.all(
      req.body.user.adoptedPets.map(async (id) => {
        const ad = await petModel.findOne({ _id: id });
        return ad;
      })
    );
      const data = [...fostered, ...adopted]
    
    res.send(data);
  } catch (error) {
    console.log(error);
  }
}

// async function getFosAdPets(req, res) {
  
//   try {

//     const adopted = await Promise.all(
//       req.body.user.adoptedPets.map(async (id) => {
//         const ado = await petModel.findOne({ _id: id });

//         return ado;
//       })
//     );

//     const fostered = await Promise.all(
//       req.body.user.fosteredPets.map(async (id) => {
//         const fos = await petModel.findOne({ _id: id });

//         return fos;
//       })
//     );

//     res.send(fostered,adopted);
//   } catch (error) {
//     console.log(error);
//   }
// }

module.exports = {
  getPets,
  getPetById,
  addPet,
  fosterOrAdopt,
  getFosteredAdoptedPets,

};
