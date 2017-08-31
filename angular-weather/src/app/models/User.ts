export class User {
    fullName: String;
    email: String;
    password: String;
    passwordVerif: String;

    constructor(fullName: String, email: String, password: String, passwordVerif: String){
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.passwordVerif = passwordVerif;
    }
}