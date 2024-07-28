// Gérer le rendu de monnaie
function encaissement(){

    let montantDonne = parseFloat(document.getElementById("montantClient").value);
    let montantDu = parseFloat(document.getElementById("prixArticle").value);

    const isValid = isNumber(montantDonne, montantDu);

    if (!isValid){
        return document.getElementById("conteneurOutput").innerHTML = "Veuillez entrer des données valides !";
    }

    const monnaieRendue = {};

    // Convertir les nombres à virgule en nombres entiers
    montantDu = montantDu * 100;
    montantDonne = montantDonne * 100;

    let monnaie = montantDonne - montantDu;

    // Rendre la monnaie
    let nbBillet500 = monnaie / 50000;
    monnaie = monnaie % 50000;
    if (nbBillet500 >= 1){
        monnaieRendue["Billet(s) de 500€"] = Math.floor(nbBillet500);
    }

    let nbBillet200 = monnaie / 20000;
    monnaie = monnaie % 20000;
    if (nbBillet200 >= 1){
        monnaieRendue["Billet(s) de 200€"] = Math.floor(nbBillet200);
    }

    let nbBillet100 = monnaie / 10000;
    monnaie = monnaie % 10000;
    if (nbBillet100 >= 1){
        monnaieRendue["Billet(s) de 100€"] = Math.floor(nbBillet100);
    }

    let nbBillet50 = monnaie / 5000;
    monnaie = monnaie % 5000;
    if (nbBillet50 >= 1){
        monnaieRendue["Billet(s) de 50€"] = Math.floor(nbBillet50);
    }

    let nbBillet20 = monnaie / 2000;
    monnaie = monnaie % 2000;
    if (nbBillet20 >= 1){
        monnaieRendue["Billet(s) de 20€"] = Math.floor(nbBillet20);
    }

    let nbBillet10 = monnaie / 1000;
    monnaie = monnaie % 1000;
    if (nbBillet10 >= 1){
        monnaieRendue["Billet(s) de 10€"] = Math.floor(nbBillet10);
    }

    let nbBillet5 = monnaie / 500;
    monnaie = monnaie % 500;
    if (nbBillet5 >= 1){
        monnaieRendue["Billet(s) de 5€"] = Math.floor(nbBillet5);
    }

    let nbPiece2 = monnaie / 200;
    monnaie = monnaie % 200;
    if (nbPiece2 >= 1){
        monnaieRendue["Piece(s) de 2€"] = Math.floor(nbPiece2);
    }

    let nbPiece1 = monnaie / 100;
    monnaie = monnaie % 100;
    if (nbPiece1 >= 1){
        monnaieRendue["Piece(s) de 1€"] = Math.floor(nbPiece1);
    }

    let nbPiece05 = monnaie / 50;
    monnaie = monnaie % 50;
    if (nbPiece05 >= 1){
        monnaieRendue["Piece(s) de 0.50€"] = Math.floor(nbPiece05);
    }

    let nbPiece02 = monnaie / 20;
    monnaie = monnaie % 20;
    if (nbPiece02 >= 1){
        monnaieRendue["Piece(s) de 0.20€"] = Math.floor(nbPiece02);
    }

    let nbPiece01 = monnaie / 10;
    monnaie = monnaie % 10;
    if (nbPiece01 >= 1){
        monnaieRendue["Piece(s) de 0.10€"] = Math.floor(nbPiece01);
    }

    let nbPiece005 = monnaie / 5
    monnaie = monnaie % 5;
    if (nbPiece005 >= 1){
        monnaieRendue["Piece(s) de 0.05€"] = Math.floor(nbPiece005);
    }

    let nbPiece001 = monnaie / 1
    if (nbPiece001 >= 1){
        monnaie = monnaie % 1;
        monnaieRendue["Piece(s) de 0.01€"] = Math.floor(nbPiece001);
    }

        affichageMonnaie(monnaieRendue, monnaie);

    // On retourne l'objet monnaieRendue qui est un type de tableau
    return monnaieRendue;

}

// Tester si c'est bien un nombre
function isNumber(montantDonne, montantDu){
    let isValid = false;
    if(typeof montantDonne === "number" && !Number.isNaN(montantDonne) && typeof montantDu === "number" && !Number.isNaN(montantDu)){
        isValid = true;
    }
    return isValid;
}

// Mettre à jour la page HTML
function affichageMonnaie(monnaieRendue, monnaieRestant) {

    if (monnaieRestant !== 0){
        return document.getElementById("conteneurOutput").innerHTML = "Une erreur s'est produite, veuillez essayer à nouveau !";
    }

    let text = "";
    for (let [monnaie, value] of Object.entries(monnaieRendue)) {
        text += monnaie + ": " + value + "<br>";
    }
    return document.getElementById("conteneurOutput").innerHTML = text;
}

// Action du reset
function reset(){
    document.getElementById("montantClient").value = 0;
    document.getElementById("prixArticle").value = 0;
    document.getElementById("conteneurOutput").innerHTML = "";
}