const mongoose = require("mongoose")
const {Schema} = mongoose

const WishSchema = new Schema ({
    item:{
        type: String,
        required: true
    },
    website:{
        type:String
    },
    accquired:{
        type:Boolean,
        default: false
    },
    wedding_owner:{
        type:String
    }
})

const Wish =mongoose.model("Wish" , WishSchema)

module.exports = Wish