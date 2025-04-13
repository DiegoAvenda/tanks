const canvas = document.querySelector("canvas")
canvas.width = 900
canvas.height = 600
const ctx = canvas.getContext("2d")
const tankSize = 50
const bulletSize = 5

let leftPressed = false,
  downPressed = false,
  rightPressed = false,
  upPressed = false,
  shoot1Pressed = false,
  shoot2Pressed = false

const tank1 = {
  x: 100,
  y: 100,
  angle: 0,
  color: "blue",
  speed: 3,
  bullets: [],
  alive: true,
}

const tank2 = {
  x: 700,
  y: 500,
  angle: Math.PI,
  color: "red",
  speed: 3,
  bullets: [],
  alive: true,
}

function drawTank(tank) {
  if (!tank.alive) return // No dibujar si el tanque está destruido

  ctx.save()
  ctx.translate(tank.x, tank.y)
  ctx.rotate(tank.angle)

  // Draw tank body
  ctx.fillStyle = tank.color
  ctx.fillRect(-tankSize / 2, -tankSize / 2, tankSize, tankSize)

  // Draw tank barrel
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(tankSize, 0)
  ctx.strokeStyle = "black"
  ctx.lineWidth = 5
  ctx.stroke()

  ctx.restore()
}

function drawBullets(bullets) {
  bullets.forEach((bullet) => {
    ctx.beginPath()
    ctx.arc(bullet.x, bullet.y, bulletSize, 0, Math.PI * 2)
    ctx.fillStyle = "black"
    ctx.fill()
  })
}

function updateBullets(bullets, targetTank) {
  bullets.forEach((bullet, index) => {
    // Mover el proyectil
    bullet.x += Math.cos(bullet.angle) * bullet.speed
    bullet.y += Math.sin(bullet.angle) * bullet.speed

    // Verificar colisión con el tanque objetivo
    if (
      targetTank.alive &&
      bullet.x > targetTank.x - tankSize / 2 &&
      bullet.x < targetTank.x + tankSize / 2 &&
      bullet.y > targetTank.y - tankSize / 2 &&
      bullet.y < targetTank.y + tankSize / 2
    ) {
      targetTank.alive = false // Destruir el tanque
      bullets.splice(index, 1) // Eliminar el proyectil
    }

    // Eliminar proyectiles fuera del canvas
    if (
      bullet.x < 0 ||
      bullet.x > canvas.width ||
      bullet.y < 0 ||
      bullet.y > canvas.height
    ) {
      bullets.splice(index, 1)
    }
  })
}

function updateTank(tank, controls) {
  if (!tank.alive) return

  // Mover el tanque en cuatro direcciones
  if (controls.up) {
    tank.angle = -Math.PI / 2 // Apunta hacia arriba
    tank.y -= tank.speed
  }
  if (controls.down) {
    tank.angle = Math.PI / 2 // Apunta hacia abajo
    tank.y += tank.speed
  }
  if (controls.left) {
    tank.angle = Math.PI // Apunta hacia la izquierda
    tank.x -= tank.speed
  }
  if (controls.right) {
    tank.angle = 0 // Apunta hacia la derecha
    tank.x += tank.speed
  }

  // Mantener el tanque dentro de los límites
  tank.x = Math.max(tankSize / 2, Math.min(canvas.width - tankSize / 2, tank.x))
  tank.y = Math.max(
    tankSize / 2,
    Math.min(canvas.height - tankSize / 2, tank.y)
  )

  // Disparar
  if (controls.shoot) {
    tank.bullets.push({
      x: tank.x + Math.cos(tank.angle) * tankSize,
      y: tank.y + Math.sin(tank.angle) * tankSize,
      angle: tank.angle,
      speed: 5,
    })
  }
}

function gameLoop() {
  // Limpiar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Dibujar el borde
  ctx.strokeStyle = "black"
  ctx.strokeRect(0, 0, canvas.width, canvas.height)

  // Actualizar y dibujar tanques
  updateTank(tank1, {
    left: leftPressed,
    right: rightPressed,
    up: upPressed,
    down: downPressed,
    shoot: shoot1Pressed,
  })
  updateTank(tank2, {
    left: aPressed,
    right: dPressed,
    up: wPressed,
    down: sPressed,
    shoot: shoot2Pressed,
  })

  drawTank(tank1)
  drawTank(tank2)

  // Actualizar y dibujar proyectiles
  updateBullets(tank1.bullets, tank2)
  updateBullets(tank2.bullets, tank1)

  drawBullets(tank1.bullets)
  drawBullets(tank2.bullets)

  // Continuar el bucle del juego
  requestAnimationFrame(gameLoop)
}

// Controles para el tanque 2
let aPressed = false,
  wPressed = false,
  sPressed = false,
  dPressed = false

// Manejar eventos de teclado
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      leftPressed = true
      rightPressed = upPressed = downPressed = false
      break
    case "ArrowRight":
      rightPressed = true
      leftPressed = upPressed = downPressed = false
      break
    case "ArrowUp":
      upPressed = true
      leftPressed = rightPressed = downPressed = false
      break
    case "ArrowDown":
      downPressed = true
      leftPressed = rightPressed = upPressed = false
      break
    case " ":
      shoot1Pressed = true
      break
    case "a":
      aPressed = true
      dPressed = wPressed = sPressed = false
      break
    case "d":
      dPressed = true
      aPressed = wPressed = sPressed = false
      break
    case "w":
      wPressed = true
      aPressed = dPressed = sPressed = false
      break
    case "s":
      sPressed = true
      aPressed = dPressed = wPressed = false
      break
    case "f":
      shoot2Pressed = true
      break
  }
})

document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      leftPressed = false
      break
    case "ArrowRight":
      rightPressed = false
      break
    case "ArrowUp":
      upPressed = false
      break
    case "ArrowDown":
      downPressed = false
      break
    case " ":
      shoot1Pressed = false
      break
    case "a":
      aPressed = false
      break
    case "d":
      dPressed = false
      break
    case "w":
      wPressed = false
      break
    case "s":
      sPressed = false
      break
    case "f":
      shoot2Pressed = false
      break
  }
})

// Iniciar el bucle del juego
gameLoop()
