
function Boss(hitPoints,isStunned,stunDiminishing) {
    this.hitPoints = hitPoints,
    this.isStunned = isStunned,
    this.stunDiminishing = stunDiminishing
}



Boss.prototype.incomingDmg = function(DMG) {
    console.log(this)
    if(!this.isStunned) {
        DMG = DMG * 0.5;
    } else {
        this.stunDiminishing++
        DMG = DMG * 2;
        console.log("It`s SUPER effective")
        if (this.stunDiminishing >= 0){
            this.isStunned = false;
        }
    }
    
    this.hitPoints-= DMG;
    console.log(target)
}



const target = new Boss(1000000, false, 0)


function ChaosBolt(target1) {
    console.log("Imp cast Chaos Bolt!");    
    setTimeout(()=>{
        target1.incomingDmg(100000)
        //console.log(target)
        console.log("Bolt strikes")
    }
    , 10)
    

    ;
}

function Curse(target1) {
    console.log("Imp Curses the target!"); 
    setTimeout(()=>{
        target1.incomingDmg(10000);
        target1.stunDiminishing = -5
        //console.log(target);
        console.log("Target is cursed");
    }
        ,1000)
    
}

function HornsBush(target1) {
    console.log("Imp prepares for bush!");  
    setTimeout(()=>{  
        target1.incomingDmg(30000);
        target1.isStunned = true;
        target1.stunDiminishing--
        //console.log(target);
        console.log('Punch!');
    }
    , 1000)
    
}

function HellRain(target1) {
    console.log("Imp casting Hell Rain!");
    setTimeout(()=>{
        if (target1.isStunned){
            console.log("First strike!");
            target1.incomingDmg(100000);
            console.log("Second strike!");
            target1.incomingDmg(100000);
            console.log("Third strike!");
            target1.incomingDmg(100000);
        } else {
            console.log("Boss evades!");
            target1.incomingDmg(100000);
        
        //console.log(target);
        }
    }, 1000)
    //console.log(target);
}

function DarkSeal(target1) {
    console.log("Imp casting Dark Seal!");
    setTimeout(()=>{
        target1.stunDiminishing = -10;
        target1.isStunned = true;
        target1.incomingDmg(300000);
        //console.log(target);
        console.log("Sealed!");
    }, 3000)
    
}




//target.incomingDmg(10000000);

/* DarkSeal(target);
setTimeout(()=>{}, 1000)

Curse(target);

ChaosBolt(target);

HornsBush(target);
setTimeout(()=>{}, 1000)


HellRain(target); */

function StrikeDarkSeal(){
    const comboAttack = new Promise((resolve)=>{
    setTimeout(()=>{DarkSeal(target);
        resolve();
    }, 3000)
    })
    return comboAttack
}

function StrikeDarkSeal(){
    const comboAttack = new Promise((resolve)=>{
    setTimeout(()=>{DarkSeal(target);
        resolve();
    }, 100)
    })
    return comboAttack
}

function StrikeChaosBolt(){
    const comboAttack = new Promise((resolve)=>{
    setTimeout(()=>{ChaosBolt(target);
        resolve();
    }, 1000)
    })
    return comboAttack
}

function StrikeCurse(){
    const comboAttack = new Promise((resolve)=>{
    setTimeout(()=>{Curse(target);
        resolve();
    }, 1000)
    })
    return comboAttack
}

function StrikeHellRain(){
    const comboAttack = new Promise((resolve)=>{
    setTimeout(()=>{HellRain(target);
        resolve();
    }, 1000)
    })
    return comboAttack
}

function StrikeHornsBush(){
    const comboAttack = new Promise((resolve)=>{
    setTimeout(()=>{HornsBush(target);
        resolve();
    }, 1000)
    })
    return comboAttack
}

/* StrikeDarkSeal().then(()=>{
    StrikeHornsBush().then(()=>{
        StrikeChaosBolt().then(()=>{
            StrikeHellRain().then()
        })
    })
}) */
//StrikeCurse().then()


/* StrikeDarkSeal()
.then(()=>StrikeHornsBush())
.then(()=>StrikeChaosBolt())
.then(()=>StrikeHellRain())
 */

async function PunchLine() {
    await StrikeDarkSeal();
    await StrikeHornsBush();
    await StrikeChaosBolt();
    await StrikeHellRain()
}

PunchLine()


