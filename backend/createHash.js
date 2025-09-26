
import bcrypt from 'bcryptjs';

const password = "password123";
//how many times the hashing algorithm runs.
const rounds = 10;

bcrypt.hash(password, rounds, (err, hash) => {
  if (err) throw err;
  console.log("Password hash for MongoDB:", hash);
});

