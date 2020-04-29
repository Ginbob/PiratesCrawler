const csvData = require('../resources/result.json');
const fetch = require('node-fetch');
const jsdom = require("jsdom");
const fs = require("fs");
const { JSDOM } = jsdom;
const mysqlService = require('./mysqlService.js');

async function getBesteWerfer(htmlText, csvRow) {
    const dom = new JSDOM(htmlText);
    const table = dom.window.document.querySelector(".sportView");
    const tableRows = table.querySelectorAll('tr');
    for (var i = 0; i < tableRows.length; i++) {
        var row = tableRows[i]
        if (i >= 15) {
            var cells = row.querySelectorAll('td');
            try {
                if (cells[1].textContent.trim().includes('*')) {
                    console.log("Anonymisierte Daten werden nicht gespeichert");
                } else {
                    var insertStatement = "insert into beste_werfer (saison, team, liga, rang, nachname, vorname, mannschaft, punkte, spiele, durchschnitt) values (" +
                        parseInt(csvRow['Saison-ID']) + ", " +
                        "'" + csvRow['Team'] + "', " +
                        "'" + csvRow['Liga'] + "', " +
                        "'" + cells[0].textContent.trim() + "', " +
                        "'" + cells[1].textContent.trim() + "', " +
                        "'" + cells[2].textContent.trim() + "', " +
                        "'" + cells[3].textContent.trim().split("'").join("") + "', " +
                        parseInt(cells[4].textContent.trim()) + ", " +
                        parseInt(cells[5].textContent.trim()) + ", " +
                        parseFloat(cells[6].textContent.trim()) + ");";
                    await mysqlService.executeQuery(insertStatement);
                    console.log("Executed Query: " + insertStatement);
                }
            } catch(e) {
                throw new Error(row.querySelector("td").textContent);
            }
        }
    }
}

async function getBesteFreiwerfer(htmlText, csvRow) {
    const dom = new JSDOM(htmlText);
    const table = dom.window.document.querySelector(".sportView");
    const tableRows = table.querySelectorAll('tr');
    for (var i = 0; i < tableRows.length; i++) {
        var row = tableRows[i]
        if (i >= 15) {
            var cells = row.querySelectorAll('td');
            try {
                if (cells[1].textContent.trim().includes('*')) {
                    console.log("Anonymisierte Daten werden nicht gespeichert");
                } else {
                    var insertStatement = "insert into beste_freiwerfer (saison, team, liga, rang, nachname, vorname, mannschaft, versuche, treffer, quote) values (" +
                        parseInt(csvRow['Saison-ID']) + ", " +
                        "'" + csvRow['Team'] + "', " +
                        "'" + csvRow['Liga'] + "', " +
                        "'" + cells[0].textContent.trim() + "', " +
                        "'" + cells[1].textContent.trim() + "', " +
                        "'" + cells[2].textContent.trim() + "', " +
                        "'" + cells[3].textContent.trim().split("'").join("") + "', " +
                        parseInt(cells[4].textContent.trim()) + ", " +
                        parseInt(cells[5].textContent.trim()) + ", " +
                        parseFloat(cells[6].textContent.trim()) + ");";
                    await mysqlService.executeQuery(insertStatement);
                    console.log("Executed Query: " + insertStatement);
                }
            } catch(e) {
                throw new Error(row.querySelector("td").textContent);
            }
        }
    }
}

async function getBesteDreierwerfer(htmlText, csvRow) {
    const dom = new JSDOM(htmlText);
    const table = dom.window.document.querySelector(".sportView");
    const tableRows = table.querySelectorAll('tr');
    for (var i = 0; i < tableRows.length; i++) {
        var row = tableRows[i]
        if (i >= 15) {
            var cells = row.querySelectorAll('td');
            try {
                if (cells[1].textContent.trim().includes('*')) {
                    console.log("Anonymisierte Daten werden nicht gespeichert");
                } else {
                    var insertStatement = "insert into beste_dreierwerfer (saison, team, liga, rang, nachname, vorname, mannschaft, dreier, spiele, durchschnitt) values (" +
                        parseInt(csvRow['Saison-ID']) + ", " +
                        "'" + csvRow['Team'] + "', " +
                        "'" + csvRow['Liga'] + "', " +
                        "'" + cells[0].textContent.trim() + "', " +
                        "'" + cells[1].textContent.trim() + "', " +
                        "'" + cells[2].textContent.trim() + "', " +
                        "'" + cells[3].textContent.trim().split("'").join("") + "', " +
                        parseInt(cells[4].textContent.trim()) + ", " +
                        parseInt(cells[5].textContent.trim()) + ", " +
                        parseFloat(cells[6].textContent.trim()) + ");";
                    await mysqlService.executeQuery(insertStatement);
                    console.log("Executed Query: " + insertStatement);
                }
            } catch(e) {
                throw new Error(row.querySelector("td").textContent);
            }
        }
    }
}

function saveBesteWerferDaten() {
    for (var i = 0; i < csvData.length; i++) {
        const csvRow = csvData[i];
        const fetchWerferLink = csvRow['Link Werfer'];
        fetch(fetchWerferLink)
            .then(result => result.text())
            .then(htmlText => getBesteWerfer(htmlText, csvRow))
            .catch(error => {
                console.error(error.message);
            });
    }
}

function saveBesteFreiwerferDaten() {
    for (var i = 0; i < csvData.length; i++) {
        const csvRow = csvData[i];
        const fetchFreiwerferLink = csvRow['Link Freiwerfer'];
        fetch(fetchFreiwerferLink)
            .then(result => result.text())
            .then(htmlText => getBesteFreiwerfer(htmlText, csvRow))
            .catch(error => {
                console.error(error.message);
            });
    }
}

function saveBesteDreierwerferDaten() {
    for (var i = 0; i < csvData.length; i++) {
        const csvRow = csvData[i];
        const fetchFreiwerferLink = csvRow['Link 3er'];
        fetch(fetchFreiwerferLink)
            .then(result => result.text())
            .then(htmlText => getBesteDreierwerfer(htmlText, csvRow))
            .catch(error => {
                console.error(error.message);
            });
    }
}

async function getTabelle(htmlText, csvRow) {
    const dom = new JSDOM(htmlText);
    const table = dom.window.document.querySelectorAll(".sportView")[1];
    const tableRows = table.querySelectorAll('tr');
    for (var i = 0; i < tableRows.length; i++) {
        if (i >= 8) {
            var row = tableRows[i]
            var cells = row.querySelectorAll('td');
            console.log(cells[3].textContent.trim());
            try {
                var insertStatement = "insert into tabelle (saison, team, liga, rang, mannschaft, spiele, punkte, koerbe, differenz) values (" +
                    parseInt(csvRow['Saison-ID']) + ", " +
                    "'" + csvRow['Team'] + "', " +
                    "'" + csvRow['Liga'] + "', " +
                    "'" + cells[0].textContent.trim() + "', " + 
                    "'" + cells[1].textContent.trim().split("'").join("") + "', " + 
                    parseInt(cells[3].textContent.trim()) + ", " + 
                    "'" + cells[4].textContent.trim() + "', " + 
                    "'" + cells[5].textContent.trim() + "', " + 
                    parseInt(cells[6].textContent.trim()) + ");"; 
                await mysqlService.executeQuery(insertStatement);
                console.log("Query: " + insertStatement);
            } catch(e) {
                throw new Error(row.querySelector("td").textContent);
            }
        }
    }
}

async function getErgebnisse(htmlText, csvRow) {
    const dom = new JSDOM(htmlText);
    const table = dom.window.document.querySelectorAll(".sportView")[1];
    const tableRows = table.querySelectorAll('tr');
    for (var i = 0; i < tableRows.length; i++) {
        if (i >= 7) {
            var row = tableRows[i]
            var cells = row.querySelectorAll('td');
            console.log(cells[3].textContent.trim());
            try {
                var insertStatement = "insert into ergebnisse (saison, team, liga, spieltag, nummer, datum, heim, gast, endstand) values (" +
                    parseInt(csvRow['Saison-ID']) + ", " +
                    "'" + csvRow['Team'] + "', " +
                    "'" + csvRow['Liga'] + "', " +
                    parseInt(cells[0].textContent.trim()) + ", " + 
                    parseInt(cells[1].textContent.trim()) + ", " + 
                    "'" + cells[2].textContent.trim() + "', " + 
                    "'" + cells[3].textContent.trim().trim().split("'").join("") + "', " + 
                    "'" + cells[4].textContent.trim().trim().split("'").join("") + "', " + 
                    "'" + cells[5].textContent.trim() + "');";
                await mysqlService.executeQuery(insertStatement);
                console.log("Query: " + insertStatement);
            } catch(e) {
                throw new Error(row.querySelector("td").textContent);
            }
        }
    }
}

function saveErgebnisse() {
    for (var i = 0; i < csvData.length; i++) {
        const csvRow = csvData[i];
        const fetchTabellenLink = csvRow['Link Ergebnisse'];
        fetch(fetchTabellenLink)
            .then(result => result.text())
            .then(htmlText => getErgebnisse(htmlText, csvRow))
            .catch(error => {
                console.error(error.message);
            });
    }
}

// saveBesteWerferDaten();

// saveBesteFreiwerferDaten();

// saveBesteDreierwerferDaten();

// saveTabellen();

saveErgebnisse();