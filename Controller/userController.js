const Datauser = require('../model/userModel')
const fs = require('fs')
const path = require('path')
const { check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");


exports.signup = async(req,res)=>{
    
      try {
        let {nik,nama,alamat,email,tgllahir,tptlahir,facedescriptor,kelurahan,kecamatan,kota,provinsi,password} = req.body
        // if(newuser.password!=newuser.password2)return res.status(400).json({message: "password not match"});
   
    let gambarUser = []
    req.files.forEach((data)=>{
        gambarUser.push(data.path)
    })
    // let user = await Datauser.findOne({
    //     email
    //   });
    //   if (user) {
    //     return res.status(400).json({
    //         msg: "User Already Exists"
    //     });
    // }
    let dataSave = new Datauser({
   nik : nik,
   nama : nama, 
   alamat : alamat,
   email : email,
   tgllahir : tgllahir,
   tptlahir : tptlahir,
   kelurahan : kelurahan,
   kecamatan : kecamatan,
   kota : kota,
   provinsi : provinsi,
   password : password,
   facedescriptor : facedescriptor,
   gambarUser:gambarUser,

    })
    
    const salt = await bcrypt.genSalt(10);
    dataSave.password = await bcrypt.hash(password, salt);
    await dataSave.save();
    const payload = {
        dataSave: {
            id: dataSave.id
        }
    };

    jwt.sign(
        payload,
        "randomString", {
            expiresIn: "1d"
        },
        (err, token) => {
            if (err) throw err;
            res.status(200).json({
                token,
                user : dataSave
            });
        }
    );
    
}catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
}

exports.masuk =  async(req,res)=>{
    const { email, password } = req.body;
    try {
        let user = await Datauser.findOne({
          email
        });
        if (!user)
          return res.status(400).json({
            message: "User Not Exist"
          });
          
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({
            message: "Incorrect Password !"
          });
  
          const payload = {
           user: {
            id: user.id
          }
        };
  
        jwt.sign(
          payload,
          "randomString",
          {
            expiresIn: 3600
          },
          (err, token) => {
            if (err) throw err;
            res.status(200).json({
              token,
              user : user
            });
          }
        );
      } catch (e) {
        console.error(e);
        res.status(500).json({
          message: "Server Error"
        });
      }
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

  
// exports.getUserlogin = (req, res,next) => {
//     // let nik = req.params.nik;
//     let {nik,password} = req.body
//     Datauser.find({nik:{$regex:nik,$options:'i'}}).exec((err,doc)=>{
//       if(!err){
//           res.status(200).json({
//               message:"Berhasil mendapatkan buah dengan rasa "+nik,
//               data:doc
//           })
//       }
//       else{
//           res.status(400).send("Gagal mendapatkan buah" + err)
//       }
//   })
//   };
// exports.registrasi = async(req,res)=>{
//     const newuser=new Datauser(req.body);
//    console.log(newuser);

//    if(newuser.password!=newuser.password2)return res.status(400).json({message: "password not match"});
   
// //    Datauser.findOne({email:newuser.email},function(err,user){
// //        if(user) return res.status(400).json({ auth : false, message :"email exits"});
// let gambarUser = []
// req.files.forEach((data)=>{
//     gambarUser.push(data.path)
// })
//        newuser.save((err,doc)=>{
//            if(err) {console.log(err);
//                return res.status(400).json({ success : false});}
//            res.status(200).json({
//                succes:true,
//                user : doc
//            });
//        });
// //    });
// }
