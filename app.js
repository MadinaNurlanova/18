// const contentWrapper = document.querySelector(".contentWrapper")
// let nextPage = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10'

// const handleRequest = () => {
//     const request = new XMLHttpRequest()
//     // создали запрос, new обязательно
//     request.open("GET", nextPage)
//     // обьявление метода и пути запроса
//     request.setRequestHeader("Content-Type", "application/json")
//     // добавление заголовка
//     request.send()
//     // отправка запроса

//     request.addEventListener("load", () => {
//         // ожидание ответа
//         const response = JSON.parse(request.response)
//         console.log(response)

//         nextPage = response.next
//         // console.log(contentWrapper)
//         const contentWrapperData = document.querySelectorAll('.item')
//         console.log(contentWrapperData)
//         contentWrapperData.forEach((item) =>{
//             item.remove()
//         })
//         console.log(contentWrapperData)

//         response.results.forEach((item) => {
//                 const pokemon = document.createElement('p')
//             pokemon.classList.add('item')
//             pokemon.textContent = item.name
//             contentWrapper.append(pokemon)
//         })

//     })
// }
// handleRequest()
// кнопка далее

const contentWrapper = document.querySelector(".contentWrapper");
let nextPage = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10";
let prevPage = null;

const handleRequest = (url) => {
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.setRequestHeader("Content-Type", "application/json");
    request.send();

    request.addEventListener("load", () => {
        const response = JSON.parse(request.responseText);
        console.log(response);

        nextPage = response.next;
        prevPage = response.previous;
        
        const contentWrapperData = document.querySelectorAll('.item');
        contentWrapperData.forEach((item) => {
            item.remove();
        });

        response.results.forEach((item) => {
            const pokemon = document.createElement('p');
            pokemon.classList.add('item');
            pokemon.textContent = item.name;
            contentWrapper.append(pokemon);
        });
    });
};

const handleBackRequest = () => {
    if (prevPage) {
        handleRequest(prevPage);
    } else {  
        console.log("No previous page available.");
    }
};

const handleNextRequest = () => {
    if (nextPage) {
        handleRequest(nextPage);
    } else {
        console.log("No next page available.");
    }
};

const backButton = document.getElementById('backButton');
const nextButton = document.getElementById('nextButton');

backButton.addEventListener('click', handleBackRequest);
nextButton.addEventListener('click', handleNextRequest);

handleRequest(nextPage);
