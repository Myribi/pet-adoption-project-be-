const fs = require('fs');
const path =require('path');
const pathToDb = path.resolve(__dirname, '../database/petsDb.json');


function getPetsModel() {
    try {
        const allPets = fs.readFileSync(pathToDb)
        return JSON.parse(allPets)
    }catch(err) {
        console.log(err)
    }
}


function getPetByTypeModel(type) {
    try {
        const allPets = getPetsModel();
        const pet = allPets.find((pet) => pet.type === type);
        console.log(pet)
        return pet
      } catch (err) {
        console.log(err);
      }
}

module.exports = {getPetsModel, getPetByTypeModel}