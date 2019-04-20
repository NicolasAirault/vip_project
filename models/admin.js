let db = require('../configDb');


module.exports.checkLog = function(login,callback){
    db.getConnection(function(err,connexion){
        if(!err){
            let sql="SELECT login, passwd FROM parametres WHERE login = '"+login+"'";
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};

module.exports.getAllNatio = function(callback){
    db.getConnection(function(err,connexion){
        if(!err){
            let sql="SELECT NATIONALITE_NUMERO, NATIONALITE_NOM FROM nationalite";
            connexion.query(sql,callback);
            connexion.release();
        }
    })
};

module.exports.getAllMaisonDisque = function(callback){
    db.getConnection(function(err,connexion){
        if(!err){
            let sql="SELECT MAISONDISQUE_NUMERO, MAISONDISQUE_NOM FROM maisondisque";
            connexion.query(sql,callback);
            connexion.release();
        }
    })
};

module.exports.getAllNomFilm = function(callback){
    db.getConnection(function(err,connexion){
        if(!err){
            let sql="SELECT film_NUMERO, FILM_TITRE FROM film";
            connexion.query(sql,callback);
            connexion.release();
        }
    })
};

module.exports.getAllFIlmSansReal = function(callback){
    db.getConnection(function(err,connexion){
        if(!err){
            let sql="SELECT film_NUMERO, FILM_TITRE FROM film WHERE VIP_NUMERO is NULL";
            connexion.query(sql,callback);
            connexion.release();

        }
    })
};

module.exports.getAllAgenceMannequin = function(callback){
    db.getConnection(function(err,connexion){
        if(!err){
            let sql="SELECT AGENCE_NUMERO, AGENCE_NOM FROM agence";
            connexion.query(sql,callback);
            connexion.release();
        }
    })
};

module.exports.getAllDefile = function(callback){
    db.getConnection(function(err,connexion){
        if(!err){
            let sql="SELECT DEFILE_NUMERO, DEFILE_LIEU FROM defile";
            connexion.query(sql,callback);
            connexion.release();
        }
    })
}

module.exports.getListVip = function(callback){
    db.getConnection(function(err,connexion){
        if(!err){
            let sql="SELECT VIP_NOM, VIP_PRENOM, VIP_NUMERO FROM vip";
            connexion.query(sql,callback);
            connexion.release();
        }
    })
};

module.exports.getAllVip = function(callback){
    db.getConnection(function(err,connexion){
        if(!err){
            let sql="SELECT DISTINCT v.VIP_NUMERO, VIP_NOM, VIP_PRENOM, MAX(PHOTO_NUMERO) as photo_num FROM vip v JOIN photo p ON v.VIP_NUMERO = p.VIP_NUMERO GROUP BY v.VIP_NUMERO DESC ";
            connexion.query(sql,callback);
            connexion.release();
        }
    })
};

module.exports.getIdNewVip = function(callback){
    db.getConnection(function(err,connexion){
        if(!err){
            let sql="SELECT AUTO_INCREMENT\n" +
                "FROM information_schema.tables\n" +
                "WHERE table_name = 'vip'";
            connexion.query(sql,callback);
            connexion.release();
        }
    })
};

module.exports.getIdNewAlbum = function(callback){
    db.getConnection(function(err,connexion){
        if(!err){
            let sql="SELECT AUTO_INCREMENT\n" +
                "FROM information_schema.tables\n" +
                "WHERE table_name = 'album'";
            connexion.query(sql,callback);
            connexion.release();
        }
    })
};

module.exports.addVip = function(nomVip,prenomVip,sexeVip,dateVip,natioVip, comVip,callback){
  db.getConnection(function(err,connexion){
      if(!err){
          let sql="INSERT INTO vip SET NATIONALITE_NUMERO = " + natioVip + ", VIP_NOM = '" + nomVip + "', VIP_PRENOM = '" + prenomVip + "', VIP_SEXE = '" + sexeVip + "', VIP_NAISSANCE = '" + dateVip + "', VIP_TEXTE = '" + comVip + "', VIP_DATE_INSERTION = CAST(NOW() AS DATETIME);";
          connexion.query(sql,callback);
          connexion.release();
      }
  })
};

module.exports.addChanteur = function(idVip, idAlbum, specialite,album,maisondisque,callback){
    db.getConnection(function(err,connexion){
        if(!err){
            let sql="INSERT INTO chanteur SET VIP_NUMERO = " + idVip + ", CHANTEUR_SPECIALITE = '" + specialite + "';";
             sql += "INSERT INTO album SET MAISONDISQUE_NUMERO = " + maisondisque + ", ALBUM_TITRE = '" + album + "', ALBUM_DATE = NOW();";
             sql += "INSERT INTO composer SET ALBUM_NUMERO = " + idAlbum + ", VIP_NUMERO = " + idVip + ";";

             connexion.query(sql,callback);
             connexion.release();
        }
    })
};

module.exports.addActeur = function(idVip, filmNum, role, datedebut, callback){
    db.getConnection(function(err,connexion){
        if(!err){
            let sql="INSERT INTO joue SET FILM_NUMERO = " + filmNum + ", VIP_NUMERO = " + idVip + ", ROLE_NOM = '" + role + "';";
             sql += "INSERT INTO acteur SET VIP_NUMERO= " + idVip + ", ACTEUR_DATEDEBUT = CAST(" + datedebut + " AS DATETIME) ;";
            connexion.query(sql,callback);
            connexion.release();
        }
    })
};

module.exports.addCouturier = function(idVip,nomdefile, datedefile, callback){
    db.getConnection(function(err,connexion){
        if(!err){
            let sql="INSERT INTO couturier SET VIP_NUMERO = " + idVip + ";";
             sql += "INSERT INTO defile SET VIP_NUMERO = " + idVip + ", DEFILE_LIEU = '" + nomdefile + "', DEFILE_DATE = CAST(" + datedefile + " AS DATETIME);";

            connexion.query(sql,callback);
            connexion.release();
        }
    })
};

module.exports.addMannequin = function(idVip, taille, agence, defile, callback){
    db.getConnection(function(err,connexion){
        if(!err){
            let sql="INSERT INTO mannequin SET VIP_NUMERO = " + idVip + ", MANNEQUIN_TAILLE = " + taille + ";";
             sql += "INSERT INTO apouragence SET AGENCE_NUMERO = " + agence + ", VIP_NUMERO = " + idVip + ";";
             sql += "INSERT INTO defiledans SET DEFILE_NUMERO = " + defile + ", VIP_NUMERO = " + idVip + ";";

             connexion.query(sql,callback);
             connexion.release();
        }
    })
};

module.exports.addRealisateur = function(idVip, film, callback){
    db.getConnection(function(err,connexion){
        if(!err){
            let sql="INSERT INTO realisateur SET VIP_NUMERO = " + idVip + ";";
             sql += "UPDATE film SET VIP_NUMERO = " + idVip + " WHERE film_NUMERO = " + film + ";";

            connexion.query(sql,callback);
            connexion.release();
        }
    })
};

module.exports.SupprVip = function(numVip,callback){
    db.getConnection(function(err,connexion){
        if(!err){
            let sql = "UPDATE defile SET VIP_NUMERO = NULL WHERE VIP_NUMERO = " + numVip + "; ";
            sql += "DELETE FROM couturier WHERE VIP_NUMERO = " + numVip + "; ";

            sql += "DELETE FROM defiledans WHERE VIP_NUMERO = " + numVip + "; ";
            sql += "DELETE FROM apouragence WHERE VIP_NUMERO = " + numVip + "; ";
            sql += "DELETE FROM mannequin WHERE VIP_NUMERO = " + numVip + "; ";

            sql += "UPDATE film SET VIP_NUMERO = NULL WHERE VIP_NUMERO = " + numVip + "; ";
            sql += "DELETE FROM realisateur WHERE VIP_NUMERO = " + numVip + "; ";

            sql += "DELETE FROM joue WHERE VIP_NUMERO = " + numVip + "; ";
            sql += "DELETE FROM acteur WHERE VIP_NUMERO = " + numVip + "; ";

            sql += "DELETE FROM composer WHERE VIP_NUMERO = " + numVip + "; ";
            sql += "DELETE FROM chanteur WHERE VIP_NUMERO = " + numVip + "; ";

            sql += "DELETE FROM mariage WHERE VIP_NUMERO = " + numVip + "; ";
            sql += "DELETE FROM mariage WHERE VIP_VIP_NUMERO = " + numVip + "; ";

            sql += "DELETE FROM liaison WHERE VIP_NUMERO = " + numVip + "; ";
            sql += "DELETE FROM liaison WHERE VIP_VIP_NUMERO = " + numVip + "; ";

            sql += "DELETE FROM photo WHERE VIP_NUMERO = " + numVip + "; ";

            sql += "DELETE FROM vip WHERE VIP_NUMERO = " + numVip + "; ";

            connexion.query(sql,callback);
            connexion.release();
        }
    })
};

module.exports.ajouterPhoto = function(numVip, titrePhoto, adr_photo, comment_photo, photo_num, callback){
    db.getConnection(function(err,connexion){
        if(!err){
            let sql="INSERT INTO photo SET VIP_NUMERO = " + numVip + ", PHOTO_SUJET = '" + titrePhoto +"' , PHOTO_COMMENTAIRE = '" + comment_photo + "', PHOTO_ADRESSE = '" + adr_photo + "', PHOTO_NUMERO = " + photo_num + ";";
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};

module.exports.supprimerPhoto = function(numVip,titrePhoto,callback){
    db.getConnection(function(err,connexion){
        if(!err){
            let sql ="DELETE FROM photo WHERE VIP_NUMERO = " + numVip +" AND PHOTO_SUJET = '" + titrePhoto + "';";
            connexion.query(sql,callback);
            connexion.release();
        }
    });
};

module.exports.getPhotoWithId = function(numVip, callback){
  db.getConnection(function(err,connexion){
      if(!err){
          let sql = "SELECT VIP_NUMERO, PHOTO_SUJET FROM photo WHERE VIP_NUMERO = " + numVip + " AND PHOTO_NUMERO <> 1";
          connexion.query(sql,callback);
          connexion.release();
      }
  })
};
