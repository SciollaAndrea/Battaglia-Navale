const messaggioHtml = document.getElementById("messaggio");
let secondi = 0;
let timer;
let vittoria = false;
let gioco = [];
let tipiBarche = [1, 1, 1, 1, 0, 0, 0, 0, 0, 
    1, 1, 1, 0, 1, 1, 1, 0, 0,
    1, 1, 0, 1, 1, 0, 1, 1, 0,
    1, 0, 1, 0, 1, 0, 1, 0, 0
];
let lunghezzaBarche = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
let numeroBombe = 0;

inizializza();

function inizializza(){
    inizializzaGioco();
    inizializzaBarche();
    posizionaBarche();
}

function inizializzaGioco(){
    for (let i = 0; i < 10; i++)
    {
        gioco[i] = [];
        for(let j = 0; j < 10; j++)
        {
            let cella = document.createElement("div");
            cella.classList.add("cella");
            cella.classList.add("cellaNave")
            cella.id = `cella${i}${j}`;
            cella.addEventListener('click', () => {
                sparaBomba(cella);
            });
            gioco[i][j] = -1;
            document.getElementById("grigliaGioco").append(cella);
        }
    }
}

function inizializzaBarche(){
    for (let i = 0; i < 36; i++)
    {
        let cella = document.createElement("div");
        cella.classList.add("cella");
        if (tipiBarche[i] == 1)
        {
            cella.classList.add("cellaNave")
        }
        cella.id = `cellaEsempio${i}`;
        document.getElementById("tipiBarche").append(cella);
    }
}

function posizionaBarche(){
    let i = 0;
    let direzione = true;
    while (i < lunghezzaBarche.length)
    {
        let posizionabile = true;
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);
        let j = 0;

        while (j < lunghezzaBarche[i] && posizionabile)
        {
            if (direzione)
            {
                if (y + j > 9 || gioco[x][y + j] != -1)
                {
                    posizionabile = false;
                }
            }
            else
            {
                if (x + j > 9 || gioco[x + j][y] != -1)
                {
                    posizionabile = false;
                }
            }
            j++;   
        }
        if (posizionabile)
        {
            for(j = 0; j < lunghezzaBarche[i]; j++)
            {
                if (direzione)
                {
                    gioco[x][y + j] = i;
                }
                else
                {
                    gioco[x + j][y] = i;
                }
            }
            i++;
        }
        direzione = !direzione;
    }
    console.log(gioco);
}

function sparaBomba(cella){
    const numeroBombeHtml = document.getElementById("numeroBombe");
    if (numeroBombe == 0)
    {
        avviaTimer();
    }
    if (!vittoria)
    {
        x = cella.id[5];
        y = cella.id[6];
        if (gioco[x][y] == -1)
        {
            numeroBombe++;
            numeroBombeHtml.textContent = `Bombe sparat: ${numeroBombe}`;
            cella.classList.add("acqua");
            messaggioHtml.textContent = "Acqua!";
            messaggioHtml.style.color = "darkblue";
            gioco[x][y] = -2;
        }
        else if (gioco[x][y] != -2)
        {
            numeroBombe++;
            numeroBombeHtml.textContent = `Bombe sparat: ${numeroBombe}`;
            cella.classList.add("colpita");
            messaggioHtml.textContent = "Colpita!";
            messaggioHtml.style.color = "red";
            
            let barca = gioco[x][y];
            lunghezzaBarche[barca]--;
    
            if (lunghezzaBarche[barca] == 0)
            {
                messaggioHtml.textContent = "Colpita e Affondata!";
                messaggioHtml.style.color = "black";
           
                let posizionaBarcaAffondata = 0;
                let i = 0;
                while(posizionaBarcaAffondata != barca && i < 35)
                {
                    if (tipiBarche[i] == 0 && tipiBarche[i + 1] == 1)
                    {
                        posizionaBarcaAffondata++;
                    }
                    i++;
                }
    
                while(tipiBarche[i] == 1)
                {
                    document.getElementById(`cellaEsempio${i}`).classList.add("colpita");
                    i++;
                }
    
                controllaVittoria();
            }
    
            gioco[x][y] = -2;
        }   
    }
}

function controllaVittoria(){
    let i = 0;
    vittoria = true;
    while (i < 10 && vittoria)
    {
        if (lunghezzaBarche[i] != 0)
        {
            vittoria = false;
        }
        i++;
    }

    if (vittoria)
    {
        messaggioHtml.textContent = "HAI AFFONDATO TUTTE LE NAVI!!!";
        messaggioHtml.style.color = "gold";
        messaggioHtml.style.fontSize = "40pt";
        document.getElementById("rigioca").style.display = "block";
        clearInterval(timer);
        timer = null;
        document.getElementById("punteggio").textContent = `il tuo punteggio è: ${1000 - numeroBombe * 7 - secondi * 2}`;
    }
}

function nuovaPartita(){
    location.reload();
}

function avviaTimer(){
    timer = setInterval(() => {
        secondi++;
        let stringaTempo = "";
        let copiaSecondi = secondi;

        let ore = Math.floor(copiaSecondi / 3600);
        if (ore < 10)
        {
            stringaTempo += "0" + ore + " : ";
        }
        else
        {
            stringaTempo += ore + " : ";
        }  
        copiaSecondi -= Math.floor(copiaSecondi / 3600) * 3600;
        
        let minuti = Math.floor(copiaSecondi / 60);
        if (minuti < 10)
        {
            stringaTempo += "0" + minuti + " : ";
        }
        else
        {
            stringaTempo += minuti + " : ";
        }
        copiaSecondi -= Math.floor(copiaSecondi / 60) * 60;

        if (copiaSecondi < 10)
        {
            stringaTempo += "0" + copiaSecondi;
        }
        else
        {
            stringaTempo += copiaSecondi;
        }
        
        document.getElementById("timer").textContent = stringaTempo;
    }, 1000);
}