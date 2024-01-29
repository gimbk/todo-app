
const User = require('../models/user');
const Controller = require('../controllers/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getAllUsers = async (req, res, next) => {
  try {
    const [allUsers] = await User.fetchAll();
    res.status(200).json(allUsers);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.countUser = async (req, res, next) => {
  try {
    const [allUsers] = await User.countUser();
    res.status(200).json(allUsers);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postUser = async (req, res, next) => {
  try {
    const postResponse = await User.post(req.body.title, req.body.description, req.body.priority, req.body.percent, new Date().getDate().toString(), new Date().getDate());
    res.status(201).json(postResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.putUser = async (req, res, next) => {
  try {
    const putResponse = await User.update(req.body.id, req.body.title, req.body.description, req.body.priority, req.body.percent);
    res.status(200).json(putResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const deleteResponse = await User.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};



// User registration
exports.register = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userfind = await User.findByUsername(req.body.username);
    if (userfind[0][0]) {
      res.status(404).json({ error: 'please change your username this is already taken' });
    } else {
      await User.register(req.body.username, hashedPassword);
      res.status(201).json({ message: 'User registered successfully' });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }






  // try {
  //   const { username, password } = req.body;
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   const userfind = User.findByUsername(username);
  //   if (userfind == true) {
  //     res.status(500).json({ error: 'please change your username this is already taken' });
  //   } else {
  //     await User.register(username, hashedPassword);
  //     res.status(201).json({ message: 'User registered successfully' });
  //   }

  // } catch (error) {
  //   res.status(500).json({ error: 'Registration failed' });
  // }
};


// exports.login = async (req, res, next) => {
//   try {
//     const postResponse = await User.findByUsername(req.body.username);

//     res.status(200).json(postResponse.id);
//   } catch (err) {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// };

// User login
// exports.login = async (req, res) => {
//   try {
//       const { username, password } = req.body;
//       const user =  User.findByUsername(username );
//       // if (!user) {
//       //     return res.status(401).json({ error: 'Authentication failed' });
//       // }
//       // const passwordMatch = bcrypt.compare(password, user.password);
//       // if (!passwordMatch) {
//       //     return res.status(401).json({ error: 'Authentication failed' });
//       // }
//       // const token = jwt.sign({ userId: user.id }, 'todo', {
//       //     expiresIn: '1h',
//       // });
//       //res.status(200).json({ token,username });
//        res.status(200).json( user );
//   } catch (error) {
//       res.status(500).json({ error: 'Login failed' });
//   }
// };


exports.login = async (req, res, next) => {
  try {
    const loginResponse = await User.findByUsername(req.body.username);
    if (!loginResponse[0][0]) {
      res.status(404).json({ error: 'Authentication failed' });
    } else {
      const passwordMatch = await bcrypt.compare(req.body.password, loginResponse[0][0].password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Authentication failed' });
      }
      const token = jwt.sign({ userId: loginResponse[0][0].id }, "todo", {
        expiresIn: 86400,
      });
      res.status(200).json({
        id: loginResponse[0][0].id,
        username: loginResponse[0][0].username,
        accessToken: token
        });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};