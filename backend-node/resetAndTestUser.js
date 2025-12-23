import UserModel from './app/models/UserModel.js';
import { Security } from './app/utils/Security.js';

const resetAndTestUser = async () => {
  try {
    // 1️⃣ Vider la table users
    await UserModel.destroy({ where: {} });

    // 2️⃣ Créer un user avec bcryptjs
    const password = "Test1234!";
    const hashedPassword = await Security.HashPassword(password);

    const user = await UserModel.create({
      username: "badrdz19",
      email: "badr234554@mail.com",
      password: hashedPassword,
      roleId: 1
    });

    console.log("Utilisateur créé ✅");
    console.log({
      username: user.username,
      email: user.email,
      password,       // mot de passe clair pour Postman
      hashInDB: hashedPassword
    });

    // 3️⃣ Vérifier directement le mot de passe
    const ok = await Security.VerifyPassword(password, user.password);
    console.log("Résultat bcrypt.compare :", ok); // doit être true
  } catch (err) {
    console.error(err);
  }
};

resetAndTestUser();
