const NEWLINE_REGEX = /\r?\n|\r/g

function importData() {
    importParticipants()
    importRounds()
}

class Participant {
    constructor(name, rating) {
        this.name = name
        this.rating = rating
    }
}

class Round {
    constructor(games) {
        this.games = games
    }
}

class Game {
    constructor(whitePlayerIndex, blackPlayerIndex, result) {
        this.whitePlayerIndex = whitePlayerIndex
        this.blackPlayerIndex = blackPlayerIndex
        this.result = result
    }
}

const Result = Object.freeze({
    WHITE_WINS: "white wins",
    BLACK_WINS: "black wins",
    WHITE_FORFEITS: "white forfeits",
    BLACK_FORFEITS: "black forfeits",
    DRAW: "draw"
})

const csvResultMapping = {
    "3-1": Result.WHITE_WINS,
    "1-3": Result.BLACK_WINS,
    "0-3": Result.WHITE_FORFEITS,
    "3-0": Result.BLACK_FORFEITS,
    "2-2": Result.DRAW
}

const resultPointsMapping = {
    [Result.WHITE_WINS]: [1, 0]
}

function importParticipants() {
    writeParticipants(readParticipants())
}

function writeParticipants(participants) {
    const table = document.getElementById("participants-table")
    for(const participant of participants) {
        const row = document.createElement("tr")
        const nameCell = document.createElement("td")
        const ratingCell = document.createElement("td")
        nameCell.appendChild(document.createTextNode(participant.name))
        ratingCell.appendChild(document.createTextNode(participant.rating.toString()))
        row.appendChild(nameCell)
        row.appendChild(ratingCell)
        table.appendChild(row)
    }
}

function readParticipants() {
    const stringData = document.getElementById("import-data-participants").value
    return participantsFromCsv(stringData)
}

function participantsFromCsv(csv) {
    return csv.split(NEWLINE_REGEX)
              .map(participantFromCsv)
}

function participantFromCsv(csv) {
    const fields = csv.split(";")
    return new Participant(fields[0], parseInt(fields[1]))
}

function writeRounds(rounds) {
    const div = document.getElementById("round-results")
    for (const round of rounds) {

    }
}

function writeRound(round, roundNumber, parent) {
    const title = document.createElement("h3")
    title.appendChild(document.createTextNode(`Round ${roundNumber}`))
    parent.appendChild(title)

    const gameList = document.createElement("ol")
    for (const game of round.games) {

    }
}

function readRounds() {
    const stringData = document.getElementById("import-data-rounds")
    return roundsFromCsv(stringData)
}

function roundsFromCsv(csv) {
    return csv.split(/(?:\r?\n){2}|\r\r/g)
              .map(roundFromCsv)
}

function roundFromCsv(csv) {
    return new Round(
        csv.split(NEWLINE_REGEX)
           .map(gameFromCsv)
    )
}

function gameFromCsv(csv) {
    const fields = csv.split(";")
    return new Game(
        parseInt(fields[0]) - 1, 
        parseInt(fields[1]) - 1,
        csvResultMapping[fields[2]]
    )
}
