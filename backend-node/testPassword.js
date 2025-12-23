// testPassword.js
import { Security } from './app/utils/Security.js';

const test = async () => {
  const password = "MotDePasseQueTuAsInscrit"; // mot de passe que tu as utilisé à l'inscription
  const hashFromDB = "$2b$10$..."; // copie ici le hash exact stocké dans ta table Users

  const isValid = await Security.VerifyPassword(password, hashFromDB);

  if (isValid) {
    console.log("✅ Mot de passe correct !");
  } else {
    console.log("❌ Mot de passe incorrect !");
  }
};

test();
