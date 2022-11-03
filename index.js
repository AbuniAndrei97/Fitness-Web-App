const express=require('express');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const {Client} = require('pg');
var app=express();

const client = new Client({
	host: 'localhost',
	user: 'andrei',
	password: 'andrei',
	database: 'postgres',
	port:5432
})
client.connect()


app.set("view engine", "ejs");
console.log("Proiectul se afla la ", __dirname,)
app.use("/resurse",express.static(__dirname+"/resurse"));


function verificaImagini(){
	var textFisier=fs.readFileSync("resurse/json/galerie.json");
	var jsi=JSON.parse(textFisier);
	var caleGalerie=jsi.cale_galerie;
	vectImagini=[]
	for (let im of jsi.imagini){
		var imVeche= path.join(caleGalerie, im.cale_fisier);
		var ext = path.extname(im.cale_fisier);
		var numeFisier =path.basename(im.cale_fisier,ext)
		let imNoua=path.join(caleGalerie+"/mic/", numeFisier+"-mic"+".webp");
		//console.log(imNoua);
		//vectImagini.push({mare:imVeche, mic:imNoua, text_descriere:im.text_descriere});
		var luna = new Date().getMonth();
		if((luna == 11 || luna == 0 || luna == 1) && im.anotimp == "iarna")
      		vectImagini.push({mare:imVeche, mic:imNoua, text_descriere:im.text_descriere});
    	else if((luna == 2 || luna == 3 || luna == 4) && im.anotimp == "primavara")
     		 vectImagini.push({mare:imVeche, mic:imNoua, text_descriere:im.text_descriere});
    	else if((luna == 5 || luna == 6 || luna == 7) && im.anotimp == "vara")
     		 vectImagini.push({mare:imVeche, mic:imNoua, text_descriere:im.text_descriere});
    	else if((luna == 8 || luna == 9 || luna == 10) && im.anotimp == "toamna")
     		 vectImagini.push({mare:imVeche, mic:imNoua, text_descriere:im.text_descriere});
		
		if (!fs.existsSync(imNoua))
			sharp(imVeche)
		.resize(150)
		.toFile(imNoua, function(err){
			if(err)
				console.log("eroare conversie",imVeche, "->", imNoua, err);
		});
	}
	return vectImagini;
}


app.get(["/","/index"], function(req,res){
	/*res.setHeader("Content-type", "text/html")
	console.log("salut 1");
	res.write("<!DOCTYPE html><html><head><title>Node!!</title></head><body><p style='color:red;'>Salut</p>");
	res.write("</body></html>");
	res.end();*/

	let vectImagini=verificaImagini()
	res.render("pagini/index",{imagini:vectImagini, ip: req.ip});
});


app.get("/data", function(req, res){
	res.setHeader("Content-type", "text/html")
	res.write("<!DOCTYPE html><html><head><title>Node!!</title></head><body>"+new Date() +"</body></html>");
});

app.get("/produse", function(req, res){
	console.log("Url:",req.url);
	console.log("Query:",req.query.categ);
	var conditie= req.query.categ ? " where categorie='"+req.query.categ+"'" : "";
	console.log("select * from produse"+conditie);
	const rezultat= client.query("select * from produse"+conditie, function(err,rez){
	//console.log(err, rez);
	console.log(rez.rows);
	res.render("pagini/produse",{produse:rez.rows});


});
	
});


app.get("/produs/:id_produs", function(req, res){
	console.log(req.params);
	const rezultat= client.query("select * from produse where id="+req.params.id_produs, function(err,rez){
	//console.log(err, rez);
	console.log(rez.rows);
	res.render("pagini/produs",{prod:rez.rows[0]});


});
	
});





function myFunction() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}





app.get("/*", function(req, res){
	console.log(req.url);
	res.render("pagini/produse"+req.url, function(err,rezultatRender){;
		if (err){
			if (err.message.includes("Failed to lookup view")){
				res.status(404).render("pagini/404")
			}
			else
				throw err;
		}
		else
			res.send(rezultatRender);
	});

});


console.log("salut 2");
app.listen(8080);
console.log("A pornit serverul.")
verificaImagini();






