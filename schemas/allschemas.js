

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
   
    height: { type: "number" },
    weight: { type: "number" },
    color: { type: "string" },
    bio: { type: "string" },
    hypoallergnic: { type: "string" },
    dietery: { type: "string" },
    breed: { type: "string" },
  },
};

const profileSchema = {
  type: "object",
  properties: {
    name: {type: "string"},
    phone: {type: "string"},
    email: {type: "string"},
    password: {type: "string"},
    bio: {type: "string"},
  },
  additionalProperties: false
}

module.exports = {profileSchema}

module.exports = {userSchema, petsSchema, loginSchema, profileSchema}



