let async = require('async');

let model = require("../models/admin.js");

let Cryptr = require('cryptr');
let cryptr = new Cryptr('MaSuperCléDeChiffrementDeouF'); // clé de chiffrement. Ne pas la modifier

let formidable = require('formidable'); //Module permettant de transferer les images
let form = new formidable.IncomingForm();
form.encoding = "utf-8";
form.uploadDir ="./public/images/vip";
form.keepExtension = true;

let fs = require('fs-extra'); //Module permettant de gérer plusieurs extensions non présente dans NJS natif

module.exports.connexion = function(request, response){
    response.title = "Connexion à l'administration";
    request.session.logged = false;
    request.session.admin = "";
    response.render('connect',response);
};

module.exports.home = function(request,response){
    response.title = "Administration";
    response.render('home',response);
};

module.exports.connected = function(request,response){
    response.title = "Administration";
    let data1 = request.body.login;
    let data2 = request.body.pswd;
    model.checkLog(data1,function(err,result){
        if(err) {
            console.log(err);
            return;
        }
        if(result !== ""){
            let decrypted = cryptr.decrypt(result[0]['passwd']);
            if(decrypted === data2){
                response.isLogged = result;
                response.render('home',response);
                request.session.logged = true;
                request.session.admin = data1;
            }else{
                response.render('badLog',response);
            }
        }else{
            response.render('badLog',response);
        }

    })
};

module.exports.ajoutVip = function(request,response){
    response.title = "Ajout d'un VIP";
    async.parallel([
        function(callback){
            model.getAllNatio(function(err,result){callback(err,result)});
        },
        function(callback){
            model.getAllMaisonDisque(function(err2,result2){callback(err2,result2)});
        },
        function(callback){
            model.getAllNomFilm(function(err3,result3){callback(err3,result3)});
        },
        function(callback){
            model.getAllFIlmSansReal(function(err4,result4){callback(err4,result4)});
        },
        function(callback){
            model.getAllAgenceMannequin(function(err5,result5){callback(err5,result5)});
        },
        function(callback){
            model.getAllDefile(function(err6,result6){callback(err6,result6)});
        },
        function(callback){
            model.getIdNewVip(function(err7,result7){callback(err7,result7)});
        },
        function(callback){
            model.getIdNewAlbum(function(err8,result8){callback(err8,result8)});
        },
    ],
       function(err,result){
        if(err){
            console.log(err);
            return;
        }
        response.natio = result[0];
        response.maisonDisque = result[1];
        response.nomFilm1 = result[2];
        response.nomFilm2 = result[3];
        response.agenceMannequin = result[4];
        response.defile = result[5];
        response.idVip = result[6];
        response.idAlbum = result[7];

        response.render('ajouterVip',response);
       }
    );
};

module.exports.ajoutVipValid = function(request,response){
    response.title = "Ajout d'un nouveau VIP";

    form.parse(request,function(err,fields,files){
        let oldpath = files.imgVip.path;
        let newpath = "public\\images\\vip\\"+ files.imgVip.name;
        fs.copy(oldpath,newpath,function(err){
            if(err){
                throw err;
            }
        });

        let titre_photo = fields.nomVip + "1";
        let adr_photo = files.imgVip.name;
        let comment_photo = "";

        let idvip = fields.idVip;
        let idAlbum = fields.idAlbum;
        let nomVip = fields.nomVip;
        let prenomVip = fields.prenomVip;
        let sexeVip = fields.sexeVip;
        let dateVip = fields.naissanceVip;
        let natioVip = fields.natioVip;
        let comVip = fields.commentVip;

        let checkActeur = fields.pro_acteur;
        let checkChanteur = fields.pro_chanteur;
        let checkCouturier = fields.pro_couturier;
        let checkRealisateur = fields.pro_realisateur;
        let checkMannequin = fields.pro_mannequin;

        let dateacteur = fields.dateDebutActeur;
        let idfilm = fields.nomFilm;
        let role = fields.roleVip;
        let specialite = fields.specialite;
        let nomalbum = fields.album;
        let maisondisque = fields.idMaisonDisque;
        let nomdefile = fields.nomDefile;
        let datedefile = fields.dateDefile;
        let taille = fields.tailleVip;
        let agence = fields.nomAgence;
        let defileId = fields.defileA;
        let filmReal = fields.nomFilmReal;


        model.addVip(nomVip,prenomVip,sexeVip,dateVip,natioVip,comVip,function(err){
            if(err){
                console.log(err);
                return;
            }
            console.log("done addvip");
        });
        model.ajouterPhoto(idvip,titre_photo,adr_photo,comment_photo,1,function(err){
            if(err){
                console.log(err);
                return;
            }
            console.log("addPhoto");
        });

        if(checkChanteur == "check"){
            model.addChanteur(idvip, idAlbum, specialite, nomalbum, maisondisque, function(err){
                if(err){
                    console.log(err);
                    return;
                }
            });
        }else{
            console.log("done sing");
        }
        if(checkActeur == "check"){
            model.addActeur(idvip, idfilm, role, dateacteur, function(err){
                if(err){
                    console.log(err);
                    return;
                }
            });
        }else{
            console.log("done actor");
        }
        if(checkRealisateur == "check"){
            model.addRealisateur(idvip, filmReal, function(err){
                if(err){
                    console.log(err);
                    return;
                }
            });
        }else{
            console.log("done real")
        }
        if(checkMannequin == "check"){
            model.addMannequin(idvip, taille, agence, defileId, function(err){
                if(err){
                    console.log(err);
                    return;
                }
            });
        }else{
            console.log("done mann");
        }
        if(checkCouturier == "check"){
            model.addCouturier(idvip,nomdefile,datedefile, function(err){
                if(err){
                    console.log(err);
                    return;
                }
            });
        }else{
            console.log("done coutu");
        }

        response.checkAddVip = true;
        console.log("FINISH");
        response.render('validation');
    });
};

module.exports.modifierVip = function(request,response){
    response.title="Modifier un Vip";
    response.render('modifierVip',response);
};

module.exports.supprimerVip = function(request,response){
    response.title="Supprimer un Vip";
    async.parallel([
        function(callback){
            model.getListVip(function(err,result){callback(err,result)});
        },
    ],
        function(err,result) {
            if (err) {
                console.log(err);
                return;
            }
            response.listeDelVip = result[0];
            response.render('supprimerVip',response);
        }
    );
};

module.exports.delVip = function(request,response){
    response.title = "Supprimer un Vip";
    let numvip = request.body.listeVip;
    async.parallel([
        function(callback){
            model.SupprVip(numvip, function(err,result){callback(err,result)});
        },
    ],
        function(err,result){
            if(err){
                console.log(err);
                return;
            }
            result.checkDelVip = true;
            response.render("validation",response);
        }
    );
};

module.exports.newPhoto = function(request,response){
    response.title = "Ajout d'une photo";
    async.parallel([
        function(callback){
            model.getAllVip(function(err,result){callback(err,result)});
        },
    ],
        function(err,result){
        if(err){
            console.log(err);
            return;
        }
        response.vips = result[0];
        response.render('AjouterPhoto',response);
        }
    );
};

module.exports.ajoutPhoto = function(request,response){
    response.title = "Ajout d'une photo";
    form.parse(request, function(err, fields, files) {
        let oldpath = files.photoAdd.path;
        let newpath = "public\\images\\vip\\" + files.photoAdd.name;
        fs.copy(oldpath,newpath,function(err){
            if(err){
                throw err;
            }
        });
        let numVip = fields.numVip;
        numVip = numVip.split(' ');
        numVip[1] = parseInt(numVip[1]) +1 ;
        let titrePhoto = fields.titrePhoto;
        let adr_photo = files.photoAdd.name;
        let comment_photo = fields.commentPhoto;
        async.parallel([
                function(callback){
                    model.ajouterPhoto(numVip[0],titrePhoto,adr_photo,comment_photo, numVip[1],function(err,result){callback(err,result)});
                },
            ],
            function(err){
                if(err){
                    console.log(err);
                    return;
                }
                response.checkAddPhoto = true;

                response.render('validation',response);
            }
        );
    });
};

module.exports.choixVipDelPhoto = function(request,response){
    response.title = "Supprimer une photo";

    async.parallel([
            function(callback){
                model.getAllVip(function(err,result){callback(err,result)});
            },
        ],
        function(err,result){
            if(err){
                console.log(err);
                return;
            }
            response.vips = result[0];
            console.log(result[0]);
            response.render('choixVipDelPhoto',response);
        }
    );
};

module.exports.delPhoto = function(request,response){
    response.title = "Supprimer une photo";
    let id = request.body.numVip;
    async.parallel([
        function(callback){
            model.getAllVip(function(err,result){callback(err,result)});
        },
        function(callback){
            model.getPhotoWithId(id,function(err2,result2){callback(err2,result2)});
        },
    ],
        function(err,result){
        if(err){
            console.log(err);
            return;
        }
        response.vips = result[0];
        response.photos = result[1];
        console.log(result[1]);
        response.render('delPhoto',response);
        }
    );
};

module.exports.valDelPhoto = function(request,response){
    response.title = "Supprimer une photo";
    let nomPhoto = request.body.nomPhoto;
    let idvip = request.body.idvip;
    async.parallel([
        function(callback){
        model.supprimerPhoto(idvip,nomPhoto,function(err,result){callback(err,result)});
        },
    ],
        function(err,result){
        if(err){
            console.log(err);
            return;
        }
        response.checkDelPhoto = true;
        response.render('validation',response);
        }
    );
};