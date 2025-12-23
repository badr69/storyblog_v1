import UserModel from './app/models/UserModel.js';
import { Security } from './app/utils/Security.js';

const resetUser = async () => {
  await UserModel.destroy({ where: {} });

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
    id: user.id,
    username: user.username,
    email: user.email,
    password, // mot de passe clair pour Postman
    roleId: user.roleId
  });
};

resetUser();
