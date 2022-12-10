export default class Infusions {

    static RAW_DATA = require("@/assets/TarnishedSpreadsheet/Raw_Data.json");


    constructor() {
        this["Standard"] = 0
        this["Heavy"] = 100
        this["Keen"] = 200
        this["Quality"] = 300
        this["Fire"] = 400
        this["Flame Art"] = 500
        this["Lightning"] = 600
        this["Sacred"] = 700
        this["Magic"] = 800
        this["Cold"] = 900
        this["Poison"] = 1000
        this["Blood"] = 1100
        this["Occult"] = 1200
    }


    getWeaponByInfusion(weaponId, infusion) {
        const infusedWeaponId = Number(weaponId) + Number(this[infusion])
        const infusedWeapon = Infusions.RAW_DATA.find((x) => x.ID == infusedWeaponId)
        return infusedWeapon
    }
}