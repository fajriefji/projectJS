// =================== Rumus game =========================
// Canvas 1
const canvas1 = document.getElementById('tetris1');
const context1 = canvas1.getContext('2d');

context1.scale(20, 20);

// Canvas 2
const canvas2 = document.getElementById('tetris2');
const context2 = canvas2.getContext('2d');

context2.scale(20, 20);


// Color
const colors = [
    null,
    '#FF0D72',
    '#0DC2FF',
    '#0DFF72',
    '#F538FF',
    '#FF8E0D',
    '#FFE138',
    '#3877FF',
    '#1227FF',
    '#F538FF'
];

// Matrix 1
const arena1 = createMatrix1(15, 20);

// Matrix 2
const arena2 = createMatrix2(15, 20);

// Player 1
const player1 = {
    pos1: {x: 0, y: 0},
    matrix1: null,
    score1: 0,
};

// Player 2
const player2 = {
    pos2: {x: 0, y: 0},
    matrix2: null,
    score2: 0,
};

// Waktu 1
let dropCounter1 = 0;
let dropInterval1 = 200;
let lastTime1 = 0;

// Waktu 2
let dropCounter2 = 0;
let dropInterval2 = 200;
let lastTime2 = 0;

// Kontrol game 1
document.addEventListener('keydown', event1 => {
    if ( event1.keyCode === 65) { //A
        playerMove1(-1); //KIRI
    } else if (event1.keyCode === 68) { //D
        playerMove1(1); //KANAN
    } else if (event1.keyCode === 83){ //S
        playerDrop1(); //BAWAH
    } else if ( event1.keyCode === 87){ //W
        playerRotate1(-1); //MUTAR KIRI
    } else if( event1.keyCode === 81){ //Q
        playerRotate1(1); //MUTAR KANAN
    }
});

// Kontrol game 2
document.addEventListener('keydown', event2 => {
    if ( event2.keyCode === 37) { //KIRI
        playerMove2(-1); //KIRI
    } else if (event2.keyCode === 39) { //KANAN
        playerMove2(1); //KANAN
    } else if (event2.keyCode === 40){ //BAWAH
        playerDrop2(); //BAWAH
    } else if ( event2.keyCode === 38){ //ATAS
        playerRotate2(-1); //MUTAR KIRI
    } else if( event2.keyCode === 17){ //CTRL
        playerRotate2(1); //MUTAR KANAN
    }
});

// Fungsi hapus paling bawah + skor 1
function arenaSweep1(){
    let rowCount = 1;
    outer: for ( let y = arena1.length - 1; y > 0; --y){
        for (let x = 0; x < arena1[y].length; ++x){
            if (arena1[y][x] === 0) {
                continue outer;
            }
        }
        const row1 = arena1.splice(y, 1)[0].fill(0);
        arena1.unshift(row1);
        ++y;
        
        player1.score1 += rowCount * 10;
        rowCount *= 2;
    }
}

// Fungsi hapus paling bawah + skor 2
function arenaSweep2(){
    let rowCount = 1;
    outer: for ( let y = arena2.length - 1; y > 0; --y){
        for (let x = 0; x < arena2[y].length; ++x){
            if (arena2[y][x] === 0) {
                continue outer;
            }
        }
        const row2 = arena2.splice(y, 1)[0].fill(0);
        arena2.unshift(row2);
        ++y;

        player2.score2 += rowCount * 10;
        rowCount *= 2;
    }
}

// Fungsi bersinggungan 1
function collide1(arena1, player1){
    const m1 = player1.matrix1;
    const o1 = player1.pos1;
    for ( let y = 0; y < m1.length; ++y){
        for (let x = 0; x < m1[y].length; ++x){
            if (m1[y][x] !== 0 && (arena1[y + o1.y] && arena1[y + o1.y][x + o1.x]) !== 0){
                return true; 
            }
        }
    }
    return false;
}

// Fungsi bersinggungan 2
function collide2(arena2, player2){
    const m2 = player2.matrix2;
    const o2 = player2.pos2;

    for ( let y = 0; y < m2.length; ++y){
        for (let x = 0; x < m2[y].length; ++x){
            if (m2[y][x] !== 0 && (arena2[y + o2.y] && arena2[y + o2.y][x + o2.x]) !== 0){
                return true;
            }
        }
    }
    return false;
}

// Fungsi luas kotak hitam 
function createMatrix1(w, h){
    const matrix1 = [];
    while (h--){
        matrix1.push(new Array(w).fill(0))
    }
    return matrix1;
}

// Fungsi luas kotak hitam 
function createMatrix2(w, h){
    const matrix2 = [];
    while (h--){
        matrix2.push(new Array(w).fill(0));
    }
    return matrix2;
}

// Fungsi balok (ALL)
function createPiece1(type){
    if( type === 'I'){
        return [
            [0, 0, 1],
            [0, 0, 1],
            [1, 1, 1],
        ];
    } else if ( type === 'L'){
        return [
            [0, 2, 2, 0],
            [0, 2, 2, 0],
            [0, 2, 2, 0],
            [0, 2, 2, 0],
        ];
    } else if ( type === 'J'){
        return [
            [3, 0, 3],
            [3, 0, 3],
            [3, 0, 3],
        ];
    } else if ( type === 'O'){
        return [
            [4, 4],
            [4, 4],
        ];
    } else if(type === 'Z'){
        return [
            [5, 5, 0],
            [0, 5, 5],
            [0, 0, 0],
        ];
    } else if (type === 'S'){
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    } else if ( type === 'T'){
        return [
            [0, 7, 0],
            [7, 7, 7],
            [0, 0, 0],
        ];
    } else if ( type === 'A'){
        return [
            [0, 8, 0],
            [0, 8, 0],
            [0, 8, 0],
            [0, 8, 0],
        ];
    }  else if ( type === 'F'){
        return [
            [0, 9, 0],
            [9, 9, 9],
            [9, 9, 0],
        ];
    }
}

// Fungsi balok (ALL)
function createPiece2(type){
    if( type === 'I'){
        return [
            [0, 0, 1],
            [0, 0, 1],
            [1, 1, 1],
        ];
    } else if ( type === 'L'){
        return [
            [0, 2, 2, 0],
            [0, 2, 2, 0],
            [0, 2, 2, 0],
            [0, 2, 2, 0],
        ];
    } else if ( type === 'J'){
        return [
            [3, 0, 3],
            [3, 0, 3],
            [3, 0, 3],
        ];
    } else if ( type === 'O'){
        return [
            [4, 4],
            [4, 4],
        ];
    } else if(type === 'Z'){
        return [
            [5, 5, 0],
            [0, 5, 5],
            [0, 0, 0],
        ];
    } else if (type === 'S'){
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    } else if ( type === 'T'){
        return [
            [0, 7, 0],
            [7, 7, 7],
            [0, 0, 0],
        ];
    } else if ( type === 'A'){
        return [
            [0, 8, 0],
            [0, 8, 0],
            [0, 8, 0],
            [0, 8, 0],
        ];
    }  else if ( type === 'F'){
        return [
            [0, 9, 0],
            [9, 9, 9],
            [9, 9, 0],
        ];
    }
}

// Buat matrix game 1
function drawMatrix1(matrix1, offset){
    matrix1.forEach((row1, y) => {
        row1.forEach((value, x) => {
            if (value !== 0){
                context1.fillStyle = colors[value];
                context1.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

// Buat matrix game 2
function drawMatrix2(matrix2, offset){
    matrix2.forEach((row2, y) => {
        row2.forEach((value, x) => {
            if (value !== 0){
                context2.fillStyle = colors[value];
                context2.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

function draw1(){
    context1.fillStyle = '#000';
    context1.fillRect(0, 0, canvas1.width, canvas1.height);

    drawMatrix1(arena1, {x:0, y:0});
    drawMatrix1(player1.matrix1, player1.pos1);
}

function draw2(){
    context2.fillStyle = '#000';
    context2.fillRect(0, 0, canvas2.width, canvas2.height);
    drawMatrix2(arena2, {x:0, y:0});
    drawMatrix2(player2.matrix2, player2.pos2);
}

function merge1(arena1, player1){
    player1.matrix1.forEach((row1, y) => {
        row1.forEach((value, x) =>{
            if (value !== 0){
                arena1[y + player1.pos1.y][x + player1.pos1.x] = value;
            }
        });
    });
}

function merge2(arena2, player2){
    player2.matrix2.forEach((row2, y) => {
        row2.forEach((value, x) =>{
            if (value !== 0){
                arena2[y + player2.pos2.y][x + player2.pos2.x] = value;
            }
        });
    });
}

function rotate1(matrix1, dir){
    for ( let y = 0; y< matrix1.length; ++y){
        for (let x = 0; x < y; ++x){
            [
                matrix1[x][y],
                matrix1[y][x],
            ] = [
                matrix1[y][x],
                matrix1[x][y],
            ]
        }
    }

    if (dir > 0){
        matrix1.forEach(row1 => row1.reverse());
    } else {
        matrix1.reverse();
    }
}

function rotate2(matrix2, dir){
    for ( let y = 0; y< matrix2.length; ++y){
        for (let x = 0; x < y; ++x){
            [
                matrix2[x][y],
                matrix2[y][x],
            ] = [
                matrix2[y][x],
                matrix2[x][y],
            ]
        }
    }

    if (dir > 0){
        matrix2.forEach(row2 => row2.reverse());
    } else {
        matrix2.reverse();
    }
}

function playerDrop1(){
    player1.pos1.y++;
    if(collide1(arena1, player1)){
            player1.pos1.y--;
            merge1(arena1, player1);
            playerReset1();
            arenaSweep1()
            updateScore1();
        }

    dropCounter1 = 0;
}

function playerDrop2(){
    player2.pos2.y++;
    if(collide2(arena2, player2)){
        player2.pos2.y--;
        merge2(arena2, player2);
        playerReset2();
        arenaSweep2();
        updateScore2();
    }

    dropCounter2 = 0;
}

function playerMove1(offset){
    player1.pos1.x += offset;
    if (collide1(arena1, player1)){
        player1.pos1.x -= offset;
    }
}

function playerMove2(offset){
    player2.pos2.x += offset;
    if (collide2(arena2, player2)){
        player2.pos2.x -= offset;
    }
}

function playerReset1(){
    const pieces1 = 'TJLOSZIAF';
    player1.matrix1 = createPiece1(pieces1[pieces1.length * Math.random() | 0]);
    player1.pos1.y = 0;
    player1.pos1.x = (arena1[0].length / 2 | 0) - (player1.matrix1[0].length / 2 | 0);

    if ( collide1(arena1, player1)){
        arena1.forEach(row1 => row1.fill(0));
        player1.score1 = 0;
        updateScore1();
    }
}

function playerReset2(){
    const pieces2 = 'TJLOSZIAF';
    player2.matrix2 = createPiece2(pieces2[pieces2.length * Math.random() | 0]);
    player2.pos2.y = 0;
    player2.pos2.x = (arena2[0].length / 2 | 0) - (player2.matrix2[0].length / 2 | 0);

    if ( collide2(arena2, player2)){
        arena2.forEach(row2 => row2.fill(0));
        player2.score2 = 0;
        updateScore2();
    }
}

function playerRotate1(dir){
    const pos1 = player1.pos1.x;
    let offset1 = 1;
    rotate1(player1.matrix1, dir);

    while(collide1(arena1, player1)){
        player1.pos1.x += offset1;
        offset1 = -(offset1 +(offset1 > 0 ? 1 : -1));
        if ( offset1 > player1.matrix1[0].length){
            rotate1(player1.matrix1, -dir);
            player1.pos1.x = pos1;
            return;
        }
    }
}

function playerRotate2(dir){
    const pos2 = player2.pos2.x;
    let offset2 = 1;
    rotate2(player2.matrix2, dir);

    while(collide2(arena2, player2)){
        player2.pos2.x += offset2;
        offset2 = -(offset2 +(offset2 > 0 ? 1 : -1));
        if ( offset2 > player2.matrix2[0].length){
            rotate2(player2.matrix2, -dir);
            player2.pos2.x = pos2;
            return;
        }
    }
}

function update1(time = 0){
    const deltaTime = time - lastTime1;

    dropCounter1 += deltaTime;
    if (dropCounter1 > dropInterval1){
        playerDrop1();
    }

    lastTime1 = time;

    draw1();
    requestAnimationFrame(update1);
}

function update2(time = 0){
    const deltaTime2 = time - lastTime2;

    dropCounter2 += deltaTime2;
    if (dropCounter2 > dropInterval2){
        playerDrop2();
    }

    lastTime2 = time;

    draw2();
    requestAnimationFrame(update2);
}

function updateScore1(){
    document.getElementById('score1').innerText = player1.score1;
}

function updateScore2(){
    document.getElementById('score2').innerText = player2.score2;
}
// ===========================================================

// =========== Waktu =================
function Timer(){
    var timeleft = 30;
    var downloadTimer = setInterval(function(){
    document.getElementById("countdown").innerHTML = timeleft;
    timeleft -= 1;
    if(timeleft <= 0){
        clearInterval(downloadTimer);
        document.getElementById("countdown").innerHTML = "KO"
    }
    }, 1000);
}
// ======================================


// ================== eksekusi game ======================
playerReset1();
updateScore1();
update1();

playerReset2();
updateScore2();
update2();

Timer();
// ======================================================

//=========== Animasi =============
function myMove() {
    var elem = document.getElementById("myAnimation");   
    var pos = 0;
    var id = setInterval(frame, 10);
    function frame() {
      if (pos == 350) {
        clearInterval(id);
      } else {
        pos++; 
        elem.style.top = pos + 'px'; 
        elem.style.left = pos + 'px'; 
      }
    }
  }

// =========  Lagu backsound =========
function PlaySound(soundObj) {
    var sound = document.getElementById(soundObj);
    sound.Play();
  }


PlaySound("sound1");
PlaySound("sound2");

