"use strict";

const newGameElement = document.querySelector("#newGameContainer");
let palier= 0;
let questionCourante;
let boutonChoisi;
let boutonActif;

const questionsList = [
	{question: "Quel langage n'est pas un langage de programmation ?",
	choix: ["PHP", "JS", "CSS", "Python"],
	bonneReponse: "CSS"},
	{question: "Quelle syntaxe est la bonne ?",
	choix: ["<p></p>", "<p><p>", "<p><p/>", "<p></>"],
	bonneReponse: "<p></p>"}
];

/* ==================================
        	// FUNCTIONS //
=================================== */

function selectQuestion() {
	const questionIndex = Math.floor(Math.random() * questionsList.length);
	questionCourante = questionsList[questionIndex];
	document.querySelector("#question").textContent = questionCourante.question;
	document.querySelector("#choice0").textContent = questionCourante.choix[0];
	document.querySelector("#choice1").textContent = questionCourante.choix[1];
	document.querySelector("#choice2").textContent = questionCourante.choix[2];
	document.querySelector("#choice3").textContent = questionCourante.choix[3];
};


function questionSuivante() {
	boutonActif.classList.add("reponseCorrecte");		
	removePalier(palier);
	selectPalier(palier + 1);
	palier++;
	setTimeout(clearQuestion, 6000);
	cacherPanneaux();
	
// Afficher niveau atteint
// Choix continue ou pas ?
	
	setTimeout(montrerPanneaux, 6000);
	setTimeout(selectQuestion, 7000);
}

function clearQuestion() {
	document.querySelector("#question").textContent = "";
	document.querySelector("#choice0").textContent = "";
	document.querySelector("#choice1").textContent = "";
	document.querySelector("#choice2").textContent = "";
	document.querySelector("#choice3").textContent = "";	
	let ancienBouton = document.querySelector("#" + boutonChoisi);	
	ancienBouton.classList.remove("reponseActive", "reponseCorrecte");	 
}

function resultat(choixDuJoueur, boutonDuJoueur) {
	const bonneReponse = questionCourante.bonneReponse;
	boutonChoisi = boutonDuJoueur;
	
	//on ajoute la classe reponseActive à la réponse sélectionnée :
	boutonActif = document.querySelector("#" + boutonChoisi);
	boutonActif.classList.add("reponseActive");
	
	//si la réponse est bonne :
	if(bonneReponse === choixDuJoueur) {
		setTimeout(questionSuivante, 3000);
	}
	// sinon si la réponse est mauvaise, fin de partie :
	else {
		setTimeout(partiePerdue, 3000);
	}
}

function partiePerdue() {
	console.log("Perdu !");
}

function selectPalier(palier) {
	let nomPalier = palier.toString();
	let palierActif = document.querySelector("#p" + nomPalier);
	if(palier === 4 || palier === 9 || palier === 14) {
		palierActif.classList.add("palierCourantSpecial");		
	} else {
		palierActif.classList.add("palierCourant");	
	}
}

function removePalier(palier) {
	let nomPalier = palier.toString();
	let palierActif = document.querySelector("#p" + nomPalier);
	if(palier === 4 || palier === 9 || palier === 14) {
		palierActif.classList.remove("palierCourantSpecial");		
	} else {
		palierActif.classList.remove("palierCourant");	
	}
}

function newGame() {
	newGameElement.style.display = "none";
	selectPalier(0);
	selectQuestion();
}

function cacherPanneaux() {
	const panneauQuiz = document.querySelector("#popup");
	const panneauGains = document.querySelector("#gains");
	panneauQuiz.style.opacity = 0;
	panneauGains.style.opacity = 0;	
}

function montrerPanneaux() {
	const panneauQuiz = document.querySelector("#popup");
	const panneauGains = document.querySelector("#gains");
	panneauQuiz.style.opacity = 100;
	panneauGains.style.opacity = 100;	
	questionCourante = "";
	boutonChoisi = "";
	boutonActif = "";
}