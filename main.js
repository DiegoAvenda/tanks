const canvas = document.querySelector("canvas")
canvas.width = 900
canvas.height = 600
const ctx = canvas.getContext("2d")
const square1Size = 50
let angle = 0

const tank1 = { x: 100, y: 100, angle: 0, color: "blue" }

function thank(tank) {
  ctx.save()
  ctx.translate(tank.x, tank.y)
  ctx.rotate(tank.angle)
  ctx.fillStyle = "tank.color"
  ctx.fillRect(-square1Size / 2, -square1Size / 2, square1Size, square1Size)

  //ctx.strokeStyle = tank.color
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(square1Size, 0)
  ctx.stroke()

  ctx.restore()
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.strokeRect(0, 0, canvas.width, canvas.height)
  thank(tank1)

  requestAnimationFrame(gameLoop)
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") tank1.angle = Math.PI / 2
  if (e.key === "ArrowLeft") tank1.angle = Math.PI
  if (e.key === "ArrowUp") tank1.angle = Math.PI * 1.5
  if (e.key === "ArrowRight") tank1.angle = 0
  gameLoop()
})

gameLoop()
