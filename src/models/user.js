const connection = require('../configs/db')
module.exports = {
    creatUser: (data)=>{
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO user SET ?", data, 
            (err, result) => {
              if (!err) {
                resolve(result);
              } else {
                reject(new Error(err));
              }
            })    
        })
    },
    getUser: (email)=>{
        return new Promise((resolve, reject) => {
            connection.query("SELECT id, username, email, password FROM user WHERE email=?",email, 
            (err, result)=>{
                if(!err){
                    resolve(result);
                } else {
                  reject(new Error(err));
                }
            })
        })
    },
    getAll: () => {
      return new Promise((resolve, reject) => {
        connection.query("SELECT id,email FROM user", 
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        });
      });
    }
}