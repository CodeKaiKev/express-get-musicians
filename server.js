const express = require("express");
const app = express();
const {Musician} = require("./Musician")
const {sequelize} = require("./db")

const port = 3000;
app.get("/musicians", async (req, res) => {
    const musicians = await Musician.findAll();
    res.json(musicians);
})
//TODO
app.get("/musicians/:id", async (req, res) => {
    const musician = await Musician.findByPk(req.params.id);
    res.json({musician});
})

app.use(express.json());
//Post for new musicians
app.post("/musicians", async ( request, response) => {
    const newMusicians = await Musician.create(request.body);
    response.json(Musician);
})
//Put for updating a new musician
app.put("/musicians/:id", async (request, response) => {
    const newMusicians = request.body;
    await Musician.update(
        {name: newMusicians.name, instrument: newMusicians.instrument},
        {where: {id: request.params.id}}
    )

    //const res = await Restaurant.findAll();
    response.json(Musician);
})
//Deleting a musician based on ID
app.delete("/musicians/:id", async (request, response) => {
    const deletedMusician = await Musician.destroy({
        where: {
            id: request.params.id
        }
    })
    response.json(Musician);
})
app.listen(port, () => {
    sequelize.sync();
    console.log("Listening on port  http://localhost:3000/musicians")
})