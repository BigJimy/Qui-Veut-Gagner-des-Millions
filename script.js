"use strict";

const newGameElement = document.querySelector("#newGameContainer");
const choixElement = document.querySelector("#choixContainer");
const gainElement = document.querySelector("#gainContainer");
const perduElement = document.querySelector("#perduContainer");

let palier= 0;
let questionCourante;
let boutonChoisi;
let boutonActif;
let panneauChoix;
let interval;
let sommeEnJeuElement;
let sommeEnJeu;
let sommeSauvee;
let messageFinContainer;

const panneauQuiz = document.querySelector("#popup");
const panneauGains = document.querySelector("#gains");
const newGameButton = document.querySelector('#newGameButton');
const recommencerButton = document.querySelector('#recommencerButton');
const arreterButton = document.querySelector('#arreterButton');
const continuerButton = document.querySelector('#continuerButton');

const questionsList = [
	{question: "Quel langage n'est pas un langage de programmation ?",
	choix: ["PHP", "JS", "CSS", "Python"],
	bonneReponse: "CSS"},
	{question: "Quelle syntaxe est la bonne ?",
	choix: ["<p></p>", "<p><p>", "<p><p/>", "<p></>"],
	bonneReponse: "<p></p>"},
	{question: "Quelle syntaxe est correcte ?",
	choix: ["if (a!=2) {}", "if a!=2 {}", "if (a <> 2) {}", "if a <> 2 {}"],
	bonneReponse: "if (a!=2) {}"},
	{question: "Quel type d'évènement n'existe pas ?",
	choix: ["blur", "load", "mouseclick", "mouseout"],
	bonneReponse: "mouseclick"},
	{question: "Que renvoie ch1.slice(-3, -1) si ch1='ABCDE' ?",
	choix: ["ABC", "AB", "CD", "BC"],
	bonneReponse: "CD"},
	{question: "Que renvoie 'navigator.appName' si Internet Explorer 11 est utilisé ?",
	choix: ["Microsoft Internet Explorer", "IE11", "une erreur", "Netscape"],
	bonneReponse: "Netscape"},
	{question: "Quelle fonction permet de temporiser l'éxécution d'une commande ?",
	choix: ["SetTimer()", "sleep()", "setTimeout()", "wait()"],
	bonneReponse: "setTimeout()"}
];

/* ==================================
        	// FUNCTIONS //
=================================== */

var x = document.getElementById("playlist"); 

function playAudio() { 
    x.play(); 
} 
playAudio();

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
	clearInterval(interval);
	boutonActif.classList.add("reponseCorrecte");		
	removePalier(palier);
	selectPalier(palier + 1);
	palier++;
	setTimeout(clearQuestion, 3000);
	cacherPanneaux();
	setTimeout(afficherChoix, 3000);
}

function clearQuestion() {
	document.querySelector("#question").textContent = "";
	document.querySelector("#choice0").textContent = "";
	document.querySelector("#choice1").textContent = "";
	document.querySelector("#choice2").textContent = "";
	document.querySelector("#choice3").textContent = "";	
	let ancienBouton = document.querySelector("#" + boutonChoisi);	
	ancienBouton.classList.remove("reponseActive", "reponseCorrecte", "reponseFausse");	 
}

function resultat(choixDuJoueur, boutonDuJoueur) {
	const bonneReponse = questionCourante.bonneReponse;
	boutonChoisi = boutonDuJoueur;
	
	//on ajoute la classe reponseActive à la réponse sélectionnée :
	boutonActif = document.querySelector("#" + boutonChoisi);
	boutonActif.classList.add("reponseActive");
	
	interval = setInterval( () => {
		setTimeout( () => {
			boutonActif.classList.remove("reponseActive")
		}, 100)
		boutonActif.classList.add("reponseActive")
	}, 200);
	
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
	clearInterval(interval);
	boutonActif.classList.add("reponseFausse");	
	devoilerReponse();
	removePalier(palier);
	setTimeout(clearQuestion, 6000);
	setTimeout(cacherPanneaux, 4000);
	setTimeout(afficherFin, 5000);
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
	selectPalier(palier);
	selectQuestion();
	panneauQuiz.style.opacity = 100;
	panneauGains.style.opacity = 100;	
}

function reloadGame() {
	choixElement.style.display = "none";
	gainElement.style.display = "none";
	perduElement.style.display = "none";
	removePalier(palier);
	palier = 0;
	selectPalier(palier);
	selectQuestion();
	panneauQuiz.style.opacity = 100;
	panneauGains.style.opacity = 100;	
}

function cacherPanneaux() {
	panneauQuiz.style.opacity = 0;
	panneauGains.style.opacity = 0;	
}

function montrerPanneaux() {
	panneauQuiz.style.opacity = 100;
	panneauGains.style.opacity = 100;	
	questionCourante = "";
	boutonChoisi = "";
	boutonActif = "";
}

function afficherChoix() {
	sommeEnJeuElement = document.querySelector(".sommeEnJeu");
	sommeEnJeu = document.querySelector("#p" + palier).textContent;
	sommeEnJeuElement.textContent = sommeEnJeu;
	panneauChoix = document.querySelector("#choixContainer");
	panneauChoix.style.display = "block";
}

function continuerPartie() {
	panneauChoix = document.querySelector("#choixContainer");
	panneauChoix.style.display = "none";
	montrerPanneaux();
	selectQuestion();
}

function arreterPartie() {
	sommeEnJeuElement = document.querySelector(".sommeGagnee");
	sommeEnJeuElement.textContent = sommeEnJeu;
	panneauChoix = document.querySelector("#choixContainer");
	panneauChoix.style.display = "none";
	gainElement.style.display = "block";
}

function afficherFin() {
	sommeEnJeuElement = document.querySelector(".sommeSauvee");
	if(palier <= 4)
	{sommeEnJeuElement.textContent = "Vous n'avez rien gagné. Mauvais !!";		}
	else {
		if(palier > 4 && palier <= 9) {sommeSauvee = 1500}
		else {sommeSauvee = 48000}	
		sommeEnJeuElement.textContent = "Réponse fausse ! Vous avez gagné " + sommeSauvee + "€";
	}
	perduElement.style.display = "block";
}

function devoilerReponse() {
	for (var i=0; i < questionCourante.choix.length; i++) {
			if (questionCourante.choix[i] === questionCourante.bonneReponse){
				var bonBouton = document.querySelector('#btn' + i);
				bonBouton.classList.add("reponseCorrecte")
			}
	}
}

document.addEventListener('keypress', (event) => {
  const keyName = event.keyCode;
	switch (keyName) {
  	case 97:
    resultat(choice0.textContent, btn0.id)
    break;
	  case 98:
    resultat(choice1.textContent, btn1.id)
    break;	  
		case 99:
    resultat(choice2.textContent, btn2.id)
    break;	  
		case 100:
    resultat(choice3.textContent, btn3.id)
    break;
	}
});