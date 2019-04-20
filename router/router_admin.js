let AdminController = require('./../controllers/AdminController');
let HomeController = require('./../controllers/HomeController');

module.exports = function(app){
    app.get('/',AdminController.connexion);
    app.get('/administration',AdminController.connexion);

    app.get('/home',AdminController.home);

    app.post('/accueil',AdminController.connected);

    app.get('/vips',AdminController.ajoutVip);
    app.get('/ajouterVip',AdminController.ajoutVip);
    app.post('/ajouterVip/conf',AdminController.ajoutVipValid);
    app.get('/modifierVip',AdminController.modifierVip);
    app.get('/supprimerVip',AdminController.supprimerVip);
    app.post('/supprimerVip/del',AdminController.delVip);

    app.get('/photos',AdminController.newPhoto);
    app.get('/ajouterPhoto',AdminController.newPhoto);
    app.post('/ajouterPhoto/add',AdminController.ajoutPhoto);
    app.get('/supprimerPhoto',AdminController.choixVipDelPhoto);
    app.post('/supprimerPhoto/del', AdminController.delPhoto);
    app.post('/supprimerPhoto/del/conf',AdminController.valDelPhoto);

    app.get('*',HomeController.NotFound);
    app.post('*',HomeController.NotFound);
};