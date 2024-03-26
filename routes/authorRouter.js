import express from "express";
import { readDB, writeDB } from "../db.function/db.function.js"  

const authorRouter = express.Router();


authorRouter.get("/", async (req, res) => {
    const file =  await readDB(req, res)
    console.log
    res.send(file)
})



authorRouter.post("/", async (req, res) => {
    writeDB(req, res)
})

authorRouter.put("/:authorID", async (req, res) => {
    writeDB(req, res)
}
)


authorRouter.delete("/:authorID", async (req, res) => {
    const file =  await readDB(req, res)
    console.log(req.params.authorID)
    console.log(file)
    const index = file.findIndex((author) => author.authorID === req.params.authorID)
    console.log(index)
    if (index !== -1) {
         file.splice(index, 1)
        writeDB(req, res, file)
    }
})
    


export default authorRouter;