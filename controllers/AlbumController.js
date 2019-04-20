let model = require("../models/albumphotosvip");
let async = require('async');

// ////////////////////// L I S T E R     A L B U M S

module.exports.ListerAlbum = 	function(request, response){
   response.title = 'Album des stars';

   model.listePhotosAlbum(function(err,result){
       if(err){
           console.log(err);
           return;
       }
       response.listePhotos = result;
       response.render('listerAlbum', response);
   });
};

module.exports.photoVip = function(request,response){
    response.title = "Album des stars";
    let data = request.params.id;
    async.parallel([
        function(callback){
            model.listePhotosAlbum(function(err,result){callback(err,result)});
        },
        function(callback){
            model.photosVip(data,function(err2,result2){callback(err2,result2)});
        },
    ],
        function(err,result){
        if(err){
            console.log(err);
            return;
        }
        response.listePhotos = result[0];
        response.listePhotosVip = result[1];

        response.render('listerAlbum',response);
        }
    )
}
