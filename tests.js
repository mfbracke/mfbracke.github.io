const tests = [
    function shouldGetParticipantsFromCsv() {
        const csv = "Cagnus Marlsen;2900\nLing Diren;2902"
        
        const res = participantsFromCsv(csv)

        assertThat(res).isEqualTo(
            [
                new Participant("Cagnus Marlsen", 2900),
                new Participant("Ling Diren", 2902)
            ]
        )
    },
    
    function shouldGetRoundsFromCsv() {
        const csv = "1;2;3-1\r\n3;4;2-2\n\n1;4;0-3\n3;2;1-3"

        const res = roundsFromCsv(csv)

        assertThat(res).isEqualTo([
            new Round([
                new Game(0, 1, Result.WHITE_WINS),
                new Game(2, 3, Result.DRAW)
            ]),
            new Round([
                new Game(0, 3, Result.WHITE_FORFEITS),
                new Game(1, 2, Result.BLACK_WINS)
            ])
        ])
    }
]
