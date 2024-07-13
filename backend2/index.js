
import express from 'express'
import connectDB from './config/db.js'
import authRoutes from './Routes/authRoute.js'
import categoryRoutes from './Routes/categoryRoute.js'
import productRoutes from './Routes/productRoutes.js'
import paymentRoutes from './Routes/paymentRoutes.js'
connectDB();
import cors from 'cors'
const app = express();
app.use(cors());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use('/api',authRoutes)
app.use('/api',categoryRoutes)
app.use('/api',productRoutes)



app.use('/api',paymentRoutes)


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
