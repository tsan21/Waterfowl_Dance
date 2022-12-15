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
    getCalcCorrectGraphId(weaponId) {
        const calcCorrectGraphId = CalcCorrectGraph.CALC_CORRECT_GRAPH_ID
            .find((x) => x.ID == weaponId)
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

    calcCorrectFormula(statLevel, calcCorrectGraphId) {
        let statMin = 0
        let statMax = 0
        let minNumber = 0
        let maxNumber = 0
        let exponentMin = 0
        let exponentMinKey = 0
        let growMinKey = 0
        let growMaxKey = 0
        let growMin = 0
        let growMax = 0
        let growth = 0

        for (const [key, currVal] of Object.entries(calcCorrectGraphId)) {
            if (key.includes("Stat")) {
                const keys = Object.keys(calcCorrectGraphId);
                const nextKey = keys[(keys.indexOf(key) + 1) % keys.length]
                const nextVal = calcCorrectGraphId[nextKey]

                if (statLevel >= currVal && statLevel <= nextVal) {
                    statMin = currVal
                    statMax = nextVal
                    minNumber = key.split(" ")[1]
                    maxNumber = nextKey.split(" ")[1]
                    exponentMinKey = "Exponent " + minNumber
                    exponentMin = calcCorrectGraphId[exponentMinKey]
                    growMinKey = "Grow " + minNumber
                    growMaxKey = "Grow " + maxNumber
                    growMin = calcCorrectGraphId[growMinKey]
                    growMax = calcCorrectGraphId[growMaxKey]
                }
            }
        }

        const ratio = (statLevel - statMin) / (statMax - statMin)

        if (exponentMin > 0) {
            growth = Math.pow(ratio, exponentMin)
        }
        if (exponentMin < 0) {
            growth = 1 - Math.pow((1 - ratio), Math.abs(exponentMin))
        }

        const output = growMin + (growMax - growMin) * growth

        return output
    }
}