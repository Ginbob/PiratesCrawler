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
    tableRows.forEach(row => console.log(row.textContent));
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

// saveBesteWerferDaten();

saveBesteFreiwerferDaten();
