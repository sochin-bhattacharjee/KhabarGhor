import express from "express"
import { isAuth } from "../middlewares/isAuth"
import { createAndEditShop } from "../controllers/shop.controllers"

const shopRouter = express.Router()

shopRouter.get("/create-edit",isAuth,createAndEditShop)

export default shopRouter