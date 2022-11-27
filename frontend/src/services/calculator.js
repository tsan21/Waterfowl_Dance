export default class Calculator {

    static reinforceParamWeaponData = require("@/assets/TarnishedSpreadsheet/Reinforce_Param_Weapon.json");


    calcAttackAndScaling(reinforceParamWeaponModel, reinforceId, upgradeLevel) {
        const finalReinforceId = (Number(reinforceId) + Number(upgradeLevel))
        const reinforceMultiplier = Calculator.reinforceParamWeaponData.find((x) => x['ID'] == finalReinforceId)
        let returnData = {}

        for (let [key, val] of Object.entries(reinforceParamWeaponModel)) {
            val *= reinforceMultiplier[key]
            returnData[key] = val
        }

        return returnData
    }

    calcStatScaling(statScalingModel, reinforceId, upgradeLevel){
        const finalReinforceId = (Number(reinforceId) + Number(upgradeLevel))
        const reinforceMultiplier = Calculator.reinforceParamWeaponData.find((x) => x['ID'] == finalReinforceId)
        let returnData = {}

        for (let [key, val] of Object.entries(statScalingModel)) {
            val *= reinforceMultiplier[key]
            returnData[key] = val
        }

        return returnData
    }
}