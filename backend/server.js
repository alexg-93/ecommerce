import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import morgan from 'morgan'
import customError from './utils/customError.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'



dotenv.config()

connectDB()

const app = express();


const __dirname = path.resolve()
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))


app.use(express.json())

app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/upload',uploadRoutes)

app.get('/api/config/paypal', (req, res)=>{
  res.send(process.env.PAYPAL_CLIENT_ID)
})
app.use(customError)

if(process.env.NODE_ENV==='development'){
  app.use(morgan('dev'))
}
if(process.env.NODE_ENV==='production'){
  app.use(express.static(path.join(__dirname,'/client/build')))

  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}else{
  app.get('/',(req, res)=>{
    res.send('API is running..')
  })
}

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server running in ${process.env.NODE_ENV} on port ${port}`.yellow.bold));


