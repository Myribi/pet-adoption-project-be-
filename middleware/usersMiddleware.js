const {
  getUserByEmailModel,
  getUserByIdModel,
  userModel,
} = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getUserById } = require("../controllers/usersController");

function passwordsMatch(req, res, next) {
  if (req.body.password === req.body.repassword) {
    next();
    return;
  }
  res.status(400).send("passwords don't match");
}

function passwordsCompare(req, res, next) {
  const { userId } = req.body;

  bcrypt.compare(req.body.prevPwd, userId.password, (err, result) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
      return;
    }
    if (result) {
      next();
      return;
    } else {
      res.status(400).send("Previous password is incorect");
    }
  });
}

function passwordsUpdatedMatch(req, res, next) {
  if (req.body.updatedPwd === req.body.verifiedUpdatedPwd) {
    next();
    return;
  }
  res.status(400).send("passwords don't match");
}

async function doesUserExist(req, res, next) {
  const userExist = await userModel.findOne({ email: req.body.email });

  if (userExist) {
    res.status(400).send("A user has already registered with this email");
    return;
  }

  next();
}

async function hashedPassword(req, res, next) {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) throw err;
    req.body.password = hash;
    next();
  });
}

async function updatedHashedPassword(req, res, next) {
  bcrypt.hash(req.body.updatedPwd, 10, (err, hash) => {
    if (err) throw err;
    req.body.updatedPwd = hash;

    next();
  });
}

async function getUsers(req, res, next) {
  let users;
  try {
    users = await userModel.find({}, "email name");
  } catch (err) {
    res.status(500).send("fetching users failed, try again later");
    return next();
  }
  res.json({ users: users.map((user) => user.toObject()) });
}

async function isExistingUser(req, res, next) {
  const user = await getUserByEmailModel(req.body.logEmail);
  if (user) {
    req.body.user = user;

    next();
    return;
  }
  res.status(400).send("User or password is incorect");
}

async function isExistingUserPwd(req, res, next) {
  const userId = await getUserByIdModel(req.body.id);
  if (userId) {
    req.body.userId = userId;

    next();
    return;
  }
  res.status(400).send("password is incorect");
}

async function verifyPassword(req, res, next) {
  const { user } = req.body;
  bcrypt.compare(req.body.logPassword, user.password, (err, result) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
      return;
    }
    if (result) {
      next();
      return;
    } else {
      res.status(400).send("User or password is incorect");
    }
  });
}

async function auth(req, res, next) {
  
  if (!req.headers.authorization) {
    res.status(401).send("Authorization headers required");
    return;
  }
  const token = req.headers.authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send("Unauthorized");
      return;
    }
    if (decoded) {
      req.body.id = decoded.userId;
      next();
      return;
    }
  });
}


async function getUserInfo(req, res, next) {
  const user = await getUserByIdModel(req.body.id);

  if (user) {
    req.body.user = user;
    next();
    return;
  }
  res.status(400).send("User dont exist");
}



function isAdmin(req, res, next) {
  const { user } = req.body;
  try {
    if (user.admin === true) {
      next();
      return;
    } else {
      res.status(403).send("Forbidden access");
      return;
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  passwordsMatch,
  doesUserExist,
  hashedPassword,
  getUsers,
  isExistingUser,
  verifyPassword,
  passwordsUpdatedMatch,
  updatedHashedPassword,
  auth,
  passwordsCompare,
  isExistingUserPwd,
  isAdmin,
  getUserInfo,
};
