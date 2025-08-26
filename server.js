
import app from "./app.js";
import Config from "./config/config.js";
import connectDB from "./config/db.js";

const PORT =Config.PORT || 4000

const startServer = async ()=>{
    try {
        await connectDB();

        app.listen(4000, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
    })
    } catch (error) {
        console.log("Error during Sartup:",error)
    }
}
startServer()