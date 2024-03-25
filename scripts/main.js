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
                        <button class="btn">
                            <p class="home-odd"> ${unMatch.home_odd}</p>
                        </button>
                        <button class="btn">
                            <p class="draw-odd">${unMatch.draw_odd}</p>
                        </button>
                        <button class="btn">
                            <p class="away-odd">${unMatch.away_odd}</p>
                        </button>
                    </div>
                </div>        
                `
            })
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


    