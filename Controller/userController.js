const Datauser = require('../model/userModel')
const fs = require('fs')
const path = require('path')

var bodyParser = require("body-parser");

exports.insertuser = (req,res)=>{
    let {nik,nama,alamat,tgllahir,tptlahir,kelurahan,kecamatan,kota,provinsi,password} = req.body
    let gambarUser = []
    req.files.forEach((data)=>{
        gambarUser.push(data.path)
    })
    let dataSave = new Datauser({
   nik : nik,
   nama : nama, 
   alamat : alamat,
   tgllahir : tgllahir,
   tptlahir : tptlahir,
   kelurahan : kelurahan,
   kecamatan : kecamatan,
   kota : kota,
   provinsi : provinsi,
   password : password,
   gambarUser:gambarUser
    })
    dataSave.save().then((doc)=>{
        res.status(200).json({
            message:"Insert Berhasilasdasdasd!",
            timestamp: req.requestTime,
            data: doc
        })
    }).catch(err=>{
        res.status(400).send("Gagal Insert Data ERR : "+err)
    })
}

exports.getuser = (req,res)=>{
    Datauser.find().exec((err,doc)=>{
        if(!err){
            res.status(200).json({
                message:"Berhasil mendapatkan semua datanya!",
                data: doc
            })
        }else{
            res.status(400).send("Gagal mendapatkan Data ERR : "+err)
        }
    })
    
}

exports.getuserByID = (req,res)=>{
    let iduser = req.params.id
    Datauser.findById(iduser).exec((err,doc)=>{
        if(!err){
            res.status(200).json({
                message:"Berhasil mendapatkan semua data!",
                data: doc
            })
        }else{
            res.status(400).send("Gagal mendapatkan Data ERR : "+err)
        }
    })
}

exports.updateuser  = (req,res,next) =>{
    let id = req.params.id
    Datauser.findByIdAndUpdate(id,req.body,(err,doc)=>{
        if(!err){
            req.files.forEach((data,i)=>{
                let oldPath = doc.gambarUser[i]
                let newPath = data.path
                fs.rename(newPath,oldPath,(err)=>{
                    if(err){
                        throw err;
                    }
                })
            })
            // console.log(doc)
            res.status(200).json({
              message:"Berhasil Update data dengan id "+id,
          
          })
      } else{
          res.status(400).send("Gagal Update "+ err)
      }
  })
}

exports.deleteuser = (req,res)=>{
    let id = req.params.id;
    Datauser.findOneAndDelete({ id: id }, (err, data) => {
      if (err) {
        doc.gambarUser.forEach((data)=>{
            removeImages(data)
        })

        res.status(200).json({
            message:"Delete Berhasil!",
            data: doc
        })
      } else {
        res.status(200).json({
          message: `Users dengan id = ${id} Berhasil dihapus`,
        });
      }
    });
}
  
  
exports.getUserByNik = (req, res,next) => {
  let nik = req.params.nik;
  Datauser.find({nik:{$regex:nik,$options:'i'}}).exec((err,doc)=>{
    if(!err){
        res.status(200).json({
            message:"Berhasil mendapatkan buah dengan rasa "+nik,
            data:doc
        })
    }
    else{
        res.status(400).send("Gagal mendapatkan buah" + err)
    }
})
};
  exports.getUserByNama = (req, res,next) => {
    let nama = req.params.nama;
    Datauser.find({nama:{$regex:nama,$options:'i'}}).exec((err,doc)=>{
      if(!err){
          res.status(200).json({
              message:"Berhasil mendapatkan  "+nama,
              data:doc
          })
      }
      else{
          res.status(400).send("Gagal mendapatkan buah" + err)
      }
  })
  };

  exports.getUserByAlamat = (req, res,next) => {
    let alamat = req.params.alamat;
    Datauser.find({alamat:{$regex:alamat,$options:'i'}}).exec((err,doc)=>{
      if(!err){
          res.status(200).json({
              message:"Berhasil mendapatkan  "+alamat,
              data:doc
          })
      }
      else{
          res.status(400).send("Gagal mendapatkan buah" + err)
      }
  })
  };

  
  