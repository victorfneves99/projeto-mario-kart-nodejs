const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0
}

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0
}


/**
 * Retorna um n mero aleat rio entre 1 e 6.
 *
 * @returns {number} n mero aleat rio entre 1 e 6.
 */
async function rollDice() {
    return Math.floor(Math.random() * 6) + 1
}


/**
 * Retorna um n mero aleat rio entre 1 e 3.
 *
 * @returns {number} n mero aleat rio entre 1 e 3.
 */
async function getRandomBlock() {
    let radom = Math.random()
    let result

    switch (true) {
        case radom < 0.33:
            result = "RETA"
            break
        case radom < 0.66:
            result = "CURVA"
            break
        default:
            result = "CONFRONTO"
            break
    }

    return result
}


/**
 * Registra o resultado do rolamento de dado de um personagem.
 * @param {string} characterName - Nome do personagem.
 * @param {string} block - Bloco da pista (RETA, CURVA, CONFRONTO).
 * @param {number} diceResult - Resultado do dado (entre 1 e 6).
 * @param {number} attribute - Valor do atributo (velocidade, manobrabilidade, poder).
 */
async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de  ${block} ${diceResult} + ${attribute} = ${diceResult + attribute} `)

}


/**
 * Verifica se um personagem ganhou a corrida.
 *
 * @param {Object} character1 - Primeiro personagem.
 * @param {Object} character2 - Segundo personagem.
 * @returns {boolean} true se o personagem 1 venceu, false caso contr rio.
 */
async function checkWinner(character1, character2) {
    if (character1.PONTOS === character2.PONTOS) {
        console.log(`🏁 Empate! Ambos os personagens terminaram com ${character1.PONTOS} pontos. 🤝 `);
    } else {
        const winner = character1.PONTOS > character2.PONTOS ? character1 : character2;

        console.log("Resultado da corrida: \n");
        console.log(`🏁 ${winner.NOME} venceu a corrida com ${winner.PONTOS} pontos! 🏆 \n`);

        console.log(`Resultado Final : ${character1.NOME}: ${character1.PONTOS} x ${character2.NOME}: ${character2.PONTOS}`)

    }

    return character1.PONTOS > character2.PONTOS;
}



        /**
         * Executa a l gica da corrida entre dois personagens.
         *
         * @param {Object} character1 - Primeiro personagem.
         * @param {Object} character2 - Segundo personagem.
         */
async function playRaceEngine(character1, character2) {

    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round} 🏁 `)

        //sortear o bloco da pista
        let block = await getRandomBlock()

        console.log(`🏁 Bloco da pista: ${block} 🏁 `)


        //rolar os dados 
        let dice1 = await rollDice()
        let dice2 = await rollDice()


        //teste de habilidade
        let totalTestSkill1 = 0
        let totalTestSkill2 = 0

        if (block === "RETA") {
            totalTestSkill1 = dice1 + character1.VELOCIDADE
            totalTestSkill2 = dice2 + character2.VELOCIDADE
            await logRollResult(character1.NOME, 'velocidade', dice1, character1.VELOCIDADE)
            await logRollResult(character2.NOME, 'velocidade', dice2, character2.VELOCIDADE)
            console.log('\n')


        }
        if (block === "CURVA") {
            totalTestSkill1 = dice1 + character1.MANOBRABILIDADE
            totalTestSkill2 = dice2 + character2.MANOBRABILIDADE
            await logRollResult(character1.NOME, 'manobrabilidade', dice1, character1.MANOBRABILIDADE)
            await logRollResult(character2.NOME, 'manobrabilidade', dice2, character2.MANOBRABILIDADE)
            console.log('\n')

        }
        if (block === "CONFRONTO") {
            let powerResult1 = dice1 + character1.PODER
            let powerResult2 = dice2 + character2.PODER
            totalTestSkill1 = powerResult1
            totalTestSkill2 = powerResult2

            console.log(`${character1.NOME} confontou com ${character2.NOME} 🥊`)

            await logRollResult(character1.NOME, 'poder', dice1, character1.PODER)
            await logRollResult(character2.NOME, 'poder', dice2, character2.PODER)

            character2.PONTOS = powerResult1 > powerResult2 && character2.PONTOS > 0 ? character2.PONTOS - 1 : character2.PONTOS;
            console.log(powerResult1 > powerResult2 ? `${character2.NOME} perdeu um ponto 👎 ` : '');
            character1.PONTOS = powerResult2 > powerResult1 && character1.PONTOS > 0 ? character1.PONTOS - 1 : character1.PONTOS;
            console.log(powerResult2 > powerResult1 ? `${character1.NOME} perdeu um ponto ` : '');
            console.log('\n')
        }



        const isDraw = totalTestSkill1 === totalTestSkill2
        const winner = isDraw ? null : totalTestSkill1 > totalTestSkill2 ? character1 : character2

        if (winner) {
            console.log(`🏁 ${winner.NOME} marcou um ponto 🏁 `)
            winner.PONTOS += 1
        } else {
            console.log(`🏁 EMPATE 🏁 `)
        }


        console.log('------------------------------------------------------------')
    }

}


(async function main() {
    console.log(`🏁 🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`)

    await playRaceEngine(player1, player2)
    await checkWinner(player1, player2)
})()

