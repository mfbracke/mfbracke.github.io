function importData() {
    importParticipants()
}

class Participant {
    constructor(name, rating) {
        this.name = name
        this.rating = rating
    }
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
    return csv.split(/\r?\n|\r|\n/g)
              .map(participantFromCsv)
}

function participantFromCsv(csv) {
    const fields = csv.split(";")
    return new Participant(fields[0], parseInt(fields[1]))
}
