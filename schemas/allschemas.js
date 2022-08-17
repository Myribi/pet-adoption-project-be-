

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
    bio: { type: "text" },
    hypoallergnic: { type: "boolean" },
    dietery: { type: "array" },
    breed: { type: "string" },
  },
  required: [""],
  additionalProperties: false,
};

// module.exports = mongoose.model('user',usersSchema) ;

module.exports = {userSchema,petsSchema}



