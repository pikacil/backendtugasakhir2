const mongodb = require('mongoose')

const Modeluser = new mongodb.Schema({
    nik:{
        type:String
    },
    nama:{
        type:String
    },
    alamat:{
        type:String
    },
    tgllahir:{
        type:String
    },
    tptlahir:{
        type:String
    },
    kelurahan:{
        type:String
    },
    kecamatan:{
        type:String
    },
    kota:{
        type:String
    },
    provinsi:{
        type:String
    },
    password:{
        type:String
    },
     gambarUser:{
        type:Array
    }
})

const Datauser = mongodb.model('datauser',Modeluser)

module.exports = Datauser