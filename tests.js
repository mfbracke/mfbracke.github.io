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
    }
]
