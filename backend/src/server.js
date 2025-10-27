import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import routes from './routes/routes.js'


const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({
  origin :process.env.FRONTEND_URL
}));
app.use(json());

// Routes
app.use('/api',routes)

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});