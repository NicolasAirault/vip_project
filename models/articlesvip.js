let db = require('../configDb');

module.exports.listeVips = function(callback){
    db.getConnection(function(err,connexion){
        if(!err){
            let sql="SELECT VIP_NOM, VIP_PRENOM, VIP_NUMERO FROM vip";
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};

module.exports.listeArticles = function(data,callback){
    db.getConnection(function(err,connexion){
        if(!err){
            let sql="SELECT VIP_NOM, VIP_PRENOM, v.VIP_NUMERO, ARTICLE_TITRE, ARTICLE_RESUME, ARTICLE_DATE_INSERT, EXEMPLAIRE_DATEPUBLICATION FROM vip v\n" +
                "JOIN apoursujet aps ON v.VIP_NUMERO = aps.VIP_NUMERO\n" +
                "JOIN article a ON aps.ARTICLE_NUMERO = a.ARTICLE_NUMERO\n" +
                "JOIN exemplaire ex ON a.EXEMPLAIRE_NUMERO = ex.EXEMPLAIRE_NUMERO\n" +
                "WHERE v.VIP_NUMERO = ?";
            connexion.query(sql,data,callback);
            connexion.release();
        }
    });
};