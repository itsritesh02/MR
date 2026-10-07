import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'

const app = express();
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
  res.send("Hello its me")
})

app.use('/api/auth',authRoutes)
const PORT= 5000

app.listen(PORT,()=>{
  console.log(`Server is running on PORT ${PORT}`);
  
})