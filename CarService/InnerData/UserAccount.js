const {AccountData, UserData, ArticleData, CommentData, commentCounter, articleCounter, ArticleIndex, CommentIndex, CommentIndexByUser} = require('./Data')

class UserAccount {
    constructor(username, email, password){
        this.username = username,
        this.email = email,
        this.password = password
    }

    addToData(){
        AccountData.set(this.username, this);
    }

    readUserAccount(){
        console.log('Username:', this.username);
        console.log('Email:', this.email);
    }

    readUserInfo() {
        let read = UserData.get(this.username);
        console.log("My name is", read.FIO, "and i`m  born in ", read.dateofbirth);
        console.log(read.aboutMe);
    
    }

    readAllArticles() {
        ArticleIndex[this.username].forEach((value) =>{
            ArticleData.get(value).readAllComments();
            console.log('\n');

        })
    }
    readAllComments() {
        CommentIndexByUser[this.username].forEach((value) =>{
            CommentData.get(value).readComment();
            console.log('\n');
        })
    }

    userSummary() {
        console.log('Reading');
        this.readUserAccount();
        console.log('\n User personal data:');
        this.readUserInfo();
        console.log('\n User Articles:');
        this.readAllArticles();
        console.log('\n User comments:');
        this.readAllComments();
    }

    getUsername(){
        return this.username;
    }
    getEmail(){
        return this.email;
    }
    getPassword(){
        return this.password;
    }

}

module.exports = UserAccount;