const express = require("express")
const usersRoutes = require("./routes/users")
const employeesRoutes = require("./routes/employees")
const mongoose = require("mongoose")

const app = express()

const SERVER_PORT = process.env.SERVER_PORT || 3001
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb+srv://admin:password123%21@cluster0.tqloabq.mongodb.net/comp3123_assigment1?retryWrites=true&w=majority&appName=Cluster0"

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use("/api/v1/user", usersRoutes);
app.use("/api/v1/emp", employeesRoutes);


app.route("/")
    .get((req, res) => {
        res.send("<h1>Comp3123 Assignment01</h1>")
    })

mongoose.connect(DB_CONNECTION_STRING).then(() => {
        console.log("Connected to MongoDB")
        app.listen(SERVER_PORT, () =>{
            console.log(`Server running at http://localhost:${SERVER_PORT}/`)
})
}).catch((err) => { 
    console.error("Error connecting to MongoDB:", err.message)
})





