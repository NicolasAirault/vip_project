let model = require("../models/articlesvip.js");
let async = require('async');

module.exports.Repertoire = function(request, response){
    response.title = 'Répertoire des articles';
    model.listeVips(function(err,result){
        if(err){
            console.log(err);
            return;
        }
        response.VIP = result;
        response.render('articlesVip',response);
    })
};

module.exports.Articles = function(request,response){
    response.title = "Articles de presse";
    let data = request.params.id;
    async.parallel([
        function(callback){
            model.listeVips(function(err,result){callback(err,result)});
        },
        function(callback){
            model.listeArticles(data,function(err2,result2){callback(err2,result2)});
        },
    ],
        function(err,result){
        if(err){
            console.log(err);
            return;
        }
        response.VIP = result[0];
        response.articles = result[1];
        response.render('articlesVip',response);
        }
    )
};