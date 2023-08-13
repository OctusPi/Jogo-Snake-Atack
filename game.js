let state      = true
const board    = document.getElementById('board')
const player   = document.getElementById('player')
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

                if((moveY > -1 && moveY < (parseInt(board.offsetHeight) - 15)) && (moveX > -1 && moveX < (parseInt(board.offsetWidth) - 15))){
                    player.style.top  = parseInt(moveY)+'px'
                    player.style.left = parseInt(moveX)+'px'
                }else{
                    state = false
                }

                console.log(`X: ${movedir.x} Y: ${movedir.y}`)
            }
        }, 10);

    }
}

keyControls()
btnControls()
movePlayer()