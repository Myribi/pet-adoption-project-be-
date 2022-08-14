const userSchema = {
    type: "object",
    properties: {
        name : {type: "string"},
        phone : {type: "string"},
        email : {type: "string"},
        password : {type: "string"},
        repassword : {type: "string"},
    },
    required: ["name", "phone", "email"],
    additionalProperties: false
}



module.exports = {userSchema}