let db = require('../configDb');

module.exports.listePhotosAlbum = function(callback){
    db.getConnection(function(err,connexion){
        if(!err){
            let sql="SELECT VIP_NUMERO, PHOTO_ADRESSE FROM photo WHERE PHOTO_NUMERO = 1";
            connexion.query(sql,callback);
            connexion.release();
        }
    })
};

module.exports.photosVip = function(data,callback){
    db.getConnection(function(err,connexion){
        if(!err){
            let sql="SELECT VIP_NOM, VIP_PRENOM, PHOTO_ADRESSE FROM PHOTO p, VIP v WHERE p.VIP_NUMERO = v.VIP_NUMERO AND v.VIP_NUMERO = ? ";
            connexion.query(sql,data,callback);
            connexion.release();
        }
    })
};