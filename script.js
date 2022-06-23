/*
  Create Array to store 1-100
        &&
  Shuffle the Array Elements
*/

function createCellData() {
    let cellData = new Array(100);
    for (let i = 0; i < 100; i++) {
        cellData[i] = i + 1;
    }
    cellData = cellData.sort((a, b) => Math.random() - 0.5);
    return cellData;
}

/*
    It will create 10x10 table with random elements from 1-100
*/
function createTable() {
    let tbody = document.createElement("tbody");
    const cellData = createCellData();
    let counter = 0;
    for (let i = 1; i <= 10; i++) {
        let tr = document.createElement("tr");
        for (let j = 1; j <= 10; j++) {
            let td = document.createElement("td");
            td.setAttribute("id", cellData[counter]);
            td.style.backgroundColor =
                `rgb(${Math.random() * (70) + 160}, 210, ${Math.floor(Math.random() * (70) + 160)})`;
            td.addEventListener("click", checkMultiple);
            counter++;
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    let table = document.getElementById("myTable");
    table.appendChild(tbody);
}
createTable();



/*
    checkMultiple will trigger onClick event
*/
function checkMultiple(event) {
    /* event.target is the tapped element */
    let num = +event.target.id;
    let score = +document.getElementById("score").innerText;
    let bombs = [2, 3, 5, 7];

    /* Tap Element Music */
    playMusic(num);

    /* Logic to increase score */
    if (!(bombs.includes(num)) && !document.getElementById(num).style.backgroundImage) {
        document.getElementById("score").innerText = ++score;
    }

    /* Loser Logic */
    if (bombs.includes(num)) {
        setTimeout(()=>{
            alert("Bye Looser");
            window.location.href="index.html";

        },3000);
        
        return;
    }

    /* Logic to convert the all the mutiples of tapped
        element into brick
    */
    for (let i = 1; i <= 100; i++) {
        if (+document.getElementById(i).id % num == 0) {
            document.getElementById(i).style.backgroundImage = "url('images/pngwing.png')";
            document.getElementById(i).setAttribute("class", "brick");
        }
    }

    /*Winner Logic */
    if (num == 1) {
        let pname = document.URL.split("=")[1];

        /* Validate if the score is having place in the leaderboard or not*/
        let winners = localStorage.getItem("winners");
        winners = JSON.parse(winners);
        console.log(winners);
        // search score var value is less than any one of the score value in  winners array
        winners.forEach(elem => {
            if(elem[0] == score){
                elem[1].push(pname);
                
            }
        });
        if(score !=winners[0][0] && score != winners[1][0]    && score < winners[2][0]){
            winners[2] = [score,[`${pname}`]];
            winners = winners.sort((a,b)=> a[0]-b[0]);
        }else{
            
        }
        localStorage.setItem("winners",JSON.stringify(winners));
        window.open("leaderboard.html", "Grid Game", "width=600,height=600");
        setTimeout(() => {
            window.location.href = `index.html`;
        }, 4000);
    }
/*
    playMusic triggers audio by accepting audio filename
*/
function playMusic(num) {
    let bombs = [2, 3, 5, 7];
    if (num == 1) {
        triggerAudio('audios/winner.wav');
    } else if (bombs.includes(num)) {
        triggerAudio('audios/looser.wav');
    } else if (document.getElementById(num).style.backgroundImage) {
        triggerAudio('audios/brick.wav');
    } else {
        triggerAudio('audios/bomb.wav');
    }
}

function triggerAudio(fileName) {
    let clickAudio = new Audio(fileName);
    clickAudio.play();
}
}
