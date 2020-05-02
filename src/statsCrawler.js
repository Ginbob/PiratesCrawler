const fetch = require('node-fetch');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const mysqlService = require('./mysqlService.js');

const pathToJsonFile = process.argv.slice(2)[0];
console.log('pathToFile: ', pathToJsonFile);

const csvDataAsJson = require(pathToJsonFile);

async function getBesteWerfer(htmlText, csvRow) {
    const dom = new JSDOM(htmlText);
    const table = dom.window.document.querySelector(".sportView");
    const tableRows = table.querySelectorAll('tr');
    try {
        for (var i = 0; i < tableRows.length; i++) {
            if (i >= 15) {
                const row = tableRows[i];
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
                    }
                } catch(e) {
                    console.error(row.querySelector("td").textContent);
                }
            }
        }
        console.log(`Updated beste Werfer von ${csvRow["Saison-ID"]}, ${csvRow.Team}, ${csvRow.Liga}`);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function getBesteFreiwerfer(htmlText, csvRow) {
    const dom = new JSDOM(htmlText);
    const table = dom.window.document.querySelector(".sportView");
    const tableRows = table.querySelectorAll('tr');
    try {
        for (var i = 0; i < tableRows.length; i++) {
            if (i >= 15) {
                const row = tableRows[i];
                const cells = row.querySelectorAll('td');
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
                    }
                } catch(e) {
                    console.error(row.querySelector("td").textContent);
                }
            }
        }
        console.log(`Updated beste Freiwerfer von ${csvRow["Saison-ID"]}, ${csvRow.Team}, ${csvRow.Liga}`);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function getBesteDreierwerfer(htmlText, csvRow) {
    const dom = new JSDOM(htmlText);
    const table = dom.window.document.querySelector(".sportView");
    const tableRows = table.querySelectorAll('tr');
    try {
        for (var i = 0; i < tableRows.length; i++) {
            if (i >= 15) {
                const row = tableRows[i];
                const cells = row.querySelectorAll('td');
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
                    }
                } catch(e) {
                    console.error(row.querySelector("td").textContent);
                }
            }
        }
        console.log(`Updated beste 3er-Werfer von ${csvRow["Saison-ID"]}, ${csvRow.Team}, ${csvRow.Liga}`);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function getTabelle(htmlText, csvRow) {
    const dom = new JSDOM(htmlText);
    const table = dom.window.document.querySelectorAll(".sportView")[1];
    const tableRows = table.querySelectorAll('tr');
    const baseQuery = "insert into tabelle (saison, team, liga, rang, mannschaft, spiele, punkte, koerbe, differenz) values ";
    const values = [];
    try {
        for (var i = 0; i < tableRows.length; i++) {
            if (i >= 8) {
                const row = tableRows[i];
                const cells = row.querySelectorAll('td');
                try {
                    var value = "(" +
                        parseInt(csvRow['Saison-ID']) + ", " +
                        "'" + csvRow['Team'] + "', " +
                        "'" + csvRow['Liga'] + "', " +
                        "'" + cells[0].textContent.trim() + "', " +
                        "'" + cells[1].textContent.trim().split("'").join("") + "', " +
                        parseInt(cells[3].textContent.trim()) + ", " +
                        "'" + cells[4].textContent.trim() + "', " +
                        "'" + cells[5].textContent.trim() + "', " +
                        parseInt(cells[6].textContent.trim()) + ")";
                    values.push(value);

                } catch(e) {
                    console.error(row.querySelector("td").textContent);
                }
            }
        }
        if (values.length > 0) {
            var insertStatement = baseQuery;
            values.map((value, idx) => {
                if (idx === (values.length - 1)) {
                    insertStatement = insertStatement + " " + value + ";";
                } else {
                    insertStatement = insertStatement + " " + value + ",";
                }
            });
            console.log("attempting to execute query: ", insertStatement);
            await mysqlService.executeQuery(insertStatement);
            console.log(`Updated Tabelle von ${csvRow["Saison-ID"]}, ${csvRow.Team}, ${csvRow.Liga}`);
            return true;
        }
        console.log("nothing to do");
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function getErgebnisse(htmlText, csvRow) {
    const dom = new JSDOM(htmlText);
    const table = dom.window.document.querySelectorAll(".sportView")[1];
    const tableRows = table.querySelectorAll('tr');
    try {
        for (var i = 0; i < tableRows.length; i++) {
            if (i >= 7) {
                var row = tableRows[i]
                var cells = row.querySelectorAll('td');
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
                    mysqlService.executeQuery(insertStatement);
                } catch(e) {
                    console.error(row.querySelector("td").textContent);
                }
            }
        }
        console.log(`Updated Liga-Ergebnisse von ${csvRow["Saison-ID"]}, ${csvRow.Team}, ${csvRow.Liga}`);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

const functionRowMapping = [
    // {
    //     category: "Link Ergebnisse",
    //     crawlFunction: getErgebnisse
    // },
    // {
    //     category: "Link Werfer",
    //     crawlFunction: getBesteWerfer
    // },
    // {
    //     category: "Link Freiwerfer",
    //     crawlFunction: getBesteFreiwerfer
    // },
    // {
    //     category: "Link 3er",
    //     crawlFunction: getBesteDreierwerfer
    // },
    {
        category: "Link Tabelle",
        crawlFunction: getTabelle
    }
];

async function saveCategoriesForEverySeason() {
    const resultAll = await Promise.all(csvDataAsJson.map(async csvRow => {
        const fetchResults = await Promise.all(functionRowMapping.map(async mapping => {
            try {
                const fetchResult = await fetch(csvRow[mapping.category]);
                const htmlText = await fetchResult.text();
                const result = await mapping.crawlFunction(htmlText, csvRow);
                if (result) {
                    return "Success";
                }
                return "Failed"
            } catch (error) {
                console.error("Error occurred", error);
                return "Failed";
            }
        }));
        const successes = fetchResults.filter(result => result === "Success");
        const failures = fetchResults.filter(result => result === "Failed");
        return {
            bereich: csvRow.Bereich,
            saisonId: csvRow["Saison-ID"],
            team: csvRow.Team,
            liga: csvRow.Liga,
            updatedTables: successes.length,
            updateFailures: failures.length
        };
    }));
    return resultAll;
}

process.on('exit', function(code) {
    return console.log(`About to exit with code ${code}`);
});


saveCategoriesForEverySeason().then(result => console.log(JSON.stringify(result, null, 2))).then(() => {
    console.log(csvDataAsJson.length);
    process.exit(0);
});