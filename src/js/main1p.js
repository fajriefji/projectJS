// =================== Rumus game =========================
// Canvas 1
const canvas1 = document.getElementById('tetris1');
const context1 = canvas1.getContext('2d');

context1.scale(20, 20);


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
const arena1 = createMatrix1(30, 20);


// Player 1
const player1 = {
    pos1: {x: 0, y: 0},
    matrix1: null,
    score1: 0,
};


// Waktu 1
let dropCounter1 = 0;
let dropInterval1 = 200;
let lastTime1 = 0;


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

// Fungsi luas kotak hitam 
function createMatrix1(w, h){
    const matrix1 = [];
    while (h--){
        matrix1.push(new Array(w).fill(0))
    }
    return matrix1;
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

function draw1(){
    context1.fillStyle = '#000';
    context1.fillRect(0, 0, canvas1.width, canvas1.height);

    drawMatrix1(arena1, {x:0, y:0});
    drawMatrix1(player1.matrix1, player1.pos1);
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


function playerMove1(offset){
    player1.pos1.x += offset;
    if (collide1(arena1, player1)){
        player1.pos1.x -= offset;
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

function updateScore1(){
    document.getElementById('score1').innerText = player1.score1;
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

