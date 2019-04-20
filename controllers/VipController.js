let model = require("../models/vip.js");
let async = require('async');

// ///////////////////////// R E P E R T O I R E    D E S     S T A R S

module.exports.Repertoire = 	function(request, response){
   response.title = 'Répertoire des stars';

   model.liste(function(err,result){
       if(err){
           console.log(err);
           return;
       }
       response.vipLettre = result;
       response.render('repertoireVips', response);
   });
  };

module.exports.Stars = function(request,response){
    response.title= "Répertoire des stars";
    let data = request.params.lettre;
    async.parallel([
        function(callback) {
            model.liste(function(err,result){callback(null,result)});
        },
        function(callback) {
            model.detailsLettre(data,function(err2,result2){callback(err2,result2)});
        },
    ],
        function(err,result){
        if(err){
            console.log(err);
            return;
        }
        response.vipLettre = result[0];
        response.vip = result[1];
        response.render('repertoireVips',response);
        }
    );
};

module.exports.DetailStar = function(request, response){
    response.title = "Détails d'une star";
    let data= request.params.id;
    async.parallel([
        function(callback){
            model.liste(function(err,result){callback(null,result)});
        },
        function(callback){
            model.detailVip(data,function(err2, result2){callback(err2,result2)});
        },
        function(callback){
            model.photosVip(data,function(err3, result3){callback(err3,result3)});
        },
        function(callback){
            model.liaisonVip(data,function(err4,result4){callback(err4,result4)});
        },
        function(callback){
            model.mariageVip(data,function(err5,result5){callback(err5,result5)});
        },
        function(callback){
            model.realisateurVip(data,function(err6,result6){callback(err6,result6)});
        },
        function(callback){
            model.acteurVip(data,function(err7,result7){callback(err7,result7)});
        },
        function(callback){
            model.chanteurVip(data,function(err8,result8){callback(err8,result8)});
        },
        function(callback){
            model.mannequinVip(data,function(err9,result9){callback(err9,result9)});
        },
        function(callback){
            model.couturiervip(data,function(err10,result10){callback(err10,result10)});
        },
    ],
        function(err,result){
        if(err){
            console.log(err);
                return;
        }
        response.vipLettre = result[0];

        response.details1 = result[1][0];

        response.photosVip = result[2];

        response.liaison = result[3];

        response.mariage = result[4];

        response.realisateur = result[5];

        response.acteur = result[6];

        response.chanteur = result[7];

        response.mannequin = result[8];

        response.couturier = result[9];

        response.render('detailVip',response);
        }
    )
};
