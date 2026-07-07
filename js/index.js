const giocoHtml = document.getElementById("grigliaGioco");
const tipiBarcheHtml = document.getElementById("tipiBarche");
let gioco = [];
let tipiBarche = [1, 1, 1, 1, 0, 0, 0, 0, 
    1, 1, 1, 0, 1, 1, 1, 0, 
    1, 1, 0, 1, 1, 0, 1, 1,
    1, 0, 1, 0, 1, 0, 1, 0
];
let lunghezzaBarche = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];


function inizializza(){
    inizializzaGioco();
    inizializzaBarche();
    posizionaBarche();
}

inizializza();

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
            giocoHtml.append(cella);
        }
    }
}

function inizializzaBarche(){
    for (let i = 0; i < 32; i++)
    {
        let cella = document.createElement("div");
        cella.classList.add("cella");
        if (tipiBarche[i] == 1)
        {
            cella.classList.add("cellaNave")
        }
        cella.id = `cellaEsempio${i}`;
        tipiBarcheHtml.append(cella);
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
                    // document.getElementById(`cella${x}${y + j}`).classList.add("colpita");
                }
                else
                {
                    gioco[x + j][y] = i;
                    // document.getElementById(`cella${x + j}${y}`).classList.add("acqua");
                }
            }
            i++;
        }
        direzione = !direzione;
    }
    console.log(gioco);
}

function sparaBomba(cella){
    x = cella.id[5];
    y = cella.id[6];
    if (gioco[x][y] == -1)
    {
        cella.classList.add("acqua");
    }
}