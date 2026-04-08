import dotenv from 'dotenv'
import connectDB from "./db/index.js";
import { app } from './app.js';

dotenv.config()

connectDB()
    .then(() => {
        app.on((error) => {
            console.log(error)
        })
        
        app.listen(process.env.PORT || 8000, () => {
            console.log(`app is listning on the port: ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })






// import express from 'express'
// const app = express() 

// (async () => {
//   try {
//      await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
//      app.on((error) => {
//         console.log(error)
//      })
//      app.listen((process.env.PORT, () => {
//        console.log(`App is listning on port ${PORT}`)
//      }))
//   } catch (error) {
//     console.log(error)
//     throw error
//   }
// })()