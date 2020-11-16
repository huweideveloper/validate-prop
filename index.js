!(function (e) {
  "function" == typeof define && define.amd ? define(e) : e();
})(function () {
  "use strict";
  var e = require("validate-data-type"),
    t = e.isObject,
    n = e.isArray,
    i = e.isFunction,
    r = e.isNull,
    a = e.isUndefined,
    s = e.isValidString,
    o = e.isFalse,
    u = e.isValidArray,
    f = require("get-safe-value").getString,
    g = require("./map");
  function l(e) {
    if (((this.config = {}), !t(e)))
      throw "The parameters Validate the function must be object";
    if (!(this instanceof l)) return new l(e);
    this.config = e;
  }
  (l.prototype.start = async function (e) {
    var n = this;
    if (!t(e)) throw "The parameters start the function must be object";
    var i = this.config;
    return new Promise(async function (t) {
      for (var r = [], a = Object.keys(i), s = 0; s < a.length; s++) {
        var o = a[s],
          u = i[o],
          f = await n.getMessage(o, u, e);
        f && r.push(f);
      }
      t((r = n.getResult(r)));
    });
  }),
    (l.prototype.getMessage = async function (e, i, r) {
      var a = null;
      if (t(i)) {
        var s = await this.getSingleMessage(e, i, r);
        s && (a = { key: e, message: [s] });
      }
      if (n(i)) {
        for (var o = [], u = 0; u < i.length; u++) {
          var f = await this.getSingleMessage(e, i[u], r);
          f && o.push(f);
        }
        o.length > 0 && (a = { key: e, message: o });
      }
      return a;
    }),
    (l.prototype.getSingleMessage = async function (e, t, n) {
      var u = f(t, "type"),
        l = f(t, "message") || "fail",
        c = t.test,
        h = n[e];
      if (i(c)) {
        var p = await c(h, e, t);
        return r(p) || a(p) || o(p) ? null : s(p) ? p : l;
      }
      return g.hasOwnProperty(u) ? g[u](h, t) : null;
    }),
    (l.prototype.getResult = async function (e) {
      var t = { error: null, list: e.length > 0 ? e : null };
      if (e.length > 0) {
        var n = e[0].message;
        t.error = u(n) ? n[0] : n;
      }
      return t;
    }),
    (module.exports = l);
});
