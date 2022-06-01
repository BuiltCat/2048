const boxHasValue = new Array(16).fill(false)
const boxes = document.querySelectorAll('.box')

const UP = [0, 1, 4]
const DOWN = [12, 1, -4]
const RIGHT = [3, 4, -1]
const LEFT = [0, 4, 1]

function mergeBoxValue(direction) {
    for (let i = direction[0]; i < direction[0] + direction[1] * 3 + 1; i += direction[1]) {
        // 获取每一列的值
        let stack = []
        for (let count = 0; count < 4; count++) {
            console.log(i + count * direction[2])
            const current = parseInt(boxes[i + count * direction[2]].innerHTML)
            if (!Number.isNaN(current)) {
                stack.push(current)
            }
        }
        let combine = []
        while (stack.length) {
            const current = stack.shift()
            const length = combine.length
            if (length === 0) {
                combine.push(current)
                continue
            }
            if (combine[length - 1] === current) {
                combine[length - 1] += current
                if (stack.length > 0) {
                    combine.push(stack.shift())
                }
                continue
            }
            combine.push(current)
        }
        for (let count = 0; count < 4; count++) {
            if (combine[count]) {
                boxes[i + count * direction[2]].innerHTML = combine[count]
                boxHasValue[i + count * direction[2]] = true
            } else {
                boxes[i + count * direction[2]].innerHTML = ''
                boxHasValue[i + count * direction[2]] = false
            }
        }
    }

}
function boxFullValue() {
    for (const value of boxHasValue) {
        if (!value) {
            return false
        }
    }
    return true
}

function boxFactory() {
    let index = getRandomLocation()
    while (boxHasValue[index]) {
        if (boxFullValue()) {
            console.log('game over')
            return
        }
        index = getRandomLocation()
    }
    boxes[index].innerHTML = getRandomValue()
    boxHasValue[index] = true
}
function game() {
    boxFactory()
    window.addEventListener('keydown', function (e) {
        if (e.key === 'w') {
            mergeBoxValue(UP)
            boxFactory()
        }
        if (e.key === 's') {

            mergeBoxValue(DOWN)
            boxFactory()
        }
        if (e.key === 'a') {
            mergeBoxValue(LEFT)
            boxFactory()
        }
        if (e.key === 'd') {
            mergeBoxValue(RIGHT)
            boxFactory()
        }
    })
}

function getRandomLocation() {
    return Math.floor(Math.random() * 16)
}
function getRandomValue() {
    return Math.random() > 0.5 ? 2 : 4
}

game()