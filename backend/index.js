import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import shopRouter from './routes/shop.routes.js';
import itemRouter from './routes/items.routes.js';
import cors from "cors"
const app = express()
const port = process.env.PORT;
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/shop", shopRouter)
app.use("/api/item", itemRouter)

app.get("/",(req, res)=>{
    res.send("khabar Ghor backend is running...")
})

app.listen(port, ()=>{
    connectDB()
    console.log(`Khabar Ghor server is running at ${port}`)
})