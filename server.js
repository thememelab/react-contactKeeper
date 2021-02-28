const express = require("express")
const connectDB = require("./config/db")
const app = express();
const PORT = process.env.PORT || 5000;

// conecting to the 
connectDB();
app.use(express.json({extended: false}))


app.get('/', (req,res) =>  res.json({"Hello World":" Its an Amazing day"}))


// Defile Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/auth", require("./routes/auth"));


app.listen(PORT, () => {
    console.log(`Express application running on :${PORT}`)
})