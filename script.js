let game = document.getElementById("game");
let icon = ["blogger", "deviantart", "digg", "dribbble", "facebook", "flickr", "instagram", "linkedin", "pinterest", "rss", "skype", "tumblr", "twitter", "vimeo", "youtube"];
let n = 4;
let A = [];
let T = [];
let flag = 0;
let open = "";
let oi, oj;

for (i = 0; i < n * n / 2; i++) {
    A[i] = i;
    A[i + n * n / 2] = i;
}

for (i = 0; i < n; i++) {
    T[i] = [];
    for (j = 0; j < n; j++) {
        T[i][j] = [];
        r = rand(A.length);
        T[i][j][0] = A[r];
        T[i][j][1] = 1;
        A.splice(r, 1);
    }
}
createTable();
setTimeout(turnOff, 3000);

function createTable() {
    let kod = img = "";
    let r;
    for (i = 0; i < n; i++) {
        kod += "<tr>";
        for (j = 0; j < n; j++) {
            if (T[i][j][1] == 1)
                img = "icons/" + icon[T[i][j][0]] + ".png";
            else img = "icons/empty.png";
            kod += '<td onclick="openCell(' + i + ',' + j + ')"><img src="' + img + '" /></td>';
        }
        kod += "</tr>";
    }
    game.innerHTML = kod;
}
function openCell(i, j) {
    T[i][j][1] = 1;
    createTable();
    if (++flag % 2) {
        open = T[i][j][0];
        oi = i;
        oj = j;
    } else {
        if (T[i][j][0] != open) {
            T[i][j][1] = 0;
            T[oi][oj][1] = 0;
            setTimeout(createTable, 500)
        } else {
            open = "";
        }
    }
}
function turnOff() {
    for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
            T[i][j][1] = 0;
        }
    }
    createTable();
}
function rand(max) {
    return Math.floor(Math.random() * max);
}