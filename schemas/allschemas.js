

const userSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    phone: { type: "string" },
    email: { type: "string" },
    password: { type: "string" },
    repassword: { type: "string" },
  },
  required: ["name", "phone", "email"],
  additionalProperties: false,
};



const loginSchema = {
  type: "object",
  properties: {
   logEmail: {type: "string"},
   logPassword: {type: "string"},
  },
  additionalProperties: false
}

const petsSchema = {
  type: "object",
  properties: {
    type: { type: "string" },
    name: { type: "string" },
    adoptionStatus: { type: "string" },
    picture: { type: "string" },
    height: { type: "string" },
    weight: { type: "string" },
    color: { type: "string" },
    bio: { type: "string" },
    hypoallergnic: { type: "boolean" },
    dietery: { type: "array" },
    breed: { type: "string" },
  },

  additionalProperties: false,
};


module.exports = {userSchema, petsSchema, loginSchema}



