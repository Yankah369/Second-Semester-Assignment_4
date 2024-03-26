// Build app using express
// - create Author Router in another file
//   - this should have CRUD endpoints (Create, Read, Update, Delete)
//   - Link it to the main file (index.js or server.js or app.js, whatever you chose to use)
// - Add a global simple logger to the app. (like i showed you in class)

import express from "express"
import logger from "./middlewares/logger.js"
import authorRouter from "./routes/authorRouter.js"

const app = express()

// middlewares
app.use(express.json(), logger)
app.use("/author", authorRouter) 



app.listen(3000, () => {
    console.log("Server is running on port 3000")
})
