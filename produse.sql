CREATE DATABASE db_test ENCODING 'UTF-8' LC_COLLATE 'ro-RO-x-icu' LC_TYPE 'ro_RO' TEMPLATE template0;

CREATE USER 'andrei' WITH ENCRYPTED PASSWORD 'andrei';
GRANT ALL PRIVILEGES ON DATABASE proiecttw TO andrei
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO andrei;

CREATE TYPE scop_produs AS ENUM('slabit', 'muschi', 'reabilitare', 'energie', 'mentinere');
CREATE TYPE categorie_produs AS ENUM('mancare', 'bautura', 'accesorii');

CREATE TABLE IF NOT EXISTS produse(
	id serial PRIMARY KEY,
	nume VARCHAR(50) UNIQUE NOT NULL,
	descriere TEXT,
	pret NUMERIC(8,2) NOT NULL,
	gramaj INT NOT NULL CHECK (gramaj>0),
	calorii INT NOT NULL CHECK (calorii>=0),
	categorie categorie_produs DEFAULT 'mancare',
	scop scop_produs NOT NULL, 
	preparat_deja BOOLEAN NOT NULL DEFAULT FALSE,
	imagine VARCHAR(300),
	ingrediente VARCHAR [],
	data_adaugare TIMESTAMP DEFAULT current_timestamp
);

INSERT into produse(nume,descriere,pret,gramaj,calorii,categorie,scop,preparat_deja,imagine, ingrediente) VALUES
('Grenade','baton cu ciocolata',8,250,200,'mancare','energie',True,'grenade.png','{"lapte","ciocolata"}'),
('Bautura Capsuni','bautura foarte dulce',6,500,230,'bautura','slabit',True,'bautura-capsuni.png','{"capsuni","calciu"}'),
('Manusi Box','manusi rosii de box',50,200,0,'accesorii','muschi',True,'manusi-box.png','{}'),
('Shaker Verde','shaker verde pentru bauturi',120,55,0,'accesorii','energie',True,'shaker-verde.png','{}'),
('Baton cu ciocolata','baton care contine foarte multa ciocolata',9,50,240,'mancare','mentinere',True,'baton-ciocolata.png','{"lapte","ciocolata"}'),
('Shaker Fosforescent','shaker care straluceste in intuneric',170,100,0,'accesorii','energie',True,'shaker-fosforescent.png','{}'),
('Creatina','pudra pentru muschi, necesita preparare',210,700,300,'mancare','reabilitare',False,'creatina.png','{"fosfor","potasiu"}'),
('Muscle Protein','necesita preparare cu lapte',260,500,450,'mancare','muschi',False,'muscle-protein.png','{"vitamine","sodiu"}'),
('Baton Visine','baton cu visine',4,90,190,'mancare','slabit',True,'baton-visine.png','{"lapte","visine"}'),
('Manusi Fitness','manusi pentru exercitii fitness',300,600,0,'accesorii','reabilitare',True,'manusi-fitness.png','{}'),
('Apa Plata','apa plata, merge bine dupa antrenament',4,500,0,'bautura','slabit',True,'apa-plata.png','{}'),
('Apa Minerala','apa minerala, aveti grija la acid',6,500,0,'bautura','energie',True,'apa-minerala.png','{}'),
('Apa Calda','apa calda, recomandata in timpul antrenamentului',4,500,0,'bautura','mentinere',True,'apa-calda.png','{}'),
('Rucsac','rucsac pentru echipamente',300,900,0,'accesorii','muschi',True,'rucsac.png','{}'),
('Ceai','un ceai cald pentru dimineata',8,150,0,'bautura','mentinere',False,'ceai.png','{"apa","arome"}');