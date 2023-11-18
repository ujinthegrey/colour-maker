const cols = document.querySelectorAll('.col')

document.addEventListener('keydown', (event) => {
    event.preventDefault()
    if (event.code.toLowerCase() === 'space') {
        setRandomColors()
    }
})

document.addEventListener('click', (event) => {
    const type = event.target.dataset.type

    if (type.toLowerCase() === 'lock') {
        const node =
            event.target.tagName.toLowerCase() === 'i'
                ? event.target
                : event.target.children[0]

        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    } else if (type.toLowerCase() === 'copy') {
        const target = event.target
        copyToClipboard(target)
    }
})

function copyToClipboard(target) {
    const text = target.textContent
    target.textContent = 'copyed!'
    setTimeout(() => {target.textContent = text}, 400)
    return navigator.clipboard.writeText(text)
}

function setRandomColors(isInitial) {
    const colors = isInitial ? getColorsFromHash() : []
    cols.forEach((col, index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        const text = col.querySelector('h2')
        const button = col.querySelector('button')        
        
        if (isLocked) {
            colors.push(text.textContent)
            return
        }
        
        const color = isInitial
            ? colors[index]
                ? colors[index]
                : chroma.random()
            : chroma.random()

        if (!isInitial) {
            colors.push(color)
        }

        col.style.background = color
        text.textContent = color

        setTextColor(text, color)
        setTextColor(button, color)
    })

    updateColorsnHash(colors)
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function updateColorsnHash(colors = []) {
    const hash = colors
        .map((color) => color.toString().substring(1))
        .join('-')
    document.location.hash = hash
}

function getColorsFromHash() {
    if (document.location.hash) {
        return document.location.hash
            .substring(1)
            .split('-')
            .map((color) => '#' + color)
    }
    return []
}

setRandomColors(true)