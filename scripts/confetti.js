window.ConfettiGenerator = function (e) {
  function t(e, t) {
    e || (e = 1)
    var i = Math.random() * e
    return t ? Math.floor(i) : i
  }
  function i() {
    return {
      prop: a.props[t(a.props.length, !0)],
      x: t(a.width),
      y: t(a.height),
      radius: t(4) + 1,
      line: Math.floor(t(65) - 30),
      angles: [t(10, !0) + 2, t(10, !0) + 2, t(10, !0) + 2, t(10, !0) + 2],
      color: a.colors[t(a.colors.length, !0)],
      rotation: (t(360, !0) * Math.PI) / 180,
      speed: t(a.clock / 7) + a.clock / 30,
    }
  }
  function r(e) {
    var t = e.radius <= 3 ? 0.4 : 0.8
    switch (
      ((n.fillStyle = n.strokeStyle = "rgba(" + e.color + ", " + t + ")"),
      n.beginPath(),
      e.prop)
    ) {
      case "circle":
        n.moveTo(e.x, e.y),
          n.arc(e.x, e.y, e.radius * a.size, 0, 2 * Math.PI, !0),
          n.fill()
        break
      case "triangle":
        n.moveTo(e.x, e.y),
          n.lineTo(e.x + e.angles[0] * a.size, e.y + e.angles[1] * a.size),
          n.lineTo(e.x + e.angles[2] * a.size, e.y + e.angles[3] * a.size),
          n.closePath(),
          n.fill()
        break
      case "line":
        n.moveTo(e.x, e.y),
          n.lineTo(e.x + e.line * a.size, e.y + 5 * e.radius),
          (n.lineWidth = 2 * a.size),
          n.stroke()
        break
      case "square":
        n.save(),
          n.translate(e.x + 15, e.y + 5),
          n.rotate(e.rotation),
          n.fillRect(-15 * a.size, -5 * a.size, 15 * a.size, 5 * a.size),
          n.restore()
    }
  }
  var a = {
    target: "confetti-holder",
    max: 80,
    size: 1,
    animate: !0,
    props: ["circle", "square", "triangle", "line"],
    colors: [
      [165, 104, 246],
      [230, 61, 135],
      [0, 199, 228],
      [253, 214, 126],
    ],
    clock: 25,
    interval: null,
    width: window.innerWidth,
    height: window.innerHeight,
  }
  e &&
    (e.target && (a.target = e.target),
    e.max && (a.max = e.max),
    e.size && (a.size = e.size),
    void 0 !== e.animate && null !== e.animate && (a.animate = e.animate),
    e.props && (a.props = e.props),
    e.colors && (a.colors = e.colors),
    e.clock && (a.clock = e.clock),
    e.width && (a.width = e.width),
    e.height && (a.height = e.height))
  var o = document.getElementById(a.target),
    n = o.getContext("2d"),
    l = []
  return {
    render: function () {
      function e() {
        n.clearRect(0, 0, a.width, a.height)
        for (var e in l) r(l[e])
        s()
      }
      function s() {
        for (var e = 0; e < a.max; e++) {
          var i = l[e]
          a.animate && (i.y += i.speed),
            i.y > a.height &&
              ((l[e] = i), (l[e].x = t(a.width, !0)), (l[e].y = -10))
        }
      }
      ;(o.width = a.width), (o.height = a.height), (l = [])
      for (var c = 0; c < a.max; c++) l.push(i())
      return a.animate ? (a.interval = setInterval(e, 20)) : e()
    },
    clear: function () {
      n.clearRect(0, 0, o.width, o.height)
      var e = o.width
      ;(o.width = 1), (o.width = e), clearInterval(a.interval)
    },
  }
}
