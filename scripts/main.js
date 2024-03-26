// Variiables
const oneMatch = document.querySelector(".one-match")





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
                            <p class="home-odd"> ${unMatch.home_odd}</p>
                        </button>
                        <button class="btn" data-matchid="${unMatch.draw_odd}">
                            <p class="draw-odd">${unMatch.draw_odd}</p>
                        </button>
                        <button class="btn" data-matchid="${unMatch.away_odd}">
                            <p class="away-odd">${unMatch.away_odd}</p>
                        </button>
                    </div>
                </div>        
                `
            })

            // fuonctions pour mes boutons
            const sections = document.querySelectorAll('.paris-odd');

            sections.forEach(section => {
                section.addEventListener('click', function(event)
                {
                    // On check si on est bien sur un bouton
                    if (event.target.classList.contains('btn')) {
                        const clickedButtonValue = event.target.dataset.matchid;
                        console.log(`Bouton cliqué : ${clickedButtonValue}`);
                    // On récupère tous les boutons de la section
                    const buttons = section.querySelectorAll('.btn');

                    // On parcourt chaque bouton de la section
                    buttons.forEach(button => {
                        let currentMatchId = button.dataset.matchid.home_odd
                        // On supprime la classe 'selected' de tous les boutons
                        button.classList.remove('selected');
                        console.log(currentMatchId);
                    });

                    // On ajoute la classe 'selected' au bouton cliqué
                    event.target.classList.add('selected');
                    }
                });
            });
        }
        allMatchs()
    })
    .catch(error => {console.log("Erreur lors de la récup des données :", error);
    })
