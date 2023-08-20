let state = true
let velox = 0.6;

const board    = document.getElementById('board')
const player   = document.getElementById('player')
const snake    = [...document.querySelectorAll('.body-snake')]
const controls = [...document.querySelectorAll('.btn-ctrl')]
const movedir  = {x: 1, y:0}

function keyControls(){
    window.addEventListener('keyup', e => {
        switch (e.key) {
            case 'ArrowLeft':
                movedir.x = -1
                movedir.y = 0
                break;
            case 'ArrowUp':
                movedir.x = 0
                movedir.y = -1
                break;
            case 'ArrowRight':
                movedir.x = 1
                movedir.y = 0
                break;
            case 'ArrowDown':
                movedir.x = 0
                movedir.y = 1
                break;
        }
    })
}

function btnControls(){
    if(controls){
        controls.forEach(btn => {
            btn.addEventListener('click', e => {
                switch (e.target.id) {
                    case 'left':
                        movedir.x = -1
                        movedir.y = 0
                        break;
                    case 'up':
                        movedir.x = 0
                        movedir.y = -1
                        break;
                    case 'right':
                        movedir.x = 1
                        movedir.y = 0
                        break;
                    default:
                        movedir.x = 0
                        movedir.y = 1
                        break;
                }

                console.log(e.target.id)
            })
        })
    }
}

function movePlayer(){
    if(player && board){

        setInterval(() => {
            if(state){

                let positionY  = player.offsetTop
                let positionX  = player.offsetLeft

                let moveY = parseInt(positionY + (movedir.y))
                let moveX = parseInt(positionX + (movedir.x))

                if ((moveY > -1 && moveY < (parseInt(board.offsetHeight) - 15))
                &&  (moveX > -1 && moveX < (parseInt(board.offsetWidth) - 15))) {
                    player.style.top  = parseInt(moveY)+'px'
                    player.style.left = parseInt(moveX)+'px'
                }else{
                    state = false
                    player.classList.remove('pisca')
                }

                console.log(`X: ${movedir.x} Y: ${movedir.y}`)
            }
        }, parseInt(velox*30));

    }
}

function addFood() {
    
    let positionX = Math.floor(Math.random() * (board.offsetWidth - 15))
    let positionY = Math.floor(Math.random() * (board.offsetHeight - 15))
    const food    = document.createElement('div')
    
    food.classList.add('food', 'pisca')
    food.style.top = positionY+'px'
    food.style.left = positionX + 'px'
    
    if (!snake) {
        board.appendChild(food)
    } else {
        let colision = false
        snake.forEach(s => {
            let rect = s.getBoundingClientRect()
            if (!(
                rect.left < positionX &&
                rect.right < positionX+10 &&
                rect.top < positionY &&
                rect.bottom > positionY+10
            )) {
                colision = true
                return
            }
        })

        if (!colision) {
            board.appendChild(food)
        } else {
            addFood()
        }
    }
}

addFood()
keyControls()
btnControls()
movePlayer()