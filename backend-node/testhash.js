import { Security } from './app/utils/Security.js';

const test = async () => {
  const password = "Test1234!"; // le mot de passe que tu envoies dans Postman
  const hashFromDB = "$2b$10$bKNTqL80AldcVVZuQMCtBOEZVm5uaZ8pezN/2cfAWjcR2NZsHD.0e";

  const isValid = await Security.VerifyPassword(password, hashFromDB);
  console.log(isValid ? "✅ Mot de passe correct" : "❌ Mot de passe incorrect");
};

test();
