var express = require('express');
var app = express();

const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

var cors = require('cors');

var data={};
var id=0;

app.use(express.static('html'));

	
app.post("/annotation", cors(), function(req, res){
	var body = req.body;
	// console.log(body);
	data[id]=body;
	// data.push(body);
	console.log(data);
	id++;
	res.send("Votre commentaire a bien été pris en compte et porte l'identifiant "+(id-1));
});


app.get("/IdAnnot/:Annot", function(req, res){
	// var IdAnnot = req.query.Annot;
	var IdAnnot = req.params.Annot;
	
	
	var Exist=Object.keys(data).includes(IdAnnot);
	
	// var ChoixFormat=req.query.FormatIdAnnot;
	
	// console.log(req);
	
	// console.log(req.headers['accept']);
	
	// if (ChoixFormat=="html"){
		// req.headers['accept']= 'text/html';
	// }
	// else {
		// if (ChoixFormat=="json"){
			// req.headers['accept']=  'application/json';
		// }	
	// }
	
	// console.log(req.headers['accept']);
	
	res.format ({
		   'text/html': function() {
			    res.setHeader('Content-Type', 'text/html');
			    if (Exist){
					res.setHeader('Content-Type', 'text/html');
				    res.send("<!DOCTYPE html><html lang='fr'><head><meta charset='UTF-8'/><title>Titre</title></head><body><div>"+JSON.stringify(data[IdAnnot])+
							"</div></body></html>"); 
			    }
			    else {
				   res.send("aucune annotation n'est associée à cette clé");
			    }
		   },

		   'application/json': function() {
			    res.setHeader('Content-Type', 'application/json');
			    if (Exist){
				    res.send(data[IdAnnot]); 
			    }
			    else {
				   res.send("aucune annotation n'est associée à cette clé");
			    }
			}
	});
	
});




// app.get("/AllAnnot", function(req, res){
	
	// res.format ({
		   // 'text/html': function() {
				// res.setHeader('Content-Type', 'text/html');
				// res.send("<!DOCTYPE html><html lang='fr'><head><meta charset='UTF-8'/><title>Titre</title></head><body><div>"+JSON.stringify(data)+
						// "</div></body></html>"); 
		   // },

		   // 'application/json': function() {
			    // res.setHeader('application/json');
				// res.send(data); 
			// }
	// });
	
	// var ChoixFormat=req.query.FormatAllAnnot;
	
	
	// if (ChoixFormat=="html"){
		// req.headers['accept']= 'text/html';
	// }
	// else {
		// if (ChoixFormat=="json"){
			// req.headers['accept']=  'application/json';
		// }	
	// }
		
	// res.format ({
		   // 'text/html': function() {
			    // res.setHeader('Content-Type', 'text/html');
				// res.send("<!DOCTYPE html><html lang='fr'><head><meta charset='UTF-8'/><title>Titre</title></head><body><div>"+JSON.stringify(data)+
						// "</div></body></html>"); 
		   // },

		   // 'application/json': function() {
			  // res.setHeader('application/json');
			  // res.send(data);
			// }
	// });
	
// });


app.get("/URI", function(req, res){
	var IdURI = req.query.AnnotURI;
	// var IdURI = req.params.AnnotURI;
	console.log(IdURI);
	
	var ChoixFormat=req.query.FormatAnnotURI;
	
	if (ChoixFormat=="html"){
		req.headers['accept']= 'text/html';
	}
	else {
		if (ChoixFormat=="json"){
			req.headers['accept']=  'application/json';
		}	
	}
	
	if (IdURI=="AllInfo"){
		res.format ({
		   'text/html': function() {
				res.setHeader('Content-Type', 'text/html');
				res.send("<!DOCTYPE html><html lang='fr'><head><meta charset='UTF-8'/><title>Titre</title></head><body><div>"+JSON.stringify(data)+
						"</div></body></html>"); 
		   },

		   'application/json': function() {
			    res.setHeader('Content-Type','application/json');
				res.send(data); 
			}
		});
	}else {
	
		var tabRep=[];
		
		for (key in data){
			// console.log(key);
			if (data[key]["URI"]==IdURI){
				tabRep.push({"IdAnnotation" : key, "Commentaire" : data[key]["Commentaire"]});
			}
		}
		
		console.log(tabRep);
		
		// res.format ({
			   // 'text/html': function() {
					// res.setHeader('Content-Type', 'text/html');
					// res.send("<!DOCTYPE html><html lang='fr'><head><meta charset='UTF-8'/><title>Titre</title></head><body><div>"+JSON.stringify(tabRep)+
							// "</div></body></html>"); 
			   // },

			   // 'application/json': function() {
					// res.send(tabRep); 
				// }
		// });
			
		res.format ({
			   'text/html': function() {
					res.setHeader('Content-Type', 'text/html');
					res.send("<!DOCTYPE html><html lang='fr'><head><meta charset='UTF-8'/><title>Titre</title></head><body><div>"+JSON.stringify(tabRep)+
							"</div></body></html>"); 
			   },

			   'application/json': function() {
					res.setHeader('Content-Type','application/json');
					res.send(tabRep); 
				}
		});
	
	}
	
});





app.listen(port, function(){
	console.log('serveur listening on port : '+port);
});