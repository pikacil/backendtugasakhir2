const mongodb = require('mongoose')

const Modeluser = new mongodb.Schema({
    nik:{
        type:String,
        required: true
    },
    nama:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    alamat:{
        type:String,
        required: true
    },
    tgllahir:{
        type:String,
        required: true
    },
    tptlahir:{
        type:String,
        required: true
    },
    kelurahan:{
        type:String,
        required: true
    },
    kecamatan:{
        type:String,
        required: true
    },
    kota:{
        type:String,
        required: true
    },
    provinsi:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    // password2:{
    //     type:String,
    // },
     gambarUser:{
        type:Array,
        required: true
    },
    facedescriptor:{
        type:Array,
        // required: true
    },
   
    createdAt: {
        type: Date,
        default: Date.now()
      }
})

const Datauser = mongodb.model('datauser',Modeluser)

module.exports = Datauser