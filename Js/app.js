// Déclaration des variables globales
let monnaie = 0;
let montantTotal = 0;
let listeMontantDonneEntier = [];
let prixArticleInitial = 0;
const nomMonnaie = ["nbBillet500", "nbBillet200", "nbBillet100", "nbBillet50", "nbBillet20", "nbBillet10", "nbBillet5", "nbPiece2", "nbPiece1", "nbPiece05", "nbPiece02", "nbPiece01", "nbPiece005", "nbPiece002", "nbPiece001"];
let monnaieARendre = [];
// Valeur en centimes
const valeurMonnaie = [50000, 20000, 10000, 5000, 2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1];

// Gérer le rendu de monnaie
function encaissement(monnaie){

    // Je récupère les données des inputs et les convertis en nombre flotant
    let montantDonne = parseFloat(document.getElementById("montantClient").value);
    let montantDu = parseFloat(document.getElementById("prixArticle").value);

    // Je garde en mémoire le montant dû initial
    if(prixArticleInitial === 0){
        prixArticleInitial = montantDu;
    }

    // Je teste si mes deux variables sont bien du type nombre et pas NaN
    if (!isNumber(montantDonne, montantDu)){
        return document.getElementById("conteneurOutput").innerHTML = "Veuillez entrer des données valides !";
    }

    // Convertir les nombres à virgule en nombres entiers
    montantDonne = convertionMonnaie(montantDonne);
    montantDu = convertionMonnaie(montantDu);

    // Je garde en mémoire les montants donnés une fois convertis
    listeMontantDonneEntier.push(montantDonne);

    // Si le montant n'est pas suffisant je demande le reste
    if(montantDonne < montantDu){
        monnaie = montantDu - montantDonne;
        if(monnaie.countDecimals() > 2){
            monnaie = Math.round(monnaie);
        }
        let newValue = monnaie.toString().slice(0, (monnaie.toString().length - 2)) + "." + monnaie.toString().slice(monnaie.toString().length - 2);
        document.getElementById("conteneurOutput").innerHTML = `Monnaie insuffisante, il vous manque ${newValue}€ s'il vous plaît`;
        document.getElementById("prixArticle").value = newValue;
        document.getElementById("prixArticle").disabled = true;
        return null;
    }

    // Je remet les montants corrects pour effectuer le rendu de monnaie
    montantDonne = 0;
    for (const montant of listeMontantDonneEntier) {
        montantTotal += montant;
    }
    montantDu = convertionMonnaie(prixArticleInitial);

    // Je récupère le montant à rendre
    monnaie = montantTotal - montantDu;

    // Je compte la monnaie
    monnaie = comptageMonnaie(nomMonnaie, monnaie);

    // On affiche la monnaie
    affichageMonnaie(monnaieARendre, monnaie);

    // On retourne le tableau monnaieRendue qui contient le nombre de chaque monnaie
    return monnaieARendre;
}

// Convertir la monnaie
function convertionMonnaie(montant) {
    if((montant + 0.01) !== Math.round(montant)){
        montant = (montant * 100);
    }
    if((montant + 0.01) === Math.round(montant)){
        montant = (((montant + 0.01) * 100)-1);
    }
    // On retourne le tableau monnaieRendue qui contient le nombre de chaque monnaie
    return montant;
}

// Compter la monnaie
function comptageMonnaie(nomMonnaie, monnaie) {
    for (let i = 0; i <= 14; i++){
        let nbMonnaie = 0;
        nbMonnaie = monnaie / valeurMonnaie[i];
        monnaie = monnaie % valeurMonnaie[i];
        monnaieARendre.push(Math.floor(nbMonnaie));
    }
    return monnaie;
}

// Tester si c'est bien un nombre valide
function isNumber(montantDonne, montantDu){
    let isValid = false;
    if(typeof montantDonne === "number" && !Number.isNaN(montantDonne) && typeof montantDu === "number" && !Number.isNaN(montantDu)){
        isValid = true;
    }
    return isValid;
}

// Mettre à jour la page HTML
function affichageMonnaie(monnaieRendue, monnaieRestant) {

    document.getElementById("monnaie").disabled = true;
    document.getElementById("montantClient").value = montantTotal.toString().slice(0, (montantTotal.toString().length - 2)) + "." + montantTotal.toString().slice(montantTotal.toString().length - 2);
    document.getElementById("prixArticle").value = prixArticleInitial;

    if (monnaieRestant !== 0){
        return document.getElementById("conteneurOutput").innerHTML = `Une erreur s'est produite, veuillez essayer à nouveau ! <br> Rendre les ${prixArticleInitial}€`;
    }

    let text = "";

    for (let i = 0; i <= monnaieRendue.length; i++){
        if(monnaieRendue[i] >= 1){
            text += nomMonnaie[i] + " : " + monnaieRendue[i] + "<br>";
        }
    }
    return document.getElementById("conteneurOutput").innerHTML = text;
}

// Action du reset
function reset(){
    document.getElementById("montantClient").value = 0;
    document.getElementById("prixArticle").value = 0;
    document.getElementById("conteneurOutput").innerHTML = "";
    document.getElementById("prixArticle").disabled = false;
    document.getElementById("monnaie").disabled = false;
    // Je réinitialise mes variables globales
    monnaie = 0;
    montantTotal = 0;
    prixArticleInitial = 0;
    listeMontantDonneEntier.length = 0;
    monnaieARendre.length = 0;
}

// compte le nombre de décimale d'un nombre flotant
Number.prototype.countDecimals = function () {
    if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0;
}