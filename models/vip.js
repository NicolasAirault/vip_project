let db = require('../configDb');


module.exports.test = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT COUNT(*) AS NB FROM vip ;";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.liste = function(callback){
    db.getConnection(function(err,connexion){
        if(!err){
            let sql = "SELECT DISTINCT SUBSTRING(VIP_NOM,1,1) as vip_lettre FROM vip ORDER BY vip_lettre ASC;";
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};

module.exports.detailsLettre= function(data,callback){
    db.getConnection(function(err,connexion){
        if(!err){
            let sql="SELECT vip.VIP_NUMERO, VIP_NOM, VIP_PRENOM, PHOTO_ADRESSE FROM vip, photo WHERE SUBSTRING(VIP_NOM,1,1) LIKE ? AND photo.VIP_NUMERO = vip.VIP_NUMERO AND PHOTO_NUMERO = 1";
            connexion.query(sql, data, callback);
            connexion.release();
        }
    });
};

module.exports.detailVip = function(data, callback){
    db.getConnection(function(err,connexion){
        if(!err){
            let sql ="SELECT VIP_PRENOM, VIP_NOM, VIP_NAISSANCE, NATIONALITE_NOM, VIP_TEXTE, PHOTO_ADRESSE FROM vip,nationalite, photo WHERE vip.NATIONALITE_NUMERO = nationalite.NATIONALITE_NUMERO AND vip.VIP_NUMERO = ? AND vip.VIP_NUMERO = photo.VIP_NUMERO AND PHOTO_NUMERO = 1";
            connexion.query(sql,data,callback);
            connexion.release();
        }
    });
};

module.exports.photosVip = function(data, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT PHOTO_ADRESSE, PHOTO_NUMERO, PHOTO_SUJET, PHOTO_COMMENTAIRE FROM photo p JOIN vip v ON p.VIP_NUMERO = v.VIP_NUMERO WHERE v.VIP_NUMERO = ? AND PHOTO_NUMERO <> 1 ORDER BY PHOTO_NUMERO ASC";
            connexion.query(sql, data, callback);
            connexion.release();
        }
    });
};

module.exports.liaisonVip = function(data, callback){
    db.getConnection(function(err,connexion){
        if(!err){
            let sql ="SELECT v2.VIP_NOM, v2.VIP_PRENOM, v2.VIP_NUMERO, v2.VIP_TEXTE, DATE_EVENEMENT, LIAISON_MOTIFFIN, PHOTO_ADRESSE FROM vip v, vip v2, liaison l, photo p WHERE v.VIP_NUMERO = l.VIP_NUMERO AND v2.VIP_NUMERO = VIP_VIP_NUMERO AND p.VIP_NUMERO = v2.VIP_NUMERO AND p.PHOTO_NUMERO = 1 AND v.VIP_NUMERO = ?";
            connexion.query(sql,data,callback);
            connexion.release();
        }
    })
};

module.exports.mariageVip = function(data, callback){
    db.getConnection(function(err,connexion){
        if(!err){
            let sql = "SELECT v2.VIP_NOM, v2.VIP_PRENOM, v2.VIP_NUMERO, v2.VIP_TEXTE, DATE_EVENEMENT, MARIAGE_FIN, MARIAGE_LIEU, MARIAGE_MOTIFFIN, PHOTO_ADRESSE FROM vip v, vip v2, mariage m, photo p WHERE v.VIP_NUMERO = m.VIP_NUMERO AND v2.VIP_NUMERO = m.VIP_VIP_NUMERO AND v2.VIP_NUMERO = p.VIP_NUMERO AND PHOTO_NUMERO = 1 AND v.VIP_NUMERO = ?";
            connexion.query(sql,data,callback);
            connexion.release();
        }
    })
};

module.exports.realisateurVip = function(data,callback){
    db.getConnection(function(err,connexion){
        if(!err){
            let sql = "SELECT VIP_NOM, VIP_PRENOM, VIP_SEXE, FILM_TITRE, FILM_DATEREALISATION FROM vip v, realisateur r, film f WHERE v.VIP_NUMERO = r.VIP_NUMERO AND r.VIP_NUMERO = f.VIP_NUMERO AND v.VIP_NUMERO = ?";
            connexion.query(sql,data,callback);
            connexion.release();
        }
    })
};

module.exports.acteurVip = function(data,callback){
    db.getConnection(function(err,connexion){
        if(!err){
            let sql = "SELECT DISTINCT v2.VIP_NUMERO, v2.VIP_NOM, v2.VIP_PRENOM, v2.VIP_TEXTE, v.VIP_SEXE, FILM_TITRE, FILM_DATEREALISATION, PHOTO_ADRESSE FROM vip v\n" +
                "JOIN acteur a ON v.VIP_NUMERO = a.VIP_NUMERO\n" +
                "JOIN joue j ON a.VIP_NUMERO = j.VIP_NUMERO\n" +
                "LEFT JOIN film f ON j.FILM_NUMERO = f.film_NUMERO\n" +
                "LEFT JOIN realisateur r ON f.VIP_NUMERO = r.VIP_NUMERO\n" +
                "LEFT JOIN vip v2 ON r.VIP_NUMERO = v2.VIP_NUMERO\n" +
                "LEFT JOIN photo p ON v2.VIP_NUMERO = p.VIP_NUMERO\n" +
                "WHERE v.VIP_NUMERO = ? AND PHOTO_NUMERO = 1 or v2.VIP_NUMERO is null";
            connexion.query(sql,data,callback);
            connexion.release();
        }
    })
};

module.exports.chanteurVip = function(data,callback){
    db.getConnection(function(err,connexion){
        if(!err){
            let sql = "SELECT VIP_SEXE, CHANTEUR_SPECIALITE, ALBUM_TITRE, ALBUM_DATE, MAISONDISQUE_NOM FROM vip v, chanteur c, composer co, album a, maisondisque m\n" +
                "WHERE v.VIP_NUMERO = c.VIP_NUMERO AND c.VIP_NUMERO = co.VIP_NUMERO AND co.ALBUM_NUMERO = a.ALBUM_NUMERO AND a.MAISONDISQUE_NUMERO = m.MAISONDISQUE_NUMERO AND v.VIP_NUMERO = ?";
            connexion.query(sql,data,callback);
            connexion.release();
        }
    })
};

module.exports.mannequinVip = function(data,callback){
    db.getConnection(function(err,connexion){
        if(!err){
            let sql = "SELECT v2.VIP_NUMERO, v2.VIP_NOM, v2.VIP_PRENOM, v2.VIP_TEXTE, DEFILE_LIEU, DEFILE_DATE, AGENCE_NOM, PHOTO_ADRESSE FROM vip v, vip v2, mannequin m, defiledans df, defile d, couturier c, apouragence apa, agence ag, photo p\n" +
                "WHERE v.VIP_NUMERO = m.VIP_NUMERO AND m.VIP_NUMERO = df.VIP_NUMERO AND df.DEFILE_NUMERO = d.DEFILE_NUMERO AND m.VIP_NUMERO = apa.VIP_NUMERO AND apa.AGENCE_NUMERO = ag.AGENCE_NUMERO\n" +
                "AND v2.VIP_NUMERO = c.VIP_NUMERO AND c.VIP_NUMERO = d.VIP_NUMERO AND v2.VIP_NUMERO = p.VIP_NUMERO AND PHOTO_NUMERO = 1 AND v.VIP_NUMERO = ?";
            connexion.query(sql,data,callback);
            connexion.release();
        }
    })
};

module.exports.couturiervip = function(data,callback){
    db.getConnection(function(err,connexion){
        if(!err){
            let sql = "SELECT VIP_SEXE, DEFILE_LIEU, DEFILE_DATE FROM vip v, couturier c, defile d\n" +
                "WHERE v.VIP_NUMERO = c.VIP_NUMERO AND c.VIP_NUMERO = d.VIP_NUMERO\n" +
                "AND v.VIP_NUMERO = ?";
            connexion.query(sql,data,callback);
            connexion.release();
        }
    })
};