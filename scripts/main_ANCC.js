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
                        <button class="btn" data-matchid="${unMatch.match_id}">
                            <p class="home-odd"> ${unMatch.home_odd}</p>
                        </button>
                        <button class="btn" data-matchid="${unMatch.match_id}">
                            <p class="draw-odd">${unMatch.draw_odd}</p>
                        </button>
                        <button class="btn" data-matchid="${unMatch.match_id}">
                            <p class="away-odd">${unMatch.away_odd}</p>
                        </button>
                    </div>
                </div>        
                `
            })
            
                // fuonctions pour mes boutons
                let buttons = document.querySelectorAll('.btn');
                let selectedMatchId;
                
                // Sélectionnez les boutons et ajoutez un clic
                buttons.forEach(button => {
                    console.log(button.dataset.matchid);
                button.addEventListener('click', () => {
                    const currentMatchId = button.dataset.matchid;
                    if (selectedMatchId === currentMatchId) {
                    // Si le match est déjà sélectionné, désélectionnez-le
                    button.classList.remove('selected');
                    selectedMatchId = null;
                    } else {
                    // Si un autre match est sélectionné, désélectionnez-le
                    if (selectedMatchId) {
                        const previouslySelectedButtons = document.querySelectorAll(`.paris-odd[data-matchid="${selectedMatchId}"] .btn.selected`);
                        previouslySelectedButtons.forEach(button => button.classList.remove('selected'));
                        }
                        // Sélectionnez le nouveau bouton
                        button.classList.add('selected');
                        selectedMatchId = currentMatchId;
                        // Display the selected button's value (data-matchid) in the console
                        console.log(`Selected button value (match ID): ${selectedMatchId}`);
                        }
                    });
                });
        }


        // Fonction pour afficher les utilisateur Male
        // robotsM.addEventListener("click", displayGenderMale)
        // function displayGenderMale() {
        //     const maleUsers = data.robots.filter(user => user.gender === 'Male')
        //     gallery.innerHTML = ''
        //     maleUsers.forEach(function(singleUser){
        //         gallery.innerHTML += `
        //         <img class="user-img" data-userGender="${singleUser.gender}" src="${singleUser.portrait}" title="${singleUser.last_name}">
        //         `
        //     })
        // }
        allMatchs()
    })
    .catch(error => {console.log("Erreur lors de la récup des données :", error);
    })


    



    // ----------- APRES INNERHTML ------------- test

    // Variables
    const sections = document.querySelectorAll('.paris-odd');
    const selectedCotes = [];
    const selectedCotesElement = document.querySelector('.selected-odds');

    // Fonctions
    function selectOdd(event) {
    const button = event.target;
    const matchId = button.dataset.matchid;
    const oddValue = button.dataset.oddvalue;

    button.classList.add('selected');

    selectedCotes.push({
        matchId,
        oddValue,
    });
    }
    function calculateResult() {
    if (selectedCotes.length === 0) {
        console.log('Veuillez sélectionner au moins une cote.');
        return;
    }

    let result = 1;
    for (const cote of selectedCotes) {
        result *= parseFloat(cote.unMatch.home_odd);
    }

    console.log(`Résultat final : ${result.toFixed(2)}`);
    }
    // Ecouteurs d'événements
    sections.forEach(section => {
    section.addEventListener('click', selectOdd);
    });
    // Ajoute la cote sélectionnée à l'affichage
    const li = document.createElement('li');
    li.textContent = `${unMatch.hometeam} (${unMatch.home_odd})`;
    selectedCotesElement.appendChild(li);
