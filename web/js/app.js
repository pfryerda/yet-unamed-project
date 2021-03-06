
/**
 * App.js v2.0.0
 * Instant mobile web app creation
 * Copyright (c) 2012 Kik Interactive, http://kik.com
 * Released under the MIT license
 *
 * swapper.js 1.1.1
 * UI navigation and transition utility
 * Copyright (c) 2012 Kik Interactive, http://kik.com
 * Released under the MIT license
 *
 * clickable.js v1.3.4
 * Seamless buttons for mobile devices
 * Copyright (c) 2012 Kik Interactive, http://kik.com
 * Released under the MIT license
 *
 * scrollable.js v1.0.0
 * Seamless scrolling for mobile devices
 * Copyright (c) 2012 Kik Interactive, http://kik.com
 * Released under the MIT license
 *
 * iScroll v4.1.6
 * Copyright (c) 2011 Matteo Spinelli, http://cubiq.org
 * Released under the MIT license
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
var Swapper = function (f, d) {
    function e(h, i, c, b) {
        e._swapper(h, i, c, b)
    }
    if (f && f.fn) {
        f.extend(f.fn, {
            swapper: function (g, c, b) {
                g = f(g)[0];
                this.forEach(function (h) {
                    e._swapper(h, g, c, b)
                });
                return this
            }
        })
    }
    if (d && d.fn) {
        d.fn.swapper = function (g, c, b) {
            g = d(g)[0];
            this.each(function () {
                e._swapper(this, g, c, b)
            });
            return this
        }
    }
    return e
}(window.Zepto, window.jQuery);
Swapper._os = function (i, k) {
    var l, h, g;
    if (g = /\bCPU.*OS (\d+(_\d+)?)/i.exec(i)) {
        l = "ios";
        h = g[1].replace("_", ".")
    } else {
        if (g = /\bAndroid (\d+(\.\d+)?)/.exec(i)) {
            l = "android";
            h = g[1]
        }
    }
    var j = {
        name: l,
        version: h && k(h)
    };
    j[l] = true;
    return j
}(navigator.userAgent, parseFloat);
Swapper._isNode = function (d, c) {
    return function (b) {
        if (!b) {
            return false
        }
        try {
            return (b instanceof d) || (b instanceof c)
        } catch (e) {}
        if (typeof b !== "object") {
            return false
        }
        if (typeof b.nodeType !== "number") {
            return false
        }
        if (typeof b.nodeName !== "string") {
            return false
        }
        return true
    }
}(Node, HTMLElement);
Swapper._isInDOM = function (b) {
    return function (e, d) {
        if (!d && !b(e)) {
            throw TypeError("element must be a DOM node, got " + e)
        }
        while (e = e.parentNode) {
            if (e === document) {
                return true
            }
        }
        return false
    }
}(Swapper._isNode);
Swapper._insertBefore = function () {
    return function (d, c) {
        c.parentNode.insertBefore(d, c)
    }
}();
Swapper._insertAfter = function () {
    return function (e, f) {
        var d = f.parentNode;
        if (d.lastchild === f) {
            d.appendChild(e)
        } else {
            d.insertBefore(e, f.nextSibling)
        }
    }
}();
Swapper._removeNode = function () {
    return function (b) {
        if (b.parentNode) {
            b.parentNode.removeChild(b)
        }
    }
}();
Swapper._setTransform = function () {
    return function (c, d) {
        c.style["-webkit-transform"] = d;
        c.style["-moz-transform"] = d;
        c.style["-ms-transform"] = d;
        c.style["-o-transform"] = d;
        c.style.transform = d
    }
}();
Swapper._setTransition = function () {
    return function (d, c) {
        if (c) {
            d.style["-webkit-transition"] = "-webkit-" + c;
            d.style["-moz-transition"] = "-moz-" + c;
            d.style["-ms-transition"] = "-ms-" + c;
            d.style["-o-transition"] = "-o-" + c;
            d.style.transition = c
        } else {
            d.style["-webkit-transition"] = "";
            d.style["-moz-transition"] = "";
            d.style["-ms-transition"] = "";
            d.style["-o-transition"] = "";
            d.style.transition = ""
        }
    }
}();
Swapper._getStyles = function (b) {
    return function (g, f) {
        var e;
        if (f) {
            e = g.style
        } else {
            e = b.defaultView.getComputedStyle(g, null)
        }
        return {
            "-webkit-transition": e["-webkit-transition"],
            "-moz-transition": e["-moz-transition"],
            "-ms-transition": e["-ms-transition"],
            "-o-transition": e["-o-transition"],
            transition: e.transition,
            display: e.display,
            opacity: e.opacity,
            top: e.top,
            left: e.left,
            height: e.height,
            width: e.width,
            position: e.position
        }
    }
}(document);
Swapper._easings = {
    linear: "linear",
    ease: "ease",
    "ease-in": "ease-in",
    "ease-out": "ease-out",
    "ease-in-out": "ease-in-out",
    "step-start": "step-start",
    "step-end": "step-end"
};
Swapper._transitions = {
    fade: [{
        fade: true
    }, {
        fade: true
    }],
    "fade-on": [{
        fade: true
    }, {}],
    "fade-off": [{}, {
            fade: true
        },
        true
    ],
    "scale-in": [{
        transform: "scale(0.01)"
    }, {}],
    "scale-out": [{}, {
            transform: "scale(0.01)"
        },
        true
    ],
    "rotate-left": [{
        transform: "rotateY(-180deg) perspective(360px)",
        fade: true
    }, {
        transform: "rotateY( 180deg) perspective(360px)",
        fade: true
    }],
    "rotate-right": [{
        transform: "rotateY( 180deg) perspective(360px)",
        fade: true
    }, {
        transform: "rotateY(-180deg) perspective(360px)",
        fade: true
    }],
    "cube-left": [{
        transform: "translate3d( 50%,0,0) rotateY(-90deg) perspective(360px)"
    }, {
        transform: "translate3d(-50%,0,0) rotateY( 90deg) perspective(360px)"
    }],
    "cube-right": [{
        transform: "translate3d(-50%,0,0) rotateY( 90deg) perspective(360px)"
    }, {
        transform: "translate3d( 50%,0,0) rotateY(-90deg) perspective(360px)"
    }],
    "swap-left": [{
        transform: "translate3d( 65%,0,0) rotateY( 90deg) perspective(360px)"
    }, {
        transform: "translate3d(-65%,0,0) rotateY(-90deg) perspective(360px)"
    }],
    "swap-right": [{
        transform: "translate3d(-65%,0,0) rotateY(-90deg) perspective(360px)"
    }, {
        transform: "translate3d( 65%,0,0) rotateY( 90deg) perspective(360px)"
    }],
    "explode-in": [{
        fade: true,
        transform: "scale(1.25)"
    }, {}],
    "explode-out": [{}, {
            fade: true,
            transform: "scale(1.25)"
        },
        true
    ],
    "implode-in": [{}, {
            fade: true,
            transform: "scale(0.60)"
        },
        true
    ],
    "implode-out": [{
        fade: true,
        transform: "scale(0.80)"
    }, {}],
    "slide-left": [{
        transform: "translate3d( 100%,0,0)"
    }, {
        transform: "translate3d(-100%,0,0)"
    }],
    "slide-right": [{
        transform: "translate3d(-100%,0,0)"
    }, {
        transform: "translate3d( 100%,0,0)"
    }],
    "slide-up": [{
        transform: "translate3d(0, 100%,0)"
    }, {
        transform: "translate3d(0,-100%,0)"
    }],
    "slide-down": [{
        transform: "translate3d(0,-100%,0)"
    }, {
        transform: "translate3d(0, 100%,0)"
    }],
    "slideon-left": [{
        transform: "translate3d(-100%,0,0)"
    }, {}],
    "slideoff-left": [{}, {
            transform: "translate3d(-100%,0,0)"
        },
        true
    ],
    "slideon-right": [{
        transform: "translate3d(100%,0,0)"
    }, {}],
    "slideoff-right": [{}, {
            transform: "translate3d(100%,0,0)"
        },
        true
    ],
    "slideon-up": [{
        transform: "translate3d(0,-100%,0)"
    }, {}],
    "slideoff-up": [{}, {
            transform: "translate3d(0,-100%,0)"
        },
        true
    ],
    "slideon-down": [{
        transform: "translate3d(0,100%,0)"
    }, {}],
    "slideoff-down": [{}, {
            transform: "translate3d(0,100%,0)"
        },
        true
    ],
    "glideon-right": [{
        transform: "translate3d(110%,0,0)"
    }, {
        transform: "translate3d(-20%,0,0)"
    }],
    "glideoff-right": [{
            transform: "translate3d(-20%,0,0)"
        }, {
            transform: "translate3d(110%,0,0)"
        },
        true
    ],
    "glideon-left": [{
        transform: "translate3d(-110%,0,0)"
    }, {
        transform: "translate3d(20%,0,0)"
    }],
    "glideoff-left": [{
            transform: "translate3d(20%,0,0)"
        }, {
            transform: "translate3d(-110%,0,0)"
        },
        true
    ],
    "glideon-down": [{
        transform: "translate3d(0,110%,0)"
    }, {
        transform: "translate3d(0,-20%,0)"
    }],
    "glideoff-down": [{
            transform: "translate3d(0,-20%,0)"
        }, {
            transform: "translate3d(0,110%,0)"
        },
        true
    ],
    "glideon-up": [{
        transform: "translate3d(0,-110%,0)"
    }, {
        transform: "translate3d(0,20%,0)"
    }],
    "glideoff-up": [{
            transform: "translate3d(0,20%,0)"
        }, {
            transform: "translate3d(0,-110%,0)"
        },
        true
    ]
};
Swapper._validate = function (j, i, k) {
    return {
        element: l,
        options: g,
        callback: h
    };

    function l(b) {
        if (!j(b)) {
            throw TypeError("element must be a DOM node, got " + b)
        }
    }

    function g(b) {
        switch (typeof b) {
        case "string":
            b = {
                transition: b
            };
            break;
        case "undefined":
            b = {};
            break;
        case "object":
            break;
        default:
            throw TypeError("options must be an object if defined, got " + b)
        }
        switch (typeof b.transition) {
        case "string":
            if (!(b.transition in i) && (b.transition !== "instant")) {
                throw TypeError(b.transition + " is not a valid transition")
            }
            break;
        case "undefined":
            break;
        default:
            throw TypeError("transition must be a string if defined, got " + b.transition)
        }
        switch (typeof b.duration) {
        case "number":
            if (b.duration < 0) {
                throw TypeError("duration must be a non-negative integer, got " + b.duration)
            }
            break;
        case "undefined":
            break;
        default:
            throw TypeError("duration must be a number if defined, got " + b.duration)
        }
        switch (typeof b.easing) {
        case "string":
            if (!(b.easing in k)) {
                throw TypeError(b.easing + " is not a valid easing")
            }
            break;
        case "undefined":
            break;
        default:
            throw TypeError("easing must be a string if defined, got " + b.easing)
        }
        return b
    }

    function h(b) {
        switch (typeof b) {
        case "undefined":
            b = function () {};
            break;
        case "function":
            break;
        default:
            throw TypeError("callback must be a function if defined, got " + b)
        }
        return b
    }
}(Swapper._isNode, Swapper._transitions, Swapper._easings);
Swapper._swapper = function (Z, I, ae, af, U, H, ad, ac, aa, O, Y, S, X, N) {
    var aj = "translate3d(0,0,0) scale(1)",
        M = "fade",
        F = "ease-in-out";
    var T = (Z.ios && (Math.floor(Z.version) === 5));

    function Q(d, e, c, b) {
        S.element(d);
        S.element(e);
        if (typeof c === "function") {
            b = c;
            c = {}
        }
        c = S.options(c);
        b = S.callback(b);
        if (d._swapper) {
            throw Error("elem1 is currently being swapped")
        } else {
            if (e._swapper) {
                throw Error("elem2 is currently being swapped")
            }
        } if (!ae(d, true)) {
            throw Error("elem1 must be in the DOM to be swapped")
        }
        d._swapper = true;
        e._swapper = true;
        H(e);
        V(d, e, c, function () {
            d._swapper = false;
            e._swapper = false;
            b()
        })
    }

    function V(c, d, b, e) {
        if (b.transition === "instant") {
            U(d, c);
            H(c);
            e();
            return
        }
        var f = O[b.transition || M],
            g = Y[b.easing || F],
            h = b.duration || 300;
        U(d, c);
        var i = aa(c),
            j = aa(d),
            k = aa(c, true),
            l = aa(d, true);
        P(c, d, i, j);
        if (f[2]) {
            af(d, c)
        }
        d.style.opacity = "0";
        K(c, d);
        setTimeout(function () {
            d.style.opacity = j.opacity;
            ai(c, d, f);
            setTimeout(function () {
                W(c, d, h, g);
                setTimeout(function () {
                    G(c, d, f);
                    R(c, d, i, j, f, h, function () {
                        H(c);
                        L(c, d, h, g);
                        setTimeout(function () {
                            J(c, d, k, l, f);
                            ag(c, d, k, l);
                            setTimeout(function () {
                                ah(c, d, k, l);
                                e()
                            }, 0)
                        }, 0)
                    })
                }, 0)
            }, 0)
        }, 0)
    }

    function P(e, f, c, d) {
        var b = e.getBoundingClientRect();
        if (c.display !== "none") {
            if (T) {
                f.style.position = "absolute"
            } else {
                f.style.position = "fixed"
            }
            f.style.top = b.top + "px";
            f.style.left = b.left + "px"
        }
        f.style.height = d.height || c.height;
        f.style.width = d.width || c.width
    }

    function ag(d, e, b, c) {
        e.style.position = c.position;
        e.style.top = c.top;
        e.style.left = c.left;
        e.style.height = c.height;
        e.style.width = c.width
    }

    function ai(c, d, b) {
        ad(c, aj);
        ad(d, b[0].transform || aj);
        if (b[0].fade) {
            d.style.opacity = "0"
        }
        if (b[1].fade) {
            c.style.opacity = "1"
        }
    }

    function G(c, d, b) {
        ad(c, b[1].transform || aj);
        ad(d, aj);
        if (b[0].fade) {
            d.style.opacity = "1"
        }
        if (b[1].fade) {
            c.style.opacity = "0"
        }
    }

    function J(e, f, c, d, b) {
        ad(e, "");
        ad(f, "");
        if (b[0].fade) {
            f.style.opacity = d.opacity
        }
        if (b[1].fade) {
            e.style.opacity = c.opacity
        }
    }

    function W(e, f, d, b) {
        var c = "transform " + (d / 1000) + "s " + b + ",opacity " + (d / 1000) + "s " + b;
        ac(e, c);
        ac(f, c)
    }

    function L(d, e, c, b) {
        ac(d, "");
        ac(e, "")
    }

    function K(b, c) {
        ac(b, "");
        ac(c, "")
    }

    function ah(d, e, b, c) {
        d.style["-webkit-transition"] = b["-webkit-transition"];
        d.style["-moz-transition"] = b["-moz-transition"];
        d.style["-ms-transition"] = b["-ms-transition"];
        d.style["-o-transition"] = b["-o-transition"];
        d.style.transition = b.transition;
        e.style["-webkit-transition"] = c["-webkit-transition"];
        e.style["-moz-transition"] = c["-moz-transition"];
        e.style["-ms-transition"] = c["-ms-transition"];
        e.style["-o-transition"] = c["-o-transition"];
        e.style.transition = c.transition
    }

    function ab(c, b) {
        if (c.display === "none") {
            return false
        }
        if (b.fade) {
            return true
        }
        if (!b.transform) {
            return false
        } else {
            if (b.transform === aj) {
                return false
            } else {
                return true
            }
        }
    }

    function R(b, e, k, m, h, j, f) {
        var l;
        if (ab(m, h[0])) {
            l = e;
            c()
        } else {
            if (ab(k, h[1])) {
                l = b;
                c()
            } else {
                setTimeout(g, j)
            }
        }

        function c() {
            l.addEventListener("webkitTransitionEnd", g, false);
            l.addEventListener("transitionend", g, false);
            l.addEventListener("oTransitionEnd", g, false);
            l.addEventListener("otransitionend", g, false);
            l.addEventListener("MSTransitionEnd", g, false);
            l.addEventListener("transitionend", g, false)
        }

        function d() {
            l.removeEventListener("webkitTransitionEnd", g);
            l.removeEventListener("transitionend", g);
            l.removeEventListener("oTransitionEnd", g);
            l.removeEventListener("otransitionend", g);
            l.removeEventListener("MSTransitionEnd", g);
            l.removeEventListener("transitionend", g)
        }
        var i = false;

        function g(n) {
            if (i || (n && n.target && (n.target !== l))) {
                return
            }
            i = true;
            if (l) {
                d()
            }
            f()
        }
    }
    return Q
}(Swapper._os, Swapper._isNode, Swapper._isInDOM, Swapper._insertBefore, Swapper._insertAfter, Swapper._removeNode, Swapper._setTransform, Swapper._setTransition, Swapper._getStyles, Swapper._transitions, Swapper._easings, Swapper._validate, window, document);
var Clickable = function (f, d) {
    function e() {
        e._enableClicking.apply(this, arguments)
    }
    e.touchable = function () {
        return e._os.touchable
    };
    e.sticky = function () {
        e._enableStickyClick.apply(this, arguments)
    };
    if (d && d.fn) {
        d.fn.clickable = function (b) {
            this.each(function () {
                e._enableClicking(this, b)
            });
            return this
        };
        d.fn.stickyClick = function (b) {
            this.each(function () {
                e._enableStickyClick(this, b)
            });
            return this
        }
    }
    if (f && f.fn) {
        f.extend(f.fn, {
            clickable: function (b) {
                this.forEach(function (c) {
                    e._enableClicking(c, b)
                });
                return this
            },
            stickyClick: function (b) {
                this.forEach(function (c) {
                    e._enableStickyClick(c, b)
                });
                return this
            }
        })
    }
    return e
}(window.Zepto, window.jQuery);
Clickable._os = function (i, k) {
    var l, h, g;
    if (g = /\bCPU.*OS (\d+(_\d+)?)/i.exec(i)) {
        l = "ios";
        h = g[1].replace("_", ".")
    } else {
        if (g = /\bAndroid (\d+(\.\d+)?)/.exec(i)) {
            l = "android";
            h = g[1]
        }
    }
    var j = {
        name: l,
        version: h && k(h),
        touchable: !! l
    };
    j[l] = true;
    return j
}(navigator.userAgent, parseFloat);
Clickable._trimString = function (d) {
    var c = /^\s+|\s+$/g;
    return function (b) {
        return d(b).replace(c, "")
    }
}(String);
Clickable._isDOMNode = function (d, c) {
    return function (b) {
        if (!b) {
            return false
        }
        try {
            return (b instanceof d) || (b instanceof c)
        } catch (e) {}
        if (typeof b !== "object") {
            return false
        }
        if (typeof b.nodeType !== "number") {
            return false
        }
        if (typeof b.nodeName !== "string") {
            return false
        }
        return true
    }
}(Node, HTMLElement);
Clickable._isInDOM = function () {
    return function (b) {
        while (b = b.parentNode) {
            if (b === document) {
                return true
            }
        }
        return false
    }
}();
Clickable._bindEvents = function () {
    return function (f, d) {
        for (var e in d) {
            if (f.addEventListener) {
                f.addEventListener(e, d[e], false)
            } else {
                if (f.attachEvent) {
                    f.attachEvent("on" + e, d[e])
                }
            }
        }
    }
}();
Clickable._unbindEvents = function () {
    return function (f, d) {
        for (var e in d) {
            if (f.removeEventListener) {
                f.removeEventListener(e, d[e])
            }
        }
    }
}();
Clickable._addClass = function () {
    return function (c, d) {
        c.className += " " + d
    }
}();
Clickable._removeClass = function (b) {
    return function (e, d) {
        e.className = b(e.className.replace(new RegExp("\\b" + d + "\\b"), ""))
    }
}(Clickable._trimString);
Clickable._enableClicking = function (y, r, F, A, D, v, s) {
    var x = "active",
        t = "data-clickable-class",
        z = 40;
    var q = false,
        u = !! y.ios;

    function E(g, c) {
        if (!r(g)) {
            throw TypeError("element " + g + " must be a DOM element")
        }
        if (g._clickable) {
            return
        }
        g._clickable = true;
        switch (typeof c) {
        case "undefined":
            c = x;
            break;
        case "string":
            break;
        default:
            throw TypeError("active class " + c + " must be a string")
        }
        var Q = false,
            X = false,
            n, P, k, i, T;
        g.setAttribute(t, c);
        g.style["-webkit-tap-highlight-color"] = "rgba(255,255,255,0)";
        o();
        return;

        function e(H, G) {
            Q = true;
            k = +new Date();
            n = H;
            P = G;
            i = w(g);
            if (i) {
                T = i.scrollTop;
                i.addEventListener("scroll", Y, true)
            }
        }

        function m() {
            if (i) {
                i.removeEventListener("scroll", Y)
            }
            i = null;
            T = null;
            n = null;
            P = null;
            Q = false
        }

        function Y() {
            W()
        }

        function b() {
            return Q
        }

        function R() {
            v(g, c)
        }

        function V() {
            s(g, c)
        }

        function o() {
            A(g, {
                click: j
            });
            if (!y.touchable) {
                A(g, {
                    mousedown: U,
                    mousemove: S,
                    mouseout: S,
                    mouseup: f
                });
                return
            }
            if (y.ios) {
                A(g, {
                    DOMNodeInsertedIntoDocument: d,
                    DOMNodeRemovedFromDocument: h
                });
                if (F(g)) {
                    d()
                }
            } else {
                d()
            }
        }

        function d() {
            A(g, {
                touchstart: l,
                touchmove: W,
                touchcancel: W,
                touchend: p
            })
        }

        function h() {
            D(g, {
                touchstart: l,
                touchmove: W,
                touchcancel: W,
                touchend: p
            })
        }

        function j(G) {
            G = G || window.event;
            if (!g.disabled && X) {
                X = false;
                setTimeout(function () {
                    q = false
                }, 0)
            } else {
                if (G.stopImmediatePropagation) {
                    G.stopImmediatePropagation()
                }
                G.preventDefault();
                G.stopPropagation();
                G.cancelBubble = true;
                G.returnValue = false;
                return false
            }
        }

        function U(G) {
            X = false;
            if (g.disabled || !B(G.target, g)) {
                G.preventDefault();
                m();
                return
            }
            e(G.clientX, G.clientY);
            R()
        }

        function S(G) {
            G.preventDefault();
            m();
            X = false;
            V()
        }

        function f(G) {
            if (g.disabled) {
                G.preventDefault();
                m();
                X = false;
                return
            }
            if (!b()) {
                G.preventDefault();
                X = false
            } else {
                X = true
            }
            m();
            V()
        }

        function l(H) {
            X = false;
            if (q || g.disabled || (H.touches.length !== 1) || !B(H.target, g)) {
                m();
                return
            }
            q = true;
            var G = H.changedTouches[0];
            e(G.clientX, G.clientY);
            if (i) {
                if (i._isScrolling || (T < 0) || (i.scrollHeight < T)) {
                    m();
                    return
                }
            }
            var G = k;
            setTimeout(function () {
                if (b() && (G === k)) {
                    R()
                }
            }, z)
        }

        function W(G) {
            X = false;
            m();
            if (G) {
                q = false
            }
            if (g.disabled) {
                return
            }
            V()
        }

        function p(H) {
            var L = b(),
                K = i,
                J = T,
                M = n,
                G = P;
            W();
            if (!L || g.disabled) {
                q = false;
                return
            }
            if (K) {
                if (K._isScrolling || (K.scrollTop !== J)) {
                    return
                }
            }
            if (!H.stopImmediatePropagation) {
                X = true;
                return
            }
            var I = +new Date() - k;
            if (I > z) {
                X = true;
                C(g, M, G)
            } else {
                R();
                setTimeout(function () {
                    V();
                    X = true;
                    C(g, M, G)
                }, 1)
            }
        }
    }

    function B(b, c) {
        do {
            if (b === c) {
                return true
            } else {
                if (b._clickable) {
                    return false
                }
            }
        } while (b = b.parentNode);
        return false
    }

    function C(c, e, b) {
        var d = document.createEvent("MouseEvents");
        d.initMouseEvent("click", true, true, window, 1, e || 0, b || 0, e || 0, b || 0, false, false, false, false, 0, null);
        c.dispatchEvent(d)
    }

    function w(b) {
        if (!y.ios || (y.version < 5)) {
            return
        }
        while (b = b.parentNode) {
            if (b._scrollable) {
                if (b._iScroll) {
                    return
                }
                return b
            }
        }
    }
    return E
}(Clickable._os, Clickable._isDOMNode, Clickable._isInDOM, Clickable._bindEvents, Clickable._unbindEvents, Clickable._addClass, Clickable._removeClass);
Clickable._enableStickyClick = function (h, l, i) {
    var k = "data-clickable-class";

    function j(b, c, d) {
        if (!l(b)) {
            throw TypeError("button must be a DOM element, got " + b)
        }
        switch (typeof c) {
        case "string":
            break;
        case "function":
            d = c;
            c = undefined;
            break;
        default:
            throw TypeError("button active class must be a string if defined, got " + c)
        }
        if (typeof d !== "function") {
            throw TypeError("sticky click handler must be a function, got " + d)
        }
        i(b, c);
        b.addEventListener("click", g(b, d), false)
    }

    function g(b, c) {
        return function () {
            var n = false,
                o = b.getAttribute(k),
                d;
            b.disabled = true;
            b.className += " " + o;
            try {
                d = c(e)
            } catch (f) {
                if (window.console && window.console.error) {
                    if ((typeof f === "object") && f.stack) {
                        window.console.error(f.stack)
                    } else {
                        window.console.error(f + "")
                    }
                }
                e()
            }
            if (d === false) {
                e()
            }

            function e() {
                if (n) {
                    return
                }
                n = true;
                if (b.disabled) {
                    b.disabled = false;
                    b.className = h(b.className.replace(new RegExp("\\b" + o + "\\b", "g"), ""))
                }
            }
        }
    }
    return j
}(Clickable._trimString, Clickable._isDOMNode, Clickable._enableClicking);
var iScroll = function (u, f) {
    function C(b) {
        if ("" === v) {
            return b
        }
        b = b.charAt(0).toUpperCase() + b.substr(1);
        return v + b
    }
    var t = Math,
        s = f.createElement("div").style,
        v;
    a: {
        for (var z = ["t", "webkitT", "MozT", "msT", "OT"], h, j = 0, x = z.length; j < x; j++) {
            if (h = z[j] + "ransform", h in s) {
                v = z[j].substr(0, z[j].length - 1);
                break a
            }
        }
        v = !1
    }
    var y = v ? "-" + v.toLowerCase() + "-" : "",
        B = C("transform"),
        D = C("transitionProperty"),
        K = C("transitionDuration"),
        G = C("transformOrigin"),
        I = C("transitionTimingFunction"),
        A = C("transitionDelay"),
        E = /android/gi.test(navigator.appVersion),
        l = /iphone|ipad/gi.test(navigator.appVersion),
        z = /hp-tablet/gi.test(navigator.appVersion),
        m = C("perspective") in s,
        w = "ontouchstart" in u && !z,
        o = !! v,
        J = C("transition") in s,
        F = "onorientationchange" in u ? "orientationchange" : "resize",
        M = w ? "touchstart" : "mousedown",
        n = w ? "touchmove" : "mousemove",
        p = w ? "touchend" : "mouseup",
        q = w ? "touchcancel" : "mouseup",
        N = "Moz" == v ? "DOMMouseScroll" : "mousewheel",
        O;
    O = !1 === v ? !1 : {
        "": "transitionend",
        webkit: "webkitTransitionEnd",
        Moz: "transitionend",
        O: "oTransitionEnd",
        ms: "MSTransitionEnd"
    }[v];
    var L = u.requestAnimationFrame || u.webkitRequestAnimationFrame || u.mozRequestAnimationFrame || u.oRequestAnimationFrame || u.msRequestAnimationFrame || function (b) {
            return setTimeout(b, 1)
        }, r = u.cancelRequestAnimationFrame || u.webkitCancelAnimationFrame || u.webkitCancelRequestAnimationFrame || u.mozCancelRequestAnimationFrame || u.oCancelRequestAnimationFrame || u.msCancelRequestAnimationFrame || clearTimeout,
        H = m ? " translateZ(0)" : "",
        z = function (e, d) {
            var b = this,
                c;
            b.wrapper = "object" == typeof e ? e : f.getElementById(e);
            b.wrapper.style.overflow = "hidden";
            b.scroller = b.wrapper.children[0];
            b.options = {
                hScroll: !0,
                vScroll: !0,
                x: 0,
                y: 0,
                bounce: !0,
                bounceLock: !1,
                momentum: !0,
                lockDirection: !0,
                useTransform: !0,
                useTransition: !1,
                topOffset: 0,
                checkDOMChanges: !1,
                handleClick: !0,
                hScrollbar: !0,
                vScrollbar: !0,
                fixedScrollbar: E,
                hideScrollbar: l,
                fadeScrollbar: l && m,
                scrollbarClass: "",
                zoom: !1,
                zoomMin: 1,
                zoomMax: 4,
                doubleTapZoom: 2,
                wheelAction: "scroll",
                snap: !1,
                snapThreshold: 1,
                onRefresh: null,
                onBeforeScrollStart: function (g) {
                    g.preventDefault()
                },
                onScrollStart: null,
                onBeforeScrollMove: null,
                onScrollMove: null,
                onBeforeScrollEnd: null,
                onScrollEnd: null,
                onTouchEnd: null,
                onDestroy: null,
                onZoomStart: null,
                onZoom: null,
                onZoomEnd: null
            };
            for (c in d) {
                b.options[c] = d[c]
            }
            b.x = b.options.x;
            b.y = b.options.y;
            b.options.useTransform = o && b.options.useTransform;
            b.options.hScrollbar = b.options.hScroll && b.options.hScrollbar;
            b.options.vScrollbar = b.options.vScroll && b.options.vScrollbar;
            b.options.zoom = b.options.useTransform && b.options.zoom;
            b.options.useTransition = J && b.options.useTransition;
            b.options.zoom && E && (H = "");
            b.scroller.style[D] = b.options.useTransform ? y + "transform" : "top left";
            b.scroller.style[K] = "0";
            b.scroller.style[G] = "0 0";
            b.options.useTransition && (b.scroller.style[I] = "cubic-bezier(0.33,0.66,0.66,1)");
            b.options.useTransform ? b.scroller.style[B] = "translate(" + b.x + "px," + b.y + "px)" + H : b.scroller.style.cssText += ";position:absolute;top:" + b.y + "px;left:" + b.x + "px";
            b.options.useTransition && (b.options.fixedScrollbar = !0);
            b.refresh();
            b._bind(F, u);
            b._bind(M);
            w || (b._bind("mouseout", b.wrapper), "none" != b.options.wheelAction && b._bind(N));
            b.options.checkDOMChanges && (b.checkDOMTime = setInterval(function () {
                b._checkDOMChanges()
            }, 500))
        };
    z.prototype = {
        enabled: !0,
        x: 0,
        y: 0,
        steps: [],
        scale: 1,
        currPageX: 0,
        currPageY: 0,
        pagesX: [],
        pagesY: [],
        aniTime: null,
        wheelZoomCount: 0,
        handleEvent: function (b) {
            switch (b.type) {
            case M:
                if (!w && 0 !== b.button) {
                    break
                }
                this._start(b);
                break;
            case n:
                this._move(b);
                break;
            case p:
            case q:
                this._end(b);
                break;
            case F:
                this._resize();
                break;
            case N:
                this._wheel(b);
                break;
            case "mouseout":
                this._mouseout(b);
                break;
            case O:
                this._transitionEnd(b)
            }
        },
        _checkDOMChanges: function () {
            !this.moved && (!this.zoomed && !(this.animating || this.scrollerW == this.scroller.offsetWidth * this.scale && this.scrollerH == this.scroller.offsetHeight * this.scale)) && this.refresh()
        },
        _scrollbar: function (c) {
            var b;
            this[c + "Scrollbar"] ? (this[c + "ScrollbarWrapper"] || (b = f.createElement("div"), this.options.scrollbarClass ? b.className = this.options.scrollbarClass + c.toUpperCase() : b.style.cssText = "position:absolute;z-index:100;" + ("h" == c ? "height:7px;bottom:1px;left:2px;right:" + (this.vScrollbar ? "7" : "2") + "px" : "width:7px;bottom:" + (this.hScrollbar ? "7" : "2") + "px;top:2px;right:1px"), b.style.cssText += ";pointer-events:none;" + y + "transition-property:opacity;" + y + "transition-duration:" + (this.options.fadeScrollbar ? "350ms" : "0") + ";overflow:hidden;opacity:" + (this.options.hideScrollbar ? "0" : "1"), this.wrapper.appendChild(b), this[c + "ScrollbarWrapper"] = b, b = f.createElement("div"), this.options.scrollbarClass || (b.style.cssText = "position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);" + y + "background-clip:padding-box;" + y + "box-sizing:border-box;" + ("h" == c ? "height:100%" : "width:100%") + ";" + y + "border-radius:3px;border-radius:3px"), b.style.cssText += ";pointer-events:none;" + y + "transition-property:" + y + "transform;" + y + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);" + y + "transition-duration:0;" + y + "transform: translate(0,0)" + H, this.options.useTransition && (b.style.cssText += ";" + y + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)"), this[c + "ScrollbarWrapper"].appendChild(b), this[c + "ScrollbarIndicator"] = b), "h" == c ? (this.hScrollbarSize = this.hScrollbarWrapper.clientWidth, this.hScrollbarIndicatorSize = t.max(t.round(this.hScrollbarSize * this.hScrollbarSize / this.scrollerW), 8), this.hScrollbarIndicator.style.width = this.hScrollbarIndicatorSize + "px", this.hScrollbarMaxScroll = this.hScrollbarSize - this.hScrollbarIndicatorSize, this.hScrollbarProp = this.hScrollbarMaxScroll / this.maxScrollX) : (this.vScrollbarSize = this.vScrollbarWrapper.clientHeight, this.vScrollbarIndicatorSize = t.max(t.round(this.vScrollbarSize * this.vScrollbarSize / this.scrollerH), 8), this.vScrollbarIndicator.style.height = this.vScrollbarIndicatorSize + "px", this.vScrollbarMaxScroll = this.vScrollbarSize - this.vScrollbarIndicatorSize, this.vScrollbarProp = this.vScrollbarMaxScroll / this.maxScrollY), this._scrollbarPos(c, !0)) : this[c + "ScrollbarWrapper"] && (o && (this[c + "ScrollbarIndicator"].style[B] = ""), this[c + "ScrollbarWrapper"].parentNode.removeChild(this[c + "ScrollbarWrapper"]), this[c + "ScrollbarWrapper"] = null, this[c + "ScrollbarIndicator"] = null)
        },
        _resize: function () {
            var b = this;
            setTimeout(function () {
                b.refresh()
            }, E ? 200 : 0)
        },
        _pos: function (c, b) {
            this.zoomed || (c = this.hScroll ? c : 0, b = this.vScroll ? b : 0, this.options.useTransform ? this.scroller.style[B] = "translate(" + c + "px," + b + "px) scale(" + this.scale + ")" + H : (c = t.round(c), b = t.round(b), this.scroller.style.left = c + "px", this.scroller.style.top = b + "px"), this.x = c, this.y = b, this._scrollbarPos("h"), this._scrollbarPos("v"))
        },
        _scrollbarPos: function (d, c) {
            var b = "h" == d ? this.x : this.y;
            this[d + "Scrollbar"] && (b *= this[d + "ScrollbarProp"], 0 > b ? (this.options.fixedScrollbar || (b = this[d + "ScrollbarIndicatorSize"] + t.round(3 * b), 8 > b && (b = 8), this[d + "ScrollbarIndicator"].style["h" == d ? "width" : "height"] = b + "px"), b = 0) : b > this[d + "ScrollbarMaxScroll"] && (this.options.fixedScrollbar ? b = this[d + "ScrollbarMaxScroll"] : (b = this[d + "ScrollbarIndicatorSize"] - t.round(3 * (b - this[d + "ScrollbarMaxScroll"])), 8 > b && (b = 8), this[d + "ScrollbarIndicator"].style["h" == d ? "width" : "height"] = b + "px", b = this[d + "ScrollbarMaxScroll"] + (this[d + "ScrollbarIndicatorSize"] - b))), this[d + "ScrollbarWrapper"].style[A] = "0", this[d + "ScrollbarWrapper"].style.opacity = c && this.options.hideScrollbar ? "0" : "1", this[d + "ScrollbarIndicator"].style[B] = "translate(" + ("h" == d ? b + "px,0)" : "0," + b + "px)") + H)
        },
        _start: function (e) {
            var d = w ? e.touches[0] : e,
                b, c;
            if (this.enabled) {
                this.options.onBeforeScrollStart && this.options.onBeforeScrollStart.call(this, e);
                (this.options.useTransition || this.options.zoom) && this._transitionTime(0);
                this.zoomed = this.animating = this.moved = !1;
                this.dirY = this.dirX = this.absDistY = this.absDistX = this.distY = this.distX = 0;
                this.options.zoom && (w && 1 < e.touches.length) && (c = t.abs(e.touches[0].pageX - e.touches[1].pageX), b = t.abs(e.touches[0].pageY - e.touches[1].pageY), this.touchesDistStart = t.sqrt(c * c + b * b), this.originX = t.abs(e.touches[0].pageX + e.touches[1].pageX - 2 * this.wrapperOffsetLeft) / 2 - this.x, this.originY = t.abs(e.touches[0].pageY + e.touches[1].pageY - 2 * this.wrapperOffsetTop) / 2 - this.y, this.options.onZoomStart && this.options.onZoomStart.call(this, e));
                if (this.options.momentum && (this.options.useTransform ? (b = getComputedStyle(this.scroller, null)[B].replace(/[^0-9\-.,]/g, "").split(","), c = 1 * b[4], b = 1 * b[5]) : (c = 1 * getComputedStyle(this.scroller, null).left.replace(/[^0-9-]/g, ""), b = 1 * getComputedStyle(this.scroller, null).top.replace(/[^0-9-]/g, "")), c != this.x || b != this.y)) {
                    this.options.useTransition ? this._unbind(O) : r(this.aniTime), this.steps = [], this._pos(c, b)
                }
                this.absStartX = this.x;
                this.absStartY = this.y;
                this.startX = this.x;
                this.startY = this.y;
                this.pointX = d.pageX;
                this.pointY = d.pageY;
                this.startTime = e.timeStamp || Date.now();
                this.options.onScrollStart && this.options.onScrollStart.call(this, e);
                this._bind(n);
                this._bind(p);
                this._bind(q)
            }
        },
        _move: function (g) {
            var e = w ? g.touches[0] : g,
                i = e.pageX - this.pointX,
                k = e.pageY - this.pointY,
                b = this.x + i,
                c = this.y + k,
                d = g.timeStamp || Date.now();
            this.options.onBeforeScrollMove && this.options.onBeforeScrollMove.call(this, g);
            if (this.options.zoom && w && 1 < g.touches.length) {
                b = t.abs(g.touches[0].pageX - g.touches[1].pageX), c = t.abs(g.touches[0].pageY - g.touches[1].pageY), this.touchesDist = t.sqrt(b * b + c * c), this.zoomed = !0, e = 1 / this.touchesDistStart * this.touchesDist * this.scale, e < this.options.zoomMin ? e = 0.5 * this.options.zoomMin * Math.pow(2, e / this.options.zoomMin) : e > this.options.zoomMax && (e = 2 * this.options.zoomMax * Math.pow(0.5, this.options.zoomMax / e)), this.lastScale = e / this.scale, b = this.originX - this.originX * this.lastScale + this.x, c = this.originY - this.originY * this.lastScale + this.y, this.scroller.style[B] = "translate(" + b + "px," + c + "px) scale(" + e + ")" + H, this.options.onZoom && this.options.onZoom.call(this, g)
            } else {
                this.pointX = e.pageX;
                this.pointY = e.pageY;
                if (0 < b || b < this.maxScrollX) {
                    b = this.options.bounce ? this.x + i / 2 : 0 <= b || 0 <= this.maxScrollX ? 0 : this.maxScrollX
                }
                if (c > this.minScrollY || c < this.maxScrollY) {
                    c = this.options.bounce ? this.y + k / 2 : c >= this.minScrollY || 0 <= this.maxScrollY ? this.minScrollY : this.maxScrollY
                }
                this.distX += i;
                this.distY += k;
                this.absDistX = t.abs(this.distX);
                this.absDistY = t.abs(this.distY);
                6 > this.absDistX && 6 > this.absDistY || (this.options.lockDirection && (this.absDistX > this.absDistY + 5 ? (c = this.y, k = 0) : this.absDistY > this.absDistX + 5 && (b = this.x, i = 0)), this.moved = !0, this._pos(b, c), this.dirX = 0 < i ? -1 : 0 > i ? 1 : 0, this.dirY = 0 < k ? -1 : 0 > k ? 1 : 0, 300 < d - this.startTime && (this.startTime = d, this.startX = this.x, this.startY = this.y), this.options.onScrollMove && this.options.onScrollMove.call(this, g))
            }
        },
        _end: function (R) {
            if (!(w && 0 !== R.touches.length)) {
                var Q = this,
                    b = w ? R.changedTouches[0] : R,
                    c, d, e = {
                        dist: 0,
                        time: 0
                    }, i = {
                        dist: 0,
                        time: 0
                    }, g = (R.timeStamp || Date.now()) - Q.startTime,
                    P = Q.x,
                    k = Q.y;
                Q._unbind(n);
                Q._unbind(p);
                Q._unbind(q);
                Q.options.onBeforeScrollEnd && Q.options.onBeforeScrollEnd.call(Q, R);
                if (Q.zoomed) {
                    P = Q.scale * Q.lastScale, P = Math.max(Q.options.zoomMin, P), P = Math.min(Q.options.zoomMax, P), Q.lastScale = P / Q.scale, Q.scale = P, Q.x = Q.originX - Q.originX * Q.lastScale + Q.x, Q.y = Q.originY - Q.originY * Q.lastScale + Q.y, Q.scroller.style[K] = "200ms", Q.scroller.style[B] = "translate(" + Q.x + "px," + Q.y + "px) scale(" + Q.scale + ")" + H, Q.zoomed = !1, Q.refresh(), Q.options.onZoomEnd && Q.options.onZoomEnd.call(Q, R)
                } else {
                    if (Q.moved) {
                        if (300 > g && Q.options.momentum) {
                            e = P ? Q._momentum(P - Q.startX, g, -Q.x, Q.scrollerW - Q.wrapperW + Q.x, Q.options.bounce ? Q.wrapperW : 0) : e;
                            i = k ? Q._momentum(k - Q.startY, g, -Q.y, 0 > Q.maxScrollY ? Q.scrollerH - Q.wrapperH + Q.y - Q.minScrollY : 0, Q.options.bounce ? Q.wrapperH : 0) : i;
                            P = Q.x + e.dist;
                            k = Q.y + i.dist;
                            if (0 < Q.x && 0 < P || Q.x < Q.maxScrollX && P < Q.maxScrollX) {
                                e = {
                                    dist: 0,
                                    time: 0
                                }
                            }
                            if (Q.y > Q.minScrollY && k > Q.minScrollY || Q.y < Q.maxScrollY && k < Q.maxScrollY) {
                                i = {
                                    dist: 0,
                                    time: 0
                                }
                            }
                        }
                        e.dist || i.dist ? (e = t.max(t.max(e.time, i.time), 10), Q.options.snap && (i = P - Q.absStartX, g = k - Q.absStartY, t.abs(i) < Q.options.snapThreshold && t.abs(g) < Q.options.snapThreshold ? Q.scrollTo(Q.absStartX, Q.absStartY, 200) : (i = Q._snap(P, k), P = i.x, k = i.y, e = t.max(i.time, e))), Q.scrollTo(t.round(P), t.round(k), e)) : Q.options.snap ? (i = P - Q.absStartX, g = k - Q.absStartY, t.abs(i) < Q.options.snapThreshold && t.abs(g) < Q.options.snapThreshold ? Q.scrollTo(Q.absStartX, Q.absStartY, 200) : (i = Q._snap(Q.x, Q.y), (i.x != Q.x || i.y != Q.y) && Q.scrollTo(i.x, i.y, i.time))) : Q._resetPos(200)
                    } else {
                        w && (Q.doubleTapTimer && Q.options.zoom ? (clearTimeout(Q.doubleTapTimer), Q.doubleTapTimer = null, Q.options.onZoomStart && Q.options.onZoomStart.call(Q, R), Q.zoom(Q.pointX, Q.pointY, 1 == Q.scale ? Q.options.doubleTapZoom : 1), Q.options.onZoomEnd && setTimeout(function () {
                            Q.options.onZoomEnd.call(Q, R)
                        }, 200)) : this.options.handleClick && (Q.doubleTapTimer = setTimeout(function () {
                            Q.doubleTapTimer = null;
                            for (c = b.target; 1 != c.nodeType;) {
                                c = c.parentNode
                            }
                            "SELECT" != c.tagName && ("INPUT" != c.tagName && "TEXTAREA" != c.tagName) && (d = f.createEvent("MouseEvents"), d.initMouseEvent("click", !0, !0, R.view, 1, b.screenX, b.screenY, b.clientX, b.clientY, R.ctrlKey, R.altKey, R.shiftKey, R.metaKey, 0, null), d._fake = !0, c.dispatchEvent(d))
                        }, Q.options.zoom ? 250 : 0))), Q._resetPos(200)
                    }
                    Q.options.onTouchEnd && Q.options.onTouchEnd.call(Q, R)
                }
            }
        },
        _resetPos: function (d) {
            var c = 0 <= this.x ? 0 : this.x < this.maxScrollX ? this.maxScrollX : this.x,
                b = this.y >= this.minScrollY || 0 < this.maxScrollY ? this.minScrollY : this.y < this.maxScrollY ? this.maxScrollY : this.y;
            if (c == this.x && b == this.y) {
                if (this.moved && (this.moved = !1, this.options.onScrollEnd && this.options.onScrollEnd.call(this)), this.hScrollbar && this.options.hideScrollbar && ("webkit" == v && (this.hScrollbarWrapper.style[A] = "300ms"), this.hScrollbarWrapper.style.opacity = "0"), this.vScrollbar && this.options.hideScrollbar) {
                    "webkit" == v && (this.vScrollbarWrapper.style[A] = "300ms"), this.vScrollbarWrapper.style.opacity = "0"
                }
            } else {
                this.scrollTo(c, b, d || 0)
            }
        },
        _wheel: function (e) {
            var d = this,
                b, c;
            if ("wheelDeltaX" in e) {
                b = e.wheelDeltaX / 12, c = e.wheelDeltaY / 12
            } else {
                if ("wheelDelta" in e) {
                    b = c = e.wheelDelta / 12
                } else {
                    if ("detail" in e) {
                        b = c = 3 * -e.detail
                    } else {
                        return
                    }
                }
            } if ("zoom" == d.options.wheelAction) {
                if (c = d.scale * Math.pow(2, 1 / 3 * (c ? c / Math.abs(c) : 0)), c < d.options.zoomMin && (c = d.options.zoomMin), c > d.options.zoomMax && (c = d.options.zoomMax), c != d.scale) {
                    !d.wheelZoomCount && d.options.onZoomStart && d.options.onZoomStart.call(d, e), d.wheelZoomCount++, d.zoom(e.pageX, e.pageY, c, 400), setTimeout(function () {
                        d.wheelZoomCount--;
                        !d.wheelZoomCount && d.options.onZoomEnd && d.options.onZoomEnd.call(d, e)
                    }, 400)
                }
            } else {
                b = d.x + b, c = d.y + c, 0 < b ? b = 0 : b < d.maxScrollX && (b = d.maxScrollX), c > d.minScrollY ? c = d.minScrollY : c < d.maxScrollY && (c = d.maxScrollY), 0 > d.maxScrollY && d.scrollTo(b, c, 0)
            }
        },
        _mouseout: function (c) {
            var b = c.relatedTarget;
            if (b) {
                for (; b = b.parentNode;) {
                    if (b == this.wrapper) {
                        return
                    }
                }
            }
            this._end(c)
        },
        _transitionEnd: function (b) {
            b.target == this.scroller && (this._unbind(O), this._startAni())
        },
        _startAni: function () {
            var g = this,
                e = g.x,
                i = g.y,
                k = Date.now(),
                b, c, d;
            g.animating || (g.steps.length ? (b = g.steps.shift(), b.x == e && b.y == i && (b.time = 0), g.animating = !0, g.moved = !0, g.options.useTransition) ? (g._transitionTime(b.time), g._pos(b.x, b.y), g.animating = !1, b.time ? g._bind(O) : g._resetPos(0)) : (d = function () {
                var P = Date.now(),
                    Q;
                if (P >= k + b.time) {
                    g._pos(b.x, b.y);
                    g.animating = false;
                    g.options.onAnimationEnd && g.options.onAnimationEnd.call(g);
                    g._startAni()
                } else {
                    P = (P - k) / b.time - 1;
                    c = t.sqrt(1 - P * P);
                    P = (b.x - e) * c + e;
                    Q = (b.y - i) * c + i;
                    g._pos(P, Q);
                    if (g.animating) {
                        g.aniTime = L(d)
                    }
                }
            }, d()) : g._resetPos(400))
        },
        _transitionTime: function (b) {
            b += "ms";
            this.scroller.style[K] = b;
            this.hScrollbar && (this.hScrollbarIndicator.style[K] = b);
            this.vScrollbar && (this.vScrollbarIndicator.style[K] = b)
        },
        _momentum: function (g, e, i, b, c) {
            var e = t.abs(g) / e,
                d = e * e / 0.0012;
            0 < g && d > i ? (i += c / (6 / (0.0006 * (d / e))), e = e * i / d, d = i) : 0 > g && d > b && (b += c / (6 / (0.0006 * (d / e))), e = e * b / d, d = b);
            return {
                dist: d * (0 > g ? -1 : 1),
                time: t.round(e / 0.0006)
            }
        },
        _offset: function (d) {
            for (var c = -d.offsetLeft, b = -d.offsetTop; d = d.offsetParent;) {
                c -= d.offsetLeft, b -= d.offsetTop
            }
            d != this.wrapper && (c *= this.scale, b *= this.scale);
            return {
                left: c,
                top: b
            }
        },
        _snap: function (g, e) {
            var b, c, d;
            d = this.pagesX.length - 1;
            b = 0;
            for (c = this.pagesX.length; b < c; b++) {
                if (g >= this.pagesX[b]) {
                    d = b;
                    break
                }
            }
            d == this.currPageX && (0 < d && 0 > this.dirX) && d--;
            g = this.pagesX[d];
            c = (c = t.abs(g - this.pagesX[this.currPageX])) ? 500 * (t.abs(this.x - g) / c) : 0;
            this.currPageX = d;
            d = this.pagesY.length - 1;
            for (b = 0; b < d; b++) {
                if (e >= this.pagesY[b]) {
                    d = b;
                    break
                }
            }
            d == this.currPageY && (0 < d && 0 > this.dirY) && d--;
            e = this.pagesY[d];
            b = (b = t.abs(e - this.pagesY[this.currPageY])) ? 500 * (t.abs(this.y - e) / b) : 0;
            this.currPageY = d;
            d = t.round(t.max(c, b)) || 200;
            return {
                x: g,
                y: e,
                time: d
            }
        },
        _bind: function (d, c, b) {
            (c || this.scroller).addEventListener(d, this, !! b)
        },
        _unbind: function (d, c, b) {
            (c || this.scroller).removeEventListener(d, this, !! b)
        },
        destroy: function () {
            this.scroller.style[B] = "";
            this.vScrollbar = this.hScrollbar = !1;
            this._scrollbar("h");
            this._scrollbar("v");
            this._unbind(F, u);
            this._unbind(M);
            this._unbind(n);
            this._unbind(p);
            this._unbind(q);
            this.options.hasTouch || (this._unbind("mouseout", this.wrapper), this._unbind(N));
            this.options.useTransition && this._unbind(O);
            this.options.checkDOMChanges && clearInterval(this.checkDOMTime);
            this.options.onDestroy && this.options.onDestroy.call(this)
        },
        refresh: function () {
            var e, d, b, c = 0;
            d = 0;
            this.scale < this.options.zoomMin && (this.scale = this.options.zoomMin);
            this.wrapperW = this.wrapper.clientWidth || 1;
            this.wrapperH = this.wrapper.clientHeight || 1;
            this.minScrollY = -this.options.topOffset || 0;
            this.scrollerW = t.round(this.scroller.offsetWidth * this.scale);
            this.scrollerH = t.round((this.scroller.offsetHeight + this.minScrollY) * this.scale);
            this.maxScrollX = this.wrapperW - this.scrollerW;
            this.maxScrollY = this.wrapperH - this.scrollerH + this.minScrollY;
            this.dirY = this.dirX = 0;
            this.options.onRefresh && this.options.onRefresh.call(this);
            this.hScroll = this.options.hScroll && 0 > this.maxScrollX;
            this.vScroll = this.options.vScroll && (!this.options.bounceLock && !this.hScroll || this.scrollerH > this.wrapperH);
            this.hScrollbar = this.hScroll && this.options.hScrollbar;
            this.vScrollbar = this.vScroll && this.options.vScrollbar && this.scrollerH > this.wrapperH;
            e = this._offset(this.wrapper);
            this.wrapperOffsetLeft = -e.left;
            this.wrapperOffsetTop = -e.top;
            if ("string" == typeof this.options.snap) {
                this.pagesX = [];
                this.pagesY = [];
                b = this.scroller.querySelectorAll(this.options.snap);
                e = 0;
                for (d = b.length; e < d; e++) {
                    c = this._offset(b[e]), c.left += this.wrapperOffsetLeft, c.top += this.wrapperOffsetTop, this.pagesX[e] = c.left < this.maxScrollX ? this.maxScrollX : c.left * this.scale, this.pagesY[e] = c.top < this.maxScrollY ? this.maxScrollY : c.top * this.scale
                }
            } else {
                if (this.options.snap) {
                    for (this.pagesX = []; c >= this.maxScrollX;) {
                        this.pagesX[d] = c, c -= this.wrapperW, d++
                    }
                    this.maxScrollX % this.wrapperW && (this.pagesX[this.pagesX.length] = this.maxScrollX - this.pagesX[this.pagesX.length - 1] + this.pagesX[this.pagesX.length - 1]);
                    d = c = 0;
                    for (this.pagesY = []; c >= this.maxScrollY;) {
                        this.pagesY[d] = c, c -= this.wrapperH, d++
                    }
                    this.maxScrollY % this.wrapperH && (this.pagesY[this.pagesY.length] = this.maxScrollY - this.pagesY[this.pagesY.length - 1] + this.pagesY[this.pagesY.length - 1])
                }
            }
            this._scrollbar("h");
            this._scrollbar("v");
            this.zoomed || (this.scroller.style[K] = "0", this._resetPos(200))
        },
        scrollTo: function (g, e, b, c) {
            var d = g;
            this.stop();
            d.length || (d = [{
                x: g,
                y: e,
                time: b,
                relative: c
            }]);
            g = 0;
            for (e = d.length; g < e; g++) {
                d[g].relative && (d[g].x = this.x - d[g].x, d[g].y = this.y - d[g].y), this.steps.push({
                    x: d[g].x,
                    y: d[g].y,
                    time: d[g].time || 0
                })
            }
            this._startAni()
        },
        scrollToElement: function (d, c) {
            var b;
            if (d = d.nodeType ? d : this.scroller.querySelector(d)) {
                b = this._offset(d), b.left += this.wrapperOffsetLeft, b.top += this.wrapperOffsetTop, b.left = 0 < b.left ? 0 : b.left < this.maxScrollX ? this.maxScrollX : b.left, b.top = b.top > this.minScrollY ? this.minScrollY : b.top < this.maxScrollY ? this.maxScrollY : b.top, c = void 0 === c ? t.max(2 * t.abs(b.left), 2 * t.abs(b.top)) : c, this.scrollTo(b.left, b.top, c)
            }
        },
        scrollToPage: function (d, c, b) {
            b = void 0 === b ? 400 : b;
            this.options.onScrollStart && this.options.onScrollStart.call(this);
            if (this.options.snap) {
                d = "next" == d ? this.currPageX + 1 : "prev" == d ? this.currPageX - 1 : d, c = "next" == c ? this.currPageY + 1 : "prev" == c ? this.currPageY - 1 : c, d = 0 > d ? 0 : d > this.pagesX.length - 1 ? this.pagesX.length - 1 : d, c = 0 > c ? 0 : c > this.pagesY.length - 1 ? this.pagesY.length - 1 : c, this.currPageX = d, this.currPageY = c, d = this.pagesX[d], c = this.pagesY[c]
            } else {
                if (d *= -this.wrapperW, c *= -this.wrapperH, d < this.maxScrollX && (d = this.maxScrollX), c < this.maxScrollY) {
                    c = this.maxScrollY
                }
            }
            this.scrollTo(d, c, b)
        },
        disable: function () {
            this.stop();
            this._resetPos(0);
            this.enabled = !1;
            this._unbind(n);
            this._unbind(p);
            this._unbind(q)
        },
        enable: function () {
            this.enabled = !0
        },
        stop: function () {
            this.options.useTransition ? this._unbind(O) : r(this.aniTime);
            this.steps = [];
            this.animating = this.moved = !1
        },
        zoom: function (g, e, b, c) {
            var d = b / this.scale;
            this.options.useTransform && (this.zoomed = !0, c = void 0 === c ? 200 : c, g = g - this.wrapperOffsetLeft - this.x, e = e - this.wrapperOffsetTop - this.y, this.x = g - g * d + this.x, this.y = e - e * d + this.y, this.scale = b, this.refresh(), this.x = 0 < this.x ? 0 : this.x < this.maxScrollX ? this.maxScrollX : this.x, this.y = this.y > this.minScrollY ? this.minScrollY : this.y < this.maxScrollY ? this.maxScrollY : this.y, this.scroller.style[K] = c + "ms", this.scroller.style[B] = "translate(" + this.x + "px," + this.y + "px) scale(" + b + ")" + H, this.zoomed = !1)
        },
        isReady: function () {
            return !this.moved && !this.zoomed && !this.animating
        }
    };
    s = null;
    return z
}(window, document);
var Scrollable = function (j, k) {
    function i() {
        i._enableScrolling.apply(this, arguments)
    }
    i.node = function () {
        return i._getScrollableNode.apply(this, arguments)
    };
    i.infinite = function () {
        return i._enableInfiniteScrolling.apply(this, arguments)
    };
    if (j && j.fn) {
        j.extend(j.fn, {
            scrollable: function (b) {
                this.forEach(function (c) {
                    i._enableScrolling(c, b)
                });
                return this
            },
            scrollableNode: function () {
                return j(this.map(function () {
                    return i._getScrollableNode(this)
                }))
            },
            scrollableInfinite: function (c, b) {
                this.forEach(function (d) {
                    i._enableInfiniteScrolling(d, c, b)
                });
                return this
            }
        });
        var n = j.fn.scrollTop,
            l = j.fn.scrollLeft;
        j.fn.scrollTop = function (b) {
            if (typeof b === "undefined") {
                var d = this[0],
                    c = i._isDOMNode(d);
                if (c && d._scrollTop) {
                    return d._scrollTop()
                } else {
                    if (n) {
                        return n.apply(this, arguments)
                    } else {
                        if (c) {
                            return d.scrollTop
                        } else {
                            return null
                        }
                    }
                }
            }
            this.forEach(function (f) {
                var e = i._isDOMNode(f);
                if (e && f._scrollTop) {
                    f._scrollTop(b)
                } else {
                    if (n) {
                        n.call(j(f), b)
                    } else {
                        if (e) {
                            f.scrollTop = b
                        }
                    }
                }
            });
            return this
        };
        j.fn.scrollLeft = function (b) {
            if (typeof b === "undefined") {
                var d = this[0],
                    c = i._isDOMNode(d);
                if (c && d._scrollLeft) {
                    return d._scrollLeft()
                } else {
                    if (n) {
                        return l.apply(this, arguments)
                    } else {
                        if (c) {
                            return d.scrollLeft
                        } else {
                            return null
                        }
                    }
                }
            }
            this.forEach(function (f) {
                var e = i._isDOMNode(f);
                if (e && f._scrollLeft) {
                    f._scrollLeft(b)
                } else {
                    if (l) {
                        l.call(j(f), b)
                    } else {
                        if (e) {
                            f.scrollLeft = b
                        }
                    }
                }
            });
            return this
        }
    }
    if (k && k.fn) {
        k.fn.scrollable = function (b) {
            this.each(function () {
                i._enableScrolling(this, b)
            });
            return this
        };
        k.fn.scrollableNode = function () {
            return k(this.map(function () {
                return i._getScrollableNode(this)
            }))
        };
        k.fn.scrollableInfinite = function (c, b) {
            this.each(function () {
                i._enableInfiniteScrolling(this, c, b)
            });
            return this
        };
        var o = k.fn.scrollTop,
            m = k.fn.scrollLeft;
        k.fn.scrollTop = function (b) {
            if (typeof b === "undefined") {
                var c = this[0];
                if (i._isDOMNode(c) && c._scrollTop) {
                    return c._scrollTop()
                } else {
                    return o.apply(this, arguments)
                }
            }
            this.each(function () {
                if (i._isDOMNode(this) && this._scrollTop) {
                    this._scrollTop(b)
                } else {
                    o.call(k(this), b)
                }
            });
            return this
        };
        k.fn.scrollLeft = function (b) {
            if (typeof b === "undefined") {
                var c = this[0];
                if (i._isDOMNode(c) && c._scrollLeft) {
                    return c._scrollLeft()
                } else {
                    return m.apply(this, arguments)
                }
            }
            this.each(function () {
                if (i._isDOMNode(this) && this._scrollLeft) {
                    this._scrollLeft(b)
                } else {
                    m.call(k(this), b)
                }
            });
            return this
        }
    }
    return i
}(window.Zepto, window.jQuery);
Scrollable._os = function (i, k) {
    var l, h, m;
    if (m = /\bCPU.*OS (\d+(_\d+)?)/i.exec(i)) {
        l = "ios";
        h = m[1].replace("_", ".")
    } else {
        if (m = /\bAndroid (\d+(\.\d+)?)/.exec(i)) {
            l = "android";
            h = m[1]
        }
    }
    var j = {
        name: l,
        version: h && k(h),
        mobile: !! l
    };
    j[l] = true;
    return j
}(navigator.userAgent, parseFloat);
Scrollable._isArray = function (c) {
    return function (b) {
        if (c) {
            return c(b)
        } else {
            return Object.prototype.toString.call(b) !== "[object Array]"
        }
    }
}(Array.isArray);
Scrollable._isDOMNode = function (d, e) {
    return function (b) {
        if (!b) {
            return false
        }
        try {
            return (b instanceof d) || (b instanceof e)
        } catch (c) {}
        if (typeof b !== "object") {
            return false
        }
        if (typeof b.nodeType !== "number") {
            return false
        }
        if (typeof b.nodeName !== "string") {
            return false
        }
        return true
    }
}(Node, HTMLElement);
Scrollable._findInArray = function (c) {
    return function (j, h, b) {
        if (c) {
            return c.call(j, h, b)
        }
        for (var i = b || 0, k = j.length; i < k; i++) {
            if ((i in j) && (j[i] === h)) {
                return i
            }
        }
        return -1
    }
}(Array.prototype.indexOf);
Scrollable._forEachInArray = function (c) {
    return function (j, b, i) {
        if (c) {
            return c.call(j, b, i)
        }
        for (var h = 0, k = j.length; h < k; h++) {
            if (h in j) {
                b.call(i, j[h], h, j)
            }
        }
    }
}(Array.prototype.forEach);
Scrollable._onReady = function (q, p, k) {
    var l = [],
        m = false;
    o(n);
    return function (b) {
        if (m) {
            setTimeout(b, 0)
        } else {
            l.push(b)
        }
    };

    function n() {
        if (m) {
            return
        }
        m = true;
        k(l, function (b) {
            setTimeout(b, 0)
        })
    }

    function j(b) {
        try {
            q.documentElement.doScroll("left")
        } catch (c) {
            setTimeout(function () {
                j(b)
            }, 1);
            return
        }
        b()
    }

    function o(b) {
        if (q.readyState === "complete") {
            setTimeout(b, 0);
            return
        }
        if (q.addEventListener) {
            q.addEventListener("DOMContentLoaded", b, false);
            p.addEventListener("load", b, false)
        } else {
            if (q.attachEvent) {
                q.attachEvent("onreadystatechange", b);
                p.attachEvent("onload", b);
                var d = false;
                try {
                    d = (p.frameElement === null)
                } catch (c) {}
                if (q.documentElement.doScroll && d) {
                    setTimeout(function () {
                        j(b)
                    }, 0)
                }
            }
        }
    }
}(document, window, Scrollable._forEachInArray);
Scrollable._scrollWatcher = function (d) {
    return e;

    function e(t) {
        var s = false,
            x = false,
            q = t.scrollTop;
        t.addEventListener("touchstart", u);
        t.addEventListener("touchmove", y);
        t.addEventListener("touchcancel", v);
        t.addEventListener("touchend", b);
        t.addEventListener("scroll", r);
        c();
        t._resetScrolling = w;
        return;

        function c() {
            t._isScrolling = (x || s)
        }

        function w() {
            x = false;
            s = false;
            c()
        }

        function p(f, g, h) {
            if ((f.touches.length <= g) && ((typeof h === "undefined") || (f.changedTouches.length <= h))) {
                return false
            }
            f.preventDefault();
            w();
            return true
        }

        function u(f) {
            if (p(f, 1)) {
                return
            }
            w()
        }

        function y(f) {
            if (p(f, 1)) {
                return
            }
            s = true;
            q = t.scrollTop;
            c()
        }

        function v(f) {
            if (p(f, 0, 1)) {
                return
            }
            w()
        }

        function b(g) {
            if (p(g, 0, 1)) {
                return
            }
            var f;
            if (s) {
                f = Math.abs(t.scrollTop - q);
                if (f > 5) {
                    x = true
                }
                s = false;
                c()
            }
        }

        function r() {
            if (!s && x) {
                w()
            }
        }
    }
}(Scrollable._os);
Scrollable._enableScrolling = function (C, t, x, D, E, s, v, u) {
    var y = z();
    return r;

    function z() {
        if ((C.ios && (C.version >= 5)) || (C.android && (C.version >= 4))) {
            return true
        } else {
            return false
        }
    }

    function r(b, c) {
        if (!t(b)) {
            throw b + " is not a DOM element"
        }
        if (b._scrollable) {
            return
        }
        b._scrollable = true;
        var d;
        b._scrollTop = function (e) {
            if (typeof e === "undefined") {
                return d ? Math.max(parseInt(-d.y), 0) : b.scrollTop
            }
            if (!d && (!C.mobile || y)) {
                b.scrollTop = e;
                return
            }
            x(function () {
                d.scrollTo(d.x, Math.min(-e, 0), 1)
            })
        };
        b._scrollLeft = function (e) {
            if (typeof e === "undefined") {
                return d ? Math.max(parseInt(-d.x), 0) : b.scrollLeft
            }
            if (!d && (!C.mobile || y)) {
                b.scrollLeft = e;
                return
            }
            x(function () {
                d.scrollTo(Math.min(-e, 0), d.y, 1)
            })
        };
        b.style.overflow = "scroll";
        if (!c) {
            if (!C.mobile) {
                return
            }
            if (y) {
                b.style["-webkit-overflow-scrolling"] = "touch";
                if (C.ios) {
                    E(b)
                }
                return
            }
        }
        F(b, function (e) {
            d = e
        })
    }

    function F(c, b) {
        c._iScroll = true;
        w(c);
        var d = B(c);
        x(function () {
            var e = new s(c, {
                checkDOMChanges: true,
                useTransform: true,
                useTransition: true,
                hScrollbar: false,
                vScrollbar: false,
                bounce: !! C.ios,
                onScrollMove: d,
                onBeforeScrollEnd: d,
                onScrollEnd: d,
                onBeforeScrollStart: A
            });
            c._iScroll = e;
            b(e)
        })
    }

    function w(c) {
        var b = u.createElement("div"),
            d = Array.prototype.slice.call(c.childNodes || []);
        D(d, function (e) {
            var f = c.removeChild(e);
            b.appendChild(f)
        });
        c.appendChild(b);
        c.style.position = "relative";
        b.style["min-height"] = "100%";
        b.style["min-width"] = "100%"
    }

    function B(c) {
        var d, b;
        return function () {
            var e = c._scrollTop(),
                f = c._scrollLeft();
            if ((e === d) && (f === b)) {
                return
            }
            d = e;
            b = f;
            G(c)
        }
    }

    function G(b) {
        if (b.dispatchEvent) {
            var c = u.createEvent("MouseEvents");
            c.initMouseEvent("scroll", false, false, v, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            b.dispatchEvent(c)
        }
    }

    function A(b) {
        var c = b.target;
        while (c.nodeType !== 1) {
            c = c.parentNode
        }
        if ((c.tagName !== "SELECT") && (c.tagName !== "INPUT") && (c.tagName !== "TEXTAREA")) {
            b.preventDefault()
        }
    }
}(Scrollable._os, Scrollable._isDOMNode, Scrollable._onReady, Scrollable._forEachInArray, Scrollable._scrollWatcher, iScroll, window, document);
Scrollable._getScrollableNode = function (c) {
    return function (b) {
        if (c(b) && b._iScroll) {
            return b.childNodes[0]
        } else {
            return b
        }
    }
}(Scrollable._isDOMNode);
Scrollable._enableInfiniteScrolling = function (p, s, r, o, v, n) {
    var u = 320;
    return q;

    function q(f, g, j) {
        if (!p(f)) {
            throw f + " is not a DOM element"
        }
        if (!j) {
            j = g;
            g = undefined
        }
        g = g || {};
        if ((typeof g !== "object") || (g === null)) {
            throw TypeError("options must be an object if defined, got " + g)
        }
        if (typeof j !== "function") {
            throw j + " is not a function"
        }
        var c = y(f),
            e = g.loading,
            b = g.triggerRadius,
            d = false,
            i = false,
            k;
        if (e === null) {
            e = undefined
        }
        if (typeof e !== "undefined") {
            k = x([e])[0]
        }
        if (b === null) {
            b = undefined
        }
        switch (typeof b) {
        case "undefined":
            b = u;
        case "number":
            break;
        default:
            throw TypeError("trigger radius must be a number if defined, got " + b)
        }
        if (!c) {
            o(f);
            c = f
        }
        h();
        c.addEventListener("scroll", h, false);

        function h() {
            if (d || i || !w(c, b)) {
                return
            }
            i = true;
            t(f, k, j, function (l) {
                i = false;
                if (!l) {
                    d = true;
                    return
                }
                h()
            })
        }
    }

    function y(b) {
        do {
            if (b._scrollable) {
                return b
            }
            b = b.parentNode
        } while (b)
    }

    function w(e, f) {
        var d = e.clientHeight,
            b = e._scrollTop(),
            c = e.scrollHeight;
        return (c - b - d <= f)
    }

    function x(c) {
        var b = [];
        r(c, function (e) {
            switch (typeof e) {
            case "undefined":
                return;
            case "string":
                var d = document.createElement("div");
                d.innerHTML = e;
                if (d.childNodes) {
                    r(x(d.childNodes), function (f) {
                        b.push(f)
                    })
                }
                return;
            case "object":
                if (e === null) {
                    return
                } else {
                    if (p(e)) {
                        b.push(e);
                        return
                    }
                }
            default:
                throw TypeError("expected an element, got " + e)
            }
        });
        return b
    }

    function t(d, g, c, b) {
        var f = c(e);
        if (typeof f !== "undefined") {
            e(f);
            return
        }
        if (g) {
            v(d).appendChild(g)
        }

        function e(i) {
            var h = false;
            if (g && g.parentNode) {
                g.parentNode.removeChild(g)
            }
            if (i) {
                if (!s(i) && !((typeof i === "object") && (i.constructor === n))) {
                    i = [i]
                }
                i = x(i);
                r(i, function (j) {
                    v(d).appendChild(j)
                });
                b(i.length)
            } else {
                b(0)
            }
        }
    }
}(Scrollable._isDOMNode, Scrollable._isArray, Scrollable._forEachInArray, Scrollable._enableScrolling, Scrollable._getScrollableNode, window.jQuery);
var App = {};
App._utils = function (k, m, c) {
    var l = function (u) {
        var s = /([^&=]+)=([^&]+)/g,
            q = /\+/g;
        var p = {}, o, r, t;
        if (u) {
            u = u.replace(q, "%20");
            while ((o = s.exec(u))) {
                r = decodeURIComponent(o[1]);
                t = decodeURIComponent(o[2]);
                p[r] = t
            }
        }
        return p
    }(k.location.href.split("?")[1]);
    var e = function (t) {
        var r = false,
            q, o, p;
        if (l._app_platform === "android") {
            r = true;
            q = "android";
            o = "4.2"
        } else {
            if (l._app_platform === "ios") {
                r = true;
                q = "ios";
                o = "6.0"
            } else {
                if (p = /\bCPU.*OS (\d+(_\d+)?)/i.exec(t)) {
                    q = "ios";
                    o = p[1].replace("_", ".")
                } else {
                    if (p = /\bAndroid (\d+(\.\d+)?)/.exec(t)) {
                        q = "android";
                        o = p[1]
                    }
                }
            }
        }
        var s = {
            faked: r,
            name: q,
            versionString: o,
            version: o && parseFloat(o)
        };
        s[q] = true;
        if (s.ios) {
            m.body.className += " app-ios app-ios-" + parseInt(o)
        } else {
            if (s.android) {
                m.body.className += " app-android app-android-" + parseInt(o)
            }
        } if (s.faked || (!s.ios && !s.android)) {
            m.body.className += " app-no-scrollbar"
        }
        return s
    }(navigator.userAgent);
    var j = function (o) {
        if (o) {
            return function (p, r, q) {
                return o.call(p, r, q)
            }
        } else {
            return function (q, t, r) {
                for (var s = 0, p = q.length; s < p; s++) {
                    if (s in q) {
                        t.call(r, q[s], s, q)
                    }
                }
            }
        }
    }(Array.prototype.forEach);

    function h(o) {
        if (Array.isArray) {
            return Array.isArray(o)
        } else {
            return Object.prototype.toString.call(o) !== "[object Array]"
        }
    }

    function n(p) {
        if (!p) {
            return false
        }
        try {
            return (p instanceof Node) || (p instanceof HTMLElement)
        } catch (o) {}
        if (typeof p !== "object") {
            return false
        }
        if (typeof p.nodeType !== "number") {
            return false
        }
        if (typeof p.nodeName !== "string") {
            return false
        }
        return true
    }

    function i(p) {
        if (m.readyState === "complete") {
            setTimeout(function () {
                p()
            }, 0);
            return
        }
        k.addEventListener("load", o, false);

        function o() {
            k.removeEventListener("load", o);
            setTimeout(function () {
                p()
            }, 0)
        }
    }

    function f(p, o) {
        p.style["-webkit-transform"] = o;
        p.style["-moz-transform"] = o;
        p.style["-ms-transform"] = o;
        p.style["-o-transform"] = o;
        p.style.transform = o
    }

    function d(o, p) {
        if (p) {
            o.style["-webkit-transition"] = "-webkit-" + p;
            o.style["-moz-transition"] = "-moz-" + p;
            o.style["-ms-transition"] = "-ms-" + p;
            o.style["-o-transition"] = "-o-" + p;
            o.style.transition = p
        } else {
            o.style["-webkit-transition"] = "";
            o.style["-moz-transition"] = "";
            o.style["-ms-transition"] = "";
            o.style["-o-transition"] = "";
            o.style.transition = ""
        }
    }

    function g(p, q) {
        var o;
        if (q) {
            o = p.style
        } else {
            o = m.defaultView.getComputedStyle(p, null)
        }
        return {
            display: o.display,
            opacity: o.opacity,
            paddingRight: o.paddingRight,
            paddingLeft: o.paddingLeft,
            marginRight: o.marginRight,
            marginLeft: o.marginLeft,
            borderRightWidth: o.borderRightWidth,
            borderLeftWidth: o.borderLeftWidth,
            top: o.top,
            left: o.left,
            height: o.height,
            width: o.width,
            position: o.position
        }
    }

    function b(s, r, v, u) {
        if (typeof s.length !== "number") {
            s = [s]
        }
        var q = s.map(function (w) {
            return w.elem.style.opacity
        });
        o(function () {
            t(function () {
                p(function () {
                    u()
                })
            })
        });

        function o(w) {
            j(s, function (x) {
                if (typeof x.transitionStart !== "undefined") {
                    f(x.elem, x.transitionStart)
                }
                if (typeof x.opacityStart !== "undefined") {
                    x.elem.style.opacity = x.opacityStart + ""
                }
            });
            setTimeout(function () {
                var x = "transform " + (r / 1000) + "s ease-in-out, opacity " + (r / 1000) + "s ease-in-out";
                j(s, function (y) {
                    d(y.elem, x)
                });
                setTimeout(w, 0)
            }, 0)
        }

        function t(z) {
            j(s, function (A) {
                if (typeof A.transitionEnd !== "undefined") {
                    f(A.elem, A.transitionEnd)
                }
                if (typeof A.opacityEnd !== "undefined") {
                    A.elem.style.opacity = A.opacityEnd + ""
                }
            });
            j(s, function (A) {
                A.elem.addEventListener("webkitTransitionEnd", x, false);
                A.elem.addEventListener("transitionend", x, false);
                A.elem.addEventListener("oTransitionEnd", x, false);
                A.elem.addEventListener("otransitionend", x, false);
                A.elem.addEventListener("MSTransitionEnd", x, false);
                A.elem.addEventListener("transitionend", x, false)
            });
            var w = false;

            function y(C) {
                for (var B = 0, A = s.length; B < A; B++) {
                    if (C === s[B].elem) {
                        return true
                    }
                }
                return false
            }

            function x(A) {
                if (w || !y(A.target)) {
                    return
                }
                w = true;
                j(s, function (B) {
                    B.elem.removeEventListener("webkitTransitionEnd", x);
                    B.elem.removeEventListener("transitionend", x);
                    B.elem.removeEventListener("oTransitionEnd", x);
                    B.elem.removeEventListener("otransitionend", x);
                    B.elem.removeEventListener("MSTransitionEnd", x);
                    B.elem.removeEventListener("transitionend", x)
                });
                z()
            }
        }

        function p(w) {
            j(s, function (x) {
                d(x.elem, "")
            });
            setTimeout(function () {
                j(s, function (y, x) {
                    f(y.elem, "");
                    y.elem.style.opacity = q[x]
                });
                w()
            }, 0)
        }
    }
    c.platform = e.name;
    c.platformVersion = e.version;
    return {
        query: l,
        os: e,
        ready: i,
        forEach: j,
        isArray: h,
        isNode: n,
        setTransform: f,
        setTransition: d,
        animate: b,
        getStyles: g
    }
}(window, document, App);
App._Events = function (d) {
    var b = "__appjsCustomEventing";
    var f = c();
    return {
        init: g,
        fire: e
    };

    function c() {
        try {
            var j = document.createElement("div"),
                h = document.createEvent("CustomEvent");
            h.initEvent("fooBarFace", false, true);
            j.dispatchEvent(h);
            return true
        } catch (i) {
            return false
        }
    }

    function g(k, l) {
        if (f) {
            return
        }
        if (k[b]) {
            d.forEach(l, k[b].addEventType);
            return
        }
        k[b] = {
            fire: h,
            addEventType: i,
            addEventListener: k.addEventListener,
            removeEventListener: k.removeEventListener
        };
        var j = {};
        d.forEach(l, function (m) {
            j[m] = []
        });

        function i(m) {
            if (l.indexOf(m) !== -1) {
                return
            }
            l.push(m);
            j[m] = []
        }

        function h(n) {
            if (l.indexOf(n) === -1) {
                return false
            }
            var o = false,
                m = {
                    preventDefault: function () {
                        o = true
                    }
                };
            d.forEach(j[n], function (p) {
                setTimeout(function () {
                    if (p.call(k, m) === false) {
                        o = true
                    }
                }, 0)
            });
            return !o
        }
        k.addEventListener = function (m, n) {
            if (l.indexOf(m) === -1) {
                k[b].addEventListener.apply(this, arguments);
                return
            }
            var o = j[m];
            if (o.indexOf(n) === -1) {
                o.push(n)
            }
        };
        k.removeEventListener = function (n, o) {
            if (l.indexOf(n) === -1) {
                k[b].removeEventListener.apply(this, arguments);
                return
            }
            var p = j[n],
                m = p.indexOf(o);
            if (m !== -1) {
                p.splice(m, 1)
            }
        }
    }

    function e(j, i) {
        if (j[b]) {
            return j[b].fire(i)
        } else {
            var h = document.createEvent("CustomEvent");
            h.initEvent(i, false, true);
            return j.dispatchEvent(h)
        }
    }
}(App._utils);
App._metrics = function (f, e) {
    var b = false;
    e.enableGoogleAnalytics = function () {
        g()
    };
    return {
        watchPage: c
    };

    function g() {
        b = true
    }

    function d(h, i) {
        if (!b) {
            return
        }
        var j = "/" + h;
        if (typeof i !== "undefined") {
            j += "/" + i
        }
        if (typeof f.ga === "function") {
            f.ga("send", "pageview", j);
            return
        }
        if (!f._gaq) {
            f._gaq = []
        }
        if (typeof f._gaq.push === "function") {
            f._gaq.push(["_trackPageview", j])
        }
    }

    function c(k, i, h) {
        var j;
        if ((typeof h === "object") && (typeof h.id !== "undefined")) {
            j = h.id + ""
        }
        k.addEventListener("appShow", function () {
            d(i, j)
        }, false)
    }
}(window, App);
App._Dialog = function (e, j, m, d, n) {
    var i, l;

    function f(p) {
        p.preventDefault()
    }

    function o(x, v) {
        var s = j.createElement("div");
        s.className += " app-dialog-container";
        if (n.os.ios && (n.os.version <= 5)) {
            s.className += " ios5"
        }
        if (!n.os.android || (n.os.version >= 4)) {
            s.addEventListener("touchstart", f, false)
        }
        if (x.cancelButton) {
            s.addEventListener("touchstart", function (z) {
                if (z.target === s) {
                    c()
                }
            }, false)
        }
        var r = j.createElement("div");
        r.className = "app-dialog";
        if (x.dark) {
            r.className += " dark"
        }
        s.appendChild(r);
        if (x.title) {
            var t = j.createElement("div");
            t.className = "title";
            t.textContent = x.title;
            r.appendChild(t)
        }
        if (x.text) {
            var w = j.createElement("div");
            w.className = "text";
            if (n.isNode(x.text)) {
                w.appendChild(x.text)
            } else {
                if (x.rawText) {
                    w.innerHTML = x.text
                } else {
                    w.textContent = x.text
                }
            }
            r.appendChild(w)
        }
        for (var u in x) {
            if (x[u] && (u.substr(u.length - 6) === "Button") && (u !== "okButton") && (u !== "cancelButton")) {
                var y = u.substr(0, u.length - 6),
                    q = j.createElement("div");
                q.className = "button";
                q.setAttribute("data-button", y);
                q.textContent = x[u];
                m(q);
                q.addEventListener("click", p, false);
                r.appendChild(q)
            }
        }
        if (x.okButton) {
            var q = j.createElement("div");
            q.className = "button ok";
            q.setAttribute("data-button", "ok");
            q.textContent = x.okButton;
            m(q);
            q.addEventListener("click", p, false);
            r.appendChild(q)
        }
        if (x.cancelButton) {
            var q = j.createElement("div");
            q.className = "button cancel";
            q.setAttribute("data-button", "cancel");
            q.textContent = x.cancelButton;
            m(q);
            q.addEventListener("click", p, false);
            r.appendChild(q)
        }

        function p() {
            var z = this.getAttribute("data-button");
            if (z === "cancel") {
                z = false
            }
            v(z)
        }
        return s
    }

    function k(r, v, t) {
        if (l && !t) {
            l.push([r, v]);
            return
        }
        l = l || [];
        var u = false,
            s = o(r, q),
            p = s.firstChild;
        i = q;
        if (n.os.ios) {
            s.className += " fancy"
        }
        j.body.appendChild(s);
        setTimeout(function () {
            s.className += " enabled"
        }, 50);

        function q(w) {
            if (u) {
                return
            }
            u = true;
            if ((typeof w !== "string") && !r.cancelButton) {
                return true
            }
            i = null;
            s.className = s.className.replace(/\benabled\b/g, "");
            setTimeout(function () {
                b();
                v(w)
            }, 0);
            setTimeout(function () {
                try {
                    j.body.removeChild(s)
                } catch (x) {}
            }, 600);
            return true
        }
    }

    function c() {
        if (i) {
            return i(false)
        }
    }

    function h() {
        return !!i
    }

    function b() {
        if (!l) {
            return
        }
        if (!l.length) {
            l = null;
            return
        }
        var p = l.shift();
        p.push(true);
        k.apply(e, p)
    }

    function g(p, r) {
        if ((typeof p !== "object") || (p === null)) {
            throw TypeError("dialog options must be an object, got " + p)
        }
        switch (typeof p.dark) {
        case "undefined":
        case "boolean":
            break;
        default:
            throw TypeError("dialog dark mode must a boolean if defined, got " + p.dark)
        }
        switch (typeof p.title) {
        case "undefined":
        case "string":
            break;
        default:
            throw TypeError("dialog title must be a string if defined, got " + p.title)
        }
        switch (typeof p.text) {
        case "undefined":
        case "string":
            break;
        default:
            if (!n.isNode(p.text)) {
                throw TypeError("dialog text must be a string if defined, got " + p.text)
            }
        }
        for (var q in p) {
            if ((q !== "dark") && (q !== "rawText") && (q !== "text")) {
                switch (typeof p[q]) {
                case "undefined":
                case "string":
                    break;
                default:
                    throw TypeError("dialog button (" + q + ") must be a string if defined, got " + p[q])
                }
            }
        }
        switch (typeof r) {
        case "undefined":
            r = function () {};
        case "function":
            break;
        default:
            throw TypeError("callback must be a function if defined, got " + r)
        }
        return k(p, r)
    }
    g.close = function () {
        return c()
    };
    g.status = function () {
        return h()
    };
    d.dialog = g;
    return g
}(window, document, Clickable, App, App._utils);
App._Scroll = function (c, i) {
    var k = {
        APP_CONTENT: "app-content",
        APP_SCROLLABLE: "app-scrollable",
        APP_SCROLLHACK: "app-scrollhack",
        NO_SCROLL: "data-no-scroll",
        SCROLLABLE: "data-scrollable",
        LAST_SCROLL: "data-last-scroll",
        SCROLL_STYLE: "data-scroll-style",
        TOUCH_SCROLL: "-webkit-overflow-scrolling"
    };
    return {
        setup: g,
        disable: j,
        saveScrollPosition: d,
        saveScrollStyle: f,
        restoreScrollPosition: e,
        restoreScrollStyle: b
    };

    function g(m) {
        i.forEach(m.querySelectorAll("." + k.APP_CONTENT), function (n) {
            if (!n.getAttribute(k.NO_SCROLL)) {
                l(n)
            }
        });
        i.forEach(m.querySelectorAll("[" + k.SCROLLABLE + "]"), function (n) {
            l(n)
        })
    }

    function l(n) {
        var m = !! window.APP_FORCE_ISCROLL;
        c(n, m);
        n.className += " " + k.APP_SCROLLABLE;
        if (!m && i.os.ios && i.os.version < 6) {
            n.className += " " + k.APP_SCROLLHACK
        }
    }

    function j(m) {
        i.forEach(m.querySelectorAll("*"), function (n) {
            n.style[k.TOUCH_SCROLL] = ""
        })
    }

    function h(n) {
        var m = [];
        if (n) {
            i.forEach(n.querySelectorAll("." + k.APP_SCROLLABLE), function (o) {
                if (o._scrollable) {
                    m.push(o)
                }
            })
        }
        return m
    }

    function d(m) {
        i.forEach(h(m), function (n) {
            if (n._iScroll) {
                return
            }
            var o = n._scrollTop();
            n.setAttribute(k.LAST_SCROLL, o + "")
        })
    }

    function f(m) {
        i.forEach(h(m), function (o) {
            if (o._iScroll) {
                return
            }
            var n = o.style[k.TOUCH_SCROLL] || "";
            o.style[k.TOUCH_SCROLL] = "";
            o.setAttribute(k.SCROLL_STYLE, n)
        })
    }

    function e(m, n) {
        i.forEach(h(m), function (o) {
            if (o._iScroll) {
                return
            }
            var p = parseInt(o.getAttribute(k.LAST_SCROLL));
            if (p) {
                if (!n) {
                    setTimeout(function () {
                        o._scrollTop(p)
                    }, 0)
                } else {
                    o._scrollTop(p)
                }
            }
        })
    }

    function b(m) {
        i.forEach(h(m), function (o) {
            if (o._iScroll) {
                return
            }
            var n = o.getAttribute(k.SCROLL_STYLE) || "";
            if (n) {
                o.style[k.TOUCH_SCROLL] = n
            }
        });
        e(m, true)
    }
}(Scrollable, App._utils);
App._Pages = function (F, e, o, K, D, N, L, E, r) {
    var x = "data-page",
        t = "app-page",
        n = "app-loaded",
        j = "__appjsFlushReadyQueue",
        b = {
            SHOW: "show",
            HIDE: "hide",
            BACK: "back",
            FORWARD: "forward",
            BEFORE_BACK: "beforeBack",
            READY: "ready",
            DESTROY: "destroy",
            LAYOUT: "layout",
            ONLINE: "online",
            OFFLINE: "offline"
        };
    var v = false,
        B = !! F.APP_FORCE_ISCROLL,
        c = {}, h = {}, m = {};
    D.add = function (O, P) {
        if (typeof O !== "string") {
            P = O;
            O = undefined
        }
        if (!N.isNode(P)) {
            throw TypeError("page template node must be a DOM node, got " + P)
        }
        s(P, O)
    };
    D.populator = function (O, Q, P) {
        if (typeof O !== "string") {
            throw TypeError("page name must be a string, got " + O)
        }
        if (typeof Q !== "function") {
            throw TypeError("page populator must be a function, got " + Q)
        }
        switch (typeof P) {
        case "undefined":
            P = function () {};
            break;
        case "function":
            break;
        default:
            throw TypeError("page unpopulator must be a function, got " + P)
        }
        if (Q) {
            w(O, Q)
        }
        if (P) {
            i(O, P)
        }
    };
    D.generate = function (O, P) {
        if (typeof O !== "string") {
            throw TypeError("page name must be a string, got " + O)
        }
        switch (typeof P) {
        case "undefined":
            P = {};
            break;
        case "object":
            break;
        default:
            throw TypeError("page arguments must be an object if defined, got " + P)
        }
        return H(O, P)
    };
    D.destroy = function (O) {
        if (!N.isNode(O)) {
            throw TypeError("page node must be a DOM node, got " + O)
        }
        return g(O)
    };
    return {
        EVENTS: b,
        has: I,
        createManager: y,
        startGeneration: d,
        finishGeneration: p,
        fire: A,
        startDestruction: z,
        finishDestruction: l,
        fixContent: f,
        populateBackButton: q
    };

    function u() {
        if (v) {
            return
        }
        v = true;
        var P = e.getElementsByClassName(t);
        for (var O = P.length; O--;) {
            s(P[O])
        }
        e.body.className += " " + n
    }

    function s(P, O) {
        if (!O) {
            O = P.getAttribute(x)
        }
        if (!O) {
            throw TypeError("page name was not specified")
        }
        P.setAttribute(x, O);
        if (P.parentNode) {
            P.parentNode.removeChild(P)
        }
        c[O] = P.cloneNode(true)
    }

    function I(O) {
        u();
        return (O in c)
    }

    function M(O) {
        if (!I(O)) {
            throw TypeError(O + " is not a known page")
        }
        return c[O].cloneNode(true)
    }

    function w(O, P) {
        h[O] = P
    }

    function i(O, P) {
        m[O] = P
    }

    function G(O, Q, S, P) {
        var R = h[O];
        if (!R) {
            return
        }
        for (var T in R) {
            Q[T] = R[T]
        }
        for (var T in R.prototype) {
            Q[T] = R.prototype[T]
        }
        Q.page = S;
        Q.args = P;
        R.call(Q, S, P)
    }

    function k(O, R, S, Q) {
        var P = m[O];
        if (P) {
            P.call(R, S, Q)
        }
        A(R, S, b.DESTROY)
    }

    function y(Q) {
        var O = {
            restored: Q,
            showing: false,
            online: navigator.onLine
        };
        var P = Q ? null : [];
        O.ready = function (R) {
            if (typeof R !== "function") {
                throw TypeError("ready must be called with a function, got " + R)
            }
            if (Q) {
                N.ready(function () {
                    R.call(O)
                })
            } else {
                if (P) {
                    P.push(R)
                } else {
                    R.call(O)
                }
            }
        };
        O[j] = function () {
            O[j] = undefined;
            N.ready(function () {
                if (!P) {
                    return
                }
                var R = P.slice();
                P = null;
                if (N.isNode(O.page)) {
                    A(O, O.page, b.READY)
                }
                N.forEach(R, function (S) {
                    S.call(O)
                })
            })
        };
        if (Q) {
            O[j]()
        }
        return O
    }

    function H(O, Q) {
        var P = {}, R = d(O, P, Q);
        p(O, P, R, Q);
        return R
    }

    function g(P) {
        var O = P.getAttribute(x);
        z(O, {}, P, {});
        l(O, {}, P, {})
    }

    function d(O, R, Q) {
        var S = M(O);
        var T = [];
        for (var P in b) {
            T.push(C(b[P]))
        }
        L.init(S, T);
        E.watchPage(S, O, Q);
        f(S);
        N.forEach(S.querySelectorAll(".app-button"), function (U) {
            o(U);
            U.addEventListener("click", function () {
                var ab = U.getAttribute("data-target"),
                    Y = U.getAttribute("data-target-args"),
                    V = U.getAttribute("data-back"),
                    W;
                try {
                    W = JSON.parse(Y)
                } catch (aa) {}
                if ((typeof W !== "object") || (W === null)) {
                    W = {}
                }
                if (!V && !ab) {
                    return
                }
                var Z = U.getAttribute("data-clickable-class");
                if (Z) {
                    U.disabled = true;
                    U.classList.add(Z)
                }
                if (V) {
                    D.back({}, X)
                } else {
                    if (ab) {
                        D.load(ab, W, {}, X)
                    }
                }

                function X() {
                    if (Z) {
                        U.disabled = false;
                        U.classList.remove(Z)
                    }
                }
            }, false)
        });
        G(O, R, S, Q);
        S.addEventListener("DOMNodeInsertedIntoDocument", function () {
            A(R, S, b.LAYOUT)
        }, false);
        S.addEventListener(C(b.SHOW), function () {
            if (typeof R[j] === "function") {
                R[j]()
            }
        }, false);
        return S
    }

    function A(P, R, Q) {
        var O = C(Q),
            S = J(Q),
            T = true;
        if (!L.fire(R, O)) {
            T = false
        }
        if (typeof P[S] === "function") {
            if (P[S]() === false) {
                T = false
            }
        }
        return T
    }

    function C(O) {
        return "app" + O[0].toUpperCase() + O.slice(1)
    }

    function J(O) {
        return "on" + O[0].toUpperCase() + O.slice(1)
    }

    function p(O, Q, R, P) {
        r.setup(R)
    }

    function z(O, Q, R, P) {
        if (!N.os.ios || N.os.version < 6) {
            r.disable(R)
        }
        if (typeof Q.reply === "function") {
            Q.reply()
        }
    }

    function l(O, Q, R, P) {
        k(O, Q, R, P)
    }

    function f(T) {
        var Q = T.querySelector(".app-topbar"),
            R = T.querySelector(".app-content");
        if (!R) {
            return
        }
        var O = F.innerHeight;
        if (!Q) {
            R.style.height = O + "px";
            return
        }
        var S = e.defaultView.getComputedStyle(Q, null),
            P = N.os.android ? 48 : 44;
        if (S.height) {
            P = parseInt(S.height) || 0
        }
        R.style.height = (O - P) + "px"
    }

    function q(S, T) {
        if (!T) {
            return
        }
        var Q = S.querySelector(".app-topbar .left.app-button"),
            P = T.querySelector(".app-topbar .app-title");
        if (!Q || !P || (Q.getAttribute("data-autotitle") !== "true")) {
            return
        }
        var O = P.textContent,
            R = Q.textContent;
        if (!O || R) {
            return
        }
        if (O.length > 13) {
            O = O.substr(0, 12) + ".."
        }
        Q.textContent = O
    }
}(window, document, Clickable, Scrollable, App, App._utils, App._Events, App._metrics, App._Scroll);
App._Stack = function (j, n, p, u, x, q) {
    var d = "__APP_JS_STACK__" + j.location.pathname,
        h = "__APP_JS_TIME__" + j.location.pathname;
    var i = [];
    p.getStack = function () {
        return b()
    };
    p.getPage = function (y) {
        var z = i.length - 1;
        switch (typeof y) {
        case "undefined":
            y = z;
            break;
        case "number":
            if (Math.abs(y) > z) {
                throw TypeError("absolute index cannot be greater than stack size, got " + y)
            }
            if (y < 0) {
                y = z + y
            }
            break;
        default:
            throw TypeError("page index must be a number if defined, got " + y)
        }
        return f(y)
    };
    p.removeFromStack = function (A, z) {
        var y = i.length - 1;
        switch (typeof A) {
        case "undefined":
            A = 0;
            break;
        case "number":
            if (Math.abs(A) > y) {
                throw TypeError("absolute start index cannot be greater than stack size, got " + A)
            }
            if (A < 0) {
                A = y + A
            }
            break;
        default:
            throw TypeError("start index must be a number if defined, got " + A)
        }
        switch (typeof z) {
        case "undefined":
            z = y;
            break;
        case "number":
            if (Math.abs(z) > y) {
                throw TypeError("absolute end index cannot be greater than stack size, got " + z)
            }
            if (z < 0) {
                z = y + z
            }
            break;
        default:
            throw TypeError("end index must be a number if defined, got " + z)
        }
        if (A > z) {
            throw TypeError("start index cannot be greater than end index")
        }
        k(A, z)
    };
    p.addToStack = function (z, y) {
        var A = i.length - 1;
        switch (typeof z) {
        case "undefined":
            z = 0;
            break;
        case "number":
            if (Math.abs(z) > A) {
                throw TypeError("absolute index cannot be greater than stack size, got " + z)
            }
            if (z < 0) {
                z = A + z
            }
            break;
        default:
            throw TypeError("index must be a number if defined, got " + z)
        }
        if (!u.isArray(y)) {
            throw TypeError("added pages must be an array, got " + y)
        }
        y = y.slice();
        u.forEach(y, function (C, B) {
            if (typeof C === "string") {
                C = [C, {}]
            } else {
                if (u.isArray(C)) {
                    C = C.slice()
                } else {
                    throw TypeError("page description must be an array (page name, arguments), got " + C)
                }
            } if (typeof C[0] !== "string") {
                throw TypeError("page name must be a string, got " + C[0])
            }
            switch (typeof C[1]) {
            case "undefined":
                C[1] = {};
            case "object":
                break;
            default:
                throw TypeError("page arguments must be an object if defined, got " + C[1])
            }
            switch (typeof C[2]) {
            case "undefined":
                C[2] = {};
            case "object":
                break;
            default:
                throw TypeError("page options must be an object if defined, got " + C[2])
            }
            y[B] = C
        });
        w(z, y)
    };
    p.saveStack = function () {
        m()
    };
    p.destroyStack = function () {
        r()
    };
    p.restore = l();
    return {
        get: b,
        getCurrent: s,
        getPage: f,
        pop: v,
        push: g,
        size: c,
        save: m,
        destroy: r
    };

    function m() {
        try {
            var z = [];
            for (var A = 0, y = i.length; A < y; A++) {
                if (i[A][4].restorable === false) {
                    break
                }
                z.push([i[A][0], i[A][3], i[A][2]])
            }
            localStorage[d] = JSON.stringify(z);
            localStorage[h] = +new Date() + ""
        } catch (B) {}
    }

    function r() {
        delete localStorage[d];
        delete localStorage[h]
    }

    function b() {
        return i.slice().map(e)
    }

    function c() {
        return i.length
    }

    function s() {
        var y = i[i.length - 1];
        if (y) {
            return e(y)
        }
    }

    function v() {
        var y = i.pop();
        if (y) {
            return e(y)
        }
    }

    function g(y) {
        i.push([y[0], y[3], y[4], y[1], y[2]])
    }

    function f(y) {
        var z = i[y];
        if (z) {
            return z[1]
        }
    }

    function e(A) {
        var y = {};
        for (var z in A[3]) {
            y[z] = A[3][z]
        }
        return [A[0], y, A[4], A[1], A[2]]
    }

    function t(z, y) {
        var A = i.splice(z, y - z);
        u.forEach(A, function (B) {
            q.startDestruction(B[0], B[4], B[1], B[3]);
            q.finishDestruction(B[0], B[4], B[1], B[3])
        })
    }

    function k(z, y) {
        p._navigate(function (A) {
            t(z, y);
            A()
        })
    }

    function o(z, y, A) {
        var C = [],
            B;
        u.forEach(y, function (E) {
            var D = q.createManager(true),
                F = q.startGeneration(E[0], D, E[1]);
            q.populateBackButton(F, B);
            q.finishGeneration(E[0], D, F, E[1]);
            x.saveScrollPosition(F);
            x.saveScrollStyle(F);
            C.push([E[0], F, E[2], E[1], D]);
            B = F
        });
        C.unshift(0);
        C.unshift(z);
        Array.prototype.splice.apply(i, C)
    }

    function w(z, y) {
        p._navigate(function (A) {
            o(z, y);
            A()
        })
    }

    function l(z) {
        var y, B;
        try {
            y = JSON.parse(localStorage[d]);
            storedTime = parseInt(localStorage[h]);
            B = y.pop()
        } catch (A) {
            return
        }
        if (!B) {
            return
        }
        return function (C, E) {
            switch (typeof C) {
            case "function":
                E = C;
            case "undefined":
                C = {};
            case "object":
                if (C !== null) {
                    break
                }
            default:
                throw TypeError("restore options must be an object if defined, got " + C)
            }
            switch (typeof E) {
            case "undefined":
                E = function () {};
            case "function":
                break;
            default:
                throw TypeError("restore callback must be a function if defined, got " + E)
            }
            if (+new Date() - storedTime >= C.maxAge) {
                throw TypeError("restore content is too old")
            }
            if (!q.has(B[0])) {
                throw TypeError(B[0] + " is not a known page")
            }
            u.forEach(y, function (F) {
                if (!q.has(F[0])) {
                    throw TypeError(F[0] + " is not a known page")
                }
            });
            try {
                o(0, y, true)
            } catch (D) {
                t(0, i.length);
                throw Error("failed to restore stack")
            }
            m();
            try {
                p.load(B[0], B[1], B[2], E)
            } catch (D) {
                t(0, i.length);
                throw Error("failed to restore stack")
            }
        }
    }
}(window, document, App, App._utils, App._Scroll, App._Pages);
App._Form = function (f, b, e, d) {
    e.form = function (g, h) {
        if (!d.isNode(g)) {
            throw TypeError("form must be a DOM node, got " + g)
        }
        if (typeof h !== "function") {
            throw TypeError("callback must be a function, got " + h)
        }
        c(g, h)
    };
    return {};

    function c(j, m) {
        var l = (j.nodeName === "FORM"),
            h = false,
            i;
        if (l) {
            var k = b.createElement("input");
            k.style.display = "none";
            k.type = "submit";
            j.appendChild(k);
            j.addEventListener("submit", function (n) {
                n.preventDefault();
                g()
            }, false);
            i = j.querySelectorAll(".app-submit")
        } else {
            i = [j]
        }
        d.forEach(i, function (n) {
            if (n.nodeName === "TEXTAREA") {
                isText = true
            } else {
                if (n.nodeName !== "INPUT") {
                    isText = false
                } else {
                    switch ((n.type || "").toLowerCase()) {
                    case "button":
                    case "submit":
                    case "reset":
                    case "hidden":
                        isText = false;
                        break;
                    default:
                        isText = true;
                        break
                    }
                }
            } if (isText) {
                n.addEventListener("keydown", function (o) {
                    if (o.which === 13) {
                        o.preventDefault();
                        g()
                    }
                }, false)
            } else {
                n.addEventListener("click", function (o) {
                    o.preventDefault();
                    g()
                }, false)
            }
        });

        function g() {
            if (h) {
                return
            }
            h = true;
            j.disabled = true;
            var p = {}, o = l ? j.querySelectorAll("[name]") : [j],
                n = false;
            if (l) {
                d.forEach(j.querySelectorAll("[name]"), function (q) {
                    p[q.name] = q.value
                })
            } else {
                p.value = j.value;
                if (j.name) {
                    p[j.name] = j.value
                }
            }
            d.forEach(o, function (q) {
                q.disabled = true
            });
            m.call(this, p, function () {
                if (n) {
                    return
                }
                n = true;
                d.forEach(o, function (q) {
                    q.disabled = false
                });
                h = false;
                j.disabled = false
            })
        }
    }
}(window, document, App, App._utils);
App._core = function (n, w, D, A, G, j, I, B, s) {
    var g = "slide-left",
        C = "implode-out",
        d = "fade-on",
        u = "instant",
        v = {
            instant: "instant",
            fade: "fade",
            "fade-on": "fade-off",
            "fade-off": "fade-on",
            "scale-in": "scale-out",
            "scale-out": "scale-in",
            "rotate-left": "rotate-right",
            "rotate-right": "rotate-left",
            "cube-left": "cube-right",
            "cube-right": "cube-left",
            "swap-left": "swap-right",
            "swap-right": "swap-left",
            "explode-in": "explode-out",
            "explode-out": "explode-in",
            "implode-in": "implode-out",
            "implode-out": "implode-in",
            "slide-left": "slide-right",
            "slide-right": "slide-left",
            "slide-up": "slide-down",
            "slide-down": "slide-up",
            "slideon-left": "slideoff-left",
            "slideon-right": "slideoff-right",
            "slideon-up": "slideoff-up",
            "slideon-down": "slideoff-down",
            "slideoff-left": "slideon-left",
            "slideoff-right": "slideon-right",
            "slideoff-up": "slideon-up",
            "slideoff-down": "slideon-down",
            "glideon-right": "glideoff-right",
            "glideoff-right": "slideon-right",
            "glideon-left": "glideoff-left",
            "glideoff-left": "slideon-left",
            "glideon-down": "glideoff-down",
            "glideoff-down": "slideon-down",
            "glideon-up": "glideoff-up",
            "glideoff-up": "slideon-up"
        };
    var y = [],
        h = false,
        m, p, x, e;
    if (G.os.ios) {
        l(g)
    } else {
        if (G.os.android) {
            if (G.os.version >= 4) {
                l(C)
            } else {
                if ((G.os.version < 2.3) || /LT15a/i.test(navigator.userAgent)) {
                    l(u)
                } else {
                    l(d)
                }
            }
        }
    }
    A.current = function () {
        return x
    };
    A.load = function (K, M, L, N) {
        if (typeof K !== "string") {
            throw TypeError("page name must be a string, got " + K)
        }
        switch (typeof M) {
        case "function":
            L = M;
            M = {};
        case "string":
            N = L;
            L = M;
        case "undefined":
            M = {};
        case "object":
            break;
        default:
            throw TypeError("page arguments must be an object if defined, got " + M)
        }
        switch (typeof L) {
        case "function":
            N = L;
        case "undefined":
            L = {};
        case "object":
            break;
        case "string":
            L = {
                transition: L
            };
            break;
        default:
            throw TypeError("options must be an object if defined, got " + L)
        }
        switch (typeof N) {
        case "undefined":
            N = function () {};
        case "function":
            break;
        default:
            throw TypeError("callback must be a function if defined, got " + N)
        }
        return k(K, M, L, N)
    };
    A.back = function (K, L) {
        switch (typeof K) {
        case "function":
            L = K;
        case "undefined":
            K = {};
        case "object":
            break;
        case "string":
            K = {
                transition: K
            };
            break;
        default:
            throw TypeError("options must be an object if defined, got " + K)
        }
        switch (typeof L) {
        case "undefined":
            L = function () {};
        case "function":
            break;
        default:
            throw TypeError("callback must be a function if defined, got " + L)
        }
        return c(K, L)
    };
    A.pick = function (K, N, M, L, O) {
        if (typeof K !== "string") {
            throw TypeError("page name must be a string, got " + K)
        }
        switch (typeof N) {
        case "function":
            M = N;
            N = {};
        case "string":
            O = L;
            L = M;
            M = N;
        case "undefined":
            N = {};
        case "object":
            break;
        default:
            throw TypeError("page arguments must be an object if defined, got " + N)
        }
        switch (typeof M) {
        case "function":
            O = L;
            L = M;
        case "undefined":
            M = {};
        case "object":
            break;
        case "string":
            M = {
                transition: M
            };
            break;
        default:
            throw TypeError("options must be an object if defined, got " + M)
        }
        if (typeof L !== "function") {
            throw TypeError("callback must be a function, got " + L)
        }
        switch (typeof O) {
        case "undefined":
            O = L;
            L = function () {};
        case "function":
            break;
        default:
            throw TypeError("callback must be a function, got " + O)
        }
        return E(K, N, M, L, O)
    };
    A.setDefaultTransition = function (K) {
        if (typeof K === "object") {
            switch (G.os.name) {
            case "android":
                if ((G.os.version < 4) && K.androidFallback) {
                    K = K.androidFallback
                } else {
                    K = K.android
                }
                break;
            case "ios":
                if ((G.os.version < 5) && K.iosFallback) {
                    K = K.iosFallback
                } else {
                    K = K.ios
                }
                break;
            default:
                K = K.fallback;
                break
            }
            if (!K) {
                return
            }
        }
        if (typeof K !== "string") {
            throw TypeError("transition must be a string if defined, got " + K)
        }
        if (!(K in v)) {
            throw TypeError("invalid transition type, got " + K)
        }
        l(K)
    };
    A.getDefaultTransition = function () {
        return m
    };
    A.getReverseTransition = function () {
        return p
    };
    A._layout = o();
    A._navigate = F;
    return {};

    function l(K) {
        m = K;
        p = v[m]
    }

    function F(K) {
        if (h) {
            y.push(K);
            return false
        }
        h = true;
        K(function () {
            h = false;
            s.save();
            b()
        });
        return true
    }

    function k(K, M, L, O, N) {
        F(function (Q) {
            var T = e,
                X = B.createManager(false);
            if (N) {
                N(X)
            }
            var U = B.startGeneration(K, X, M),
                Z = s.getCurrent(),
                V = Z && Z[3],
                R = Z && Z[2];
            if (!L.transition && X.transition) {
                L.transition = X.transition
            }
            B.populateBackButton(U, T || V);
            if (!x) {
                A.restore = null;
                w.body.appendChild(U);
                S();
                W()
            } else {
                I.saveScrollPosition(e);
                var P = {};
                for (var Y in L) {
                    P[Y] = L[Y]
                }
                i(U, P, W);
                S()
            }

            function S() {
                x = K;
                e = U;
                s.push([K, M, X, U, L]);
                if (T && R) {
                    B.fire(R, T, B.EVENTS.FORWARD)
                }
            }

            function W() {
                I.saveScrollStyle(T);
                B.finishGeneration(K, X, U, M);
                Q();
                O();
                if (T && R) {
                    R.showing = false;
                    B.fire(R, T, B.EVENTS.HIDE)
                }
                X.showing = true;
                B.fire(X, U, B.EVENTS.SHOW)
            }
        });
        if (!B.has(K)) {
            return false
        }
    }

    function c(L, O) {
        if (j.status() && j.close()) {
            return
        }
        var N = s.size(),
            M = false;
        var K = F(function (W) {
            if (s.size() < 2) {
                W();
                return
            }
            var V = s.getCurrent();
            if (!B.fire(V[2], V[3], B.EVENTS.BEFORE_BACK)) {
                M = true;
                W();
                return
            } else {
                s.pop()
            }
            var T = s.getCurrent(),
                P = T[0],
                S = T[3],
                Q = V[4];
            B.fire(V[2], V[3], B.EVENTS.BACK);
            B.fixContent(S);
            B.startDestruction(V[0], V[2], V[3], V[1]);
            I.restoreScrollPosition(S);
            var U = {};
            for (var R in Q) {
                if (R === "transition") {
                    U[R] = v[Q[R]] || Q[R]
                } else {
                    U[R] = Q[R]
                }
            }
            for (var R in L) {
                U[R] = L[R]
            }
            i(S, U, function () {
                I.restoreScrollStyle(S);
                V[2].showing = false;
                B.fire(V[2], V[3], B.EVENTS.HIDE);
                T[2].showing = true;
                B.fire(T[2], S, B.EVENTS.SHOW);
                setTimeout(function () {
                    B.finishDestruction(V[0], V[2], V[3], V[1]);
                    W();
                    O()
                }, 0)
            }, true);
            x = P;
            e = S
        });
        if (M || (K && (N < 2))) {
            return false
        }
    }

    function E(K, N, M, L, P) {
        var O = false;
        k(K, N, M, L, function (Q) {
            Q.restorable = false;
            Q.reply = function () {
                if (!O) {
                    O = true;
                    c({}, function () {});
                    P.apply(A, arguments)
                }
            }
        })
    }

    function b() {
        if (y.length) {
            F(y.shift())
        }
    }

    function r(K) {
        var M = false;
        var L = w.createElement("div");
        L.className = "app-clickblocker";
        w.body.appendChild(L);
        L.addEventListener("touchstart", function (N) {
            N.preventDefault()
        }, false);
        K(function () {
            if (M) {
                return
            }
            M = true;
            w.body.removeChild(L)
        })
    }

    function f(K) {
        if (!G.os.ios) {
            return false
        }
        if (K.transition === "slide-left") {
            return true
        } else {
            if (K.transition === "slide-right") {
                return true
            } else {
                return false
            }
        }
    }

    function i(M, L, N, K) {
        if (!L.transition) {
            L.transition = (K ? p : m)
        }
        if (!L.duration) {
            L.duration = G.os.ios ? 325 : 270
        }
        r(function (P) {
            if (f(L)) {
                q(M, L, O)
            } else {
                if (L.transition === "instant") {
                    D(e, M, L, function () {
                        setTimeout(O, 0)
                    })
                } else {
                    D(e, M, L, O)
                }
            }

            function O() {
                B.fixContent(e);
                P();
                N()
            }
        })
    }

    function q(M, T, S) {
        var N = e,
            P = (T.transition === "slide-left"),
            K = P ? M : N,
            Q = t(M, N, P);
        if (!Q) {
            D(N, M, T, S);
            return
        }
        var R = K.style.position,
            O = K.style.zIndex,
            L = K.style.background;
        K.style.position = "fixed";
        K.style.zIndex = "10000";
        K.style.background = "none";
        if (P) {
            N.parentNode.insertBefore(M, N)
        } else {
            if (N.nextSibling) {
                N.parentNode.insertBefore(M, N.nextSibling)
            } else {
                N.parentNode.appendChild(M)
            }
        }
        G.animate(Q, T.duration, "ease-in-out", function () {
            N.parentNode.removeChild(N);
            K.style.position = R;
            K.style.zIndex = O;
            K.style.background = L;
            S()
        })
    }

    function t(O, Q, T) {
        var M = Q.querySelector(".app-topbar"),
            U = Q.querySelector(".app-topbar .app-title"),
            L = Q.querySelector(".app-topbar .left.app-button"),
            R = Q.querySelector(".app-content"),
            N = O.querySelector(".app-topbar"),
            K = O.querySelector(".app-topbar .app-title"),
            V = O.querySelector(".app-topbar .left.app-button"),
            P = O.querySelector(".app-content"),
            S = [];
        if (!M || !N || !R || !P || !z(M) || !z(N)) {
            return
        }
        if (L && L.getAttribute("data-noslide")) {
            L = undefined
        }
        if (V && V.getAttribute("data-noslide")) {
            V = undefined
        }
        if (T) {
            S.push({
                opacityStart: 0,
                opacityEnd: 1,
                elem: N
            })
        } else {
            S.push({
                opacityStart: 1,
                opacityEnd: 0,
                elem: M
            })
        } if (U) {
            S.push({
                transitionStart: "translate3d(0,0,0)",
                transitionEnd: "translate3d(" + H(V, T) + "px,0,0)",
                elem: U
            })
        }
        if (K) {
            S.push({
                transitionStart: "translate3d(" + H(L, !T) + "px,0,0)",
                transitionEnd: "translate3d(0,0,0)",
                elem: K
            })
        }
        if (G.os.version >= 5) {
            if (L) {
                S.push({
                    transitionStart: "translate3d(0,0,0)",
                    transitionEnd: "translate3d(" + J(L, V, !T) + "px,0,0)",
                    elem: L
                })
            }
            if (V) {
                S.push({
                    transitionStart: "translate3d(" + J(V, L, T) + "px,0,0)",
                    transitionEnd: "translate3d(0,0,0)",
                    elem: V
                })
            }
        }
        S.push({
            transitionStart: "translate3d(0,0,0)",
            transitionEnd: "translate3d(" + (T ? -100 : 100) + "%,0,0)",
            elem: R
        }, {
            transitionStart: "translate3d(" + (T ? 100 : -100) + "%,0,0)",
            transitionEnd: "translate3d(0,0,0)",
            elem: P
        });
        return S
    }

    function J(N, M, L) {
        var O = N.textContent.length * 10,
            K = M ? (M.textContent.length * 15) : 0;
        if (!L) {
            return (K - n.innerWidth) / 2
        } else {
            return (n.innerWidth - O) / 2
        }
    }

    function H(K, L) {
        var M = 0;
        if (K && (G.os.version >= 5)) {
            M = K.textContent.length * 10
        }
        if (!L) {
            return (n.innerWidth / 2)
        } else {
            return (M - n.innerWidth) / 2
        }
    }

    function z(L) {
        var K = G.getStyles(L);
        return (K.display !== "none" && K.opacity !== "0")
    }

    function o() {
        function M() {
            if (e) {
                B.fixContent(e)
            }
        }

        function L() {
            M();
            var N = s.getCurrent();
            if (N) {
                B.fire(N[2], N[3], B.EVENTS.LAYOUT)
            }
        }

        function K() {
            L();
            setTimeout(M, 0);
            setTimeout(M, 10);
            setTimeout(M, 100)
        }
        n.addEventListener("orientationchange", K);
        n.addEventListener("resize", K);
        n.addEventListener("load", K);
        setTimeout(K, 0);
        n.addEventListener("online", function () {
            G.forEach(s.get(), function (N) {
                N[2].online = true;
                B.fire(N[2], N[3], B.EVENTS.ONLINE)
            })
        }, false);
        n.addEventListener("offline", function () {
            G.forEach(s.get(), function (N) {
                N[2].online = false;
                B.fire(N[2], N[3], B.EVENTS.OFFLINE)
            })
        }, false);
        return K
    }
}(window, document, Swapper, App, App._utils, App._Dialog, App._Scroll, App._Pages, App._Stack);