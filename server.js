const express = require("express");
const app = express();
const {Musician} = require("./models/Musician")
const {sequelize} = require("./db")
const port = 3000;
const musicianRouter = require("./router/musicians");

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use("/musicians", musicianRouter);

app.listen(port, () => {
    sequelize.sync();
    console.log("Listening on port  http://localhost:3000/musicians")
})