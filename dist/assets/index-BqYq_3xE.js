(function () {
  const o = document.createElement("link").relList;
  if (o && o.supports && o.supports("modulepreload")) return;
  for (const h of document.querySelectorAll('link[rel="modulepreload"]')) r(h);
  new MutationObserver((h) => {
    for (const g of h)
      if (g.type === "childList")
        for (const z of g.addedNodes)
          z.tagName === "LINK" && z.rel === "modulepreload" && r(z);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(h) {
    const g = {};
    return (
      h.integrity && (g.integrity = h.integrity),
      h.referrerPolicy && (g.referrerPolicy = h.referrerPolicy),
      h.crossOrigin === "use-credentials"
        ? (g.credentials = "include")
        : h.crossOrigin === "anonymous"
          ? (g.credentials = "omit")
          : (g.credentials = "same-origin"),
      g
    );
  }
  function r(h) {
    if (h.ep) return;
    h.ep = !0;
    const g = s(h);
    fetch(h.href, g);
  }
})();
function Vd(c) {
  return c && c.__esModule && Object.prototype.hasOwnProperty.call(c, "default")
    ? c.default
    : c;
}
var pf = { exports: {} },
  zu = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var _d;
function Hm() {
  if (_d) return zu;
  _d = 1;
  var c = Symbol.for("react.transitional.element"),
    o = Symbol.for("react.fragment");
  function s(r, h, g) {
    var z = null;
    if (
      (g !== void 0 && (z = "" + g),
      h.key !== void 0 && (z = "" + h.key),
      "key" in h)
    ) {
      g = {};
      for (var M in h) M !== "key" && (g[M] = h[M]);
    } else g = h;
    return (
      (h = g.ref),
      { $$typeof: c, type: r, key: z, ref: h !== void 0 ? h : null, props: g }
    );
  }
  return (zu.Fragment = o), (zu.jsx = s), (zu.jsxs = s), zu;
}
var Dd;
function Cm() {
  return Dd || ((Dd = 1), (pf.exports = Hm())), pf.exports;
}
var gt = Cm(),
  bf = { exports: {} },
  tt = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var xd;
function Bm() {
  if (xd) return tt;
  xd = 1;
  var c = Symbol.for("react.transitional.element"),
    o = Symbol.for("react.portal"),
    s = Symbol.for("react.fragment"),
    r = Symbol.for("react.strict_mode"),
    h = Symbol.for("react.profiler"),
    g = Symbol.for("react.consumer"),
    z = Symbol.for("react.context"),
    M = Symbol.for("react.forward_ref"),
    p = Symbol.for("react.suspense"),
    m = Symbol.for("react.memo"),
    R = Symbol.for("react.lazy"),
    B = Symbol.iterator;
  function H(y) {
    return y === null || typeof y != "object"
      ? null
      : ((y = (B && y[B]) || y["@@iterator"]),
        typeof y == "function" ? y : null);
  }
  var L = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    C = Object.assign,
    w = {};
  function G(y, N, Q) {
    (this.props = y),
      (this.context = N),
      (this.refs = w),
      (this.updater = Q || L);
  }
  (G.prototype.isReactComponent = {}),
    (G.prototype.setState = function (y, N) {
      if (typeof y != "object" && typeof y != "function" && y != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, y, N, "setState");
    }),
    (G.prototype.forceUpdate = function (y) {
      this.updater.enqueueForceUpdate(this, y, "forceUpdate");
    });
  function q() {}
  q.prototype = G.prototype;
  function P(y, N, Q) {
    (this.props = y),
      (this.context = N),
      (this.refs = w),
      (this.updater = Q || L);
  }
  var X = (P.prototype = new q());
  (X.constructor = P), C(X, G.prototype), (X.isPureReactComponent = !0);
  var it = Array.isArray,
    F = { H: null, A: null, T: null, S: null, V: null },
    xt = Object.prototype.hasOwnProperty;
  function Rt(y, N, Q, Y, K, ct) {
    return (
      (Q = ct.ref),
      { $$typeof: c, type: y, key: N, ref: Q !== void 0 ? Q : null, props: ct }
    );
  }
  function Mt(y, N) {
    return Rt(y.type, N, void 0, void 0, void 0, y.props);
  }
  function pt(y) {
    return typeof y == "object" && y !== null && y.$$typeof === c;
  }
  function Jt(y) {
    var N = { "=": "=0", ":": "=2" };
    return (
      "$" +
      y.replace(/[=:]/g, function (Q) {
        return N[Q];
      })
    );
  }
  var oe = /\/+/g;
  function Qt(y, N) {
    return typeof y == "object" && y !== null && y.key != null
      ? Jt("" + y.key)
      : N.toString(36);
  }
  function bl() {}
  function El(y) {
    switch (y.status) {
      case "fulfilled":
        return y.value;
      case "rejected":
        throw y.reason;
      default:
        switch (
          (typeof y.status == "string"
            ? y.then(bl, bl)
            : ((y.status = "pending"),
              y.then(
                function (N) {
                  y.status === "pending" &&
                    ((y.status = "fulfilled"), (y.value = N));
                },
                function (N) {
                  y.status === "pending" &&
                    ((y.status = "rejected"), (y.reason = N));
                },
              )),
          y.status)
        ) {
          case "fulfilled":
            return y.value;
          case "rejected":
            throw y.reason;
        }
    }
    throw y;
  }
  function Zt(y, N, Q, Y, K) {
    var ct = typeof y;
    (ct === "undefined" || ct === "boolean") && (y = null);
    var I = !1;
    if (y === null) I = !0;
    else
      switch (ct) {
        case "bigint":
        case "string":
        case "number":
          I = !0;
          break;
        case "object":
          switch (y.$$typeof) {
            case c:
            case o:
              I = !0;
              break;
            case R:
              return (I = y._init), Zt(I(y._payload), N, Q, Y, K);
          }
      }
    if (I)
      return (
        (K = K(y)),
        (I = Y === "" ? "." + Qt(y, 0) : Y),
        it(K)
          ? ((Q = ""),
            I != null && (Q = I.replace(oe, "$&/") + "/"),
            Zt(K, N, Q, "", function (ke) {
              return ke;
            }))
          : K != null &&
            (pt(K) &&
              (K = Mt(
                K,
                Q +
                  (K.key == null || (y && y.key === K.key)
                    ? ""
                    : ("" + K.key).replace(oe, "$&/") + "/") +
                  I,
              )),
            N.push(K)),
        1
      );
    I = 0;
    var te = Y === "" ? "." : Y + ":";
    if (it(y))
      for (var bt = 0; bt < y.length; bt++)
        (Y = y[bt]), (ct = te + Qt(Y, bt)), (I += Zt(Y, N, Q, ct, K));
    else if (((bt = H(y)), typeof bt == "function"))
      for (y = bt.call(y), bt = 0; !(Y = y.next()).done; )
        (Y = Y.value), (ct = te + Qt(Y, bt++)), (I += Zt(Y, N, Q, ct, K));
    else if (ct === "object") {
      if (typeof y.then == "function") return Zt(El(y), N, Q, Y, K);
      throw (
        ((N = String(y)),
        Error(
          "Objects are not valid as a React child (found: " +
            (N === "[object Object]"
              ? "object with keys {" + Object.keys(y).join(", ") + "}"
              : N) +
            "). If you meant to render a collection of children, use an array instead.",
        ))
      );
    }
    return I;
  }
  function _(y, N, Q) {
    if (y == null) return y;
    var Y = [],
      K = 0;
    return (
      Zt(y, Y, "", "", function (ct) {
        return N.call(Q, ct, K++);
      }),
      Y
    );
  }
  function j(y) {
    if (y._status === -1) {
      var N = y._result;
      (N = N()),
        N.then(
          function (Q) {
            (y._status === 0 || y._status === -1) &&
              ((y._status = 1), (y._result = Q));
          },
          function (Q) {
            (y._status === 0 || y._status === -1) &&
              ((y._status = 2), (y._result = Q));
          },
        ),
        y._status === -1 && ((y._status = 0), (y._result = N));
    }
    if (y._status === 1) return y._result.default;
    throw y._result;
  }
  var k =
    typeof reportError == "function"
      ? reportError
      : function (y) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var N = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof y == "object" &&
                y !== null &&
                typeof y.message == "string"
                  ? String(y.message)
                  : String(y),
              error: y,
            });
            if (!window.dispatchEvent(N)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", y);
            return;
          }
          console.error(y);
        };
  function yt() {}
  return (
    (tt.Children = {
      map: _,
      forEach: function (y, N, Q) {
        _(
          y,
          function () {
            N.apply(this, arguments);
          },
          Q,
        );
      },
      count: function (y) {
        var N = 0;
        return (
          _(y, function () {
            N++;
          }),
          N
        );
      },
      toArray: function (y) {
        return (
          _(y, function (N) {
            return N;
          }) || []
        );
      },
      only: function (y) {
        if (!pt(y))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          );
        return y;
      },
    }),
    (tt.Component = G),
    (tt.Fragment = s),
    (tt.Profiler = h),
    (tt.PureComponent = P),
    (tt.StrictMode = r),
    (tt.Suspense = p),
    (tt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = F),
    (tt.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (y) {
        return F.H.useMemoCache(y);
      },
    }),
    (tt.cache = function (y) {
      return function () {
        return y.apply(null, arguments);
      };
    }),
    (tt.cloneElement = function (y, N, Q) {
      if (y == null)
        throw Error(
          "The argument must be a React element, but you passed " + y + ".",
        );
      var Y = C({}, y.props),
        K = y.key,
        ct = void 0;
      if (N != null)
        for (I in (N.ref !== void 0 && (ct = void 0),
        N.key !== void 0 && (K = "" + N.key),
        N))
          !xt.call(N, I) ||
            I === "key" ||
            I === "__self" ||
            I === "__source" ||
            (I === "ref" && N.ref === void 0) ||
            (Y[I] = N[I]);
      var I = arguments.length - 2;
      if (I === 1) Y.children = Q;
      else if (1 < I) {
        for (var te = Array(I), bt = 0; bt < I; bt++)
          te[bt] = arguments[bt + 2];
        Y.children = te;
      }
      return Rt(y.type, K, void 0, void 0, ct, Y);
    }),
    (tt.createContext = function (y) {
      return (
        (y = {
          $$typeof: z,
          _currentValue: y,
          _currentValue2: y,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (y.Provider = y),
        (y.Consumer = { $$typeof: g, _context: y }),
        y
      );
    }),
    (tt.createElement = function (y, N, Q) {
      var Y,
        K = {},
        ct = null;
      if (N != null)
        for (Y in (N.key !== void 0 && (ct = "" + N.key), N))
          xt.call(N, Y) &&
            Y !== "key" &&
            Y !== "__self" &&
            Y !== "__source" &&
            (K[Y] = N[Y]);
      var I = arguments.length - 2;
      if (I === 1) K.children = Q;
      else if (1 < I) {
        for (var te = Array(I), bt = 0; bt < I; bt++)
          te[bt] = arguments[bt + 2];
        K.children = te;
      }
      if (y && y.defaultProps)
        for (Y in ((I = y.defaultProps), I)) K[Y] === void 0 && (K[Y] = I[Y]);
      return Rt(y, ct, void 0, void 0, null, K);
    }),
    (tt.createRef = function () {
      return { current: null };
    }),
    (tt.forwardRef = function (y) {
      return { $$typeof: M, render: y };
    }),
    (tt.isValidElement = pt),
    (tt.lazy = function (y) {
      return { $$typeof: R, _payload: { _status: -1, _result: y }, _init: j };
    }),
    (tt.memo = function (y, N) {
      return { $$typeof: m, type: y, compare: N === void 0 ? null : N };
    }),
    (tt.startTransition = function (y) {
      var N = F.T,
        Q = {};
      F.T = Q;
      try {
        var Y = y(),
          K = F.S;
        K !== null && K(Q, Y),
          typeof Y == "object" &&
            Y !== null &&
            typeof Y.then == "function" &&
            Y.then(yt, k);
      } catch (ct) {
        k(ct);
      } finally {
        F.T = N;
      }
    }),
    (tt.unstable_useCacheRefresh = function () {
      return F.H.useCacheRefresh();
    }),
    (tt.use = function (y) {
      return F.H.use(y);
    }),
    (tt.useActionState = function (y, N, Q) {
      return F.H.useActionState(y, N, Q);
    }),
    (tt.useCallback = function (y, N) {
      return F.H.useCallback(y, N);
    }),
    (tt.useContext = function (y) {
      return F.H.useContext(y);
    }),
    (tt.useDebugValue = function () {}),
    (tt.useDeferredValue = function (y, N) {
      return F.H.useDeferredValue(y, N);
    }),
    (tt.useEffect = function (y, N, Q) {
      var Y = F.H;
      if (typeof Q == "function")
        throw Error(
          "useEffect CRUD overload is not enabled in this build of React.",
        );
      return Y.useEffect(y, N);
    }),
    (tt.useId = function () {
      return F.H.useId();
    }),
    (tt.useImperativeHandle = function (y, N, Q) {
      return F.H.useImperativeHandle(y, N, Q);
    }),
    (tt.useInsertionEffect = function (y, N) {
      return F.H.useInsertionEffect(y, N);
    }),
    (tt.useLayoutEffect = function (y, N) {
      return F.H.useLayoutEffect(y, N);
    }),
    (tt.useMemo = function (y, N) {
      return F.H.useMemo(y, N);
    }),
    (tt.useOptimistic = function (y, N) {
      return F.H.useOptimistic(y, N);
    }),
    (tt.useReducer = function (y, N, Q) {
      return F.H.useReducer(y, N, Q);
    }),
    (tt.useRef = function (y) {
      return F.H.useRef(y);
    }),
    (tt.useState = function (y) {
      return F.H.useState(y);
    }),
    (tt.useSyncExternalStore = function (y, N, Q) {
      return F.H.useSyncExternalStore(y, N, Q);
    }),
    (tt.useTransition = function () {
      return F.H.useTransition();
    }),
    (tt.version = "19.1.0"),
    tt
  );
}
var Ud;
function Df() {
  return Ud || ((Ud = 1), (bf.exports = Bm())), bf.exports;
}
var x = Df();
const qm = Vd(x);
var Ef = { exports: {} },
  Ou = {},
  Tf = { exports: {} },
  Af = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Nd;
function Ym() {
  return (
    Nd ||
      ((Nd = 1),
      (function (c) {
        function o(_, j) {
          var k = _.length;
          _.push(j);
          t: for (; 0 < k; ) {
            var yt = (k - 1) >>> 1,
              y = _[yt];
            if (0 < h(y, j)) (_[yt] = j), (_[k] = y), (k = yt);
            else break t;
          }
        }
        function s(_) {
          return _.length === 0 ? null : _[0];
        }
        function r(_) {
          if (_.length === 0) return null;
          var j = _[0],
            k = _.pop();
          if (k !== j) {
            _[0] = k;
            t: for (var yt = 0, y = _.length, N = y >>> 1; yt < N; ) {
              var Q = 2 * (yt + 1) - 1,
                Y = _[Q],
                K = Q + 1,
                ct = _[K];
              if (0 > h(Y, k))
                K < y && 0 > h(ct, Y)
                  ? ((_[yt] = ct), (_[K] = k), (yt = K))
                  : ((_[yt] = Y), (_[Q] = k), (yt = Q));
              else if (K < y && 0 > h(ct, k))
                (_[yt] = ct), (_[K] = k), (yt = K);
              else break t;
            }
          }
          return j;
        }
        function h(_, j) {
          var k = _.sortIndex - j.sortIndex;
          return k !== 0 ? k : _.id - j.id;
        }
        if (
          ((c.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var g = performance;
          c.unstable_now = function () {
            return g.now();
          };
        } else {
          var z = Date,
            M = z.now();
          c.unstable_now = function () {
            return z.now() - M;
          };
        }
        var p = [],
          m = [],
          R = 1,
          B = null,
          H = 3,
          L = !1,
          C = !1,
          w = !1,
          G = !1,
          q = typeof setTimeout == "function" ? setTimeout : null,
          P = typeof clearTimeout == "function" ? clearTimeout : null,
          X = typeof setImmediate < "u" ? setImmediate : null;
        function it(_) {
          for (var j = s(m); j !== null; ) {
            if (j.callback === null) r(m);
            else if (j.startTime <= _)
              r(m), (j.sortIndex = j.expirationTime), o(p, j);
            else break;
            j = s(m);
          }
        }
        function F(_) {
          if (((w = !1), it(_), !C))
            if (s(p) !== null) (C = !0), xt || ((xt = !0), Qt());
            else {
              var j = s(m);
              j !== null && Zt(F, j.startTime - _);
            }
        }
        var xt = !1,
          Rt = -1,
          Mt = 5,
          pt = -1;
        function Jt() {
          return G ? !0 : !(c.unstable_now() - pt < Mt);
        }
        function oe() {
          if (((G = !1), xt)) {
            var _ = c.unstable_now();
            pt = _;
            var j = !0;
            try {
              t: {
                (C = !1), w && ((w = !1), P(Rt), (Rt = -1)), (L = !0);
                var k = H;
                try {
                  e: {
                    for (
                      it(_), B = s(p);
                      B !== null && !(B.expirationTime > _ && Jt());

                    ) {
                      var yt = B.callback;
                      if (typeof yt == "function") {
                        (B.callback = null), (H = B.priorityLevel);
                        var y = yt(B.expirationTime <= _);
                        if (((_ = c.unstable_now()), typeof y == "function")) {
                          (B.callback = y), it(_), (j = !0);
                          break e;
                        }
                        B === s(p) && r(p), it(_);
                      } else r(p);
                      B = s(p);
                    }
                    if (B !== null) j = !0;
                    else {
                      var N = s(m);
                      N !== null && Zt(F, N.startTime - _), (j = !1);
                    }
                  }
                  break t;
                } finally {
                  (B = null), (H = k), (L = !1);
                }
                j = void 0;
              }
            } finally {
              j ? Qt() : (xt = !1);
            }
          }
        }
        var Qt;
        if (typeof X == "function")
          Qt = function () {
            X(oe);
          };
        else if (typeof MessageChannel < "u") {
          var bl = new MessageChannel(),
            El = bl.port2;
          (bl.port1.onmessage = oe),
            (Qt = function () {
              El.postMessage(null);
            });
        } else
          Qt = function () {
            q(oe, 0);
          };
        function Zt(_, j) {
          Rt = q(function () {
            _(c.unstable_now());
          }, j);
        }
        (c.unstable_IdlePriority = 5),
          (c.unstable_ImmediatePriority = 1),
          (c.unstable_LowPriority = 4),
          (c.unstable_NormalPriority = 3),
          (c.unstable_Profiling = null),
          (c.unstable_UserBlockingPriority = 2),
          (c.unstable_cancelCallback = function (_) {
            _.callback = null;
          }),
          (c.unstable_forceFrameRate = function (_) {
            0 > _ || 125 < _
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (Mt = 0 < _ ? Math.floor(1e3 / _) : 5);
          }),
          (c.unstable_getCurrentPriorityLevel = function () {
            return H;
          }),
          (c.unstable_next = function (_) {
            switch (H) {
              case 1:
              case 2:
              case 3:
                var j = 3;
                break;
              default:
                j = H;
            }
            var k = H;
            H = j;
            try {
              return _();
            } finally {
              H = k;
            }
          }),
          (c.unstable_requestPaint = function () {
            G = !0;
          }),
          (c.unstable_runWithPriority = function (_, j) {
            switch (_) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                _ = 3;
            }
            var k = H;
            H = _;
            try {
              return j();
            } finally {
              H = k;
            }
          }),
          (c.unstable_scheduleCallback = function (_, j, k) {
            var yt = c.unstable_now();
            switch (
              (typeof k == "object" && k !== null
                ? ((k = k.delay),
                  (k = typeof k == "number" && 0 < k ? yt + k : yt))
                : (k = yt),
              _)
            ) {
              case 1:
                var y = -1;
                break;
              case 2:
                y = 250;
                break;
              case 5:
                y = 1073741823;
                break;
              case 4:
                y = 1e4;
                break;
              default:
                y = 5e3;
            }
            return (
              (y = k + y),
              (_ = {
                id: R++,
                callback: j,
                priorityLevel: _,
                startTime: k,
                expirationTime: y,
                sortIndex: -1,
              }),
              k > yt
                ? ((_.sortIndex = k),
                  o(m, _),
                  s(p) === null &&
                    _ === s(m) &&
                    (w ? (P(Rt), (Rt = -1)) : (w = !0), Zt(F, k - yt)))
                : ((_.sortIndex = y),
                  o(p, _),
                  C || L || ((C = !0), xt || ((xt = !0), Qt()))),
              _
            );
          }),
          (c.unstable_shouldYield = Jt),
          (c.unstable_wrapCallback = function (_) {
            var j = H;
            return function () {
              var k = H;
              H = j;
              try {
                return _.apply(this, arguments);
              } finally {
                H = k;
              }
            };
          });
      })(Af)),
    Af
  );
}
var Hd;
function Lm() {
  return Hd || ((Hd = 1), (Tf.exports = Ym())), Tf.exports;
}
var Rf = { exports: {} },
  Kt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Cd;
function jm() {
  if (Cd) return Kt;
  Cd = 1;
  var c = Df();
  function o(p) {
    var m = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      m += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var R = 2; R < arguments.length; R++)
        m += "&args[]=" + encodeURIComponent(arguments[R]);
    }
    return (
      "Minified React error #" +
      p +
      "; visit " +
      m +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function s() {}
  var r = {
      d: {
        f: s,
        r: function () {
          throw Error(o(522));
        },
        D: s,
        C: s,
        L: s,
        m: s,
        X: s,
        S: s,
        M: s,
      },
      p: 0,
      findDOMNode: null,
    },
    h = Symbol.for("react.portal");
  function g(p, m, R) {
    var B =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: h,
      key: B == null ? null : "" + B,
      children: p,
      containerInfo: m,
      implementation: R,
    };
  }
  var z = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function M(p, m) {
    if (p === "font") return "";
    if (typeof m == "string") return m === "use-credentials" ? m : "";
  }
  return (
    (Kt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r),
    (Kt.createPortal = function (p, m) {
      var R =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!m || (m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11))
        throw Error(o(299));
      return g(p, m, null, R);
    }),
    (Kt.flushSync = function (p) {
      var m = z.T,
        R = r.p;
      try {
        if (((z.T = null), (r.p = 2), p)) return p();
      } finally {
        (z.T = m), (r.p = R), r.d.f();
      }
    }),
    (Kt.preconnect = function (p, m) {
      typeof p == "string" &&
        (m
          ? ((m = m.crossOrigin),
            (m =
              typeof m == "string"
                ? m === "use-credentials"
                  ? m
                  : ""
                : void 0))
          : (m = null),
        r.d.C(p, m));
    }),
    (Kt.prefetchDNS = function (p) {
      typeof p == "string" && r.d.D(p);
    }),
    (Kt.preinit = function (p, m) {
      if (typeof p == "string" && m && typeof m.as == "string") {
        var R = m.as,
          B = M(R, m.crossOrigin),
          H = typeof m.integrity == "string" ? m.integrity : void 0,
          L = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
        R === "style"
          ? r.d.S(p, typeof m.precedence == "string" ? m.precedence : void 0, {
              crossOrigin: B,
              integrity: H,
              fetchPriority: L,
            })
          : R === "script" &&
            r.d.X(p, {
              crossOrigin: B,
              integrity: H,
              fetchPriority: L,
              nonce: typeof m.nonce == "string" ? m.nonce : void 0,
            });
      }
    }),
    (Kt.preinitModule = function (p, m) {
      if (typeof p == "string")
        if (typeof m == "object" && m !== null) {
          if (m.as == null || m.as === "script") {
            var R = M(m.as, m.crossOrigin);
            r.d.M(p, {
              crossOrigin: R,
              integrity: typeof m.integrity == "string" ? m.integrity : void 0,
              nonce: typeof m.nonce == "string" ? m.nonce : void 0,
            });
          }
        } else m == null && r.d.M(p);
    }),
    (Kt.preload = function (p, m) {
      if (
        typeof p == "string" &&
        typeof m == "object" &&
        m !== null &&
        typeof m.as == "string"
      ) {
        var R = m.as,
          B = M(R, m.crossOrigin);
        r.d.L(p, R, {
          crossOrigin: B,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0,
          nonce: typeof m.nonce == "string" ? m.nonce : void 0,
          type: typeof m.type == "string" ? m.type : void 0,
          fetchPriority:
            typeof m.fetchPriority == "string" ? m.fetchPriority : void 0,
          referrerPolicy:
            typeof m.referrerPolicy == "string" ? m.referrerPolicy : void 0,
          imageSrcSet:
            typeof m.imageSrcSet == "string" ? m.imageSrcSet : void 0,
          imageSizes: typeof m.imageSizes == "string" ? m.imageSizes : void 0,
          media: typeof m.media == "string" ? m.media : void 0,
        });
      }
    }),
    (Kt.preloadModule = function (p, m) {
      if (typeof p == "string")
        if (m) {
          var R = M(m.as, m.crossOrigin);
          r.d.m(p, {
            as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
            crossOrigin: R,
            integrity: typeof m.integrity == "string" ? m.integrity : void 0,
          });
        } else r.d.m(p);
    }),
    (Kt.requestFormReset = function (p) {
      r.d.r(p);
    }),
    (Kt.unstable_batchedUpdates = function (p, m) {
      return p(m);
    }),
    (Kt.useFormState = function (p, m, R) {
      return z.H.useFormState(p, m, R);
    }),
    (Kt.useFormStatus = function () {
      return z.H.useHostTransitionStatus();
    }),
    (Kt.version = "19.1.0"),
    Kt
  );
}
var Bd;
function Gm() {
  if (Bd) return Rf.exports;
  Bd = 1;
  function c() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (o) {
        console.error(o);
      }
  }
  return c(), (Rf.exports = jm()), Rf.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var qd;
function Xm() {
  if (qd) return Ou;
  qd = 1;
  var c = Lm(),
    o = Df(),
    s = Gm();
  function r(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        e += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return (
      "Minified React error #" +
      t +
      "; visit " +
      e +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function h(t) {
    return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11));
  }
  function g(t) {
    var e = t,
      l = t;
    if (t.alternate) for (; e.return; ) e = e.return;
    else {
      t = e;
      do (e = t), (e.flags & 4098) !== 0 && (l = e.return), (t = e.return);
      while (t);
    }
    return e.tag === 3 ? l : null;
  }
  function z(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if (
        (e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)),
        e !== null)
      )
        return e.dehydrated;
    }
    return null;
  }
  function M(t) {
    if (g(t) !== t) throw Error(r(188));
  }
  function p(t) {
    var e = t.alternate;
    if (!e) {
      if (((e = g(t)), e === null)) throw Error(r(188));
      return e !== t ? null : t;
    }
    for (var l = t, a = e; ; ) {
      var u = l.return;
      if (u === null) break;
      var n = u.alternate;
      if (n === null) {
        if (((a = u.return), a !== null)) {
          l = a;
          continue;
        }
        break;
      }
      if (u.child === n.child) {
        for (n = u.child; n; ) {
          if (n === l) return M(u), t;
          if (n === a) return M(u), e;
          n = n.sibling;
        }
        throw Error(r(188));
      }
      if (l.return !== a.return) (l = u), (a = n);
      else {
        for (var i = !1, f = u.child; f; ) {
          if (f === l) {
            (i = !0), (l = u), (a = n);
            break;
          }
          if (f === a) {
            (i = !0), (a = u), (l = n);
            break;
          }
          f = f.sibling;
        }
        if (!i) {
          for (f = n.child; f; ) {
            if (f === l) {
              (i = !0), (l = n), (a = u);
              break;
            }
            if (f === a) {
              (i = !0), (a = n), (l = u);
              break;
            }
            f = f.sibling;
          }
          if (!i) throw Error(r(189));
        }
      }
      if (l.alternate !== a) throw Error(r(190));
    }
    if (l.tag !== 3) throw Error(r(188));
    return l.stateNode.current === l ? t : e;
  }
  function m(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (((e = m(t)), e !== null)) return e;
      t = t.sibling;
    }
    return null;
  }
  var R = Object.assign,
    B = Symbol.for("react.element"),
    H = Symbol.for("react.transitional.element"),
    L = Symbol.for("react.portal"),
    C = Symbol.for("react.fragment"),
    w = Symbol.for("react.strict_mode"),
    G = Symbol.for("react.profiler"),
    q = Symbol.for("react.provider"),
    P = Symbol.for("react.consumer"),
    X = Symbol.for("react.context"),
    it = Symbol.for("react.forward_ref"),
    F = Symbol.for("react.suspense"),
    xt = Symbol.for("react.suspense_list"),
    Rt = Symbol.for("react.memo"),
    Mt = Symbol.for("react.lazy"),
    pt = Symbol.for("react.activity"),
    Jt = Symbol.for("react.memo_cache_sentinel"),
    oe = Symbol.iterator;
  function Qt(t) {
    return t === null || typeof t != "object"
      ? null
      : ((t = (oe && t[oe]) || t["@@iterator"]),
        typeof t == "function" ? t : null);
  }
  var bl = Symbol.for("react.client.reference");
  function El(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === bl ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case C:
        return "Fragment";
      case G:
        return "Profiler";
      case w:
        return "StrictMode";
      case F:
        return "Suspense";
      case xt:
        return "SuspenseList";
      case pt:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case L:
          return "Portal";
        case X:
          return (t.displayName || "Context") + ".Provider";
        case P:
          return (t._context.displayName || "Context") + ".Consumer";
        case it:
          var e = t.render;
          return (
            (t = t.displayName),
            t ||
              ((t = e.displayName || e.name || ""),
              (t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")),
            t
          );
        case Rt:
          return (
            (e = t.displayName || null), e !== null ? e : El(t.type) || "Memo"
          );
        case Mt:
          (e = t._payload), (t = t._init);
          try {
            return El(t(e));
          } catch {}
      }
    return null;
  }
  var Zt = Array.isArray,
    _ = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    j = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    k = { pending: !1, data: null, method: null, action: null },
    yt = [],
    y = -1;
  function N(t) {
    return { current: t };
  }
  function Q(t) {
    0 > y || ((t.current = yt[y]), (yt[y] = null), y--);
  }
  function Y(t, e) {
    y++, (yt[y] = t.current), (t.current = e);
  }
  var K = N(null),
    ct = N(null),
    I = N(null),
    te = N(null);
  function bt(t, e) {
    switch ((Y(I, e), Y(ct, t), Y(K, null), e.nodeType)) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? ld(t) : 0;
        break;
      default:
        if (((t = e.tagName), (e = e.namespaceURI)))
          (e = ld(e)), (t = ad(e, t));
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    Q(K), Y(K, t);
  }
  function ke() {
    Q(K), Q(ct), Q(I);
  }
  function ai(t) {
    t.memoizedState !== null && Y(te, t);
    var e = K.current,
      l = ad(e, t.type);
    e !== l && (Y(ct, t), Y(K, l));
  }
  function Cu(t) {
    ct.current === t && (Q(K), Q(ct)),
      te.current === t && (Q(te), (bu._currentValue = k));
  }
  var ui = Object.prototype.hasOwnProperty,
    ni = c.unstable_scheduleCallback,
    ii = c.unstable_cancelCallback,
    sh = c.unstable_shouldYield,
    dh = c.unstable_requestPaint,
    Ae = c.unstable_now,
    hh = c.unstable_getCurrentPriorityLevel,
    Bf = c.unstable_ImmediatePriority,
    qf = c.unstable_UserBlockingPriority,
    Bu = c.unstable_NormalPriority,
    mh = c.unstable_LowPriority,
    Yf = c.unstable_IdlePriority,
    yh = c.log,
    vh = c.unstable_setDisableYieldValue,
    _a = null,
    ee = null;
  function We(t) {
    if (
      (typeof yh == "function" && vh(t),
      ee && typeof ee.setStrictMode == "function")
    )
      try {
        ee.setStrictMode(_a, t);
      } catch {}
  }
  var le = Math.clz32 ? Math.clz32 : ph,
    gh = Math.log,
    Sh = Math.LN2;
  function ph(t) {
    return (t >>>= 0), t === 0 ? 32 : (31 - ((gh(t) / Sh) | 0)) | 0;
  }
  var qu = 256,
    Yu = 4194304;
  function Tl(t) {
    var e = t & 42;
    if (e !== 0) return e;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 4194048;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function Lu(t, e, l) {
    var a = t.pendingLanes;
    if (a === 0) return 0;
    var u = 0,
      n = t.suspendedLanes,
      i = t.pingedLanes;
    t = t.warmLanes;
    var f = a & 134217727;
    return (
      f !== 0
        ? ((a = f & ~n),
          a !== 0
            ? (u = Tl(a))
            : ((i &= f),
              i !== 0
                ? (u = Tl(i))
                : l || ((l = f & ~t), l !== 0 && (u = Tl(l)))))
        : ((f = a & ~n),
          f !== 0
            ? (u = Tl(f))
            : i !== 0
              ? (u = Tl(i))
              : l || ((l = a & ~t), l !== 0 && (u = Tl(l)))),
      u === 0
        ? 0
        : e !== 0 &&
            e !== u &&
            (e & n) === 0 &&
            ((n = u & -u),
            (l = e & -e),
            n >= l || (n === 32 && (l & 4194048) !== 0))
          ? e
          : u
    );
  }
  function Da(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function bh(t, e) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return e + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Lf() {
    var t = qu;
    return (qu <<= 1), (qu & 4194048) === 0 && (qu = 256), t;
  }
  function jf() {
    var t = Yu;
    return (Yu <<= 1), (Yu & 62914560) === 0 && (Yu = 4194304), t;
  }
  function ci(t) {
    for (var e = [], l = 0; 31 > l; l++) e.push(t);
    return e;
  }
  function xa(t, e) {
    (t.pendingLanes |= e),
      e !== 268435456 &&
        ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0));
  }
  function Eh(t, e, l, a, u, n) {
    var i = t.pendingLanes;
    (t.pendingLanes = l),
      (t.suspendedLanes = 0),
      (t.pingedLanes = 0),
      (t.warmLanes = 0),
      (t.expiredLanes &= l),
      (t.entangledLanes &= l),
      (t.errorRecoveryDisabledLanes &= l),
      (t.shellSuspendCounter = 0);
    var f = t.entanglements,
      d = t.expirationTimes,
      E = t.hiddenUpdates;
    for (l = i & ~l; 0 < l; ) {
      var O = 31 - le(l),
        U = 1 << O;
      (f[O] = 0), (d[O] = -1);
      var T = E[O];
      if (T !== null)
        for (E[O] = null, O = 0; O < T.length; O++) {
          var A = T[O];
          A !== null && (A.lane &= -536870913);
        }
      l &= ~U;
    }
    a !== 0 && Gf(t, a, 0),
      n !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= n & ~(i & ~e));
  }
  function Gf(t, e, l) {
    (t.pendingLanes |= e), (t.suspendedLanes &= ~e);
    var a = 31 - le(e);
    (t.entangledLanes |= e),
      (t.entanglements[a] = t.entanglements[a] | 1073741824 | (l & 4194090));
  }
  function Xf(t, e) {
    var l = (t.entangledLanes |= e);
    for (t = t.entanglements; l; ) {
      var a = 31 - le(l),
        u = 1 << a;
      (u & e) | (t[a] & e) && (t[a] |= e), (l &= ~u);
    }
  }
  function fi(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function ri(t) {
    return (
      (t &= -t),
      2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function Qf() {
    var t = j.p;
    return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : Td(t.type));
  }
  function Th(t, e) {
    var l = j.p;
    try {
      return (j.p = t), e();
    } finally {
      j.p = l;
    }
  }
  var Fe = Math.random().toString(36).slice(2),
    wt = "__reactFiber$" + Fe,
    kt = "__reactProps$" + Fe,
    Xl = "__reactContainer$" + Fe,
    oi = "__reactEvents$" + Fe,
    Ah = "__reactListeners$" + Fe,
    Rh = "__reactHandles$" + Fe,
    Zf = "__reactResources$" + Fe,
    Ua = "__reactMarker$" + Fe;
  function si(t) {
    delete t[wt], delete t[kt], delete t[oi], delete t[Ah], delete t[Rh];
  }
  function Ql(t) {
    var e = t[wt];
    if (e) return e;
    for (var l = t.parentNode; l; ) {
      if ((e = l[Xl] || l[wt])) {
        if (
          ((l = e.alternate),
          e.child !== null || (l !== null && l.child !== null))
        )
          for (t = cd(t); t !== null; ) {
            if ((l = t[wt])) return l;
            t = cd(t);
          }
        return e;
      }
      (t = l), (l = t.parentNode);
    }
    return null;
  }
  function Zl(t) {
    if ((t = t[wt] || t[Xl])) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 26 || e === 27 || e === 3)
        return t;
    }
    return null;
  }
  function Na(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(r(33));
  }
  function wl(t) {
    var e = t[Zf];
    return (
      e ||
        (e = t[Zf] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      e
    );
  }
  function Bt(t) {
    t[Ua] = !0;
  }
  var wf = new Set(),
    Vf = {};
  function Al(t, e) {
    Vl(t, e), Vl(t + "Capture", e);
  }
  function Vl(t, e) {
    for (Vf[t] = e, t = 0; t < e.length; t++) wf.add(e[t]);
  }
  var zh = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
    ),
    Kf = {},
    Jf = {};
  function Oh(t) {
    return ui.call(Jf, t)
      ? !0
      : ui.call(Kf, t)
        ? !1
        : zh.test(t)
          ? (Jf[t] = !0)
          : ((Kf[t] = !0), !1);
  }
  function ju(t, e, l) {
    if (Oh(e))
      if (l === null) t.removeAttribute(e);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(e);
            return;
          case "boolean":
            var a = e.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, "" + l);
      }
  }
  function Gu(t, e, l) {
    if (l === null) t.removeAttribute(e);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttribute(e, "" + l);
    }
  }
  function Ue(t, e, l, a) {
    if (a === null) t.removeAttribute(l);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(l);
          return;
      }
      t.setAttributeNS(e, l, "" + a);
    }
  }
  var di, $f;
  function Kl(t) {
    if (di === void 0)
      try {
        throw Error();
      } catch (l) {
        var e = l.stack.trim().match(/\n( *(at )?)/);
        (di = (e && e[1]) || ""),
          ($f =
            -1 <
            l.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < l.stack.indexOf("@")
                ? "@unknown:0:0"
                : "");
      }
    return (
      `
` +
      di +
      t +
      $f
    );
  }
  var hi = !1;
  function mi(t, e) {
    if (!t || hi) return "";
    hi = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function () {
          try {
            if (e) {
              var U = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(U.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(U, []);
                } catch (A) {
                  var T = A;
                }
                Reflect.construct(t, [], U);
              } else {
                try {
                  U.call();
                } catch (A) {
                  T = A;
                }
                t.call(U.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (A) {
                T = A;
              }
              (U = t()) &&
                typeof U.catch == "function" &&
                U.catch(function () {});
            }
          } catch (A) {
            if (A && T && typeof A.stack == "string") return [A.stack, T.stack];
          }
          return [null, null];
        },
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name",
      );
      u &&
        u.configurable &&
        Object.defineProperty(a.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var n = a.DetermineComponentFrameRoot(),
        i = n[0],
        f = n[1];
      if (i && f) {
        var d = i.split(`
`),
          E = f.split(`
`);
        for (
          u = a = 0;
          a < d.length && !d[a].includes("DetermineComponentFrameRoot");

        )
          a++;
        for (; u < E.length && !E[u].includes("DetermineComponentFrameRoot"); )
          u++;
        if (a === d.length || u === E.length)
          for (
            a = d.length - 1, u = E.length - 1;
            1 <= a && 0 <= u && d[a] !== E[u];

          )
            u--;
        for (; 1 <= a && 0 <= u; a--, u--)
          if (d[a] !== E[u]) {
            if (a !== 1 || u !== 1)
              do
                if ((a--, u--, 0 > u || d[a] !== E[u])) {
                  var O =
                    `
` + d[a].replace(" at new ", " at ");
                  return (
                    t.displayName &&
                      O.includes("<anonymous>") &&
                      (O = O.replace("<anonymous>", t.displayName)),
                    O
                  );
                }
              while (1 <= a && 0 <= u);
            break;
          }
      }
    } finally {
      (hi = !1), (Error.prepareStackTrace = l);
    }
    return (l = t ? t.displayName || t.name : "") ? Kl(l) : "";
  }
  function Mh(t) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Kl(t.type);
      case 16:
        return Kl("Lazy");
      case 13:
        return Kl("Suspense");
      case 19:
        return Kl("SuspenseList");
      case 0:
      case 15:
        return mi(t.type, !1);
      case 11:
        return mi(t.type.render, !1);
      case 1:
        return mi(t.type, !0);
      case 31:
        return Kl("Activity");
      default:
        return "";
    }
  }
  function kf(t) {
    try {
      var e = "";
      do (e += Mh(t)), (t = t.return);
      while (t);
      return e;
    } catch (l) {
      return (
        `
Error generating stack: ` +
        l.message +
        `
` +
        l.stack
      );
    }
  }
  function se(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function Wf(t) {
    var e = t.type;
    return (
      (t = t.nodeName) &&
      t.toLowerCase() === "input" &&
      (e === "checkbox" || e === "radio")
    );
  }
  function _h(t) {
    var e = Wf(t) ? "checked" : "value",
      l = Object.getOwnPropertyDescriptor(t.constructor.prototype, e),
      a = "" + t[e];
    if (
      !t.hasOwnProperty(e) &&
      typeof l < "u" &&
      typeof l.get == "function" &&
      typeof l.set == "function"
    ) {
      var u = l.get,
        n = l.set;
      return (
        Object.defineProperty(t, e, {
          configurable: !0,
          get: function () {
            return u.call(this);
          },
          set: function (i) {
            (a = "" + i), n.call(this, i);
          },
        }),
        Object.defineProperty(t, e, { enumerable: l.enumerable }),
        {
          getValue: function () {
            return a;
          },
          setValue: function (i) {
            a = "" + i;
          },
          stopTracking: function () {
            (t._valueTracker = null), delete t[e];
          },
        }
      );
    }
  }
  function Xu(t) {
    t._valueTracker || (t._valueTracker = _h(t));
  }
  function Ff(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var l = e.getValue(),
      a = "";
    return (
      t && (a = Wf(t) ? (t.checked ? "true" : "false") : t.value),
      (t = a),
      t !== l ? (e.setValue(t), !0) : !1
    );
  }
  function Qu(t) {
    if (
      ((t = t || (typeof document < "u" ? document : void 0)), typeof t > "u")
    )
      return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Dh = /[\n"\\]/g;
  function de(t) {
    return t.replace(Dh, function (e) {
      return "\\" + e.charCodeAt(0).toString(16) + " ";
    });
  }
  function yi(t, e, l, a, u, n, i, f) {
    (t.name = ""),
      i != null &&
      typeof i != "function" &&
      typeof i != "symbol" &&
      typeof i != "boolean"
        ? (t.type = i)
        : t.removeAttribute("type"),
      e != null
        ? i === "number"
          ? ((e === 0 && t.value === "") || t.value != e) &&
            (t.value = "" + se(e))
          : t.value !== "" + se(e) && (t.value = "" + se(e))
        : (i !== "submit" && i !== "reset") || t.removeAttribute("value"),
      e != null
        ? vi(t, i, se(e))
        : l != null
          ? vi(t, i, se(l))
          : a != null && t.removeAttribute("value"),
      u == null && n != null && (t.defaultChecked = !!n),
      u != null &&
        (t.checked = u && typeof u != "function" && typeof u != "symbol"),
      f != null &&
      typeof f != "function" &&
      typeof f != "symbol" &&
      typeof f != "boolean"
        ? (t.name = "" + se(f))
        : t.removeAttribute("name");
  }
  function Pf(t, e, l, a, u, n, i, f) {
    if (
      (n != null &&
        typeof n != "function" &&
        typeof n != "symbol" &&
        typeof n != "boolean" &&
        (t.type = n),
      e != null || l != null)
    ) {
      if (!((n !== "submit" && n !== "reset") || e != null)) return;
      (l = l != null ? "" + se(l) : ""),
        (e = e != null ? "" + se(e) : l),
        f || e === t.value || (t.value = e),
        (t.defaultValue = e);
    }
    (a = a ?? u),
      (a = typeof a != "function" && typeof a != "symbol" && !!a),
      (t.checked = f ? t.checked : !!a),
      (t.defaultChecked = !!a),
      i != null &&
        typeof i != "function" &&
        typeof i != "symbol" &&
        typeof i != "boolean" &&
        (t.name = i);
  }
  function vi(t, e, l) {
    (e === "number" && Qu(t.ownerDocument) === t) ||
      t.defaultValue === "" + l ||
      (t.defaultValue = "" + l);
  }
  function Jl(t, e, l, a) {
    if (((t = t.options), e)) {
      e = {};
      for (var u = 0; u < l.length; u++) e["$" + l[u]] = !0;
      for (l = 0; l < t.length; l++)
        (u = e.hasOwnProperty("$" + t[l].value)),
          t[l].selected !== u && (t[l].selected = u),
          u && a && (t[l].defaultSelected = !0);
    } else {
      for (l = "" + se(l), e = null, u = 0; u < t.length; u++) {
        if (t[u].value === l) {
          (t[u].selected = !0), a && (t[u].defaultSelected = !0);
          return;
        }
        e !== null || t[u].disabled || (e = t[u]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function If(t, e, l) {
    if (
      e != null &&
      ((e = "" + se(e)), e !== t.value && (t.value = e), l == null)
    ) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = l != null ? "" + se(l) : "";
  }
  function tr(t, e, l, a) {
    if (e == null) {
      if (a != null) {
        if (l != null) throw Error(r(92));
        if (Zt(a)) {
          if (1 < a.length) throw Error(r(93));
          a = a[0];
        }
        l = a;
      }
      l == null && (l = ""), (e = l);
    }
    (l = se(e)),
      (t.defaultValue = l),
      (a = t.textContent),
      a === l && a !== "" && a !== null && (t.value = a);
  }
  function $l(t, e) {
    if (e) {
      var l = t.firstChild;
      if (l && l === t.lastChild && l.nodeType === 3) {
        l.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var xh = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " ",
    ),
  );
  function er(t, e, l) {
    var a = e.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === ""
      ? a
        ? t.setProperty(e, "")
        : e === "float"
          ? (t.cssFloat = "")
          : (t[e] = "")
      : a
        ? t.setProperty(e, l)
        : typeof l != "number" || l === 0 || xh.has(e)
          ? e === "float"
            ? (t.cssFloat = l)
            : (t[e] = ("" + l).trim())
          : (t[e] = l + "px");
  }
  function lr(t, e, l) {
    if (e != null && typeof e != "object") throw Error(r(62));
    if (((t = t.style), l != null)) {
      for (var a in l)
        !l.hasOwnProperty(a) ||
          (e != null && e.hasOwnProperty(a)) ||
          (a.indexOf("--") === 0
            ? t.setProperty(a, "")
            : a === "float"
              ? (t.cssFloat = "")
              : (t[a] = ""));
      for (var u in e)
        (a = e[u]), e.hasOwnProperty(u) && l[u] !== a && er(t, u, a);
    } else for (var n in e) e.hasOwnProperty(n) && er(t, n, e[n]);
  }
  function gi(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Uh = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    Nh =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Zu(t) {
    return Nh.test("" + t)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : t;
  }
  var Si = null;
  function pi(t) {
    return (
      (t = t.target || t.srcElement || window),
      t.correspondingUseElement && (t = t.correspondingUseElement),
      t.nodeType === 3 ? t.parentNode : t
    );
  }
  var kl = null,
    Wl = null;
  function ar(t) {
    var e = Zl(t);
    if (e && (t = e.stateNode)) {
      var l = t[kt] || null;
      t: switch (((t = e.stateNode), e.type)) {
        case "input":
          if (
            (yi(
              t,
              l.value,
              l.defaultValue,
              l.defaultValue,
              l.checked,
              l.defaultChecked,
              l.type,
              l.name,
            ),
            (e = l.name),
            l.type === "radio" && e != null)
          ) {
            for (l = t; l.parentNode; ) l = l.parentNode;
            for (
              l = l.querySelectorAll(
                'input[name="' + de("" + e) + '"][type="radio"]',
              ),
                e = 0;
              e < l.length;
              e++
            ) {
              var a = l[e];
              if (a !== t && a.form === t.form) {
                var u = a[kt] || null;
                if (!u) throw Error(r(90));
                yi(
                  a,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name,
                );
              }
            }
            for (e = 0; e < l.length; e++)
              (a = l[e]), a.form === t.form && Ff(a);
          }
          break t;
        case "textarea":
          If(t, l.value, l.defaultValue);
          break t;
        case "select":
          (e = l.value), e != null && Jl(t, !!l.multiple, e, !1);
      }
    }
  }
  var bi = !1;
  function ur(t, e, l) {
    if (bi) return t(e, l);
    bi = !0;
    try {
      var a = t(e);
      return a;
    } finally {
      if (
        ((bi = !1),
        (kl !== null || Wl !== null) &&
          (Dn(), kl && ((e = kl), (t = Wl), (Wl = kl = null), ar(e), t)))
      )
        for (e = 0; e < t.length; e++) ar(t[e]);
    }
  }
  function Ha(t, e) {
    var l = t.stateNode;
    if (l === null) return null;
    var a = l[kt] || null;
    if (a === null) return null;
    l = a[e];
    t: switch (e) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (a = !a.disabled) ||
          ((t = t.type),
          (a = !(
            t === "button" ||
            t === "input" ||
            t === "select" ||
            t === "textarea"
          ))),
          (t = !a);
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (l && typeof l != "function") throw Error(r(231, e, typeof l));
    return l;
  }
  var Ne = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    Ei = !1;
  if (Ne)
    try {
      var Ca = {};
      Object.defineProperty(Ca, "passive", {
        get: function () {
          Ei = !0;
        },
      }),
        window.addEventListener("test", Ca, Ca),
        window.removeEventListener("test", Ca, Ca);
    } catch {
      Ei = !1;
    }
  var Pe = null,
    Ti = null,
    wu = null;
  function nr() {
    if (wu) return wu;
    var t,
      e = Ti,
      l = e.length,
      a,
      u = "value" in Pe ? Pe.value : Pe.textContent,
      n = u.length;
    for (t = 0; t < l && e[t] === u[t]; t++);
    var i = l - t;
    for (a = 1; a <= i && e[l - a] === u[n - a]; a++);
    return (wu = u.slice(t, 1 < a ? 1 - a : void 0));
  }
  function Vu(t) {
    var e = t.keyCode;
    return (
      "charCode" in t
        ? ((t = t.charCode), t === 0 && e === 13 && (t = 13))
        : (t = e),
      t === 10 && (t = 13),
      32 <= t || t === 13 ? t : 0
    );
  }
  function Ku() {
    return !0;
  }
  function ir() {
    return !1;
  }
  function Wt(t) {
    function e(l, a, u, n, i) {
      (this._reactName = l),
        (this._targetInst = u),
        (this.type = a),
        (this.nativeEvent = n),
        (this.target = i),
        (this.currentTarget = null);
      for (var f in t)
        t.hasOwnProperty(f) && ((l = t[f]), (this[f] = l ? l(n) : n[f]));
      return (
        (this.isDefaultPrevented = (
          n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1
        )
          ? Ku
          : ir),
        (this.isPropagationStopped = ir),
        this
      );
    }
    return (
      R(e.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var l = this.nativeEvent;
          l &&
            (l.preventDefault
              ? l.preventDefault()
              : typeof l.returnValue != "unknown" && (l.returnValue = !1),
            (this.isDefaultPrevented = Ku));
        },
        stopPropagation: function () {
          var l = this.nativeEvent;
          l &&
            (l.stopPropagation
              ? l.stopPropagation()
              : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0),
            (this.isPropagationStopped = Ku));
        },
        persist: function () {},
        isPersistent: Ku,
      }),
      e
    );
  }
  var Rl = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (t) {
        return t.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Ju = Wt(Rl),
    Ba = R({}, Rl, { view: 0, detail: 0 }),
    Hh = Wt(Ba),
    Ai,
    Ri,
    qa,
    $u = R({}, Ba, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Oi,
      button: 0,
      buttons: 0,
      relatedTarget: function (t) {
        return t.relatedTarget === void 0
          ? t.fromElement === t.srcElement
            ? t.toElement
            : t.fromElement
          : t.relatedTarget;
      },
      movementX: function (t) {
        return "movementX" in t
          ? t.movementX
          : (t !== qa &&
              (qa && t.type === "mousemove"
                ? ((Ai = t.screenX - qa.screenX), (Ri = t.screenY - qa.screenY))
                : (Ri = Ai = 0),
              (qa = t)),
            Ai);
      },
      movementY: function (t) {
        return "movementY" in t ? t.movementY : Ri;
      },
    }),
    cr = Wt($u),
    Ch = R({}, $u, { dataTransfer: 0 }),
    Bh = Wt(Ch),
    qh = R({}, Ba, { relatedTarget: 0 }),
    zi = Wt(qh),
    Yh = R({}, Rl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Lh = Wt(Yh),
    jh = R({}, Rl, {
      clipboardData: function (t) {
        return "clipboardData" in t ? t.clipboardData : window.clipboardData;
      },
    }),
    Gh = Wt(jh),
    Xh = R({}, Rl, { data: 0 }),
    fr = Wt(Xh),
    Qh = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    Zh = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    wh = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function Vh(t) {
    var e = this.nativeEvent;
    return e.getModifierState
      ? e.getModifierState(t)
      : (t = wh[t])
        ? !!e[t]
        : !1;
  }
  function Oi() {
    return Vh;
  }
  var Kh = R({}, Ba, {
      key: function (t) {
        if (t.key) {
          var e = Qh[t.key] || t.key;
          if (e !== "Unidentified") return e;
        }
        return t.type === "keypress"
          ? ((t = Vu(t)), t === 13 ? "Enter" : String.fromCharCode(t))
          : t.type === "keydown" || t.type === "keyup"
            ? Zh[t.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Oi,
      charCode: function (t) {
        return t.type === "keypress" ? Vu(t) : 0;
      },
      keyCode: function (t) {
        return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
      },
      which: function (t) {
        return t.type === "keypress"
          ? Vu(t)
          : t.type === "keydown" || t.type === "keyup"
            ? t.keyCode
            : 0;
      },
    }),
    Jh = Wt(Kh),
    $h = R({}, $u, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    rr = Wt($h),
    kh = R({}, Ba, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Oi,
    }),
    Wh = Wt(kh),
    Fh = R({}, Rl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Ph = Wt(Fh),
    Ih = R({}, $u, {
      deltaX: function (t) {
        return "deltaX" in t
          ? t.deltaX
          : "wheelDeltaX" in t
            ? -t.wheelDeltaX
            : 0;
      },
      deltaY: function (t) {
        return "deltaY" in t
          ? t.deltaY
          : "wheelDeltaY" in t
            ? -t.wheelDeltaY
            : "wheelDelta" in t
              ? -t.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    t0 = Wt(Ih),
    e0 = R({}, Rl, { newState: 0, oldState: 0 }),
    l0 = Wt(e0),
    a0 = [9, 13, 27, 32],
    Mi = Ne && "CompositionEvent" in window,
    Ya = null;
  Ne && "documentMode" in document && (Ya = document.documentMode);
  var u0 = Ne && "TextEvent" in window && !Ya,
    or = Ne && (!Mi || (Ya && 8 < Ya && 11 >= Ya)),
    sr = " ",
    dr = !1;
  function hr(t, e) {
    switch (t) {
      case "keyup":
        return a0.indexOf(e.keyCode) !== -1;
      case "keydown":
        return e.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function mr(t) {
    return (t = t.detail), typeof t == "object" && "data" in t ? t.data : null;
  }
  var Fl = !1;
  function n0(t, e) {
    switch (t) {
      case "compositionend":
        return mr(e);
      case "keypress":
        return e.which !== 32 ? null : ((dr = !0), sr);
      case "textInput":
        return (t = e.data), t === sr && dr ? null : t;
      default:
        return null;
    }
  }
  function i0(t, e) {
    if (Fl)
      return t === "compositionend" || (!Mi && hr(t, e))
        ? ((t = nr()), (wu = Ti = Pe = null), (Fl = !1), t)
        : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(e.ctrlKey || e.altKey || e.metaKey) || (e.ctrlKey && e.altKey)) {
          if (e.char && 1 < e.char.length) return e.char;
          if (e.which) return String.fromCharCode(e.which);
        }
        return null;
      case "compositionend":
        return or && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var c0 = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function yr(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!c0[t.type] : e === "textarea";
  }
  function vr(t, e, l, a) {
    kl ? (Wl ? Wl.push(a) : (Wl = [a])) : (kl = a),
      (e = Bn(e, "onChange")),
      0 < e.length &&
        ((l = new Ju("onChange", "change", null, l, a)),
        t.push({ event: l, listeners: e }));
  }
  var La = null,
    ja = null;
  function f0(t) {
    Fs(t, 0);
  }
  function ku(t) {
    var e = Na(t);
    if (Ff(e)) return t;
  }
  function gr(t, e) {
    if (t === "change") return e;
  }
  var Sr = !1;
  if (Ne) {
    var _i;
    if (Ne) {
      var Di = "oninput" in document;
      if (!Di) {
        var pr = document.createElement("div");
        pr.setAttribute("oninput", "return;"),
          (Di = typeof pr.oninput == "function");
      }
      _i = Di;
    } else _i = !1;
    Sr = _i && (!document.documentMode || 9 < document.documentMode);
  }
  function br() {
    La && (La.detachEvent("onpropertychange", Er), (ja = La = null));
  }
  function Er(t) {
    if (t.propertyName === "value" && ku(ja)) {
      var e = [];
      vr(e, ja, t, pi(t)), ur(f0, e);
    }
  }
  function r0(t, e, l) {
    t === "focusin"
      ? (br(), (La = e), (ja = l), La.attachEvent("onpropertychange", Er))
      : t === "focusout" && br();
  }
  function o0(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return ku(ja);
  }
  function s0(t, e) {
    if (t === "click") return ku(e);
  }
  function d0(t, e) {
    if (t === "input" || t === "change") return ku(e);
  }
  function h0(t, e) {
    return (t === e && (t !== 0 || 1 / t === 1 / e)) || (t !== t && e !== e);
  }
  var ae = typeof Object.is == "function" ? Object.is : h0;
  function Ga(t, e) {
    if (ae(t, e)) return !0;
    if (
      typeof t != "object" ||
      t === null ||
      typeof e != "object" ||
      e === null
    )
      return !1;
    var l = Object.keys(t),
      a = Object.keys(e);
    if (l.length !== a.length) return !1;
    for (a = 0; a < l.length; a++) {
      var u = l[a];
      if (!ui.call(e, u) || !ae(t[u], e[u])) return !1;
    }
    return !0;
  }
  function Tr(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Ar(t, e) {
    var l = Tr(t);
    t = 0;
    for (var a; l; ) {
      if (l.nodeType === 3) {
        if (((a = t + l.textContent.length), t <= e && a >= e))
          return { node: l, offset: e - t };
        t = a;
      }
      t: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break t;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = Tr(l);
    }
  }
  function Rr(t, e) {
    return t && e
      ? t === e
        ? !0
        : t && t.nodeType === 3
          ? !1
          : e && e.nodeType === 3
            ? Rr(t, e.parentNode)
            : "contains" in t
              ? t.contains(e)
              : t.compareDocumentPosition
                ? !!(t.compareDocumentPosition(e) & 16)
                : !1
      : !1;
  }
  function zr(t) {
    t =
      t != null &&
      t.ownerDocument != null &&
      t.ownerDocument.defaultView != null
        ? t.ownerDocument.defaultView
        : window;
    for (var e = Qu(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var l = typeof e.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) t = e.contentWindow;
      else break;
      e = Qu(t.document);
    }
    return e;
  }
  function xi(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return (
      e &&
      ((e === "input" &&
        (t.type === "text" ||
          t.type === "search" ||
          t.type === "tel" ||
          t.type === "url" ||
          t.type === "password")) ||
        e === "textarea" ||
        t.contentEditable === "true")
    );
  }
  var m0 = Ne && "documentMode" in document && 11 >= document.documentMode,
    Pl = null,
    Ui = null,
    Xa = null,
    Ni = !1;
  function Or(t, e, l) {
    var a =
      l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Ni ||
      Pl == null ||
      Pl !== Qu(a) ||
      ((a = Pl),
      "selectionStart" in a && xi(a)
        ? (a = { start: a.selectionStart, end: a.selectionEnd })
        : ((a = (
            (a.ownerDocument && a.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (a = {
            anchorNode: a.anchorNode,
            anchorOffset: a.anchorOffset,
            focusNode: a.focusNode,
            focusOffset: a.focusOffset,
          })),
      (Xa && Ga(Xa, a)) ||
        ((Xa = a),
        (a = Bn(Ui, "onSelect")),
        0 < a.length &&
          ((e = new Ju("onSelect", "select", null, e, l)),
          t.push({ event: e, listeners: a }),
          (e.target = Pl))));
  }
  function zl(t, e) {
    var l = {};
    return (
      (l[t.toLowerCase()] = e.toLowerCase()),
      (l["Webkit" + t] = "webkit" + e),
      (l["Moz" + t] = "moz" + e),
      l
    );
  }
  var Il = {
      animationend: zl("Animation", "AnimationEnd"),
      animationiteration: zl("Animation", "AnimationIteration"),
      animationstart: zl("Animation", "AnimationStart"),
      transitionrun: zl("Transition", "TransitionRun"),
      transitionstart: zl("Transition", "TransitionStart"),
      transitioncancel: zl("Transition", "TransitionCancel"),
      transitionend: zl("Transition", "TransitionEnd"),
    },
    Hi = {},
    Mr = {};
  Ne &&
    ((Mr = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete Il.animationend.animation,
      delete Il.animationiteration.animation,
      delete Il.animationstart.animation),
    "TransitionEvent" in window || delete Il.transitionend.transition);
  function Ol(t) {
    if (Hi[t]) return Hi[t];
    if (!Il[t]) return t;
    var e = Il[t],
      l;
    for (l in e) if (e.hasOwnProperty(l) && l in Mr) return (Hi[t] = e[l]);
    return t;
  }
  var _r = Ol("animationend"),
    Dr = Ol("animationiteration"),
    xr = Ol("animationstart"),
    y0 = Ol("transitionrun"),
    v0 = Ol("transitionstart"),
    g0 = Ol("transitioncancel"),
    Ur = Ol("transitionend"),
    Nr = new Map(),
    Ci =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  Ci.push("scrollEnd");
  function be(t, e) {
    Nr.set(t, e), Al(e, [t]);
  }
  var Hr = new WeakMap();
  function he(t, e) {
    if (typeof t == "object" && t !== null) {
      var l = Hr.get(t);
      return l !== void 0
        ? l
        : ((e = { value: t, source: e, stack: kf(e) }), Hr.set(t, e), e);
    }
    return { value: t, source: e, stack: kf(e) };
  }
  var me = [],
    ta = 0,
    Bi = 0;
  function Wu() {
    for (var t = ta, e = (Bi = ta = 0); e < t; ) {
      var l = me[e];
      me[e++] = null;
      var a = me[e];
      me[e++] = null;
      var u = me[e];
      me[e++] = null;
      var n = me[e];
      if (((me[e++] = null), a !== null && u !== null)) {
        var i = a.pending;
        i === null ? (u.next = u) : ((u.next = i.next), (i.next = u)),
          (a.pending = u);
      }
      n !== 0 && Cr(l, u, n);
    }
  }
  function Fu(t, e, l, a) {
    (me[ta++] = t),
      (me[ta++] = e),
      (me[ta++] = l),
      (me[ta++] = a),
      (Bi |= a),
      (t.lanes |= a),
      (t = t.alternate),
      t !== null && (t.lanes |= a);
  }
  function qi(t, e, l, a) {
    return Fu(t, e, l, a), Pu(t);
  }
  function ea(t, e) {
    return Fu(t, null, null, e), Pu(t);
  }
  function Cr(t, e, l) {
    t.lanes |= l;
    var a = t.alternate;
    a !== null && (a.lanes |= l);
    for (var u = !1, n = t.return; n !== null; )
      (n.childLanes |= l),
        (a = n.alternate),
        a !== null && (a.childLanes |= l),
        n.tag === 22 &&
          ((t = n.stateNode), t === null || t._visibility & 1 || (u = !0)),
        (t = n),
        (n = n.return);
    return t.tag === 3
      ? ((n = t.stateNode),
        u &&
          e !== null &&
          ((u = 31 - le(l)),
          (t = n.hiddenUpdates),
          (a = t[u]),
          a === null ? (t[u] = [e]) : a.push(e),
          (e.lane = l | 536870912)),
        n)
      : null;
  }
  function Pu(t) {
    if (50 < du) throw ((du = 0), (Qc = null), Error(r(185)));
    for (var e = t.return; e !== null; ) (t = e), (e = t.return);
    return t.tag === 3 ? t.stateNode : null;
  }
  var la = {};
  function S0(t, e, l, a) {
    (this.tag = t),
      (this.key = l),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = e),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = a),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null);
  }
  function ue(t, e, l, a) {
    return new S0(t, e, l, a);
  }
  function Yi(t) {
    return (t = t.prototype), !(!t || !t.isReactComponent);
  }
  function He(t, e) {
    var l = t.alternate;
    return (
      l === null
        ? ((l = ue(t.tag, e, t.key, t.mode)),
          (l.elementType = t.elementType),
          (l.type = t.type),
          (l.stateNode = t.stateNode),
          (l.alternate = t),
          (t.alternate = l))
        : ((l.pendingProps = e),
          (l.type = t.type),
          (l.flags = 0),
          (l.subtreeFlags = 0),
          (l.deletions = null)),
      (l.flags = t.flags & 65011712),
      (l.childLanes = t.childLanes),
      (l.lanes = t.lanes),
      (l.child = t.child),
      (l.memoizedProps = t.memoizedProps),
      (l.memoizedState = t.memoizedState),
      (l.updateQueue = t.updateQueue),
      (e = t.dependencies),
      (l.dependencies =
        e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }),
      (l.sibling = t.sibling),
      (l.index = t.index),
      (l.ref = t.ref),
      (l.refCleanup = t.refCleanup),
      l
    );
  }
  function Br(t, e) {
    t.flags &= 65011714;
    var l = t.alternate;
    return (
      l === null
        ? ((t.childLanes = 0),
          (t.lanes = e),
          (t.child = null),
          (t.subtreeFlags = 0),
          (t.memoizedProps = null),
          (t.memoizedState = null),
          (t.updateQueue = null),
          (t.dependencies = null),
          (t.stateNode = null))
        : ((t.childLanes = l.childLanes),
          (t.lanes = l.lanes),
          (t.child = l.child),
          (t.subtreeFlags = 0),
          (t.deletions = null),
          (t.memoizedProps = l.memoizedProps),
          (t.memoizedState = l.memoizedState),
          (t.updateQueue = l.updateQueue),
          (t.type = l.type),
          (e = l.dependencies),
          (t.dependencies =
            e === null
              ? null
              : { lanes: e.lanes, firstContext: e.firstContext })),
      t
    );
  }
  function Iu(t, e, l, a, u, n) {
    var i = 0;
    if (((a = t), typeof t == "function")) Yi(t) && (i = 1);
    else if (typeof t == "string")
      i = bm(t, l, K.current)
        ? 26
        : t === "html" || t === "head" || t === "body"
          ? 27
          : 5;
    else
      t: switch (t) {
        case pt:
          return (t = ue(31, l, e, u)), (t.elementType = pt), (t.lanes = n), t;
        case C:
          return Ml(l.children, u, n, e);
        case w:
          (i = 8), (u |= 24);
          break;
        case G:
          return (
            (t = ue(12, l, e, u | 2)), (t.elementType = G), (t.lanes = n), t
          );
        case F:
          return (t = ue(13, l, e, u)), (t.elementType = F), (t.lanes = n), t;
        case xt:
          return (t = ue(19, l, e, u)), (t.elementType = xt), (t.lanes = n), t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case q:
              case X:
                i = 10;
                break t;
              case P:
                i = 9;
                break t;
              case it:
                i = 11;
                break t;
              case Rt:
                i = 14;
                break t;
              case Mt:
                (i = 16), (a = null);
                break t;
            }
          (i = 29),
            (l = Error(r(130, t === null ? "null" : typeof t, ""))),
            (a = null);
      }
    return (
      (e = ue(i, l, e, u)), (e.elementType = t), (e.type = a), (e.lanes = n), e
    );
  }
  function Ml(t, e, l, a) {
    return (t = ue(7, t, a, e)), (t.lanes = l), t;
  }
  function Li(t, e, l) {
    return (t = ue(6, t, null, e)), (t.lanes = l), t;
  }
  function ji(t, e, l) {
    return (
      (e = ue(4, t.children !== null ? t.children : [], t.key, e)),
      (e.lanes = l),
      (e.stateNode = {
        containerInfo: t.containerInfo,
        pendingChildren: null,
        implementation: t.implementation,
      }),
      e
    );
  }
  var aa = [],
    ua = 0,
    tn = null,
    en = 0,
    ye = [],
    ve = 0,
    _l = null,
    Ce = 1,
    Be = "";
  function Dl(t, e) {
    (aa[ua++] = en), (aa[ua++] = tn), (tn = t), (en = e);
  }
  function qr(t, e, l) {
    (ye[ve++] = Ce), (ye[ve++] = Be), (ye[ve++] = _l), (_l = t);
    var a = Ce;
    t = Be;
    var u = 32 - le(a) - 1;
    (a &= ~(1 << u)), (l += 1);
    var n = 32 - le(e) + u;
    if (30 < n) {
      var i = u - (u % 5);
      (n = (a & ((1 << i) - 1)).toString(32)),
        (a >>= i),
        (u -= i),
        (Ce = (1 << (32 - le(e) + u)) | (l << u) | a),
        (Be = n + t);
    } else (Ce = (1 << n) | (l << u) | a), (Be = t);
  }
  function Gi(t) {
    t.return !== null && (Dl(t, 1), qr(t, 1, 0));
  }
  function Xi(t) {
    for (; t === tn; )
      (tn = aa[--ua]), (aa[ua] = null), (en = aa[--ua]), (aa[ua] = null);
    for (; t === _l; )
      (_l = ye[--ve]),
        (ye[ve] = null),
        (Be = ye[--ve]),
        (ye[ve] = null),
        (Ce = ye[--ve]),
        (ye[ve] = null);
  }
  var $t = null,
    zt = null,
    rt = !1,
    xl = null,
    Re = !1,
    Qi = Error(r(519));
  function Ul(t) {
    var e = Error(r(418, ""));
    throw (wa(he(e, t)), Qi);
  }
  function Yr(t) {
    var e = t.stateNode,
      l = t.type,
      a = t.memoizedProps;
    switch (((e[wt] = t), (e[kt] = a), l)) {
      case "dialog":
        ut("cancel", e), ut("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        ut("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < mu.length; l++) ut(mu[l], e);
        break;
      case "source":
        ut("error", e);
        break;
      case "img":
      case "image":
      case "link":
        ut("error", e), ut("load", e);
        break;
      case "details":
        ut("toggle", e);
        break;
      case "input":
        ut("invalid", e),
          Pf(
            e,
            a.value,
            a.defaultValue,
            a.checked,
            a.defaultChecked,
            a.type,
            a.name,
            !0,
          ),
          Xu(e);
        break;
      case "select":
        ut("invalid", e);
        break;
      case "textarea":
        ut("invalid", e), tr(e, a.value, a.defaultValue, a.children), Xu(e);
    }
    (l = a.children),
      (typeof l != "string" && typeof l != "number" && typeof l != "bigint") ||
      e.textContent === "" + l ||
      a.suppressHydrationWarning === !0 ||
      ed(e.textContent, l)
        ? (a.popover != null && (ut("beforetoggle", e), ut("toggle", e)),
          a.onScroll != null && ut("scroll", e),
          a.onScrollEnd != null && ut("scrollend", e),
          a.onClick != null && (e.onclick = qn),
          (e = !0))
        : (e = !1),
      e || Ul(t);
  }
  function Lr(t) {
    for ($t = t.return; $t; )
      switch ($t.tag) {
        case 5:
        case 13:
          Re = !1;
          return;
        case 27:
        case 3:
          Re = !0;
          return;
        default:
          $t = $t.return;
      }
  }
  function Qa(t) {
    if (t !== $t) return !1;
    if (!rt) return Lr(t), (rt = !0), !1;
    var e = t.tag,
      l;
    if (
      ((l = e !== 3 && e !== 27) &&
        ((l = e === 5) &&
          ((l = t.type),
          (l =
            !(l !== "form" && l !== "button") || uf(t.type, t.memoizedProps))),
        (l = !l)),
      l && zt && Ul(t),
      Lr(t),
      e === 13)
    ) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
        throw Error(r(317));
      t: {
        for (t = t.nextSibling, e = 0; t; ) {
          if (t.nodeType === 8)
            if (((l = t.data), l === "/$")) {
              if (e === 0) {
                zt = Te(t.nextSibling);
                break t;
              }
              e--;
            } else (l !== "$" && l !== "$!" && l !== "$?") || e++;
          t = t.nextSibling;
        }
        zt = null;
      }
    } else
      e === 27
        ? ((e = zt), ml(t.type) ? ((t = rf), (rf = null), (zt = t)) : (zt = e))
        : (zt = $t ? Te(t.stateNode.nextSibling) : null);
    return !0;
  }
  function Za() {
    (zt = $t = null), (rt = !1);
  }
  function jr() {
    var t = xl;
    return (
      t !== null &&
        (It === null ? (It = t) : It.push.apply(It, t), (xl = null)),
      t
    );
  }
  function wa(t) {
    xl === null ? (xl = [t]) : xl.push(t);
  }
  var Zi = N(null),
    Nl = null,
    qe = null;
  function Ie(t, e, l) {
    Y(Zi, e._currentValue), (e._currentValue = l);
  }
  function Ye(t) {
    (t._currentValue = Zi.current), Q(Zi);
  }
  function wi(t, e, l) {
    for (; t !== null; ) {
      var a = t.alternate;
      if (
        ((t.childLanes & e) !== e
          ? ((t.childLanes |= e), a !== null && (a.childLanes |= e))
          : a !== null && (a.childLanes & e) !== e && (a.childLanes |= e),
        t === l)
      )
        break;
      t = t.return;
    }
  }
  function Vi(t, e, l, a) {
    var u = t.child;
    for (u !== null && (u.return = t); u !== null; ) {
      var n = u.dependencies;
      if (n !== null) {
        var i = u.child;
        n = n.firstContext;
        t: for (; n !== null; ) {
          var f = n;
          n = u;
          for (var d = 0; d < e.length; d++)
            if (f.context === e[d]) {
              (n.lanes |= l),
                (f = n.alternate),
                f !== null && (f.lanes |= l),
                wi(n.return, l, t),
                a || (i = null);
              break t;
            }
          n = f.next;
        }
      } else if (u.tag === 18) {
        if (((i = u.return), i === null)) throw Error(r(341));
        (i.lanes |= l),
          (n = i.alternate),
          n !== null && (n.lanes |= l),
          wi(i, l, t),
          (i = null);
      } else i = u.child;
      if (i !== null) i.return = u;
      else
        for (i = u; i !== null; ) {
          if (i === t) {
            i = null;
            break;
          }
          if (((u = i.sibling), u !== null)) {
            (u.return = i.return), (i = u);
            break;
          }
          i = i.return;
        }
      u = i;
    }
  }
  function Va(t, e, l, a) {
    t = null;
    for (var u = e, n = !1; u !== null; ) {
      if (!n) {
        if ((u.flags & 524288) !== 0) n = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var i = u.alternate;
        if (i === null) throw Error(r(387));
        if (((i = i.memoizedProps), i !== null)) {
          var f = u.type;
          ae(u.pendingProps.value, i.value) ||
            (t !== null ? t.push(f) : (t = [f]));
        }
      } else if (u === te.current) {
        if (((i = u.alternate), i === null)) throw Error(r(387));
        i.memoizedState.memoizedState !== u.memoizedState.memoizedState &&
          (t !== null ? t.push(bu) : (t = [bu]));
      }
      u = u.return;
    }
    t !== null && Vi(e, t, l, a), (e.flags |= 262144);
  }
  function ln(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!ae(t.context._currentValue, t.memoizedValue)) return !0;
      t = t.next;
    }
    return !1;
  }
  function Hl(t) {
    (Nl = t),
      (qe = null),
      (t = t.dependencies),
      t !== null && (t.firstContext = null);
  }
  function Vt(t) {
    return Gr(Nl, t);
  }
  function an(t, e) {
    return Nl === null && Hl(t), Gr(t, e);
  }
  function Gr(t, e) {
    var l = e._currentValue;
    if (((e = { context: e, memoizedValue: l, next: null }), qe === null)) {
      if (t === null) throw Error(r(308));
      (qe = e),
        (t.dependencies = { lanes: 0, firstContext: e }),
        (t.flags |= 524288);
    } else qe = qe.next = e;
    return l;
  }
  var p0 =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var t = [],
              e = (this.signal = {
                aborted: !1,
                addEventListener: function (l, a) {
                  t.push(a);
                },
              });
            this.abort = function () {
              (e.aborted = !0),
                t.forEach(function (l) {
                  return l();
                });
            };
          },
    b0 = c.unstable_scheduleCallback,
    E0 = c.unstable_NormalPriority,
    Ht = {
      $$typeof: X,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Ki() {
    return { controller: new p0(), data: new Map(), refCount: 0 };
  }
  function Ka(t) {
    t.refCount--,
      t.refCount === 0 &&
        b0(E0, function () {
          t.controller.abort();
        });
  }
  var Ja = null,
    Ji = 0,
    na = 0,
    ia = null;
  function T0(t, e) {
    if (Ja === null) {
      var l = (Ja = []);
      (Ji = 0),
        (na = kc()),
        (ia = {
          status: "pending",
          value: void 0,
          then: function (a) {
            l.push(a);
          },
        });
    }
    return Ji++, e.then(Xr, Xr), e;
  }
  function Xr() {
    if (--Ji === 0 && Ja !== null) {
      ia !== null && (ia.status = "fulfilled");
      var t = Ja;
      (Ja = null), (na = 0), (ia = null);
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function A0(t, e) {
    var l = [],
      a = {
        status: "pending",
        value: null,
        reason: null,
        then: function (u) {
          l.push(u);
        },
      };
    return (
      t.then(
        function () {
          (a.status = "fulfilled"), (a.value = e);
          for (var u = 0; u < l.length; u++) (0, l[u])(e);
        },
        function (u) {
          for (a.status = "rejected", a.reason = u, u = 0; u < l.length; u++)
            (0, l[u])(void 0);
        },
      ),
      a
    );
  }
  var Qr = _.S;
  _.S = function (t, e) {
    typeof e == "object" &&
      e !== null &&
      typeof e.then == "function" &&
      T0(t, e),
      Qr !== null && Qr(t, e);
  };
  var Cl = N(null);
  function $i() {
    var t = Cl.current;
    return t !== null ? t : St.pooledCache;
  }
  function un(t, e) {
    e === null ? Y(Cl, Cl.current) : Y(Cl, e.pool);
  }
  function Zr() {
    var t = $i();
    return t === null ? null : { parent: Ht._currentValue, pool: t };
  }
  var $a = Error(r(460)),
    wr = Error(r(474)),
    nn = Error(r(542)),
    ki = { then: function () {} };
  function Vr(t) {
    return (t = t.status), t === "fulfilled" || t === "rejected";
  }
  function cn() {}
  function Kr(t, e, l) {
    switch (
      ((l = t[l]),
      l === void 0 ? t.push(e) : l !== e && (e.then(cn, cn), (e = l)),
      e.status)
    ) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw ((t = e.reason), $r(t), t);
      default:
        if (typeof e.status == "string") e.then(cn, cn);
        else {
          if (((t = St), t !== null && 100 < t.shellSuspendCounter))
            throw Error(r(482));
          (t = e),
            (t.status = "pending"),
            t.then(
              function (a) {
                if (e.status === "pending") {
                  var u = e;
                  (u.status = "fulfilled"), (u.value = a);
                }
              },
              function (a) {
                if (e.status === "pending") {
                  var u = e;
                  (u.status = "rejected"), (u.reason = a);
                }
              },
            );
        }
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw ((t = e.reason), $r(t), t);
        }
        throw ((ka = e), $a);
    }
  }
  var ka = null;
  function Jr() {
    if (ka === null) throw Error(r(459));
    var t = ka;
    return (ka = null), t;
  }
  function $r(t) {
    if (t === $a || t === nn) throw Error(r(483));
  }
  var tl = !1;
  function Wi(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Fi(t, e) {
    (t = t.updateQueue),
      e.updateQueue === t &&
        (e.updateQueue = {
          baseState: t.baseState,
          firstBaseUpdate: t.firstBaseUpdate,
          lastBaseUpdate: t.lastBaseUpdate,
          shared: t.shared,
          callbacks: null,
        });
  }
  function el(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function ll(t, e, l) {
    var a = t.updateQueue;
    if (a === null) return null;
    if (((a = a.shared), (ot & 2) !== 0)) {
      var u = a.pending;
      return (
        u === null ? (e.next = e) : ((e.next = u.next), (u.next = e)),
        (a.pending = e),
        (e = Pu(t)),
        Cr(t, null, l),
        e
      );
    }
    return Fu(t, a, e, l), Pu(t);
  }
  function Wa(t, e, l) {
    if (
      ((e = e.updateQueue), e !== null && ((e = e.shared), (l & 4194048) !== 0))
    ) {
      var a = e.lanes;
      (a &= t.pendingLanes), (l |= a), (e.lanes = l), Xf(t, l);
    }
  }
  function Pi(t, e) {
    var l = t.updateQueue,
      a = t.alternate;
    if (a !== null && ((a = a.updateQueue), l === a)) {
      var u = null,
        n = null;
      if (((l = l.firstBaseUpdate), l !== null)) {
        do {
          var i = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null,
          };
          n === null ? (u = n = i) : (n = n.next = i), (l = l.next);
        } while (l !== null);
        n === null ? (u = n = e) : (n = n.next = e);
      } else u = n = e;
      (l = {
        baseState: a.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: n,
        shared: a.shared,
        callbacks: a.callbacks,
      }),
        (t.updateQueue = l);
      return;
    }
    (t = l.lastBaseUpdate),
      t === null ? (l.firstBaseUpdate = e) : (t.next = e),
      (l.lastBaseUpdate = e);
  }
  var Ii = !1;
  function Fa() {
    if (Ii) {
      var t = ia;
      if (t !== null) throw t;
    }
  }
  function Pa(t, e, l, a) {
    Ii = !1;
    var u = t.updateQueue;
    tl = !1;
    var n = u.firstBaseUpdate,
      i = u.lastBaseUpdate,
      f = u.shared.pending;
    if (f !== null) {
      u.shared.pending = null;
      var d = f,
        E = d.next;
      (d.next = null), i === null ? (n = E) : (i.next = E), (i = d);
      var O = t.alternate;
      O !== null &&
        ((O = O.updateQueue),
        (f = O.lastBaseUpdate),
        f !== i &&
          (f === null ? (O.firstBaseUpdate = E) : (f.next = E),
          (O.lastBaseUpdate = d)));
    }
    if (n !== null) {
      var U = u.baseState;
      (i = 0), (O = E = d = null), (f = n);
      do {
        var T = f.lane & -536870913,
          A = T !== f.lane;
        if (A ? (nt & T) === T : (a & T) === T) {
          T !== 0 && T === na && (Ii = !0),
            O !== null &&
              (O = O.next =
                {
                  lane: 0,
                  tag: f.tag,
                  payload: f.payload,
                  callback: null,
                  next: null,
                });
          t: {
            var W = t,
              J = f;
            T = e;
            var mt = l;
            switch (J.tag) {
              case 1:
                if (((W = J.payload), typeof W == "function")) {
                  U = W.call(mt, U, T);
                  break t;
                }
                U = W;
                break t;
              case 3:
                W.flags = (W.flags & -65537) | 128;
              case 0:
                if (
                  ((W = J.payload),
                  (T = typeof W == "function" ? W.call(mt, U, T) : W),
                  T == null)
                )
                  break t;
                U = R({}, U, T);
                break t;
              case 2:
                tl = !0;
            }
          }
          (T = f.callback),
            T !== null &&
              ((t.flags |= 64),
              A && (t.flags |= 8192),
              (A = u.callbacks),
              A === null ? (u.callbacks = [T]) : A.push(T));
        } else
          (A = {
            lane: T,
            tag: f.tag,
            payload: f.payload,
            callback: f.callback,
            next: null,
          }),
            O === null ? ((E = O = A), (d = U)) : (O = O.next = A),
            (i |= T);
        if (((f = f.next), f === null)) {
          if (((f = u.shared.pending), f === null)) break;
          (A = f),
            (f = A.next),
            (A.next = null),
            (u.lastBaseUpdate = A),
            (u.shared.pending = null);
        }
      } while (!0);
      O === null && (d = U),
        (u.baseState = d),
        (u.firstBaseUpdate = E),
        (u.lastBaseUpdate = O),
        n === null && (u.shared.lanes = 0),
        (ol |= i),
        (t.lanes = i),
        (t.memoizedState = U);
    }
  }
  function kr(t, e) {
    if (typeof t != "function") throw Error(r(191, t));
    t.call(e);
  }
  function Wr(t, e) {
    var l = t.callbacks;
    if (l !== null)
      for (t.callbacks = null, t = 0; t < l.length; t++) kr(l[t], e);
  }
  var ca = N(null),
    fn = N(0);
  function Fr(t, e) {
    (t = we), Y(fn, t), Y(ca, e), (we = t | e.baseLanes);
  }
  function tc() {
    Y(fn, we), Y(ca, ca.current);
  }
  function ec() {
    (we = fn.current), Q(ca), Q(fn);
  }
  var al = 0,
    et = null,
    dt = null,
    Ut = null,
    rn = !1,
    fa = !1,
    Bl = !1,
    on = 0,
    Ia = 0,
    ra = null,
    R0 = 0;
  function _t() {
    throw Error(r(321));
  }
  function lc(t, e) {
    if (e === null) return !1;
    for (var l = 0; l < e.length && l < t.length; l++)
      if (!ae(t[l], e[l])) return !1;
    return !0;
  }
  function ac(t, e, l, a, u, n) {
    return (
      (al = n),
      (et = e),
      (e.memoizedState = null),
      (e.updateQueue = null),
      (e.lanes = 0),
      (_.H = t === null || t.memoizedState === null ? Bo : qo),
      (Bl = !1),
      (n = l(a, u)),
      (Bl = !1),
      fa && (n = Ir(e, l, a, u)),
      Pr(t),
      n
    );
  }
  function Pr(t) {
    _.H = vn;
    var e = dt !== null && dt.next !== null;
    if (((al = 0), (Ut = dt = et = null), (rn = !1), (Ia = 0), (ra = null), e))
      throw Error(r(300));
    t === null ||
      qt ||
      ((t = t.dependencies), t !== null && ln(t) && (qt = !0));
  }
  function Ir(t, e, l, a) {
    et = t;
    var u = 0;
    do {
      if ((fa && (ra = null), (Ia = 0), (fa = !1), 25 <= u))
        throw Error(r(301));
      if (((u += 1), (Ut = dt = null), t.updateQueue != null)) {
        var n = t.updateQueue;
        (n.lastEffect = null),
          (n.events = null),
          (n.stores = null),
          n.memoCache != null && (n.memoCache.index = 0);
      }
      (_.H = U0), (n = e(l, a));
    } while (fa);
    return n;
  }
  function z0() {
    var t = _.H,
      e = t.useState()[0];
    return (
      (e = typeof e.then == "function" ? tu(e) : e),
      (t = t.useState()[0]),
      (dt !== null ? dt.memoizedState : null) !== t && (et.flags |= 1024),
      e
    );
  }
  function uc() {
    var t = on !== 0;
    return (on = 0), t;
  }
  function nc(t, e, l) {
    (e.updateQueue = t.updateQueue), (e.flags &= -2053), (t.lanes &= ~l);
  }
  function ic(t) {
    if (rn) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), (t = t.next);
      }
      rn = !1;
    }
    (al = 0), (Ut = dt = et = null), (fa = !1), (Ia = on = 0), (ra = null);
  }
  function Ft() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return Ut === null ? (et.memoizedState = Ut = t) : (Ut = Ut.next = t), Ut;
  }
  function Nt() {
    if (dt === null) {
      var t = et.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = dt.next;
    var e = Ut === null ? et.memoizedState : Ut.next;
    if (e !== null) (Ut = e), (dt = t);
    else {
      if (t === null)
        throw et.alternate === null ? Error(r(467)) : Error(r(310));
      (dt = t),
        (t = {
          memoizedState: dt.memoizedState,
          baseState: dt.baseState,
          baseQueue: dt.baseQueue,
          queue: dt.queue,
          next: null,
        }),
        Ut === null ? (et.memoizedState = Ut = t) : (Ut = Ut.next = t);
    }
    return Ut;
  }
  function cc() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function tu(t) {
    var e = Ia;
    return (
      (Ia += 1),
      ra === null && (ra = []),
      (t = Kr(ra, t, e)),
      (e = et),
      (Ut === null ? e.memoizedState : Ut.next) === null &&
        ((e = e.alternate),
        (_.H = e === null || e.memoizedState === null ? Bo : qo)),
      t
    );
  }
  function sn(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return tu(t);
      if (t.$$typeof === X) return Vt(t);
    }
    throw Error(r(438, String(t)));
  }
  function fc(t) {
    var e = null,
      l = et.updateQueue;
    if ((l !== null && (e = l.memoCache), e == null)) {
      var a = et.alternate;
      a !== null &&
        ((a = a.updateQueue),
        a !== null &&
          ((a = a.memoCache),
          a != null &&
            (e = {
              data: a.data.map(function (u) {
                return u.slice();
              }),
              index: 0,
            })));
    }
    if (
      (e == null && (e = { data: [], index: 0 }),
      l === null && ((l = cc()), (et.updateQueue = l)),
      (l.memoCache = e),
      (l = e.data[e.index]),
      l === void 0)
    )
      for (l = e.data[e.index] = Array(t), a = 0; a < t; a++) l[a] = Jt;
    return e.index++, l;
  }
  function Le(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function dn(t) {
    var e = Nt();
    return rc(e, dt, t);
  }
  function rc(t, e, l) {
    var a = t.queue;
    if (a === null) throw Error(r(311));
    a.lastRenderedReducer = l;
    var u = t.baseQueue,
      n = a.pending;
    if (n !== null) {
      if (u !== null) {
        var i = u.next;
        (u.next = n.next), (n.next = i);
      }
      (e.baseQueue = u = n), (a.pending = null);
    }
    if (((n = t.baseState), u === null)) t.memoizedState = n;
    else {
      e = u.next;
      var f = (i = null),
        d = null,
        E = e,
        O = !1;
      do {
        var U = E.lane & -536870913;
        if (U !== E.lane ? (nt & U) === U : (al & U) === U) {
          var T = E.revertLane;
          if (T === 0)
            d !== null &&
              (d = d.next =
                {
                  lane: 0,
                  revertLane: 0,
                  action: E.action,
                  hasEagerState: E.hasEagerState,
                  eagerState: E.eagerState,
                  next: null,
                }),
              U === na && (O = !0);
          else if ((al & T) === T) {
            (E = E.next), T === na && (O = !0);
            continue;
          } else
            (U = {
              lane: 0,
              revertLane: E.revertLane,
              action: E.action,
              hasEagerState: E.hasEagerState,
              eagerState: E.eagerState,
              next: null,
            }),
              d === null ? ((f = d = U), (i = n)) : (d = d.next = U),
              (et.lanes |= T),
              (ol |= T);
          (U = E.action),
            Bl && l(n, U),
            (n = E.hasEagerState ? E.eagerState : l(n, U));
        } else
          (T = {
            lane: U,
            revertLane: E.revertLane,
            action: E.action,
            hasEagerState: E.hasEagerState,
            eagerState: E.eagerState,
            next: null,
          }),
            d === null ? ((f = d = T), (i = n)) : (d = d.next = T),
            (et.lanes |= U),
            (ol |= U);
        E = E.next;
      } while (E !== null && E !== e);
      if (
        (d === null ? (i = n) : (d.next = f),
        !ae(n, t.memoizedState) && ((qt = !0), O && ((l = ia), l !== null)))
      )
        throw l;
      (t.memoizedState = n),
        (t.baseState = i),
        (t.baseQueue = d),
        (a.lastRenderedState = n);
    }
    return u === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
  }
  function oc(t) {
    var e = Nt(),
      l = e.queue;
    if (l === null) throw Error(r(311));
    l.lastRenderedReducer = t;
    var a = l.dispatch,
      u = l.pending,
      n = e.memoizedState;
    if (u !== null) {
      l.pending = null;
      var i = (u = u.next);
      do (n = t(n, i.action)), (i = i.next);
      while (i !== u);
      ae(n, e.memoizedState) || (qt = !0),
        (e.memoizedState = n),
        e.baseQueue === null && (e.baseState = n),
        (l.lastRenderedState = n);
    }
    return [n, a];
  }
  function to(t, e, l) {
    var a = et,
      u = Nt(),
      n = rt;
    if (n) {
      if (l === void 0) throw Error(r(407));
      l = l();
    } else l = e();
    var i = !ae((dt || u).memoizedState, l);
    i && ((u.memoizedState = l), (qt = !0)), (u = u.queue);
    var f = ao.bind(null, a, u, t);
    if (
      (eu(2048, 8, f, [t]),
      u.getSnapshot !== e || i || (Ut !== null && Ut.memoizedState.tag & 1))
    ) {
      if (
        ((a.flags |= 2048),
        oa(9, hn(), lo.bind(null, a, u, l, e), null),
        St === null)
      )
        throw Error(r(349));
      n || (al & 124) !== 0 || eo(a, e, l);
    }
    return l;
  }
  function eo(t, e, l) {
    (t.flags |= 16384),
      (t = { getSnapshot: e, value: l }),
      (e = et.updateQueue),
      e === null
        ? ((e = cc()), (et.updateQueue = e), (e.stores = [t]))
        : ((l = e.stores), l === null ? (e.stores = [t]) : l.push(t));
  }
  function lo(t, e, l, a) {
    (e.value = l), (e.getSnapshot = a), uo(e) && no(t);
  }
  function ao(t, e, l) {
    return l(function () {
      uo(e) && no(t);
    });
  }
  function uo(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var l = e();
      return !ae(t, l);
    } catch {
      return !0;
    }
  }
  function no(t) {
    var e = ea(t, 2);
    e !== null && re(e, t, 2);
  }
  function sc(t) {
    var e = Ft();
    if (typeof t == "function") {
      var l = t;
      if (((t = l()), Bl)) {
        We(!0);
        try {
          l();
        } finally {
          We(!1);
        }
      }
    }
    return (
      (e.memoizedState = e.baseState = t),
      (e.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Le,
        lastRenderedState: t,
      }),
      e
    );
  }
  function io(t, e, l, a) {
    return (t.baseState = l), rc(t, dt, typeof a == "function" ? a : Le);
  }
  function O0(t, e, l, a, u) {
    if (yn(t)) throw Error(r(485));
    if (((t = e.action), t !== null)) {
      var n = {
        payload: u,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (i) {
          n.listeners.push(i);
        },
      };
      _.T !== null ? l(!0) : (n.isTransition = !1),
        a(n),
        (l = e.pending),
        l === null
          ? ((n.next = e.pending = n), co(e, n))
          : ((n.next = l.next), (e.pending = l.next = n));
    }
  }
  function co(t, e) {
    var l = e.action,
      a = e.payload,
      u = t.state;
    if (e.isTransition) {
      var n = _.T,
        i = {};
      _.T = i;
      try {
        var f = l(u, a),
          d = _.S;
        d !== null && d(i, f), fo(t, e, f);
      } catch (E) {
        dc(t, e, E);
      } finally {
        _.T = n;
      }
    } else
      try {
        (n = l(u, a)), fo(t, e, n);
      } catch (E) {
        dc(t, e, E);
      }
  }
  function fo(t, e, l) {
    l !== null && typeof l == "object" && typeof l.then == "function"
      ? l.then(
          function (a) {
            ro(t, e, a);
          },
          function (a) {
            return dc(t, e, a);
          },
        )
      : ro(t, e, l);
  }
  function ro(t, e, l) {
    (e.status = "fulfilled"),
      (e.value = l),
      oo(e),
      (t.state = l),
      (e = t.pending),
      e !== null &&
        ((l = e.next),
        l === e ? (t.pending = null) : ((l = l.next), (e.next = l), co(t, l)));
  }
  function dc(t, e, l) {
    var a = t.pending;
    if (((t.pending = null), a !== null)) {
      a = a.next;
      do (e.status = "rejected"), (e.reason = l), oo(e), (e = e.next);
      while (e !== a);
    }
    t.action = null;
  }
  function oo(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function so(t, e) {
    return e;
  }
  function ho(t, e) {
    if (rt) {
      var l = St.formState;
      if (l !== null) {
        t: {
          var a = et;
          if (rt) {
            if (zt) {
              e: {
                for (var u = zt, n = Re; u.nodeType !== 8; ) {
                  if (!n) {
                    u = null;
                    break e;
                  }
                  if (((u = Te(u.nextSibling)), u === null)) {
                    u = null;
                    break e;
                  }
                }
                (n = u.data), (u = n === "F!" || n === "F" ? u : null);
              }
              if (u) {
                (zt = Te(u.nextSibling)), (a = u.data === "F!");
                break t;
              }
            }
            Ul(a);
          }
          a = !1;
        }
        a && (e = l[0]);
      }
    }
    return (
      (l = Ft()),
      (l.memoizedState = l.baseState = e),
      (a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: so,
        lastRenderedState: e,
      }),
      (l.queue = a),
      (l = No.bind(null, et, a)),
      (a.dispatch = l),
      (a = sc(!1)),
      (n = gc.bind(null, et, !1, a.queue)),
      (a = Ft()),
      (u = { state: e, dispatch: null, action: t, pending: null }),
      (a.queue = u),
      (l = O0.bind(null, et, u, n, l)),
      (u.dispatch = l),
      (a.memoizedState = t),
      [e, l, !1]
    );
  }
  function mo(t) {
    var e = Nt();
    return yo(e, dt, t);
  }
  function yo(t, e, l) {
    if (
      ((e = rc(t, e, so)[0]),
      (t = dn(Le)[0]),
      typeof e == "object" && e !== null && typeof e.then == "function")
    )
      try {
        var a = tu(e);
      } catch (i) {
        throw i === $a ? nn : i;
      }
    else a = e;
    e = Nt();
    var u = e.queue,
      n = u.dispatch;
    return (
      l !== e.memoizedState &&
        ((et.flags |= 2048), oa(9, hn(), M0.bind(null, u, l), null)),
      [a, n, t]
    );
  }
  function M0(t, e) {
    t.action = e;
  }
  function vo(t) {
    var e = Nt(),
      l = dt;
    if (l !== null) return yo(e, l, t);
    Nt(), (e = e.memoizedState), (l = Nt());
    var a = l.queue.dispatch;
    return (l.memoizedState = t), [e, a, !1];
  }
  function oa(t, e, l, a) {
    return (
      (t = { tag: t, create: l, deps: a, inst: e, next: null }),
      (e = et.updateQueue),
      e === null && ((e = cc()), (et.updateQueue = e)),
      (l = e.lastEffect),
      l === null
        ? (e.lastEffect = t.next = t)
        : ((a = l.next), (l.next = t), (t.next = a), (e.lastEffect = t)),
      t
    );
  }
  function hn() {
    return { destroy: void 0, resource: void 0 };
  }
  function go() {
    return Nt().memoizedState;
  }
  function mn(t, e, l, a) {
    var u = Ft();
    (a = a === void 0 ? null : a),
      (et.flags |= t),
      (u.memoizedState = oa(1 | e, hn(), l, a));
  }
  function eu(t, e, l, a) {
    var u = Nt();
    a = a === void 0 ? null : a;
    var n = u.memoizedState.inst;
    dt !== null && a !== null && lc(a, dt.memoizedState.deps)
      ? (u.memoizedState = oa(e, n, l, a))
      : ((et.flags |= t), (u.memoizedState = oa(1 | e, n, l, a)));
  }
  function So(t, e) {
    mn(8390656, 8, t, e);
  }
  function po(t, e) {
    eu(2048, 8, t, e);
  }
  function bo(t, e) {
    return eu(4, 2, t, e);
  }
  function Eo(t, e) {
    return eu(4, 4, t, e);
  }
  function To(t, e) {
    if (typeof e == "function") {
      t = t();
      var l = e(t);
      return function () {
        typeof l == "function" ? l() : e(null);
      };
    }
    if (e != null)
      return (
        (t = t()),
        (e.current = t),
        function () {
          e.current = null;
        }
      );
  }
  function Ao(t, e, l) {
    (l = l != null ? l.concat([t]) : null), eu(4, 4, To.bind(null, e, t), l);
  }
  function hc() {}
  function Ro(t, e) {
    var l = Nt();
    e = e === void 0 ? null : e;
    var a = l.memoizedState;
    return e !== null && lc(e, a[1]) ? a[0] : ((l.memoizedState = [t, e]), t);
  }
  function zo(t, e) {
    var l = Nt();
    e = e === void 0 ? null : e;
    var a = l.memoizedState;
    if (e !== null && lc(e, a[1])) return a[0];
    if (((a = t()), Bl)) {
      We(!0);
      try {
        t();
      } finally {
        We(!1);
      }
    }
    return (l.memoizedState = [a, e]), a;
  }
  function mc(t, e, l) {
    return l === void 0 || (al & 1073741824) !== 0
      ? (t.memoizedState = e)
      : ((t.memoizedState = l), (t = _s()), (et.lanes |= t), (ol |= t), l);
  }
  function Oo(t, e, l, a) {
    return ae(l, e)
      ? l
      : ca.current !== null
        ? ((t = mc(t, l, a)), ae(t, e) || (qt = !0), t)
        : (al & 42) === 0
          ? ((qt = !0), (t.memoizedState = l))
          : ((t = _s()), (et.lanes |= t), (ol |= t), e);
  }
  function Mo(t, e, l, a, u) {
    var n = j.p;
    j.p = n !== 0 && 8 > n ? n : 8;
    var i = _.T,
      f = {};
    (_.T = f), gc(t, !1, e, l);
    try {
      var d = u(),
        E = _.S;
      if (
        (E !== null && E(f, d),
        d !== null && typeof d == "object" && typeof d.then == "function")
      ) {
        var O = A0(d, a);
        lu(t, e, O, fe(t));
      } else lu(t, e, a, fe(t));
    } catch (U) {
      lu(t, e, { then: function () {}, status: "rejected", reason: U }, fe());
    } finally {
      (j.p = n), (_.T = i);
    }
  }
  function _0() {}
  function yc(t, e, l, a) {
    if (t.tag !== 5) throw Error(r(476));
    var u = _o(t).queue;
    Mo(
      t,
      u,
      e,
      k,
      l === null
        ? _0
        : function () {
            return Do(t), l(a);
          },
    );
  }
  function _o(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: k,
      baseState: k,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Le,
        lastRenderedState: k,
      },
      next: null,
    };
    var l = {};
    return (
      (e.next = {
        memoizedState: l,
        baseState: l,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Le,
          lastRenderedState: l,
        },
        next: null,
      }),
      (t.memoizedState = e),
      (t = t.alternate),
      t !== null && (t.memoizedState = e),
      e
    );
  }
  function Do(t) {
    var e = _o(t).next.queue;
    lu(t, e, {}, fe());
  }
  function vc() {
    return Vt(bu);
  }
  function xo() {
    return Nt().memoizedState;
  }
  function Uo() {
    return Nt().memoizedState;
  }
  function D0(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var l = fe();
          t = el(l);
          var a = ll(e, t, l);
          a !== null && (re(a, e, l), Wa(a, e, l)),
            (e = { cache: Ki() }),
            (t.payload = e);
          return;
      }
      e = e.return;
    }
  }
  function x0(t, e, l) {
    var a = fe();
    (l = {
      lane: a,
      revertLane: 0,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      yn(t)
        ? Ho(e, l)
        : ((l = qi(t, e, l, a)), l !== null && (re(l, t, a), Co(l, e, a)));
  }
  function No(t, e, l) {
    var a = fe();
    lu(t, e, l, a);
  }
  function lu(t, e, l, a) {
    var u = {
      lane: a,
      revertLane: 0,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (yn(t)) Ho(e, u);
    else {
      var n = t.alternate;
      if (
        t.lanes === 0 &&
        (n === null || n.lanes === 0) &&
        ((n = e.lastRenderedReducer), n !== null)
      )
        try {
          var i = e.lastRenderedState,
            f = n(i, l);
          if (((u.hasEagerState = !0), (u.eagerState = f), ae(f, i)))
            return Fu(t, e, u, 0), St === null && Wu(), !1;
        } catch {
        } finally {
        }
      if (((l = qi(t, e, u, a)), l !== null))
        return re(l, t, a), Co(l, e, a), !0;
    }
    return !1;
  }
  function gc(t, e, l, a) {
    if (
      ((a = {
        lane: 2,
        revertLane: kc(),
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      yn(t))
    ) {
      if (e) throw Error(r(479));
    } else (e = qi(t, l, a, 2)), e !== null && re(e, t, 2);
  }
  function yn(t) {
    var e = t.alternate;
    return t === et || (e !== null && e === et);
  }
  function Ho(t, e) {
    fa = rn = !0;
    var l = t.pending;
    l === null ? (e.next = e) : ((e.next = l.next), (l.next = e)),
      (t.pending = e);
  }
  function Co(t, e, l) {
    if ((l & 4194048) !== 0) {
      var a = e.lanes;
      (a &= t.pendingLanes), (l |= a), (e.lanes = l), Xf(t, l);
    }
  }
  var vn = {
      readContext: Vt,
      use: sn,
      useCallback: _t,
      useContext: _t,
      useEffect: _t,
      useImperativeHandle: _t,
      useLayoutEffect: _t,
      useInsertionEffect: _t,
      useMemo: _t,
      useReducer: _t,
      useRef: _t,
      useState: _t,
      useDebugValue: _t,
      useDeferredValue: _t,
      useTransition: _t,
      useSyncExternalStore: _t,
      useId: _t,
      useHostTransitionStatus: _t,
      useFormState: _t,
      useActionState: _t,
      useOptimistic: _t,
      useMemoCache: _t,
      useCacheRefresh: _t,
    },
    Bo = {
      readContext: Vt,
      use: sn,
      useCallback: function (t, e) {
        return (Ft().memoizedState = [t, e === void 0 ? null : e]), t;
      },
      useContext: Vt,
      useEffect: So,
      useImperativeHandle: function (t, e, l) {
        (l = l != null ? l.concat([t]) : null),
          mn(4194308, 4, To.bind(null, e, t), l);
      },
      useLayoutEffect: function (t, e) {
        return mn(4194308, 4, t, e);
      },
      useInsertionEffect: function (t, e) {
        mn(4, 2, t, e);
      },
      useMemo: function (t, e) {
        var l = Ft();
        e = e === void 0 ? null : e;
        var a = t();
        if (Bl) {
          We(!0);
          try {
            t();
          } finally {
            We(!1);
          }
        }
        return (l.memoizedState = [a, e]), a;
      },
      useReducer: function (t, e, l) {
        var a = Ft();
        if (l !== void 0) {
          var u = l(e);
          if (Bl) {
            We(!0);
            try {
              l(e);
            } finally {
              We(!1);
            }
          }
        } else u = e;
        return (
          (a.memoizedState = a.baseState = u),
          (t = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: t,
            lastRenderedState: u,
          }),
          (a.queue = t),
          (t = t.dispatch = x0.bind(null, et, t)),
          [a.memoizedState, t]
        );
      },
      useRef: function (t) {
        var e = Ft();
        return (t = { current: t }), (e.memoizedState = t);
      },
      useState: function (t) {
        t = sc(t);
        var e = t.queue,
          l = No.bind(null, et, e);
        return (e.dispatch = l), [t.memoizedState, l];
      },
      useDebugValue: hc,
      useDeferredValue: function (t, e) {
        var l = Ft();
        return mc(l, t, e);
      },
      useTransition: function () {
        var t = sc(!1);
        return (
          (t = Mo.bind(null, et, t.queue, !0, !1)),
          (Ft().memoizedState = t),
          [!1, t]
        );
      },
      useSyncExternalStore: function (t, e, l) {
        var a = et,
          u = Ft();
        if (rt) {
          if (l === void 0) throw Error(r(407));
          l = l();
        } else {
          if (((l = e()), St === null)) throw Error(r(349));
          (nt & 124) !== 0 || eo(a, e, l);
        }
        u.memoizedState = l;
        var n = { value: l, getSnapshot: e };
        return (
          (u.queue = n),
          So(ao.bind(null, a, n, t), [t]),
          (a.flags |= 2048),
          oa(9, hn(), lo.bind(null, a, n, l, e), null),
          l
        );
      },
      useId: function () {
        var t = Ft(),
          e = St.identifierPrefix;
        if (rt) {
          var l = Be,
            a = Ce;
          (l = (a & ~(1 << (32 - le(a) - 1))).toString(32) + l),
            (e = "«" + e + "R" + l),
            (l = on++),
            0 < l && (e += "H" + l.toString(32)),
            (e += "»");
        } else (l = R0++), (e = "«" + e + "r" + l.toString(32) + "»");
        return (t.memoizedState = e);
      },
      useHostTransitionStatus: vc,
      useFormState: ho,
      useActionState: ho,
      useOptimistic: function (t) {
        var e = Ft();
        e.memoizedState = e.baseState = t;
        var l = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (e.queue = l),
          (e = gc.bind(null, et, !0, l)),
          (l.dispatch = e),
          [t, e]
        );
      },
      useMemoCache: fc,
      useCacheRefresh: function () {
        return (Ft().memoizedState = D0.bind(null, et));
      },
    },
    qo = {
      readContext: Vt,
      use: sn,
      useCallback: Ro,
      useContext: Vt,
      useEffect: po,
      useImperativeHandle: Ao,
      useInsertionEffect: bo,
      useLayoutEffect: Eo,
      useMemo: zo,
      useReducer: dn,
      useRef: go,
      useState: function () {
        return dn(Le);
      },
      useDebugValue: hc,
      useDeferredValue: function (t, e) {
        var l = Nt();
        return Oo(l, dt.memoizedState, t, e);
      },
      useTransition: function () {
        var t = dn(Le)[0],
          e = Nt().memoizedState;
        return [typeof t == "boolean" ? t : tu(t), e];
      },
      useSyncExternalStore: to,
      useId: xo,
      useHostTransitionStatus: vc,
      useFormState: mo,
      useActionState: mo,
      useOptimistic: function (t, e) {
        var l = Nt();
        return io(l, dt, t, e);
      },
      useMemoCache: fc,
      useCacheRefresh: Uo,
    },
    U0 = {
      readContext: Vt,
      use: sn,
      useCallback: Ro,
      useContext: Vt,
      useEffect: po,
      useImperativeHandle: Ao,
      useInsertionEffect: bo,
      useLayoutEffect: Eo,
      useMemo: zo,
      useReducer: oc,
      useRef: go,
      useState: function () {
        return oc(Le);
      },
      useDebugValue: hc,
      useDeferredValue: function (t, e) {
        var l = Nt();
        return dt === null ? mc(l, t, e) : Oo(l, dt.memoizedState, t, e);
      },
      useTransition: function () {
        var t = oc(Le)[0],
          e = Nt().memoizedState;
        return [typeof t == "boolean" ? t : tu(t), e];
      },
      useSyncExternalStore: to,
      useId: xo,
      useHostTransitionStatus: vc,
      useFormState: vo,
      useActionState: vo,
      useOptimistic: function (t, e) {
        var l = Nt();
        return dt !== null
          ? io(l, dt, t, e)
          : ((l.baseState = t), [t, l.queue.dispatch]);
      },
      useMemoCache: fc,
      useCacheRefresh: Uo,
    },
    sa = null,
    au = 0;
  function gn(t) {
    var e = au;
    return (au += 1), sa === null && (sa = []), Kr(sa, t, e);
  }
  function uu(t, e) {
    (e = e.props.ref), (t.ref = e !== void 0 ? e : null);
  }
  function Sn(t, e) {
    throw e.$$typeof === B
      ? Error(r(525))
      : ((t = Object.prototype.toString.call(e)),
        Error(
          r(
            31,
            t === "[object Object]"
              ? "object with keys {" + Object.keys(e).join(", ") + "}"
              : t,
          ),
        ));
  }
  function Yo(t) {
    var e = t._init;
    return e(t._payload);
  }
  function Lo(t) {
    function e(S, v) {
      if (t) {
        var b = S.deletions;
        b === null ? ((S.deletions = [v]), (S.flags |= 16)) : b.push(v);
      }
    }
    function l(S, v) {
      if (!t) return null;
      for (; v !== null; ) e(S, v), (v = v.sibling);
      return null;
    }
    function a(S) {
      for (var v = new Map(); S !== null; )
        S.key !== null ? v.set(S.key, S) : v.set(S.index, S), (S = S.sibling);
      return v;
    }
    function u(S, v) {
      return (S = He(S, v)), (S.index = 0), (S.sibling = null), S;
    }
    function n(S, v, b) {
      return (
        (S.index = b),
        t
          ? ((b = S.alternate),
            b !== null
              ? ((b = b.index), b < v ? ((S.flags |= 67108866), v) : b)
              : ((S.flags |= 67108866), v))
          : ((S.flags |= 1048576), v)
      );
    }
    function i(S) {
      return t && S.alternate === null && (S.flags |= 67108866), S;
    }
    function f(S, v, b, D) {
      return v === null || v.tag !== 6
        ? ((v = Li(b, S.mode, D)), (v.return = S), v)
        : ((v = u(v, b)), (v.return = S), v);
    }
    function d(S, v, b, D) {
      var Z = b.type;
      return Z === C
        ? O(S, v, b.props.children, D, b.key)
        : v !== null &&
            (v.elementType === Z ||
              (typeof Z == "object" &&
                Z !== null &&
                Z.$$typeof === Mt &&
                Yo(Z) === v.type))
          ? ((v = u(v, b.props)), uu(v, b), (v.return = S), v)
          : ((v = Iu(b.type, b.key, b.props, null, S.mode, D)),
            uu(v, b),
            (v.return = S),
            v);
    }
    function E(S, v, b, D) {
      return v === null ||
        v.tag !== 4 ||
        v.stateNode.containerInfo !== b.containerInfo ||
        v.stateNode.implementation !== b.implementation
        ? ((v = ji(b, S.mode, D)), (v.return = S), v)
        : ((v = u(v, b.children || [])), (v.return = S), v);
    }
    function O(S, v, b, D, Z) {
      return v === null || v.tag !== 7
        ? ((v = Ml(b, S.mode, D, Z)), (v.return = S), v)
        : ((v = u(v, b)), (v.return = S), v);
    }
    function U(S, v, b) {
      if (
        (typeof v == "string" && v !== "") ||
        typeof v == "number" ||
        typeof v == "bigint"
      )
        return (v = Li("" + v, S.mode, b)), (v.return = S), v;
      if (typeof v == "object" && v !== null) {
        switch (v.$$typeof) {
          case H:
            return (
              (b = Iu(v.type, v.key, v.props, null, S.mode, b)),
              uu(b, v),
              (b.return = S),
              b
            );
          case L:
            return (v = ji(v, S.mode, b)), (v.return = S), v;
          case Mt:
            var D = v._init;
            return (v = D(v._payload)), U(S, v, b);
        }
        if (Zt(v) || Qt(v))
          return (v = Ml(v, S.mode, b, null)), (v.return = S), v;
        if (typeof v.then == "function") return U(S, gn(v), b);
        if (v.$$typeof === X) return U(S, an(S, v), b);
        Sn(S, v);
      }
      return null;
    }
    function T(S, v, b, D) {
      var Z = v !== null ? v.key : null;
      if (
        (typeof b == "string" && b !== "") ||
        typeof b == "number" ||
        typeof b == "bigint"
      )
        return Z !== null ? null : f(S, v, "" + b, D);
      if (typeof b == "object" && b !== null) {
        switch (b.$$typeof) {
          case H:
            return b.key === Z ? d(S, v, b, D) : null;
          case L:
            return b.key === Z ? E(S, v, b, D) : null;
          case Mt:
            return (Z = b._init), (b = Z(b._payload)), T(S, v, b, D);
        }
        if (Zt(b) || Qt(b)) return Z !== null ? null : O(S, v, b, D, null);
        if (typeof b.then == "function") return T(S, v, gn(b), D);
        if (b.$$typeof === X) return T(S, v, an(S, b), D);
        Sn(S, b);
      }
      return null;
    }
    function A(S, v, b, D, Z) {
      if (
        (typeof D == "string" && D !== "") ||
        typeof D == "number" ||
        typeof D == "bigint"
      )
        return (S = S.get(b) || null), f(v, S, "" + D, Z);
      if (typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case H:
            return (
              (S = S.get(D.key === null ? b : D.key) || null), d(v, S, D, Z)
            );
          case L:
            return (
              (S = S.get(D.key === null ? b : D.key) || null), E(v, S, D, Z)
            );
          case Mt:
            var lt = D._init;
            return (D = lt(D._payload)), A(S, v, b, D, Z);
        }
        if (Zt(D) || Qt(D)) return (S = S.get(b) || null), O(v, S, D, Z, null);
        if (typeof D.then == "function") return A(S, v, b, gn(D), Z);
        if (D.$$typeof === X) return A(S, v, b, an(v, D), Z);
        Sn(v, D);
      }
      return null;
    }
    function W(S, v, b, D) {
      for (
        var Z = null, lt = null, V = v, $ = (v = 0), Lt = null;
        V !== null && $ < b.length;
        $++
      ) {
        V.index > $ ? ((Lt = V), (V = null)) : (Lt = V.sibling);
        var ft = T(S, V, b[$], D);
        if (ft === null) {
          V === null && (V = Lt);
          break;
        }
        t && V && ft.alternate === null && e(S, V),
          (v = n(ft, v, $)),
          lt === null ? (Z = ft) : (lt.sibling = ft),
          (lt = ft),
          (V = Lt);
      }
      if ($ === b.length) return l(S, V), rt && Dl(S, $), Z;
      if (V === null) {
        for (; $ < b.length; $++)
          (V = U(S, b[$], D)),
            V !== null &&
              ((v = n(V, v, $)),
              lt === null ? (Z = V) : (lt.sibling = V),
              (lt = V));
        return rt && Dl(S, $), Z;
      }
      for (V = a(V); $ < b.length; $++)
        (Lt = A(V, S, $, b[$], D)),
          Lt !== null &&
            (t &&
              Lt.alternate !== null &&
              V.delete(Lt.key === null ? $ : Lt.key),
            (v = n(Lt, v, $)),
            lt === null ? (Z = Lt) : (lt.sibling = Lt),
            (lt = Lt));
      return (
        t &&
          V.forEach(function (pl) {
            return e(S, pl);
          }),
        rt && Dl(S, $),
        Z
      );
    }
    function J(S, v, b, D) {
      if (b == null) throw Error(r(151));
      for (
        var Z = null, lt = null, V = v, $ = (v = 0), Lt = null, ft = b.next();
        V !== null && !ft.done;
        $++, ft = b.next()
      ) {
        V.index > $ ? ((Lt = V), (V = null)) : (Lt = V.sibling);
        var pl = T(S, V, ft.value, D);
        if (pl === null) {
          V === null && (V = Lt);
          break;
        }
        t && V && pl.alternate === null && e(S, V),
          (v = n(pl, v, $)),
          lt === null ? (Z = pl) : (lt.sibling = pl),
          (lt = pl),
          (V = Lt);
      }
      if (ft.done) return l(S, V), rt && Dl(S, $), Z;
      if (V === null) {
        for (; !ft.done; $++, ft = b.next())
          (ft = U(S, ft.value, D)),
            ft !== null &&
              ((v = n(ft, v, $)),
              lt === null ? (Z = ft) : (lt.sibling = ft),
              (lt = ft));
        return rt && Dl(S, $), Z;
      }
      for (V = a(V); !ft.done; $++, ft = b.next())
        (ft = A(V, S, $, ft.value, D)),
          ft !== null &&
            (t &&
              ft.alternate !== null &&
              V.delete(ft.key === null ? $ : ft.key),
            (v = n(ft, v, $)),
            lt === null ? (Z = ft) : (lt.sibling = ft),
            (lt = ft));
      return (
        t &&
          V.forEach(function (Nm) {
            return e(S, Nm);
          }),
        rt && Dl(S, $),
        Z
      );
    }
    function mt(S, v, b, D) {
      if (
        (typeof b == "object" &&
          b !== null &&
          b.type === C &&
          b.key === null &&
          (b = b.props.children),
        typeof b == "object" && b !== null)
      ) {
        switch (b.$$typeof) {
          case H:
            t: {
              for (var Z = b.key; v !== null; ) {
                if (v.key === Z) {
                  if (((Z = b.type), Z === C)) {
                    if (v.tag === 7) {
                      l(S, v.sibling),
                        (D = u(v, b.props.children)),
                        (D.return = S),
                        (S = D);
                      break t;
                    }
                  } else if (
                    v.elementType === Z ||
                    (typeof Z == "object" &&
                      Z !== null &&
                      Z.$$typeof === Mt &&
                      Yo(Z) === v.type)
                  ) {
                    l(S, v.sibling),
                      (D = u(v, b.props)),
                      uu(D, b),
                      (D.return = S),
                      (S = D);
                    break t;
                  }
                  l(S, v);
                  break;
                } else e(S, v);
                v = v.sibling;
              }
              b.type === C
                ? ((D = Ml(b.props.children, S.mode, D, b.key)),
                  (D.return = S),
                  (S = D))
                : ((D = Iu(b.type, b.key, b.props, null, S.mode, D)),
                  uu(D, b),
                  (D.return = S),
                  (S = D));
            }
            return i(S);
          case L:
            t: {
              for (Z = b.key; v !== null; ) {
                if (v.key === Z)
                  if (
                    v.tag === 4 &&
                    v.stateNode.containerInfo === b.containerInfo &&
                    v.stateNode.implementation === b.implementation
                  ) {
                    l(S, v.sibling),
                      (D = u(v, b.children || [])),
                      (D.return = S),
                      (S = D);
                    break t;
                  } else {
                    l(S, v);
                    break;
                  }
                else e(S, v);
                v = v.sibling;
              }
              (D = ji(b, S.mode, D)), (D.return = S), (S = D);
            }
            return i(S);
          case Mt:
            return (Z = b._init), (b = Z(b._payload)), mt(S, v, b, D);
        }
        if (Zt(b)) return W(S, v, b, D);
        if (Qt(b)) {
          if (((Z = Qt(b)), typeof Z != "function")) throw Error(r(150));
          return (b = Z.call(b)), J(S, v, b, D);
        }
        if (typeof b.then == "function") return mt(S, v, gn(b), D);
        if (b.$$typeof === X) return mt(S, v, an(S, b), D);
        Sn(S, b);
      }
      return (typeof b == "string" && b !== "") ||
        typeof b == "number" ||
        typeof b == "bigint"
        ? ((b = "" + b),
          v !== null && v.tag === 6
            ? (l(S, v.sibling), (D = u(v, b)), (D.return = S), (S = D))
            : (l(S, v), (D = Li(b, S.mode, D)), (D.return = S), (S = D)),
          i(S))
        : l(S, v);
    }
    return function (S, v, b, D) {
      try {
        au = 0;
        var Z = mt(S, v, b, D);
        return (sa = null), Z;
      } catch (V) {
        if (V === $a || V === nn) throw V;
        var lt = ue(29, V, null, S.mode);
        return (lt.lanes = D), (lt.return = S), lt;
      } finally {
      }
    };
  }
  var da = Lo(!0),
    jo = Lo(!1),
    ge = N(null),
    ze = null;
  function ul(t) {
    var e = t.alternate;
    Y(Ct, Ct.current & 1),
      Y(ge, t),
      ze === null &&
        (e === null || ca.current !== null || e.memoizedState !== null) &&
        (ze = t);
  }
  function Go(t) {
    if (t.tag === 22) {
      if ((Y(Ct, Ct.current), Y(ge, t), ze === null)) {
        var e = t.alternate;
        e !== null && e.memoizedState !== null && (ze = t);
      }
    } else nl();
  }
  function nl() {
    Y(Ct, Ct.current), Y(ge, ge.current);
  }
  function je(t) {
    Q(ge), ze === t && (ze = null), Q(Ct);
  }
  var Ct = N(0);
  function pn(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var l = e.memoizedState;
        if (
          l !== null &&
          ((l = l.dehydrated), l === null || l.data === "$?" || ff(l))
        )
          return e;
      } else if (e.tag === 19 && e.memoizedProps.revealOrder !== void 0) {
        if ((e.flags & 128) !== 0) return e;
      } else if (e.child !== null) {
        (e.child.return = e), (e = e.child);
        continue;
      }
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return null;
        e = e.return;
      }
      (e.sibling.return = e.return), (e = e.sibling);
    }
    return null;
  }
  function Sc(t, e, l, a) {
    (e = t.memoizedState),
      (l = l(a, e)),
      (l = l == null ? e : R({}, e, l)),
      (t.memoizedState = l),
      t.lanes === 0 && (t.updateQueue.baseState = l);
  }
  var pc = {
    enqueueSetState: function (t, e, l) {
      t = t._reactInternals;
      var a = fe(),
        u = el(a);
      (u.payload = e),
        l != null && (u.callback = l),
        (e = ll(t, u, a)),
        e !== null && (re(e, t, a), Wa(e, t, a));
    },
    enqueueReplaceState: function (t, e, l) {
      t = t._reactInternals;
      var a = fe(),
        u = el(a);
      (u.tag = 1),
        (u.payload = e),
        l != null && (u.callback = l),
        (e = ll(t, u, a)),
        e !== null && (re(e, t, a), Wa(e, t, a));
    },
    enqueueForceUpdate: function (t, e) {
      t = t._reactInternals;
      var l = fe(),
        a = el(l);
      (a.tag = 2),
        e != null && (a.callback = e),
        (e = ll(t, a, l)),
        e !== null && (re(e, t, l), Wa(e, t, l));
    },
  };
  function Xo(t, e, l, a, u, n, i) {
    return (
      (t = t.stateNode),
      typeof t.shouldComponentUpdate == "function"
        ? t.shouldComponentUpdate(a, n, i)
        : e.prototype && e.prototype.isPureReactComponent
          ? !Ga(l, a) || !Ga(u, n)
          : !0
    );
  }
  function Qo(t, e, l, a) {
    (t = e.state),
      typeof e.componentWillReceiveProps == "function" &&
        e.componentWillReceiveProps(l, a),
      typeof e.UNSAFE_componentWillReceiveProps == "function" &&
        e.UNSAFE_componentWillReceiveProps(l, a),
      e.state !== t && pc.enqueueReplaceState(e, e.state, null);
  }
  function ql(t, e) {
    var l = e;
    if ("ref" in e) {
      l = {};
      for (var a in e) a !== "ref" && (l[a] = e[a]);
    }
    if ((t = t.defaultProps)) {
      l === e && (l = R({}, l));
      for (var u in t) l[u] === void 0 && (l[u] = t[u]);
    }
    return l;
  }
  var bn =
    typeof reportError == "function"
      ? reportError
      : function (t) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var e = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof t == "object" &&
                t !== null &&
                typeof t.message == "string"
                  ? String(t.message)
                  : String(t),
              error: t,
            });
            if (!window.dispatchEvent(e)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", t);
            return;
          }
          console.error(t);
        };
  function Zo(t) {
    bn(t);
  }
  function wo(t) {
    console.error(t);
  }
  function Vo(t) {
    bn(t);
  }
  function En(t, e) {
    try {
      var l = t.onUncaughtError;
      l(e.value, { componentStack: e.stack });
    } catch (a) {
      setTimeout(function () {
        throw a;
      });
    }
  }
  function Ko(t, e, l) {
    try {
      var a = t.onCaughtError;
      a(l.value, {
        componentStack: l.stack,
        errorBoundary: e.tag === 1 ? e.stateNode : null,
      });
    } catch (u) {
      setTimeout(function () {
        throw u;
      });
    }
  }
  function bc(t, e, l) {
    return (
      (l = el(l)),
      (l.tag = 3),
      (l.payload = { element: null }),
      (l.callback = function () {
        En(t, e);
      }),
      l
    );
  }
  function Jo(t) {
    return (t = el(t)), (t.tag = 3), t;
  }
  function $o(t, e, l, a) {
    var u = l.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var n = a.value;
      (t.payload = function () {
        return u(n);
      }),
        (t.callback = function () {
          Ko(e, l, a);
        });
    }
    var i = l.stateNode;
    i !== null &&
      typeof i.componentDidCatch == "function" &&
      (t.callback = function () {
        Ko(e, l, a),
          typeof u != "function" &&
            (sl === null ? (sl = new Set([this])) : sl.add(this));
        var f = a.stack;
        this.componentDidCatch(a.value, {
          componentStack: f !== null ? f : "",
        });
      });
  }
  function N0(t, e, l, a, u) {
    if (
      ((l.flags |= 32768),
      a !== null && typeof a == "object" && typeof a.then == "function")
    ) {
      if (
        ((e = l.alternate),
        e !== null && Va(e, l, u, !0),
        (l = ge.current),
        l !== null)
      ) {
        switch (l.tag) {
          case 13:
            return (
              ze === null ? wc() : l.alternate === null && Ot === 0 && (Ot = 3),
              (l.flags &= -257),
              (l.flags |= 65536),
              (l.lanes = u),
              a === ki
                ? (l.flags |= 16384)
                : ((e = l.updateQueue),
                  e === null ? (l.updateQueue = new Set([a])) : e.add(a),
                  Kc(t, a, u)),
              !1
            );
          case 22:
            return (
              (l.flags |= 65536),
              a === ki
                ? (l.flags |= 16384)
                : ((e = l.updateQueue),
                  e === null
                    ? ((e = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([a]),
                      }),
                      (l.updateQueue = e))
                    : ((l = e.retryQueue),
                      l === null ? (e.retryQueue = new Set([a])) : l.add(a)),
                  Kc(t, a, u)),
              !1
            );
        }
        throw Error(r(435, l.tag));
      }
      return Kc(t, a, u), wc(), !1;
    }
    if (rt)
      return (
        (e = ge.current),
        e !== null
          ? ((e.flags & 65536) === 0 && (e.flags |= 256),
            (e.flags |= 65536),
            (e.lanes = u),
            a !== Qi && ((t = Error(r(422), { cause: a })), wa(he(t, l))))
          : (a !== Qi && ((e = Error(r(423), { cause: a })), wa(he(e, l))),
            (t = t.current.alternate),
            (t.flags |= 65536),
            (u &= -u),
            (t.lanes |= u),
            (a = he(a, l)),
            (u = bc(t.stateNode, a, u)),
            Pi(t, u),
            Ot !== 4 && (Ot = 2)),
        !1
      );
    var n = Error(r(520), { cause: a });
    if (
      ((n = he(n, l)),
      su === null ? (su = [n]) : su.push(n),
      Ot !== 4 && (Ot = 2),
      e === null)
    )
      return !0;
    (a = he(a, l)), (l = e);
    do {
      switch (l.tag) {
        case 3:
          return (
            (l.flags |= 65536),
            (t = u & -u),
            (l.lanes |= t),
            (t = bc(l.stateNode, a, t)),
            Pi(l, t),
            !1
          );
        case 1:
          if (
            ((e = l.type),
            (n = l.stateNode),
            (l.flags & 128) === 0 &&
              (typeof e.getDerivedStateFromError == "function" ||
                (n !== null &&
                  typeof n.componentDidCatch == "function" &&
                  (sl === null || !sl.has(n)))))
          )
            return (
              (l.flags |= 65536),
              (u &= -u),
              (l.lanes |= u),
              (u = Jo(u)),
              $o(u, t, l, a),
              Pi(l, u),
              !1
            );
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var ko = Error(r(461)),
    qt = !1;
  function jt(t, e, l, a) {
    e.child = t === null ? jo(e, null, l, a) : da(e, t.child, l, a);
  }
  function Wo(t, e, l, a, u) {
    l = l.render;
    var n = e.ref;
    if ("ref" in a) {
      var i = {};
      for (var f in a) f !== "ref" && (i[f] = a[f]);
    } else i = a;
    return (
      Hl(e),
      (a = ac(t, e, l, i, n, u)),
      (f = uc()),
      t !== null && !qt
        ? (nc(t, e, u), Ge(t, e, u))
        : (rt && f && Gi(e), (e.flags |= 1), jt(t, e, a, u), e.child)
    );
  }
  function Fo(t, e, l, a, u) {
    if (t === null) {
      var n = l.type;
      return typeof n == "function" &&
        !Yi(n) &&
        n.defaultProps === void 0 &&
        l.compare === null
        ? ((e.tag = 15), (e.type = n), Po(t, e, n, a, u))
        : ((t = Iu(l.type, null, a, e, e.mode, u)),
          (t.ref = e.ref),
          (t.return = e),
          (e.child = t));
    }
    if (((n = t.child), !_c(t, u))) {
      var i = n.memoizedProps;
      if (
        ((l = l.compare), (l = l !== null ? l : Ga), l(i, a) && t.ref === e.ref)
      )
        return Ge(t, e, u);
    }
    return (
      (e.flags |= 1),
      (t = He(n, a)),
      (t.ref = e.ref),
      (t.return = e),
      (e.child = t)
    );
  }
  function Po(t, e, l, a, u) {
    if (t !== null) {
      var n = t.memoizedProps;
      if (Ga(n, a) && t.ref === e.ref)
        if (((qt = !1), (e.pendingProps = a = n), _c(t, u)))
          (t.flags & 131072) !== 0 && (qt = !0);
        else return (e.lanes = t.lanes), Ge(t, e, u);
    }
    return Ec(t, e, l, a, u);
  }
  function Io(t, e, l) {
    var a = e.pendingProps,
      u = a.children,
      n = t !== null ? t.memoizedState : null;
    if (a.mode === "hidden") {
      if ((e.flags & 128) !== 0) {
        if (((a = n !== null ? n.baseLanes | l : l), t !== null)) {
          for (u = e.child = t.child, n = 0; u !== null; )
            (n = n | u.lanes | u.childLanes), (u = u.sibling);
          e.childLanes = n & ~a;
        } else (e.childLanes = 0), (e.child = null);
        return ts(t, e, a, l);
      }
      if ((l & 536870912) !== 0)
        (e.memoizedState = { baseLanes: 0, cachePool: null }),
          t !== null && un(e, n !== null ? n.cachePool : null),
          n !== null ? Fr(e, n) : tc(),
          Go(e);
      else
        return (
          (e.lanes = e.childLanes = 536870912),
          ts(t, e, n !== null ? n.baseLanes | l : l, l)
        );
    } else
      n !== null
        ? (un(e, n.cachePool), Fr(e, n), nl(), (e.memoizedState = null))
        : (t !== null && un(e, null), tc(), nl());
    return jt(t, e, u, l), e.child;
  }
  function ts(t, e, l, a) {
    var u = $i();
    return (
      (u = u === null ? null : { parent: Ht._currentValue, pool: u }),
      (e.memoizedState = { baseLanes: l, cachePool: u }),
      t !== null && un(e, null),
      tc(),
      Go(e),
      t !== null && Va(t, e, a, !0),
      null
    );
  }
  function Tn(t, e) {
    var l = e.ref;
    if (l === null) t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object") throw Error(r(284));
      (t === null || t.ref !== l) && (e.flags |= 4194816);
    }
  }
  function Ec(t, e, l, a, u) {
    return (
      Hl(e),
      (l = ac(t, e, l, a, void 0, u)),
      (a = uc()),
      t !== null && !qt
        ? (nc(t, e, u), Ge(t, e, u))
        : (rt && a && Gi(e), (e.flags |= 1), jt(t, e, l, u), e.child)
    );
  }
  function es(t, e, l, a, u, n) {
    return (
      Hl(e),
      (e.updateQueue = null),
      (l = Ir(e, a, l, u)),
      Pr(t),
      (a = uc()),
      t !== null && !qt
        ? (nc(t, e, n), Ge(t, e, n))
        : (rt && a && Gi(e), (e.flags |= 1), jt(t, e, l, n), e.child)
    );
  }
  function ls(t, e, l, a, u) {
    if ((Hl(e), e.stateNode === null)) {
      var n = la,
        i = l.contextType;
      typeof i == "object" && i !== null && (n = Vt(i)),
        (n = new l(a, n)),
        (e.memoizedState =
          n.state !== null && n.state !== void 0 ? n.state : null),
        (n.updater = pc),
        (e.stateNode = n),
        (n._reactInternals = e),
        (n = e.stateNode),
        (n.props = a),
        (n.state = e.memoizedState),
        (n.refs = {}),
        Wi(e),
        (i = l.contextType),
        (n.context = typeof i == "object" && i !== null ? Vt(i) : la),
        (n.state = e.memoizedState),
        (i = l.getDerivedStateFromProps),
        typeof i == "function" && (Sc(e, l, i, a), (n.state = e.memoizedState)),
        typeof l.getDerivedStateFromProps == "function" ||
          typeof n.getSnapshotBeforeUpdate == "function" ||
          (typeof n.UNSAFE_componentWillMount != "function" &&
            typeof n.componentWillMount != "function") ||
          ((i = n.state),
          typeof n.componentWillMount == "function" && n.componentWillMount(),
          typeof n.UNSAFE_componentWillMount == "function" &&
            n.UNSAFE_componentWillMount(),
          i !== n.state && pc.enqueueReplaceState(n, n.state, null),
          Pa(e, a, n, u),
          Fa(),
          (n.state = e.memoizedState)),
        typeof n.componentDidMount == "function" && (e.flags |= 4194308),
        (a = !0);
    } else if (t === null) {
      n = e.stateNode;
      var f = e.memoizedProps,
        d = ql(l, f);
      n.props = d;
      var E = n.context,
        O = l.contextType;
      (i = la), typeof O == "object" && O !== null && (i = Vt(O));
      var U = l.getDerivedStateFromProps;
      (O =
        typeof U == "function" ||
        typeof n.getSnapshotBeforeUpdate == "function"),
        (f = e.pendingProps !== f),
        O ||
          (typeof n.UNSAFE_componentWillReceiveProps != "function" &&
            typeof n.componentWillReceiveProps != "function") ||
          ((f || E !== i) && Qo(e, n, a, i)),
        (tl = !1);
      var T = e.memoizedState;
      (n.state = T),
        Pa(e, a, n, u),
        Fa(),
        (E = e.memoizedState),
        f || T !== E || tl
          ? (typeof U == "function" && (Sc(e, l, U, a), (E = e.memoizedState)),
            (d = tl || Xo(e, l, d, a, T, E, i))
              ? (O ||
                  (typeof n.UNSAFE_componentWillMount != "function" &&
                    typeof n.componentWillMount != "function") ||
                  (typeof n.componentWillMount == "function" &&
                    n.componentWillMount(),
                  typeof n.UNSAFE_componentWillMount == "function" &&
                    n.UNSAFE_componentWillMount()),
                typeof n.componentDidMount == "function" &&
                  (e.flags |= 4194308))
              : (typeof n.componentDidMount == "function" &&
                  (e.flags |= 4194308),
                (e.memoizedProps = a),
                (e.memoizedState = E)),
            (n.props = a),
            (n.state = E),
            (n.context = i),
            (a = d))
          : (typeof n.componentDidMount == "function" && (e.flags |= 4194308),
            (a = !1));
    } else {
      (n = e.stateNode),
        Fi(t, e),
        (i = e.memoizedProps),
        (O = ql(l, i)),
        (n.props = O),
        (U = e.pendingProps),
        (T = n.context),
        (E = l.contextType),
        (d = la),
        typeof E == "object" && E !== null && (d = Vt(E)),
        (f = l.getDerivedStateFromProps),
        (E =
          typeof f == "function" ||
          typeof n.getSnapshotBeforeUpdate == "function") ||
          (typeof n.UNSAFE_componentWillReceiveProps != "function" &&
            typeof n.componentWillReceiveProps != "function") ||
          ((i !== U || T !== d) && Qo(e, n, a, d)),
        (tl = !1),
        (T = e.memoizedState),
        (n.state = T),
        Pa(e, a, n, u),
        Fa();
      var A = e.memoizedState;
      i !== U ||
      T !== A ||
      tl ||
      (t !== null && t.dependencies !== null && ln(t.dependencies))
        ? (typeof f == "function" && (Sc(e, l, f, a), (A = e.memoizedState)),
          (O =
            tl ||
            Xo(e, l, O, a, T, A, d) ||
            (t !== null && t.dependencies !== null && ln(t.dependencies)))
            ? (E ||
                (typeof n.UNSAFE_componentWillUpdate != "function" &&
                  typeof n.componentWillUpdate != "function") ||
                (typeof n.componentWillUpdate == "function" &&
                  n.componentWillUpdate(a, A, d),
                typeof n.UNSAFE_componentWillUpdate == "function" &&
                  n.UNSAFE_componentWillUpdate(a, A, d)),
              typeof n.componentDidUpdate == "function" && (e.flags |= 4),
              typeof n.getSnapshotBeforeUpdate == "function" &&
                (e.flags |= 1024))
            : (typeof n.componentDidUpdate != "function" ||
                (i === t.memoizedProps && T === t.memoizedState) ||
                (e.flags |= 4),
              typeof n.getSnapshotBeforeUpdate != "function" ||
                (i === t.memoizedProps && T === t.memoizedState) ||
                (e.flags |= 1024),
              (e.memoizedProps = a),
              (e.memoizedState = A)),
          (n.props = a),
          (n.state = A),
          (n.context = d),
          (a = O))
        : (typeof n.componentDidUpdate != "function" ||
            (i === t.memoizedProps && T === t.memoizedState) ||
            (e.flags |= 4),
          typeof n.getSnapshotBeforeUpdate != "function" ||
            (i === t.memoizedProps && T === t.memoizedState) ||
            (e.flags |= 1024),
          (a = !1));
    }
    return (
      (n = a),
      Tn(t, e),
      (a = (e.flags & 128) !== 0),
      n || a
        ? ((n = e.stateNode),
          (l =
            a && typeof l.getDerivedStateFromError != "function"
              ? null
              : n.render()),
          (e.flags |= 1),
          t !== null && a
            ? ((e.child = da(e, t.child, null, u)),
              (e.child = da(e, null, l, u)))
            : jt(t, e, l, u),
          (e.memoizedState = n.state),
          (t = e.child))
        : (t = Ge(t, e, u)),
      t
    );
  }
  function as(t, e, l, a) {
    return Za(), (e.flags |= 256), jt(t, e, l, a), e.child;
  }
  var Tc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function Ac(t) {
    return { baseLanes: t, cachePool: Zr() };
  }
  function Rc(t, e, l) {
    return (t = t !== null ? t.childLanes & ~l : 0), e && (t |= Se), t;
  }
  function us(t, e, l) {
    var a = e.pendingProps,
      u = !1,
      n = (e.flags & 128) !== 0,
      i;
    if (
      ((i = n) ||
        (i =
          t !== null && t.memoizedState === null ? !1 : (Ct.current & 2) !== 0),
      i && ((u = !0), (e.flags &= -129)),
      (i = (e.flags & 32) !== 0),
      (e.flags &= -33),
      t === null)
    ) {
      if (rt) {
        if ((u ? ul(e) : nl(), rt)) {
          var f = zt,
            d;
          if ((d = f)) {
            t: {
              for (d = f, f = Re; d.nodeType !== 8; ) {
                if (!f) {
                  f = null;
                  break t;
                }
                if (((d = Te(d.nextSibling)), d === null)) {
                  f = null;
                  break t;
                }
              }
              f = d;
            }
            f !== null
              ? ((e.memoizedState = {
                  dehydrated: f,
                  treeContext: _l !== null ? { id: Ce, overflow: Be } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (d = ue(18, null, null, 0)),
                (d.stateNode = f),
                (d.return = e),
                (e.child = d),
                ($t = e),
                (zt = null),
                (d = !0))
              : (d = !1);
          }
          d || Ul(e);
        }
        if (
          ((f = e.memoizedState),
          f !== null && ((f = f.dehydrated), f !== null))
        )
          return ff(f) ? (e.lanes = 32) : (e.lanes = 536870912), null;
        je(e);
      }
      return (
        (f = a.children),
        (a = a.fallback),
        u
          ? (nl(),
            (u = e.mode),
            (f = An({ mode: "hidden", children: f }, u)),
            (a = Ml(a, u, l, null)),
            (f.return = e),
            (a.return = e),
            (f.sibling = a),
            (e.child = f),
            (u = e.child),
            (u.memoizedState = Ac(l)),
            (u.childLanes = Rc(t, i, l)),
            (e.memoizedState = Tc),
            a)
          : (ul(e), zc(e, f))
      );
    }
    if (
      ((d = t.memoizedState), d !== null && ((f = d.dehydrated), f !== null))
    ) {
      if (n)
        e.flags & 256
          ? (ul(e), (e.flags &= -257), (e = Oc(t, e, l)))
          : e.memoizedState !== null
            ? (nl(), (e.child = t.child), (e.flags |= 128), (e = null))
            : (nl(),
              (u = a.fallback),
              (f = e.mode),
              (a = An({ mode: "visible", children: a.children }, f)),
              (u = Ml(u, f, l, null)),
              (u.flags |= 2),
              (a.return = e),
              (u.return = e),
              (a.sibling = u),
              (e.child = a),
              da(e, t.child, null, l),
              (a = e.child),
              (a.memoizedState = Ac(l)),
              (a.childLanes = Rc(t, i, l)),
              (e.memoizedState = Tc),
              (e = u));
      else if ((ul(e), ff(f))) {
        if (((i = f.nextSibling && f.nextSibling.dataset), i)) var E = i.dgst;
        (i = E),
          (a = Error(r(419))),
          (a.stack = ""),
          (a.digest = i),
          wa({ value: a, source: null, stack: null }),
          (e = Oc(t, e, l));
      } else if (
        (qt || Va(t, e, l, !1), (i = (l & t.childLanes) !== 0), qt || i)
      ) {
        if (
          ((i = St),
          i !== null &&
            ((a = l & -l),
            (a = (a & 42) !== 0 ? 1 : fi(a)),
            (a = (a & (i.suspendedLanes | l)) !== 0 ? 0 : a),
            a !== 0 && a !== d.retryLane))
        )
          throw ((d.retryLane = a), ea(t, a), re(i, t, a), ko);
        f.data === "$?" || wc(), (e = Oc(t, e, l));
      } else
        f.data === "$?"
          ? ((e.flags |= 192), (e.child = t.child), (e = null))
          : ((t = d.treeContext),
            (zt = Te(f.nextSibling)),
            ($t = e),
            (rt = !0),
            (xl = null),
            (Re = !1),
            t !== null &&
              ((ye[ve++] = Ce),
              (ye[ve++] = Be),
              (ye[ve++] = _l),
              (Ce = t.id),
              (Be = t.overflow),
              (_l = e)),
            (e = zc(e, a.children)),
            (e.flags |= 4096));
      return e;
    }
    return u
      ? (nl(),
        (u = a.fallback),
        (f = e.mode),
        (d = t.child),
        (E = d.sibling),
        (a = He(d, { mode: "hidden", children: a.children })),
        (a.subtreeFlags = d.subtreeFlags & 65011712),
        E !== null ? (u = He(E, u)) : ((u = Ml(u, f, l, null)), (u.flags |= 2)),
        (u.return = e),
        (a.return = e),
        (a.sibling = u),
        (e.child = a),
        (a = u),
        (u = e.child),
        (f = t.child.memoizedState),
        f === null
          ? (f = Ac(l))
          : ((d = f.cachePool),
            d !== null
              ? ((E = Ht._currentValue),
                (d = d.parent !== E ? { parent: E, pool: E } : d))
              : (d = Zr()),
            (f = { baseLanes: f.baseLanes | l, cachePool: d })),
        (u.memoizedState = f),
        (u.childLanes = Rc(t, i, l)),
        (e.memoizedState = Tc),
        a)
      : (ul(e),
        (l = t.child),
        (t = l.sibling),
        (l = He(l, { mode: "visible", children: a.children })),
        (l.return = e),
        (l.sibling = null),
        t !== null &&
          ((i = e.deletions),
          i === null ? ((e.deletions = [t]), (e.flags |= 16)) : i.push(t)),
        (e.child = l),
        (e.memoizedState = null),
        l);
  }
  function zc(t, e) {
    return (
      (e = An({ mode: "visible", children: e }, t.mode)),
      (e.return = t),
      (t.child = e)
    );
  }
  function An(t, e) {
    return (
      (t = ue(22, t, null, e)),
      (t.lanes = 0),
      (t.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null,
      }),
      t
    );
  }
  function Oc(t, e, l) {
    return (
      da(e, t.child, null, l),
      (t = zc(e, e.pendingProps.children)),
      (t.flags |= 2),
      (e.memoizedState = null),
      t
    );
  }
  function ns(t, e, l) {
    t.lanes |= e;
    var a = t.alternate;
    a !== null && (a.lanes |= e), wi(t.return, e, l);
  }
  function Mc(t, e, l, a, u) {
    var n = t.memoizedState;
    n === null
      ? (t.memoizedState = {
          isBackwards: e,
          rendering: null,
          renderingStartTime: 0,
          last: a,
          tail: l,
          tailMode: u,
        })
      : ((n.isBackwards = e),
        (n.rendering = null),
        (n.renderingStartTime = 0),
        (n.last = a),
        (n.tail = l),
        (n.tailMode = u));
  }
  function is(t, e, l) {
    var a = e.pendingProps,
      u = a.revealOrder,
      n = a.tail;
    if ((jt(t, e, a.children, l), (a = Ct.current), (a & 2) !== 0))
      (a = (a & 1) | 2), (e.flags |= 128);
    else {
      if (t !== null && (t.flags & 128) !== 0)
        t: for (t = e.child; t !== null; ) {
          if (t.tag === 13) t.memoizedState !== null && ns(t, l, e);
          else if (t.tag === 19) ns(t, l, e);
          else if (t.child !== null) {
            (t.child.return = t), (t = t.child);
            continue;
          }
          if (t === e) break t;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) break t;
            t = t.return;
          }
          (t.sibling.return = t.return), (t = t.sibling);
        }
      a &= 1;
    }
    switch ((Y(Ct, a), u)) {
      case "forwards":
        for (l = e.child, u = null; l !== null; )
          (t = l.alternate),
            t !== null && pn(t) === null && (u = l),
            (l = l.sibling);
        (l = u),
          l === null
            ? ((u = e.child), (e.child = null))
            : ((u = l.sibling), (l.sibling = null)),
          Mc(e, !1, u, l, n);
        break;
      case "backwards":
        for (l = null, u = e.child, e.child = null; u !== null; ) {
          if (((t = u.alternate), t !== null && pn(t) === null)) {
            e.child = u;
            break;
          }
          (t = u.sibling), (u.sibling = l), (l = u), (u = t);
        }
        Mc(e, !0, l, null, n);
        break;
      case "together":
        Mc(e, !1, null, null, void 0);
        break;
      default:
        e.memoizedState = null;
    }
    return e.child;
  }
  function Ge(t, e, l) {
    if (
      (t !== null && (e.dependencies = t.dependencies),
      (ol |= e.lanes),
      (l & e.childLanes) === 0)
    )
      if (t !== null) {
        if ((Va(t, e, l, !1), (l & e.childLanes) === 0)) return null;
      } else return null;
    if (t !== null && e.child !== t.child) throw Error(r(153));
    if (e.child !== null) {
      for (
        t = e.child, l = He(t, t.pendingProps), e.child = l, l.return = e;
        t.sibling !== null;

      )
        (t = t.sibling),
          (l = l.sibling = He(t, t.pendingProps)),
          (l.return = e);
      l.sibling = null;
    }
    return e.child;
  }
  function _c(t, e) {
    return (t.lanes & e) !== 0
      ? !0
      : ((t = t.dependencies), !!(t !== null && ln(t)));
  }
  function H0(t, e, l) {
    switch (e.tag) {
      case 3:
        bt(e, e.stateNode.containerInfo),
          Ie(e, Ht, t.memoizedState.cache),
          Za();
        break;
      case 27:
      case 5:
        ai(e);
        break;
      case 4:
        bt(e, e.stateNode.containerInfo);
        break;
      case 10:
        Ie(e, e.type, e.memoizedProps.value);
        break;
      case 13:
        var a = e.memoizedState;
        if (a !== null)
          return a.dehydrated !== null
            ? (ul(e), (e.flags |= 128), null)
            : (l & e.child.childLanes) !== 0
              ? us(t, e, l)
              : (ul(e), (t = Ge(t, e, l)), t !== null ? t.sibling : null);
        ul(e);
        break;
      case 19:
        var u = (t.flags & 128) !== 0;
        if (
          ((a = (l & e.childLanes) !== 0),
          a || (Va(t, e, l, !1), (a = (l & e.childLanes) !== 0)),
          u)
        ) {
          if (a) return is(t, e, l);
          e.flags |= 128;
        }
        if (
          ((u = e.memoizedState),
          u !== null &&
            ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
          Y(Ct, Ct.current),
          a)
        )
          break;
        return null;
      case 22:
      case 23:
        return (e.lanes = 0), Io(t, e, l);
      case 24:
        Ie(e, Ht, t.memoizedState.cache);
    }
    return Ge(t, e, l);
  }
  function cs(t, e, l) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps) qt = !0;
      else {
        if (!_c(t, l) && (e.flags & 128) === 0) return (qt = !1), H0(t, e, l);
        qt = (t.flags & 131072) !== 0;
      }
    else (qt = !1), rt && (e.flags & 1048576) !== 0 && qr(e, en, e.index);
    switch (((e.lanes = 0), e.tag)) {
      case 16:
        t: {
          t = e.pendingProps;
          var a = e.elementType,
            u = a._init;
          if (((a = u(a._payload)), (e.type = a), typeof a == "function"))
            Yi(a)
              ? ((t = ql(a, t)), (e.tag = 1), (e = ls(null, e, a, t, l)))
              : ((e.tag = 0), (e = Ec(null, e, a, t, l)));
          else {
            if (a != null) {
              if (((u = a.$$typeof), u === it)) {
                (e.tag = 11), (e = Wo(null, e, a, t, l));
                break t;
              } else if (u === Rt) {
                (e.tag = 14), (e = Fo(null, e, a, t, l));
                break t;
              }
            }
            throw ((e = El(a) || a), Error(r(306, e, "")));
          }
        }
        return e;
      case 0:
        return Ec(t, e, e.type, e.pendingProps, l);
      case 1:
        return (a = e.type), (u = ql(a, e.pendingProps)), ls(t, e, a, u, l);
      case 3:
        t: {
          if ((bt(e, e.stateNode.containerInfo), t === null))
            throw Error(r(387));
          a = e.pendingProps;
          var n = e.memoizedState;
          (u = n.element), Fi(t, e), Pa(e, a, null, l);
          var i = e.memoizedState;
          if (
            ((a = i.cache),
            Ie(e, Ht, a),
            a !== n.cache && Vi(e, [Ht], l, !0),
            Fa(),
            (a = i.element),
            n.isDehydrated)
          )
            if (
              ((n = { element: a, isDehydrated: !1, cache: i.cache }),
              (e.updateQueue.baseState = n),
              (e.memoizedState = n),
              e.flags & 256)
            ) {
              e = as(t, e, a, l);
              break t;
            } else if (a !== u) {
              (u = he(Error(r(424)), e)), wa(u), (e = as(t, e, a, l));
              break t;
            } else {
              switch (((t = e.stateNode.containerInfo), t.nodeType)) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (
                zt = Te(t.firstChild),
                  $t = e,
                  rt = !0,
                  xl = null,
                  Re = !0,
                  l = jo(e, null, a, l),
                  e.child = l;
                l;

              )
                (l.flags = (l.flags & -3) | 4096), (l = l.sibling);
            }
          else {
            if ((Za(), a === u)) {
              e = Ge(t, e, l);
              break t;
            }
            jt(t, e, a, l);
          }
          e = e.child;
        }
        return e;
      case 26:
        return (
          Tn(t, e),
          t === null
            ? (l = sd(e.type, null, e.pendingProps, null))
              ? (e.memoizedState = l)
              : rt ||
                ((l = e.type),
                (t = e.pendingProps),
                (a = Yn(I.current).createElement(l)),
                (a[wt] = e),
                (a[kt] = t),
                Xt(a, l, t),
                Bt(a),
                (e.stateNode = a))
            : (e.memoizedState = sd(
                e.type,
                t.memoizedProps,
                e.pendingProps,
                t.memoizedState,
              )),
          null
        );
      case 27:
        return (
          ai(e),
          t === null &&
            rt &&
            ((a = e.stateNode = fd(e.type, e.pendingProps, I.current)),
            ($t = e),
            (Re = !0),
            (u = zt),
            ml(e.type) ? ((rf = u), (zt = Te(a.firstChild))) : (zt = u)),
          jt(t, e, e.pendingProps.children, l),
          Tn(t, e),
          t === null && (e.flags |= 4194304),
          e.child
        );
      case 5:
        return (
          t === null &&
            rt &&
            ((u = a = zt) &&
              ((a = cm(a, e.type, e.pendingProps, Re)),
              a !== null
                ? ((e.stateNode = a),
                  ($t = e),
                  (zt = Te(a.firstChild)),
                  (Re = !1),
                  (u = !0))
                : (u = !1)),
            u || Ul(e)),
          ai(e),
          (u = e.type),
          (n = e.pendingProps),
          (i = t !== null ? t.memoizedProps : null),
          (a = n.children),
          uf(u, n) ? (a = null) : i !== null && uf(u, i) && (e.flags |= 32),
          e.memoizedState !== null &&
            ((u = ac(t, e, z0, null, null, l)), (bu._currentValue = u)),
          Tn(t, e),
          jt(t, e, a, l),
          e.child
        );
      case 6:
        return (
          t === null &&
            rt &&
            ((t = l = zt) &&
              ((l = fm(l, e.pendingProps, Re)),
              l !== null
                ? ((e.stateNode = l), ($t = e), (zt = null), (t = !0))
                : (t = !1)),
            t || Ul(e)),
          null
        );
      case 13:
        return us(t, e, l);
      case 4:
        return (
          bt(e, e.stateNode.containerInfo),
          (a = e.pendingProps),
          t === null ? (e.child = da(e, null, a, l)) : jt(t, e, a, l),
          e.child
        );
      case 11:
        return Wo(t, e, e.type, e.pendingProps, l);
      case 7:
        return jt(t, e, e.pendingProps, l), e.child;
      case 8:
        return jt(t, e, e.pendingProps.children, l), e.child;
      case 12:
        return jt(t, e, e.pendingProps.children, l), e.child;
      case 10:
        return (
          (a = e.pendingProps),
          Ie(e, e.type, a.value),
          jt(t, e, a.children, l),
          e.child
        );
      case 9:
        return (
          (u = e.type._context),
          (a = e.pendingProps.children),
          Hl(e),
          (u = Vt(u)),
          (a = a(u)),
          (e.flags |= 1),
          jt(t, e, a, l),
          e.child
        );
      case 14:
        return Fo(t, e, e.type, e.pendingProps, l);
      case 15:
        return Po(t, e, e.type, e.pendingProps, l);
      case 19:
        return is(t, e, l);
      case 31:
        return (
          (a = e.pendingProps),
          (l = e.mode),
          (a = { mode: a.mode, children: a.children }),
          t === null
            ? ((l = An(a, l)),
              (l.ref = e.ref),
              (e.child = l),
              (l.return = e),
              (e = l))
            : ((l = He(t.child, a)),
              (l.ref = e.ref),
              (e.child = l),
              (l.return = e),
              (e = l)),
          e
        );
      case 22:
        return Io(t, e, l);
      case 24:
        return (
          Hl(e),
          (a = Vt(Ht)),
          t === null
            ? ((u = $i()),
              u === null &&
                ((u = St),
                (n = Ki()),
                (u.pooledCache = n),
                n.refCount++,
                n !== null && (u.pooledCacheLanes |= l),
                (u = n)),
              (e.memoizedState = { parent: a, cache: u }),
              Wi(e),
              Ie(e, Ht, u))
            : ((t.lanes & l) !== 0 && (Fi(t, e), Pa(e, null, null, l), Fa()),
              (u = t.memoizedState),
              (n = e.memoizedState),
              u.parent !== a
                ? ((u = { parent: a, cache: a }),
                  (e.memoizedState = u),
                  e.lanes === 0 &&
                    (e.memoizedState = e.updateQueue.baseState = u),
                  Ie(e, Ht, a))
                : ((a = n.cache),
                  Ie(e, Ht, a),
                  a !== u.cache && Vi(e, [Ht], l, !0))),
          jt(t, e, e.pendingProps.children, l),
          e.child
        );
      case 29:
        throw e.pendingProps;
    }
    throw Error(r(156, e.tag));
  }
  function Xe(t) {
    t.flags |= 4;
  }
  function fs(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (((t.flags |= 16777216), !vd(e))) {
      if (
        ((e = ge.current),
        e !== null &&
          ((nt & 4194048) === nt
            ? ze !== null
            : ((nt & 62914560) !== nt && (nt & 536870912) === 0) || e !== ze))
      )
        throw ((ka = ki), wr);
      t.flags |= 8192;
    }
  }
  function Rn(t, e) {
    e !== null && (t.flags |= 4),
      t.flags & 16384 &&
        ((e = t.tag !== 22 ? jf() : 536870912), (t.lanes |= e), (va |= e));
  }
  function nu(t, e) {
    if (!rt)
      switch (t.tailMode) {
        case "hidden":
          e = t.tail;
          for (var l = null; e !== null; )
            e.alternate !== null && (l = e), (e = e.sibling);
          l === null ? (t.tail = null) : (l.sibling = null);
          break;
        case "collapsed":
          l = t.tail;
          for (var a = null; l !== null; )
            l.alternate !== null && (a = l), (l = l.sibling);
          a === null
            ? e || t.tail === null
              ? (t.tail = null)
              : (t.tail.sibling = null)
            : (a.sibling = null);
      }
  }
  function Tt(t) {
    var e = t.alternate !== null && t.alternate.child === t.child,
      l = 0,
      a = 0;
    if (e)
      for (var u = t.child; u !== null; )
        (l |= u.lanes | u.childLanes),
          (a |= u.subtreeFlags & 65011712),
          (a |= u.flags & 65011712),
          (u.return = t),
          (u = u.sibling);
    else
      for (u = t.child; u !== null; )
        (l |= u.lanes | u.childLanes),
          (a |= u.subtreeFlags),
          (a |= u.flags),
          (u.return = t),
          (u = u.sibling);
    return (t.subtreeFlags |= a), (t.childLanes = l), e;
  }
  function C0(t, e, l) {
    var a = e.pendingProps;
    switch ((Xi(e), e.tag)) {
      case 31:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Tt(e), null;
      case 1:
        return Tt(e), null;
      case 3:
        return (
          (l = e.stateNode),
          (a = null),
          t !== null && (a = t.memoizedState.cache),
          e.memoizedState.cache !== a && (e.flags |= 2048),
          Ye(Ht),
          ke(),
          l.pendingContext &&
            ((l.context = l.pendingContext), (l.pendingContext = null)),
          (t === null || t.child === null) &&
            (Qa(e)
              ? Xe(e)
              : t === null ||
                (t.memoizedState.isDehydrated && (e.flags & 256) === 0) ||
                ((e.flags |= 1024), jr())),
          Tt(e),
          null
        );
      case 26:
        return (
          (l = e.memoizedState),
          t === null
            ? (Xe(e),
              l !== null ? (Tt(e), fs(e, l)) : (Tt(e), (e.flags &= -16777217)))
            : l
              ? l !== t.memoizedState
                ? (Xe(e), Tt(e), fs(e, l))
                : (Tt(e), (e.flags &= -16777217))
              : (t.memoizedProps !== a && Xe(e), Tt(e), (e.flags &= -16777217)),
          null
        );
      case 27:
        Cu(e), (l = I.current);
        var u = e.type;
        if (t !== null && e.stateNode != null) t.memoizedProps !== a && Xe(e);
        else {
          if (!a) {
            if (e.stateNode === null) throw Error(r(166));
            return Tt(e), null;
          }
          (t = K.current),
            Qa(e) ? Yr(e) : ((t = fd(u, a, l)), (e.stateNode = t), Xe(e));
        }
        return Tt(e), null;
      case 5:
        if ((Cu(e), (l = e.type), t !== null && e.stateNode != null))
          t.memoizedProps !== a && Xe(e);
        else {
          if (!a) {
            if (e.stateNode === null) throw Error(r(166));
            return Tt(e), null;
          }
          if (((t = K.current), Qa(e))) Yr(e);
          else {
            switch (((u = Yn(I.current)), t)) {
              case 1:
                t = u.createElementNS("http://www.w3.org/2000/svg", l);
                break;
              case 2:
                t = u.createElementNS("http://www.w3.org/1998/Math/MathML", l);
                break;
              default:
                switch (l) {
                  case "svg":
                    t = u.createElementNS("http://www.w3.org/2000/svg", l);
                    break;
                  case "math":
                    t = u.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      l,
                    );
                    break;
                  case "script":
                    (t = u.createElement("div")),
                      (t.innerHTML = "<script><\/script>"),
                      (t = t.removeChild(t.firstChild));
                    break;
                  case "select":
                    (t =
                      typeof a.is == "string"
                        ? u.createElement("select", { is: a.is })
                        : u.createElement("select")),
                      a.multiple
                        ? (t.multiple = !0)
                        : a.size && (t.size = a.size);
                    break;
                  default:
                    t =
                      typeof a.is == "string"
                        ? u.createElement(l, { is: a.is })
                        : u.createElement(l);
                }
            }
            (t[wt] = e), (t[kt] = a);
            t: for (u = e.child; u !== null; ) {
              if (u.tag === 5 || u.tag === 6) t.appendChild(u.stateNode);
              else if (u.tag !== 4 && u.tag !== 27 && u.child !== null) {
                (u.child.return = u), (u = u.child);
                continue;
              }
              if (u === e) break t;
              for (; u.sibling === null; ) {
                if (u.return === null || u.return === e) break t;
                u = u.return;
              }
              (u.sibling.return = u.return), (u = u.sibling);
            }
            e.stateNode = t;
            t: switch ((Xt(t, l, a), l)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                t = !!a.autoFocus;
                break t;
              case "img":
                t = !0;
                break t;
              default:
                t = !1;
            }
            t && Xe(e);
          }
        }
        return Tt(e), (e.flags &= -16777217), null;
      case 6:
        if (t && e.stateNode != null) t.memoizedProps !== a && Xe(e);
        else {
          if (typeof a != "string" && e.stateNode === null) throw Error(r(166));
          if (((t = I.current), Qa(e))) {
            if (
              ((t = e.stateNode),
              (l = e.memoizedProps),
              (a = null),
              (u = $t),
              u !== null)
            )
              switch (u.tag) {
                case 27:
                case 5:
                  a = u.memoizedProps;
              }
            (t[wt] = e),
              (t = !!(
                t.nodeValue === l ||
                (a !== null && a.suppressHydrationWarning === !0) ||
                ed(t.nodeValue, l)
              )),
              t || Ul(e);
          } else (t = Yn(t).createTextNode(a)), (t[wt] = e), (e.stateNode = t);
        }
        return Tt(e), null;
      case 13:
        if (
          ((a = e.memoizedState),
          t === null ||
            (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
        ) {
          if (((u = Qa(e)), a !== null && a.dehydrated !== null)) {
            if (t === null) {
              if (!u) throw Error(r(318));
              if (
                ((u = e.memoizedState),
                (u = u !== null ? u.dehydrated : null),
                !u)
              )
                throw Error(r(317));
              u[wt] = e;
            } else
              Za(),
                (e.flags & 128) === 0 && (e.memoizedState = null),
                (e.flags |= 4);
            Tt(e), (u = !1);
          } else
            (u = jr()),
              t !== null &&
                t.memoizedState !== null &&
                (t.memoizedState.hydrationErrors = u),
              (u = !0);
          if (!u) return e.flags & 256 ? (je(e), e) : (je(e), null);
        }
        if ((je(e), (e.flags & 128) !== 0)) return (e.lanes = l), e;
        if (
          ((l = a !== null), (t = t !== null && t.memoizedState !== null), l)
        ) {
          (a = e.child),
            (u = null),
            a.alternate !== null &&
              a.alternate.memoizedState !== null &&
              a.alternate.memoizedState.cachePool !== null &&
              (u = a.alternate.memoizedState.cachePool.pool);
          var n = null;
          a.memoizedState !== null &&
            a.memoizedState.cachePool !== null &&
            (n = a.memoizedState.cachePool.pool),
            n !== u && (a.flags |= 2048);
        }
        return (
          l !== t && l && (e.child.flags |= 8192),
          Rn(e, e.updateQueue),
          Tt(e),
          null
        );
      case 4:
        return ke(), t === null && Ic(e.stateNode.containerInfo), Tt(e), null;
      case 10:
        return Ye(e.type), Tt(e), null;
      case 19:
        if ((Q(Ct), (u = e.memoizedState), u === null)) return Tt(e), null;
        if (((a = (e.flags & 128) !== 0), (n = u.rendering), n === null))
          if (a) nu(u, !1);
          else {
            if (Ot !== 0 || (t !== null && (t.flags & 128) !== 0))
              for (t = e.child; t !== null; ) {
                if (((n = pn(t)), n !== null)) {
                  for (
                    e.flags |= 128,
                      nu(u, !1),
                      t = n.updateQueue,
                      e.updateQueue = t,
                      Rn(e, t),
                      e.subtreeFlags = 0,
                      t = l,
                      l = e.child;
                    l !== null;

                  )
                    Br(l, t), (l = l.sibling);
                  return Y(Ct, (Ct.current & 1) | 2), e.child;
                }
                t = t.sibling;
              }
            u.tail !== null &&
              Ae() > Mn &&
              ((e.flags |= 128), (a = !0), nu(u, !1), (e.lanes = 4194304));
          }
        else {
          if (!a)
            if (((t = pn(n)), t !== null)) {
              if (
                ((e.flags |= 128),
                (a = !0),
                (t = t.updateQueue),
                (e.updateQueue = t),
                Rn(e, t),
                nu(u, !0),
                u.tail === null &&
                  u.tailMode === "hidden" &&
                  !n.alternate &&
                  !rt)
              )
                return Tt(e), null;
            } else
              2 * Ae() - u.renderingStartTime > Mn &&
                l !== 536870912 &&
                ((e.flags |= 128), (a = !0), nu(u, !1), (e.lanes = 4194304));
          u.isBackwards
            ? ((n.sibling = e.child), (e.child = n))
            : ((t = u.last),
              t !== null ? (t.sibling = n) : (e.child = n),
              (u.last = n));
        }
        return u.tail !== null
          ? ((e = u.tail),
            (u.rendering = e),
            (u.tail = e.sibling),
            (u.renderingStartTime = Ae()),
            (e.sibling = null),
            (t = Ct.current),
            Y(Ct, a ? (t & 1) | 2 : t & 1),
            e)
          : (Tt(e), null);
      case 22:
      case 23:
        return (
          je(e),
          ec(),
          (a = e.memoizedState !== null),
          t !== null
            ? (t.memoizedState !== null) !== a && (e.flags |= 8192)
            : a && (e.flags |= 8192),
          a
            ? (l & 536870912) !== 0 &&
              (e.flags & 128) === 0 &&
              (Tt(e), e.subtreeFlags & 6 && (e.flags |= 8192))
            : Tt(e),
          (l = e.updateQueue),
          l !== null && Rn(e, l.retryQueue),
          (l = null),
          t !== null &&
            t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (l = t.memoizedState.cachePool.pool),
          (a = null),
          e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (a = e.memoizedState.cachePool.pool),
          a !== l && (e.flags |= 2048),
          t !== null && Q(Cl),
          null
        );
      case 24:
        return (
          (l = null),
          t !== null && (l = t.memoizedState.cache),
          e.memoizedState.cache !== l && (e.flags |= 2048),
          Ye(Ht),
          Tt(e),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, e.tag));
  }
  function B0(t, e) {
    switch ((Xi(e), e.tag)) {
      case 1:
        return (
          (t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 3:
        return (
          Ye(Ht),
          ke(),
          (t = e.flags),
          (t & 65536) !== 0 && (t & 128) === 0
            ? ((e.flags = (t & -65537) | 128), e)
            : null
        );
      case 26:
      case 27:
      case 5:
        return Cu(e), null;
      case 13:
        if (
          (je(e), (t = e.memoizedState), t !== null && t.dehydrated !== null)
        ) {
          if (e.alternate === null) throw Error(r(340));
          Za();
        }
        return (
          (t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 19:
        return Q(Ct), null;
      case 4:
        return ke(), null;
      case 10:
        return Ye(e.type), null;
      case 22:
      case 23:
        return (
          je(e),
          ec(),
          t !== null && Q(Cl),
          (t = e.flags),
          t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 24:
        return Ye(Ht), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function rs(t, e) {
    switch ((Xi(e), e.tag)) {
      case 3:
        Ye(Ht), ke();
        break;
      case 26:
      case 27:
      case 5:
        Cu(e);
        break;
      case 4:
        ke();
        break;
      case 13:
        je(e);
        break;
      case 19:
        Q(Ct);
        break;
      case 10:
        Ye(e.type);
        break;
      case 22:
      case 23:
        je(e), ec(), t !== null && Q(Cl);
        break;
      case 24:
        Ye(Ht);
    }
  }
  function iu(t, e) {
    try {
      var l = e.updateQueue,
        a = l !== null ? l.lastEffect : null;
      if (a !== null) {
        var u = a.next;
        l = u;
        do {
          if ((l.tag & t) === t) {
            a = void 0;
            var n = l.create,
              i = l.inst;
            (a = n()), (i.destroy = a);
          }
          l = l.next;
        } while (l !== u);
      }
    } catch (f) {
      vt(e, e.return, f);
    }
  }
  function il(t, e, l) {
    try {
      var a = e.updateQueue,
        u = a !== null ? a.lastEffect : null;
      if (u !== null) {
        var n = u.next;
        a = n;
        do {
          if ((a.tag & t) === t) {
            var i = a.inst,
              f = i.destroy;
            if (f !== void 0) {
              (i.destroy = void 0), (u = e);
              var d = l,
                E = f;
              try {
                E();
              } catch (O) {
                vt(u, d, O);
              }
            }
          }
          a = a.next;
        } while (a !== n);
      }
    } catch (O) {
      vt(e, e.return, O);
    }
  }
  function os(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var l = t.stateNode;
      try {
        Wr(e, l);
      } catch (a) {
        vt(t, t.return, a);
      }
    }
  }
  function ss(t, e, l) {
    (l.props = ql(t.type, t.memoizedProps)), (l.state = t.memoizedState);
    try {
      l.componentWillUnmount();
    } catch (a) {
      vt(t, e, a);
    }
  }
  function cu(t, e) {
    try {
      var l = t.ref;
      if (l !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var a = t.stateNode;
            break;
          case 30:
            a = t.stateNode;
            break;
          default:
            a = t.stateNode;
        }
        typeof l == "function" ? (t.refCleanup = l(a)) : (l.current = a);
      }
    } catch (u) {
      vt(t, e, u);
    }
  }
  function Oe(t, e) {
    var l = t.ref,
      a = t.refCleanup;
    if (l !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (u) {
          vt(t, e, u);
        } finally {
          (t.refCleanup = null),
            (t = t.alternate),
            t != null && (t.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (u) {
          vt(t, e, u);
        }
      else l.current = null;
  }
  function ds(t) {
    var e = t.type,
      l = t.memoizedProps,
      a = t.stateNode;
    try {
      t: switch (e) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          l.autoFocus && a.focus();
          break t;
        case "img":
          l.src ? (a.src = l.src) : l.srcSet && (a.srcset = l.srcSet);
      }
    } catch (u) {
      vt(t, t.return, u);
    }
  }
  function Dc(t, e, l) {
    try {
      var a = t.stateNode;
      lm(a, t.type, l, e), (a[kt] = e);
    } catch (u) {
      vt(t, t.return, u);
    }
  }
  function hs(t) {
    return (
      t.tag === 5 ||
      t.tag === 3 ||
      t.tag === 26 ||
      (t.tag === 27 && ml(t.type)) ||
      t.tag === 4
    );
  }
  function xc(t) {
    t: for (;;) {
      for (; t.sibling === null; ) {
        if (t.return === null || hs(t.return)) return null;
        t = t.return;
      }
      for (
        t.sibling.return = t.return, t = t.sibling;
        t.tag !== 5 && t.tag !== 6 && t.tag !== 18;

      ) {
        if (
          (t.tag === 27 && ml(t.type)) ||
          t.flags & 2 ||
          t.child === null ||
          t.tag === 4
        )
          continue t;
        (t.child.return = t), (t = t.child);
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Uc(t, e, l) {
    var a = t.tag;
    if (a === 5 || a === 6)
      (t = t.stateNode),
        e
          ? (l.nodeType === 9
              ? l.body
              : l.nodeName === "HTML"
                ? l.ownerDocument.body
                : l
            ).insertBefore(t, e)
          : ((e =
              l.nodeType === 9
                ? l.body
                : l.nodeName === "HTML"
                  ? l.ownerDocument.body
                  : l),
            e.appendChild(t),
            (l = l._reactRootContainer),
            l != null || e.onclick !== null || (e.onclick = qn));
    else if (
      a !== 4 &&
      (a === 27 && ml(t.type) && ((l = t.stateNode), (e = null)),
      (t = t.child),
      t !== null)
    )
      for (Uc(t, e, l), t = t.sibling; t !== null; )
        Uc(t, e, l), (t = t.sibling);
  }
  function zn(t, e, l) {
    var a = t.tag;
    if (a === 5 || a === 6)
      (t = t.stateNode), e ? l.insertBefore(t, e) : l.appendChild(t);
    else if (
      a !== 4 &&
      (a === 27 && ml(t.type) && (l = t.stateNode), (t = t.child), t !== null)
    )
      for (zn(t, e, l), t = t.sibling; t !== null; )
        zn(t, e, l), (t = t.sibling);
  }
  function ms(t) {
    var e = t.stateNode,
      l = t.memoizedProps;
    try {
      for (var a = t.type, u = e.attributes; u.length; )
        e.removeAttributeNode(u[0]);
      Xt(e, a, l), (e[wt] = t), (e[kt] = l);
    } catch (n) {
      vt(t, t.return, n);
    }
  }
  var Qe = !1,
    Dt = !1,
    Nc = !1,
    ys = typeof WeakSet == "function" ? WeakSet : Set,
    Yt = null;
  function q0(t, e) {
    if (((t = t.containerInfo), (lf = Zn), (t = zr(t)), xi(t))) {
      if ("selectionStart" in t)
        var l = { start: t.selectionStart, end: t.selectionEnd };
      else
        t: {
          l = ((l = t.ownerDocument) && l.defaultView) || window;
          var a = l.getSelection && l.getSelection();
          if (a && a.rangeCount !== 0) {
            l = a.anchorNode;
            var u = a.anchorOffset,
              n = a.focusNode;
            a = a.focusOffset;
            try {
              l.nodeType, n.nodeType;
            } catch {
              l = null;
              break t;
            }
            var i = 0,
              f = -1,
              d = -1,
              E = 0,
              O = 0,
              U = t,
              T = null;
            e: for (;;) {
              for (
                var A;
                U !== l || (u !== 0 && U.nodeType !== 3) || (f = i + u),
                  U !== n || (a !== 0 && U.nodeType !== 3) || (d = i + a),
                  U.nodeType === 3 && (i += U.nodeValue.length),
                  (A = U.firstChild) !== null;

              )
                (T = U), (U = A);
              for (;;) {
                if (U === t) break e;
                if (
                  (T === l && ++E === u && (f = i),
                  T === n && ++O === a && (d = i),
                  (A = U.nextSibling) !== null)
                )
                  break;
                (U = T), (T = U.parentNode);
              }
              U = A;
            }
            l = f === -1 || d === -1 ? null : { start: f, end: d };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (
      af = { focusedElem: t, selectionRange: l }, Zn = !1, Yt = e;
      Yt !== null;

    )
      if (
        ((e = Yt), (t = e.child), (e.subtreeFlags & 1024) !== 0 && t !== null)
      )
        (t.return = e), (Yt = t);
      else
        for (; Yt !== null; ) {
          switch (((e = Yt), (n = e.alternate), (t = e.flags), e.tag)) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && n !== null) {
                (t = void 0),
                  (l = e),
                  (u = n.memoizedProps),
                  (n = n.memoizedState),
                  (a = l.stateNode);
                try {
                  var W = ql(l.type, u, l.elementType === l.type);
                  (t = a.getSnapshotBeforeUpdate(W, n)),
                    (a.__reactInternalSnapshotBeforeUpdate = t);
                } catch (J) {
                  vt(l, l.return, J);
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (
                  ((t = e.stateNode.containerInfo), (l = t.nodeType), l === 9)
                )
                  cf(t);
                else if (l === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      cf(t);
                      break;
                    default:
                      t.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((t & 1024) !== 0) throw Error(r(163));
          }
          if (((t = e.sibling), t !== null)) {
            (t.return = e.return), (Yt = t);
            break;
          }
          Yt = e.return;
        }
  }
  function vs(t, e, l) {
    var a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        cl(t, l), a & 4 && iu(5, l);
        break;
      case 1:
        if ((cl(t, l), a & 4))
          if (((t = l.stateNode), e === null))
            try {
              t.componentDidMount();
            } catch (i) {
              vt(l, l.return, i);
            }
          else {
            var u = ql(l.type, e.memoizedProps);
            e = e.memoizedState;
            try {
              t.componentDidUpdate(u, e, t.__reactInternalSnapshotBeforeUpdate);
            } catch (i) {
              vt(l, l.return, i);
            }
          }
        a & 64 && os(l), a & 512 && cu(l, l.return);
        break;
      case 3:
        if ((cl(t, l), a & 64 && ((t = l.updateQueue), t !== null))) {
          if (((e = null), l.child !== null))
            switch (l.child.tag) {
              case 27:
              case 5:
                e = l.child.stateNode;
                break;
              case 1:
                e = l.child.stateNode;
            }
          try {
            Wr(t, e);
          } catch (i) {
            vt(l, l.return, i);
          }
        }
        break;
      case 27:
        e === null && a & 4 && ms(l);
      case 26:
      case 5:
        cl(t, l), e === null && a & 4 && ds(l), a & 512 && cu(l, l.return);
        break;
      case 12:
        cl(t, l);
        break;
      case 13:
        cl(t, l),
          a & 4 && ps(t, l),
          a & 64 &&
            ((t = l.memoizedState),
            t !== null &&
              ((t = t.dehydrated),
              t !== null && ((l = V0.bind(null, l)), rm(t, l))));
        break;
      case 22:
        if (((a = l.memoizedState !== null || Qe), !a)) {
          (e = (e !== null && e.memoizedState !== null) || Dt), (u = Qe);
          var n = Dt;
          (Qe = a),
            (Dt = e) && !n ? fl(t, l, (l.subtreeFlags & 8772) !== 0) : cl(t, l),
            (Qe = u),
            (Dt = n);
        }
        break;
      case 30:
        break;
      default:
        cl(t, l);
    }
  }
  function gs(t) {
    var e = t.alternate;
    e !== null && ((t.alternate = null), gs(e)),
      (t.child = null),
      (t.deletions = null),
      (t.sibling = null),
      t.tag === 5 && ((e = t.stateNode), e !== null && si(e)),
      (t.stateNode = null),
      (t.return = null),
      (t.dependencies = null),
      (t.memoizedProps = null),
      (t.memoizedState = null),
      (t.pendingProps = null),
      (t.stateNode = null),
      (t.updateQueue = null);
  }
  var Et = null,
    Pt = !1;
  function Ze(t, e, l) {
    for (l = l.child; l !== null; ) Ss(t, e, l), (l = l.sibling);
  }
  function Ss(t, e, l) {
    if (ee && typeof ee.onCommitFiberUnmount == "function")
      try {
        ee.onCommitFiberUnmount(_a, l);
      } catch {}
    switch (l.tag) {
      case 26:
        Dt || Oe(l, e),
          Ze(t, e, l),
          l.memoizedState
            ? l.memoizedState.count--
            : l.stateNode && ((l = l.stateNode), l.parentNode.removeChild(l));
        break;
      case 27:
        Dt || Oe(l, e);
        var a = Et,
          u = Pt;
        ml(l.type) && ((Et = l.stateNode), (Pt = !1)),
          Ze(t, e, l),
          vu(l.stateNode),
          (Et = a),
          (Pt = u);
        break;
      case 5:
        Dt || Oe(l, e);
      case 6:
        if (
          ((a = Et),
          (u = Pt),
          (Et = null),
          Ze(t, e, l),
          (Et = a),
          (Pt = u),
          Et !== null)
        )
          if (Pt)
            try {
              (Et.nodeType === 9
                ? Et.body
                : Et.nodeName === "HTML"
                  ? Et.ownerDocument.body
                  : Et
              ).removeChild(l.stateNode);
            } catch (n) {
              vt(l, e, n);
            }
          else
            try {
              Et.removeChild(l.stateNode);
            } catch (n) {
              vt(l, e, n);
            }
        break;
      case 18:
        Et !== null &&
          (Pt
            ? ((t = Et),
              id(
                t.nodeType === 9
                  ? t.body
                  : t.nodeName === "HTML"
                    ? t.ownerDocument.body
                    : t,
                l.stateNode,
              ),
              Ru(t))
            : id(Et, l.stateNode));
        break;
      case 4:
        (a = Et),
          (u = Pt),
          (Et = l.stateNode.containerInfo),
          (Pt = !0),
          Ze(t, e, l),
          (Et = a),
          (Pt = u);
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Dt || il(2, l, e), Dt || il(4, l, e), Ze(t, e, l);
        break;
      case 1:
        Dt ||
          (Oe(l, e),
          (a = l.stateNode),
          typeof a.componentWillUnmount == "function" && ss(l, e, a)),
          Ze(t, e, l);
        break;
      case 21:
        Ze(t, e, l);
        break;
      case 22:
        (Dt = (a = Dt) || l.memoizedState !== null), Ze(t, e, l), (Dt = a);
        break;
      default:
        Ze(t, e, l);
    }
  }
  function ps(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate),
      t !== null &&
        ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
    )
      try {
        Ru(t);
      } catch (l) {
        vt(e, e.return, l);
      }
  }
  function Y0(t) {
    switch (t.tag) {
      case 13:
      case 19:
        var e = t.stateNode;
        return e === null && (e = t.stateNode = new ys()), e;
      case 22:
        return (
          (t = t.stateNode),
          (e = t._retryCache),
          e === null && (e = t._retryCache = new ys()),
          e
        );
      default:
        throw Error(r(435, t.tag));
    }
  }
  function Hc(t, e) {
    var l = Y0(t);
    e.forEach(function (a) {
      var u = K0.bind(null, t, a);
      l.has(a) || (l.add(a), a.then(u, u));
    });
  }
  function ne(t, e) {
    var l = e.deletions;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var u = l[a],
          n = t,
          i = e,
          f = i;
        t: for (; f !== null; ) {
          switch (f.tag) {
            case 27:
              if (ml(f.type)) {
                (Et = f.stateNode), (Pt = !1);
                break t;
              }
              break;
            case 5:
              (Et = f.stateNode), (Pt = !1);
              break t;
            case 3:
            case 4:
              (Et = f.stateNode.containerInfo), (Pt = !0);
              break t;
          }
          f = f.return;
        }
        if (Et === null) throw Error(r(160));
        Ss(n, i, u),
          (Et = null),
          (Pt = !1),
          (n = u.alternate),
          n !== null && (n.return = null),
          (u.return = null);
      }
    if (e.subtreeFlags & 13878)
      for (e = e.child; e !== null; ) bs(e, t), (e = e.sibling);
  }
  var Ee = null;
  function bs(t, e) {
    var l = t.alternate,
      a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ne(e, t),
          ie(t),
          a & 4 && (il(3, t, t.return), iu(3, t), il(5, t, t.return));
        break;
      case 1:
        ne(e, t),
          ie(t),
          a & 512 && (Dt || l === null || Oe(l, l.return)),
          a & 64 &&
            Qe &&
            ((t = t.updateQueue),
            t !== null &&
              ((a = t.callbacks),
              a !== null &&
                ((l = t.shared.hiddenCallbacks),
                (t.shared.hiddenCallbacks = l === null ? a : l.concat(a)))));
        break;
      case 26:
        var u = Ee;
        if (
          (ne(e, t),
          ie(t),
          a & 512 && (Dt || l === null || Oe(l, l.return)),
          a & 4)
        ) {
          var n = l !== null ? l.memoizedState : null;
          if (((a = t.memoizedState), l === null))
            if (a === null)
              if (t.stateNode === null) {
                t: {
                  (a = t.type),
                    (l = t.memoizedProps),
                    (u = u.ownerDocument || u);
                  e: switch (a) {
                    case "title":
                      (n = u.getElementsByTagName("title")[0]),
                        (!n ||
                          n[Ua] ||
                          n[wt] ||
                          n.namespaceURI === "http://www.w3.org/2000/svg" ||
                          n.hasAttribute("itemprop")) &&
                          ((n = u.createElement(a)),
                          u.head.insertBefore(
                            n,
                            u.querySelector("head > title"),
                          )),
                        Xt(n, a, l),
                        (n[wt] = t),
                        Bt(n),
                        (a = n);
                      break t;
                    case "link":
                      var i = md("link", "href", u).get(a + (l.href || ""));
                      if (i) {
                        for (var f = 0; f < i.length; f++)
                          if (
                            ((n = i[f]),
                            n.getAttribute("href") ===
                              (l.href == null || l.href === ""
                                ? null
                                : l.href) &&
                              n.getAttribute("rel") ===
                                (l.rel == null ? null : l.rel) &&
                              n.getAttribute("title") ===
                                (l.title == null ? null : l.title) &&
                              n.getAttribute("crossorigin") ===
                                (l.crossOrigin == null ? null : l.crossOrigin))
                          ) {
                            i.splice(f, 1);
                            break e;
                          }
                      }
                      (n = u.createElement(a)),
                        Xt(n, a, l),
                        u.head.appendChild(n);
                      break;
                    case "meta":
                      if (
                        (i = md("meta", "content", u).get(
                          a + (l.content || ""),
                        ))
                      ) {
                        for (f = 0; f < i.length; f++)
                          if (
                            ((n = i[f]),
                            n.getAttribute("content") ===
                              (l.content == null ? null : "" + l.content) &&
                              n.getAttribute("name") ===
                                (l.name == null ? null : l.name) &&
                              n.getAttribute("property") ===
                                (l.property == null ? null : l.property) &&
                              n.getAttribute("http-equiv") ===
                                (l.httpEquiv == null ? null : l.httpEquiv) &&
                              n.getAttribute("charset") ===
                                (l.charSet == null ? null : l.charSet))
                          ) {
                            i.splice(f, 1);
                            break e;
                          }
                      }
                      (n = u.createElement(a)),
                        Xt(n, a, l),
                        u.head.appendChild(n);
                      break;
                    default:
                      throw Error(r(468, a));
                  }
                  (n[wt] = t), Bt(n), (a = n);
                }
                t.stateNode = a;
              } else yd(u, t.type, t.stateNode);
            else t.stateNode = hd(u, a, t.memoizedProps);
          else
            n !== a
              ? (n === null
                  ? l.stateNode !== null &&
                    ((l = l.stateNode), l.parentNode.removeChild(l))
                  : n.count--,
                a === null
                  ? yd(u, t.type, t.stateNode)
                  : hd(u, a, t.memoizedProps))
              : a === null &&
                t.stateNode !== null &&
                Dc(t, t.memoizedProps, l.memoizedProps);
        }
        break;
      case 27:
        ne(e, t),
          ie(t),
          a & 512 && (Dt || l === null || Oe(l, l.return)),
          l !== null && a & 4 && Dc(t, t.memoizedProps, l.memoizedProps);
        break;
      case 5:
        if (
          (ne(e, t),
          ie(t),
          a & 512 && (Dt || l === null || Oe(l, l.return)),
          t.flags & 32)
        ) {
          u = t.stateNode;
          try {
            $l(u, "");
          } catch (A) {
            vt(t, t.return, A);
          }
        }
        a & 4 &&
          t.stateNode != null &&
          ((u = t.memoizedProps), Dc(t, u, l !== null ? l.memoizedProps : u)),
          a & 1024 && (Nc = !0);
        break;
      case 6:
        if ((ne(e, t), ie(t), a & 4)) {
          if (t.stateNode === null) throw Error(r(162));
          (a = t.memoizedProps), (l = t.stateNode);
          try {
            l.nodeValue = a;
          } catch (A) {
            vt(t, t.return, A);
          }
        }
        break;
      case 3:
        if (
          ((Gn = null),
          (u = Ee),
          (Ee = Ln(e.containerInfo)),
          ne(e, t),
          (Ee = u),
          ie(t),
          a & 4 && l !== null && l.memoizedState.isDehydrated)
        )
          try {
            Ru(e.containerInfo);
          } catch (A) {
            vt(t, t.return, A);
          }
        Nc && ((Nc = !1), Es(t));
        break;
      case 4:
        (a = Ee),
          (Ee = Ln(t.stateNode.containerInfo)),
          ne(e, t),
          ie(t),
          (Ee = a);
        break;
      case 12:
        ne(e, t), ie(t);
        break;
      case 13:
        ne(e, t),
          ie(t),
          t.child.flags & 8192 &&
            (t.memoizedState !== null) !=
              (l !== null && l.memoizedState !== null) &&
            (jc = Ae()),
          a & 4 &&
            ((a = t.updateQueue),
            a !== null && ((t.updateQueue = null), Hc(t, a)));
        break;
      case 22:
        u = t.memoizedState !== null;
        var d = l !== null && l.memoizedState !== null,
          E = Qe,
          O = Dt;
        if (
          ((Qe = E || u),
          (Dt = O || d),
          ne(e, t),
          (Dt = O),
          (Qe = E),
          ie(t),
          a & 8192)
        )
          t: for (
            e = t.stateNode,
              e._visibility = u ? e._visibility & -2 : e._visibility | 1,
              u && (l === null || d || Qe || Dt || Yl(t)),
              l = null,
              e = t;
            ;

          ) {
            if (e.tag === 5 || e.tag === 26) {
              if (l === null) {
                d = l = e;
                try {
                  if (((n = d.stateNode), u))
                    (i = n.style),
                      typeof i.setProperty == "function"
                        ? i.setProperty("display", "none", "important")
                        : (i.display = "none");
                  else {
                    f = d.stateNode;
                    var U = d.memoizedProps.style,
                      T =
                        U != null && U.hasOwnProperty("display")
                          ? U.display
                          : null;
                    f.style.display =
                      T == null || typeof T == "boolean" ? "" : ("" + T).trim();
                  }
                } catch (A) {
                  vt(d, d.return, A);
                }
              }
            } else if (e.tag === 6) {
              if (l === null) {
                d = e;
                try {
                  d.stateNode.nodeValue = u ? "" : d.memoizedProps;
                } catch (A) {
                  vt(d, d.return, A);
                }
              }
            } else if (
              ((e.tag !== 22 && e.tag !== 23) ||
                e.memoizedState === null ||
                e === t) &&
              e.child !== null
            ) {
              (e.child.return = e), (e = e.child);
              continue;
            }
            if (e === t) break t;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t) break t;
              l === e && (l = null), (e = e.return);
            }
            l === e && (l = null),
              (e.sibling.return = e.return),
              (e = e.sibling);
          }
        a & 4 &&
          ((a = t.updateQueue),
          a !== null &&
            ((l = a.retryQueue),
            l !== null && ((a.retryQueue = null), Hc(t, l))));
        break;
      case 19:
        ne(e, t),
          ie(t),
          a & 4 &&
            ((a = t.updateQueue),
            a !== null && ((t.updateQueue = null), Hc(t, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        ne(e, t), ie(t);
    }
  }
  function ie(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var l, a = t.return; a !== null; ) {
          if (hs(a)) {
            l = a;
            break;
          }
          a = a.return;
        }
        if (l == null) throw Error(r(160));
        switch (l.tag) {
          case 27:
            var u = l.stateNode,
              n = xc(t);
            zn(t, n, u);
            break;
          case 5:
            var i = l.stateNode;
            l.flags & 32 && ($l(i, ""), (l.flags &= -33));
            var f = xc(t);
            zn(t, f, i);
            break;
          case 3:
          case 4:
            var d = l.stateNode.containerInfo,
              E = xc(t);
            Uc(t, E, d);
            break;
          default:
            throw Error(r(161));
        }
      } catch (O) {
        vt(t, t.return, O);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function Es(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        Es(e),
          e.tag === 5 && e.flags & 1024 && e.stateNode.reset(),
          (t = t.sibling);
      }
  }
  function cl(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; ) vs(t, e.alternate, e), (e = e.sibling);
  }
  function Yl(t) {
    for (t = t.child; t !== null; ) {
      var e = t;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          il(4, e, e.return), Yl(e);
          break;
        case 1:
          Oe(e, e.return);
          var l = e.stateNode;
          typeof l.componentWillUnmount == "function" && ss(e, e.return, l),
            Yl(e);
          break;
        case 27:
          vu(e.stateNode);
        case 26:
        case 5:
          Oe(e, e.return), Yl(e);
          break;
        case 22:
          e.memoizedState === null && Yl(e);
          break;
        case 30:
          Yl(e);
          break;
        default:
          Yl(e);
      }
      t = t.sibling;
    }
  }
  function fl(t, e, l) {
    for (l = l && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var a = e.alternate,
        u = t,
        n = e,
        i = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          fl(u, n, l), iu(4, n);
          break;
        case 1:
          if (
            (fl(u, n, l),
            (a = n),
            (u = a.stateNode),
            typeof u.componentDidMount == "function")
          )
            try {
              u.componentDidMount();
            } catch (E) {
              vt(a, a.return, E);
            }
          if (((a = n), (u = a.updateQueue), u !== null)) {
            var f = a.stateNode;
            try {
              var d = u.shared.hiddenCallbacks;
              if (d !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < d.length; u++)
                  kr(d[u], f);
            } catch (E) {
              vt(a, a.return, E);
            }
          }
          l && i & 64 && os(n), cu(n, n.return);
          break;
        case 27:
          ms(n);
        case 26:
        case 5:
          fl(u, n, l), l && a === null && i & 4 && ds(n), cu(n, n.return);
          break;
        case 12:
          fl(u, n, l);
          break;
        case 13:
          fl(u, n, l), l && i & 4 && ps(u, n);
          break;
        case 22:
          n.memoizedState === null && fl(u, n, l), cu(n, n.return);
          break;
        case 30:
          break;
        default:
          fl(u, n, l);
      }
      e = e.sibling;
    }
  }
  function Cc(t, e) {
    var l = null;
    t !== null &&
      t.memoizedState !== null &&
      t.memoizedState.cachePool !== null &&
      (l = t.memoizedState.cachePool.pool),
      (t = null),
      e.memoizedState !== null &&
        e.memoizedState.cachePool !== null &&
        (t = e.memoizedState.cachePool.pool),
      t !== l && (t != null && t.refCount++, l != null && Ka(l));
  }
  function Bc(t, e) {
    (t = null),
      e.alternate !== null && (t = e.alternate.memoizedState.cache),
      (e = e.memoizedState.cache),
      e !== t && (e.refCount++, t != null && Ka(t));
  }
  function Me(t, e, l, a) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) Ts(t, e, l, a), (e = e.sibling);
  }
  function Ts(t, e, l, a) {
    var u = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Me(t, e, l, a), u & 2048 && iu(9, e);
        break;
      case 1:
        Me(t, e, l, a);
        break;
      case 3:
        Me(t, e, l, a),
          u & 2048 &&
            ((t = null),
            e.alternate !== null && (t = e.alternate.memoizedState.cache),
            (e = e.memoizedState.cache),
            e !== t && (e.refCount++, t != null && Ka(t)));
        break;
      case 12:
        if (u & 2048) {
          Me(t, e, l, a), (t = e.stateNode);
          try {
            var n = e.memoizedProps,
              i = n.id,
              f = n.onPostCommit;
            typeof f == "function" &&
              f(
                i,
                e.alternate === null ? "mount" : "update",
                t.passiveEffectDuration,
                -0,
              );
          } catch (d) {
            vt(e, e.return, d);
          }
        } else Me(t, e, l, a);
        break;
      case 13:
        Me(t, e, l, a);
        break;
      case 23:
        break;
      case 22:
        (n = e.stateNode),
          (i = e.alternate),
          e.memoizedState !== null
            ? n._visibility & 2
              ? Me(t, e, l, a)
              : fu(t, e)
            : n._visibility & 2
              ? Me(t, e, l, a)
              : ((n._visibility |= 2),
                ha(t, e, l, a, (e.subtreeFlags & 10256) !== 0)),
          u & 2048 && Cc(i, e);
        break;
      case 24:
        Me(t, e, l, a), u & 2048 && Bc(e.alternate, e);
        break;
      default:
        Me(t, e, l, a);
    }
  }
  function ha(t, e, l, a, u) {
    for (u = u && (e.subtreeFlags & 10256) !== 0, e = e.child; e !== null; ) {
      var n = t,
        i = e,
        f = l,
        d = a,
        E = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          ha(n, i, f, d, u), iu(8, i);
          break;
        case 23:
          break;
        case 22:
          var O = i.stateNode;
          i.memoizedState !== null
            ? O._visibility & 2
              ? ha(n, i, f, d, u)
              : fu(n, i)
            : ((O._visibility |= 2), ha(n, i, f, d, u)),
            u && E & 2048 && Cc(i.alternate, i);
          break;
        case 24:
          ha(n, i, f, d, u), u && E & 2048 && Bc(i.alternate, i);
          break;
        default:
          ha(n, i, f, d, u);
      }
      e = e.sibling;
    }
  }
  function fu(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var l = t,
          a = e,
          u = a.flags;
        switch (a.tag) {
          case 22:
            fu(l, a), u & 2048 && Cc(a.alternate, a);
            break;
          case 24:
            fu(l, a), u & 2048 && Bc(a.alternate, a);
            break;
          default:
            fu(l, a);
        }
        e = e.sibling;
      }
  }
  var ru = 8192;
  function ma(t) {
    if (t.subtreeFlags & ru)
      for (t = t.child; t !== null; ) As(t), (t = t.sibling);
  }
  function As(t) {
    switch (t.tag) {
      case 26:
        ma(t),
          t.flags & ru &&
            t.memoizedState !== null &&
            Tm(Ee, t.memoizedState, t.memoizedProps);
        break;
      case 5:
        ma(t);
        break;
      case 3:
      case 4:
        var e = Ee;
        (Ee = Ln(t.stateNode.containerInfo)), ma(t), (Ee = e);
        break;
      case 22:
        t.memoizedState === null &&
          ((e = t.alternate),
          e !== null && e.memoizedState !== null
            ? ((e = ru), (ru = 16777216), ma(t), (ru = e))
            : ma(t));
        break;
      default:
        ma(t);
    }
  }
  function Rs(t) {
    var e = t.alternate;
    if (e !== null && ((t = e.child), t !== null)) {
      e.child = null;
      do (e = t.sibling), (t.sibling = null), (t = e);
      while (t !== null);
    }
  }
  function ou(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var a = e[l];
          (Yt = a), Os(a, t);
        }
      Rs(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) zs(t), (t = t.sibling);
  }
  function zs(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        ou(t), t.flags & 2048 && il(9, t, t.return);
        break;
      case 3:
        ou(t);
        break;
      case 12:
        ou(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null &&
        e._visibility & 2 &&
        (t.return === null || t.return.tag !== 13)
          ? ((e._visibility &= -3), On(t))
          : ou(t);
        break;
      default:
        ou(t);
    }
  }
  function On(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var a = e[l];
          (Yt = a), Os(a, t);
        }
      Rs(t);
    }
    for (t = t.child; t !== null; ) {
      switch (((e = t), e.tag)) {
        case 0:
        case 11:
        case 15:
          il(8, e, e.return), On(e);
          break;
        case 22:
          (l = e.stateNode),
            l._visibility & 2 && ((l._visibility &= -3), On(e));
          break;
        default:
          On(e);
      }
      t = t.sibling;
    }
  }
  function Os(t, e) {
    for (; Yt !== null; ) {
      var l = Yt;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          il(8, l, e);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var a = l.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Ka(l.memoizedState.cache);
      }
      if (((a = l.child), a !== null)) (a.return = l), (Yt = a);
      else
        t: for (l = t; Yt !== null; ) {
          a = Yt;
          var u = a.sibling,
            n = a.return;
          if ((gs(a), a === l)) {
            Yt = null;
            break t;
          }
          if (u !== null) {
            (u.return = n), (Yt = u);
            break t;
          }
          Yt = n;
        }
    }
  }
  var L0 = {
      getCacheForType: function (t) {
        var e = Vt(Ht),
          l = e.data.get(t);
        return l === void 0 && ((l = t()), e.data.set(t, l)), l;
      },
    },
    j0 = typeof WeakMap == "function" ? WeakMap : Map,
    ot = 0,
    St = null,
    at = null,
    nt = 0,
    st = 0,
    ce = null,
    rl = !1,
    ya = !1,
    qc = !1,
    we = 0,
    Ot = 0,
    ol = 0,
    Ll = 0,
    Yc = 0,
    Se = 0,
    va = 0,
    su = null,
    It = null,
    Lc = !1,
    jc = 0,
    Mn = 1 / 0,
    _n = null,
    sl = null,
    Gt = 0,
    dl = null,
    ga = null,
    Sa = 0,
    Gc = 0,
    Xc = null,
    Ms = null,
    du = 0,
    Qc = null;
  function fe() {
    if ((ot & 2) !== 0 && nt !== 0) return nt & -nt;
    if (_.T !== null) {
      var t = na;
      return t !== 0 ? t : kc();
    }
    return Qf();
  }
  function _s() {
    Se === 0 && (Se = (nt & 536870912) === 0 || rt ? Lf() : 536870912);
    var t = ge.current;
    return t !== null && (t.flags |= 32), Se;
  }
  function re(t, e, l) {
    ((t === St && (st === 2 || st === 9)) || t.cancelPendingCommit !== null) &&
      (pa(t, 0), hl(t, nt, Se, !1)),
      xa(t, l),
      ((ot & 2) === 0 || t !== St) &&
        (t === St &&
          ((ot & 2) === 0 && (Ll |= l), Ot === 4 && hl(t, nt, Se, !1)),
        _e(t));
  }
  function Ds(t, e, l) {
    if ((ot & 6) !== 0) throw Error(r(327));
    var a = (!l && (e & 124) === 0 && (e & t.expiredLanes) === 0) || Da(t, e),
      u = a ? Q0(t, e) : Vc(t, e, !0),
      n = a;
    do {
      if (u === 0) {
        ya && !a && hl(t, e, 0, !1);
        break;
      } else {
        if (((l = t.current.alternate), n && !G0(l))) {
          (u = Vc(t, e, !1)), (n = !1);
          continue;
        }
        if (u === 2) {
          if (((n = e), t.errorRecoveryDisabledLanes & n)) var i = 0;
          else
            (i = t.pendingLanes & -536870913),
              (i = i !== 0 ? i : i & 536870912 ? 536870912 : 0);
          if (i !== 0) {
            e = i;
            t: {
              var f = t;
              u = su;
              var d = f.current.memoizedState.isDehydrated;
              if ((d && (pa(f, i).flags |= 256), (i = Vc(f, i, !1)), i !== 2)) {
                if (qc && !d) {
                  (f.errorRecoveryDisabledLanes |= n), (Ll |= n), (u = 4);
                  break t;
                }
                (n = It),
                  (It = u),
                  n !== null && (It === null ? (It = n) : It.push.apply(It, n));
              }
              u = i;
            }
            if (((n = !1), u !== 2)) continue;
          }
        }
        if (u === 1) {
          pa(t, 0), hl(t, e, 0, !0);
          break;
        }
        t: {
          switch (((a = t), (n = u), n)) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((e & 4194048) !== e) break;
            case 6:
              hl(a, e, Se, !rl);
              break t;
            case 2:
              It = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((e & 62914560) === e && ((u = jc + 300 - Ae()), 10 < u)) {
            if ((hl(a, e, Se, !rl), Lu(a, 0, !0) !== 0)) break t;
            a.timeoutHandle = ud(
              xs.bind(null, a, l, It, _n, Lc, e, Se, Ll, va, rl, n, 2, -0, 0),
              u,
            );
            break t;
          }
          xs(a, l, It, _n, Lc, e, Se, Ll, va, rl, n, 0, -0, 0);
        }
      }
      break;
    } while (!0);
    _e(t);
  }
  function xs(t, e, l, a, u, n, i, f, d, E, O, U, T, A) {
    if (
      ((t.timeoutHandle = -1),
      (U = e.subtreeFlags),
      (U & 8192 || (U & 16785408) === 16785408) &&
        ((pu = { stylesheets: null, count: 0, unsuspend: Em }),
        As(e),
        (U = Am()),
        U !== null))
    ) {
      (t.cancelPendingCommit = U(
        Ys.bind(null, t, e, n, l, a, u, i, f, d, O, 1, T, A),
      )),
        hl(t, n, i, !E);
      return;
    }
    Ys(t, e, n, l, a, u, i, f, d);
  }
  function G0(t) {
    for (var e = t; ; ) {
      var l = e.tag;
      if (
        (l === 0 || l === 11 || l === 15) &&
        e.flags & 16384 &&
        ((l = e.updateQueue), l !== null && ((l = l.stores), l !== null))
      )
        for (var a = 0; a < l.length; a++) {
          var u = l[a],
            n = u.getSnapshot;
          u = u.value;
          try {
            if (!ae(n(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (((l = e.child), e.subtreeFlags & 16384 && l !== null))
        (l.return = e), (e = l);
      else {
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return !0;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    }
    return !0;
  }
  function hl(t, e, l, a) {
    (e &= ~Yc),
      (e &= ~Ll),
      (t.suspendedLanes |= e),
      (t.pingedLanes &= ~e),
      a && (t.warmLanes |= e),
      (a = t.expirationTimes);
    for (var u = e; 0 < u; ) {
      var n = 31 - le(u),
        i = 1 << n;
      (a[n] = -1), (u &= ~i);
    }
    l !== 0 && Gf(t, l, e);
  }
  function Dn() {
    return (ot & 6) === 0 ? (hu(0), !1) : !0;
  }
  function Zc() {
    if (at !== null) {
      if (st === 0) var t = at.return;
      else (t = at), (qe = Nl = null), ic(t), (sa = null), (au = 0), (t = at);
      for (; t !== null; ) rs(t.alternate, t), (t = t.return);
      at = null;
    }
  }
  function pa(t, e) {
    var l = t.timeoutHandle;
    l !== -1 && ((t.timeoutHandle = -1), um(l)),
      (l = t.cancelPendingCommit),
      l !== null && ((t.cancelPendingCommit = null), l()),
      Zc(),
      (St = t),
      (at = l = He(t.current, null)),
      (nt = e),
      (st = 0),
      (ce = null),
      (rl = !1),
      (ya = Da(t, e)),
      (qc = !1),
      (va = Se = Yc = Ll = ol = Ot = 0),
      (It = su = null),
      (Lc = !1),
      (e & 8) !== 0 && (e |= e & 32);
    var a = t.entangledLanes;
    if (a !== 0)
      for (t = t.entanglements, a &= e; 0 < a; ) {
        var u = 31 - le(a),
          n = 1 << u;
        (e |= t[u]), (a &= ~n);
      }
    return (we = e), Wu(), l;
  }
  function Us(t, e) {
    (et = null),
      (_.H = vn),
      e === $a || e === nn
        ? ((e = Jr()), (st = 3))
        : e === wr
          ? ((e = Jr()), (st = 4))
          : (st =
              e === ko
                ? 8
                : e !== null &&
                    typeof e == "object" &&
                    typeof e.then == "function"
                  ? 6
                  : 1),
      (ce = e),
      at === null && ((Ot = 1), En(t, he(e, t.current)));
  }
  function Ns() {
    var t = _.H;
    return (_.H = vn), t === null ? vn : t;
  }
  function Hs() {
    var t = _.A;
    return (_.A = L0), t;
  }
  function wc() {
    (Ot = 4),
      rl || ((nt & 4194048) !== nt && ge.current !== null) || (ya = !0),
      ((ol & 134217727) === 0 && (Ll & 134217727) === 0) ||
        St === null ||
        hl(St, nt, Se, !1);
  }
  function Vc(t, e, l) {
    var a = ot;
    ot |= 2;
    var u = Ns(),
      n = Hs();
    (St !== t || nt !== e) && ((_n = null), pa(t, e)), (e = !1);
    var i = Ot;
    t: do
      try {
        if (st !== 0 && at !== null) {
          var f = at,
            d = ce;
          switch (st) {
            case 8:
              Zc(), (i = 6);
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              ge.current === null && (e = !0);
              var E = st;
              if (((st = 0), (ce = null), ba(t, f, d, E), l && ya)) {
                i = 0;
                break t;
              }
              break;
            default:
              (E = st), (st = 0), (ce = null), ba(t, f, d, E);
          }
        }
        X0(), (i = Ot);
        break;
      } catch (O) {
        Us(t, O);
      }
    while (!0);
    return (
      e && t.shellSuspendCounter++,
      (qe = Nl = null),
      (ot = a),
      (_.H = u),
      (_.A = n),
      at === null && ((St = null), (nt = 0), Wu()),
      i
    );
  }
  function X0() {
    for (; at !== null; ) Cs(at);
  }
  function Q0(t, e) {
    var l = ot;
    ot |= 2;
    var a = Ns(),
      u = Hs();
    St !== t || nt !== e
      ? ((_n = null), (Mn = Ae() + 500), pa(t, e))
      : (ya = Da(t, e));
    t: do
      try {
        if (st !== 0 && at !== null) {
          e = at;
          var n = ce;
          e: switch (st) {
            case 1:
              (st = 0), (ce = null), ba(t, e, n, 1);
              break;
            case 2:
            case 9:
              if (Vr(n)) {
                (st = 0), (ce = null), Bs(e);
                break;
              }
              (e = function () {
                (st !== 2 && st !== 9) || St !== t || (st = 7), _e(t);
              }),
                n.then(e, e);
              break t;
            case 3:
              st = 7;
              break t;
            case 4:
              st = 5;
              break t;
            case 7:
              Vr(n)
                ? ((st = 0), (ce = null), Bs(e))
                : ((st = 0), (ce = null), ba(t, e, n, 7));
              break;
            case 5:
              var i = null;
              switch (at.tag) {
                case 26:
                  i = at.memoizedState;
                case 5:
                case 27:
                  var f = at;
                  if (!i || vd(i)) {
                    (st = 0), (ce = null);
                    var d = f.sibling;
                    if (d !== null) at = d;
                    else {
                      var E = f.return;
                      E !== null ? ((at = E), xn(E)) : (at = null);
                    }
                    break e;
                  }
              }
              (st = 0), (ce = null), ba(t, e, n, 5);
              break;
            case 6:
              (st = 0), (ce = null), ba(t, e, n, 6);
              break;
            case 8:
              Zc(), (Ot = 6);
              break t;
            default:
              throw Error(r(462));
          }
        }
        Z0();
        break;
      } catch (O) {
        Us(t, O);
      }
    while (!0);
    return (
      (qe = Nl = null),
      (_.H = a),
      (_.A = u),
      (ot = l),
      at !== null ? 0 : ((St = null), (nt = 0), Wu(), Ot)
    );
  }
  function Z0() {
    for (; at !== null && !sh(); ) Cs(at);
  }
  function Cs(t) {
    var e = cs(t.alternate, t, we);
    (t.memoizedProps = t.pendingProps), e === null ? xn(t) : (at = e);
  }
  function Bs(t) {
    var e = t,
      l = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = es(l, e, e.pendingProps, e.type, void 0, nt);
        break;
      case 11:
        e = es(l, e, e.pendingProps, e.type.render, e.ref, nt);
        break;
      case 5:
        ic(e);
      default:
        rs(l, e), (e = at = Br(e, we)), (e = cs(l, e, we));
    }
    (t.memoizedProps = t.pendingProps), e === null ? xn(t) : (at = e);
  }
  function ba(t, e, l, a) {
    (qe = Nl = null), ic(e), (sa = null), (au = 0);
    var u = e.return;
    try {
      if (N0(t, u, e, l, nt)) {
        (Ot = 1), En(t, he(l, t.current)), (at = null);
        return;
      }
    } catch (n) {
      if (u !== null) throw ((at = u), n);
      (Ot = 1), En(t, he(l, t.current)), (at = null);
      return;
    }
    e.flags & 32768
      ? (rt || a === 1
          ? (t = !0)
          : ya || (nt & 536870912) !== 0
            ? (t = !1)
            : ((rl = t = !0),
              (a === 2 || a === 9 || a === 3 || a === 6) &&
                ((a = ge.current),
                a !== null && a.tag === 13 && (a.flags |= 16384))),
        qs(e, t))
      : xn(e);
  }
  function xn(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        qs(e, rl);
        return;
      }
      t = e.return;
      var l = C0(e.alternate, e, we);
      if (l !== null) {
        at = l;
        return;
      }
      if (((e = e.sibling), e !== null)) {
        at = e;
        return;
      }
      at = e = t;
    } while (e !== null);
    Ot === 0 && (Ot = 5);
  }
  function qs(t, e) {
    do {
      var l = B0(t.alternate, t);
      if (l !== null) {
        (l.flags &= 32767), (at = l);
        return;
      }
      if (
        ((l = t.return),
        l !== null &&
          ((l.flags |= 32768), (l.subtreeFlags = 0), (l.deletions = null)),
        !e && ((t = t.sibling), t !== null))
      ) {
        at = t;
        return;
      }
      at = t = l;
    } while (t !== null);
    (Ot = 6), (at = null);
  }
  function Ys(t, e, l, a, u, n, i, f, d) {
    t.cancelPendingCommit = null;
    do Un();
    while (Gt !== 0);
    if ((ot & 6) !== 0) throw Error(r(327));
    if (e !== null) {
      if (e === t.current) throw Error(r(177));
      if (
        ((n = e.lanes | e.childLanes),
        (n |= Bi),
        Eh(t, l, n, i, f, d),
        t === St && ((at = St = null), (nt = 0)),
        (ga = e),
        (dl = t),
        (Sa = l),
        (Gc = n),
        (Xc = u),
        (Ms = a),
        (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
          ? ((t.callbackNode = null),
            (t.callbackPriority = 0),
            J0(Bu, function () {
              return Qs(), null;
            }))
          : ((t.callbackNode = null), (t.callbackPriority = 0)),
        (a = (e.flags & 13878) !== 0),
        (e.subtreeFlags & 13878) !== 0 || a)
      ) {
        (a = _.T), (_.T = null), (u = j.p), (j.p = 2), (i = ot), (ot |= 4);
        try {
          q0(t, e, l);
        } finally {
          (ot = i), (j.p = u), (_.T = a);
        }
      }
      (Gt = 1), Ls(), js(), Gs();
    }
  }
  function Ls() {
    if (Gt === 1) {
      Gt = 0;
      var t = dl,
        e = ga,
        l = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || l) {
        (l = _.T), (_.T = null);
        var a = j.p;
        j.p = 2;
        var u = ot;
        ot |= 4;
        try {
          bs(e, t);
          var n = af,
            i = zr(t.containerInfo),
            f = n.focusedElem,
            d = n.selectionRange;
          if (
            i !== f &&
            f &&
            f.ownerDocument &&
            Rr(f.ownerDocument.documentElement, f)
          ) {
            if (d !== null && xi(f)) {
              var E = d.start,
                O = d.end;
              if ((O === void 0 && (O = E), "selectionStart" in f))
                (f.selectionStart = E),
                  (f.selectionEnd = Math.min(O, f.value.length));
              else {
                var U = f.ownerDocument || document,
                  T = (U && U.defaultView) || window;
                if (T.getSelection) {
                  var A = T.getSelection(),
                    W = f.textContent.length,
                    J = Math.min(d.start, W),
                    mt = d.end === void 0 ? J : Math.min(d.end, W);
                  !A.extend && J > mt && ((i = mt), (mt = J), (J = i));
                  var S = Ar(f, J),
                    v = Ar(f, mt);
                  if (
                    S &&
                    v &&
                    (A.rangeCount !== 1 ||
                      A.anchorNode !== S.node ||
                      A.anchorOffset !== S.offset ||
                      A.focusNode !== v.node ||
                      A.focusOffset !== v.offset)
                  ) {
                    var b = U.createRange();
                    b.setStart(S.node, S.offset),
                      A.removeAllRanges(),
                      J > mt
                        ? (A.addRange(b), A.extend(v.node, v.offset))
                        : (b.setEnd(v.node, v.offset), A.addRange(b));
                  }
                }
              }
            }
            for (U = [], A = f; (A = A.parentNode); )
              A.nodeType === 1 &&
                U.push({ element: A, left: A.scrollLeft, top: A.scrollTop });
            for (
              typeof f.focus == "function" && f.focus(), f = 0;
              f < U.length;
              f++
            ) {
              var D = U[f];
              (D.element.scrollLeft = D.left), (D.element.scrollTop = D.top);
            }
          }
          (Zn = !!lf), (af = lf = null);
        } finally {
          (ot = u), (j.p = a), (_.T = l);
        }
      }
      (t.current = e), (Gt = 2);
    }
  }
  function js() {
    if (Gt === 2) {
      Gt = 0;
      var t = dl,
        e = ga,
        l = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || l) {
        (l = _.T), (_.T = null);
        var a = j.p;
        j.p = 2;
        var u = ot;
        ot |= 4;
        try {
          vs(t, e.alternate, e);
        } finally {
          (ot = u), (j.p = a), (_.T = l);
        }
      }
      Gt = 3;
    }
  }
  function Gs() {
    if (Gt === 4 || Gt === 3) {
      (Gt = 0), dh();
      var t = dl,
        e = ga,
        l = Sa,
        a = Ms;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
        ? (Gt = 5)
        : ((Gt = 0), (ga = dl = null), Xs(t, t.pendingLanes));
      var u = t.pendingLanes;
      if (
        (u === 0 && (sl = null),
        ri(l),
        (e = e.stateNode),
        ee && typeof ee.onCommitFiberRoot == "function")
      )
        try {
          ee.onCommitFiberRoot(_a, e, void 0, (e.current.flags & 128) === 128);
        } catch {}
      if (a !== null) {
        (e = _.T), (u = j.p), (j.p = 2), (_.T = null);
        try {
          for (var n = t.onRecoverableError, i = 0; i < a.length; i++) {
            var f = a[i];
            n(f.value, { componentStack: f.stack });
          }
        } finally {
          (_.T = e), (j.p = u);
        }
      }
      (Sa & 3) !== 0 && Un(),
        _e(t),
        (u = t.pendingLanes),
        (l & 4194090) !== 0 && (u & 42) !== 0
          ? t === Qc
            ? du++
            : ((du = 0), (Qc = t))
          : (du = 0),
        hu(0);
    }
  }
  function Xs(t, e) {
    (t.pooledCacheLanes &= e) === 0 &&
      ((e = t.pooledCache), e != null && ((t.pooledCache = null), Ka(e)));
  }
  function Un(t) {
    return Ls(), js(), Gs(), Qs();
  }
  function Qs() {
    if (Gt !== 5) return !1;
    var t = dl,
      e = Gc;
    Gc = 0;
    var l = ri(Sa),
      a = _.T,
      u = j.p;
    try {
      (j.p = 32 > l ? 32 : l), (_.T = null), (l = Xc), (Xc = null);
      var n = dl,
        i = Sa;
      if (((Gt = 0), (ga = dl = null), (Sa = 0), (ot & 6) !== 0))
        throw Error(r(331));
      var f = ot;
      if (
        ((ot |= 4),
        zs(n.current),
        Ts(n, n.current, i, l),
        (ot = f),
        hu(0, !1),
        ee && typeof ee.onPostCommitFiberRoot == "function")
      )
        try {
          ee.onPostCommitFiberRoot(_a, n);
        } catch {}
      return !0;
    } finally {
      (j.p = u), (_.T = a), Xs(t, e);
    }
  }
  function Zs(t, e, l) {
    (e = he(l, e)),
      (e = bc(t.stateNode, e, 2)),
      (t = ll(t, e, 2)),
      t !== null && (xa(t, 2), _e(t));
  }
  function vt(t, e, l) {
    if (t.tag === 3) Zs(t, t, l);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          Zs(e, t, l);
          break;
        } else if (e.tag === 1) {
          var a = e.stateNode;
          if (
            typeof e.type.getDerivedStateFromError == "function" ||
            (typeof a.componentDidCatch == "function" &&
              (sl === null || !sl.has(a)))
          ) {
            (t = he(l, t)),
              (l = Jo(2)),
              (a = ll(e, l, 2)),
              a !== null && ($o(l, a, e, t), xa(a, 2), _e(a));
            break;
          }
        }
        e = e.return;
      }
  }
  function Kc(t, e, l) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new j0();
      var u = new Set();
      a.set(e, u);
    } else (u = a.get(e)), u === void 0 && ((u = new Set()), a.set(e, u));
    u.has(l) ||
      ((qc = !0), u.add(l), (t = w0.bind(null, t, e, l)), e.then(t, t));
  }
  function w0(t, e, l) {
    var a = t.pingCache;
    a !== null && a.delete(e),
      (t.pingedLanes |= t.suspendedLanes & l),
      (t.warmLanes &= ~l),
      St === t &&
        (nt & l) === l &&
        (Ot === 4 || (Ot === 3 && (nt & 62914560) === nt && 300 > Ae() - jc)
          ? (ot & 2) === 0 && pa(t, 0)
          : (Yc |= l),
        va === nt && (va = 0)),
      _e(t);
  }
  function ws(t, e) {
    e === 0 && (e = jf()), (t = ea(t, e)), t !== null && (xa(t, e), _e(t));
  }
  function V0(t) {
    var e = t.memoizedState,
      l = 0;
    e !== null && (l = e.retryLane), ws(t, l);
  }
  function K0(t, e) {
    var l = 0;
    switch (t.tag) {
      case 13:
        var a = t.stateNode,
          u = t.memoizedState;
        u !== null && (l = u.retryLane);
        break;
      case 19:
        a = t.stateNode;
        break;
      case 22:
        a = t.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    a !== null && a.delete(e), ws(t, l);
  }
  function J0(t, e) {
    return ni(t, e);
  }
  var Nn = null,
    Ea = null,
    Jc = !1,
    Hn = !1,
    $c = !1,
    jl = 0;
  function _e(t) {
    t !== Ea &&
      t.next === null &&
      (Ea === null ? (Nn = Ea = t) : (Ea = Ea.next = t)),
      (Hn = !0),
      Jc || ((Jc = !0), k0());
  }
  function hu(t, e) {
    if (!$c && Hn) {
      $c = !0;
      do
        for (var l = !1, a = Nn; a !== null; ) {
          if (t !== 0) {
            var u = a.pendingLanes;
            if (u === 0) var n = 0;
            else {
              var i = a.suspendedLanes,
                f = a.pingedLanes;
              (n = (1 << (31 - le(42 | t) + 1)) - 1),
                (n &= u & ~(i & ~f)),
                (n = n & 201326741 ? (n & 201326741) | 1 : n ? n | 2 : 0);
            }
            n !== 0 && ((l = !0), $s(a, n));
          } else
            (n = nt),
              (n = Lu(
                a,
                a === St ? n : 0,
                a.cancelPendingCommit !== null || a.timeoutHandle !== -1,
              )),
              (n & 3) === 0 || Da(a, n) || ((l = !0), $s(a, n));
          a = a.next;
        }
      while (l);
      $c = !1;
    }
  }
  function $0() {
    Vs();
  }
  function Vs() {
    Hn = Jc = !1;
    var t = 0;
    jl !== 0 && (am() && (t = jl), (jl = 0));
    for (var e = Ae(), l = null, a = Nn; a !== null; ) {
      var u = a.next,
        n = Ks(a, e);
      n === 0
        ? ((a.next = null),
          l === null ? (Nn = u) : (l.next = u),
          u === null && (Ea = l))
        : ((l = a), (t !== 0 || (n & 3) !== 0) && (Hn = !0)),
        (a = u);
    }
    hu(t);
  }
  function Ks(t, e) {
    for (
      var l = t.suspendedLanes,
        a = t.pingedLanes,
        u = t.expirationTimes,
        n = t.pendingLanes & -62914561;
      0 < n;

    ) {
      var i = 31 - le(n),
        f = 1 << i,
        d = u[i];
      d === -1
        ? ((f & l) === 0 || (f & a) !== 0) && (u[i] = bh(f, e))
        : d <= e && (t.expiredLanes |= f),
        (n &= ~f);
    }
    if (
      ((e = St),
      (l = nt),
      (l = Lu(
        t,
        t === e ? l : 0,
        t.cancelPendingCommit !== null || t.timeoutHandle !== -1,
      )),
      (a = t.callbackNode),
      l === 0 ||
        (t === e && (st === 2 || st === 9)) ||
        t.cancelPendingCommit !== null)
    )
      return (
        a !== null && a !== null && ii(a),
        (t.callbackNode = null),
        (t.callbackPriority = 0)
      );
    if ((l & 3) === 0 || Da(t, l)) {
      if (((e = l & -l), e === t.callbackPriority)) return e;
      switch ((a !== null && ii(a), ri(l))) {
        case 2:
        case 8:
          l = qf;
          break;
        case 32:
          l = Bu;
          break;
        case 268435456:
          l = Yf;
          break;
        default:
          l = Bu;
      }
      return (
        (a = Js.bind(null, t)),
        (l = ni(l, a)),
        (t.callbackPriority = e),
        (t.callbackNode = l),
        e
      );
    }
    return (
      a !== null && a !== null && ii(a),
      (t.callbackPriority = 2),
      (t.callbackNode = null),
      2
    );
  }
  function Js(t, e) {
    if (Gt !== 0 && Gt !== 5)
      return (t.callbackNode = null), (t.callbackPriority = 0), null;
    var l = t.callbackNode;
    if (Un() && t.callbackNode !== l) return null;
    var a = nt;
    return (
      (a = Lu(
        t,
        t === St ? a : 0,
        t.cancelPendingCommit !== null || t.timeoutHandle !== -1,
      )),
      a === 0
        ? null
        : (Ds(t, a, e),
          Ks(t, Ae()),
          t.callbackNode != null && t.callbackNode === l
            ? Js.bind(null, t)
            : null)
    );
  }
  function $s(t, e) {
    if (Un()) return null;
    Ds(t, e, !0);
  }
  function k0() {
    nm(function () {
      (ot & 6) !== 0 ? ni(Bf, $0) : Vs();
    });
  }
  function kc() {
    return jl === 0 && (jl = Lf()), jl;
  }
  function ks(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean"
      ? null
      : typeof t == "function"
        ? t
        : Zu("" + t);
  }
  function Ws(t, e) {
    var l = e.ownerDocument.createElement("input");
    return (
      (l.name = e.name),
      (l.value = e.value),
      t.id && l.setAttribute("form", t.id),
      e.parentNode.insertBefore(l, e),
      (t = new FormData(t)),
      l.parentNode.removeChild(l),
      t
    );
  }
  function W0(t, e, l, a, u) {
    if (e === "submit" && l && l.stateNode === u) {
      var n = ks((u[kt] || null).action),
        i = a.submitter;
      i &&
        ((e = (e = i[kt] || null)
          ? ks(e.formAction)
          : i.getAttribute("formAction")),
        e !== null && ((n = e), (i = null)));
      var f = new Ju("action", "action", null, a, u);
      t.push({
        event: f,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (a.defaultPrevented) {
                if (jl !== 0) {
                  var d = i ? Ws(u, i) : new FormData(u);
                  yc(
                    l,
                    { pending: !0, data: d, method: u.method, action: n },
                    null,
                    d,
                  );
                }
              } else
                typeof n == "function" &&
                  (f.preventDefault(),
                  (d = i ? Ws(u, i) : new FormData(u)),
                  yc(
                    l,
                    { pending: !0, data: d, method: u.method, action: n },
                    n,
                    d,
                  ));
            },
            currentTarget: u,
          },
        ],
      });
    }
  }
  for (var Wc = 0; Wc < Ci.length; Wc++) {
    var Fc = Ci[Wc],
      F0 = Fc.toLowerCase(),
      P0 = Fc[0].toUpperCase() + Fc.slice(1);
    be(F0, "on" + P0);
  }
  be(_r, "onAnimationEnd"),
    be(Dr, "onAnimationIteration"),
    be(xr, "onAnimationStart"),
    be("dblclick", "onDoubleClick"),
    be("focusin", "onFocus"),
    be("focusout", "onBlur"),
    be(y0, "onTransitionRun"),
    be(v0, "onTransitionStart"),
    be(g0, "onTransitionCancel"),
    be(Ur, "onTransitionEnd"),
    Vl("onMouseEnter", ["mouseout", "mouseover"]),
    Vl("onMouseLeave", ["mouseout", "mouseover"]),
    Vl("onPointerEnter", ["pointerout", "pointerover"]),
    Vl("onPointerLeave", ["pointerout", "pointerover"]),
    Al(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " ",
      ),
    ),
    Al(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    Al("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    Al(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" "),
    ),
    Al(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    Al(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    );
  var mu =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    I0 = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(mu),
    );
  function Fs(t, e) {
    e = (e & 4) !== 0;
    for (var l = 0; l < t.length; l++) {
      var a = t[l],
        u = a.event;
      a = a.listeners;
      t: {
        var n = void 0;
        if (e)
          for (var i = a.length - 1; 0 <= i; i--) {
            var f = a[i],
              d = f.instance,
              E = f.currentTarget;
            if (((f = f.listener), d !== n && u.isPropagationStopped()))
              break t;
            (n = f), (u.currentTarget = E);
            try {
              n(u);
            } catch (O) {
              bn(O);
            }
            (u.currentTarget = null), (n = d);
          }
        else
          for (i = 0; i < a.length; i++) {
            if (
              ((f = a[i]),
              (d = f.instance),
              (E = f.currentTarget),
              (f = f.listener),
              d !== n && u.isPropagationStopped())
            )
              break t;
            (n = f), (u.currentTarget = E);
            try {
              n(u);
            } catch (O) {
              bn(O);
            }
            (u.currentTarget = null), (n = d);
          }
      }
    }
  }
  function ut(t, e) {
    var l = e[oi];
    l === void 0 && (l = e[oi] = new Set());
    var a = t + "__bubble";
    l.has(a) || (Ps(e, t, 2, !1), l.add(a));
  }
  function Pc(t, e, l) {
    var a = 0;
    e && (a |= 4), Ps(l, t, a, e);
  }
  var Cn = "_reactListening" + Math.random().toString(36).slice(2);
  function Ic(t) {
    if (!t[Cn]) {
      (t[Cn] = !0),
        wf.forEach(function (l) {
          l !== "selectionchange" && (I0.has(l) || Pc(l, !1, t), Pc(l, !0, t));
        });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[Cn] || ((e[Cn] = !0), Pc("selectionchange", !1, e));
    }
  }
  function Ps(t, e, l, a) {
    switch (Td(e)) {
      case 2:
        var u = Om;
        break;
      case 8:
        u = Mm;
        break;
      default:
        u = mf;
    }
    (l = u.bind(null, e, l, t)),
      (u = void 0),
      !Ei ||
        (e !== "touchstart" && e !== "touchmove" && e !== "wheel") ||
        (u = !0),
      a
        ? u !== void 0
          ? t.addEventListener(e, l, { capture: !0, passive: u })
          : t.addEventListener(e, l, !0)
        : u !== void 0
          ? t.addEventListener(e, l, { passive: u })
          : t.addEventListener(e, l, !1);
  }
  function tf(t, e, l, a, u) {
    var n = a;
    if ((e & 1) === 0 && (e & 2) === 0 && a !== null)
      t: for (;;) {
        if (a === null) return;
        var i = a.tag;
        if (i === 3 || i === 4) {
          var f = a.stateNode.containerInfo;
          if (f === u) break;
          if (i === 4)
            for (i = a.return; i !== null; ) {
              var d = i.tag;
              if ((d === 3 || d === 4) && i.stateNode.containerInfo === u)
                return;
              i = i.return;
            }
          for (; f !== null; ) {
            if (((i = Ql(f)), i === null)) return;
            if (((d = i.tag), d === 5 || d === 6 || d === 26 || d === 27)) {
              a = n = i;
              continue t;
            }
            f = f.parentNode;
          }
        }
        a = a.return;
      }
    ur(function () {
      var E = n,
        O = pi(l),
        U = [];
      t: {
        var T = Nr.get(t);
        if (T !== void 0) {
          var A = Ju,
            W = t;
          switch (t) {
            case "keypress":
              if (Vu(l) === 0) break t;
            case "keydown":
            case "keyup":
              A = Jh;
              break;
            case "focusin":
              (W = "focus"), (A = zi);
              break;
            case "focusout":
              (W = "blur"), (A = zi);
              break;
            case "beforeblur":
            case "afterblur":
              A = zi;
              break;
            case "click":
              if (l.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              A = cr;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              A = Bh;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              A = Wh;
              break;
            case _r:
            case Dr:
            case xr:
              A = Lh;
              break;
            case Ur:
              A = Ph;
              break;
            case "scroll":
            case "scrollend":
              A = Hh;
              break;
            case "wheel":
              A = t0;
              break;
            case "copy":
            case "cut":
            case "paste":
              A = Gh;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              A = rr;
              break;
            case "toggle":
            case "beforetoggle":
              A = l0;
          }
          var J = (e & 4) !== 0,
            mt = !J && (t === "scroll" || t === "scrollend"),
            S = J ? (T !== null ? T + "Capture" : null) : T;
          J = [];
          for (var v = E, b; v !== null; ) {
            var D = v;
            if (
              ((b = D.stateNode),
              (D = D.tag),
              (D !== 5 && D !== 26 && D !== 27) ||
                b === null ||
                S === null ||
                ((D = Ha(v, S)), D != null && J.push(yu(v, D, b))),
              mt)
            )
              break;
            v = v.return;
          }
          0 < J.length &&
            ((T = new A(T, W, null, l, O)), U.push({ event: T, listeners: J }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (
            ((T = t === "mouseover" || t === "pointerover"),
            (A = t === "mouseout" || t === "pointerout"),
            T &&
              l !== Si &&
              (W = l.relatedTarget || l.fromElement) &&
              (Ql(W) || W[Xl]))
          )
            break t;
          if (
            (A || T) &&
            ((T =
              O.window === O
                ? O
                : (T = O.ownerDocument)
                  ? T.defaultView || T.parentWindow
                  : window),
            A
              ? ((W = l.relatedTarget || l.toElement),
                (A = E),
                (W = W ? Ql(W) : null),
                W !== null &&
                  ((mt = g(W)),
                  (J = W.tag),
                  W !== mt || (J !== 5 && J !== 27 && J !== 6)) &&
                  (W = null))
              : ((A = null), (W = E)),
            A !== W)
          ) {
            if (
              ((J = cr),
              (D = "onMouseLeave"),
              (S = "onMouseEnter"),
              (v = "mouse"),
              (t === "pointerout" || t === "pointerover") &&
                ((J = rr),
                (D = "onPointerLeave"),
                (S = "onPointerEnter"),
                (v = "pointer")),
              (mt = A == null ? T : Na(A)),
              (b = W == null ? T : Na(W)),
              (T = new J(D, v + "leave", A, l, O)),
              (T.target = mt),
              (T.relatedTarget = b),
              (D = null),
              Ql(O) === E &&
                ((J = new J(S, v + "enter", W, l, O)),
                (J.target = b),
                (J.relatedTarget = mt),
                (D = J)),
              (mt = D),
              A && W)
            )
              e: {
                for (J = A, S = W, v = 0, b = J; b; b = Ta(b)) v++;
                for (b = 0, D = S; D; D = Ta(D)) b++;
                for (; 0 < v - b; ) (J = Ta(J)), v--;
                for (; 0 < b - v; ) (S = Ta(S)), b--;
                for (; v--; ) {
                  if (J === S || (S !== null && J === S.alternate)) break e;
                  (J = Ta(J)), (S = Ta(S));
                }
                J = null;
              }
            else J = null;
            A !== null && Is(U, T, A, J, !1),
              W !== null && mt !== null && Is(U, mt, W, J, !0);
          }
        }
        t: {
          if (
            ((T = E ? Na(E) : window),
            (A = T.nodeName && T.nodeName.toLowerCase()),
            A === "select" || (A === "input" && T.type === "file"))
          )
            var Z = gr;
          else if (yr(T))
            if (Sr) Z = d0;
            else {
              Z = o0;
              var lt = r0;
            }
          else
            (A = T.nodeName),
              !A ||
              A.toLowerCase() !== "input" ||
              (T.type !== "checkbox" && T.type !== "radio")
                ? E && gi(E.elementType) && (Z = gr)
                : (Z = s0);
          if (Z && (Z = Z(t, E))) {
            vr(U, Z, l, O);
            break t;
          }
          lt && lt(t, T, E),
            t === "focusout" &&
              E &&
              T.type === "number" &&
              E.memoizedProps.value != null &&
              vi(T, "number", T.value);
        }
        switch (((lt = E ? Na(E) : window), t)) {
          case "focusin":
            (yr(lt) || lt.contentEditable === "true") &&
              ((Pl = lt), (Ui = E), (Xa = null));
            break;
          case "focusout":
            Xa = Ui = Pl = null;
            break;
          case "mousedown":
            Ni = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            (Ni = !1), Or(U, l, O);
            break;
          case "selectionchange":
            if (m0) break;
          case "keydown":
          case "keyup":
            Or(U, l, O);
        }
        var V;
        if (Mi)
          t: {
            switch (t) {
              case "compositionstart":
                var $ = "onCompositionStart";
                break t;
              case "compositionend":
                $ = "onCompositionEnd";
                break t;
              case "compositionupdate":
                $ = "onCompositionUpdate";
                break t;
            }
            $ = void 0;
          }
        else
          Fl
            ? hr(t, l) && ($ = "onCompositionEnd")
            : t === "keydown" &&
              l.keyCode === 229 &&
              ($ = "onCompositionStart");
        $ &&
          (or &&
            l.locale !== "ko" &&
            (Fl || $ !== "onCompositionStart"
              ? $ === "onCompositionEnd" && Fl && (V = nr())
              : ((Pe = O),
                (Ti = "value" in Pe ? Pe.value : Pe.textContent),
                (Fl = !0))),
          (lt = Bn(E, $)),
          0 < lt.length &&
            (($ = new fr($, t, null, l, O)),
            U.push({ event: $, listeners: lt }),
            V ? ($.data = V) : ((V = mr(l)), V !== null && ($.data = V)))),
          (V = u0 ? n0(t, l) : i0(t, l)) &&
            (($ = Bn(E, "onBeforeInput")),
            0 < $.length &&
              ((lt = new fr("onBeforeInput", "beforeinput", null, l, O)),
              U.push({ event: lt, listeners: $ }),
              (lt.data = V))),
          W0(U, t, E, l, O);
      }
      Fs(U, e);
    });
  }
  function yu(t, e, l) {
    return { instance: t, listener: e, currentTarget: l };
  }
  function Bn(t, e) {
    for (var l = e + "Capture", a = []; t !== null; ) {
      var u = t,
        n = u.stateNode;
      if (
        ((u = u.tag),
        (u !== 5 && u !== 26 && u !== 27) ||
          n === null ||
          ((u = Ha(t, l)),
          u != null && a.unshift(yu(t, u, n)),
          (u = Ha(t, e)),
          u != null && a.push(yu(t, u, n))),
        t.tag === 3)
      )
        return a;
      t = t.return;
    }
    return [];
  }
  function Ta(t) {
    if (t === null) return null;
    do t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function Is(t, e, l, a, u) {
    for (var n = e._reactName, i = []; l !== null && l !== a; ) {
      var f = l,
        d = f.alternate,
        E = f.stateNode;
      if (((f = f.tag), d !== null && d === a)) break;
      (f !== 5 && f !== 26 && f !== 27) ||
        E === null ||
        ((d = E),
        u
          ? ((E = Ha(l, n)), E != null && i.unshift(yu(l, E, d)))
          : u || ((E = Ha(l, n)), E != null && i.push(yu(l, E, d)))),
        (l = l.return);
    }
    i.length !== 0 && t.push({ event: e, listeners: i });
  }
  var tm = /\r\n?/g,
    em = /\u0000|\uFFFD/g;
  function td(t) {
    return (typeof t == "string" ? t : "" + t)
      .replace(
        tm,
        `
`,
      )
      .replace(em, "");
  }
  function ed(t, e) {
    return (e = td(e)), td(t) === e;
  }
  function qn() {}
  function ht(t, e, l, a, u, n) {
    switch (l) {
      case "children":
        typeof a == "string"
          ? e === "body" || (e === "textarea" && a === "") || $l(t, a)
          : (typeof a == "number" || typeof a == "bigint") &&
            e !== "body" &&
            $l(t, "" + a);
        break;
      case "className":
        Gu(t, "class", a);
        break;
      case "tabIndex":
        Gu(t, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Gu(t, l, a);
        break;
      case "style":
        lr(t, a, n);
        break;
      case "data":
        if (e !== "object") {
          Gu(t, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (e !== "a" || l !== "href")) {
          t.removeAttribute(l);
          break;
        }
        if (
          a == null ||
          typeof a == "function" ||
          typeof a == "symbol" ||
          typeof a == "boolean"
        ) {
          t.removeAttribute(l);
          break;
        }
        (a = Zu("" + a)), t.setAttribute(l, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          t.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
          );
          break;
        } else
          typeof n == "function" &&
            (l === "formAction"
              ? (e !== "input" && ht(t, e, "name", u.name, u, null),
                ht(t, e, "formEncType", u.formEncType, u, null),
                ht(t, e, "formMethod", u.formMethod, u, null),
                ht(t, e, "formTarget", u.formTarget, u, null))
              : (ht(t, e, "encType", u.encType, u, null),
                ht(t, e, "method", u.method, u, null),
                ht(t, e, "target", u.target, u, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(l);
          break;
        }
        (a = Zu("" + a)), t.setAttribute(l, a);
        break;
      case "onClick":
        a != null && (t.onclick = qn);
        break;
      case "onScroll":
        a != null && ut("scroll", t);
        break;
      case "onScrollEnd":
        a != null && ut("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(r(61));
          if (((l = a.__html), l != null)) {
            if (u.children != null) throw Error(r(60));
            t.innerHTML = l;
          }
        }
        break;
      case "multiple":
        t.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        t.muted = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          a == null ||
          typeof a == "function" ||
          typeof a == "boolean" ||
          typeof a == "symbol"
        ) {
          t.removeAttribute("xlink:href");
          break;
        }
        (l = Zu("" + a)),
          t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", l);
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        a != null && typeof a != "function" && typeof a != "symbol"
          ? t.setAttribute(l, "" + a)
          : t.removeAttribute(l);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        a && typeof a != "function" && typeof a != "symbol"
          ? t.setAttribute(l, "")
          : t.removeAttribute(l);
        break;
      case "capture":
      case "download":
        a === !0
          ? t.setAttribute(l, "")
          : a !== !1 &&
              a != null &&
              typeof a != "function" &&
              typeof a != "symbol"
            ? t.setAttribute(l, a)
            : t.removeAttribute(l);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null &&
        typeof a != "function" &&
        typeof a != "symbol" &&
        !isNaN(a) &&
        1 <= a
          ? t.setAttribute(l, a)
          : t.removeAttribute(l);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a)
          ? t.removeAttribute(l)
          : t.setAttribute(l, a);
        break;
      case "popover":
        ut("beforetoggle", t), ut("toggle", t), ju(t, "popover", a);
        break;
      case "xlinkActuate":
        Ue(t, "http://www.w3.org/1999/xlink", "xlink:actuate", a);
        break;
      case "xlinkArcrole":
        Ue(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", a);
        break;
      case "xlinkRole":
        Ue(t, "http://www.w3.org/1999/xlink", "xlink:role", a);
        break;
      case "xlinkShow":
        Ue(t, "http://www.w3.org/1999/xlink", "xlink:show", a);
        break;
      case "xlinkTitle":
        Ue(t, "http://www.w3.org/1999/xlink", "xlink:title", a);
        break;
      case "xlinkType":
        Ue(t, "http://www.w3.org/1999/xlink", "xlink:type", a);
        break;
      case "xmlBase":
        Ue(t, "http://www.w3.org/XML/1998/namespace", "xml:base", a);
        break;
      case "xmlLang":
        Ue(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", a);
        break;
      case "xmlSpace":
        Ue(t, "http://www.w3.org/XML/1998/namespace", "xml:space", a);
        break;
      case "is":
        ju(t, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) ||
          (l[0] !== "o" && l[0] !== "O") ||
          (l[1] !== "n" && l[1] !== "N")) &&
          ((l = Uh.get(l) || l), ju(t, l, a));
    }
  }
  function ef(t, e, l, a, u, n) {
    switch (l) {
      case "style":
        lr(t, a, n);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(r(61));
          if (((l = a.__html), l != null)) {
            if (u.children != null) throw Error(r(60));
            t.innerHTML = l;
          }
        }
        break;
      case "children":
        typeof a == "string"
          ? $l(t, a)
          : (typeof a == "number" || typeof a == "bigint") && $l(t, "" + a);
        break;
      case "onScroll":
        a != null && ut("scroll", t);
        break;
      case "onScrollEnd":
        a != null && ut("scrollend", t);
        break;
      case "onClick":
        a != null && (t.onclick = qn);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Vf.hasOwnProperty(l))
          t: {
            if (
              l[0] === "o" &&
              l[1] === "n" &&
              ((u = l.endsWith("Capture")),
              (e = l.slice(2, u ? l.length - 7 : void 0)),
              (n = t[kt] || null),
              (n = n != null ? n[l] : null),
              typeof n == "function" && t.removeEventListener(e, n, u),
              typeof a == "function")
            ) {
              typeof n != "function" &&
                n !== null &&
                (l in t
                  ? (t[l] = null)
                  : t.hasAttribute(l) && t.removeAttribute(l)),
                t.addEventListener(e, a, u);
              break t;
            }
            l in t
              ? (t[l] = a)
              : a === !0
                ? t.setAttribute(l, "")
                : ju(t, l, a);
          }
    }
  }
  function Xt(t, e, l) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        ut("error", t), ut("load", t);
        var a = !1,
          u = !1,
          n;
        for (n in l)
          if (l.hasOwnProperty(n)) {
            var i = l[n];
            if (i != null)
              switch (n) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(r(137, e));
                default:
                  ht(t, e, n, i, l, null);
              }
          }
        u && ht(t, e, "srcSet", l.srcSet, l, null),
          a && ht(t, e, "src", l.src, l, null);
        return;
      case "input":
        ut("invalid", t);
        var f = (n = i = u = null),
          d = null,
          E = null;
        for (a in l)
          if (l.hasOwnProperty(a)) {
            var O = l[a];
            if (O != null)
              switch (a) {
                case "name":
                  u = O;
                  break;
                case "type":
                  i = O;
                  break;
                case "checked":
                  d = O;
                  break;
                case "defaultChecked":
                  E = O;
                  break;
                case "value":
                  n = O;
                  break;
                case "defaultValue":
                  f = O;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (O != null) throw Error(r(137, e));
                  break;
                default:
                  ht(t, e, a, O, l, null);
              }
          }
        Pf(t, n, f, d, E, i, u, !1), Xu(t);
        return;
      case "select":
        ut("invalid", t), (a = i = n = null);
        for (u in l)
          if (l.hasOwnProperty(u) && ((f = l[u]), f != null))
            switch (u) {
              case "value":
                n = f;
                break;
              case "defaultValue":
                i = f;
                break;
              case "multiple":
                a = f;
              default:
                ht(t, e, u, f, l, null);
            }
        (e = n),
          (l = i),
          (t.multiple = !!a),
          e != null ? Jl(t, !!a, e, !1) : l != null && Jl(t, !!a, l, !0);
        return;
      case "textarea":
        ut("invalid", t), (n = u = a = null);
        for (i in l)
          if (l.hasOwnProperty(i) && ((f = l[i]), f != null))
            switch (i) {
              case "value":
                a = f;
                break;
              case "defaultValue":
                u = f;
                break;
              case "children":
                n = f;
                break;
              case "dangerouslySetInnerHTML":
                if (f != null) throw Error(r(91));
                break;
              default:
                ht(t, e, i, f, l, null);
            }
        tr(t, a, u, n), Xu(t);
        return;
      case "option":
        for (d in l)
          if (l.hasOwnProperty(d) && ((a = l[d]), a != null))
            switch (d) {
              case "selected":
                t.selected =
                  a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                ht(t, e, d, a, l, null);
            }
        return;
      case "dialog":
        ut("beforetoggle", t), ut("toggle", t), ut("cancel", t), ut("close", t);
        break;
      case "iframe":
      case "object":
        ut("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < mu.length; a++) ut(mu[a], t);
        break;
      case "image":
        ut("error", t), ut("load", t);
        break;
      case "details":
        ut("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        ut("error", t), ut("load", t);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (E in l)
          if (l.hasOwnProperty(E) && ((a = l[E]), a != null))
            switch (E) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, e));
              default:
                ht(t, e, E, a, l, null);
            }
        return;
      default:
        if (gi(e)) {
          for (O in l)
            l.hasOwnProperty(O) &&
              ((a = l[O]), a !== void 0 && ef(t, e, O, a, l, void 0));
          return;
        }
    }
    for (f in l)
      l.hasOwnProperty(f) && ((a = l[f]), a != null && ht(t, e, f, a, l, null));
  }
  function lm(t, e, l, a) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var u = null,
          n = null,
          i = null,
          f = null,
          d = null,
          E = null,
          O = null;
        for (A in l) {
          var U = l[A];
          if (l.hasOwnProperty(A) && U != null)
            switch (A) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                d = U;
              default:
                a.hasOwnProperty(A) || ht(t, e, A, null, a, U);
            }
        }
        for (var T in a) {
          var A = a[T];
          if (((U = l[T]), a.hasOwnProperty(T) && (A != null || U != null)))
            switch (T) {
              case "type":
                n = A;
                break;
              case "name":
                u = A;
                break;
              case "checked":
                E = A;
                break;
              case "defaultChecked":
                O = A;
                break;
              case "value":
                i = A;
                break;
              case "defaultValue":
                f = A;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (A != null) throw Error(r(137, e));
                break;
              default:
                A !== U && ht(t, e, T, A, a, U);
            }
        }
        yi(t, i, f, d, E, O, n, u);
        return;
      case "select":
        A = i = f = T = null;
        for (n in l)
          if (((d = l[n]), l.hasOwnProperty(n) && d != null))
            switch (n) {
              case "value":
                break;
              case "multiple":
                A = d;
              default:
                a.hasOwnProperty(n) || ht(t, e, n, null, a, d);
            }
        for (u in a)
          if (
            ((n = a[u]),
            (d = l[u]),
            a.hasOwnProperty(u) && (n != null || d != null))
          )
            switch (u) {
              case "value":
                T = n;
                break;
              case "defaultValue":
                f = n;
                break;
              case "multiple":
                i = n;
              default:
                n !== d && ht(t, e, u, n, a, d);
            }
        (e = f),
          (l = i),
          (a = A),
          T != null
            ? Jl(t, !!l, T, !1)
            : !!a != !!l &&
              (e != null ? Jl(t, !!l, e, !0) : Jl(t, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        A = T = null;
        for (f in l)
          if (
            ((u = l[f]),
            l.hasOwnProperty(f) && u != null && !a.hasOwnProperty(f))
          )
            switch (f) {
              case "value":
                break;
              case "children":
                break;
              default:
                ht(t, e, f, null, a, u);
            }
        for (i in a)
          if (
            ((u = a[i]),
            (n = l[i]),
            a.hasOwnProperty(i) && (u != null || n != null))
          )
            switch (i) {
              case "value":
                T = u;
                break;
              case "defaultValue":
                A = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(r(91));
                break;
              default:
                u !== n && ht(t, e, i, u, a, n);
            }
        If(t, T, A);
        return;
      case "option":
        for (var W in l)
          if (
            ((T = l[W]),
            l.hasOwnProperty(W) && T != null && !a.hasOwnProperty(W))
          )
            switch (W) {
              case "selected":
                t.selected = !1;
                break;
              default:
                ht(t, e, W, null, a, T);
            }
        for (d in a)
          if (
            ((T = a[d]),
            (A = l[d]),
            a.hasOwnProperty(d) && T !== A && (T != null || A != null))
          )
            switch (d) {
              case "selected":
                t.selected =
                  T && typeof T != "function" && typeof T != "symbol";
                break;
              default:
                ht(t, e, d, T, a, A);
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var J in l)
          (T = l[J]),
            l.hasOwnProperty(J) &&
              T != null &&
              !a.hasOwnProperty(J) &&
              ht(t, e, J, null, a, T);
        for (E in a)
          if (
            ((T = a[E]),
            (A = l[E]),
            a.hasOwnProperty(E) && T !== A && (T != null || A != null))
          )
            switch (E) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (T != null) throw Error(r(137, e));
                break;
              default:
                ht(t, e, E, T, a, A);
            }
        return;
      default:
        if (gi(e)) {
          for (var mt in l)
            (T = l[mt]),
              l.hasOwnProperty(mt) &&
                T !== void 0 &&
                !a.hasOwnProperty(mt) &&
                ef(t, e, mt, void 0, a, T);
          for (O in a)
            (T = a[O]),
              (A = l[O]),
              !a.hasOwnProperty(O) ||
                T === A ||
                (T === void 0 && A === void 0) ||
                ef(t, e, O, T, a, A);
          return;
        }
    }
    for (var S in l)
      (T = l[S]),
        l.hasOwnProperty(S) &&
          T != null &&
          !a.hasOwnProperty(S) &&
          ht(t, e, S, null, a, T);
    for (U in a)
      (T = a[U]),
        (A = l[U]),
        !a.hasOwnProperty(U) ||
          T === A ||
          (T == null && A == null) ||
          ht(t, e, U, T, a, A);
  }
  var lf = null,
    af = null;
  function Yn(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function ld(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function ad(t, e) {
    if (t === 0)
      switch (e) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && e === "foreignObject" ? 0 : t;
  }
  function uf(t, e) {
    return (
      t === "textarea" ||
      t === "noscript" ||
      typeof e.children == "string" ||
      typeof e.children == "number" ||
      typeof e.children == "bigint" ||
      (typeof e.dangerouslySetInnerHTML == "object" &&
        e.dangerouslySetInnerHTML !== null &&
        e.dangerouslySetInnerHTML.__html != null)
    );
  }
  var nf = null;
  function am() {
    var t = window.event;
    return t && t.type === "popstate"
      ? t === nf
        ? !1
        : ((nf = t), !0)
      : ((nf = null), !1);
  }
  var ud = typeof setTimeout == "function" ? setTimeout : void 0,
    um = typeof clearTimeout == "function" ? clearTimeout : void 0,
    nd = typeof Promise == "function" ? Promise : void 0,
    nm =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof nd < "u"
          ? function (t) {
              return nd.resolve(null).then(t).catch(im);
            }
          : ud;
  function im(t) {
    setTimeout(function () {
      throw t;
    });
  }
  function ml(t) {
    return t === "head";
  }
  function id(t, e) {
    var l = e,
      a = 0,
      u = 0;
    do {
      var n = l.nextSibling;
      if ((t.removeChild(l), n && n.nodeType === 8))
        if (((l = n.data), l === "/$")) {
          if (0 < a && 8 > a) {
            l = a;
            var i = t.ownerDocument;
            if ((l & 1 && vu(i.documentElement), l & 2 && vu(i.body), l & 4))
              for (l = i.head, vu(l), i = l.firstChild; i; ) {
                var f = i.nextSibling,
                  d = i.nodeName;
                i[Ua] ||
                  d === "SCRIPT" ||
                  d === "STYLE" ||
                  (d === "LINK" && i.rel.toLowerCase() === "stylesheet") ||
                  l.removeChild(i),
                  (i = f);
              }
          }
          if (u === 0) {
            t.removeChild(n), Ru(e);
            return;
          }
          u--;
        } else
          l === "$" || l === "$?" || l === "$!"
            ? u++
            : (a = l.charCodeAt(0) - 48);
      else a = 0;
      l = n;
    } while (l);
    Ru(e);
  }
  function cf(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var l = e;
      switch (((e = e.nextSibling), l.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          cf(l), si(l);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (l.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(l);
    }
  }
  function cm(t, e, l, a) {
    for (; t.nodeType === 1; ) {
      var u = l;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!a && (t.nodeName !== "INPUT" || t.type !== "hidden")) break;
      } else if (a) {
        if (!t[Ua])
          switch (e) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (
                ((n = t.getAttribute("rel")),
                n === "stylesheet" && t.hasAttribute("data-precedence"))
              )
                break;
              if (
                n !== u.rel ||
                t.getAttribute("href") !==
                  (u.href == null || u.href === "" ? null : u.href) ||
                t.getAttribute("crossorigin") !==
                  (u.crossOrigin == null ? null : u.crossOrigin) ||
                t.getAttribute("title") !== (u.title == null ? null : u.title)
              )
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (
                ((n = t.getAttribute("src")),
                (n !== (u.src == null ? null : u.src) ||
                  t.getAttribute("type") !== (u.type == null ? null : u.type) ||
                  t.getAttribute("crossorigin") !==
                    (u.crossOrigin == null ? null : u.crossOrigin)) &&
                  n &&
                  t.hasAttribute("async") &&
                  !t.hasAttribute("itemprop"))
              )
                break;
              return t;
            default:
              return t;
          }
      } else if (e === "input" && t.type === "hidden") {
        var n = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && t.getAttribute("name") === n) return t;
      } else return t;
      if (((t = Te(t.nextSibling)), t === null)) break;
    }
    return null;
  }
  function fm(t, e, l) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") &&
          !l) ||
        ((t = Te(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function ff(t) {
    return (
      t.data === "$!" ||
      (t.data === "$?" && t.ownerDocument.readyState === "complete")
    );
  }
  function rm(t, e) {
    var l = t.ownerDocument;
    if (t.data !== "$?" || l.readyState === "complete") e();
    else {
      var a = function () {
        e(), l.removeEventListener("DOMContentLoaded", a);
      };
      l.addEventListener("DOMContentLoaded", a), (t._reactRetry = a);
    }
  }
  function Te(t) {
    for (; t != null; t = t.nextSibling) {
      var e = t.nodeType;
      if (e === 1 || e === 3) break;
      if (e === 8) {
        if (
          ((e = t.data),
          e === "$" || e === "$!" || e === "$?" || e === "F!" || e === "F")
        )
          break;
        if (e === "/$") return null;
      }
    }
    return t;
  }
  var rf = null;
  function cd(t) {
    t = t.previousSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === "$" || l === "$!" || l === "$?") {
          if (e === 0) return t;
          e--;
        } else l === "/$" && e++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function fd(t, e, l) {
    switch (((e = Yn(l)), t)) {
      case "html":
        if (((t = e.documentElement), !t)) throw Error(r(452));
        return t;
      case "head":
        if (((t = e.head), !t)) throw Error(r(453));
        return t;
      case "body":
        if (((t = e.body), !t)) throw Error(r(454));
        return t;
      default:
        throw Error(r(451));
    }
  }
  function vu(t) {
    for (var e = t.attributes; e.length; ) t.removeAttributeNode(e[0]);
    si(t);
  }
  var pe = new Map(),
    rd = new Set();
  function Ln(t) {
    return typeof t.getRootNode == "function"
      ? t.getRootNode()
      : t.nodeType === 9
        ? t
        : t.ownerDocument;
  }
  var Ve = j.d;
  j.d = { f: om, r: sm, D: dm, C: hm, L: mm, m: ym, X: gm, S: vm, M: Sm };
  function om() {
    var t = Ve.f(),
      e = Dn();
    return t || e;
  }
  function sm(t) {
    var e = Zl(t);
    e !== null && e.tag === 5 && e.type === "form" ? Do(e) : Ve.r(t);
  }
  var Aa = typeof document > "u" ? null : document;
  function od(t, e, l) {
    var a = Aa;
    if (a && typeof e == "string" && e) {
      var u = de(e);
      (u = 'link[rel="' + t + '"][href="' + u + '"]'),
        typeof l == "string" && (u += '[crossorigin="' + l + '"]'),
        rd.has(u) ||
          (rd.add(u),
          (t = { rel: t, crossOrigin: l, href: e }),
          a.querySelector(u) === null &&
            ((e = a.createElement("link")),
            Xt(e, "link", t),
            Bt(e),
            a.head.appendChild(e)));
    }
  }
  function dm(t) {
    Ve.D(t), od("dns-prefetch", t, null);
  }
  function hm(t, e) {
    Ve.C(t, e), od("preconnect", t, e);
  }
  function mm(t, e, l) {
    Ve.L(t, e, l);
    var a = Aa;
    if (a && t && e) {
      var u = 'link[rel="preload"][as="' + de(e) + '"]';
      e === "image" && l && l.imageSrcSet
        ? ((u += '[imagesrcset="' + de(l.imageSrcSet) + '"]'),
          typeof l.imageSizes == "string" &&
            (u += '[imagesizes="' + de(l.imageSizes) + '"]'))
        : (u += '[href="' + de(t) + '"]');
      var n = u;
      switch (e) {
        case "style":
          n = Ra(t);
          break;
        case "script":
          n = za(t);
      }
      pe.has(n) ||
        ((t = R(
          {
            rel: "preload",
            href: e === "image" && l && l.imageSrcSet ? void 0 : t,
            as: e,
          },
          l,
        )),
        pe.set(n, t),
        a.querySelector(u) !== null ||
          (e === "style" && a.querySelector(gu(n))) ||
          (e === "script" && a.querySelector(Su(n))) ||
          ((e = a.createElement("link")),
          Xt(e, "link", t),
          Bt(e),
          a.head.appendChild(e)));
    }
  }
  function ym(t, e) {
    Ve.m(t, e);
    var l = Aa;
    if (l && t) {
      var a = e && typeof e.as == "string" ? e.as : "script",
        u =
          'link[rel="modulepreload"][as="' + de(a) + '"][href="' + de(t) + '"]',
        n = u;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = za(t);
      }
      if (
        !pe.has(n) &&
        ((t = R({ rel: "modulepreload", href: t }, e)),
        pe.set(n, t),
        l.querySelector(u) === null)
      ) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(Su(n))) return;
        }
        (a = l.createElement("link")),
          Xt(a, "link", t),
          Bt(a),
          l.head.appendChild(a);
      }
    }
  }
  function vm(t, e, l) {
    Ve.S(t, e, l);
    var a = Aa;
    if (a && t) {
      var u = wl(a).hoistableStyles,
        n = Ra(t);
      e = e || "default";
      var i = u.get(n);
      if (!i) {
        var f = { loading: 0, preload: null };
        if ((i = a.querySelector(gu(n)))) f.loading = 5;
        else {
          (t = R({ rel: "stylesheet", href: t, "data-precedence": e }, l)),
            (l = pe.get(n)) && of(t, l);
          var d = (i = a.createElement("link"));
          Bt(d),
            Xt(d, "link", t),
            (d._p = new Promise(function (E, O) {
              (d.onload = E), (d.onerror = O);
            })),
            d.addEventListener("load", function () {
              f.loading |= 1;
            }),
            d.addEventListener("error", function () {
              f.loading |= 2;
            }),
            (f.loading |= 4),
            jn(i, e, a);
        }
        (i = { type: "stylesheet", instance: i, count: 1, state: f }),
          u.set(n, i);
      }
    }
  }
  function gm(t, e) {
    Ve.X(t, e);
    var l = Aa;
    if (l && t) {
      var a = wl(l).hoistableScripts,
        u = za(t),
        n = a.get(u);
      n ||
        ((n = l.querySelector(Su(u))),
        n ||
          ((t = R({ src: t, async: !0 }, e)),
          (e = pe.get(u)) && sf(t, e),
          (n = l.createElement("script")),
          Bt(n),
          Xt(n, "link", t),
          l.head.appendChild(n)),
        (n = { type: "script", instance: n, count: 1, state: null }),
        a.set(u, n));
    }
  }
  function Sm(t, e) {
    Ve.M(t, e);
    var l = Aa;
    if (l && t) {
      var a = wl(l).hoistableScripts,
        u = za(t),
        n = a.get(u);
      n ||
        ((n = l.querySelector(Su(u))),
        n ||
          ((t = R({ src: t, async: !0, type: "module" }, e)),
          (e = pe.get(u)) && sf(t, e),
          (n = l.createElement("script")),
          Bt(n),
          Xt(n, "link", t),
          l.head.appendChild(n)),
        (n = { type: "script", instance: n, count: 1, state: null }),
        a.set(u, n));
    }
  }
  function sd(t, e, l, a) {
    var u = (u = I.current) ? Ln(u) : null;
    if (!u) throw Error(r(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string"
          ? ((e = Ra(l.href)),
            (l = wl(u).hoistableStyles),
            (a = l.get(e)),
            a ||
              ((a = { type: "style", instance: null, count: 0, state: null }),
              l.set(e, a)),
            a)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          l.rel === "stylesheet" &&
          typeof l.href == "string" &&
          typeof l.precedence == "string"
        ) {
          t = Ra(l.href);
          var n = wl(u).hoistableStyles,
            i = n.get(t);
          if (
            (i ||
              ((u = u.ownerDocument || u),
              (i = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              n.set(t, i),
              (n = u.querySelector(gu(t))) &&
                !n._p &&
                ((i.instance = n), (i.state.loading = 5)),
              pe.has(t) ||
                ((l = {
                  rel: "preload",
                  as: "style",
                  href: l.href,
                  crossOrigin: l.crossOrigin,
                  integrity: l.integrity,
                  media: l.media,
                  hrefLang: l.hrefLang,
                  referrerPolicy: l.referrerPolicy,
                }),
                pe.set(t, l),
                n || pm(u, t, l, i.state))),
            e && a === null)
          )
            throw Error(r(528, ""));
          return i;
        }
        if (e && a !== null) throw Error(r(529, ""));
        return null;
      case "script":
        return (
          (e = l.async),
          (l = l.src),
          typeof l == "string" &&
          e &&
          typeof e != "function" &&
          typeof e != "symbol"
            ? ((e = za(l)),
              (l = wl(u).hoistableScripts),
              (a = l.get(e)),
              a ||
                ((a = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                l.set(e, a)),
              a)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(r(444, t));
    }
  }
  function Ra(t) {
    return 'href="' + de(t) + '"';
  }
  function gu(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function dd(t) {
    return R({}, t, { "data-precedence": t.precedence, precedence: null });
  }
  function pm(t, e, l, a) {
    t.querySelector('link[rel="preload"][as="style"][' + e + "]")
      ? (a.loading = 1)
      : ((e = t.createElement("link")),
        (a.preload = e),
        e.addEventListener("load", function () {
          return (a.loading |= 1);
        }),
        e.addEventListener("error", function () {
          return (a.loading |= 2);
        }),
        Xt(e, "link", l),
        Bt(e),
        t.head.appendChild(e));
  }
  function za(t) {
    return '[src="' + de(t) + '"]';
  }
  function Su(t) {
    return "script[async]" + t;
  }
  function hd(t, e, l) {
    if ((e.count++, e.instance === null))
      switch (e.type) {
        case "style":
          var a = t.querySelector('style[data-href~="' + de(l.href) + '"]');
          if (a) return (e.instance = a), Bt(a), a;
          var u = R({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null,
          });
          return (
            (a = (t.ownerDocument || t).createElement("style")),
            Bt(a),
            Xt(a, "style", u),
            jn(a, l.precedence, t),
            (e.instance = a)
          );
        case "stylesheet":
          u = Ra(l.href);
          var n = t.querySelector(gu(u));
          if (n) return (e.state.loading |= 4), (e.instance = n), Bt(n), n;
          (a = dd(l)),
            (u = pe.get(u)) && of(a, u),
            (n = (t.ownerDocument || t).createElement("link")),
            Bt(n);
          var i = n;
          return (
            (i._p = new Promise(function (f, d) {
              (i.onload = f), (i.onerror = d);
            })),
            Xt(n, "link", a),
            (e.state.loading |= 4),
            jn(n, l.precedence, t),
            (e.instance = n)
          );
        case "script":
          return (
            (n = za(l.src)),
            (u = t.querySelector(Su(n)))
              ? ((e.instance = u), Bt(u), u)
              : ((a = l),
                (u = pe.get(n)) && ((a = R({}, l)), sf(a, u)),
                (t = t.ownerDocument || t),
                (u = t.createElement("script")),
                Bt(u),
                Xt(u, "link", a),
                t.head.appendChild(u),
                (e.instance = u))
          );
        case "void":
          return null;
        default:
          throw Error(r(443, e.type));
      }
    else
      e.type === "stylesheet" &&
        (e.state.loading & 4) === 0 &&
        ((a = e.instance), (e.state.loading |= 4), jn(a, l.precedence, t));
    return e.instance;
  }
  function jn(t, e, l) {
    for (
      var a = l.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]',
        ),
        u = a.length ? a[a.length - 1] : null,
        n = u,
        i = 0;
      i < a.length;
      i++
    ) {
      var f = a[i];
      if (f.dataset.precedence === e) n = f;
      else if (n !== u) break;
    }
    n
      ? n.parentNode.insertBefore(t, n.nextSibling)
      : ((e = l.nodeType === 9 ? l.head : l), e.insertBefore(t, e.firstChild));
  }
  function of(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.title == null && (t.title = e.title);
  }
  function sf(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.integrity == null && (t.integrity = e.integrity);
  }
  var Gn = null;
  function md(t, e, l) {
    if (Gn === null) {
      var a = new Map(),
        u = (Gn = new Map());
      u.set(l, a);
    } else (u = Gn), (a = u.get(l)), a || ((a = new Map()), u.set(l, a));
    if (a.has(t)) return a;
    for (
      a.set(t, null), l = l.getElementsByTagName(t), u = 0;
      u < l.length;
      u++
    ) {
      var n = l[u];
      if (
        !(
          n[Ua] ||
          n[wt] ||
          (t === "link" && n.getAttribute("rel") === "stylesheet")
        ) &&
        n.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var i = n.getAttribute(e) || "";
        i = t + i;
        var f = a.get(i);
        f ? f.push(n) : a.set(i, [n]);
      }
    }
    return a;
  }
  function yd(t, e, l) {
    (t = t.ownerDocument || t),
      t.head.insertBefore(
        l,
        e === "title" ? t.querySelector("head > title") : null,
      );
  }
  function bm(t, e, l) {
    if (l === 1 || e.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof e.precedence != "string" ||
          typeof e.href != "string" ||
          e.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof e.rel != "string" ||
          typeof e.href != "string" ||
          e.href === "" ||
          e.onLoad ||
          e.onError
        )
          break;
        switch (e.rel) {
          case "stylesheet":
            return (
              (t = e.disabled), typeof e.precedence == "string" && t == null
            );
          default:
            return !0;
        }
      case "script":
        if (
          e.async &&
          typeof e.async != "function" &&
          typeof e.async != "symbol" &&
          !e.onLoad &&
          !e.onError &&
          e.src &&
          typeof e.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function vd(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  var pu = null;
  function Em() {}
  function Tm(t, e, l) {
    if (pu === null) throw Error(r(475));
    var a = pu;
    if (
      e.type === "stylesheet" &&
      (typeof l.media != "string" || matchMedia(l.media).matches !== !1) &&
      (e.state.loading & 4) === 0
    ) {
      if (e.instance === null) {
        var u = Ra(l.href),
          n = t.querySelector(gu(u));
        if (n) {
          (t = n._p),
            t !== null &&
              typeof t == "object" &&
              typeof t.then == "function" &&
              (a.count++, (a = Xn.bind(a)), t.then(a, a)),
            (e.state.loading |= 4),
            (e.instance = n),
            Bt(n);
          return;
        }
        (n = t.ownerDocument || t),
          (l = dd(l)),
          (u = pe.get(u)) && of(l, u),
          (n = n.createElement("link")),
          Bt(n);
        var i = n;
        (i._p = new Promise(function (f, d) {
          (i.onload = f), (i.onerror = d);
        })),
          Xt(n, "link", l),
          (e.instance = n);
      }
      a.stylesheets === null && (a.stylesheets = new Map()),
        a.stylesheets.set(e, t),
        (t = e.state.preload) &&
          (e.state.loading & 3) === 0 &&
          (a.count++,
          (e = Xn.bind(a)),
          t.addEventListener("load", e),
          t.addEventListener("error", e));
    }
  }
  function Am() {
    if (pu === null) throw Error(r(475));
    var t = pu;
    return (
      t.stylesheets && t.count === 0 && df(t, t.stylesheets),
      0 < t.count
        ? function (e) {
            var l = setTimeout(function () {
              if ((t.stylesheets && df(t, t.stylesheets), t.unsuspend)) {
                var a = t.unsuspend;
                (t.unsuspend = null), a();
              }
            }, 6e4);
            return (
              (t.unsuspend = e),
              function () {
                (t.unsuspend = null), clearTimeout(l);
              }
            );
          }
        : null
    );
  }
  function Xn() {
    if ((this.count--, this.count === 0)) {
      if (this.stylesheets) df(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        (this.unsuspend = null), t();
      }
    }
  }
  var Qn = null;
  function df(t, e) {
    (t.stylesheets = null),
      t.unsuspend !== null &&
        (t.count++,
        (Qn = new Map()),
        e.forEach(Rm, t),
        (Qn = null),
        Xn.call(t));
  }
  function Rm(t, e) {
    if (!(e.state.loading & 4)) {
      var l = Qn.get(t);
      if (l) var a = l.get(null);
      else {
        (l = new Map()), Qn.set(t, l);
        for (
          var u = t.querySelectorAll(
              "link[data-precedence],style[data-precedence]",
            ),
            n = 0;
          n < u.length;
          n++
        ) {
          var i = u[n];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") &&
            (l.set(i.dataset.precedence, i), (a = i));
        }
        a && l.set(null, a);
      }
      (u = e.instance),
        (i = u.getAttribute("data-precedence")),
        (n = l.get(i) || a),
        n === a && l.set(null, u),
        l.set(i, u),
        this.count++,
        (a = Xn.bind(this)),
        u.addEventListener("load", a),
        u.addEventListener("error", a),
        n
          ? n.parentNode.insertBefore(u, n.nextSibling)
          : ((t = t.nodeType === 9 ? t.head : t),
            t.insertBefore(u, t.firstChild)),
        (e.state.loading |= 4);
    }
  }
  var bu = {
    $$typeof: X,
    Provider: null,
    Consumer: null,
    _currentValue: k,
    _currentValue2: k,
    _threadCount: 0,
  };
  function zm(t, e, l, a, u, n, i, f) {
    (this.tag = 1),
      (this.containerInfo = t),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = ci(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = ci(0)),
      (this.hiddenUpdates = ci(null)),
      (this.identifierPrefix = a),
      (this.onUncaughtError = u),
      (this.onCaughtError = n),
      (this.onRecoverableError = i),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = f),
      (this.incompleteTransitions = new Map());
  }
  function gd(t, e, l, a, u, n, i, f, d, E, O, U) {
    return (
      (t = new zm(t, e, l, i, f, d, E, U)),
      (e = 1),
      n === !0 && (e |= 24),
      (n = ue(3, null, null, e)),
      (t.current = n),
      (n.stateNode = t),
      (e = Ki()),
      e.refCount++,
      (t.pooledCache = e),
      e.refCount++,
      (n.memoizedState = { element: a, isDehydrated: l, cache: e }),
      Wi(n),
      t
    );
  }
  function Sd(t) {
    return t ? ((t = la), t) : la;
  }
  function pd(t, e, l, a, u, n) {
    (u = Sd(u)),
      a.context === null ? (a.context = u) : (a.pendingContext = u),
      (a = el(e)),
      (a.payload = { element: l }),
      (n = n === void 0 ? null : n),
      n !== null && (a.callback = n),
      (l = ll(t, a, e)),
      l !== null && (re(l, t, e), Wa(l, t, e));
  }
  function bd(t, e) {
    if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
      var l = t.retryLane;
      t.retryLane = l !== 0 && l < e ? l : e;
    }
  }
  function hf(t, e) {
    bd(t, e), (t = t.alternate) && bd(t, e);
  }
  function Ed(t) {
    if (t.tag === 13) {
      var e = ea(t, 67108864);
      e !== null && re(e, t, 67108864), hf(t, 67108864);
    }
  }
  var Zn = !0;
  function Om(t, e, l, a) {
    var u = _.T;
    _.T = null;
    var n = j.p;
    try {
      (j.p = 2), mf(t, e, l, a);
    } finally {
      (j.p = n), (_.T = u);
    }
  }
  function Mm(t, e, l, a) {
    var u = _.T;
    _.T = null;
    var n = j.p;
    try {
      (j.p = 8), mf(t, e, l, a);
    } finally {
      (j.p = n), (_.T = u);
    }
  }
  function mf(t, e, l, a) {
    if (Zn) {
      var u = yf(a);
      if (u === null) tf(t, e, a, wn, l), Ad(t, a);
      else if (Dm(u, t, e, l, a)) a.stopPropagation();
      else if ((Ad(t, a), e & 4 && -1 < _m.indexOf(t))) {
        for (; u !== null; ) {
          var n = Zl(u);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (((n = n.stateNode), n.current.memoizedState.isDehydrated)) {
                  var i = Tl(n.pendingLanes);
                  if (i !== 0) {
                    var f = n;
                    for (f.pendingLanes |= 2, f.entangledLanes |= 2; i; ) {
                      var d = 1 << (31 - le(i));
                      (f.entanglements[1] |= d), (i &= ~d);
                    }
                    _e(n), (ot & 6) === 0 && ((Mn = Ae() + 500), hu(0));
                  }
                }
                break;
              case 13:
                (f = ea(n, 2)), f !== null && re(f, n, 2), Dn(), hf(n, 2);
            }
          if (((n = yf(a)), n === null && tf(t, e, a, wn, l), n === u)) break;
          u = n;
        }
        u !== null && a.stopPropagation();
      } else tf(t, e, a, null, l);
    }
  }
  function yf(t) {
    return (t = pi(t)), vf(t);
  }
  var wn = null;
  function vf(t) {
    if (((wn = null), (t = Ql(t)), t !== null)) {
      var e = g(t);
      if (e === null) t = null;
      else {
        var l = e.tag;
        if (l === 13) {
          if (((t = z(e)), t !== null)) return t;
          t = null;
        } else if (l === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return (wn = t), null;
  }
  function Td(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (hh()) {
          case Bf:
            return 2;
          case qf:
            return 8;
          case Bu:
          case mh:
            return 32;
          case Yf:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var gf = !1,
    yl = null,
    vl = null,
    gl = null,
    Eu = new Map(),
    Tu = new Map(),
    Sl = [],
    _m =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " ",
      );
  function Ad(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        yl = null;
        break;
      case "dragenter":
      case "dragleave":
        vl = null;
        break;
      case "mouseover":
      case "mouseout":
        gl = null;
        break;
      case "pointerover":
      case "pointerout":
        Eu.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Tu.delete(e.pointerId);
    }
  }
  function Au(t, e, l, a, u, n) {
    return t === null || t.nativeEvent !== n
      ? ((t = {
          blockedOn: e,
          domEventName: l,
          eventSystemFlags: a,
          nativeEvent: n,
          targetContainers: [u],
        }),
        e !== null && ((e = Zl(e)), e !== null && Ed(e)),
        t)
      : ((t.eventSystemFlags |= a),
        (e = t.targetContainers),
        u !== null && e.indexOf(u) === -1 && e.push(u),
        t);
  }
  function Dm(t, e, l, a, u) {
    switch (e) {
      case "focusin":
        return (yl = Au(yl, t, e, l, a, u)), !0;
      case "dragenter":
        return (vl = Au(vl, t, e, l, a, u)), !0;
      case "mouseover":
        return (gl = Au(gl, t, e, l, a, u)), !0;
      case "pointerover":
        var n = u.pointerId;
        return Eu.set(n, Au(Eu.get(n) || null, t, e, l, a, u)), !0;
      case "gotpointercapture":
        return (
          (n = u.pointerId), Tu.set(n, Au(Tu.get(n) || null, t, e, l, a, u)), !0
        );
    }
    return !1;
  }
  function Rd(t) {
    var e = Ql(t.target);
    if (e !== null) {
      var l = g(e);
      if (l !== null) {
        if (((e = l.tag), e === 13)) {
          if (((e = z(l)), e !== null)) {
            (t.blockedOn = e),
              Th(t.priority, function () {
                if (l.tag === 13) {
                  var a = fe();
                  a = fi(a);
                  var u = ea(l, a);
                  u !== null && re(u, l, a), hf(l, a);
                }
              });
            return;
          }
        } else if (e === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Vn(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var l = yf(t.nativeEvent);
      if (l === null) {
        l = t.nativeEvent;
        var a = new l.constructor(l.type, l);
        (Si = a), l.target.dispatchEvent(a), (Si = null);
      } else return (e = Zl(l)), e !== null && Ed(e), (t.blockedOn = l), !1;
      e.shift();
    }
    return !0;
  }
  function zd(t, e, l) {
    Vn(t) && l.delete(e);
  }
  function xm() {
    (gf = !1),
      yl !== null && Vn(yl) && (yl = null),
      vl !== null && Vn(vl) && (vl = null),
      gl !== null && Vn(gl) && (gl = null),
      Eu.forEach(zd),
      Tu.forEach(zd);
  }
  function Kn(t, e) {
    t.blockedOn === e &&
      ((t.blockedOn = null),
      gf ||
        ((gf = !0),
        c.unstable_scheduleCallback(c.unstable_NormalPriority, xm)));
  }
  var Jn = null;
  function Od(t) {
    Jn !== t &&
      ((Jn = t),
      c.unstable_scheduleCallback(c.unstable_NormalPriority, function () {
        Jn === t && (Jn = null);
        for (var e = 0; e < t.length; e += 3) {
          var l = t[e],
            a = t[e + 1],
            u = t[e + 2];
          if (typeof a != "function") {
            if (vf(a || l) === null) continue;
            break;
          }
          var n = Zl(l);
          n !== null &&
            (t.splice(e, 3),
            (e -= 3),
            yc(n, { pending: !0, data: u, method: l.method, action: a }, a, u));
        }
      }));
  }
  function Ru(t) {
    function e(d) {
      return Kn(d, t);
    }
    yl !== null && Kn(yl, t),
      vl !== null && Kn(vl, t),
      gl !== null && Kn(gl, t),
      Eu.forEach(e),
      Tu.forEach(e);
    for (var l = 0; l < Sl.length; l++) {
      var a = Sl[l];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < Sl.length && ((l = Sl[0]), l.blockedOn === null); )
      Rd(l), l.blockedOn === null && Sl.shift();
    if (((l = (t.ownerDocument || t).$$reactFormReplay), l != null))
      for (a = 0; a < l.length; a += 3) {
        var u = l[a],
          n = l[a + 1],
          i = u[kt] || null;
        if (typeof n == "function") i || Od(l);
        else if (i) {
          var f = null;
          if (n && n.hasAttribute("formAction")) {
            if (((u = n), (i = n[kt] || null))) f = i.formAction;
            else if (vf(u) !== null) continue;
          } else f = i.action;
          typeof f == "function" ? (l[a + 1] = f) : (l.splice(a, 3), (a -= 3)),
            Od(l);
        }
      }
  }
  function Sf(t) {
    this._internalRoot = t;
  }
  ($n.prototype.render = Sf.prototype.render =
    function (t) {
      var e = this._internalRoot;
      if (e === null) throw Error(r(409));
      var l = e.current,
        a = fe();
      pd(l, a, t, e, null, null);
    }),
    ($n.prototype.unmount = Sf.prototype.unmount =
      function () {
        var t = this._internalRoot;
        if (t !== null) {
          this._internalRoot = null;
          var e = t.containerInfo;
          pd(t.current, 2, null, t, null, null), Dn(), (e[Xl] = null);
        }
      });
  function $n(t) {
    this._internalRoot = t;
  }
  $n.prototype.unstable_scheduleHydration = function (t) {
    if (t) {
      var e = Qf();
      t = { blockedOn: null, target: t, priority: e };
      for (var l = 0; l < Sl.length && e !== 0 && e < Sl[l].priority; l++);
      Sl.splice(l, 0, t), l === 0 && Rd(t);
    }
  };
  var Md = o.version;
  if (Md !== "19.1.0") throw Error(r(527, Md, "19.1.0"));
  j.findDOMNode = function (t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function"
        ? Error(r(188))
        : ((t = Object.keys(t).join(",")), Error(r(268, t)));
    return (
      (t = p(e)),
      (t = t !== null ? m(t) : null),
      (t = t === null ? null : t.stateNode),
      t
    );
  };
  var Um = {
    bundleType: 0,
    version: "19.1.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: _,
    reconcilerVersion: "19.1.0",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var kn = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!kn.isDisabled && kn.supportsFiber)
      try {
        (_a = kn.inject(Um)), (ee = kn);
      } catch {}
  }
  return (
    (Ou.createRoot = function (t, e) {
      if (!h(t)) throw Error(r(299));
      var l = !1,
        a = "",
        u = Zo,
        n = wo,
        i = Vo,
        f = null;
      return (
        e != null &&
          (e.unstable_strictMode === !0 && (l = !0),
          e.identifierPrefix !== void 0 && (a = e.identifierPrefix),
          e.onUncaughtError !== void 0 && (u = e.onUncaughtError),
          e.onCaughtError !== void 0 && (n = e.onCaughtError),
          e.onRecoverableError !== void 0 && (i = e.onRecoverableError),
          e.unstable_transitionCallbacks !== void 0 &&
            (f = e.unstable_transitionCallbacks)),
        (e = gd(t, 1, !1, null, null, l, a, u, n, i, f, null)),
        (t[Xl] = e.current),
        Ic(t),
        new Sf(e)
      );
    }),
    (Ou.hydrateRoot = function (t, e, l) {
      if (!h(t)) throw Error(r(299));
      var a = !1,
        u = "",
        n = Zo,
        i = wo,
        f = Vo,
        d = null,
        E = null;
      return (
        l != null &&
          (l.unstable_strictMode === !0 && (a = !0),
          l.identifierPrefix !== void 0 && (u = l.identifierPrefix),
          l.onUncaughtError !== void 0 && (n = l.onUncaughtError),
          l.onCaughtError !== void 0 && (i = l.onCaughtError),
          l.onRecoverableError !== void 0 && (f = l.onRecoverableError),
          l.unstable_transitionCallbacks !== void 0 &&
            (d = l.unstable_transitionCallbacks),
          l.formState !== void 0 && (E = l.formState)),
        (e = gd(t, 1, !0, e, l ?? null, a, u, n, i, f, d, E)),
        (e.context = Sd(null)),
        (l = e.current),
        (a = fe()),
        (a = fi(a)),
        (u = el(a)),
        (u.callback = null),
        ll(l, u, a),
        (l = a),
        (e.current.lanes = l),
        xa(e, l),
        _e(e),
        (t[Xl] = e.current),
        Ic(t),
        new $n(e)
      );
    }),
    (Ou.version = "19.1.0"),
    Ou
  );
}
var Yd;
function Qm() {
  if (Yd) return Ef.exports;
  Yd = 1;
  function c() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (o) {
        console.error(o);
      }
  }
  return c(), (Ef.exports = Xm()), Ef.exports;
}
var Zm = Qm();
const wm = Vd(Zm);
var Mu = {},
  Ld;
function Vm() {
  if (Ld) return Mu;
  (Ld = 1),
    Object.defineProperty(Mu, "__esModule", { value: !0 }),
    (Mu.parse = z),
    (Mu.serialize = m);
  const c = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/,
    o = /^[\u0021-\u003A\u003C-\u007E]*$/,
    s =
      /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,
    r = /^[\u0020-\u003A\u003D-\u007E]*$/,
    h = Object.prototype.toString,
    g = (() => {
      const H = function () {};
      return (H.prototype = Object.create(null)), H;
    })();
  function z(H, L) {
    const C = new g(),
      w = H.length;
    if (w < 2) return C;
    const G = (L == null ? void 0 : L.decode) || R;
    let q = 0;
    do {
      const P = H.indexOf("=", q);
      if (P === -1) break;
      const X = H.indexOf(";", q),
        it = X === -1 ? w : X;
      if (P > it) {
        q = H.lastIndexOf(";", P - 1) + 1;
        continue;
      }
      const F = M(H, q, P),
        xt = p(H, P, F),
        Rt = H.slice(F, xt);
      if (C[Rt] === void 0) {
        let Mt = M(H, P + 1, it),
          pt = p(H, it, Mt);
        const Jt = G(H.slice(Mt, pt));
        C[Rt] = Jt;
      }
      q = it + 1;
    } while (q < w);
    return C;
  }
  function M(H, L, C) {
    do {
      const w = H.charCodeAt(L);
      if (w !== 32 && w !== 9) return L;
    } while (++L < C);
    return C;
  }
  function p(H, L, C) {
    for (; L > C; ) {
      const w = H.charCodeAt(--L);
      if (w !== 32 && w !== 9) return L + 1;
    }
    return C;
  }
  function m(H, L, C) {
    const w = (C == null ? void 0 : C.encode) || encodeURIComponent;
    if (!c.test(H)) throw new TypeError(`argument name is invalid: ${H}`);
    const G = w(L);
    if (!o.test(G)) throw new TypeError(`argument val is invalid: ${L}`);
    let q = H + "=" + G;
    if (!C) return q;
    if (C.maxAge !== void 0) {
      if (!Number.isInteger(C.maxAge))
        throw new TypeError(`option maxAge is invalid: ${C.maxAge}`);
      q += "; Max-Age=" + C.maxAge;
    }
    if (C.domain) {
      if (!s.test(C.domain))
        throw new TypeError(`option domain is invalid: ${C.domain}`);
      q += "; Domain=" + C.domain;
    }
    if (C.path) {
      if (!r.test(C.path))
        throw new TypeError(`option path is invalid: ${C.path}`);
      q += "; Path=" + C.path;
    }
    if (C.expires) {
      if (!B(C.expires) || !Number.isFinite(C.expires.valueOf()))
        throw new TypeError(`option expires is invalid: ${C.expires}`);
      q += "; Expires=" + C.expires.toUTCString();
    }
    if (
      (C.httpOnly && (q += "; HttpOnly"),
      C.secure && (q += "; Secure"),
      C.partitioned && (q += "; Partitioned"),
      C.priority)
    )
      switch (
        typeof C.priority == "string" ? C.priority.toLowerCase() : void 0
      ) {
        case "low":
          q += "; Priority=Low";
          break;
        case "medium":
          q += "; Priority=Medium";
          break;
        case "high":
          q += "; Priority=High";
          break;
        default:
          throw new TypeError(`option priority is invalid: ${C.priority}`);
      }
    if (C.sameSite)
      switch (
        typeof C.sameSite == "string" ? C.sameSite.toLowerCase() : C.sameSite
      ) {
        case !0:
        case "strict":
          q += "; SameSite=Strict";
          break;
        case "lax":
          q += "; SameSite=Lax";
          break;
        case "none":
          q += "; SameSite=None";
          break;
        default:
          throw new TypeError(`option sameSite is invalid: ${C.sameSite}`);
      }
    return q;
  }
  function R(H) {
    if (H.indexOf("%") === -1) return H;
    try {
      return decodeURIComponent(H);
    } catch {
      return H;
    }
  }
  function B(H) {
    return h.call(H) === "[object Date]";
  }
  return Mu;
}
Vm();
var jd = "popstate";
function Km(c = {}) {
  function o(r, h) {
    let { pathname: g, search: z, hash: M } = r.location;
    return Mf(
      "",
      { pathname: g, search: z, hash: M },
      (h.state && h.state.usr) || null,
      (h.state && h.state.key) || "default",
    );
  }
  function s(r, h) {
    return typeof h == "string" ? h : xu(h);
  }
  return $m(o, s, null, c);
}
function At(c, o) {
  if (c === !1 || c === null || typeof c > "u") throw new Error(o);
}
function De(c, o) {
  if (!c) {
    typeof console < "u" && console.warn(o);
    try {
      throw new Error(o);
    } catch {}
  }
}
function Jm() {
  return Math.random().toString(36).substring(2, 10);
}
function Gd(c, o) {
  return { usr: c.state, key: c.key, idx: o };
}
function Mf(c, o, s = null, r) {
  return {
    pathname: typeof c == "string" ? c : c.pathname,
    search: "",
    hash: "",
    ...(typeof o == "string" ? Oa(o) : o),
    state: s,
    key: (o && o.key) || r || Jm(),
  };
}
function xu({ pathname: c = "/", search: o = "", hash: s = "" }) {
  return (
    o && o !== "?" && (c += o.charAt(0) === "?" ? o : "?" + o),
    s && s !== "#" && (c += s.charAt(0) === "#" ? s : "#" + s),
    c
  );
}
function Oa(c) {
  let o = {};
  if (c) {
    let s = c.indexOf("#");
    s >= 0 && ((o.hash = c.substring(s)), (c = c.substring(0, s)));
    let r = c.indexOf("?");
    r >= 0 && ((o.search = c.substring(r)), (c = c.substring(0, r))),
      c && (o.pathname = c);
  }
  return o;
}
function $m(c, o, s, r = {}) {
  let { window: h = document.defaultView, v5Compat: g = !1 } = r,
    z = h.history,
    M = "POP",
    p = null,
    m = R();
  m == null && ((m = 0), z.replaceState({ ...z.state, idx: m }, ""));
  function R() {
    return (z.state || { idx: null }).idx;
  }
  function B() {
    M = "POP";
    let G = R(),
      q = G == null ? null : G - m;
    (m = G), p && p({ action: M, location: w.location, delta: q });
  }
  function H(G, q) {
    M = "PUSH";
    let P = Mf(w.location, G, q);
    m = R() + 1;
    let X = Gd(P, m),
      it = w.createHref(P);
    try {
      z.pushState(X, "", it);
    } catch (F) {
      if (F instanceof DOMException && F.name === "DataCloneError") throw F;
      h.location.assign(it);
    }
    g && p && p({ action: M, location: w.location, delta: 1 });
  }
  function L(G, q) {
    M = "REPLACE";
    let P = Mf(w.location, G, q);
    m = R();
    let X = Gd(P, m),
      it = w.createHref(P);
    z.replaceState(X, "", it),
      g && p && p({ action: M, location: w.location, delta: 0 });
  }
  function C(G) {
    return km(G);
  }
  let w = {
    get action() {
      return M;
    },
    get location() {
      return c(h, z);
    },
    listen(G) {
      if (p) throw new Error("A history only accepts one active listener");
      return (
        h.addEventListener(jd, B),
        (p = G),
        () => {
          h.removeEventListener(jd, B), (p = null);
        }
      );
    },
    createHref(G) {
      return o(h, G);
    },
    createURL: C,
    encodeLocation(G) {
      let q = C(G);
      return { pathname: q.pathname, search: q.search, hash: q.hash };
    },
    push: H,
    replace: L,
    go(G) {
      return z.go(G);
    },
  };
  return w;
}
function km(c, o = !1) {
  let s = "http://localhost";
  typeof window < "u" &&
    (s =
      window.location.origin !== "null"
        ? window.location.origin
        : window.location.href),
    At(s, "No window.location.(origin|href) available to create URL");
  let r = typeof c == "string" ? c : xu(c);
  return (
    (r = r.replace(/ $/, "%20")),
    !o && r.startsWith("//") && (r = s + r),
    new URL(r, s)
  );
}
function Kd(c, o, s = "/") {
  return Wm(c, o, s, !1);
}
function Wm(c, o, s, r) {
  let h = typeof o == "string" ? Oa(o) : o,
    g = Je(h.pathname || "/", s);
  if (g == null) return null;
  let z = Jd(c);
  Fm(z);
  let M = null;
  for (let p = 0; M == null && p < z.length; ++p) {
    let m = fy(g);
    M = iy(z[p], m, r);
  }
  return M;
}
function Jd(c, o = [], s = [], r = "") {
  let h = (g, z, M) => {
    let p = {
      relativePath: M === void 0 ? g.path || "" : M,
      caseSensitive: g.caseSensitive === !0,
      childrenIndex: z,
      route: g,
    };
    p.relativePath.startsWith("/") &&
      (At(
        p.relativePath.startsWith(r),
        `Absolute route path "${p.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`,
      ),
      (p.relativePath = p.relativePath.slice(r.length)));
    let m = Ke([r, p.relativePath]),
      R = s.concat(p);
    g.children &&
      g.children.length > 0 &&
      (At(
        g.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${m}".`,
      ),
      Jd(g.children, o, R, m)),
      !(g.path == null && !g.index) &&
        o.push({ path: m, score: uy(m, g.index), routesMeta: R });
  };
  return (
    c.forEach((g, z) => {
      var M;
      if (g.path === "" || !((M = g.path) != null && M.includes("?"))) h(g, z);
      else for (let p of $d(g.path)) h(g, z, p);
    }),
    o
  );
}
function $d(c) {
  let o = c.split("/");
  if (o.length === 0) return [];
  let [s, ...r] = o,
    h = s.endsWith("?"),
    g = s.replace(/\?$/, "");
  if (r.length === 0) return h ? [g, ""] : [g];
  let z = $d(r.join("/")),
    M = [];
  return (
    M.push(...z.map((p) => (p === "" ? g : [g, p].join("/")))),
    h && M.push(...z),
    M.map((p) => (c.startsWith("/") && p === "" ? "/" : p))
  );
}
function Fm(c) {
  c.sort((o, s) =>
    o.score !== s.score
      ? s.score - o.score
      : ny(
          o.routesMeta.map((r) => r.childrenIndex),
          s.routesMeta.map((r) => r.childrenIndex),
        ),
  );
}
var Pm = /^:[\w-]+$/,
  Im = 3,
  ty = 2,
  ey = 1,
  ly = 10,
  ay = -2,
  Xd = (c) => c === "*";
function uy(c, o) {
  let s = c.split("/"),
    r = s.length;
  return (
    s.some(Xd) && (r += ay),
    o && (r += ty),
    s
      .filter((h) => !Xd(h))
      .reduce((h, g) => h + (Pm.test(g) ? Im : g === "" ? ey : ly), r)
  );
}
function ny(c, o) {
  return c.length === o.length && c.slice(0, -1).every((r, h) => r === o[h])
    ? c[c.length - 1] - o[o.length - 1]
    : 0;
}
function iy(c, o, s = !1) {
  let { routesMeta: r } = c,
    h = {},
    g = "/",
    z = [];
  for (let M = 0; M < r.length; ++M) {
    let p = r[M],
      m = M === r.length - 1,
      R = g === "/" ? o : o.slice(g.length) || "/",
      B = In(
        { path: p.relativePath, caseSensitive: p.caseSensitive, end: m },
        R,
      ),
      H = p.route;
    if (
      (!B &&
        m &&
        s &&
        !r[r.length - 1].route.index &&
        (B = In(
          { path: p.relativePath, caseSensitive: p.caseSensitive, end: !1 },
          R,
        )),
      !B)
    )
      return null;
    Object.assign(h, B.params),
      z.push({
        params: h,
        pathname: Ke([g, B.pathname]),
        pathnameBase: dy(Ke([g, B.pathnameBase])),
        route: H,
      }),
      B.pathnameBase !== "/" && (g = Ke([g, B.pathnameBase]));
  }
  return z;
}
function In(c, o) {
  typeof c == "string" && (c = { path: c, caseSensitive: !1, end: !0 });
  let [s, r] = cy(c.path, c.caseSensitive, c.end),
    h = o.match(s);
  if (!h) return null;
  let g = h[0],
    z = g.replace(/(.)\/+$/, "$1"),
    M = h.slice(1);
  return {
    params: r.reduce((m, { paramName: R, isOptional: B }, H) => {
      if (R === "*") {
        let C = M[H] || "";
        z = g.slice(0, g.length - C.length).replace(/(.)\/+$/, "$1");
      }
      const L = M[H];
      return (
        B && !L ? (m[R] = void 0) : (m[R] = (L || "").replace(/%2F/g, "/")), m
      );
    }, {}),
    pathname: g,
    pathnameBase: z,
    pattern: c,
  };
}
function cy(c, o = !1, s = !0) {
  De(
    c === "*" || !c.endsWith("*") || c.endsWith("/*"),
    `Route path "${c}" will be treated as if it were "${c.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${c.replace(/\*$/, "/*")}".`,
  );
  let r = [],
    h =
      "^" +
      c
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (z, M, p) => (
            r.push({ paramName: M, isOptional: p != null }),
            p ? "/?([^\\/]+)?" : "/([^\\/]+)"
          ),
        );
  return (
    c.endsWith("*")
      ? (r.push({ paramName: "*" }),
        (h += c === "*" || c === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : s
        ? (h += "\\/*$")
        : c !== "" && c !== "/" && (h += "(?:(?=\\/|$))"),
    [new RegExp(h, o ? void 0 : "i"), r]
  );
}
function fy(c) {
  try {
    return c
      .split("/")
      .map((o) => decodeURIComponent(o).replace(/\//g, "%2F"))
      .join("/");
  } catch (o) {
    return (
      De(
        !1,
        `The URL path "${c}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${o}).`,
      ),
      c
    );
  }
}
function Je(c, o) {
  if (o === "/") return c;
  if (!c.toLowerCase().startsWith(o.toLowerCase())) return null;
  let s = o.endsWith("/") ? o.length - 1 : o.length,
    r = c.charAt(s);
  return r && r !== "/" ? null : c.slice(s) || "/";
}
function ry(c, o = "/") {
  let {
    pathname: s,
    search: r = "",
    hash: h = "",
  } = typeof c == "string" ? Oa(c) : c;
  return {
    pathname: s ? (s.startsWith("/") ? s : oy(s, o)) : o,
    search: hy(r),
    hash: my(h),
  };
}
function oy(c, o) {
  let s = o.replace(/\/+$/, "").split("/");
  return (
    c.split("/").forEach((h) => {
      h === ".." ? s.length > 1 && s.pop() : h !== "." && s.push(h);
    }),
    s.length > 1 ? s.join("/") : "/"
  );
}
function zf(c, o, s, r) {
  return `Cannot include a '${c}' character in a manually specified \`to.${o}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${s}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function sy(c) {
  return c.filter(
    (o, s) => s === 0 || (o.route.path && o.route.path.length > 0),
  );
}
function kd(c) {
  let o = sy(c);
  return o.map((s, r) => (r === o.length - 1 ? s.pathname : s.pathnameBase));
}
function Wd(c, o, s, r = !1) {
  let h;
  typeof c == "string"
    ? (h = Oa(c))
    : ((h = { ...c }),
      At(
        !h.pathname || !h.pathname.includes("?"),
        zf("?", "pathname", "search", h),
      ),
      At(
        !h.pathname || !h.pathname.includes("#"),
        zf("#", "pathname", "hash", h),
      ),
      At(!h.search || !h.search.includes("#"), zf("#", "search", "hash", h)));
  let g = c === "" || h.pathname === "",
    z = g ? "/" : h.pathname,
    M;
  if (z == null) M = s;
  else {
    let B = o.length - 1;
    if (!r && z.startsWith("..")) {
      let H = z.split("/");
      for (; H[0] === ".."; ) H.shift(), (B -= 1);
      h.pathname = H.join("/");
    }
    M = B >= 0 ? o[B] : "/";
  }
  let p = ry(h, M),
    m = z && z !== "/" && z.endsWith("/"),
    R = (g || z === ".") && s.endsWith("/");
  return !p.pathname.endsWith("/") && (m || R) && (p.pathname += "/"), p;
}
var Ke = (c) => c.join("/").replace(/\/\/+/g, "/"),
  dy = (c) => c.replace(/\/+$/, "").replace(/^\/*/, "/"),
  hy = (c) => (!c || c === "?" ? "" : c.startsWith("?") ? c : "?" + c),
  my = (c) => (!c || c === "#" ? "" : c.startsWith("#") ? c : "#" + c);
function yy(c) {
  return (
    c != null &&
    typeof c.status == "number" &&
    typeof c.statusText == "string" &&
    typeof c.internal == "boolean" &&
    "data" in c
  );
}
var Fd = ["POST", "PUT", "PATCH", "DELETE"];
new Set(Fd);
var vy = ["GET", ...Fd];
new Set(vy);
var Ma = x.createContext(null);
Ma.displayName = "DataRouter";
var ti = x.createContext(null);
ti.displayName = "DataRouterState";
var Pd = x.createContext({ isTransitioning: !1 });
Pd.displayName = "ViewTransition";
var gy = x.createContext(new Map());
gy.displayName = "Fetchers";
var Sy = x.createContext(null);
Sy.displayName = "Await";
var xe = x.createContext(null);
xe.displayName = "Navigation";
var Uu = x.createContext(null);
Uu.displayName = "Location";
var $e = x.createContext({ outlet: null, matches: [], isDataRoute: !1 });
$e.displayName = "Route";
var xf = x.createContext(null);
xf.displayName = "RouteError";
function py(c, { relative: o } = {}) {
  At(
    Nu(),
    "useHref() may be used only in the context of a <Router> component.",
  );
  let { basename: s, navigator: r } = x.useContext(xe),
    { hash: h, pathname: g, search: z } = Hu(c, { relative: o }),
    M = g;
  return (
    s !== "/" && (M = g === "/" ? s : Ke([s, g])),
    r.createHref({ pathname: M, search: z, hash: h })
  );
}
function Nu() {
  return x.useContext(Uu) != null;
}
function Gl() {
  return (
    At(
      Nu(),
      "useLocation() may be used only in the context of a <Router> component.",
    ),
    x.useContext(Uu).location
  );
}
var Id =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function th(c) {
  x.useContext(xe).static || x.useLayoutEffect(c);
}
function by() {
  let { isDataRoute: c } = x.useContext($e);
  return c ? Hy() : Ey();
}
function Ey() {
  At(
    Nu(),
    "useNavigate() may be used only in the context of a <Router> component.",
  );
  let c = x.useContext(Ma),
    { basename: o, navigator: s } = x.useContext(xe),
    { matches: r } = x.useContext($e),
    { pathname: h } = Gl(),
    g = JSON.stringify(kd(r)),
    z = x.useRef(!1);
  return (
    th(() => {
      z.current = !0;
    }),
    x.useCallback(
      (p, m = {}) => {
        if ((De(z.current, Id), !z.current)) return;
        if (typeof p == "number") {
          s.go(p);
          return;
        }
        let R = Wd(p, JSON.parse(g), h, m.relative === "path");
        c == null &&
          o !== "/" &&
          (R.pathname = R.pathname === "/" ? o : Ke([o, R.pathname])),
          (m.replace ? s.replace : s.push)(R, m.state, m);
      },
      [o, s, g, h, c],
    )
  );
}
x.createContext(null);
function Hu(c, { relative: o } = {}) {
  let { matches: s } = x.useContext($e),
    { pathname: r } = Gl(),
    h = JSON.stringify(kd(s));
  return x.useMemo(() => Wd(c, JSON.parse(h), r, o === "path"), [c, h, r, o]);
}
function Ty(c, o) {
  return eh(c, o);
}
function eh(c, o, s, r) {
  var P;
  At(
    Nu(),
    "useRoutes() may be used only in the context of a <Router> component.",
  );
  let { navigator: h, static: g } = x.useContext(xe),
    { matches: z } = x.useContext($e),
    M = z[z.length - 1],
    p = M ? M.params : {},
    m = M ? M.pathname : "/",
    R = M ? M.pathnameBase : "/",
    B = M && M.route;
  {
    let X = (B && B.path) || "";
    lh(
      m,
      !B || X.endsWith("*") || X.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${m}" (under <Route path="${X}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${X}"> to <Route path="${X === "/" ? "*" : `${X}/*`}">.`,
    );
  }
  let H = Gl(),
    L;
  if (o) {
    let X = typeof o == "string" ? Oa(o) : o;
    At(
      R === "/" || ((P = X.pathname) == null ? void 0 : P.startsWith(R)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${R}" but pathname "${X.pathname}" was given in the \`location\` prop.`,
    ),
      (L = X);
  } else L = H;
  let C = L.pathname || "/",
    w = C;
  if (R !== "/") {
    let X = R.replace(/^\//, "").split("/");
    w = "/" + C.replace(/^\//, "").split("/").slice(X.length).join("/");
  }
  let G =
    !g && s && s.matches && s.matches.length > 0
      ? s.matches
      : Kd(c, { pathname: w });
  De(
    B || G != null,
    `No routes matched location "${L.pathname}${L.search}${L.hash}" `,
  ),
    De(
      G == null ||
        G[G.length - 1].route.element !== void 0 ||
        G[G.length - 1].route.Component !== void 0 ||
        G[G.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${L.pathname}${L.search}${L.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`,
    );
  let q = My(
    G &&
      G.map((X) =>
        Object.assign({}, X, {
          params: Object.assign({}, p, X.params),
          pathname: Ke([
            R,
            h.encodeLocation
              ? h.encodeLocation(X.pathname).pathname
              : X.pathname,
          ]),
          pathnameBase:
            X.pathnameBase === "/"
              ? R
              : Ke([
                  R,
                  h.encodeLocation
                    ? h.encodeLocation(X.pathnameBase).pathname
                    : X.pathnameBase,
                ]),
        }),
      ),
    z,
    s,
    r,
  );
  return o && q
    ? x.createElement(
        Uu.Provider,
        {
          value: {
            location: {
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default",
              ...L,
            },
            navigationType: "POP",
          },
        },
        q,
      )
    : q;
}
function Ay() {
  let c = Ny(),
    o = yy(c)
      ? `${c.status} ${c.statusText}`
      : c instanceof Error
        ? c.message
        : JSON.stringify(c),
    s = c instanceof Error ? c.stack : null,
    r = "rgba(200,200,200, 0.5)",
    h = { padding: "0.5rem", backgroundColor: r },
    g = { padding: "2px 4px", backgroundColor: r },
    z = null;
  return (
    console.error("Error handled by React Router default ErrorBoundary:", c),
    (z = x.createElement(
      x.Fragment,
      null,
      x.createElement("p", null, "💿 Hey developer 👋"),
      x.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        x.createElement("code", { style: g }, "ErrorBoundary"),
        " or",
        " ",
        x.createElement("code", { style: g }, "errorElement"),
        " prop on your route.",
      ),
    )),
    x.createElement(
      x.Fragment,
      null,
      x.createElement("h2", null, "Unexpected Application Error!"),
      x.createElement("h3", { style: { fontStyle: "italic" } }, o),
      s ? x.createElement("pre", { style: h }, s) : null,
      z,
    )
  );
}
var Ry = x.createElement(Ay, null),
  zy = class extends x.Component {
    constructor(c) {
      super(c),
        (this.state = {
          location: c.location,
          revalidation: c.revalidation,
          error: c.error,
        });
    }
    static getDerivedStateFromError(c) {
      return { error: c };
    }
    static getDerivedStateFromProps(c, o) {
      return o.location !== c.location ||
        (o.revalidation !== "idle" && c.revalidation === "idle")
        ? { error: c.error, location: c.location, revalidation: c.revalidation }
        : {
            error: c.error !== void 0 ? c.error : o.error,
            location: o.location,
            revalidation: c.revalidation || o.revalidation,
          };
    }
    componentDidCatch(c, o) {
      console.error(
        "React Router caught the following error during render",
        c,
        o,
      );
    }
    render() {
      return this.state.error !== void 0
        ? x.createElement(
            $e.Provider,
            { value: this.props.routeContext },
            x.createElement(xf.Provider, {
              value: this.state.error,
              children: this.props.component,
            }),
          )
        : this.props.children;
    }
  };
function Oy({ routeContext: c, match: o, children: s }) {
  let r = x.useContext(Ma);
  return (
    r &&
      r.static &&
      r.staticContext &&
      (o.route.errorElement || o.route.ErrorBoundary) &&
      (r.staticContext._deepestRenderedBoundaryId = o.route.id),
    x.createElement($e.Provider, { value: c }, s)
  );
}
function My(c, o = [], s = null, r = null) {
  if (c == null) {
    if (!s) return null;
    if (s.errors) c = s.matches;
    else if (o.length === 0 && !s.initialized && s.matches.length > 0)
      c = s.matches;
    else return null;
  }
  let h = c,
    g = s == null ? void 0 : s.errors;
  if (g != null) {
    let p = h.findIndex(
      (m) => m.route.id && (g == null ? void 0 : g[m.route.id]) !== void 0,
    );
    At(
      p >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(g).join(",")}`,
    ),
      (h = h.slice(0, Math.min(h.length, p + 1)));
  }
  let z = !1,
    M = -1;
  if (s)
    for (let p = 0; p < h.length; p++) {
      let m = h[p];
      if (
        ((m.route.HydrateFallback || m.route.hydrateFallbackElement) && (M = p),
        m.route.id)
      ) {
        let { loaderData: R, errors: B } = s,
          H =
            m.route.loader &&
            !R.hasOwnProperty(m.route.id) &&
            (!B || B[m.route.id] === void 0);
        if (m.route.lazy || H) {
          (z = !0), M >= 0 ? (h = h.slice(0, M + 1)) : (h = [h[0]]);
          break;
        }
      }
    }
  return h.reduceRight((p, m, R) => {
    let B,
      H = !1,
      L = null,
      C = null;
    s &&
      ((B = g && m.route.id ? g[m.route.id] : void 0),
      (L = m.route.errorElement || Ry),
      z &&
        (M < 0 && R === 0
          ? (lh(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration",
            ),
            (H = !0),
            (C = null))
          : M === R &&
            ((H = !0), (C = m.route.hydrateFallbackElement || null))));
    let w = o.concat(h.slice(0, R + 1)),
      G = () => {
        let q;
        return (
          B
            ? (q = L)
            : H
              ? (q = C)
              : m.route.Component
                ? (q = x.createElement(m.route.Component, null))
                : m.route.element
                  ? (q = m.route.element)
                  : (q = p),
          x.createElement(Oy, {
            match: m,
            routeContext: { outlet: p, matches: w, isDataRoute: s != null },
            children: q,
          })
        );
      };
    return s && (m.route.ErrorBoundary || m.route.errorElement || R === 0)
      ? x.createElement(zy, {
          location: s.location,
          revalidation: s.revalidation,
          component: L,
          error: B,
          children: G(),
          routeContext: { outlet: null, matches: w, isDataRoute: !0 },
        })
      : G();
  }, null);
}
function Uf(c) {
  return `${c} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function _y(c) {
  let o = x.useContext(Ma);
  return At(o, Uf(c)), o;
}
function Dy(c) {
  let o = x.useContext(ti);
  return At(o, Uf(c)), o;
}
function xy(c) {
  let o = x.useContext($e);
  return At(o, Uf(c)), o;
}
function Nf(c) {
  let o = xy(c),
    s = o.matches[o.matches.length - 1];
  return (
    At(
      s.route.id,
      `${c} can only be used on routes that contain a unique "id"`,
    ),
    s.route.id
  );
}
function Uy() {
  return Nf("useRouteId");
}
function Ny() {
  var r;
  let c = x.useContext(xf),
    o = Dy("useRouteError"),
    s = Nf("useRouteError");
  return c !== void 0 ? c : (r = o.errors) == null ? void 0 : r[s];
}
function Hy() {
  let { router: c } = _y("useNavigate"),
    o = Nf("useNavigate"),
    s = x.useRef(!1);
  return (
    th(() => {
      s.current = !0;
    }),
    x.useCallback(
      async (h, g = {}) => {
        De(s.current, Id),
          s.current &&
            (typeof h == "number"
              ? c.navigate(h)
              : await c.navigate(h, { fromRouteId: o, ...g }));
      },
      [c, o],
    )
  );
}
var Qd = {};
function lh(c, o, s) {
  !o && !Qd[c] && ((Qd[c] = !0), De(!1, s));
}
x.memo(Cy);
function Cy({ routes: c, future: o, state: s }) {
  return eh(c, void 0, s, o);
}
function Du(c) {
  At(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.",
  );
}
function By({
  basename: c = "/",
  children: o = null,
  location: s,
  navigationType: r = "POP",
  navigator: h,
  static: g = !1,
}) {
  At(
    !Nu(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.",
  );
  let z = c.replace(/^\/*/, "/"),
    M = x.useMemo(
      () => ({ basename: z, navigator: h, static: g, future: {} }),
      [z, h, g],
    );
  typeof s == "string" && (s = Oa(s));
  let {
      pathname: p = "/",
      search: m = "",
      hash: R = "",
      state: B = null,
      key: H = "default",
    } = s,
    L = x.useMemo(() => {
      let C = Je(p, z);
      return C == null
        ? null
        : {
            location: { pathname: C, search: m, hash: R, state: B, key: H },
            navigationType: r,
          };
    }, [z, p, m, R, B, H, r]);
  return (
    De(
      L != null,
      `<Router basename="${z}"> is not able to match the URL "${p}${m}${R}" because it does not start with the basename, so the <Router> won't render anything.`,
    ),
    L == null
      ? null
      : x.createElement(
          xe.Provider,
          { value: M },
          x.createElement(Uu.Provider, { children: o, value: L }),
        )
  );
}
function qy({ children: c, location: o }) {
  return Ty(_f(c), o);
}
function _f(c, o = []) {
  let s = [];
  return (
    x.Children.forEach(c, (r, h) => {
      if (!x.isValidElement(r)) return;
      let g = [...o, h];
      if (r.type === x.Fragment) {
        s.push.apply(s, _f(r.props.children, g));
        return;
      }
      At(
        r.type === Du,
        `[${typeof r.type == "string" ? r.type : r.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`,
      ),
        At(
          !r.props.index || !r.props.children,
          "An index route cannot have child routes.",
        );
      let z = {
        id: r.props.id || g.join("-"),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        loader: r.props.loader,
        action: r.props.action,
        hydrateFallbackElement: r.props.hydrateFallbackElement,
        HydrateFallback: r.props.HydrateFallback,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary:
          r.props.hasErrorBoundary === !0 ||
          r.props.ErrorBoundary != null ||
          r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      };
      r.props.children && (z.children = _f(r.props.children, g)), s.push(z);
    }),
    s
  );
}
var Fn = "get",
  Pn = "application/x-www-form-urlencoded";
function ei(c) {
  return c != null && typeof c.tagName == "string";
}
function Yy(c) {
  return ei(c) && c.tagName.toLowerCase() === "button";
}
function Ly(c) {
  return ei(c) && c.tagName.toLowerCase() === "form";
}
function jy(c) {
  return ei(c) && c.tagName.toLowerCase() === "input";
}
function Gy(c) {
  return !!(c.metaKey || c.altKey || c.ctrlKey || c.shiftKey);
}
function Xy(c, o) {
  return c.button === 0 && (!o || o === "_self") && !Gy(c);
}
var Wn = null;
function Qy() {
  if (Wn === null)
    try {
      new FormData(document.createElement("form"), 0), (Wn = !1);
    } catch {
      Wn = !0;
    }
  return Wn;
}
var Zy = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function Of(c) {
  return c != null && !Zy.has(c)
    ? (De(
        !1,
        `"${c}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Pn}"`,
      ),
      null)
    : c;
}
function wy(c, o) {
  let s, r, h, g, z;
  if (Ly(c)) {
    let M = c.getAttribute("action");
    (r = M ? Je(M, o) : null),
      (s = c.getAttribute("method") || Fn),
      (h = Of(c.getAttribute("enctype")) || Pn),
      (g = new FormData(c));
  } else if (Yy(c) || (jy(c) && (c.type === "submit" || c.type === "image"))) {
    let M = c.form;
    if (M == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>',
      );
    let p = c.getAttribute("formaction") || M.getAttribute("action");
    if (
      ((r = p ? Je(p, o) : null),
      (s = c.getAttribute("formmethod") || M.getAttribute("method") || Fn),
      (h =
        Of(c.getAttribute("formenctype")) ||
        Of(M.getAttribute("enctype")) ||
        Pn),
      (g = new FormData(M, c)),
      !Qy())
    ) {
      let { name: m, type: R, value: B } = c;
      if (R === "image") {
        let H = m ? `${m}.` : "";
        g.append(`${H}x`, "0"), g.append(`${H}y`, "0");
      } else m && g.append(m, B);
    }
  } else {
    if (ei(c))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">',
      );
    (s = Fn), (r = null), (h = Pn), (z = c);
  }
  return (
    g && h === "text/plain" && ((z = g), (g = void 0)),
    { action: r, method: s.toLowerCase(), encType: h, formData: g, body: z }
  );
}
function Hf(c, o) {
  if (c === !1 || c === null || typeof c > "u") throw new Error(o);
}
async function Vy(c, o) {
  if (c.id in o) return o[c.id];
  try {
    let s = await import(c.module);
    return (o[c.id] = s), s;
  } catch (s) {
    return (
      console.error(
        `Error loading route module \`${c.module}\`, reloading page...`,
      ),
      console.error(s),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function Ky(c) {
  return c == null
    ? !1
    : c.href == null
      ? c.rel === "preload" &&
        typeof c.imageSrcSet == "string" &&
        typeof c.imageSizes == "string"
      : typeof c.rel == "string" && typeof c.href == "string";
}
async function Jy(c, o, s) {
  let r = await Promise.all(
    c.map(async (h) => {
      let g = o.routes[h.route.id];
      if (g) {
        let z = await Vy(g, s);
        return z.links ? z.links() : [];
      }
      return [];
    }),
  );
  return Fy(
    r
      .flat(1)
      .filter(Ky)
      .filter((h) => h.rel === "stylesheet" || h.rel === "preload")
      .map((h) =>
        h.rel === "stylesheet"
          ? { ...h, rel: "prefetch", as: "style" }
          : { ...h, rel: "prefetch" },
      ),
  );
}
function Zd(c, o, s, r, h, g) {
  let z = (p, m) => (s[m] ? p.route.id !== s[m].route.id : !0),
    M = (p, m) => {
      var R;
      return (
        s[m].pathname !== p.pathname ||
        (((R = s[m].route.path) == null ? void 0 : R.endsWith("*")) &&
          s[m].params["*"] !== p.params["*"])
      );
    };
  return g === "assets"
    ? o.filter((p, m) => z(p, m) || M(p, m))
    : g === "data"
      ? o.filter((p, m) => {
          var B;
          let R = r.routes[p.route.id];
          if (!R || !R.hasLoader) return !1;
          if (z(p, m) || M(p, m)) return !0;
          if (p.route.shouldRevalidate) {
            let H = p.route.shouldRevalidate({
              currentUrl: new URL(
                h.pathname + h.search + h.hash,
                window.origin,
              ),
              currentParams: ((B = s[0]) == null ? void 0 : B.params) || {},
              nextUrl: new URL(c, window.origin),
              nextParams: p.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof H == "boolean") return H;
          }
          return !0;
        })
      : [];
}
function $y(c, o, { includeHydrateFallback: s } = {}) {
  return ky(
    c
      .map((r) => {
        let h = o.routes[r.route.id];
        if (!h) return [];
        let g = [h.module];
        return (
          h.clientActionModule && (g = g.concat(h.clientActionModule)),
          h.clientLoaderModule && (g = g.concat(h.clientLoaderModule)),
          s &&
            h.hydrateFallbackModule &&
            (g = g.concat(h.hydrateFallbackModule)),
          h.imports && (g = g.concat(h.imports)),
          g
        );
      })
      .flat(1),
  );
}
function ky(c) {
  return [...new Set(c)];
}
function Wy(c) {
  let o = {},
    s = Object.keys(c).sort();
  for (let r of s) o[r] = c[r];
  return o;
}
function Fy(c, o) {
  let s = new Set();
  return (
    new Set(o),
    c.reduce((r, h) => {
      let g = JSON.stringify(Wy(h));
      return s.has(g) || (s.add(g), r.push({ key: g, link: h })), r;
    }, [])
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var Py = new Set([100, 101, 204, 205]);
function Iy(c, o) {
  let s =
    typeof c == "string"
      ? new URL(
          c,
          typeof window > "u"
            ? "server://singlefetch/"
            : window.location.origin,
        )
      : c;
  return (
    s.pathname === "/"
      ? (s.pathname = "_root.data")
      : o && Je(s.pathname, o) === "/"
        ? (s.pathname = `${o.replace(/\/$/, "")}/_root.data`)
        : (s.pathname = `${s.pathname.replace(/\/$/, "")}.data`),
    s
  );
}
function ah() {
  let c = x.useContext(Ma);
  return (
    Hf(
      c,
      "You must render this element inside a <DataRouterContext.Provider> element",
    ),
    c
  );
}
function tv() {
  let c = x.useContext(ti);
  return (
    Hf(
      c,
      "You must render this element inside a <DataRouterStateContext.Provider> element",
    ),
    c
  );
}
var Cf = x.createContext(void 0);
Cf.displayName = "FrameworkContext";
function uh() {
  let c = x.useContext(Cf);
  return (
    Hf(c, "You must render this element inside a <HydratedRouter> element"), c
  );
}
function ev(c, o) {
  let s = x.useContext(Cf),
    [r, h] = x.useState(!1),
    [g, z] = x.useState(!1),
    {
      onFocus: M,
      onBlur: p,
      onMouseEnter: m,
      onMouseLeave: R,
      onTouchStart: B,
    } = o,
    H = x.useRef(null);
  x.useEffect(() => {
    if ((c === "render" && z(!0), c === "viewport")) {
      let w = (q) => {
          q.forEach((P) => {
            z(P.isIntersecting);
          });
        },
        G = new IntersectionObserver(w, { threshold: 0.5 });
      return (
        H.current && G.observe(H.current),
        () => {
          G.disconnect();
        }
      );
    }
  }, [c]),
    x.useEffect(() => {
      if (r) {
        let w = setTimeout(() => {
          z(!0);
        }, 100);
        return () => {
          clearTimeout(w);
        };
      }
    }, [r]);
  let L = () => {
      h(!0);
    },
    C = () => {
      h(!1), z(!1);
    };
  return s
    ? c !== "intent"
      ? [g, H, {}]
      : [
          g,
          H,
          {
            onFocus: _u(M, L),
            onBlur: _u(p, C),
            onMouseEnter: _u(m, L),
            onMouseLeave: _u(R, C),
            onTouchStart: _u(B, L),
          },
        ]
    : [!1, H, {}];
}
function _u(c, o) {
  return (s) => {
    c && c(s), s.defaultPrevented || o(s);
  };
}
function lv({ page: c, ...o }) {
  let { router: s } = ah(),
    r = x.useMemo(() => Kd(s.routes, c, s.basename), [s.routes, c, s.basename]);
  return r ? x.createElement(uv, { page: c, matches: r, ...o }) : null;
}
function av(c) {
  let { manifest: o, routeModules: s } = uh(),
    [r, h] = x.useState([]);
  return (
    x.useEffect(() => {
      let g = !1;
      return (
        Jy(c, o, s).then((z) => {
          g || h(z);
        }),
        () => {
          g = !0;
        }
      );
    }, [c, o, s]),
    r
  );
}
function uv({ page: c, matches: o, ...s }) {
  let r = Gl(),
    { manifest: h, routeModules: g } = uh(),
    { basename: z } = ah(),
    { loaderData: M, matches: p } = tv(),
    m = x.useMemo(() => Zd(c, o, p, h, r, "data"), [c, o, p, h, r]),
    R = x.useMemo(() => Zd(c, o, p, h, r, "assets"), [c, o, p, h, r]),
    B = x.useMemo(() => {
      if (c === r.pathname + r.search + r.hash) return [];
      let C = new Set(),
        w = !1;
      if (
        (o.forEach((q) => {
          var X;
          let P = h.routes[q.route.id];
          !P ||
            !P.hasLoader ||
            ((!m.some((it) => it.route.id === q.route.id) &&
              q.route.id in M &&
              (X = g[q.route.id]) != null &&
              X.shouldRevalidate) ||
            P.hasClientLoader
              ? (w = !0)
              : C.add(q.route.id));
        }),
        C.size === 0)
      )
        return [];
      let G = Iy(c, z);
      return (
        w &&
          C.size > 0 &&
          G.searchParams.set(
            "_routes",
            o
              .filter((q) => C.has(q.route.id))
              .map((q) => q.route.id)
              .join(","),
          ),
        [G.pathname + G.search]
      );
    }, [z, M, r, h, m, o, c, g]),
    H = x.useMemo(() => $y(R, h), [R, h]),
    L = av(R);
  return x.createElement(
    x.Fragment,
    null,
    B.map((C) =>
      x.createElement("link", {
        key: C,
        rel: "prefetch",
        as: "fetch",
        href: C,
        ...s,
      }),
    ),
    H.map((C) =>
      x.createElement("link", { key: C, rel: "modulepreload", href: C, ...s }),
    ),
    L.map(({ key: C, link: w }) => x.createElement("link", { key: C, ...w })),
  );
}
function nv(...c) {
  return (o) => {
    c.forEach((s) => {
      typeof s == "function" ? s(o) : s != null && (s.current = o);
    });
  };
}
var nh =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  nh && (window.__reactRouterVersion = "7.6.0");
} catch {}
function iv({ basename: c, children: o, window: s }) {
  let r = x.useRef();
  r.current == null && (r.current = Km({ window: s, v5Compat: !0 }));
  let h = r.current,
    [g, z] = x.useState({ action: h.action, location: h.location }),
    M = x.useCallback(
      (p) => {
        x.startTransition(() => z(p));
      },
      [z],
    );
  return (
    x.useLayoutEffect(() => h.listen(M), [h, M]),
    x.createElement(By, {
      basename: c,
      children: o,
      location: g.location,
      navigationType: g.action,
      navigator: h,
    })
  );
}
var ih = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  ch = x.forwardRef(function (
    {
      onClick: o,
      discover: s = "render",
      prefetch: r = "none",
      relative: h,
      reloadDocument: g,
      replace: z,
      state: M,
      target: p,
      to: m,
      preventScrollReset: R,
      viewTransition: B,
      ...H
    },
    L,
  ) {
    let { basename: C } = x.useContext(xe),
      w = typeof m == "string" && ih.test(m),
      G,
      q = !1;
    if (typeof m == "string" && w && ((G = m), nh))
      try {
        let pt = new URL(window.location.href),
          Jt = m.startsWith("//") ? new URL(pt.protocol + m) : new URL(m),
          oe = Je(Jt.pathname, C);
        Jt.origin === pt.origin && oe != null
          ? (m = oe + Jt.search + Jt.hash)
          : (q = !0);
      } catch {
        De(
          !1,
          `<Link to="${m}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`,
        );
      }
    let P = py(m, { relative: h }),
      [X, it, F] = ev(r, H),
      xt = rv(m, {
        replace: z,
        state: M,
        target: p,
        preventScrollReset: R,
        relative: h,
        viewTransition: B,
      });
    function Rt(pt) {
      o && o(pt), pt.defaultPrevented || xt(pt);
    }
    let Mt = x.createElement("a", {
      ...H,
      ...F,
      href: G || P,
      onClick: q || g ? o : Rt,
      ref: nv(L, it),
      target: p,
      "data-discover": !w && s === "render" ? "true" : void 0,
    });
    return X && !w
      ? x.createElement(x.Fragment, null, Mt, x.createElement(lv, { page: P }))
      : Mt;
  });
ch.displayName = "Link";
var fh = x.forwardRef(function (
  {
    "aria-current": o = "page",
    caseSensitive: s = !1,
    className: r = "",
    end: h = !1,
    style: g,
    to: z,
    viewTransition: M,
    children: p,
    ...m
  },
  R,
) {
  let B = Hu(z, { relative: m.relative }),
    H = Gl(),
    L = x.useContext(ti),
    { navigator: C, basename: w } = x.useContext(xe),
    G = L != null && mv(B) && M === !0,
    q = C.encodeLocation ? C.encodeLocation(B).pathname : B.pathname,
    P = H.pathname,
    X =
      L && L.navigation && L.navigation.location
        ? L.navigation.location.pathname
        : null;
  s ||
    ((P = P.toLowerCase()),
    (X = X ? X.toLowerCase() : null),
    (q = q.toLowerCase())),
    X && w && (X = Je(X, w) || X);
  const it = q !== "/" && q.endsWith("/") ? q.length - 1 : q.length;
  let F = P === q || (!h && P.startsWith(q) && P.charAt(it) === "/"),
    xt =
      X != null &&
      (X === q || (!h && X.startsWith(q) && X.charAt(q.length) === "/")),
    Rt = { isActive: F, isPending: xt, isTransitioning: G },
    Mt = F ? o : void 0,
    pt;
  typeof r == "function"
    ? (pt = r(Rt))
    : (pt = [
        r,
        F ? "active" : null,
        xt ? "pending" : null,
        G ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "));
  let Jt = typeof g == "function" ? g(Rt) : g;
  return x.createElement(
    ch,
    {
      ...m,
      "aria-current": Mt,
      className: pt,
      ref: R,
      style: Jt,
      to: z,
      viewTransition: M,
    },
    typeof p == "function" ? p(Rt) : p,
  );
});
fh.displayName = "NavLink";
var cv = x.forwardRef(
  (
    {
      discover: c = "render",
      fetcherKey: o,
      navigate: s,
      reloadDocument: r,
      replace: h,
      state: g,
      method: z = Fn,
      action: M,
      onSubmit: p,
      relative: m,
      preventScrollReset: R,
      viewTransition: B,
      ...H
    },
    L,
  ) => {
    let C = dv(),
      w = hv(M, { relative: m }),
      G = z.toLowerCase() === "get" ? "get" : "post",
      q = typeof M == "string" && ih.test(M),
      P = (X) => {
        if ((p && p(X), X.defaultPrevented)) return;
        X.preventDefault();
        let it = X.nativeEvent.submitter,
          F = (it == null ? void 0 : it.getAttribute("formmethod")) || z;
        C(it || X.currentTarget, {
          fetcherKey: o,
          method: F,
          navigate: s,
          replace: h,
          state: g,
          relative: m,
          preventScrollReset: R,
          viewTransition: B,
        });
      };
    return x.createElement("form", {
      ref: L,
      method: G,
      action: w,
      onSubmit: r ? p : P,
      ...H,
      "data-discover": !q && c === "render" ? "true" : void 0,
    });
  },
);
cv.displayName = "Form";
function fv(c) {
  return `${c} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function rh(c) {
  let o = x.useContext(Ma);
  return At(o, fv(c)), o;
}
function rv(
  c,
  {
    target: o,
    replace: s,
    state: r,
    preventScrollReset: h,
    relative: g,
    viewTransition: z,
  } = {},
) {
  let M = by(),
    p = Gl(),
    m = Hu(c, { relative: g });
  return x.useCallback(
    (R) => {
      if (Xy(R, o)) {
        R.preventDefault();
        let B = s !== void 0 ? s : xu(p) === xu(m);
        M(c, {
          replace: B,
          state: r,
          preventScrollReset: h,
          relative: g,
          viewTransition: z,
        });
      }
    },
    [p, M, m, s, r, o, c, h, g, z],
  );
}
var ov = 0,
  sv = () => `__${String(++ov)}__`;
function dv() {
  let { router: c } = rh("useSubmit"),
    { basename: o } = x.useContext(xe),
    s = Uy();
  return x.useCallback(
    async (r, h = {}) => {
      let { action: g, method: z, encType: M, formData: p, body: m } = wy(r, o);
      if (h.navigate === !1) {
        let R = h.fetcherKey || sv();
        await c.fetch(R, s, h.action || g, {
          preventScrollReset: h.preventScrollReset,
          formData: p,
          body: m,
          formMethod: h.method || z,
          formEncType: h.encType || M,
          flushSync: h.flushSync,
        });
      } else
        await c.navigate(h.action || g, {
          preventScrollReset: h.preventScrollReset,
          formData: p,
          body: m,
          formMethod: h.method || z,
          formEncType: h.encType || M,
          replace: h.replace,
          state: h.state,
          fromRouteId: s,
          flushSync: h.flushSync,
          viewTransition: h.viewTransition,
        });
    },
    [c, o, s],
  );
}
function hv(c, { relative: o } = {}) {
  let { basename: s } = x.useContext(xe),
    r = x.useContext($e);
  At(r, "useFormAction must be used inside a RouteContext");
  let [h] = r.matches.slice(-1),
    g = { ...Hu(c || ".", { relative: o }) },
    z = Gl();
  if (c == null) {
    g.search = z.search;
    let M = new URLSearchParams(g.search),
      p = M.getAll("index");
    if (p.some((R) => R === "")) {
      M.delete("index"),
        p.filter((B) => B).forEach((B) => M.append("index", B));
      let R = M.toString();
      g.search = R ? `?${R}` : "";
    }
  }
  return (
    (!c || c === ".") &&
      h.route.index &&
      (g.search = g.search ? g.search.replace(/^\?/, "?index&") : "?index"),
    s !== "/" && (g.pathname = g.pathname === "/" ? s : Ke([s, g.pathname])),
    xu(g)
  );
}
function mv(c, o = {}) {
  let s = x.useContext(Pd);
  At(
    s != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?",
  );
  let { basename: r } = rh("useViewTransitionState"),
    h = Hu(c, { relative: o.relative });
  if (!s.isTransitioning) return !1;
  let g = Je(s.currentLocation.pathname, r) || s.currentLocation.pathname,
    z = Je(s.nextLocation.pathname, r) || s.nextLocation.pathname;
  return In(h.pathname, z) != null || In(h.pathname, g) != null;
}
[...Py];
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const yv = (c) => c.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  vv = (c) =>
    c.replace(/^([A-Z])|[\s-_]+(\w)/g, (o, s, r) =>
      r ? r.toUpperCase() : s.toLowerCase(),
    ),
  wd = (c) => {
    const o = vv(c);
    return o.charAt(0).toUpperCase() + o.slice(1);
  },
  oh = (...c) =>
    c
      .filter((o, s, r) => !!o && o.trim() !== "" && r.indexOf(o) === s)
      .join(" ")
      .trim(),
  gv = (c) => {
    for (const o in c)
      if (o.startsWith("aria-") || o === "role" || o === "title") return !0;
  };
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var Sv = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const pv = x.forwardRef(
  (
    {
      color: c = "currentColor",
      size: o = 24,
      strokeWidth: s = 2,
      absoluteStrokeWidth: r,
      className: h = "",
      children: g,
      iconNode: z,
      ...M
    },
    p,
  ) =>
    x.createElement(
      "svg",
      {
        ref: p,
        ...Sv,
        width: o,
        height: o,
        stroke: c,
        strokeWidth: r ? (Number(s) * 24) / Number(o) : s,
        className: oh("lucide", h),
        ...(!g && !gv(M) && { "aria-hidden": "true" }),
        ...M,
      },
      [
        ...z.map(([m, R]) => x.createElement(m, R)),
        ...(Array.isArray(g) ? g : [g]),
      ],
    ),
);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const li = (c, o) => {
  const s = x.forwardRef(({ className: r, ...h }, g) =>
    x.createElement(pv, {
      ref: g,
      iconNode: o,
      className: oh(`lucide-${yv(wd(c))}`, `lucide-${c}`, r),
      ...h,
    }),
  );
  return (s.displayName = wd(c)), s;
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const bv = [
    [
      "path",
      {
        d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
        key: "k3hazp",
      },
    ],
  ],
  Ev = li("book", bv);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Tv = [
    [
      "path",
      { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" },
    ],
    [
      "path",
      {
        d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
        key: "1d0kgt",
      },
    ],
  ],
  Av = li("house", Tv);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Rv = [
    [
      "path",
      {
        d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
        key: "1qme2f",
      },
    ],
    ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
  ],
  zv = li("settings", Rv);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ov = [
    ["path", { d: "M12 19h8", key: "baeox8" }],
    ["path", { d: "m4 17 6-6-6-6", key: "1yngyt" }],
  ],
  Mv = li("terminal", Ov),
  _v = [
    { to: "/", label: "Dashboard", icon: gt.jsx(Av, { className: "w-5 h-5" }) },
    { to: "/logs", label: "Logs", icon: gt.jsx(Ev, { className: "w-5 h-5" }) },
    {
      to: "/commands",
      label: "Commands",
      icon: gt.jsx(Mv, { className: "w-5 h-5" }),
    },
    {
      to: "/settings",
      label: "Settings",
      icon: gt.jsx(zv, { className: "w-5 h-5" }),
    },
  ];
function Dv() {
  return gt.jsxs("aside", {
    className: "w-64 bg-gray-900 text-white flex flex-col",
    children: [
      gt.jsx("div", {
        className: "p-6 text-xl font-bold",
        children: "Hydrion",
      }),
      gt.jsx("nav", {
        className: "flex-1",
        children: _v.map(({ to: c, label: o, icon: s }) =>
          gt.jsxs(
            fh,
            {
              to: c,
              className: ({ isActive: r }) =>
                `flex items-center gap-3 px-6 py-3 hover:bg-gray-700 transition ${r ? "bg-gray-800" : ""}`,
              children: [s, o],
            },
            c,
          ),
        ),
      }),
    ],
  });
}
function xv() {
  return gt.jsx("h1", {
    className: "text-3xl font-bold",
    children: "Dashboard",
  });
}
function Uv() {
  return gt.jsx("h1", { className: "text-3xl font-bold", children: "Logs" });
}
function Nv() {
  return gt.jsx("h1", {
    className: "text-3xl font-bold",
    children: "Settings",
  });
}
function Hv() {
  return gt.jsx("h1", {
    className: "text-3xl font-bold",
    children: "Commands",
  });
}
function Cv() {
  return gt.jsxs("div", {
    className: "flex h-screen bg-gray-100",
    children: [
      gt.jsx(Dv, {}),
      gt.jsx("main", {
        className: "flex-1 p-6 overflow-y-auto",
        children: gt.jsxs(qy, {
          children: [
            gt.jsx(Du, { path: "/", element: gt.jsx(xv, {}) }),
            gt.jsx(Du, { path: "/logs", element: gt.jsx(Uv, {}) }),
            gt.jsx(Du, { path: "/settings", element: gt.jsx(Nv, {}) }),
            gt.jsx(Du, { path: "/commands", element: gt.jsx(Hv, {}) }),
          ],
        }),
      }),
    ],
  });
}
wm.createRoot(document.getElementById("root")).render(
  gt.jsx(qm.StrictMode, { children: gt.jsx(iv, { children: gt.jsx(Cv, {}) }) }),
);
