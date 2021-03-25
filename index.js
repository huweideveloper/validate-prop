!(function (e) {
  'function' == typeof define && define.amd ? define(e) : e()
})(function () {
  'use strict'
  var e = function (e, n, t, r) {
      return new (t || (t = Promise))(function (i, u) {
        function a(e) {
          try {
            s(r.next(e))
          } catch (e) {
            u(e)
          }
        }
        function o(e) {
          try {
            s(r.throw(e))
          } catch (e) {
            u(e)
          }
        }
        function s(e) {
          var n
          e.done
            ? i(e.value)
            : ((n = e.value),
              n instanceof t
                ? n
                : new t(function (e) {
                    e(n)
                  })).then(a, o)
        }
        s((r = r.apply(e, n || [])).next())
      })
    },
    n = function (e, n) {
      var t,
        r,
        i,
        u,
        a = {
          label: 0,
          sent: function () {
            if (1 & i[0]) throw i[1]
            return i[1]
          },
          trys: [],
          ops: [],
        }
      return (
        (u = { next: o(0), throw: o(1), return: o(2) }),
        'function' == typeof Symbol &&
          (u[Symbol.iterator] = function () {
            return this
          }),
        u
      )
      function o(u) {
        return function (o) {
          return (function (u) {
            if (t) throw new TypeError('Generator is already executing.')
            for (; a; )
              try {
                if (
                  ((t = 1),
                  r &&
                    (i =
                      2 & u[0]
                        ? r.return
                        : u[0]
                        ? r.throw || ((i = r.return) && i.call(r), 0)
                        : r.next) &&
                    !(i = i.call(r, u[1])).done)
                )
                  return i
                switch (((r = 0), i && (u = [2 & u[0], i.value]), u[0])) {
                  case 0:
                  case 1:
                    i = u
                    break
                  case 4:
                    return a.label++, { value: u[1], done: !1 }
                  case 5:
                    a.label++, (r = u[1]), (u = [0])
                    continue
                  case 7:
                    ;(u = a.ops.pop()), a.trys.pop()
                    continue
                  default:
                    if (
                      !((i = a.trys),
                      (i = i.length > 0 && i[i.length - 1]) ||
                        (6 !== u[0] && 2 !== u[0]))
                    ) {
                      a = 0
                      continue
                    }
                    if (3 === u[0] && (!i || (u[1] > i[0] && u[1] < i[3]))) {
                      a.label = u[1]
                      break
                    }
                    if (6 === u[0] && a.label < i[1]) {
                      ;(a.label = i[1]), (i = u)
                      break
                    }
                    if (i && a.label < i[2]) {
                      ;(a.label = i[2]), a.ops.push(u)
                      break
                    }
                    i[2] && a.ops.pop(), a.trys.pop()
                    continue
                }
                u = n.call(e, a)
              } catch (e) {
                ;(u = [6, e]), (r = 0)
              } finally {
                t = i = 0
              }
            if (5 & u[0]) throw u[1]
            return { value: u[0] ? u[1] : void 0, done: !0 }
          })([u, o])
        }
      }
    },
    t = require('validate-data-type'),
    r = t.isObject,
    i = t.isArray,
    u = t.isFunction,
    a = t.isNull,
    o = t.isUndefined,
    s = t.isValidString,
    c = t.isFalse,
    l = t.isValidArray,
    f = require('get-safe-value').getString,
    h = require('./map')
  function d(t, r) {
    return e(this, void 0, void 0, function () {
      var i = this
      return n(this, function (u) {
        return [
          2,
          new Promise(function (u) {
            return e(i, void 0, void 0, function () {
              var e, i, a, o, s, c, f
              return n(this, function (n) {
                switch (n.label) {
                  case 0:
                    ;(e = []), (i = Object.keys(t)), (a = 0), (n.label = 1)
                  case 1:
                    return a < i.length
                      ? ((o = i[a]), (s = t[o]), [4, v(o, s, r)])
                      : [3, 4]
                  case 2:
                    ;(c = n.sent()) && e.push(c), (n.label = 3)
                  case 3:
                    return a++, [3, 1]
                  case 4:
                    return (
                      (f = (function (e) {
                        var n = { error: '', list: e.length > 0 ? e : null }
                        if (e.length > 0) {
                          var t = e[0].message
                          n.error = l(t) ? t[0] : t
                        }
                        return n
                      })(e)),
                      u(f),
                      [2]
                    )
                }
              })
            })
          }),
        ]
      })
    })
  }
  function v(t, u, a) {
    return e(this, void 0, void 0, function () {
      var e, o, s, c
      return n(this, function (n) {
        switch (n.label) {
          case 0:
            return (e = null), r(u) ? [4, b(t, u, a)] : [3, 2]
          case 1:
            ;(c = n.sent()) && (e = { key: t, message: [c] }), (n.label = 2)
          case 2:
            if (!i(u)) return [3, 7]
            ;(o = []), (s = 0), (n.label = 3)
          case 3:
            return s < u.length ? [4, b(t, u[s], a)] : [3, 6]
          case 4:
            ;(c = n.sent()) && o.push(c), (n.label = 5)
          case 5:
            return s++, [3, 3]
          case 6:
            o.length > 0 && (e = { key: t, message: o }), (n.label = 7)
          case 7:
            return [2, e]
        }
      })
    })
  }
  function b(t, r, i) {
    return e(this, void 0, void 0, function () {
      var e, l, d, v, b
      return n(this, function (n) {
        switch (n.label) {
          case 0:
            return (
              (e = f(r, 'type')),
              (l = f(r, 'message') || 'fail'),
              (d = r.test),
              (v = i[t]),
              u(d) ? [4, d(v, t, r)] : [3, 2]
            )
          case 1:
            return (
              (b = n.sent()),
              a(b) || o(b) || c(b) ? [2, null] : [2, s(b) ? b : l]
            )
          case 2:
            return h.hasOwnProperty(e) ? [2, h[e](v, r)] : [2, null]
        }
      })
    })
  }
  module.exports = function (t, i) {
    return e(this, void 0, void 0, function () {
      var u = this
      return n(this, function (a) {
        if (!r(t) || !r(i))
          throw 'The parameters Validate the function must be object'
        return [
          2,
          new Promise(function (r) {
            return e(u, void 0, void 0, function () {
              var e
              return n(this, function (n) {
                switch (n.label) {
                  case 0:
                    return [4, d(t, i)]
                  case 1:
                    return (e = n.sent()), r(e), [2]
                }
              })
            })
          }),
        ]
      })
    })
  }
})
