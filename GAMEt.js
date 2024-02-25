
//הכנסת הדיבים המרכזיים למשתנים
let home = document.getElementById("homeButtons");
let menu = document.getElementById("menu");
let instructions = document.getElementById("instructionPicture");
let game = document.getElementById("game");
let loozer = document.getElementById("gameOver");
let succesLevel = document.getElementById("succesLevel");
let succesAll = document.getElementById("succesAll")
let sound1 = document.getElementById("succesSound");
let sound2 = document.getElementById("failedSound");
let sound3 = document.getElementById("backMusic");
let sound4 = document.getElementById("end");
let sound5 = document.getElementById("succesLevel1");

sound1.style.display = "none";
sound2.style.display = "none";
sound3.style.display = "none";
sound4.style.display = "none";
sound5.style.display = "none";
menu.style.display = "none";
instructions.style.display = "none";
game.style.display = "none";
loozer.style.display = "none";
succesLevel.style.display = "none";
succesAll.style.display = "none";

localStorage
//לאחר לחיצה על כפתור התחלת המשחק
function openMenu() {
    instructions.style.display = "none";
    menu.style.display = "block";
}
//לאחר לחיצה על ההוראות
function openInstruction() {
    menu.style.display = "none";
    instructions.style.display = "block";
}
//לאחר לחיצה על הכפור של חזרה לדף הבית
function backHome() {
    clearScreen();
    clearInterval(time);
    game.style.display = "none";
    home.style.display = "block";
    loozer.style.display = "none";
    succesLevel.style.display = "none";
    succesAll.style.display = "none";
    sound3.pause();
    sound5.pause();
    sound4.pause();


}
//לאחר לחיצה על הכפתור של סגירת התפריט
function closeMenu() {
    menu.style.display = "none";
}
//לאחר לחיצה על כפתור סגירת ההוראות
function closeInstructions() {
    instructions.style.display = "none";
}

//מכאן מתחיל המשחק
let wantedCharacters = ["", "url('pictures levels 1,2/אדום.jpeg')", "url('pictures levels 1,2/ירוק.jpeg')", "url('pictures levels 1,2/ירקרק.jpeg')", "url('pictures levels 1,2/צהוב.jpeg')"];
let characters = [" ", "url('pictures levels 1,2/מריו אדום.png')", "url('pictures levels 1,2/מריו מאורך.png')", "url('pictures levels 1,2/מריו ירוק.png')", "url('pictures levels 1,2/מריו צהוב.png')"];
let local = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
let wanted, times = 0;
let x = 0, y = 0;
let stage, ezerStage, climax = 0;
let countConfused = 4;
let mainDivTop = 18, mainDivLeft = 28, mainDivWidth = 72, mainDivheight = 90;
//הקצאת טיימר
let time, start, count;
//סכימת הנקודות
let score = 0;

//אתחול הטיימר
function StartTimer() {
    sound3.load();
    sound3.play();
    sound5.pause();
    countConfused = 4;
    menu.style.display = "none";
    home.style.display = "none";
    succesLevel.style.display = "none";
    succesAll.style.display = "none";

    game.style.display = "block";
    document.getElementById("timer").innerHTML = 15;
    count = 15
    time = setInterval("move()", 1000);
    stage = event.target.value;
    document.getElementById("lev" + 1).classList.remove("playNow");
    document.getElementById("lev" + 2).classList.remove("playNow");
    document.getElementById("lev" + 3).classList.remove("playNow");

    document.getElementById("lev" + stage).classList.add("playNow");
    ChoseCharacter();
}
//עדכון הטיימר
function move() {
    document.getElementById("timer").innerHTML = count;
    count--;
    sound3.play();
    if (count < 0) {
        sound3.pause();
        document.getElementById("timer").innerHTML = 0;
        clearInterval(time);
        loozer.style.display = "block";
        sound4.load();
        sound4.play();
        if (score > localStorage.getItem('maxScore')) {
            localStorage.setItem('maxScore', score)
            document.getElementById("userScore2").innerHTML = " NEW HIGH-SCORE " + score;
        }
        else
            document.getElementById("userScore2").innerHTML = " your score is: " + score + " the high-score is: " + localStorage.getItem('maxScore');
        score = 0;
        document.getElementById("score").innerHTML = "";

    }
    if (count >= 20) {
        document.getElementById("timer").innerHTML = 50;
        clearInterval(time);
        sound3.pause();
        sound5.load();
        sound5.play();

        if (stage < 3) {
            document.getElementById("nextLevel").setAttribute("value", parseInt(stage) + 1);

            document.getElementById("nextLevel").addEventListener("click", StartTimer);
            clearScreen();
            succesLevel.style.display = "block";


        }
        else {
            document.getElementById("rePlay").addEventListener("click", backHome);
            succesAll.style.display = "block";
            if (score > localStorage.getItem('maxScore')) {
                localStorage.setItem('maxScore', score)
                document.getElementById("userScore").innerHTML = " NEW HIGH-SCORE " + score;
            }
            else document.getElementById("userScore").innerHTML = " your score is: " + score + " the high-score is: " + localStorage.getItem('maxScore');
            score = 0;
            document.getElementById("score").innerHTML = "";


        }
    }
}


//הוספה לטיימר לאחר הצלחה 
function succes() {
    score++;
    count += 5;
    climax++;
    clearScreen();
    ChoseCharacter();

    sound1.play();
    document.getElementById("score").innerHTML = "score: " + score;

}

let XWanted, YWanted;
//לאחר כשלון
function failed() {
    count -= 10;
    sound2.play();

}


//הגרלת הדמות לחיפוש ומיקום בשבילה
function ChoseCharacter() {
    times++;
    ResetArr();
    wanted = Math.floor(Math.random() * 4) + 1;
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);
    local[x][y] = wanted;
    XWanted = x;
    YWanted = y;
    let w = document.getElementById("wanted");
    w.style.backgroundImage = wantedCharacters[wanted];
    w.style.backgroundRepeat = "no-repeat";
    w.style.backgroundSize = "100% 100%";

    Confusers(wanted);

}
//איפוס מטריצת המיקומים הבוליאני
function ResetArr() {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            local[i][j] = 0;
        }
    }
}
//הגרלת מיקומים לדמויות הנוספות במשחק

let current, numAnimation;

function Confusers(wanted) {

    for (var i = 0; i < countConfused; i++) {
        do {
            current = Math.floor(Math.random() * 4) + 1;
        }
        while (current == wanted);
        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        }
        while (local[x][y] != 0);
        local[x][y] = current;

    }
    if (times % 3 == 0 && countConfused < 64)
        countConfused *= 2;

    FillScreen();

}

//שליחה לפונקצית הדפסת התמונות על המסך אם המקום מלא במטריצה
let d1;
let mainDiv = document.getElementById("confusers")
function FillScreen() {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            if (local[i][j] != 0) {

                d1 = document.createElement("div");
                d1.setAttribute("id", "d" + i + j);

                d1.style.backgroundImage = characters[local[i][j]];
                d1.style.backgroundRepeat = "no-repeat";
                d1.style.backgroundSize = "100% 100%";
                d1.style.zIndex = 1;
                d1.style.height = 4 + "vh";
                d1.style.width = 2 + "vw";
                if (i == XWanted && j == YWanted) {
                    d1.addEventListener("click", succes);
                }
                else
                    d1.addEventListener("click", failed);
                d1.style.cursor = "pointer";
                document.body.appendChild(d1);
                if (stage == 2)
                    RandomCrazyAnimatios(i, j);
                placeDiv(i, j);
            }
        }

    }
    if (stage == 3)
        animationRandom();
}
//הגרלת אנימציה לכל מיקום מלא במטריצה
let intervalAnimation;
function animationRandom() {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            if (local[i][j] != 0) {
                numAnimation = Math.floor(Math.random() * 4);
                local[i][j] = new Person(local[i][j], 1, numAnimation)
            }
            else
                local[i][j] = new Person(0, 0, 0);
        }
    }
    intervalAnimation = setInterval("animationManager()", 10);
}
function animationManager() {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            if (local[i][j].color != 0) {

                arrAnimation[local[i][j].animation](i, j);

            }
        }
    }
}
let arrAnimation = [animation1, animation2, animation3, animation4];
//מילוי המסך במיקומי הדמויות
let d;
let positionLeft, positionTop;
function placeDiv(i, j) {
    d = document.getElementById("d" + i + j);
    d.style.position = "absolute";
    positionLeft = mainDivLeft + (i + 1) * 4;
    positionTop = mainDivTop + (j + 1) * 6;
    d.style.left = + positionLeft + 'vw';
    d.style.top = + positionTop + 'vh';

}


//ניקוי המסך מהדמויות לאחר הצלחה
let removed;
function clearScreen() {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            if (stage != 3 && local[i][j] != 0 || stage == 3 && local[i][j].color != 0) {
                removed = document.getElementById("d" + i + j);
                document.getElementById("d" + i + j).style.display = "none";
                document.body.removeChild(removed);

            }
        }
    }
    if (stage == 3)
        clearInterval(intervalAnimation);
}
let elem;
elem = document.getElementById("confusers");
let mainDiv1 = elem.getBoundingClientRect();

let widthScreen = screen.width * 0.73;
let heightScreen = screen.height * 0.7;
let leftBeginScreen = screen.width * 0.25;
let topBeginScreen = screen.height * 0.10;
let elemTop, elemLeft, numEnimation;

function RandomCrazyAnimatios(i, j) {
    numEnimation = Math.floor(Math.random() * 10) + 1;
    document.getElementById("d" + i + j).setAttribute("class", "enimation" + numEnimation)
}

//הזזה אלכסון למעלה
function animation1(i, j) {


    elem = document.getElementById("d" + i + j);
    let r = elem.getBoundingClientRect();
    elemLeft = r.left;
    elemTop = r.top;
    if (local[i][j].way == 1) {
        if (elemTop < heightScreen && elemLeft < widthScreen) {
            elem.style.top = elemTop + 1 + "px";
            elem.style.left = elemLeft + 1 + "px";

        }
        else {
            elem.style.top = elemTop - 1 + "px";
            elem.style.left = elemLeft - 1 + "px";
            local[i][j].way = 2;
        }
    }
    else {
        if (elemTop > topBeginScreen && elemLeft > leftBeginScreen) {
            elem.style.top = elemTop - 1 + "px";
            elem.style.left = elemLeft - 1 + "px";
        }
        else {
            elem.style.top = elemTop + 1 + "px";
            elem.style.left = elemLeft + 1 + "px";
            local[i][j].way = 1;

        }

    }

}

//הזזה אלכסון למטה
function animation2(i, j) {

    elem = document.getElementById("d" + i + j);
    let r = elem.getBoundingClientRect();
    elemLeft = r.left;
    elemTop = r.top;
    if (local[i][j].way == 1) {
        if (elemTop > topBeginScreen && elemLeft < widthScreen) {
            elem.style.top = elemTop - 1 + "px";
            elem.style.left = elemLeft + 1 + "px";

        }
        else {
            elem.style.top = elemTop + 1 + "px";
            elem.style.left = elemLeft - 1 + "px";
            local[i][j].way = 2;
        }
    }
    else {
        if (elemTop < heightScreen && elemLeft > leftBeginScreen) {
            elem.style.top = elemTop + 1 + "px";
            elem.style.left = elemLeft - 1 + "px";
        }
        else {
            elem.style.top = elemTop - 1 + "px";
            elem.style.left = elemLeft + 1 + "px";
            local[i][j].way = 1;
        }

    }
    console.log(i, j, 2, local[i][j].color, "elemLeft", elemLeft, "elemTop", elemTop)

}

//הזזה אנכית למעלה ולמטה
function animation3(i, j) {

    elem = document.getElementById("d" + i + j);
    let r = elem.getBoundingClientRect();
    elemLeft = r.left;
    elemTop = r.top;
    if (local[i][j].way == 1) {
        if (elemTop > topBeginScreen) {
            elem.style.top = elemTop - 1 + "px";


        }
        else {
            elem.style.top = elemTop + 1 + "px";
            local[i][j].way = 2;
        }
    }
    else {
        if (elemTop < heightScreen) {
            elem.style.top = elemTop + 1 + "px";
        }
        else {
            elem.style.top = elemTop - 1 + "px";
            local[i][j].way = 1;
        }

    }
    console.log(i, j, 3, local[i][j].color, "elemLeft", elemLeft, "elemTop", elemTop)

}
//הזזה אופקית ימין ושמאל
function animation4(i, j) {

    elem = document.getElementById("d" + i + j);
    let r = elem.getBoundingClientRect();
    elemLeft = r.left;
    elemTop = r.top;
    if (local[i][j].way == 1) {
        if (elemLeft < widthScreen) {
            elem.style.left = elemLeft + 1 + "px";

        }
        else {
            elem.style.left = elemLeft - 1 + "px";
            local[i][j].way = 2;
        }
    }
    else {
        if (elemLeft > leftBeginScreen) {
            elem.style.left = elemLeft - 1 + "px";
        }
        else {
            elem.style.left = elemLeft + 1 + "px";
            local[i][j].way = 1;
        }

    }
    console.log(i, j, 4, local[i][j].color, "elemLeft", elemLeft, "elemTop", elemTop)

}

//מטריצה
//var matrix = [];
//for (var i = 0; i < 9; i++) {
//    matrix[i] = [];
//    for (var j = 0; j < 9; j++) {
//        matrix[i][j] = 0;
//    }


function Person(color, way, animation) {
    this.color = color;
    this.way = way;
    this.animation = animation;

}

