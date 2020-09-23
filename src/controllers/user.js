const bcrypt = require('bcryptjs')
const userModel = require('../models/user');
const miscHelper = require('../helpers/helpers');
const connection = require('../configs/db')

module.exports = {
    register:(req, res)=>{
        const {email, username, password, address, birthday} = req.body 
        if (!email){
            return miscHelper.response(res, {}, 422, "can't email empty")
        }
        if (!password){
            return miscHelper.response(res, {}, 422, "can't password empty")
        }
        if (!username){
            return miscHelper.response(res, {}, 422, "can't username empty")
        }
        const data = {
            email,
            username,
            password: miscHelper.hashPassword(password),
            address,
            birthday
        }
        userModel.creatUser(data)
        .then((result) => {
            miscHelper.response(res, result, 201)
          })
          .catch(err=>{
              console.log(err)
              
            miscHelper.response(res, {}, res.status, err)})
    },
    login:async(req, res)=>{
        const {email, password} = req.bodyusername
        username
        username
        username
        username
        if (!email){
            return miscHelper.response(res, {}, 422, "can't email empty")
        }
        if (!password){
            return miscHelper.response(res, {}, 422, "can't password empty")
        }
        await userModel.getUser(email)
        .then((result)=>{
            if(!result.length){
                return miscHelper.response(res, {}, 422, "not registered")
            }else{
                if(!bcrypt.compareSync(password, result[0].password)){
                    return miscHelper.response(res, {}, 422, "invalid password")
                }
                const {id, email, name} = result[0]
                // console.log(id)
                const token = miscHelper.generateToken(id, email, name)
                return miscHelper.response(res, {token:token}, 201, "succes login")
            }
        })
        .catch(err =>{
            console.log(err)
        })
        
    },
    getAll: (req, res) => {
        userModel.getAll()
            .then((result) => {
                miscHelper.response(res, result, 200)
            })
            .catch(err => console.log(err))
    },
    getUserByID:(req,res)=>{
        const id=req.params.id
        connection.query("Select email from user WHERE id=?",id,(err,result)=>{
            res.json(result)
        })
    }
    
}