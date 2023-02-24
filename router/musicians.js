const express = require("express");
const app = express();
const {Musician} = require("../models/Musician")
const {sequelize} = require("../db")

const router = express.Router();
const {check, validationResult} = require("express-validator");

router.get("/", async (req, res) => {
    const musicians = await Musician.findAll();
    res.json(musicians);
})
//TODO
router.get("/:id", async (req, res) => {
    const musician = await Musician.findByPk(req.params.id);
    res.json({musician});
})


router.use(express.urlencoded({ extended: true }));
//Post for new musicians
router.post("/", [check("name", "is not empty and no whitespace").not().isEmpty().trim(), check("instrument", "make sure not empty or whitespace").not().isEmpty().trim(), check("name", "Is between 2 & 20").isLength({min: 2, max: 20})], async ( request, response) => {

    const errors = validationResult(request);
    if(!errors.isEmpty()) {
        response.json({error: errors.array()});
    } else {
        const newMusicians = await Musician.create(request.body);
        response.json(Musician);
    }
   
})
//Put for updating a new musician
router.put("/:id", async (request, response) => {
    const newMusicians = request.body;
    await Musician.update(
        {name: newMusicians.name, instrument: newMusicians.instrument},
        {where: {id: request.params.id}}
    )

    //const res = await Restaurant.findAll();
    response.json(Musician);
})
//Deleting a musician based on ID
router.delete("/:id", async (request, response) => {
    const deletedMusician = await Musician.destroy({
        where: {
            id: request.params.id
        }
    })
    response.json(Musician);
})

module.exports = router;