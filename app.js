let express         = require('express'),
    session         = require('express-session'),
    cookieParser    = require('cookie-parser'),
    bodyParser      = require('body-parser'), //pour récupérer les résultats des post
    http            = require('http'),
    path            = require('path');

let app = express();
let admin_app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('port', 6800);
app.set('views', path.join(__dirname, 'views'));

admin_app.use(bodyParser.urlencoded({extended: true}));
admin_app.set('port',6888);
admin_app.set('views',path.join(__dirname,'view_admin'));

// routes static, le routeur n'y aura pas accès
app.use(express.static(path.join(__dirname, '/public')));
admin_app.use(express.static(path.join(__dirname,'/public')));

app.use(cookieParser());
admin_app.use(cookieParser());

app.use(session({
    secret: 'nC0@#1pM/-0qA1+é',
    name: 'VipNode',
    resave: true,
    saveUninitialized: true
}));

admin_app.use(session({
    secret: 'nC0@#1pM/-0qA1+è',
    name: 'VipNodeAdmin',
    resave: true,
    saveUninitialized: true
}));

/* ces lignes permettent d'utiliser directement les variables de session dans handlebars
 UTILISATION : {{session.MaVariable}}  */
app.use(function(request, response, next){
    response.locals.session = request.session;
    next();
});

admin_app.use(function(request,response,next){
    response.locals.session = request.session;
    next();
});

let exphbs = require('express-handlebars');

app.set('view engine', 'handlebars'); //nom de l'extension des fichiers
admin_app.set('view engine','handlebars');

let handlebars  = require('./helpers/handlebars.js')(exphbs); //emplacement des helpers
let handlebarsAdmin = require('./helpers/handlebarsAdmin.js')(exphbs);
// helpers : extensions d'handlebars

app.engine('handlebars', handlebars.engine);
admin_app.engine('handlebars', handlebarsAdmin.engine);


// chargement du routeur
require('./router/router')(app);
require('./router/router_admin')(admin_app);


http.createServer(app).listen(app.get('port'), function(){
    console.log('Serveur Node.js en attente sur le port ' + app.get('port'));
});

http.createServer(admin_app).listen(admin_app.get('port'),function(){
    console.log('Serveur admin en attente sur le port ' + admin_app.get('port'));
});
