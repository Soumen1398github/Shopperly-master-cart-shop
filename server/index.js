import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
// import connectDB from './config/connectDB.js'
import userRouter from './route/user.route.js'
import categoryRouter from './route/category.route.js'
import uploadRouter from './route/upload.router.js'
import subCategoryRouter from './route/subCategory.route.js'
import productRouter from './route/product.route.js'
import cartRouter from './route/cart.route.js'
import addressRouter from './route/address.route.js'
import orderRouter from './route/order.route.js'


dotenv.config({ path: './.env.local' });
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB with URI:", process.env.MONGODB_URI); // Debugging line

        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is missing in .env file!");
        }

        await mongoose.connect("mongodb+srv://arupmaiti2003:Arup%40123@cluster.edw2l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster"),

        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
        process.exit(1);
    }
};

connectDB()







const app = express()
app.use(cors({
    credentials : true,
    origin : process.env.FRONTEND_URL || "http://localhost:8080",
}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy : false
}))

const PORT = 8080 || process.env.PORT 

app.get("/",(request,response)=>{
    ///server to client
    response.json({
        message : "Server is running " + PORT
    })
})

app.use('/api/user',userRouter)
app.use("/api/category",categoryRouter)
app.use("/api/file",uploadRouter)
app.use("/api/subcategory",subCategoryRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/address",addressRouter)
app.use('/api/order',orderRouter)


    app.listen(PORT,()=>{
        console.log("Server is running",PORT)
    })


