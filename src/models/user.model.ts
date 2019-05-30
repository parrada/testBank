export class User {
    firstname: string
    lastname: string
    identification: string
    birthdate: string

    constructor(name,lastName,identification,birthdate){
        this.firstname = name
        this.lastname = lastName
        this.identification = identification
        this.birthdate = birthdate
    }
}