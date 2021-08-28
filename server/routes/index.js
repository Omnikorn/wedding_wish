const express = require("express");
const router = express.Router();
const {Guests,Wedding,User} = require("../models")


router.route("/wedding").get((req,res)=>{
    Wedding.find()
    .then(foundWedding => res.json(foundWedding))
})

module.exports=router