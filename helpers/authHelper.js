const bcrypt = require("bcrypt");

//Hashing function (funcion name: hashPassword)

exports.hashPassword = (password) => {
  return new Promise((res, rej) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        rej(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          rej(err);
        }
        res(hash);
      });
    });
  });
};

// Compare ||  Decrypt Password function

exports.matchPassword = (password, hashedPass) => {
  return bcrypt.compare(password, hashedPass);
};
