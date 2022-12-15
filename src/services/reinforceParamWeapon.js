export default class ReinforceParamWeapon {

    static REINFORCE_PARAM_WEAPON = require("@/assets/TarnishedSpreadsheet/Reinforce_Param_Weapon.json");


    constructor(physAtk, magAtk, fireAtk, lightAtk, holyAtk, stamAtk, strScaling, dexScaling, intScaling, faiScaling, arcScaling) {
        this["Physical Attack"] = physAtk
        this["Magic Attack"] = magAtk
        this["Fire Attack"] = fireAtk
        this["Lightning Attack"] = lightAtk
        this["Holy Attack"] = holyAtk
        this["Stamina Attack"] = stamAtk

        this["Str Scaling"] = strScaling
        this["Dex Scaling"] = dexScaling
        this["Int Scaling"] = intScaling
        this["Fai Scaling"] = faiScaling
        this["Arc Scaling"] = arcScaling
    }


    calcAttackAndScaling(reinforceId, upgradeLevel) {
        const finalReinforceId = reinforceId + upgradeLevel
        const reinforceMultiplier = ReinforceParamWeapon.REINFORCE_PARAM_WEAPON
            .find((x) => x['ID'] == finalReinforceId)

        let returnData = {}

        for (let [key, val] of Object.entries(this)) {
            val *= reinforceMultiplier[key]
            returnData[key] = val
        }
        return returnData
    }
}