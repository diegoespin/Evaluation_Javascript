// Variiables
const oneMatch = document.querySelector(".one-match")
const coteTotal = document.querySelector(".total")
const miseUser = document.querySelector(".mise-user")
const mainLogo = document.querySelector(".main-logo")

// Je crée un tableau avec les images
const images = ["img/bg1.png", "img/bg2.WEBP", "img/bg3.WEBP"]
// je fais un math random pour une sortis aleatoire et j'inject le tout dans Html
const randomNumber = Math.floor(Math.random() * images.length)
const imgElement = document.querySelector(".img-bc img")
imgElement.src = images[randomNumber]

// récuperations des données du fichier JSON
fetch(`scripts/datas.json`)
    .then(response => response.json())
    .then(data => {
        console.log(data.matchs);
        // Fonction pour afficher tous les matchs
        function allMatchs() {
            data.matchs.forEach(function(unMatch){
                oneMatch.innerHTML += `
                <div class="all-match">
                    <p class="match-id" data-matchid ="match_id">${unMatch.hometeam} - ${unMatch.awayteam}</p>
                    <div class="paris-odd">
                        <button class="btn" data-matchid="${unMatch.home_odd}">
                             ${unMatch.home_odd}
                        </button>
                        <button class="btn" data-matchid="${unMatch.draw_odd}">
                            ${unMatch.draw_odd}
                        </button>
                        <button class="btn" data-matchid="${unMatch.away_odd}">
                            ${unMatch.away_odd}
                        </button>
                    </div>
                </div>        
                `
            })
                        // fuonctions pour mes boutons

                        let previousResult = 1; // Variable pour stocker le résultat cumulé
                        const sections = document.querySelectorAll('.paris-odd');
                        sections.forEach(section => {
                            section.addEventListener('click', function(event) {
                                if (event.target.classList.contains('btn') && event.target.classList.contains('selected')) {
                                    // Déselectionner le bouton cliqué
                                    event.target.classList.remove('selected');
                                    previousResult /= parseFloat(event.target.dataset.matchid);
                                    console.log(`Résultat final : ${previousResult.toFixed(2)}`);
                                    coteTotal.innerHTML = 
                                    `
                                    <p>Cote totale ${previousResult.toFixed(2)}</p>
                                    `
                                } else if (event.target.classList.contains('btn') && !event.target.classList.contains('selected')) {
                                    // Désélectionner tous les boutons sélectionnés
                                    const buttons = section.querySelectorAll('.btn.selected');
                                    buttons.forEach(button => {
                                        button.classList.remove('selected');
                                    });
                                    // Sélectionner le bouton cliqué
                                    event.target.classList.add('selected');
                                    // Incrémenter le résultat cumulé
                                    const clickedButtonValue = parseFloat(event.target.dataset.matchid);
                                    previousResult *= clickedButtonValue;
                                    console.log(`Résultat final : ${previousResult.toFixed(2)}`);
                                    coteTotal.innerHTML = 
                                    `
                                    <p>Cote totale ${previousResult.toFixed(2)}</p>
                                    `
                                }
                            });
                        });
        }
        allMatchs()
    })
    .catch(error => {console.log("Erreur lors de la récup des données :", error);
    })



    // Dark Mode 

    const storageKey = 'dark-mode-enabled';
    const btnOn = document.querySelector('.btn-on');
    const mainnav = document.querySelector(".main-nav")
    const secTitre = document.querySelector(".sec-titre")

    // Charger l'état de dark mode à partir du localStorage
    if (localStorage.getItem(storageKey) === 'true') {
        mainLogo.classList.toggle('main-logo-dark');
        document.body.classList.toggle('dark-mode');
        mainnav.classList.toggle('main-nav-dark');
        secTitre.classList.toggle('sec-titre-dark');
    }

    btnOn.addEventListener('click', function() {
    // Toggle the dark mode class on the body element
    mainLogo.classList.toggle('main-logo-dark');
    document.body.classList.toggle('dark-mode');
    mainnav.classList.toggle('main-nav-dark');
    secTitre.classList.toggle('sec-titre-dark');

    // Save the current state to the localStorage
    localStorage.setItem(storageKey, document.body.classList.contains('dark-mode'));
    });