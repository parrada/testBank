export default class Util {

    /* date methods */

    static getAntiquity(userDate, minAntiquityrequired): boolean {
        let uDate = Date.parse(userDate)
        let validationDate = new Date(uDate);
        let currentDate = new Date();
        let antiquity;
        antiquity = (currentDate.getFullYear() - validationDate.getFullYear()) * 12;
        antiquity -= validationDate.getMonth() + 1;
        antiquity += currentDate.getMonth();

        if(antiquity < minAntiquityrequired){
            return false
        }
        return true
    }

    static calculateAge(userRegisterAgeDate) {
        let userDate = Date.now() - Date.parse(userRegisterAgeDate)
        let age = new Date(userDate);
        return Math.abs(age.getUTCFullYear() - 1970)
    }
}