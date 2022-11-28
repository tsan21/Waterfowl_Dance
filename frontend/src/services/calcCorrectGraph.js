export default class CalcCorrectGraph {

    static CALC_CORRECT_GRAPH_ID = require("@/assets/TarnishedSpreadsheet/CalcCorrectGraph_ID.json");
    static CALC_CORRECT_GRAPH = require("@/assets/TarnishedSpreadsheet/CalcCorrectGraph.json");

    static CALC_CORRECT_DAMAGE_TYPES = [
        "CalcCorrectGraph ID (Fire)",
        "CalcCorrectGraph ID (Holy)",
        "CalcCorrectGraph ID (Lightning)",
        "CalcCorrectGraph ID (Magic)",
        "CalcCorrectGraph ID (Physical)"
    ]


    // Gets the row in CalcCorrectGraph_ID.json for the selected weapon
    getCalcCorrectGraphId(weapon) {
        const calcCorrectGraphId = CalcCorrectGraph.CALC_CORRECT_GRAPH_ID
            .find((x) => x.Name == weapon['Name'])
        return calcCorrectGraphId
    }

    // Gets all rows in CalcCorrectGraph.json for each damage type of the selected weapon
    getCalcCorrectGraph(calcCorrectGraphId) {
        let calcCorrect = {}

        for (const dmgType of CalcCorrectGraph.CALC_CORRECT_DAMAGE_TYPES) {
            const calcCorrectGraphRow = CalcCorrectGraph.CALC_CORRECT_GRAPH[calcCorrectGraphId[dmgType]]
            calcCorrect[dmgType] = calcCorrectGraphRow
        }
        return calcCorrect
    }

    // getWeaponScalingAttributes(data){


    // }

    calcCorrectFormula(statLevel/*, calcCorrect*/) {
        const statMin = 0
        const statMax = 0
        const ratio = (statLevel - statMin) / (statMax - statMin)

        if (statLevel > 500 && statLevel < 600) {
            // ...
        }

        // const exponentMin = 0
        // const growMin = 0
        // const growMax = 0

        // const growth = 0
        // const output = 0

        return ratio
    }
}