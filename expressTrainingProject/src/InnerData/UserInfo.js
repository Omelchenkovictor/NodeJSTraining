const {AccountData, UserData, ArticleData, CommentData, commentCounter, articleCounter, ArticleIndex, CommentIndex, CommentIndexByUser} = require('./Data');
const UserAccount = require('./UserAccount');
class UserInfo {
    username = undefined
    aboutMe = 'new user';
    constructor(FIO, dateofbirth){
        this.FIO = FIO,
        this.dateofbirth = dateofbirth
    }

    readUserInfo(username){
        console.log('FIO:', this.FIO);
        console.log('Date of birth:', this.dateofbirth);
        console.log('AboutUser:', this.aboutMe);

    }

    addToData(){
        UserData.set(this.username, this);
    }

    getFIO(){
        return this.FIO;
    }
    getDateOfBirth(){
        return this.dateofbirth;
    }
    getAboutMe(){
        return this.aboutMe;
    }

    ChangeFIO(FIO){
        this.FIO = FIO;
    }
    
    ChangeDateOfB(FIO){
        this.FIO = FIO;
    }
    ChangeAboutMe(aboutMe){
        this.aboutMe = aboutMe;
    }
}

module.exports = UserInfo;