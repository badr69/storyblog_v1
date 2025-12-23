// app.js
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import sequelize from './app/db/sequelize.js';
import RoleRoutes from './app/routes/RoleRoutes.js';
import UserRoutes from './app/routes/UserRoutes.js';
import AuthRoutes from './app/routes/AuthRoutes.js';

dotenv.config();
console.log('PORT:', process.env.PORT);
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'OK' : 'NON DEFINI');


const app = express();

// ======================
// Config ES Modules
// ======================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ======================
// Middlewares
// ======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// sert le dossier frontend comme statique
app.use(express.static('frontend'));


// ✅ CORS SIMPLE (JWT = PAS de cookies)
app.use(cors({
  origin: ['http://localhost:5501', 'http://127.0.0.1:5501'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ======================
// Routes API
// ======================
app.use('/api/auth', AuthRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/roles', RoleRoutes);

// ======================
// Route test
// ======================
app.get('/api', (req, res) => {
  res.json({ message: 'API JWT ready ✅' });
});

// ======================
// Server
// ======================
const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected ✅');

    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Database connection error ❌', err);
  }
})();






