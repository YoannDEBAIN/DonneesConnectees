//REQUIRE

var express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

// VARIABLE
const port = process.env.PORT || 3000;
var data={};
var id_commentaire=0;
var app = express();


//APP USE

app.use(express.static('html'));

app.use((req, res, next)=>{
	res.header('Access-Control-Allow-Origin', '*');
	// res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
	res.header('Access-Control-Allow-Methods', 'POST');
	// res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-length, X-Requested-With');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.use(bodyParser.json());


	
app.post("/ajout_commentaire", cors(), function(req, res){
	var body = req.body;
	data[id_commentaire]=body;
	console.log(data);
	id_commentaire++;
	res.send("Votre commentaire a bien été pris en compte et porte l'identifiant "+(id_commentaire-1));
});


app.get("/acces_commentaire/:id_commentaire_a_acceder", function(req, res){
	
	var id_commentaire_a_acceder = req.params.id_commentaire_a_acceder;
	var Exist=Object.keys(data).includes(id_commentaire_a_acceder);

	res.format ({
		   'text/html': function() {
			    res.setHeader('Content-Type', 'text/html');
			    if (Exist){
					res.setHeader('Content-Type', 'text/html');
				    res.send("<!DOCTYPE html><html><head><meta charset='UTF-8'/><title>Titre</title></head><body><div>"+JSON.stringify(data[id_commentaire_a_acceder])+
							"</div></body></html>"); 
			    }
			    else {
				   res.send("<!DOCTYPE html><html><head><meta charset='UTF-8'/><title>Titre</title></head><body><p>aucune annotation n'est associée à cette clé</p></body></html>");
			    }
		   },
		   'application/json': function() {
			    res.setHeader('Content-Type', 'application/json');
			    if (Exist){
				    res.send(data[id_commentaire_a_acceder]); 
			    }
			    else {
				   res.send({"erreur" : "aucune annotation n'est associée à cette clé"});
			    }
			}
	});
	
});




app.get("/commentaires_de_uri", function(req, res){
	
	var uri_extrac_commentaires = req.query.uri_extrac_commentaires;
	var format_reponse_commentaire_de_uri=req.query.format_reponse_commentaire_de_uri;
	
	if (format_reponse_commentaire_de_uri=="html"){
		req.headers['accept']= 'text/html';
	}
	else {
		if (format_reponse_commentaire_de_uri=="json"){
			req.headers['accept']=  'application/json';
		}	
	}
	
	if (uri_extrac_commentaires=="tous"){
		res.format ({
		   'text/html': function() {
				res.setHeader('Content-Type', 'text/html');
				res.send("<!DOCTYPE html><html><head><meta charset='UTF-8'/><title>Titre</title></head><body><div>"+JSON.stringify(data)+
						"</div></body></html>"); 
		   },

		   'application/json': function() {
			    res.setHeader('Content-Type','application/json');
				res.send(data); 
			}
		});
	}else {
	
		var liste_commentaires=[];
		
		for (key in data){
			if (data[key]["URI"]==uri_extrac_commentaires){
				liste_commentaires.push({"IdAnnotation" : key, "Commentaire" : data[key]["Commentaire"]});
			}
		}

		res.format ({
			   'text/html': function() {
					res.setHeader('Content-Type', 'text/html');
					res.send("<!DOCTYPE html><html><head><meta charset='UTF-8'/><title>Titre</title></head><body><div>"+JSON.stringify(liste_commentaires)+
							"</div></body></html>"); 
			   },

			   'application/json': function() {
					res.setHeader('Content-Type','application/json');
					res.send(liste_commentaires); 
				}
		});
	
	}
	
});





app.listen(port, function(){
	console.log('serveur listening on port : '+port);
});