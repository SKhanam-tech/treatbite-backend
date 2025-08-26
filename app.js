import express from "express"
import globalErrorHandler from './middlewares/globalErrorHandler.js';
import cors from "cors"
import userAuthRoutes from "./routes/auth/userRoutes.js"
import partnerAuthRoutes from "./routes/auth/partnerRoutes.js"
import restaurantRoutes from "./routes/restaurant/restaurantRoutes.js"
import bankInfoRoutes from "./routes/bank/bankRoutes.js"
import voucherRoutes from "./routes/voucher/voucherRoutes.js"
import superadminRoutes from "./routes/superadmin/superadminRoutes.js"

const app = express()
app.use(cors())

//avtar image
app.use("/uploads",express.static("uploads"))
//...............................................
app.use(express.json())


app.get("/",(req,res,next)=>{
    res.send("Backend is working")
})

// app.post("/api/auth/register", )

//localhost:4000/api/user/register
//localhost:4000/api/user/login
//localhost:4000/api/user/profile
app.use("/api/user",userAuthRoutes)

//localhost:4000/api/partner/register
app.use("/api/partner",partnerAuthRoutes)

//localhost:4000/api/restaurant/add
app.use("/api/restaurant",restaurantRoutes)

//localhost:4000/api/bankInfo/getBankInfo
app.use("/api/bankInfo",bankInfoRoutes)

//localhost:4000/api/voucher/
app.use("/api/voucher",voucherRoutes)

//global error handler
app.use(globalErrorHandler)

app.use("/api/superadmin",superadminRoutes)

export default app