const cardArray = [
    {
        name: 'fries',
        img:  'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img:  'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img:  'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img:  'images/ice-cream.png'
    },
    {
        name: 'milshake',
        img:  'images/milkshake.png'
    },
    {
        name: 'pizza',
        img:  'images/pizza.png'
    },
    {
        name: 'fries',
        img:  'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img:  'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img:  'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img:  'images/ice-cream.png'
    },
    {
        name: 'milshake',
        img:  'images/milkshake.png'
    },
    {
        name: 'pizza',
        img:  'images/pizza.png'
    },
    
] 
cardArray.sort(() => 0.5 - Math.random())

const gridDisplay = document.querySelector('#grid')
const resultDisplay = document.querySelector('#result')
let cardsChosen = []
let cardsChosenid = []
const cardsWon =[]

function createBoard()
{
    for(let i=0; i<cardArray.length; i++)
    {
        const card = document.createElement('img')
        card.setAttribute('src', 'images/blank.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        gridDisplay.append(card)
    }
}
createBoard()
function checkMatch()
{
    const cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenid[0]
    const optionTwoId = cardsChosenid[1]
    if(optionOneId == optionTwoId)
    {
        alert('You clicked the same image')
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
    }
     
    if(cardsChosen[0] === cardsChosen[1])
    {
        alert('you have the match')
        cards[optionOneId].setAttribute('src', 'images/white.png')
        cards[optionTwoId].setAttribute('src', 'images/white.png')
        cards[optionOneId].removeEventListener('click',flipCard)
        cards[optionTwoId].removeEventListener('click',flipCard)
        cardsWon.push(cardsChosen)

        
    }else
    {
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        alert('Sorry try again')
    }
    resultDisplay.innerHTML = cardsWon.length
    cardsChosen = []
    cardsChosenid = []
    if(cardsWon.length == (cardArray.length/2))
    {
              resultDisplay.innerHTML = 'Congratulations'
    }
}

function flipCard()
{
 const cardId = this.getAttribute('data-id')
 cardsChosen.push(cardArray[cardId].name)
 cardsChosenid.push(cardId)
 this.setAttribute('src', cardArray[cardId].img)
 if(cardsChosen.length === 2)
 {
     setTimeout(checkMatch, 500)
     {

     }
 }

}