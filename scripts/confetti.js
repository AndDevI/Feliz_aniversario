window.ConfettiGenerator = function (options) {
  // Função auxiliar para gerar números aleatórios com ou sem arredondamento
  function random(value, floor) {
    value = value || 1
    var result = Math.random() * value
    return floor ? Math.floor(result) : result
  }

  // Função para criar uma propriedade de confete aleatória
  function createConfetti() {
    return {
      prop: props[random(props.length, true)],
      x: random(width),
      y: random(height),
      radius: random(4) + 1,
      line: Math.floor(random(65) - 30),
      angles: [
        random(10, true) + 2,
        random(10, true) + 2,
        random(10, true) + 2,
        random(10, true) + 2,
      ],
      color: colors[random(colors.length, true)],
      rotation: (random(360, true) * Math.PI) / 180,
      speed: random(clock / 7) + clock / 30,
    }
  }

  // Função para renderizar um confete no contexto 2D
  function renderConfetti(confetti) {
    var sizeFactor = confetti.radius <= 3 ? 0.4 : 0.8

    switch (confetti.prop) {
      case "circle":
        context.moveTo(confetti.x, confetti.y)
        context.arc(
          confetti.x,
          confetti.y,
          confetti.radius * size * 1.5,
          0,
          2 * Math.PI,
          true
        )
        context.fill()
        break
      case "triangle":
        context.moveTo(confetti.x, confetti.y)
        context.lineTo(
          confetti.x + confetti.angles[0] * size,
          confetti.y + confetti.angles[1] * size
        )
        context.lineTo(
          confetti.x + confetti.angles[2] * size,
          confetti.y + confetti.angles[3] * size
        )
        context.closePath()
        context.fill()
        break
      case "line":
        context.moveTo(confetti.x, confetti.y)
        context.lineTo(
          confetti.x + confetti.line * size,
          confetti.y + 5 * confetti.radius
        )
        context.lineWidth = 2 * size
        context.stroke()
        break
      case "square":
        context.save()
        context.translate(confetti.x + 15, confetti.y + 5)
        context.rotate(confetti.rotation)
        context.fillRect(-15 * size, -5 * size, 15 * size, 5 * size)
        context.restore()
        break
    }
  }

  // Configurações padrão e opções fornecidas
  var props = ["circle", "square", "triangle", "line"]
  var colors = [
    [165, 104, 246],
    [230, 61, 135],
    [0, 199, 228],
    [253, 214, 126],
  ]
  var clock = 25
  var width = window.innerWidth
  var height = window.innerHeight

  if (options) {
    options.target && options.target && (options.target = options.target)
    options.max && options.max && (options.max = options.max)
    options.size && options.size && (options.size = options.size)
    options.animate !== undefined && options.animate !== null && (options.animate = options.animate)
    options.props && options.props && (options.props = options.props)
    options.colors && options.colors && (options.colors = options.colors)
    options.clock && options.clock && (options.clock = options.clock)
    options.width && options.width && (options.width = options.width)
    options.height && options.height && (options.height = options.height)
  }

  // Obtendo o elemento canvas do HTML
  var canvas = document.getElementById(options.target)
  var context = canvas.getContext("2d")
  var confettis = []

  return {
    // Função para renderizar confetes no canvas
    render: function () {
      function updateConfettis() {
        context.clearRect(0, 0, width, height)
        for (var i in confettis) {
          renderConfetti(confettis[i])
          moveConfetti(i)
        }
      }

      // Movimentar confetes para baixo
      function moveConfetti(index) {
        var confetti = confettis[index]
        options.animate && (confetti.y += confetti.speed)
        confetti.y > height &&
          ((confettis[index] = confetti),
          (confettis[index].x = random(width, true)),
          (confettis[index].y = -10))
      }

      canvas.width = width
      canvas.height = height
      confettis = []
      for (var i = 0; i < options.max; i++) {
        confettis.push(createConfetti())
      }
      return options.animate
        ? (options.interval = setInterval(updateConfettis, 20))
        : updateConfettis()
    },
    // Função para limpar confetes do canvas
    clear: function () {
      context.clearRect(0, 0, canvas.width, canvas.height)
      var canvasWidth = canvas.width
      canvas.width = 1
      canvas.width = canvasWidth
      clearInterval(options.interval)
    },
  }
}
