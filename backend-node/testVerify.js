import { Security } from './app/utils/Security.js';

const password = "Test1234!";
const hash = "$2a$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; // remplace par le hash exact depuis la DB

const test = async () => {
  const ok = await Security.VerifyPassword(password, hash);
  console.log("Résultat bcrypt.compare :", ok); // doit être true
};

test();
