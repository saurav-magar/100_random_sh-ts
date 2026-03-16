class Node {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }
}

class BinaryTree {

    constructor() {
        this.root = null
    }

    insert(value) {
        const newNode = new Node(value)

        if (!this.root) {
            this.root = newNode
            return
        }

        let current = this.root

        while (true) {

            if (value < current.value) {

                if (!current.left) {
                    current.left = newNode
                    return
                }

                current = current.left

            } else {

                if (!current.right) {
                    current.right = newNode
                    return
                }

                current = current.right
            }

        }
    }

}

const tree = new BinaryTree()

function insertNode() {

    const input = document.getElementById("valueInput")
    const value = Number(input.value)

    if (!value) return

    tree.insert(value)
    input.value = ""

    renderTree()
}

function renderTree() {

    const container = document.getElementById("treeContainer")
    container.innerHTML = ""

    drawNode(tree.root, container.offsetWidth / 2, 20, container.offsetWidth / 4)
}

function drawNode(node, x, y, gap) {

    if (!node) return

    const container = document.getElementById("treeContainer")

    const el = document.createElement("div")
    el.className = "node"
    el.innerText = node.value

    el.style.left = x + "px"
    el.style.top = y + "px"

    container.appendChild(el)

    if (node.left) {

        drawLine(x, y, x - gap, y + 80)
        drawNode(node.left, x - gap, y + 80, gap / 2)

    }

    if (node.right) {

        drawLine(x, y, x + gap, y + 80)
        drawNode(node.right, x + gap, y + 80, gap / 2)

    }

}

function drawLine(x1, y1, x2, y2) {

    const line = document.createElement("div")
    line.className = "line"

    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI

    line.style.width = length + "px"
    line.style.left = x1 + "px"
    line.style.top = y1 + "px"
    line.style.transform = `rotate(${angle}deg)`

    document.getElementById("treeContainer").appendChild(line)

}