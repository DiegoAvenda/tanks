const canvas = document.querySelector("canvas")
canvas.width = 900
canvas.height = 600
const ctx = canvas.getContext("2d")
const square1Size = 50
let angle = 0

ctx.strokeRect(0, 0, canvas.width, canvas.height)

ctx.translate(square1Size * 2, square1Size * 2)
ctx.fillRect(0, 0, 4, 4)

ctx.strokeRect(-square1Size / 2, -square1Size / 2, square1Size, square1Size)

ctx.beginPath()
ctx.moveTo(0, 0)
ctx.lineTo(square1Size, 0)
ctx.stroke()
