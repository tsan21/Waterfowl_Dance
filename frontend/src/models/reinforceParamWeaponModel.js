export default class ReinforceParamWeaponModel {

    constructor(id, physAtk, magAtk, fireAtk, lightAtk, holyAtk, stamAtk, strAtk, dexAtk, intAtk, faiAtk, arcAtk) {
        this["ID"] = id
        this["Physical Attack"] = physAtk
        this["Magic Attack"] = magAtk
        this["Fire Attack"] = fireAtk
        this["Lightning Attack"] = lightAtk
        this["Holy Attack"] = holyAtk
        this["Stamina Attack"] = stamAtk
        this["Str Scaling"] = strAtk
        this["Dex Scaling"] = dexAtk
        this["Int Scaling"] = intAtk
        this["Fai Scaling"] = faiAtk
        this["Arc Scaling"] = arcAtk
    }
}
