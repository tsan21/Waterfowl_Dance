export default class AttackElementCorrectParam {

    static ATTACK_ELEMENT_CORRECT_PARAM = require("@/assets/TarnishedSpreadsheet/AttackElementCorrectParam.json");


    get(attackElementCorrectParamId) {
        const attackElementCorrectParam = AttackElementCorrectParam.ATTACK_ELEMENT_CORRECT_PARAM
            .find((x) => x['Row ID'] == attackElementCorrectParamId)

        let relevantColumns = {}

        for (const [key, value] of Object.entries(attackElementCorrectParam)) {
            if (value > 0) {
                relevantColumns[key] = value
            }
        }
        return relevantColumns
    }
}