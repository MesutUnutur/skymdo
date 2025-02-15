// v0.2.60
function e(e) {
    return Object.keys(e).reduce(((t, n) => {
        const r = e[n];
        var i;
        return t[n] = Object.assign({}, r), o(r.value) && (i = r.value, "[object Function]" !== Object.prototype.toString.call(i)) && !Array.isArray(r.value) && (t[n].value = Object.assign({}, r.value)), Array.isArray(r.value) && (t[n].value = r.value.slice(0)), t
    }), {})
}

function t(e) {
    if (e) try {
        return JSON.parse(e)
    } catch (t) {
        return e
    }
}

function n(e, t, n) {
    if (null == n || !1 === n) return e.removeAttribute(t);
    let o = JSON.stringify(n);
    e.__updating[t] = !0, "true" === o && (o = ""), e.setAttribute(t, o), Promise.resolve().then((() => delete e.__updating[t]))
}

function o(e) {
    return null != e && ("object" == typeof e || "function" == typeof e)
}
let r;

function i(o, i) {
    const s = Object.keys(i);
    return class extends o {
        static get observedAttributes() {
            return s.map((e => i[e].attribute))
        }
        constructor() {
            super(), this.__initialized = !1, this.__released = !1, this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = {}
        }
        connectedCallback() {
            if (this.__initialized) return;
            this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = function(o, r) {
                const i = e(r);
                return Object.keys(r).forEach((e => {
                    const r = i[e],
                        s = o.getAttribute(r.attribute),
                        a = o[e];
                    s && (r.value = r.parse ? t(s) : s), null != a && (r.value = Array.isArray(a) ? a.slice(0) : a), r.reflect && n(o, r.attribute, r.value), Object.defineProperty(o, e, {
                        get: () => r.value,
                        set(t) {
                            const o = r.value;
                            r.value = t, r.reflect && n(this, r.attribute, r.value);
                            for (let n = 0, r = this.__propertyChangedCallbacks.length; n < r; n++) this.__propertyChangedCallbacks[n](e, t, o)
                        },
                        enumerable: !0,
                        configurable: !0
                    })
                })), i
            }(this, i);
            const o = function(e) {
                    return Object.keys(e).reduce(((t, n) => (t[n] = e[n].value, t)), {})
                }(this.props),
                s = this.Component,
                a = r;
            try {
                r = this, this.__initialized = !0, "function" == typeof(l = s) && 0 === l.toString().indexOf("class") ? new s(o, {
                    element: this
                }) : s(o, {
                    element: this
                })
            } finally {
                r = a
            }
            var l
        }
        async disconnectedCallback() {
            if (await Promise.resolve(), this.isConnected) return;
            this.__propertyChangedCallbacks.length = 0;
            let e = null;
            for (; e = this.__releaseCallbacks.pop();) e(this);
            delete this.__initialized, this.__released = !0
        }
        attributeChangedCallback(e, n, o) {
            if (this.__initialized && !this.__updating[e] && (e = this.lookupProp(e)) in i) {
                if (null == o && !this[e]) return;
                this[e] = i[e].parse ? t(o) : o
            }
        }
        lookupProp(e) {
            if (i) return s.find((t => e === t || e === i[t].attribute))
        }
        get renderRoot() {
            return this.shadowRoot || this.attachShadow({
                mode: "open"
            })
        }
        addReleaseCallback(e) {
            this.__releaseCallbacks.push(e)
        }
        addPropertyChangedCallback(e) {
            this.__propertyChangedCallbacks.push(e)
        }
    }
}

function s(e, t = {}, n = {}) {
    const {
        BaseElement: r = HTMLElement,
        extension: s
    } = n;
    return n => {
        if (!e) throw new Error("tag is required to register a Component");
        let a = customElements.get(e);
        return a ? (a.prototype.Component = n, a) : (a = i(r, function(e) {
            return e ? Object.keys(e).reduce(((t, n) => {
                const r = e[n];
                return t[n] = o(r) && "value" in r ? r : {
                    value: r
                }, t[n].attribute || (t[n].attribute = n.replace(/\.?([A-Z]+)/g, ((e, t) => "-" + t.toLowerCase())).replace("_", "-").replace(/^-/, "")), t[n].parse = "parse" in t[n] ? t[n].parse : "string" != typeof t[n].value, t
            }), {}) : {}
        }(t)), a.prototype.Component = n, a.prototype.registeredTag = e, customElements.define(e, a, s), a)
    }
}
const a = {
        context: void 0,
        registry: void 0
    },
    l = Symbol("solid-proxy"),
    c = Symbol("solid-track"),
    d = {
        equals: (e, t) => e === t
    };
let u = B;
const p = 1,
    h = 2,
    g = {
        owned: null,
        cleanups: null,
        context: null,
        owner: null
    };
var f = null;
let b = null,
    m = null,
    y = null,
    v = null,
    w = 0;

function x(e, t) {
    const n = m,
        o = f,
        r = 0 === e.length,
        i = r ? g : {
            owned: null,
            cleanups: null,
            context: null,
            owner: void 0 === t ? o : t
        },
        s = r ? e : () => e((() => S((() => U(i)))));
    f = i, m = null;
    try {
        return O(s, !0)
    } finally {
        m = n, f = o
    }
}

function _(e, t) {
    const n = {
        value: e,
        observers: null,
        observerSlots: null,
        comparator: (t = t ? Object.assign({}, d, t) : d).equals || void 0
    };
    return [P.bind(n), e => ("function" == typeof e && (e = e(n.value)), R(n, e))]
}

function k(e, t, n) {
    L(N(e, t, !1, p))
}

function $(e, t, n) {
    u = z;
    const o = N(e, t, !1, p);
    n && n.render || (o.user = !0), v ? v.push(o) : L(o)
}

function T(e, t, n) {
    n = n ? Object.assign({}, d, n) : d;
    const o = N(e, t, !0, 0);
    return o.observers = null, o.observerSlots = null, o.comparator = n.equals || void 0, L(o), P.bind(o)
}

function S(e) {
    if (null === m) return e();
    const t = m;
    m = null;
    try {
        return e()
    } finally {
        m = t
    }
}

function C(e) {
    $((() => S(e)))
}

function E(e) {
    return null === f || (null === f.cleanups ? f.cleanups = [e] : f.cleanups.push(e)), e
}

function A() {
    return f
}

function I(e) {
    const t = T(e),
        n = T((() => H(t())));
    return n.toArray = () => {
        const e = n();
        return Array.isArray(e) ? e : null != e ? [e] : []
    }, n
}

function P() {
    if (this.sources && this.state)
        if (this.state === p) L(this);
        else {
            const e = y;
            y = null, O((() => D(this)), !1), y = e
        } if (m) {
        const e = this.observers ? this.observers.length : 0;
        m.sources ? (m.sources.push(this), m.sourceSlots.push(e)) : (m.sources = [this], m.sourceSlots = [e]), this.observers ? (this.observers.push(m), this.observerSlots.push(m.sources.length - 1)) : (this.observers = [m], this.observerSlots = [m.sources.length - 1])
    }
    return this.value
}

function R(e, t, n) {
    let o = e.value;
    return e.comparator && e.comparator(o, t) || (e.value = t, e.observers && e.observers.length && O((() => {
        for (let t = 0; t < e.observers.length; t += 1) {
            const n = e.observers[t],
                o = b && b.running;
            o && b.disposed.has(n), (o ? n.tState : n.state) || (n.pure ? y.push(n) : v.push(n), n.observers && j(n)), o || (n.state = p)
        }
        if (y.length > 1e6) throw y = [], new Error
    }), !1)), t
}

function L(e) {
    if (!e.fn) return;
    U(e);
    const t = f,
        n = m,
        o = w;
    m = f = e,
        function(e, t, n) {
            let o;
            try {
                o = e.fn(t)
            } catch (t) {
                return e.pure && (e.state = p, e.owned && e.owned.forEach(U), e.owned = null), e.updatedAt = n + 1, F(t)
            }(!e.updatedAt || e.updatedAt <= n) && (null != e.updatedAt && "observers" in e ? R(e, o) : e.value = o, e.updatedAt = n)
        }(e, e.value, o), m = n, f = t
}

function N(e, t, n, o = p, r) {
    const i = {
        fn: e,
        state: o,
        updatedAt: null,
        owned: null,
        sources: null,
        sourceSlots: null,
        cleanups: null,
        value: t,
        owner: f,
        context: null,
        pure: n
    };
    return null === f || f !== g && (f.owned ? f.owned.push(i) : f.owned = [i]), i
}

function M(e) {
    if (0 === e.state) return;
    if (e.state === h) return D(e);
    if (e.suspense && S(e.suspense.inFallback)) return e.suspense.effects.push(e);
    const t = [e];
    for (;
        (e = e.owner) && (!e.updatedAt || e.updatedAt < w);) e.state && t.push(e);
    for (let n = t.length - 1; n >= 0; n--)
        if ((e = t[n]).state === p) L(e);
        else if (e.state === h) {
        const n = y;
        y = null, O((() => D(e, t[0])), !1), y = n
    }
}

function O(e, t) {
    if (y) return e();
    let n = !1;
    t || (y = []), v ? n = !0 : v = [], w++;
    try {
        const t = e();
        return function(e) {
            y && (B(y), y = null);
            if (e) return;
            const t = v;
            v = null, t.length && O((() => u(t)), !1)
        }(n), t
    } catch (e) {
        n || (v = null), y = null, F(e)
    }
}

function B(e) {
    for (let t = 0; t < e.length; t++) M(e[t])
}

function z(e) {
    let t, n = 0;
    for (t = 0; t < e.length; t++) {
        const o = e[t];
        o.user ? e[n++] = o : M(o)
    }
    for (t = 0; t < n; t++) M(e[t])
}

function D(e, t) {
    e.state = 0;
    for (let n = 0; n < e.sources.length; n += 1) {
        const o = e.sources[n];
        if (o.sources) {
            const e = o.state;
            e === p ? o !== t && (!o.updatedAt || o.updatedAt < w) && M(o) : e === h && D(o, t)
        }
    }
}

function j(e) {
    for (let t = 0; t < e.observers.length; t += 1) {
        const n = e.observers[t];
        n.state || (n.state = h, n.pure ? y.push(n) : v.push(n), n.observers && j(n))
    }
}

function U(e) {
    let t;
    if (e.sources)
        for (; e.sources.length;) {
            const t = e.sources.pop(),
                n = e.sourceSlots.pop(),
                o = t.observers;
            if (o && o.length) {
                const e = o.pop(),
                    r = t.observerSlots.pop();
                n < o.length && (e.sourceSlots[r] = n, o[n] = e, t.observerSlots[n] = r)
            }
        }
    if (e.owned) {
        for (t = e.owned.length - 1; t >= 0; t--) U(e.owned[t]);
        e.owned = null
    }
    if (e.cleanups) {
        for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]();
        e.cleanups = null
    }
    e.state = 0, e.context = null
}

function F(e, t = f) {
    const n = function(e) {
        return e instanceof Error ? e : new Error("string" == typeof e ? e : "Unknown error", {
            cause: e
        })
    }(e);
    throw n
}

function H(e) {
    if ("function" == typeof e && !e.length) return H(e());
    if (Array.isArray(e)) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
            const o = H(e[n]);
            Array.isArray(o) ? t.push.apply(t, o) : t.push(o)
        }
        return t
    }
    return e
}
const q = Symbol("fallback");

function G(e) {
    for (let t = 0; t < e.length; t++) e[t]()
}

function V(e, t) {
    return S((() => e(t || {})))
}

function W() {
    return !0
}
const Y = {
    get: (e, t, n) => t === l ? n : e.get(t),
    has: (e, t) => t === l || e.has(t),
    set: W,
    deleteProperty: W,
    getOwnPropertyDescriptor: (e, t) => ({
        configurable: !0,
        enumerable: !0,
        get: () => e.get(t),
        set: W,
        deleteProperty: W
    }),
    ownKeys: e => e.keys()
};

function K(e) {
    return (e = "function" == typeof e ? e() : e) ? e : {}
}

function Z() {
    for (let e = 0, t = this.length; e < t; ++e) {
        const t = this[e]();
        if (void 0 !== t) return t
    }
}

function X(...e) {
    let t = !1;
    for (let n = 0; n < e.length; n++) {
        const o = e[n];
        t = t || !!o && l in o, e[n] = "function" == typeof o ? (t = !0, T(o)) : o
    }
    if (t) return new Proxy({
        get(t) {
            for (let n = e.length - 1; n >= 0; n--) {
                const o = K(e[n])[t];
                if (void 0 !== o) return o
            }
        },
        has(t) {
            for (let n = e.length - 1; n >= 0; n--)
                if (t in K(e[n])) return !0;
            return !1
        },
        keys() {
            const t = [];
            for (let n = 0; n < e.length; n++) t.push(...Object.keys(K(e[n])));
            return [...new Set(t)]
        }
    }, Y);
    const n = {},
        o = {},
        r = new Set;
    for (let t = e.length - 1; t >= 0; t--) {
        const i = e[t];
        if (!i) continue;
        const s = Object.getOwnPropertyNames(i);
        for (let e = 0, t = s.length; e < t; e++) {
            const t = s[e];
            if ("__proto__" === t || "constructor" === t) continue;
            const a = Object.getOwnPropertyDescriptor(i, t);
            if (r.has(t)) {
                const e = o[t];
                e ? a.get ? e.push(a.get.bind(i)) : void 0 !== a.value && e.push((() => a.value)) : void 0 === n[t] && (n[t] = a.value)
            } else a.get ? (r.add(t), Object.defineProperty(n, t, {
                enumerable: !0,
                configurable: !0,
                get: Z.bind(o[t] = [a.get.bind(i)])
            })) : (void 0 !== a.value && r.add(t), n[t] = a.value)
        }
    }
    return n
}

function J(e, ...t) {
    if (l in e) {
        const n = new Set(t.length > 1 ? t.flat() : t[0]),
            o = t.map((t => new Proxy({
                get: n => t.includes(n) ? e[n] : void 0,
                has: n => t.includes(n) && n in e,
                keys: () => t.filter((t => t in e))
            }, Y)));
        return o.push(new Proxy({
            get: t => n.has(t) ? void 0 : e[t],
            has: t => !n.has(t) && t in e,
            keys: () => Object.keys(e).filter((e => !n.has(e)))
        }, Y)), o
    }
    const n = {},
        o = t.map((() => ({})));
    for (const r of Object.getOwnPropertyNames(e)) {
        const i = Object.getOwnPropertyDescriptor(e, r),
            s = !i.get && !i.set && i.enumerable && i.writable && i.configurable;
        let a = !1,
            l = 0;
        for (const e of t) e.includes(r) && (a = !0, s ? o[l][r] = i.value : Object.defineProperty(o[l], r, i)), ++l;
        a || (s ? n[r] = i.value : Object.defineProperty(n, r, i))
    }
    return [...o, n]
}
let Q = 0;
const ee = e => `Stale read from <${e}>.`;

function te(e) {
    const t = "fallback" in e && {
        fallback: () => e.fallback
    };
    return T(function(e, t, n = {}) {
        let o = [],
            r = [],
            i = [],
            s = 0,
            a = t.length > 1 ? [] : null;
        return E((() => G(i))), () => {
            let l, d, u = e() || [];
            return u[c], S((() => {
                let e, t, c, h, g, f, b, m, y, v = u.length;
                if (0 === v) 0 !== s && (G(i), i = [], o = [], r = [], s = 0, a && (a = [])), n.fallback && (o = [q], r[0] = x((e => (i[0] = e, n.fallback()))), s = 1);
                else if (0 === s) {
                    for (r = new Array(v), d = 0; d < v; d++) o[d] = u[d], r[d] = x(p);
                    s = v
                } else {
                    for (c = new Array(v), h = new Array(v), a && (g = new Array(v)), f = 0, b = Math.min(s, v); f < b && o[f] === u[f]; f++);
                    for (b = s - 1, m = v - 1; b >= f && m >= f && o[b] === u[m]; b--, m--) c[m] = r[b], h[m] = i[b], a && (g[m] = a[b]);
                    for (e = new Map, t = new Array(m + 1), d = m; d >= f; d--) y = u[d], l = e.get(y), t[d] = void 0 === l ? -1 : l, e.set(y, d);
                    for (l = f; l <= b; l++) y = o[l], d = e.get(y), void 0 !== d && -1 !== d ? (c[d] = r[l], h[d] = i[l], a && (g[d] = a[l]), d = t[d], e.set(y, d)) : i[l]();
                    for (d = f; d < v; d++) d in c ? (r[d] = c[d], i[d] = h[d], a && (a[d] = g[d], a[d](d))) : r[d] = x(p);
                    r = r.slice(0, s = v), o = u.slice(0)
                }
                return r
            }));

            function p(e) {
                if (i[d] = e, a) {
                    const [e, n] = _(d);
                    return a[d] = n, t(u[d], e)
                }
                return t(u[d])
            }
        }
    }((() => e.each), e.children, t || void 0))
}

function ne(e) {
    const t = e.keyed,
        n = T((() => e.when), void 0, {
            equals: (e, n) => t ? e === n : !e == !n
        });
    return T((() => {
        const o = n();
        if (o) {
            const r = e.children;
            return "function" == typeof r && r.length > 0 ? S((() => r(t ? o : () => {
                if (!S(n)) throw ee("Show");
                return e.when
            }))) : r
        }
        return e.fallback
    }), void 0, void 0)
}

function oe(e) {
    let t = !1;
    const n = I((() => e.children)),
        o = T((() => {
            let e = n();
            Array.isArray(e) || (e = [e]);
            for (let n = 0; n < e.length; n++) {
                const o = e[n].when;
                if (o) return t = !!e[n].keyed, [n, o, e[n]]
            }
            return [-1]
        }), void 0, {
            equals: (e, n) => e[0] === n[0] && (t ? e[1] === n[1] : !e[1] == !n[1]) && e[2] === n[2]
        });
    return T((() => {
        const [n, r, i] = o();
        if (n < 0) return e.fallback;
        const s = i.children;
        return "function" == typeof s && s.length > 0 ? S((() => s(t ? r : () => {
            if (S(o)[0] !== n) throw ee("Match");
            return i.when
        }))) : s
    }), void 0, void 0)
}

function re(e) {
    return e
}
const ie = new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", "allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"]),
    se = new Set(["innerHTML", "textContent", "innerText", "children"]),
    ae = Object.assign(Object.create(null), {
        className: "class",
        htmlFor: "for"
    }),
    le = Object.assign(Object.create(null), {
        class: "className",
        formnovalidate: {
            $: "formNoValidate",
            BUTTON: 1,
            INPUT: 1
        },
        ismap: {
            $: "isMap",
            IMG: 1
        },
        nomodule: {
            $: "noModule",
            SCRIPT: 1
        },
        playsinline: {
            $: "playsInline",
            VIDEO: 1
        },
        readonly: {
            $: "readOnly",
            INPUT: 1,
            TEXTAREA: 1
        }
    });
const ce = new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"]),
    de = {
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace"
    };
const ue = "_$DX_DELEGATE";

function pe(e, t, n) {
    let o;
    const r = () => {
            const t = document.createElement("template");
            return t.innerHTML = e, n ? t.content.firstChild.firstChild : t.content.firstChild
        },
        i = t ? () => S((() => document.importNode(o || (o = r()), !0))) : () => (o || (o = r())).cloneNode(!0);
    return i.cloneNode = i, i
}

function he(e, t = window.document) {
    const n = t[ue] || (t[ue] = new Set);
    for (let o = 0, r = e.length; o < r; o++) {
        const r = e[o];
        n.has(r) || (n.add(r), t.addEventListener(r, xe))
    }
}

function ge(e, t, n) {
    null == n ? e.removeAttribute(t) : e.setAttribute(t, n)
}

function fe(e, t) {
    null == t ? e.removeAttribute("class") : e.className = t
}

function be(e, t = {}, n, o) {
    const r = {};
    return o || k((() => r.children = _e(e, t.children, r.children))), k((() => t.ref && t.ref(e))), k((() => function(e, t, n, o, r = {}, i = !1) {
        t || (t = {});
        for (const o in r)
            if (!(o in t)) {
                if ("children" === o) continue;
                r[o] = we(e, o, null, r[o], n, i)
            } for (const s in t) {
            if ("children" === s) {
                o || _e(e, t.children);
                continue
            }
            const a = t[s];
            r[s] = we(e, s, a, r[s], n, i)
        }
    }(e, t, n, !0, r, !0))), r
}

function me(e, t, n) {
    return S((() => e(t, n)))
}

function ye(e, t, n, o) {
    if (void 0 === n || o || (o = []), "function" != typeof t) return _e(e, t, o, n);
    k((o => _e(e, t(), o, n)), o)
}

function ve(e, t, n) {
    const o = t.trim().split(/\s+/);
    for (let t = 0, r = o.length; t < r; t++) e.classList.toggle(o[t], n)
}

function we(e, t, n, o, r, i) {
    let s, a, l, c, d;
    if ("style" === t) return function(e, t, n) {
        if (!t) return n ? ge(e, "style") : t;
        const o = e.style;
        if ("string" == typeof t) return o.cssText = t;
        let r, i;
        for (i in "string" == typeof n && (o.cssText = n = void 0), n || (n = {}), t || (t = {}), n) null == t[i] && o.removeProperty(i), delete n[i];
        for (i in t) r = t[i], r !== n[i] && (o.setProperty(i, r), n[i] = r);
        return n
    }(e, n, o);
    if ("classList" === t) return function(e, t, n = {}) {
        const o = Object.keys(t || {}),
            r = Object.keys(n);
        let i, s;
        for (i = 0, s = r.length; i < s; i++) {
            const o = r[i];
            o && "undefined" !== o && !t[o] && (ve(e, o, !1), delete n[o])
        }
        for (i = 0, s = o.length; i < s; i++) {
            const r = o[i],
                s = !!t[r];
            r && "undefined" !== r && n[r] !== s && s && (ve(e, r, !0), n[r] = s)
        }
        return n
    }(e, n, o);
    if (n === o) return o;
    if ("ref" === t) i || n(e);
    else if ("on:" === t.slice(0, 3)) {
        const r = t.slice(3);
        o && e.removeEventListener(r, o), n && e.addEventListener(r, n)
    } else if ("oncapture:" === t.slice(0, 10)) {
        const r = t.slice(10);
        o && e.removeEventListener(r, o, !0), n && e.addEventListener(r, n, !0)
    } else if ("on" === t.slice(0, 2)) {
        const r = t.slice(2).toLowerCase(),
            i = ce.has(r);
        if (!i && o) {
            const t = Array.isArray(o) ? o[0] : o;
            e.removeEventListener(r, t)
        }(i || n) && (! function(e, t, n, o) {
            if (o) Array.isArray(n) ? (e[`$$${t}`] = n[0], e[`$$${t}Data`] = n[1]) : e[`$$${t}`] = n;
            else if (Array.isArray(n)) {
                const o = n[0];
                e.addEventListener(t, n[0] = t => o.call(e, n[1], t))
            } else e.addEventListener(t, n)
        }(e, r, n, i), i && he([r]))
    } else if ("attr:" === t.slice(0, 5)) ge(e, t.slice(5), n);
    else if ((d = "prop:" === t.slice(0, 5)) || (l = se.has(t)) || !r && ((c = function(e, t) {
            const n = le[e];
            return "object" == typeof n ? n[t] ? n.$ : void 0 : n
        }(t, e.tagName)) || (a = ie.has(t))) || (s = e.nodeName.includes("-"))) d && (t = t.slice(5), a = !0), "class" === t || "className" === t ? fe(e, n) : !s || a || l ? e[c || t] = n : e[(u = t, u.toLowerCase().replace(/-([a-z])/g, ((e, t) => t.toUpperCase())))] = n;
    else {
        const o = r && t.indexOf(":") > -1 && de[t.split(":")[0]];
        o ? function(e, t, n, o) {
            null == o ? e.removeAttributeNS(t, n) : e.setAttributeNS(t, n, o)
        }(e, o, t, n) : ge(e, ae[t] || t, n)
    }
    var u;
    return n
}

function xe(e) {
    const t = `$$${e.type}`;
    let n = e.composedPath && e.composedPath()[0] || e.target;
    for (e.target !== n && Object.defineProperty(e, "target", {
            configurable: !0,
            value: n
        }), Object.defineProperty(e, "currentTarget", {
            configurable: !0,
            get: () => n || document
        }); n;) {
        const o = n[t];
        if (o && !n.disabled) {
            const r = n[`${t}Data`];
            if (void 0 !== r ? o.call(n, r, e) : o.call(n, e), e.cancelBubble) return
        }
        n = n._$host || n.parentNode || n.host
    }
}

function _e(e, t, n, o, r) {
    for (;
        "function" == typeof n;) n = n();
    if (t === n) return n;
    const i = typeof t,
        s = void 0 !== o;
    if (e = s && n[0] && n[0].parentNode || e, "string" === i || "number" === i)
        if ("number" === i && (t = t.toString()), s) {
            let r = n[0];
            r && 3 === r.nodeType ? r.data = t : r = document.createTextNode(t), n = Te(e, n, o, r)
        } else n = "" !== n && "string" == typeof n ? e.firstChild.data = t : e.textContent = t;
    else if (null == t || "boolean" === i) n = Te(e, n, o);
    else {
        if ("function" === i) return k((() => {
            let r = t();
            for (;
                "function" == typeof r;) r = r();
            n = _e(e, r, n, o)
        })), () => n;
        if (Array.isArray(t)) {
            const i = [],
                a = n && Array.isArray(n);
            if (ke(i, t, n, r)) return k((() => n = _e(e, i, n, o, !0))), () => n;
            if (0 === i.length) {
                if (n = Te(e, n, o), s) return n
            } else a ? 0 === n.length ? $e(e, i, o) : function(e, t, n) {
                let o = n.length,
                    r = t.length,
                    i = o,
                    s = 0,
                    a = 0,
                    l = t[r - 1].nextSibling,
                    c = null;
                for (; s < r || a < i;)
                    if (t[s] !== n[a]) {
                        for (; t[r - 1] === n[i - 1];) r--, i--;
                        if (r === s) {
                            const t = i < o ? a ? n[a - 1].nextSibling : n[i - a] : l;
                            for (; a < i;) e.insertBefore(n[a++], t)
                        } else if (i === a)
                            for (; s < r;) c && c.has(t[s]) || t[s].remove(), s++;
                        else if (t[s] === n[i - 1] && n[a] === t[r - 1]) {
                            const o = t[--r].nextSibling;
                            e.insertBefore(n[a++], t[s++].nextSibling), e.insertBefore(n[--i], o), t[r] = n[i]
                        } else {
                            if (!c) {
                                c = new Map;
                                let e = a;
                                for (; e < i;) c.set(n[e], e++)
                            }
                            const o = c.get(t[s]);
                            if (null != o)
                                if (a < o && o < i) {
                                    let l, d = s,
                                        u = 1;
                                    for (; ++d < r && d < i && null != (l = c.get(t[d])) && l === o + u;) u++;
                                    if (u > o - a) {
                                        const r = t[s];
                                        for (; a < o;) e.insertBefore(n[a++], r)
                                    } else e.replaceChild(n[a++], t[s++])
                                } else s++;
                            else t[s++].remove()
                        }
                    } else s++, a++
            }(e, n, i) : (n && Te(e), $e(e, i));
            n = i
        } else if (t.nodeType) {
            if (Array.isArray(n)) {
                if (s) return n = Te(e, n, o, t);
                Te(e, n, null, t)
            } else null != n && "" !== n && e.firstChild ? e.replaceChild(t, e.firstChild) : e.appendChild(t);
            n = t
        } else console.warn("Unrecognized value. Skipped inserting", t)
    }
    return n
}

function ke(e, t, n, o) {
    let r = !1;
    for (let i = 0, s = t.length; i < s; i++) {
        let s, a = t[i],
            l = n && n[i];
        if (null == a || !0 === a || !1 === a);
        else if ("object" == (s = typeof a) && a.nodeType) e.push(a);
        else if (Array.isArray(a)) r = ke(e, a, l) || r;
        else if ("function" === s)
            if (o) {
                for (;
                    "function" == typeof a;) a = a();
                r = ke(e, Array.isArray(a) ? a : [a], Array.isArray(l) ? l : [l]) || r
            } else e.push(a), r = !0;
        else {
            const t = String(a);
            l && 3 === l.nodeType && l.data === t ? e.push(l) : e.push(document.createTextNode(t))
        }
    }
    return r
}

function $e(e, t, n = null) {
    for (let o = 0, r = t.length; o < r; o++) e.insertBefore(t[o], n)
}

function Te(e, t, n, o) {
    if (void 0 === n) return e.textContent = "";
    const r = o || document.createTextNode("");
    if (t.length) {
        let o = !1;
        for (let i = t.length - 1; i >= 0; i--) {
            const s = t[i];
            if (r !== s) {
                const t = s.parentNode === e;
                o || i ? t && s.remove() : t ? e.replaceChild(r, s) : e.insertBefore(r, n)
            } else o = !0
        }
    } else e.insertBefore(r, n);
    return [r]
}
const Se = "http://www.w3.org/2000/svg";

function Ce(e) {
    const {
        useShadow: t
    } = e, n = document.createTextNode(""), o = A();
    let r;
    return $((() => {
        r || (r = function(e, t) {
            const n = f,
                o = m;
            f = e, m = null;
            try {
                return O(t, !0)
            } catch (e) {
                F(e)
            } finally {
                f = n, m = o
            }
        }(o, (() => T((() => e.children)))));
        const i = e.mount || document.body;
        if (i instanceof HTMLHeadElement) {
            const [e, t] = _(!1), n = () => t(!0);
            x((t => ye(i, (() => e() ? t() : r()), null))), E(n)
        } else {
            const o = function(e, t = !1) {
                    return t ? document.createElementNS(Se, e) : document.createElement(e)
                }(e.isSVG ? "g" : "div", e.isSVG),
                s = t && o.attachShadow ? o.attachShadow({
                    mode: "open"
                }) : o;
            Object.defineProperty(o, "_$host", {
                get: () => n.parentNode,
                configurable: !0
            }), ye(s, r), i.appendChild(o), e.ref && e.ref(o), E((() => i.removeChild(o)))
        }
    }), void 0, {
        render: !!!a.context
    }), n
}

function Ee(e) {
    return (t, n) => {
        const {
            element: o
        } = n;
        return x((r => {
            const i = function(e) {
                const t = Object.keys(e),
                    n = {};
                for (let o = 0; o < t.length; o++) {
                    const [r, i] = _(e[t[o]]);
                    Object.defineProperty(n, t[o], {
                        get: r,
                        set(e) {
                            i((() => e))
                        }
                    })
                }
                return n
            }(t);
            o.addPropertyChangedCallback(((e, t) => i[e] = t)), o.addReleaseCallback((() => {
                o.renderRoot.textContent = "", r()
            }));
            const s = e(i, n);
            return ye(o.renderRoot, s)
        }), function(e) {
            if (e.assignedSlot && e.assignedSlot._$owner) return e.assignedSlot._$owner;
            let t = e.parentNode;
            for (; t && !t._$owner && (!t.assignedSlot || !t.assignedSlot._$owner);) t = t.parentNode;
            return t && t.assignedSlot ? t.assignedSlot._$owner : e._$owner
        }(o))
    }
}

function Ae(e, t, n) {
    return 2 === arguments.length && (n = t, t = {}), s(e, t)(Ee(n))
}
const Ie = {
        skymodbot: void 0,
        onNewInputBlock: void 0,
        onAnswer: void 0,
        onEnd: void 0,
        onInit: void 0,
        onNewLogs: void 0,
        isPreview: void 0,
        startFrom: void 0,
        prefilledVariables: void 0,
        apiHost: void 0,
        resultId: void 0
    },
    Pe = {
        ...Ie,
        onClose: void 0,
        onOpen: void 0,
        theme: void 0,
        autoShowDelay: void 0,
        isOpen: void 0,
        defaultOpen: void 0
    },
    Re = {
        ...Ie,
        onClose: void 0,
        onOpen: void 0,
        theme: void 0,
        previewMessage: void 0,
        onPreviewMessageClick: void 0,
        autoShowDelay: void 0
    };
var Le = '/*! tailwindcss v3.3.3 | MIT License | https://tailwindcss.com*/*,:after,:before{border:0 solid #e5e7eb;box-sizing:border-box}:after,:before{--tw-content:""}html{-webkit-text-size-adjust:100%;font-feature-settings:normal;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-variation-settings:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4}body{line-height:inherit;margin:0}hr{border-top-width:1px;color:inherit;height:0}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{border-collapse:collapse;border-color:inherit;text-indent:0}button,input,optgroup,select,textarea{font-feature-settings:inherit;color:inherit;font-family:inherit;font-size:100%;font-variation-settings:inherit;font-weight:inherit;line-height:inherit;margin:0;padding:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0}fieldset,legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{color:#9ca3af;opacity:1}input::placeholder,textarea::placeholder{color:#9ca3af;opacity:1}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{height:auto;max-width:100%}[hidden]{display:none}*,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.container{width:100%}@media (min-width:640px){.container{max-width:640px}}@media (min-width:768px){.container{max-width:768px}}@media (min-width:1024px){.container{max-width:1024px}}@media (min-width:1280px){.container{max-width:1280px}}@media (min-width:1536px){.container{max-width:1536px}}.pointer-events-none{pointer-events:none}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.inset-0{inset:0}.-right-1{right:-4px}.-right-2{right:-8px}.-top-2{top:-8px}.bottom-5{bottom:20px}.left-0{left:0}.left-5{left:20px}.right-0{right:0}.right-5{right:20px}.top-0{top:0}.z-10{z-index:10}.z-20{z-index:20}.m-2{margin:8px}.m-auto{margin:auto}.mx-4{margin-left:16px;margin-right:16px}.my-2{margin-bottom:8px;margin-top:8px}.-mr-1{margin-right:-4px}.-mt-1{margin-top:-4px}.mb-3{margin-bottom:12px}.ml-2{margin-left:8px}.mt-1{margin-top:4px}.mt-4{margin-top:16px}.\\!block{display:block!important}.block{display:block}.flex{display:flex}.inline-flex{display:inline-flex}.hidden{display:none}.h-10{height:40px}.h-2{height:8px}.h-2\\.5{height:10px}.h-3{height:12px}.h-32{height:128px}.h-4{height:16px}.h-5{height:20px}.h-6{height:24px}.h-8{height:32px}.h-9{height:36px}.h-\\[80vh\\]{height:80vh}.h-full{height:100%}.max-h-80{max-height:320px}.max-h-\\[464px\\]{max-height:464px}.min-h-full{min-height:100%}.w-10{width:40px}.w-2{width:8px}.w-3{width:12px}.w-4{width:16px}.w-5{width:20px}.w-6{width:24px}.w-8{width:32px}.w-\\[60\\%\\]{width:60%}.w-full{width:100%}.min-w-0{min-width:0}.max-w-\\[256px\\]{max-width:256px}.max-w-full{max-width:100%}.max-w-lg{max-width:512px}.max-w-xs{max-width:320px}.flex-1{flex:1 1 0%}.flex-shrink-0{flex-shrink:0}.-rotate-180{--tw-rotate:-180deg}.-rotate-180,.rotate-0{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-0{--tw-rotate:0deg}.scale-0{--tw-scale-x:0;--tw-scale-y:0}.scale-0,.scale-100{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.scale-100{--tw-scale-x:1;--tw-scale-y:1}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@keyframes fade-in{0%{opacity:0}to{opacity:1}}.animate-fade-in{animation:fade-in .3s ease-out}@keyframes ping{75%,to{opacity:0;transform:scale(2)}}.animate-ping{animation:ping 1s cubic-bezier(0,0,.2,1) infinite}@keyframes spin{to{transform:rotate(1turn)}}.animate-spin{animation:spin 1s linear infinite}.cursor-pointer{cursor:pointer}.select-none{-webkit-user-select:none;-moz-user-select:none;user-select:none}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-1{gap:4px}.gap-2{gap:8px}.gap-3{gap:12px}.gap-4{gap:16px}.gap-6{gap:24px}.overflow-hidden{overflow:hidden}.overflow-y-auto{overflow-y:auto}.overflow-y-scroll{overflow-y:scroll}.scroll-smooth{scroll-behavior:smooth}.text-ellipsis{text-overflow:ellipsis}.whitespace-pre-wrap{white-space:pre-wrap}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:8px}.rounded-md{border-radius:6px}.border{border-width:1px}.border-2{border-width:2px}.border-dashed{border-style:dashed}.border-gray-300{--tw-border-opacity:1;border-color:rgb(209 213 219/var(--tw-border-opacity))}.bg-black{--tw-bg-opacity:1;background-color:rgb(0 0 0/var(--tw-bg-opacity))}.bg-gray-200{--tw-bg-opacity:1;background-color:rgb(229 231 235/var(--tw-bg-opacity))}.bg-gray-50{--tw-bg-opacity:1;background-color:rgb(249 250 251/var(--tw-bg-opacity))}.bg-transparent{background-color:transparent}.bg-white{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity))}.bg-opacity-50{--tw-bg-opacity:0.5}.bg-cover{background-size:cover}.bg-center{background-position:50%}.fill-transparent{fill:transparent}.stroke-2{stroke-width:2}.object-cover{-o-object-fit:cover;object-fit:cover}.p-1{padding:4px}.p-2{padding:8px}.p-4{padding:16px}.px-1{padding-left:4px;padding-right:4px}.px-3{padding-left:12px;padding-right:12px}.px-4{padding-left:16px;padding-right:16px}.px-8{padding-left:32px;padding-right:32px}.py-1{padding-bottom:4px;padding-top:4px}.py-2{padding-bottom:8px;padding-top:8px}.py-4{padding-bottom:16px;padding-top:16px}.py-6{padding-bottom:24px;padding-top:24px}.pb-0{padding-bottom:0}.pl-2{padding-left:8px}.pl-4{padding-left:16px}.pr-1{padding-right:4px}.pr-2{padding-right:8px}.pr-4{padding-right:16px}.pt-10{padding-top:40px}.text-left{text-align:left}.text-center{text-align:center}.text-right{text-align:right}.text-2xl{font-size:24px;line-height:32px}.text-4xl{font-size:36px;line-height:40px}.text-base{font-size:16px;line-height:24px}.text-sm{font-size:14px;line-height:20px}.text-xl{font-size:20px;line-height:28px}.font-normal{font-weight:400}.font-semibold{font-weight:600}.italic{font-style:italic}.text-gray-500{--tw-text-opacity:1;color:rgb(107 114 128/var(--tw-text-opacity))}.text-gray-900{--tw-text-opacity:1;color:rgb(17 24 39/var(--tw-text-opacity))}.text-red-500{--tw-text-opacity:1;color:rgb(239 68 68/var(--tw-text-opacity))}.text-white{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity))}.underline{text-decoration-line:underline}.opacity-0{opacity:0}.opacity-100{opacity:1}.opacity-25{opacity:.25}.opacity-75{opacity:.75}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);--tw-shadow-colored:0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color)}.shadow,.shadow-md{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-md{--tw-shadow:0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -2px rgba(0,0,0,.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color),0 2px 4px -2px var(--tw-shadow-color)}.shadow-xl{--tw-shadow:0 20px 25px -5px rgba(0,0,0,.1),0 8px 10px -6px rgba(0,0,0,.1);--tw-shadow-colored:0 20px 25px -5px var(--tw-shadow-color),0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.brightness-150{--tw-brightness:brightness(1.5)}.brightness-150,.brightness-200{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.brightness-200{--tw-brightness:brightness(2)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.transition{transition-duration:.15s;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-all{transition-duration:.15s;transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-opacity{transition-duration:.15s;transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-transform{transition-duration:.15s;transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1)}.duration-200{transition-duration:.2s}.ease-out{transition-timing-function:cubic-bezier(0,0,.2,1)}:host{--typebot-container-bg-image:none;--typebot-container-bg-color:transparent;--typebot-container-font-family:"Open Sans";--typebot-container-color:#303235;--typebot-button-bg-color:#0042da;--typebot-button-bg-color-rgb:0,66,218;--typebot-button-color:#fff;--typebot-checkbox-bg-color:#fff;--typebot-host-bubble-bg-color:#f7f8ff;--typebot-host-bubble-color:#303235;--typebot-guest-bubble-bg-color:#ff8e21;--typebot-guest-bubble-color:#fff;--typebot-input-bg-color:#fff;--typebot-input-color:#303235;--typebot-input-placeholder-color:#9095a0;--typebot-header-bg-color:#fff;--typebot-header-color:#303235;--selectable-base-alpha:0;--typebot-border-radius:6px;--typebot-progress-bar-position:fixed;--typebot-progress-bar-bg-color:#f7f8ff;--typebot-progress-bar-color:#0042da;--typebot-progress-bar-height:6px;--typebot-progress-bar-top:0;--typebot-progress-bar-bottom:auto;--PhoneInputCountryFlag-borderColor:transparent;--PhoneInput-color--focus:transparent}.scrollable-container::-webkit-scrollbar{display:none}.scrollable-container{-ms-overflow-style:none;scrollbar-width:none}.text-fade-in{transition:opacity .4s ease-in .2s}.bubble-typing{transition:width .4s ease-out,height .4s ease-out}.bubble1,.bubble2,.bubble3{background-color:var(--typebot-host-bubble-color);opacity:.5}.bubble1,.bubble2{animation:chatBubbles 1s ease-in-out infinite}.bubble2{animation-delay:.3s}.bubble3{animation:chatBubbles 1s ease-in-out infinite;animation-delay:.5s}@keyframes chatBubbles{0%{transform:translateY(2.5)}50%{transform:translateY(-2.5px)}to{transform:translateY(0)}}button,input,textarea{font-weight:300}a{text-decoration:underline}ol,ul{margin-inline-end:0;margin-inline-start:0;padding-inline-start:40px}ol{list-style-type:decimal}ul{list-style-type:disc}li:not(:last-child){margin-bottom:8px}pre{word-wrap:break-word;max-height:100%;max-width:100%;overflow:auto;overflow-wrap:break-word;white-space:pre-wrap}.slate-bold{font-weight:700}.slate-italic{font-style:oblique}.slate-underline{text-decoration:underline}.text-input::-moz-placeholder{color:var(--typebot-input-placeholder-color)!important;opacity:1!important}.text-input::placeholder{color:var(--typebot-input-placeholder-color)!important;opacity:1!important}.typebot-container{background-color:var(--typebot-container-bg-color);background-image:var(--typebot-container-bg-image);font-family:var(--typebot-container-font-family),-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"}.typebot-button{background-color:var(--typebot-button-bg-color);border:1px solid var(--typebot-button-bg-color);border-radius:var(--typebot-border-radius);color:var(--typebot-button-color);transition:all .3s ease}.typebot-button.selectable{background-color:var(--typebot-host-bubble-bg-color);border:1px solid var(--typebot-button-bg-color);color:var(--typebot-host-bubble-color)}.typebot-selectable{-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);background-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .08));border:1px solid rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .25));border-radius:var(--typebot-border-radius);color:var(--typebot-container-color);transition:all .3s ease}.typebot-selectable:hover{background-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .12));border-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .3))}.typebot-selectable.selected{background-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .18));border-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .35))}.typebot-checkbox{background-color:var(--typebot-checkbox-bg-color);border:1px solid var(--typebot-button-bg-color);border-radius:var(--typebot-border-radius);border-radius:2px;color:var(--typebot-button-color);padding:1px;transition:all .3s ease}.typebot-checkbox.checked{background-color:var(--typebot-button-bg-color)}.typebot-host-bubble{color:var(--typebot-host-bubble-color)}.typebot-host-bubble>.bubble-typing{background-color:var(--typebot-host-bubble-bg-color);border:var(--typebot-host-bubble-border);border-radius:6px}.typebot-guest-bubble{background-color:var(--typebot-guest-bubble-bg-color);border-radius:6px;color:var(--typebot-guest-bubble-color)}.typebot-input{background-color:var(--typebot-input-bg-color);border-radius:var(--typebot-border-radius);box-shadow:0 2px 6px -1px rgba(0,0,0,.1)}.typebot-input,.typebot-input-error-message{color:var(--typebot-input-color)}.typebot-button>.send-icon{fill:var(--typebot-button-color)}.typebot-chat-view{max-width:900px}.ping span{background-color:var(--typebot-button-bg-color)}.rating-icon-container svg{stroke:var(--typebot-button-bg-color);fill:var(--typebot-host-bubble-bg-color);height:42px;transition:fill .1s ease-out;width:42px}.rating-icon-container.selected svg{fill:var(--typebot-button-bg-color)}.rating-icon-container:hover svg{filter:brightness(.9)}.rating-icon-container:active svg{filter:brightness(.75)}.upload-progress-bar{border-radius:var(--typebot-border-radius)}.total-files-indicator,.upload-progress-bar{background-color:var(--typebot-button-bg-color)}.total-files-indicator{color:var(--typebot-button-color);font-size:10px}.typebot-upload-input{border-radius:var(--typebot-border-radius);transition:border-color .1s ease-out}.typebot-upload-input.dragging-over{border-color:var(--typebot-button-bg-color)}.secondary-button{background-color:var(--typebot-host-bubble-bg-color);border-radius:var(--typebot-border-radius);color:var(--typebot-host-bubble-color)}.typebot-country-select{color:var(--typebot-input-color)}.typebot-country-select,.typebot-date-input{background-color:var(--typebot-input-bg-color);border-radius:var(--typebot-border-radius)}.typebot-date-input{color:var(--typebot-input-color);color-scheme:light}.typebot-picture-button,.typebot-popup-blocked-toast{border-radius:var(--typebot-border-radius)}.typebot-picture-button{background-color:var(--typebot-button-bg-color);color:var(--typebot-button-color);transition:all .3s ease;width:236px}.typebot-picture-button>img,.typebot-selectable-picture>img{border-radius:var(--typebot-border-radius) var(--typebot-border-radius) 0 0;height:100%;max-height:200px;min-width:200px;-o-object-fit:cover;object-fit:cover;width:100%}.typebot-picture-button.has-svg>img,.typebot-selectable-picture.has-svg>img{max-height:128px;-o-object-fit:contain;object-fit:contain;padding:1rem}.typebot-selectable-picture{background-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .08));border:1px solid rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .25));border-radius:var(--typebot-border-radius);color:var(--typebot-container-color);transition:all .3s ease;width:236px}.typebot-selectable-picture:hover{background-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .12));border-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .3))}.typebot-selectable-picture.selected{background-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .18));border-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .35))}select option{background-color:var(--typebot-input-bg-color);color:var(--typebot-input-color)}.typebot-progress-bar-container{background-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .12));bottom:var(--typebot-progress-bar-bottom);height:var(--typebot-progress-bar-height);left:0;position:var(--typebot-progress-bar-position);top:var(--typebot-progress-bar-top);width:100%;z-index:42424242}.typebot-progress-bar-container>.typebot-progress-bar{background-color:var(--typebot-progress-bar-color);height:100%;position:absolute;transition:width .25s ease}.hover\\:scale-110:hover{--tw-scale-x:1.1;--tw-scale-y:1.1;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.hover\\:bg-gray-100:hover{--tw-bg-opacity:1;background-color:rgb(243 244 246/var(--tw-bg-opacity))}.hover\\:shadow-lg:hover{--tw-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1);--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color),0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.hover\\:brightness-90:hover{--tw-brightness:brightness(.9)}.hover\\:brightness-90:hover,.hover\\:brightness-95:hover{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.hover\\:brightness-95:hover{--tw-brightness:brightness(.95)}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.active\\:scale-95:active{--tw-scale-x:.95;--tw-scale-y:.95;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.active\\:brightness-75:active{--tw-brightness:brightness(.75)}.active\\:brightness-75:active,.active\\:brightness-90:active{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.active\\:brightness-90:active{--tw-brightness:brightness(.9)}.disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.disabled\\:opacity-50:disabled{opacity:.5}.disabled\\:brightness-100:disabled{--tw-brightness:brightness(1);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}@media (min-width:640px){.sm\\:right-5{right:20px}.sm\\:my-8{margin-bottom:32px;margin-top:32px}.sm\\:p-0{padding:0}}';
const Ne = async e => {
    let t;
    try {
        const n = "string" == typeof e ? e : e.url;
        t = await fetch(n, {
            method: "string" == typeof e ? "GET" : e.method,
            mode: "cors",
            headers: "string" != typeof e && Me(e.body) ? {
                "Content-Type": "application/json"
            } : void 0,
            body: "string" != typeof e && Me(e.body) ? JSON.stringify(e.body) : void 0
        });
        const o = await t.json();
        if (!t.ok) throw "error" in o ? o.error : o;
        return {
            data: o,
            response: t
        }
    } catch (e) {
        return console.error(e), {
            error: e,
            response: t
        }
    }
}, Me = e => null != e, Oe = e => null == e, Be = e => null == e || "" === e, ze = e => null != e && "" !== e, De = e => e?.startsWith("data:image/svg") || e?.endsWith(".svg"), je = e => {
    e = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, ((e, t, n, o) => t + t + n + n + o + o));
    const t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
    return t ? [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)] : [0, 0, 0]
}, Ue = e => (([e, t, n]) => (299 * e + 587 * t + 114 * n) / 1e3 > 155)(je(e));

function Fe(e) {
    var t, n, o = "";
    if ("string" == typeof e || "number" == typeof e) o += e;
    else if ("object" == typeof e)
        if (Array.isArray(e))
            for (t = 0; t < e.length; t++) e[t] && (n = Fe(e[t])) && (o && (o += " "), o += n);
        else
            for (t in e) e[t] && (o && (o += " "), o += t);
    return o
}

function He() {
    for (var e, t, n = 0, o = ""; n < arguments.length;)(e = arguments[n++]) && (t = Fe(e)) && (o && (o += " "), o += t);
    return o
}
const qe = pe('<svg part="button-icon" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z">'),
    Ge = pe('<img part="button-icon" alt="Bubble button icon">'),
    Ve = pe('<span part="button-icon">'),
    We = pe('<svg part="button-icon" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.601 8.39897C18.269 8.06702 17.7309 8.06702 17.3989 8.39897L12 13.7979L6.60099 8.39897C6.26904 8.06702 5.73086 8.06702 5.39891 8.39897C5.06696 8.73091 5.06696 9.2691 5.39891 9.60105L11.3989 15.601C11.7309 15.933 12.269 15.933 12.601 15.601L18.601 9.60105C18.9329 9.2691 18.9329 8.73091 18.601 8.39897Z">'),
    Ye = pe('<img part="button-icon" alt="Bubble button close icon">'),
    Ke = pe('<button part="button" aria-label="Open chatbot">'),
    Ze = "#0042DA",
    Xe = "#27272A",
    Je = "#fff",
    Qe = e => e.startsWith("http") || e.startsWith("data:image/svg+xml"),
    et = e => (() => {
        const t = Ke();
        return t.$$click = () => e.toggleBot(), t.style.setProperty("z-index", "42424242"), ye(t, V(ne, {
            get when() {
                return Oe(e.customIconSrc)
            },
            keyed: !0,
            get children() {
                const t = qe();
                return k((n => {
                    const o = e.iconColor ?? (Ue(e.backgroundColor ?? Ze) ? Xe : Je),
                        r = He("stroke-2 fill-transparent absolute duration-200 transition w-[60%]", e.isBotOpened ? "scale-0 opacity-0" : "scale-100 opacity-100");
                    return o !== n._v$ && (null != (n._v$ = o) ? t.style.setProperty("stroke", o) : t.style.removeProperty("stroke")), r !== n._v$2 && ge(t, "class", n._v$2 = r), n
                }), {
                    _v$: void 0,
                    _v$2: void 0
                }), t
            }
        }), null), ye(t, V(ne, {
            get when() {
                return T((() => !!e.customIconSrc))() && Qe(e.customIconSrc)
            },
            get children() {
                const t = Ge();
                return k((n => {
                    const o = e.customIconSrc,
                        r = He("duration-200 transition", e.isBotOpened ? "scale-0 opacity-0" : "scale-100 opacity-100", De(e.customIconSrc) ? "w-[60%]" : "w-full h-full", De(e.customIconSrc) ? "" : "object-cover rounded-full");
                    return o !== n._v$3 && ge(t, "src", n._v$3 = o), r !== n._v$4 && fe(t, n._v$4 = r), n
                }), {
                    _v$3: void 0,
                    _v$4: void 0
                }), t
            }
        }), null), ye(t, V(ne, {
            get when() {
                return T((() => !!e.customIconSrc))() && !Qe(e.customIconSrc)
            },
            get children() {
                const t = Ve();
                return t.style.setProperty("font-family", "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"), ye(t, (() => e.customIconSrc)), k((() => fe(t, He("text-4xl duration-200 transition", e.isBotOpened ? "scale-0 opacity-0" : "scale-100 opacity-100")))), t
            }
        }), null), ye(t, V(ne, {
            get when() {
                return Oe(e.customCloseIconSrc)
            },
            get children() {
                const t = We();
                return k((n => {
                    const o = e.iconColor ?? (Ue(e.backgroundColor ?? Ze) ? Xe : Je),
                        r = He("absolute duration-200 transition w-[60%]", e.isBotOpened ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-180 opacity-0");
                    return o !== n._v$5 && (null != (n._v$5 = o) ? t.style.setProperty("fill", o) : t.style.removeProperty("fill")), r !== n._v$6 && ge(t, "class", n._v$6 = r), n
                }), {
                    _v$5: void 0,
                    _v$6: void 0
                }), t
            }
        }), null), ye(t, V(ne, {
            get when() {
                return T((() => !!e.customCloseIconSrc))() && Qe(e.customCloseIconSrc)
            },
            get children() {
                const t = Ye();
                return k((n => {
                    const o = e.customCloseIconSrc,
                        r = He("absolute duration-200 transition", e.isBotOpened ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-180 opacity-0", De(e.customCloseIconSrc) ? "w-[60%]" : "w-full h-full", De(e.customCloseIconSrc) ? "" : "object-cover rounded-full");
                    return o !== n._v$7 && ge(t, "src", n._v$7 = o), r !== n._v$8 && fe(t, n._v$8 = r), n
                }), {
                    _v$7: void 0,
                    _v$8: void 0
                }), t
            }
        }), null), ye(t, V(ne, {
            get when() {
                return T((() => !!e.customCloseIconSrc))() && !Qe(e.customCloseIconSrc)
            },
            get children() {
                const t = Ve();
                return t.style.setProperty("font-family", "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"), ye(t, (() => e.customCloseIconSrc)), k((() => fe(t, He("absolute text-4xl duration-200 transition", e.isBotOpened ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-180 opacity-0")))), t
            }
        }), null), k((n => {
            const o = He("fixed bottom-5 shadow-md  rounded-full hover:scale-110 active:scale-95 transition-transform duration-200 flex justify-center items-center animate-fade-in", "left" === e.placement ? " left-5" : " right-5"),
                r = e.backgroundColor ?? Ze,
                i = e.buttonSize,
                s = e.buttonSize;
            return o !== n._v$9 && fe(t, n._v$9 = o), r !== n._v$10 && (null != (n._v$10 = r) ? t.style.setProperty("background-color", r) : t.style.removeProperty("background-color")), i !== n._v$11 && (null != (n._v$11 = i) ? t.style.setProperty("width", i) : t.style.removeProperty("width")), s !== n._v$12 && (null != (n._v$12 = s) ? t.style.setProperty("height", s) : t.style.removeProperty("height")), n
        }), {
            _v$9: void 0,
            _v$10: void 0,
            _v$11: void 0,
            _v$12: void 0
        }), t
    })();
he(["click"]);
const tt = pe('<div part="preview-message"><p>'),
    nt = pe('<img class="rounded-full w-8 h-8 object-cover" alt="Bot avatar" elementtiming="Bot avatar" fetchpriority="high">'),
    ot = pe('<button part="preview-message-close-button" aria-label="Close"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18">'),
    rt = "#F7F8FF",
    it = "#303235",
    st = e => {
        const [t, n] = _(!1), [o, r] = _({
            x: 0,
            y: 0
        }), i = e => {
            r({
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            })
        }, s = t => {
            const n = t.changedTouches[0].clientX,
                i = t.changedTouches[0].clientY;
            (Math.abs(n - o().x) > 10 || i - o().y > 10) && e.onCloseClick(), r({
                x: 0,
                y: 0
            })
        };
        return (() => {
            const o = tt(),
                r = o.firstChild;
            return o.$$touchend = s, o.$$touchstart = i, o.addEventListener("mouseleave", (() => n(!1))), o.addEventListener("mouseenter", (() => n(!0))), o.$$click = () => e.onClick(), o.style.setProperty("z-index", "42424242"), ye(o, V(at, {
                get isHovered() {
                    return t()
                },
                get previewMessageTheme() {
                    return e.previewMessageTheme
                },
                get onClick() {
                    return e.onCloseClick
                }
            }), r), ye(o, V(ne, {
                get when() {
                    return e.avatarUrl
                },
                keyed: !0,
                children: e => (() => {
                    const t = nt();
                    return ge(t, "src", e), t
                })()
            }), r), ye(r, (() => e.message)), k((t => {
                const n = "fixed max-w-[256px] rounded-md duration-200 flex items-center gap-4 shadow-md animate-fade-in cursor-pointer hover:shadow-lg p-4" + ("left" === e.placement ? " left-5" : " right-5"),
                    r = e.previewMessageTheme?.backgroundColor ?? rt,
                    i = e.previewMessageTheme?.textColor ?? it,
                    s = `calc(${e.buttonSize} + 32px)`;
                return n !== t._v$ && fe(o, t._v$ = n), r !== t._v$2 && (null != (t._v$2 = r) ? o.style.setProperty("background-color", r) : o.style.removeProperty("background-color")), i !== t._v$3 && (null != (t._v$3 = i) ? o.style.setProperty("color", i) : o.style.removeProperty("color")), s !== t._v$4 && (null != (t._v$4 = s) ? o.style.setProperty("bottom", s) : o.style.removeProperty("bottom")), t
            }), {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0,
                _v$4: void 0
            }), o
        })()
    },
    at = e => (() => {
        const t = ot();
        return t.$$click = t => (t.stopPropagation(), e.onClick()), k((n => {
            const o = "absolute -top-2 -right-2 rounded-full w-6 h-6 p-1 hover:brightness-95 active:brightness-90 transition-all border " + (e.isHovered ? "opacity-100" : "opacity-0"),
                r = e.previewMessageTheme?.closeButtonBackgroundColor ?? rt,
                i = e.previewMessageTheme?.closeButtonIconColor ?? it;
            return o !== n._v$5 && fe(t, n._v$5 = o), r !== n._v$6 && (null != (n._v$6 = r) ? t.style.setProperty("background-color", r) : t.style.removeProperty("background-color")), i !== n._v$7 && (null != (n._v$7 = i) ? t.style.setProperty("color", i) : t.style.removeProperty("color")), n
        }), {
            _v$5: void 0,
            _v$6: void 0,
            _v$7: void 0
        }), t
    })();
he(["click", "touchstart", "touchend"]);
const lt = pe('<svg viewBox="0 0 800 800" width="16"><rect width="800" height="800" rx="80" fill="#0042DA"></rect><rect x="650" y="293" width="85.4704" height="384.617" rx="20" transform="rotate(90 650 293)" fill="#FF8E20"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M192.735 378.47C216.337 378.47 235.47 359.337 235.47 335.735C235.47 312.133 216.337 293 192.735 293C169.133 293 150 312.133 150 335.735C150 359.337 169.133 378.47 192.735 378.47Z" fill="#FF8E20"></path><rect x="150" y="506.677" width="85.4704" height="384.617" rx="20" transform="rotate(-90 150 506.677)" fill="white"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M607.265 421.206C583.663 421.206 564.53 440.34 564.53 463.942C564.53 487.544 583.663 506.677 607.265 506.677C630.867 506.677 650 487.544 650 463.942C650 440.34 630.867 421.206 607.265 421.206Z" fill="white">'),
    ct = () => lt(),
    dt = pe('<a href="https://www.typebot.io/?utm_source=litebadge" target="_blank" rel="noopener noreferrer" class="lite-badge" id="lite-badge"><span>Made with Typebot'),
    ut = e => {
        let t, n;
        const o = n => {
            n.forEach((n => {
                n.removedNodes.forEach((n => {
                    "id" in n && t && "lite-badge" == n.id && (console.log("Sorry, you can't remove the brand 😅"), e.botContainer?.append(t))
                }))
            }))
        };
        return C((() => {
            document && e.botContainer && (n = new MutationObserver(o), n.observe(e.botContainer, {
                subtree: !1,
                childList: !0
            }))
        })), E((() => {
            n && n.disconnect()
        })), (() => {
            const e = dt(),
                n = e.firstChild;
            return "function" == typeof t ? me(t, e) : t = e, ye(e, V(ct, {}), n), e
        })()
    },
    pt = (e, t) => "undefined" != typeof window ? window.__ENV ? window.__ENV[e] ?? t : void 0 : "undefined" != typeof process ? process.env[e] ?? t : void 0,
    ht = ({
        ignoreChatApiUrl: e
    } = {
        ignoreChatApiUrl: !1
    }) => {
        const t = pt("NEXT_PUBLIC_CHAT_API_URL"),
            n = pt("NEXT_PUBLIC_USE_EXPERIMENTAL_CHAT_API_ON")?.split(",");
        return e || !t || n && !n.some((e => e === window.location.href)) ? pt("NEXT_PUBLIC_VIEWER_URL")?.split(",")[0] ?? "https://typebot.io" : t
    },
    gt = () => sessionStorage.getItem("typebotPaymentInProgress"),
    ft = () => {
        sessionStorage.removeItem("typebotPaymentInProgress")
    };
class bt extends Error {
    constructor(e, t, n) {
        const o = `${e.status||0===e.status?e.status:""} ${e.statusText||""}`.trim();
        super(`Request failed with ${o?`status code ${o}`:"an unknown error"}`), Object.defineProperty(this, "response", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }), Object.defineProperty(this, "request", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }), Object.defineProperty(this, "options", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }), this.name = "HTTPError", this.response = e, this.request = t, this.options = n
    }
}
class mt extends Error {
    constructor(e) {
        super("Request timed out"), Object.defineProperty(this, "request", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }), this.name = "TimeoutError", this.request = e
    }
}
const yt = e => null !== e && "object" == typeof e,
    vt = (...e) => {
        for (const t of e)
            if ((!yt(t) || Array.isArray(t)) && void 0 !== t) throw new TypeError("The `options` argument must be an object");
        return xt({}, ...e)
    },
    wt = (e = {}, t = {}) => {
        const n = new globalThis.Headers(e),
            o = t instanceof globalThis.Headers,
            r = new globalThis.Headers(t);
        for (const [e, t] of r.entries()) o && "undefined" === t || void 0 === t ? n.delete(e) : n.set(e, t);
        return n
    },
    xt = (...e) => {
        let t = {},
            n = {};
        for (const o of e)
            if (Array.isArray(o)) Array.isArray(t) || (t = []), t = [...t, ...o];
            else if (yt(o)) {
            for (let [e, n] of Object.entries(o)) yt(n) && e in t && (n = xt(t[e], n)), t = {
                ...t,
                [e]: n
            };
            yt(o.headers) && (n = wt(n, o.headers), t.headers = n)
        }
        return t
    },
    _t = (() => {
        let e = !1,
            t = !1;
        const n = "function" == typeof globalThis.ReadableStream,
            o = "function" == typeof globalThis.Request;
        return n && o && (t = new globalThis.Request("https://empty.invalid", {
            body: new globalThis.ReadableStream,
            method: "POST",
            get duplex() {
                return e = !0, "half"
            }
        }).headers.has("Content-Type")), e && !t
    })(),
    kt = "function" == typeof globalThis.AbortController,
    $t = "function" == typeof globalThis.ReadableStream,
    Tt = "function" == typeof globalThis.FormData,
    St = ["get", "post", "put", "patch", "head", "delete"],
    Ct = {
        json: "application/json",
        text: "text/*",
        formData: "multipart/form-data",
        arrayBuffer: "*/*",
        blob: "*/*"
    },
    Et = 2147483647,
    At = Symbol("stop"),
    It = {
        json: !0,
        parseJson: !0,
        searchParams: !0,
        prefixUrl: !0,
        retry: !0,
        timeout: !0,
        hooks: !0,
        throwHttpErrors: !0,
        onDownloadProgress: !0,
        fetch: !0
    },
    Pt = {
        method: !0,
        headers: !0,
        body: !0,
        mode: !0,
        credentials: !0,
        cache: !0,
        redirect: !0,
        referrer: !0,
        referrerPolicy: !0,
        integrity: !0,
        keepalive: !0,
        signal: !0,
        window: !0,
        dispatcher: !0,
        duplex: !0
    },
    Rt = e => St.includes(e) ? e.toUpperCase() : e,
    Lt = [413, 429, 503],
    Nt = {
        limit: 2,
        methods: ["get", "put", "head", "delete", "options", "trace"],
        statusCodes: [408, 413, 429, 500, 502, 503, 504],
        afterStatusCodes: Lt,
        maxRetryAfter: Number.POSITIVE_INFINITY,
        backoffLimit: Number.POSITIVE_INFINITY,
        delay: e => .3 * 2 ** (e - 1) * 1e3
    },
    Mt = (e = {}) => {
        if ("number" == typeof e) return {
            ...Nt,
            limit: e
        };
        if (e.methods && !Array.isArray(e.methods)) throw new Error("retry.methods must be an array");
        if (e.statusCodes && !Array.isArray(e.statusCodes)) throw new Error("retry.statusCodes must be an array");
        return {
            ...Nt,
            ...e,
            afterStatusCodes: Lt
        }
    };
class Ot {
    static create(e, t) {
        const n = new Ot(e, t),
            o = async () => {
                if ("number" == typeof n._options.timeout && n._options.timeout > Et) throw new RangeError("The `timeout` option cannot be greater than 2147483647");
                await Promise.resolve();
                let e = await n._fetch();
                for (const t of n._options.hooks.afterResponse) {
                    const o = await t(n.request, n._options, n._decorateResponse(e.clone()));
                    o instanceof globalThis.Response && (e = o)
                }
                if (n._decorateResponse(e), !e.ok && n._options.throwHttpErrors) {
                    let t = new bt(e, n.request, n._options);
                    for (const e of n._options.hooks.beforeError) t = await e(t);
                    throw t
                }
                if (n._options.onDownloadProgress) {
                    if ("function" != typeof n._options.onDownloadProgress) throw new TypeError("The `onDownloadProgress` option must be a function");
                    if (!$t) throw new Error("Streams are not supported in your environment. `ReadableStream` is missing.");
                    return n._stream(e.clone(), n._options.onDownloadProgress)
                }
                return e
            }, r = n._options.retry.methods.includes(n.request.method.toLowerCase()) ? n._retry(o) : o();
        for (const [e, o] of Object.entries(Ct)) r[e] = async () => {
            n.request.headers.set("accept", n.request.headers.get("accept") || o);
            const i = (await r).clone();
            if ("json" === e) {
                if (204 === i.status) return "";
                if (0 === (await i.clone().arrayBuffer()).byteLength) return "";
                if (t.parseJson) return t.parseJson(await i.text())
            }
            return i[e]()
        };
        return r
    }
    constructor(e, t = {}) {
        if (Object.defineProperty(this, "request", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "abortController", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "_retryCount", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: 0
            }), Object.defineProperty(this, "_input", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), Object.defineProperty(this, "_options", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }), this._input = e, this._options = {
                credentials: this._input.credentials || "same-origin",
                ...t,
                headers: wt(this._input.headers, t.headers),
                hooks: xt({
                    beforeRequest: [],
                    beforeRetry: [],
                    beforeError: [],
                    afterResponse: []
                }, t.hooks),
                method: Rt(t.method ?? this._input.method),
                prefixUrl: String(t.prefixUrl || ""),
                retry: Mt(t.retry),
                throwHttpErrors: !1 !== t.throwHttpErrors,
                timeout: t.timeout ?? 1e4,
                fetch: t.fetch ?? globalThis.fetch.bind(globalThis)
            }, "string" != typeof this._input && !(this._input instanceof URL || this._input instanceof globalThis.Request)) throw new TypeError("`input` must be a string, URL, or Request");
        if (this._options.prefixUrl && "string" == typeof this._input) {
            if (this._input.startsWith("/")) throw new Error("`input` must not begin with a slash when using `prefixUrl`");
            this._options.prefixUrl.endsWith("/") || (this._options.prefixUrl += "/"), this._input = this._options.prefixUrl + this._input
        }
        if (kt) {
            if (this.abortController = new globalThis.AbortController, this._options.signal) {
                const e = this._options.signal;
                this._options.signal.addEventListener("abort", (() => {
                    this.abortController.abort(e.reason)
                }))
            }
            this._options.signal = this.abortController.signal
        }
        if (_t && (this._options.duplex = "half"), this.request = new globalThis.Request(this._input, this._options), this._options.searchParams) {
            const e = "?" + ("string" == typeof this._options.searchParams ? this._options.searchParams.replace(/^\?/, "") : new URLSearchParams(this._options.searchParams).toString()),
                t = this.request.url.replace(/(?:\?.*?)?(?=#|$)/, e);
            !(Tt && this._options.body instanceof globalThis.FormData || this._options.body instanceof URLSearchParams) || this._options.headers && this._options.headers["content-type"] || this.request.headers.delete("content-type"), this.request = new globalThis.Request(new globalThis.Request(t, {
                ...this.request
            }), this._options)
        }
        void 0 !== this._options.json && (this._options.body = JSON.stringify(this._options.json), this.request.headers.set("content-type", this._options.headers.get("content-type") ?? "application/json"), this.request = new globalThis.Request(this.request, {
            body: this._options.body
        }))
    }
    _calculateRetryDelay(e) {
        if (this._retryCount++, this._retryCount < this._options.retry.limit && !(e instanceof mt)) {
            if (e instanceof bt) {
                if (!this._options.retry.statusCodes.includes(e.response.status)) return 0;
                const t = e.response.headers.get("Retry-After");
                if (t && this._options.retry.afterStatusCodes.includes(e.response.status)) {
                    let e = Number(t);
                    return Number.isNaN(e) ? e = Date.parse(t) - Date.now() : e *= 1e3, void 0 !== this._options.retry.maxRetryAfter && e > this._options.retry.maxRetryAfter ? 0 : e
                }
                if (413 === e.response.status) return 0
            }
            const t = this._options.retry.delay(this._retryCount);
            return Math.min(this._options.retry.backoffLimit, t)
        }
        return 0
    }
    _decorateResponse(e) {
        return this._options.parseJson && (e.json = async () => this._options.parseJson(await e.text())), e
    }
    async _retry(e) {
        try {
            return await e()
        } catch (t) {
            const n = Math.min(this._calculateRetryDelay(t), Et);
            if (0 !== n && this._retryCount > 0) {
                await async function(e, {
                    signal: t
                }) {
                    return new Promise(((n, o) => {
                        function r() {
                            clearTimeout(i), o(t.reason)
                        }
                        t && (t.throwIfAborted(), t.addEventListener("abort", r, {
                            once: !0
                        }));
                        const i = setTimeout((() => {
                            t?.removeEventListener("abort", r), n()
                        }), e)
                    }))
                }(n, {
                    signal: this._options.signal
                });
                for (const e of this._options.hooks.beforeRetry) {
                    if (await e({
                            request: this.request,
                            options: this._options,
                            error: t,
                            retryCount: this._retryCount
                        }) === At) return
                }
                return this._retry(e)
            }
            throw t
        }
    }
    async _fetch() {
        for (const e of this._options.hooks.beforeRequest) {
            const t = await e(this.request, this._options);
            if (t instanceof Request) {
                this.request = t;
                break
            }
            if (t instanceof Response) return t
        }
        const e = ((e, t) => {
            const n = {};
            for (const o in t) o in Pt || o in It || o in e || (n[o] = t[o]);
            return n
        })(this.request, this._options);
        return !1 === this._options.timeout ? this._options.fetch(this.request.clone(), e) : async function(e, t, n, o) {
            return new Promise(((r, i) => {
                const s = setTimeout((() => {
                    n && n.abort(), i(new mt(e))
                }), o.timeout);
                o.fetch(e, t).then(r).catch(i).then((() => {
                    clearTimeout(s)
                }))
            }))
        }(this.request.clone(), e, this.abortController, this._options)
    }
    _stream(e, t) {
        const n = Number(e.headers.get("content-length")) || 0;
        let o = 0;
        return 204 === e.status ? (t && t({
            percent: 1,
            totalBytes: n,
            transferredBytes: o
        }, new Uint8Array), new globalThis.Response(null, {
            status: e.status,
            statusText: e.statusText,
            headers: e.headers
        })) : new globalThis.Response(new globalThis.ReadableStream({
            async start(r) {
                const i = e.body.getReader();
                t && t({
                    percent: 0,
                    transferredBytes: 0,
                    totalBytes: n
                }, new Uint8Array), await async function e() {
                    const {
                        done: s,
                        value: a
                    } = await i.read();
                    if (s) r.close();
                    else {
                        if (t) {
                            o += a.byteLength;
                            t({
                                percent: 0 === n ? 0 : o / n,
                                transferredBytes: o,
                                totalBytes: n
                            }, a)
                        }
                        r.enqueue(a), await e()
                    }
                }()
            }
        }), {
            status: e.status,
            statusText: e.statusText,
            headers: e.headers
        })
    }
}
/*! MIT License © Sindre Sorhus */
const Bt = e => {
    const t = (t, n) => Ot.create(t, vt(e, n));
    for (const n of St) t[n] = (t, o) => Ot.create(t, vt(e, o, {
        method: n
    }));
    return t.create = e => Bt(vt(e)), t.extend = t => Bt(vt(e, t)), t.stop = At, t
};
var zt = Bt();
const [Dt, jt] = _(), Ut = pe('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="19px" color="white"><path d="M476.59 227.05l-.16-.07L49.35 49.84A23.56 23.56 0 0027.14 52 24.65 24.65 0 0016 72.59v113.29a24 24 0 0019.52 23.57l232.93 43.07a4 4 0 010 7.86L35.53 303.45A24 24 0 0016 327v113.31A23.57 23.57 0 0026.59 460a23.94 23.94 0 0013.22 4 24.55 24.55 0 009.52-1.93L476.4 285.94l.19-.09a32 32 0 000-58.8z">'), Ft = e => (() => {
    const t = Ut();
    return be(t, e, !0, !0), t
})(), Ht = pe('<svg><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">'), qt = e => (() => {
    const t = Ht();
    return be(t, X(e, {
        get class() {
            return "animate-spin h-6 w-6 " + e.class
        },
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        "data-testid": "loading-spinner"
    }), !0, !0), t
})(), Gt = pe("<button>"), Vt = e => {
    const t = I((() => e.children)),
        [n, o] = J(e, ["disabled", "class"]);
    return (() => {
        const r = Gt();
        return be(r, X(o, {
            get disabled() {
                return e.isDisabled || e.isLoading
            },
            get class() {
                return "py-2 px-4 font-semibold focus:outline-none filter hover:brightness-90 active:brightness-75 disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 flex justify-center" + ("secondary" === e.variant ? " secondary-button" : " typebot-button") + " " + n.class
            }
        }), !1, !0), ye(r, V(ne, {
            get when() {
                return !e.isLoading
            },
            get fallback() {
                return V(qt, {})
            },
            get children() {
                return t()
            }
        })), r
    })()
}, Wt = e => {
    const [t, n] = J(e, ["disableIcon"]);
    return V(Vt, X({
        type: "submit"
    }, n, {
        get children() {
            return T((() => !!(Dt() && !t.disableIcon || "string" == typeof e.children && Be(e.children))))() ? V(Ft, {
                get class() {
                    return "send-icon flex " + (t.disableIcon ? "hidden" : "")
                }
            }) : e.children
        }
    }))
}, Yt = pe('<div class="flex items-center gap-1"><div class="w-2 h-2 rounded-full bubble1"></div><div class="w-2 h-2 rounded-full bubble2"></div><div class="w-2 h-2 rounded-full bubble3">'), Kt = () => Yt(), Zt = pe('<input class="focus:outline-none bg-transparent px-4 py-4 flex-1 w-full text-input" type="text">'), Xt = e => {
    const [t, n] = J(e, ["ref", "onInput"]);
    return (() => {
        const o = Zt();
        o.$$input = e => t.onInput(e.currentTarget.value);
        const r = e.ref;
        return "function" == typeof r ? me(r, o) : e.ref = o, o.style.setProperty("font-size", "16px"), be(o, n, !1, !1), o
    })()
};
he(["input"]);
const Jt = pe('<textarea class="focus:outline-none bg-transparent px-4 py-4 flex-1 w-full text-input" rows="6" data-testid="textarea" required>'),
    Qt = e => {
        const [t, n] = J(e, ["ref", "onInput"]);
        return (() => {
            const e = Jt();
            e.$$input = e => t.onInput(e.currentTarget.value);
            const o = t.ref;
            return "function" == typeof o ? me(o, e) : t.ref = e, e.style.setProperty("font-size", "16px"), be(e, X({
                get autofocus() {
                    return !Dt()
                }
            }, n), !1, !1), e
        })()
    };
he(["input"]);
const en = !0,
    tn = pe('<div><div class="flex w-full items-center"><div class="flex relative z-10 items-start typebot-host-bubble max-w-full"><div class="flex items-center absolute px-4 py-2 bubble-typing z-10 "></div><audio controls>');
let nn;
const on = e => {
        let t, n, o = !1;
        const [r, i] = _(!!e.onTransitionEnd);
        return C((() => {
            nn = setTimeout((() => {
                o || (o = !0, i(!1), setTimeout((() => e.onTransitionEnd?.(t?.offsetTop)), 400))
            }), 100)
        })), E((() => {
            nn && clearTimeout(nn)
        })), (() => {
            const o = tn(),
                i = o.firstChild.firstChild.firstChild,
                s = i.nextSibling;
            "function" == typeof t ? me(t, o) : t = o, ye(i, (() => {
                const e = T((() => !!r()));
                return () => e() && V(Kt, {})
            })());
            return "function" == typeof n ? me(n, s) : n = s, k((t => {
                const n = He("flex flex-col", e.onTransitionEnd ? "animate-fade-in" : void 0),
                    a = r() ? "64px" : "100%",
                    l = r() ? "32px" : "100%",
                    c = e.content?.url,
                    d = !!e.onTransitionEnd && (e.content?.isAutoplayEnabled ?? en),
                    u = "z-10 text-fade-in " + (r() ? "opacity-0" : "opacity-100 m-2"),
                    p = r() ? Dt() ? "32px" : "36px" : "revert";
                return n !== t._v$ && fe(o, t._v$ = n), a !== t._v$2 && (null != (t._v$2 = a) ? i.style.setProperty("width", a) : i.style.removeProperty("width")), l !== t._v$3 && (null != (t._v$3 = l) ? i.style.setProperty("height", l) : i.style.removeProperty("height")), c !== t._v$4 && ge(s, "src", t._v$4 = c), d !== t._v$5 && (s.autoplay = t._v$5 = d), u !== t._v$6 && fe(s, t._v$6 = u), p !== t._v$7 && (null != (t._v$7 = p) ? s.style.setProperty("height", p) : s.style.removeProperty("height")), t
            }), {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0,
                _v$4: void 0,
                _v$5: void 0,
                _v$6: void 0,
                _v$7: void 0
            }), o
        })()
    },
    rn = 400,
    sn = pe('<div><div class="flex w-full items-center"><div class="flex relative z-10 items-start typebot-host-bubble w-full max-w-full"><div class="flex items-center absolute px-4 py-2 bubble-typing z-10 "></div><div><iframe id="embed-bubble-content" class="w-full h-full ">');
let an;
const ln = e => {
        let t;
        const [n, o] = _(!!e.onTransitionEnd);
        return C((() => {
            an = setTimeout((() => {
                o(!1), setTimeout((() => {
                    e.onTransitionEnd?.(t?.offsetTop)
                }), 400)
            }), 2e3)
        })), E((() => {
            an && clearTimeout(an)
        })), (() => {
            const o = sn(),
                r = o.firstChild.firstChild.firstChild,
                i = r.nextSibling,
                s = i.firstChild;
            return "function" == typeof t ? me(t, o) : t = o, ye(r, (() => {
                const e = T((() => !!n()));
                return () => e() && V(Kt, {})
            })()), k((t => {
                const a = He("flex flex-col w-full", e.onTransitionEnd ? "animate-fade-in" : void 0),
                    l = n() ? "64px" : "100%",
                    c = n() ? "32px" : "100%",
                    d = He("p-4 z-20 text-fade-in w-full", n() ? "opacity-0" : "opacity-100 p-4"),
                    u = n() ? Dt() ? "32px" : "36px" : `${e.content?.height??rn}px`,
                    p = e.content?.url;
                return a !== t._v$ && fe(o, t._v$ = a), l !== t._v$2 && (null != (t._v$2 = l) ? r.style.setProperty("width", l) : r.style.removeProperty("width")), c !== t._v$3 && (null != (t._v$3 = c) ? r.style.setProperty("height", c) : r.style.removeProperty("height")), d !== t._v$4 && fe(i, t._v$4 = d), u !== t._v$5 && (null != (t._v$5 = u) ? i.style.setProperty("height", u) : i.style.removeProperty("height")), p !== t._v$6 && ge(s, "src", t._v$6 = p), t
            }), {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0,
                _v$4: void 0,
                _v$5: void 0,
                _v$6: void 0
            }), o
        })()
    },
    cn = Object.getPrototypeOf((async function() {})).constructor,
    dn = async ({
        content: e,
        args: t
    }) => {
        try {
            const n = cn(...t.map((e => e.id)), un(e));
            await n(...t.map((e => e.value)))
        } catch (e) {
            console.warn("Script threw an error:", e)
        }
    }, un = e => e.replace(/<script>/g, "").replace(/<\/script>/g, ""), pn = async ({
        args: e,
        content: t
    }) => {
        try {
            const n = cn(...Object.keys(e), t);
            await n(...Object.keys(e).map((t => e[t])))
        } catch (e) {
            console.warn("Script threw an error:", e)
        }
    }, [hn, gn] = _("100%"), fn = pe('<div><div class="flex w-full items-center"><div class="flex relative z-10 items-start typebot-host-bubble w-full"><div class="flex items-center absolute px-4 py-2 bubble-typing z-10 "></div><div><div class="w-full overflow-y-auto">');
let bn;
const mn = e => {
        let t;
        const [n, o] = _(!!e.onTransitionEnd);
        let r;
        return C((() => {
            pn({
                args: {
                    ...e.content.initFunction.args,
                    typebotElement: r
                },
                content: e.content.initFunction.content
            }), e.content.waitForEventFunction && pn({
                args: {
                    ...e.content.waitForEventFunction.args,
                    continueFlow: e.onCompleted
                },
                content: e.content.waitForEventFunction.content
            }), bn = setTimeout((() => {
                o(!1), setTimeout((() => e.onTransitionEnd?.(t?.offsetTop)), 400)
            }), 2e3)
        })), E((() => {
            bn && clearTimeout(bn)
        })), (() => {
            const o = fn(),
                i = o.firstChild.firstChild,
                s = i.firstChild,
                a = s.nextSibling,
                l = a.firstChild;
            "function" == typeof t ? me(t, o) : t = o, ye(s, (() => {
                const e = T((() => !!n()));
                return () => e() && V(Kt, {})
            })());
            return "function" == typeof r ? me(r, l) : r = l, k((t => {
                const r = He("flex flex-col w-full", e.onTransitionEnd ? "animate-fade-in" : void 0),
                    c = e.content.maxBubbleWidth ? `${e.content.maxBubbleWidth}px` : "100%",
                    d = n() ? "64px" : "100%",
                    u = n() ? "32px" : "100%",
                    p = He("p-2 z-20 text-fade-in w-full", n() ? "opacity-0" : "opacity-100"),
                    h = n() ? Dt() ? "32px" : "36px" : void 0,
                    g = `calc(${hn()} - 100px)`;
                return r !== t._v$ && fe(o, t._v$ = r), c !== t._v$2 && (null != (t._v$2 = c) ? i.style.setProperty("max-width", c) : i.style.removeProperty("max-width")), d !== t._v$3 && (null != (t._v$3 = d) ? s.style.setProperty("width", d) : s.style.removeProperty("width")), u !== t._v$4 && (null != (t._v$4 = u) ? s.style.setProperty("height", u) : s.style.removeProperty("height")), p !== t._v$5 && fe(a, t._v$5 = p), h !== t._v$6 && (null != (t._v$6 = h) ? a.style.setProperty("height", h) : a.style.removeProperty("height")), g !== t._v$7 && (null != (t._v$7 = g) ? l.style.setProperty("max-height", g) : l.style.removeProperty("max-height")), t
            }), {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0,
                _v$4: void 0,
                _v$5: void 0,
                _v$6: void 0,
                _v$7: void 0
            }), o
        })()
    },
    yn = {
        alt: "Bubble image"
    },
    vn = pe('<img elementtiming="Bubble image" fetchpriority="high">'),
    wn = pe('<div><div class="flex w-full items-center"><div class="flex relative z-10 items-start typebot-host-bubble max-w-full"><div class="flex items-center absolute px-4 py-2 bubble-typing z-10 ">'),
    xn = pe('<a target="_blank">'),
    _n = pe("<figure>");
let kn;
const $n = e => {
        let t, n;
        const [o, r] = _(!!e.onTransitionEnd), i = () => {
            o() && (r(!1), setTimeout((() => {
                e.onTransitionEnd?.(t?.offsetTop)
            }), 400))
        };
        C((() => {
            n && (kn = setTimeout(i, 5e3), n.onload = () => {
                clearTimeout(kn), i()
            })
        })), E((() => {
            kn && clearTimeout(kn)
        }));
        const s = (() => {
            const t = vn();
            return "function" == typeof n ? me(n, t) : n = t, t.style.setProperty("max-height", "512px"), k((n => {
                const r = e.content?.url,
                    i = e.content?.clickLink?.alt ?? yn.alt,
                    s = He("w-full", o() ? "opacity-0" : "opacity-100", e.onTransitionEnd ? "text-fade-in" : void 0),
                    a = o() ? "32px" : "auto";
                return r !== n._v$ && ge(t, "src", n._v$ = r), i !== n._v$2 && ge(t, "alt", n._v$2 = i), s !== n._v$3 && fe(t, n._v$3 = s), a !== n._v$4 && (null != (n._v$4 = a) ? t.style.setProperty("height", a) : t.style.removeProperty("height")), n
            }), {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0,
                _v$4: void 0
            }), t
        })();
        return (() => {
            const n = wn(),
                r = n.firstChild.firstChild,
                i = r.firstChild;
            return "function" == typeof t ? me(t, n) : t = n, ye(i, (() => {
                const e = T((() => !!o()));
                return () => e() ? V(Kt, {}) : null
            })()), ye(r, (() => {
                const t = T((() => !!e.content?.clickLink));
                return () => t() ? (() => {
                    const t = xn();
                    return ye(t, s), k((n => {
                        const r = e.content.clickLink.url,
                            i = He("z-10", o() ? "h-8" : "p-4");
                        return r !== n._v$8 && ge(t, "href", n._v$8 = r), i !== n._v$9 && fe(t, n._v$9 = i), n
                    }), {
                        _v$8: void 0,
                        _v$9: void 0
                    }), t
                })() : (() => {
                    const e = _n();
                    return ye(e, s), k((() => fe(e, He("z-10", !o() && "p-4", o() ? Dt() ? "h-8" : "h-9" : "")))), e
                })()
            })(), null), k((t => {
                const r = He("flex flex-col", e.onTransitionEnd ? "animate-fade-in" : void 0),
                    s = o() ? "64px" : "100%",
                    a = o() ? "32px" : "100%";
                return r !== t._v$5 && fe(n, t._v$5 = r), s !== t._v$6 && (null != (t._v$6 = s) ? i.style.setProperty("width", s) : i.style.removeProperty("width")), a !== t._v$7 && (null != (t._v$7 = a) ? i.style.setProperty("height", a) : i.style.removeProperty("height")), t
            }), {
                _v$5: void 0,
                _v$6: void 0,
                _v$7: void 0
            }), n
        })()
    },
    Tn = pe("<br>"),
    Sn = pe("<span>"),
    Cn = e => (() => {
        const t = Sn();
        return ye(t, (() => e.text), null), ye(t, V(ne, {
            get when() {
                return T((() => !!e.isUniqueChild))() && Be(e.text)
            },
            get children() {
                return Tn()
            }
        }), null), k((() => fe(t, ((e, t, n) => {
            let o = "";
            return e && (o += "slate-bold"), t && (o += " slate-italic"), n && (o += " slate-underline"), o
        })(e.bold, e.italic, e.underline)))), t
    })(),
    En = pe('<a target="_blank" rel="noopener noreferrer">'),
    An = pe("<ol>"),
    In = pe("<ul>"),
    Pn = pe("<li>"),
    Rn = pe("<span>"),
    Ln = pe("<div>"),
    Nn = e => V(oe, {
        get children() {
            return [V(re, {
                get when() {
                    return Me(e.element.text)
                },
                get children() {
                    return V(Cn, X((() => e.element), {
                        get isUniqueChild() {
                            return e.isUniqueChild ?? !1
                        }
                    }))
                }
            }), V(re, {
                when: !0,
                get children() {
                    return V(oe, {
                        get children() {
                            return [V(re, {
                                get when() {
                                    return "a" === e.element.type
                                },
                                get children() {
                                    const t = En();
                                    return ye(t, V(te, {
                                        get each() {
                                            return e.element.children
                                        },
                                        children: t => V(Nn, {
                                            element: t,
                                            get isUniqueChild() {
                                                return 1 === e.element.children?.length
                                            }
                                        })
                                    })), k((() => ge(t, "href", e.element.url))), t
                                }
                            }), V(re, {
                                get when() {
                                    return "ol" === e.element.type
                                },
                                get children() {
                                    const t = An();
                                    return ye(t, V(te, {
                                        get each() {
                                            return e.element.children
                                        },
                                        children: t => V(Nn, {
                                            element: t,
                                            get isUniqueChild() {
                                                return 1 === e.element.children?.length
                                            }
                                        })
                                    })), t
                                }
                            }), V(re, {
                                get when() {
                                    return "ul" === e.element.type
                                },
                                get children() {
                                    const t = In();
                                    return ye(t, V(te, {
                                        get each() {
                                            return e.element.children
                                        },
                                        children: t => V(Nn, {
                                            element: t,
                                            get isUniqueChild() {
                                                return 1 === e.element.children?.length
                                            }
                                        })
                                    })), t
                                }
                            }), V(re, {
                                get when() {
                                    return "li" === e.element.type
                                },
                                get children() {
                                    const t = Pn();
                                    return ye(t, V(te, {
                                        get each() {
                                            return e.element.children
                                        },
                                        children: t => V(Nn, {
                                            element: t,
                                            get isUniqueChild() {
                                                return 1 === e.element.children?.length
                                            }
                                        })
                                    })), t
                                }
                            }), V(re, {
                                when: !0,
                                get children() {
                                    return V(Mn, {
                                        get element() {
                                            return e.element
                                        },
                                        get insideInlineVariable() {
                                            return e.insideInlineVariable ?? !1
                                        },
                                        get children() {
                                            return V(te, {
                                                get each() {
                                                    return e.element.children
                                                },
                                                children: t => V(Nn, {
                                                    element: t,
                                                    get isUniqueChild() {
                                                        return 1 === e.element.children?.length
                                                    },
                                                    get insideInlineVariable() {
                                                        return "inline-variable" === e.element.type
                                                    }
                                                })
                                            })
                                        }
                                    })
                                }
                            })]
                        }
                    })
                }
            })]
        }
    }),
    Mn = e => V(oe, {
        get children() {
            return [V(re, {
                get when() {
                    return "inline-variable" === e.element.type || e.insideInlineVariable
                },
                get children() {
                    const t = Rn();
                    return ye(t, (() => e.children)), k((() => ge(t, "data-element-type", e.element.type))), t
                }
            }), V(re, {
                when: !0,
                get children() {
                    const t = Ln();
                    return ye(t, (() => e.children)), k((() => ge(t, "data-element-type", e.element.type))), t
                }
            })]
        }
    }),
    On = e => e.map((e => e.text ?? On(e.children))).join(""),
    Bn = {
        isInputPrefillEnabled: !1,
        isHideQueryParamsEnabled: !0,
        isNewResultOnRefreshEnabled: !0,
        rememberUser: {
            isEnabled: !1,
            storage: "session"
        },
        isBrandingEnabled: !1,
        isTypingEmulationEnabled: !0
    },
    zn = {
        enabled: !0,
        speed: 400,
        maxDelay: 3,
        delayBetweenBubbles: 0,
        isDisabledOnFirstMessage: !0
    },
    Dn = pe('<div><div class="flex w-full items-center"><div class="flex relative items-start typebot-host-bubble max-w-full"><div class="flex items-center absolute px-4 py-2 bubble-typing " data-testid="host-bubble"></div><div>');
let jn;
const Un = e => {
    let t;
    const [n, o] = _(!!e.onTransitionEnd), r = () => {
        n() && (o(!1), setTimeout((() => {
            e.onTransitionEnd?.(t?.offsetTop)
        }), 400))
    };
    return C((() => {
        if (!n) return;
        const t = e.content?.richText ? On(e.content.richText) : "",
            o = !1 === e.typingEmulation?.enabled || e.isTypingSkipped ? 0 : (({
                bubbleContent: e,
                typingSettings: t
            }) => {
                let n = e.match(/(\w+)/g)?.length ?? 0;
                0 === n && (n = e.length);
                const {
                    enabled: o,
                    speed: r,
                    maxDelay: i
                } = {
                    enabled: t?.enabled ?? zn.enabled,
                    speed: t?.speed ?? zn.speed,
                    maxDelay: t?.maxDelay ?? zn.maxDelay
                };
                let s = o ? n / r * 6e4 : 0;
                return s > 1e3 * i && (s = 1e3 * i), s
            })({
                bubbleContent: t,
                typingSettings: e.typingEmulation
            });
        jn = setTimeout(r, o)
    })), E((() => {
        jn && clearTimeout(jn)
    })), (() => {
        const o = Dn(),
            r = o.firstChild.firstChild.firstChild,
            i = r.nextSibling;
        return "function" == typeof t ? me(t, o) : t = o, ye(r, (() => {
            const e = T((() => !!n()));
            return () => e() && V(Kt, {})
        })()), ye(i, V(te, {
            get each() {
                return e.content?.richText
            },
            children: e => V(Nn, {
                element: e
            })
        })), k((t => {
            const s = He("flex flex-col", e.onTransitionEnd ? "animate-fade-in" : void 0),
                a = n() ? "64px" : "100%",
                l = n() ? "32px" : "100%",
                c = He("overflow-hidden text-fade-in mx-4 my-2 whitespace-pre-wrap slate-html-container relative text-ellipsis", n() ? "opacity-0" : "opacity-100"),
                d = n() ? Dt() ? "16px" : "20px" : "100%";
            return s !== t._v$ && fe(o, t._v$ = s), a !== t._v$2 && (null != (t._v$2 = a) ? r.style.setProperty("width", a) : r.style.removeProperty("width")), l !== t._v$3 && (null != (t._v$3 = l) ? r.style.setProperty("height", l) : r.style.removeProperty("height")), c !== t._v$4 && fe(i, t._v$4 = c), d !== t._v$5 && (null != (t._v$5 = d) ? i.style.setProperty("height", d) : i.style.removeProperty("height")), t
        }), {
            _v$: void 0,
            _v$2: void 0,
            _v$3: void 0,
            _v$4: void 0,
            _v$5: void 0
        }), o
    })()
};
let Fn = function(e) {
    return e.URL = "url", e.YOUTUBE = "youtube", e.VIMEO = "vimeo", e.TIKTOK = "tiktok", e.GUMLET = "gumlet", e
}({});
const Hn = [Fn.YOUTUBE, Fn.VIMEO, Fn.TIKTOK, Fn.GUMLET],
    qn = 400,
    Gn = "100%",
    Vn = {
        [Fn.VIMEO]: "https://player.vimeo.com/video",
        [Fn.YOUTUBE]: "https://www.youtube.com/embed",
        [Fn.TIKTOK]: "https://www.tiktok.com/embed/v2",
        [Fn.GUMLET]: "https://play.gumlet.io/embed"
    },
    Wn = pe("<video controls>"),
    Yn = pe('<div><iframe class="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>'),
    Kn = pe('<div><div class="flex w-full items-center"><div class="flex relative z-10 items-start typebot-host-bubble overflow-hidden w-full max-w-full"><div class="flex items-center absolute px-4 py-2 bubble-typing z-10 ">');
let Zn;
const Xn = e => {
    let t;
    const [n, o] = _(!!e.onTransitionEnd);
    return C((() => {
        const r = e.content?.type && Hn.includes(e.content?.type) ? 2e3 : 100;
        Zn = setTimeout((() => {
            n() && (o(!1), setTimeout((() => {
                e.onTransitionEnd?.(t?.offsetTop)
            }), 400))
        }), r)
    })), E((() => {
        Zn && clearTimeout(Zn)
    })), (() => {
        const o = Kn(),
            r = o.firstChild.firstChild,
            i = r.firstChild;
        return "function" == typeof t ? me(t, o) : t = o, ye(i, (() => {
            const e = T((() => !!n()));
            return () => e() && V(Kt, {})
        })()), ye(r, V(oe, {
            get children() {
                return [V(re, {
                    get when() {
                        return e.content?.type && e.content.type === Fn.URL
                    },
                    get children() {
                        const t = Wn();
                        return k((o => {
                            const r = !e.onTransitionEnd,
                                i = e.content?.url,
                                s = "p-4 focus:outline-none w-full z-10 text-fade-in rounded-md " + (n() ? "opacity-0" : "opacity-100"),
                                a = n() ? Dt() ? "32px" : "36px" : "auto",
                                l = e.content?.aspectRatio,
                                c = e.content?.maxWidth ?? Gn;
                            return r !== o._v$ && (t.autoplay = o._v$ = r), i !== o._v$2 && ge(t, "src", o._v$2 = i), s !== o._v$3 && fe(t, o._v$3 = s), a !== o._v$4 && (null != (o._v$4 = a) ? t.style.setProperty("height", a) : t.style.removeProperty("height")), l !== o._v$5 && (null != (o._v$5 = l) ? t.style.setProperty("aspect-ratio", l) : t.style.removeProperty("aspect-ratio")), c !== o._v$6 && (null != (o._v$6 = c) ? t.style.setProperty("max-width", c) : t.style.removeProperty("max-width")), o
                        }), {
                            _v$: void 0,
                            _v$2: void 0,
                            _v$3: void 0,
                            _v$4: void 0,
                            _v$5: void 0,
                            _v$6: void 0
                        }), t
                    }
                }), V(re, {
                    get when() {
                        return T((() => !!e.content?.type))() && Hn.includes(e.content.type)
                    },
                    get children() {
                        const t = Yn(),
                            o = t.firstChild;
                        return k((r => {
                            const i = He("p-4 z-10 text-fade-in w-full", n() ? "opacity-0" : "opacity-100 p-4"),
                                s = n() ? Dt() ? "32px" : "36px" : e.content?.aspectRatio ? void 0 : `${e.content?.height??qn}px`,
                                a = e.content?.aspectRatio,
                                l = e.content?.maxWidth ?? Gn,
                                c = `${Vn[e.content?.type]}/${e.content?.id}`;
                            return i !== r._v$7 && fe(t, r._v$7 = i), s !== r._v$8 && (null != (r._v$8 = s) ? t.style.setProperty("height", s) : t.style.removeProperty("height")), a !== r._v$9 && (null != (r._v$9 = a) ? t.style.setProperty("aspect-ratio", a) : t.style.removeProperty("aspect-ratio")), l !== r._v$10 && (null != (r._v$10 = l) ? t.style.setProperty("max-width", l) : t.style.removeProperty("max-width")), c !== r._v$11 && ge(o, "src", r._v$11 = c), r
                        }), {
                            _v$7: void 0,
                            _v$8: void 0,
                            _v$9: void 0,
                            _v$10: void 0,
                            _v$11: void 0
                        }), t
                    }
                })]
            }
        }), null), k((t => {
            const r = He("flex flex-col w-full", e.onTransitionEnd ? "animate-fade-in" : void 0),
                s = n() ? "64px" : "100%",
                a = n() ? "32px" : "100%",
                l = e.content?.maxWidth ?? Gn;
            return r !== t._v$12 && fe(o, t._v$12 = r), s !== t._v$13 && (null != (t._v$13 = s) ? i.style.setProperty("width", s) : i.style.removeProperty("width")), a !== t._v$14 && (null != (t._v$14 = a) ? i.style.setProperty("height", a) : i.style.removeProperty("height")), l !== t._v$15 && (null != (t._v$15 = l) ? i.style.setProperty("max-width", l) : i.style.removeProperty("max-width")), t
        }), {
            _v$12: void 0,
            _v$13: void 0,
            _v$14: void 0,
            _v$15: void 0
        }), o
    })()
};
let Jn = function(e) {
    return e.TEXT = "text", e.IMAGE = "image", e.VIDEO = "video", e.EMBED = "embed", e.AUDIO = "audio", e
}({});
const Qn = e => V(oe, {
        get children() {
            return [V(re, {
                get when() {
                    return e.message.type === Jn.TEXT
                },
                get children() {
                    return V(Un, {
                        get content() {
                            return e.message.content
                        },
                        get isTypingSkipped() {
                            return e.isTypingSkipped
                        },
                        get typingEmulation() {
                            return e.typingEmulation
                        },
                        get onTransitionEnd() {
                            return e.onTransitionEnd
                        }
                    })
                }
            }), V(re, {
                get when() {
                    return e.message.type === Jn.IMAGE
                },
                get children() {
                    return V($n, {
                        get content() {
                            return e.message.content
                        },
                        get onTransitionEnd() {
                            return e.onTransitionEnd
                        }
                    })
                }
            }), V(re, {
                get when() {
                    return e.message.type === Jn.VIDEO
                },
                get children() {
                    return V(Xn, {
                        get content() {
                            return e.message.content
                        },
                        get onTransitionEnd() {
                            return e.onTransitionEnd
                        }
                    })
                }
            }), V(re, {
                get when() {
                    return e.message.type === Jn.EMBED
                },
                get children() {
                    return V(ln, {
                        get content() {
                            return e.message.content
                        },
                        get onTransitionEnd() {
                            return e.onTransitionEnd
                        }
                    })
                }
            }), V(re, {
                get when() {
                    return "custom-embed" === e.message.type
                },
                get children() {
                    return V(mn, {
                        get content() {
                            return e.message.content
                        },
                        get onTransitionEnd() {
                            return e.onTransitionEnd
                        },
                        get onCompleted() {
                            return e.onCompleted
                        }
                    })
                }
            }), V(re, {
                get when() {
                    return e.message.type === Jn.AUDIO
                },
                get children() {
                    return V(on, {
                        get content() {
                            return e.message.content
                        },
                        get onTransitionEnd() {
                            return e.onTransitionEnd
                        }
                    })
                }
            })]
        }
    }),
    eo = pe('<figure data-testid="default-avatar"><svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0" x="0" y="0" mask-type="alpha"><circle cx="37.5" cy="37.5" r="37.5" fill="#0042DA"></circle></mask><g mask="url(#mask0)"><rect x="-30" y="-43" width="131" height="154" fill="#0042DA"></rect><rect x="2.50413" y="120.333" width="81.5597" height="86.4577" rx="2.5" transform="rotate(-52.6423 2.50413 120.333)" stroke="#FED23D" stroke-width="5"></rect><circle cx="76.5" cy="-1.5" r="29" stroke="#FF8E20" stroke-width="5"></circle><path d="M-49.8224 22L-15.5 -40.7879L18.8224 22H-49.8224Z" stroke="#F7F8FF" stroke-width="5">'),
    to = () => (() => {
        const e = eo(),
            t = e.firstChild;
        return k((n => {
            const o = "flex justify-center items-center rounded-full text-white relative " + (Dt() ? "w-6 h-6 text-sm" : "w-10 h-10 text-xl"),
                r = "absolute top-0 left-0 " + (Dt() ? " w-6 h-6 text-sm" : "w-full h-full text-xl");
            return o !== n._v$ && fe(e, n._v$ = o), r !== n._v$2 && ge(t, "class", n._v$2 = r), n
        }), {
            _v$: void 0,
            _v$2: void 0
        }), e
    })(),
    no = pe('<figure><img alt="Bot avatar" class="rounded-full object-cover w-full h-full" elementtiming="Bot avatar" fetchpriority="high">'),
    oo = e => {
        const [t, n] = _(e.initialAvatarSrc);
        return $((() => {
            !t()?.startsWith("{{") && t() || !e.initialAvatarSrc?.startsWith("http") || n(e.initialAvatarSrc)
        })), V(ne, {
            get when() {
                return ze(t())
            },
            keyed: !0,
            get fallback() {
                return V(to, {})
            },
            get children() {
                const e = no(),
                    n = e.firstChild;
                return k((o => {
                    const r = "flex justify-center items-center rounded-full text-white relative animate-fade-in flex-shrink-0 " + (Dt() ? "w-6 h-6 text-sm" : "w-10 h-10 text-xl"),
                        i = t();
                    return r !== o._v$ && fe(e, o._v$ = r), i !== o._v$2 && ge(n, "src", o._v$2 = i), o
                }), {
                    _v$: void 0,
                    _v$2: void 0
                }), e
            }
        })
    },
    ro = pe('<div class="flex justify-end items-end animate-fade-in gap-2 guest-container"><span class="px-4 py-2 whitespace-pre-wrap max-w-full typebot-guest-bubble" data-testid="guest-bubble">'),
    io = e => (() => {
        const t = ro(),
            n = t.firstChild;
        return t.style.setProperty("margin-left", "50px"), ye(n, (() => e.message)), ye(t, V(ne, {
            get when() {
                return e.showAvatar
            },
            get children() {
                return V(oo, {
                    get initialAvatarSrc() {
                        return e.avatarSrc
                    }
                })
            }
        }), null), t
    })(),
    so = "Send";
let ao = function(e) {
    return e.TEXT = "text input", e.NUMBER = "number input", e.EMAIL = "email input", e.URL = "url input", e.DATE = "date input", e.PHONE = "phone number input", e.CHOICE = "choice input", e.PICTURE_CHOICE = "picture choice input", e.PAYMENT = "payment input", e.RATING = "rating input", e.FILE = "file input", e
}({});
const lo = {
        button: so,
        placeholder: "Type your answer..."
    },
    co = pe('<div class="flex items-end justify-between pr-2 typebot-input w-full" data-testid="input">'),
    uo = e => {
        const [t, n] = _(e.defaultValue ?? "");
        let o;
        const r = e => n(e),
            i = () => {
                "" !== o?.value && o?.reportValidity() ? e.onSubmit({
                    value: t()
                }) : o?.focus()
            },
            s = t => {
                e.block.options?.isLong || "Enter" === t.key && i()
            },
            a = t => {
                e.block.options?.isLong && "Enter" === t.key && (t.metaKey || t.ctrlKey) && i()
            };
        C((() => {
            !Dt() && o && o.focus(), window.addEventListener("message", l)
        })), E((() => {
            window.removeEventListener("message", l)
        }));
        const l = e => {
            const {
                data: t
            } = e;
            t.isFromTypebot && "setInputValue" === t.command && n(t.value)
        };
        return (() => {
            const n = co();
            return n.$$keydown = s, ye(n, (() => {
                const n = T((() => !!e.block.options?.isLong));
                return () => n() ? V(Qt, {
                    ref(e) {
                        "function" == typeof o ? o(e) : o = e
                    },
                    onInput: r,
                    onKeyDown: a,
                    get value() {
                        return t()
                    },
                    get placeholder() {
                        return e.block.options?.labels?.placeholder ?? lo.placeholder
                    }
                }) : V(Xt, {
                    ref(e) {
                        "function" == typeof o ? o(e) : o = e
                    },
                    onInput: r,
                    get value() {
                        return t()
                    },
                    get placeholder() {
                        return e.block.options?.labels?.placeholder ?? lo.placeholder
                    }
                })
            })(), null), ye(n, V(Wt, {
                type: "button",
                class: "my-2 ml-2",
                "on:click": i,
                get children() {
                    return e.block.options?.labels?.button ?? lo.button
                }
            }), null), k((() => null != (e.block.options?.isLong ? void 0 : "350px") ? n.style.setProperty("max-width", e.block.options?.isLong ? void 0 : "350px") : n.style.removeProperty("max-width"))), n
        })()
    };
he(["keydown"]);
const po = {
        button: so,
        placeholder: "Type a number..."
    },
    ho = pe('<div class="flex items-end justify-between pr-2 typebot-input w-full" data-testid="input"><input class="focus:outline-none bg-transparent px-4 py-4 flex-1 w-full text-input" type="number">'),
    go = e => {
        const [t, n] = _(e.defaultValue ?? ""), [o, r, i] = [S(s = () => t()), function(e) {
            $((function() {
                const t = s();
                if (null == t) return void(e.value = t);
                const n = e.value;
                (0 === t && "" === n || t != n) && (e.value = t + "")
            }))
        }, function(e) {
            return e.validity.badInput ? s() : "" != e.value ? e.valueAsNumber : void 0
        }];
        var s;
        let a;
        const l = () => {
                "" !== a?.value && a?.reportValidity() ? e.onSubmit({
                    value: t().toString()
                }) : a?.focus()
            },
            c = e => {
                "Enter" === e.key && l()
            };
        C((() => {
            !Dt() && a && a.focus(), window.addEventListener("message", d)
        })), E((() => {
            window.removeEventListener("message", d)
        }));
        const d = e => {
            const {
                data: t
            } = e;
            t.isFromTypebot && "setInputValue" === t.command && n(t.value)
        };
        return (() => {
            const t = ho(),
                s = t.firstChild;
            t.$$keydown = c, t.style.setProperty("max-width", "350px"), s.$$input = e => {
                n(i(e.currentTarget))
            }, me(r, s, (() => !0));
            return "function" == typeof a ? me(a, s) : a = s, s.style.setProperty("font-size", "16px"), s.style.setProperty("appearance", "auto"), s.value = o, ye(t, V(Wt, {
                type: "button",
                class: "my-2 ml-2",
                "on:click": l,
                get children() {
                    return e.block.options?.labels?.button ?? po.button
                }
            }), null), k((t => {
                const n = e.block.options?.labels?.placeholder ?? po.placeholder,
                    o = e.block.options?.min,
                    r = e.block.options?.max,
                    i = e.block.options?.step ?? "any";
                return n !== t._v$ && ge(s, "placeholder", t._v$ = n), o !== t._v$2 && ge(s, "min", t._v$2 = o), r !== t._v$3 && ge(s, "max", t._v$3 = r), i !== t._v$4 && ge(s, "step", t._v$4 = i), t
            }), {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0,
                _v$4: void 0
            }), t
        })()
    };
he(["keydown", "input"]);
const fo = {
        button: so,
        placeholder: "Type your email..."
    },
    bo = pe('<div class="flex items-end justify-between pr-2 typebot-input w-full" data-testid="input">'),
    mo = e => {
        const [t, n] = _(e.defaultValue ?? "");
        let o;
        const r = e => n(e),
            i = () => {
                "" !== o?.value && o?.reportValidity() ? e.onSubmit({
                    value: t()
                }) : o?.focus()
            },
            s = e => {
                "Enter" === e.key && i()
            };
        C((() => {
            !Dt() && o && o.focus(), window.addEventListener("message", a)
        })), E((() => {
            window.removeEventListener("message", a)
        }));
        const a = e => {
            const {
                data: t
            } = e;
            t.isFromTypebot && "setInputValue" === t.command && n(t.value)
        };
        return (() => {
            const n = bo();
            return n.$$keydown = s, n.style.setProperty("max-width", "350px"), ye(n, V(Xt, {
                ref(e) {
                    "function" == typeof o ? o(e) : o = e
                },
                get value() {
                    return t()
                },
                get placeholder() {
                    return e.block.options?.labels?.placeholder ?? fo.placeholder
                },
                onInput: r,
                type: "email",
                autocomplete: "email"
            }), null), ye(n, V(Wt, {
                type: "button",
                class: "my-2 ml-2",
                "on:click": i,
                get children() {
                    return e.block.options?.labels?.button ?? fo.button
                }
            }), null), n
        })()
    };
he(["keydown"]);
const yo = {
        button: so,
        placeholder: "Type a URL..."
    },
    vo = pe('<div class="flex items-end justify-between pr-2 typebot-input w-full" data-testid="input">'),
    wo = e => {
        const [t, n] = _(e.defaultValue ?? "");
        let o;
        const r = e => {
                if (!e.startsWith("https://")) return "https:/" === e ? void 0 : n(`https://${e}`);
                n(e)
            },
            i = () => {
                "" !== o?.value && o?.reportValidity() ? e.onSubmit({
                    value: t()
                }) : o?.focus()
            },
            s = e => {
                "Enter" === e.key && i()
            };
        C((() => {
            !Dt() && o && o.focus(), window.addEventListener("message", a)
        })), E((() => {
            window.removeEventListener("message", a)
        }));
        const a = e => {
            const {
                data: t
            } = e;
            t.isFromTypebot && "setInputValue" === t.command && n(t.value)
        };
        return (() => {
            const n = vo();
            return n.$$keydown = s, n.style.setProperty("max-width", "350px"), ye(n, V(Xt, {
                ref(e) {
                    "function" == typeof o ? o(e) : o = e
                },
                get value() {
                    return t()
                },
                get placeholder() {
                    return e.block.options?.labels?.placeholder ?? yo.placeholder
                },
                onInput: r,
                type: "url",
                autocomplete: "url"
            }), null), ye(n, V(Wt, {
                type: "button",
                class: "my-2 ml-2",
                "on:click": i,
                get children() {
                    return e.block.options?.labels?.button ?? yo.button
                }
            }), null), n
        })()
    };
he(["keydown"]);
const xo = pe('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2px" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9">'),
    _o = e => (() => {
        const t = xo();
        return be(t, e, !0, !0), t
    })(),
    ko = [{
        name: "International",
        flag: "🌐",
        code: "INT",
        dial_code: null
    }, {
        name: "Afghanistan",
        flag: "🇦🇫",
        code: "AF",
        dial_code: "+93"
    }, {
        name: "Åland Islands",
        flag: "🇦🇽",
        code: "AX",
        dial_code: "+358"
    }, {
        name: "Albania",
        flag: "🇦🇱",
        code: "AL",
        dial_code: "+355"
    }, {
        name: "Algeria",
        flag: "🇩🇿",
        code: "DZ",
        dial_code: "+213"
    }, {
        name: "American Samoa",
        flag: "🇦🇸",
        code: "AS",
        dial_code: "+1684"
    }, {
        name: "Andorra",
        flag: "🇦🇩",
        code: "AD",
        dial_code: "+376"
    }, {
        name: "Angola",
        flag: "🇦🇴",
        code: "AO",
        dial_code: "+244"
    }, {
        name: "Anguilla",
        flag: "🇦🇮",
        code: "AI",
        dial_code: "+1264"
    }, {
        name: "Antarctica",
        flag: "🇦🇶",
        code: "AQ",
        dial_code: "+672"
    }, {
        name: "Antigua and Barbuda",
        flag: "🇦🇬",
        code: "AG",
        dial_code: "+1268"
    }, {
        name: "Argentina",
        flag: "🇦🇷",
        code: "AR",
        dial_code: "+54"
    }, {
        name: "Armenia",
        flag: "🇦🇲",
        code: "AM",
        dial_code: "+374"
    }, {
        name: "Aruba",
        flag: "🇦🇼",
        code: "AW",
        dial_code: "+297"
    }, {
        name: "Australia",
        flag: "🇦🇺",
        code: "AU",
        dial_code: "+61"
    }, {
        name: "Austria",
        flag: "🇦🇹",
        code: "AT",
        dial_code: "+43"
    }, {
        name: "Azerbaijan",
        flag: "🇦🇿",
        code: "AZ",
        dial_code: "+994"
    }, {
        name: "Bahamas",
        flag: "🇧🇸",
        code: "BS",
        dial_code: "+1242"
    }, {
        name: "Bahrain",
        flag: "🇧🇭",
        code: "BH",
        dial_code: "+973"
    }, {
        name: "Bangladesh",
        flag: "🇧🇩",
        code: "BD",
        dial_code: "+880"
    }, {
        name: "Barbados",
        flag: "🇧🇧",
        code: "BB",
        dial_code: "+1246"
    }, {
        name: "Belarus",
        flag: "🇧🇾",
        code: "BY",
        dial_code: "+375"
    }, {
        name: "Belgium",
        flag: "🇧🇪",
        code: "BE",
        dial_code: "+32"
    }, {
        name: "Belize",
        flag: "🇧🇿",
        code: "BZ",
        dial_code: "+501"
    }, {
        name: "Benin",
        flag: "🇧🇯",
        code: "BJ",
        dial_code: "+229"
    }, {
        name: "Bermuda",
        flag: "🇧🇲",
        code: "BM",
        dial_code: "+1441"
    }, {
        name: "Bhutan",
        flag: "🇧🇹",
        code: "BT",
        dial_code: "+975"
    }, {
        name: "Bolivia, Plurinational State of bolivia",
        flag: "🇧🇴",
        code: "BO",
        dial_code: "+591"
    }, {
        name: "Bosnia and Herzegovina",
        flag: "🇧🇦",
        code: "BA",
        dial_code: "+387"
    }, {
        name: "Botswana",
        flag: "🇧🇼",
        code: "BW",
        dial_code: "+267"
    }, {
        name: "Bouvet Island",
        flag: "🇧🇻",
        code: "BV",
        dial_code: "+47"
    }, {
        name: "Brazil",
        flag: "🇧🇷",
        code: "BR",
        dial_code: "+55"
    }, {
        name: "British Indian Ocean Territory",
        flag: "🇮🇴",
        code: "IO",
        dial_code: "+246"
    }, {
        name: "Brunei Darussalam",
        flag: "🇧🇳",
        code: "BN",
        dial_code: "+673"
    }, {
        name: "Bulgaria",
        flag: "🇧🇬",
        code: "BG",
        dial_code: "+359"
    }, {
        name: "Burkina Faso",
        flag: "🇧🇫",
        code: "BF",
        dial_code: "+226"
    }, {
        name: "Burundi",
        flag: "🇧🇮",
        code: "BI",
        dial_code: "+257"
    }, {
        name: "Cambodia",
        flag: "🇰🇭",
        code: "KH",
        dial_code: "+855"
    }, {
        name: "Cameroon",
        flag: "🇨🇲",
        code: "CM",
        dial_code: "+237"
    }, {
        name: "Canada",
        flag: "🇨🇦",
        code: "CA",
        dial_code: "+1"
    }, {
        name: "Cape Verde",
        flag: "🇨🇻",
        code: "CV",
        dial_code: "+238"
    }, {
        name: "Cayman Islands",
        flag: "🇰🇾",
        code: "KY",
        dial_code: "+345"
    }, {
        name: "Central African Republic",
        flag: "🇨🇫",
        code: "CF",
        dial_code: "+236"
    }, {
        name: "Chad",
        flag: "🇹🇩",
        code: "TD",
        dial_code: "+235"
    }, {
        name: "Chile",
        flag: "🇨🇱",
        code: "CL",
        dial_code: "+56"
    }, {
        name: "China",
        flag: "🇨🇳",
        code: "CN",
        dial_code: "+86"
    }, {
        name: "Christmas Island",
        flag: "🇨🇽",
        code: "CX",
        dial_code: "+61"
    }, {
        name: "Cocos (Keeling) Islands",
        flag: "🇨🇨",
        code: "CC",
        dial_code: "+61"
    }, {
        name: "Colombia",
        flag: "🇨🇴",
        code: "CO",
        dial_code: "+57"
    }, {
        name: "Comoros",
        flag: "🇰🇲",
        code: "KM",
        dial_code: "+269"
    }, {
        name: "Congo",
        flag: "🇨🇬",
        code: "CG",
        dial_code: "+242"
    }, {
        name: "Congo, The Democratic Republic of the Congo",
        flag: "🇨🇩",
        code: "CD",
        dial_code: "+243"
    }, {
        name: "Cook Islands",
        flag: "🇨🇰",
        code: "CK",
        dial_code: "+682"
    }, {
        name: "Costa Rica",
        flag: "🇨🇷",
        code: "CR",
        dial_code: "+506"
    }, {
        name: "Cote d'Ivoire",
        flag: "🇨🇮",
        code: "CI",
        dial_code: "+225"
    }, {
        name: "Croatia",
        flag: "🇭🇷",
        code: "HR",
        dial_code: "+385"
    }, {
        name: "Cuba",
        flag: "🇨🇺",
        code: "CU",
        dial_code: "+53"
    }, {
        name: "Cyprus",
        flag: "🇨🇾",
        code: "CY",
        dial_code: "+357"
    }, {
        name: "Czech Republic",
        flag: "🇨🇿",
        code: "CZ",
        dial_code: "+420"
    }, {
        name: "Denmark",
        flag: "🇩🇰",
        code: "DK",
        dial_code: "+45"
    }, {
        name: "Djibouti",
        flag: "🇩🇯",
        code: "DJ",
        dial_code: "+253"
    }, {
        name: "Dominica",
        flag: "🇩🇲",
        code: "DM",
        dial_code: "+1767"
    }, {
        name: "Dominican Republic",
        flag: "🇩🇴",
        code: "DO",
        dial_code: "+1849"
    }, {
        name: "Ecuador",
        flag: "🇪🇨",
        code: "EC",
        dial_code: "+593"
    }, {
        name: "Egypt",
        flag: "🇪🇬",
        code: "EG",
        dial_code: "+20"
    }, {
        name: "El Salvador",
        flag: "🇸🇻",
        code: "SV",
        dial_code: "+503"
    }, {
        name: "Equatorial Guinea",
        flag: "🇬🇶",
        code: "GQ",
        dial_code: "+240"
    }, {
        name: "Eritrea",
        flag: "🇪🇷",
        code: "ER",
        dial_code: "+291"
    }, {
        name: "Estonia",
        flag: "🇪🇪",
        code: "EE",
        dial_code: "+372"
    }, {
        name: "Ethiopia",
        flag: "🇪🇹",
        code: "ET",
        dial_code: "+251"
    }, {
        name: "Falkland Islands (Malvinas)",
        flag: "🇫🇰",
        code: "FK",
        dial_code: "+500"
    }, {
        name: "Faroe Islands",
        flag: "🇫🇴",
        code: "FO",
        dial_code: "+298"
    }, {
        name: "Fiji",
        flag: "🇫🇯",
        code: "FJ",
        dial_code: "+679"
    }, {
        name: "Finland",
        flag: "🇫🇮",
        code: "FI",
        dial_code: "+358"
    }, {
        name: "France",
        flag: "🇫🇷",
        code: "FR",
        dial_code: "+33"
    }, {
        name: "French Guiana",
        flag: "🇬🇫",
        code: "GF",
        dial_code: "+594"
    }, {
        name: "French Polynesia",
        flag: "🇵🇫",
        code: "PF",
        dial_code: "+689"
    }, {
        name: "French Southern Territories",
        flag: "🇹🇫",
        code: "TF",
        dial_code: "+262"
    }, {
        name: "Gabon",
        flag: "🇬🇦",
        code: "GA",
        dial_code: "+241"
    }, {
        name: "Gambia",
        flag: "🇬🇲",
        code: "GM",
        dial_code: "+220"
    }, {
        name: "Georgia",
        flag: "🇬🇪",
        code: "GE",
        dial_code: "+995"
    }, {
        name: "Germany",
        flag: "🇩🇪",
        code: "DE",
        dial_code: "+49"
    }, {
        name: "Ghana",
        flag: "🇬🇭",
        code: "GH",
        dial_code: "+233"
    }, {
        name: "Gibraltar",
        flag: "🇬🇮",
        code: "GI",
        dial_code: "+350"
    }, {
        name: "Greece",
        flag: "🇬🇷",
        code: "GR",
        dial_code: "+30"
    }, {
        name: "Greenland",
        flag: "🇬🇱",
        code: "GL",
        dial_code: "+299"
    }, {
        name: "Grenada",
        flag: "🇬🇩",
        code: "GD",
        dial_code: "+1473"
    }, {
        name: "Guadeloupe",
        flag: "🇬🇵",
        code: "GP",
        dial_code: "+590"
    }, {
        name: "Guam",
        flag: "🇬🇺",
        code: "GU",
        dial_code: "+1671"
    }, {
        name: "Guatemala",
        flag: "🇬🇹",
        code: "GT",
        dial_code: "+502"
    }, {
        name: "Guernsey",
        flag: "🇬🇬",
        code: "GG",
        dial_code: "+44"
    }, {
        name: "Guinea",
        flag: "🇬🇳",
        code: "GN",
        dial_code: "+224"
    }, {
        name: "Guinea-Bissau",
        flag: "🇬🇼",
        code: "GW",
        dial_code: "+245"
    }, {
        name: "Guyana",
        flag: "🇬🇾",
        code: "GY",
        dial_code: "+592"
    }, {
        name: "Haiti",
        flag: "🇭🇹",
        code: "HT",
        dial_code: "+509"
    }, {
        name: "Heard Island and Mcdonald Islands",
        flag: "🇭🇲",
        code: "HM",
        dial_code: "+672"
    }, {
        name: "Holy See (Vatican City State)",
        flag: "🇻🇦",
        code: "VA",
        dial_code: "+379"
    }, {
        name: "Honduras",
        flag: "🇭🇳",
        code: "HN",
        dial_code: "+504"
    }, {
        name: "Hong Kong",
        flag: "🇭🇰",
        code: "HK",
        dial_code: "+852"
    }, {
        name: "Hungary",
        flag: "🇭🇺",
        code: "HU",
        dial_code: "+36"
    }, {
        name: "Iceland",
        flag: "🇮🇸",
        code: "IS",
        dial_code: "+354"
    }, {
        name: "India",
        flag: "🇮🇳",
        code: "IN",
        dial_code: "+91"
    }, {
        name: "Indonesia",
        flag: "🇮🇩",
        code: "ID",
        dial_code: "+62"
    }, {
        name: "Iran, Islamic Republic of Persian Gulf",
        flag: "🇮🇷",
        code: "IR",
        dial_code: "+98"
    }, {
        name: "Iraq",
        flag: "🇮🇶",
        code: "IQ",
        dial_code: "+964"
    }, {
        name: "Ireland",
        flag: "🇮🇪",
        code: "IE",
        dial_code: "+353"
    }, {
        name: "Isle of Man",
        flag: "🇮🇲",
        code: "IM",
        dial_code: "+44"
    }, {
        name: "Israel",
        flag: "🇮🇱",
        code: "IL",
        dial_code: "+972"
    }, {
        name: "Italy",
        flag: "🇮🇹",
        code: "IT",
        dial_code: "+39"
    }, {
        name: "Jamaica",
        flag: "🇯🇲",
        code: "JM",
        dial_code: "+1876"
    }, {
        name: "Japan",
        flag: "🇯🇵",
        code: "JP",
        dial_code: "+81"
    }, {
        name: "Jersey",
        flag: "🇯🇪",
        code: "JE",
        dial_code: "+44"
    }, {
        name: "Jordan",
        flag: "🇯🇴",
        code: "JO",
        dial_code: "+962"
    }, {
        name: "Kazakhstan",
        flag: "🇰🇿",
        code: "KZ",
        dial_code: "+7"
    }, {
        name: "Kenya",
        flag: "🇰🇪",
        code: "KE",
        dial_code: "+254"
    }, {
        name: "Kiribati",
        flag: "🇰🇮",
        code: "KI",
        dial_code: "+686"
    }, {
        name: "Korea, Democratic People's Republic of Korea",
        flag: "🇰🇵",
        code: "KP",
        dial_code: "+850"
    }, {
        name: "Korea, Republic of South Korea",
        flag: "🇰🇷",
        code: "KR",
        dial_code: "+82"
    }, {
        name: "Kosovo",
        flag: "🇽🇰",
        code: "XK",
        dial_code: "+383"
    }, {
        name: "Kuwait",
        flag: "🇰🇼",
        code: "KW",
        dial_code: "+965"
    }, {
        name: "Kyrgyzstan",
        flag: "🇰🇬",
        code: "KG",
        dial_code: "+996"
    }, {
        name: "Laos",
        flag: "🇱🇦",
        code: "LA",
        dial_code: "+856"
    }, {
        name: "Latvia",
        flag: "🇱🇻",
        code: "LV",
        dial_code: "+371"
    }, {
        name: "Lebanon",
        flag: "🇱🇧",
        code: "LB",
        dial_code: "+961"
    }, {
        name: "Lesotho",
        flag: "🇱🇸",
        code: "LS",
        dial_code: "+266"
    }, {
        name: "Liberia",
        flag: "🇱🇷",
        code: "LR",
        dial_code: "+231"
    }, {
        name: "Libyan Arab Jamahiriya",
        flag: "🇱🇾",
        code: "LY",
        dial_code: "+218"
    }, {
        name: "Liechtenstein",
        flag: "🇱🇮",
        code: "LI",
        dial_code: "+423"
    }, {
        name: "Lithuania",
        flag: "🇱🇹",
        code: "LT",
        dial_code: "+370"
    }, {
        name: "Luxembourg",
        flag: "🇱🇺",
        code: "LU",
        dial_code: "+352"
    }, {
        name: "Macao",
        flag: "🇲🇴",
        code: "MO",
        dial_code: "+853"
    }, {
        name: "Macedonia",
        flag: "🇲🇰",
        code: "MK",
        dial_code: "+389"
    }, {
        name: "Madagascar",
        flag: "🇲🇬",
        code: "MG",
        dial_code: "+261"
    }, {
        name: "Malawi",
        flag: "🇲🇼",
        code: "MW",
        dial_code: "+265"
    }, {
        name: "Malaysia",
        flag: "🇲🇾",
        code: "MY",
        dial_code: "+60"
    }, {
        name: "Maldives",
        flag: "🇲🇻",
        code: "MV",
        dial_code: "+960"
    }, {
        name: "Mali",
        flag: "🇲🇱",
        code: "ML",
        dial_code: "+223"
    }, {
        name: "Malta",
        flag: "🇲🇹",
        code: "MT",
        dial_code: "+356"
    }, {
        name: "Marshall Islands",
        flag: "🇲🇭",
        code: "MH",
        dial_code: "+692"
    }, {
        name: "Martinique",
        flag: "🇲🇶",
        code: "MQ",
        dial_code: "+596"
    }, {
        name: "Mauritania",
        flag: "🇲🇷",
        code: "MR",
        dial_code: "+222"
    }, {
        name: "Mauritius",
        flag: "🇲🇺",
        code: "MU",
        dial_code: "+230"
    }, {
        name: "Mayotte",
        flag: "🇾🇹",
        code: "YT",
        dial_code: "+262"
    }, {
        name: "Mexico",
        flag: "🇲🇽",
        code: "MX",
        dial_code: "+52"
    }, {
        name: "Micronesia, Federated States of Micronesia",
        flag: "🇫🇲",
        code: "FM",
        dial_code: "+691"
    }, {
        name: "Moldova",
        flag: "🇲🇩",
        code: "MD",
        dial_code: "+373"
    }, {
        name: "Monaco",
        flag: "🇲🇨",
        code: "MC",
        dial_code: "+377"
    }, {
        name: "Mongolia",
        flag: "🇲🇳",
        code: "MN",
        dial_code: "+976"
    }, {
        name: "Montenegro",
        flag: "🇲🇪",
        code: "ME",
        dial_code: "+382"
    }, {
        name: "Montserrat",
        flag: "🇲🇸",
        code: "MS",
        dial_code: "+1664"
    }, {
        name: "Morocco",
        flag: "🇲🇦",
        code: "MA",
        dial_code: "+212"
    }, {
        name: "Mozambique",
        flag: "🇲🇿",
        code: "MZ",
        dial_code: "+258"
    }, {
        name: "Myanmar",
        flag: "🇲🇲",
        code: "MM",
        dial_code: "+95"
    }, {
        name: "Namibia",
        flag: "🇳🇦",
        code: "NA",
        dial_code: "+264"
    }, {
        name: "Nauru",
        flag: "🇳🇷",
        code: "NR",
        dial_code: "+674"
    }, {
        name: "Nepal",
        flag: "🇳🇵",
        code: "NP",
        dial_code: "+977"
    }, {
        name: "Netherlands",
        flag: "🇳🇱",
        code: "NL",
        dial_code: "+31"
    }, {
        name: "Netherlands Antilles",
        flag: "",
        code: "AN",
        dial_code: "+599"
    }, {
        name: "New Caledonia",
        flag: "🇳🇨",
        code: "NC",
        dial_code: "+687"
    }, {
        name: "New Zealand",
        flag: "🇳🇿",
        code: "NZ",
        dial_code: "+64"
    }, {
        name: "Nicaragua",
        flag: "🇳🇮",
        code: "NI",
        dial_code: "+505"
    }, {
        name: "Niger",
        flag: "🇳🇪",
        code: "NE",
        dial_code: "+227"
    }, {
        name: "Nigeria",
        flag: "🇳🇬",
        code: "NG",
        dial_code: "+234"
    }, {
        name: "Niue",
        flag: "🇳🇺",
        code: "NU",
        dial_code: "+683"
    }, {
        name: "Norfolk Island",
        flag: "🇳🇫",
        code: "NF",
        dial_code: "+672"
    }, {
        name: "Northern Mariana Islands",
        flag: "🇲🇵",
        code: "MP",
        dial_code: "+1670"
    }, {
        name: "Norway",
        flag: "🇳🇴",
        code: "NO",
        dial_code: "+47"
    }, {
        name: "Oman",
        flag: "🇴🇲",
        code: "OM",
        dial_code: "+968"
    }, {
        name: "Pakistan",
        flag: "🇵🇰",
        code: "PK",
        dial_code: "+92"
    }, {
        name: "Palau",
        flag: "🇵🇼",
        code: "PW",
        dial_code: "+680"
    }, {
        name: "Palestinian Territory, Occupied",
        flag: "🇵🇸",
        code: "PS",
        dial_code: "+970"
    }, {
        name: "Panama",
        flag: "🇵🇦",
        code: "PA",
        dial_code: "+507"
    }, {
        name: "Papua New Guinea",
        flag: "🇵🇬",
        code: "PG",
        dial_code: "+675"
    }, {
        name: "Paraguay",
        flag: "🇵🇾",
        code: "PY",
        dial_code: "+595"
    }, {
        name: "Peru",
        flag: "🇵🇪",
        code: "PE",
        dial_code: "+51"
    }, {
        name: "Philippines",
        flag: "🇵🇭",
        code: "PH",
        dial_code: "+63"
    }, {
        name: "Pitcairn",
        flag: "🇵🇳",
        code: "PN",
        dial_code: "+64"
    }, {
        name: "Poland",
        flag: "🇵🇱",
        code: "PL",
        dial_code: "+48"
    }, {
        name: "Portugal",
        flag: "🇵🇹",
        code: "PT",
        dial_code: "+351"
    }, {
        name: "Puerto Rico",
        flag: "🇵🇷",
        code: "PR",
        dial_code: "+1939"
    }, {
        name: "Qatar",
        flag: "🇶🇦",
        code: "QA",
        dial_code: "+974"
    }, {
        name: "Romania",
        flag: "🇷🇴",
        code: "RO",
        dial_code: "+40"
    }, {
        name: "Russia",
        flag: "🇷🇺",
        code: "RU",
        dial_code: "+7"
    }, {
        name: "Rwanda",
        flag: "🇷🇼",
        code: "RW",
        dial_code: "+250"
    }, {
        name: "Reunion",
        flag: "🇷🇪",
        code: "RE",
        dial_code: "+262"
    }, {
        name: "Saint Barthelemy",
        flag: "🇧🇱",
        code: "BL",
        dial_code: "+590"
    }, {
        name: "Saint Helena, Ascension and Tristan Da Cunha",
        flag: "🇸🇭",
        code: "SH",
        dial_code: "+290"
    }, {
        name: "Saint Kitts and Nevis",
        flag: "🇰🇳",
        code: "KN",
        dial_code: "+1869"
    }, {
        name: "Saint Lucia",
        flag: "🇱🇨",
        code: "LC",
        dial_code: "+1758"
    }, {
        name: "Saint Martin",
        flag: "🇲🇫",
        code: "MF",
        dial_code: "+590"
    }, {
        name: "Saint Pierre and Miquelon",
        flag: "🇵🇲",
        code: "PM",
        dial_code: "+508"
    }, {
        name: "Saint Vincent and the Grenadines",
        flag: "🇻🇨",
        code: "VC",
        dial_code: "+1784"
    }, {
        name: "Samoa",
        flag: "🇼🇸",
        code: "WS",
        dial_code: "+685"
    }, {
        name: "San Marino",
        flag: "🇸🇲",
        code: "SM",
        dial_code: "+378"
    }, {
        name: "Sao Tome and Principe",
        flag: "🇸🇹",
        code: "ST",
        dial_code: "+239"
    }, {
        name: "Saudi Arabia",
        flag: "🇸🇦",
        code: "SA",
        dial_code: "+966"
    }, {
        name: "Senegal",
        flag: "🇸🇳",
        code: "SN",
        dial_code: "+221"
    }, {
        name: "Serbia",
        flag: "🇷🇸",
        code: "RS",
        dial_code: "+381"
    }, {
        name: "Seychelles",
        flag: "🇸🇨",
        code: "SC",
        dial_code: "+248"
    }, {
        name: "Sierra Leone",
        flag: "🇸🇱",
        code: "SL",
        dial_code: "+232"
    }, {
        name: "Singapore",
        flag: "🇸🇬",
        code: "SG",
        dial_code: "+65"
    }, {
        name: "Slovakia",
        flag: "🇸🇰",
        code: "SK",
        dial_code: "+421"
    }, {
        name: "Slovenia",
        flag: "🇸🇮",
        code: "SI",
        dial_code: "+386"
    }, {
        name: "Solomon Islands",
        flag: "🇸🇧",
        code: "SB",
        dial_code: "+677"
    }, {
        name: "Somalia",
        flag: "🇸🇴",
        code: "SO",
        dial_code: "+252"
    }, {
        name: "South Africa",
        flag: "🇿🇦",
        code: "ZA",
        dial_code: "+27"
    }, {
        name: "South Sudan",
        flag: "🇸🇸",
        code: "SS",
        dial_code: "+211"
    }, {
        name: "South Georgia and the South Sandwich Islands",
        flag: "🇬🇸",
        code: "GS",
        dial_code: "+500"
    }, {
        name: "Spain",
        flag: "🇪🇸",
        code: "ES",
        dial_code: "+34"
    }, {
        name: "Sri Lanka",
        flag: "🇱🇰",
        code: "LK",
        dial_code: "+94"
    }, {
        name: "Sudan",
        flag: "🇸🇩",
        code: "SD",
        dial_code: "+249"
    }, {
        name: "Suriname",
        flag: "🇸🇷",
        code: "SR",
        dial_code: "+597"
    }, {
        name: "Svalbard and Jan Mayen",
        flag: "🇸🇯",
        code: "SJ",
        dial_code: "+47"
    }, {
        name: "Swaziland",
        flag: "🇸🇿",
        code: "SZ",
        dial_code: "+268"
    }, {
        name: "Sweden",
        flag: "🇸🇪",
        code: "SE",
        dial_code: "+46"
    }, {
        name: "Switzerland",
        flag: "🇨🇭",
        code: "CH",
        dial_code: "+41"
    }, {
        name: "Syrian Arab Republic",
        flag: "🇸🇾",
        code: "SY",
        dial_code: "+963"
    }, {
        name: "Taiwan",
        flag: "🇹🇼",
        code: "TW",
        dial_code: "+886"
    }, {
        name: "Tajikistan",
        flag: "🇹🇯",
        code: "TJ",
        dial_code: "+992"
    }, {
        name: "Tanzania, United Republic of Tanzania",
        flag: "🇹🇿",
        code: "TZ",
        dial_code: "+255"
    }, {
        name: "Thailand",
        flag: "🇹🇭",
        code: "TH",
        dial_code: "+66"
    }, {
        name: "Timor-Leste",
        flag: "🇹🇱",
        code: "TL",
        dial_code: "+670"
    }, {
        name: "Togo",
        flag: "🇹🇬",
        code: "TG",
        dial_code: "+228"
    }, {
        name: "Tokelau",
        flag: "🇹🇰",
        code: "TK",
        dial_code: "+690"
    }, {
        name: "Tonga",
        flag: "🇹🇴",
        code: "TO",
        dial_code: "+676"
    }, {
        name: "Trinidad and Tobago",
        flag: "🇹🇹",
        code: "TT",
        dial_code: "+1868"
    }, {
        name: "Tunisia",
        flag: "🇹🇳",
        code: "TN",
        dial_code: "+216"
    }, {
        name: "Turkey",
        flag: "🇹🇷",
        code: "TR",
        dial_code: "+90"
    }, {
        name: "Turkmenistan",
        flag: "🇹🇲",
        code: "TM",
        dial_code: "+993"
    }, {
        name: "Turks and Caicos Islands",
        flag: "🇹🇨",
        code: "TC",
        dial_code: "+1649"
    }, {
        name: "Tuvalu",
        flag: "🇹🇻",
        code: "TV",
        dial_code: "+688"
    }, {
        name: "Uganda",
        flag: "🇺🇬",
        code: "UG",
        dial_code: "+256"
    }, {
        name: "Ukraine",
        flag: "🇺🇦",
        code: "UA",
        dial_code: "+380"
    }, {
        name: "United Arab Emirates",
        flag: "🇦🇪",
        code: "AE",
        dial_code: "+971"
    }, {
        name: "United Kingdom",
        flag: "🇬🇧",
        code: "GB",
        dial_code: "+44"
    }, {
        name: "United States",
        flag: "🇺🇸",
        code: "US",
        dial_code: "+1"
    }, {
        name: "Uruguay",
        flag: "🇺🇾",
        code: "UY",
        dial_code: "+598"
    }, {
        name: "Uzbekistan",
        flag: "🇺🇿",
        code: "UZ",
        dial_code: "+998"
    }, {
        name: "Vanuatu",
        flag: "🇻🇺",
        code: "VU",
        dial_code: "+678"
    }, {
        name: "Venezuela, Bolivarian Republic of Venezuela",
        flag: "🇻🇪",
        code: "VE",
        dial_code: "+58"
    }, {
        name: "Vietnam",
        flag: "🇻🇳",
        code: "VN",
        dial_code: "+84"
    }, {
        name: "Virgin Islands, British",
        flag: "🇻🇬",
        code: "VG",
        dial_code: "+1284"
    }, {
        name: "Virgin Islands, U.S.",
        flag: "🇻🇮",
        code: "VI",
        dial_code: "+1340"
    }, {
        name: "Wallis and Futuna",
        flag: "🇼🇫",
        code: "WF",
        dial_code: "+681"
    }, {
        name: "Yemen",
        flag: "🇾🇪",
        code: "YE",
        dial_code: "+967"
    }, {
        name: "Zambia",
        flag: "🇿🇲",
        code: "ZM",
        dial_code: "+260"
    }, {
        name: "Zimbabwe",
        flag: "🇿🇼",
        code: "ZW",
        dial_code: "+263"
    }],
    $o = {
        button: so,
        placeholder: "Type your phone number..."
    },
    To = pe('<div class="flex items-end justify-between pr-2 typebot-input" data-testid="input"><div class="flex"><div class="relative typebot-country-select flex justify-center items-center"><div class="pl-2 pr-1 flex items-center gap-2"><span></span></div><select class="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0">'),
    So = pe("<option> "),
    Co = e => {
        const [t, n] = _(Be(e.defaultCountryCode) ? "INT" : e.defaultCountryCode), [o, r] = _(e.defaultValue ?? "");
        let i;
        const s = e => {
                r(e), "" !== e && "+" !== e || "INT" === t() || n("INT");
                const o = e?.startsWith("+") && e.length > 2 && ko.reduce(((t, n) => !n?.dial_code || null !== t && !t.dial_code ? t : e?.startsWith(n.dial_code) && n.dial_code.length > (t?.dial_code.length ?? 0) ? n : t), null);
                o && n(o.code)
            },
            a = () => {
                const n = ko.find((e => e.code === t()))?.dial_code;
                "" !== i?.value && i?.reportValidity() ? e.onSubmit({
                    value: o().startsWith("+") ? o() : `${n??""}${o()}`
                }) : i?.focus()
            },
            l = e => {
                "Enter" === e.key && a()
            },
            c = e => {
                const t = e.currentTarget.value;
                n(t);
                const s = ko.find((e => e.code === t))?.dial_code;
                "" === o() && s && r(s), i?.focus()
            };
        C((() => {
            !Dt() && i && i.focus(), window.addEventListener("message", d)
        })), E((() => {
            window.removeEventListener("message", d)
        }));
        const d = e => {
            const {
                data: t
            } = e;
            t.isFromTypebot && "setInputValue" === t.command && r(t.value)
        };
        return (() => {
            const n = To(),
                r = n.firstChild,
                d = r.firstChild.firstChild,
                u = d.firstChild,
                p = d.nextSibling;
            return n.$$keydown = l, n.style.setProperty("max-width", "400px"), ye(u, (() => ko.find((e => t() === e.code))?.flag)), ye(d, V(_o, {
                class: "w-3"
            }), null), p.addEventListener("change", c), ye(p, V(te, {
                each: ko,
                children: e => (() => {
                    const n = So(),
                        o = n.firstChild;
                    return ye(n, (() => e.name), o), ye(n, (() => e.dial_code ? `(${e.dial_code})` : ""), null), k((() => n.selected = e.code === t())), k((() => n.value = e.code)), n
                })()
            })), ye(r, V(Xt, {
                type: "tel",
                ref(e) {
                    "function" == typeof i ? i(e) : i = e
                },
                get value() {
                    return o()
                },
                onInput: s,
                get placeholder() {
                    return e.labels?.placeholder ?? $o.placeholder
                },
                get autofocus() {
                    return !Dt()
                }
            }), null), ye(n, V(Wt, {
                type: "button",
                class: "my-2 ml-2",
                "on:click": a,
                get children() {
                    return e.labels?.button ?? $o.button
                }
            }), null), n
        })()
    };
he(["keydown"]);
const Eo = {
        button: so,
        from: "From:",
        to: "To:"
    },
    Ao = pe('<div class="flex flex-col"><div class="flex items-center"><form class="flex justify-between typebot-input pr-2 items-end"><div class="flex flex-col"><div><input class="focus:outline-none flex-1 w-full text-input typebot-date-input" data-testid="from-date">'),
    Io = pe('<p class="font-semibold">'),
    Po = pe('<div class="flex items-center p-4"><input class="focus:outline-none flex-1 w-full text-input ml-2 typebot-date-input" data-testid="to-date">'),
    Ro = e => {
        const [t, n] = _(Lo(e.defaultValue ?? ""));
        return (() => {
            const o = Ao(),
                r = o.firstChild.firstChild,
                i = r.firstChild,
                s = i.firstChild,
                a = s.firstChild;
            return r.addEventListener("submit", (n => {
                "" === t().from && "" === t().to || (n.preventDefault(), e.onSubmit({
                    value: `${t().from}${e.options?.isRange?` to ${t().to}`:""}`
                }))
            })), ye(s, (() => {
                const t = T((() => !!e.options?.isRange));
                return () => t() && (() => {
                    const t = Io();
                    return ye(t, (() => e.options.labels?.from ?? Eo.from)), t
                })()
            })(), a), a.addEventListener("change", (e => n({
                ...t(),
                from: e.currentTarget.value
            }))), a.style.setProperty("min-height", "32px"), a.style.setProperty("min-width", "100px"), a.style.setProperty("font-size", "16px"), ye(i, (() => {
                const o = T((() => !!e.options?.isRange));
                return () => o() && (() => {
                    const o = Po(),
                        r = o.firstChild;
                    return ye(o, (() => {
                        const t = T((() => !!e.options.isRange));
                        return () => t() && (() => {
                            const t = Io();
                            return ye(t, (() => e.options.labels?.to ?? Eo.to)), t
                        })()
                    })(), r), r.addEventListener("change", (e => n({
                        ...t(),
                        to: e.currentTarget.value
                    }))), r.style.setProperty("min-height", "32px"), r.style.setProperty("min-width", "100px"), r.style.setProperty("font-size", "16px"), k((t => {
                        const n = e.options.hasTime ? "datetime-local" : "date",
                            o = e.options?.min,
                            i = e.options?.max;
                        return n !== t._v$5 && ge(r, "type", t._v$5 = n), o !== t._v$6 && ge(r, "min", t._v$6 = o), i !== t._v$7 && ge(r, "max", t._v$7 = i), t
                    }), {
                        _v$5: void 0,
                        _v$6: void 0,
                        _v$7: void 0
                    }), k((() => r.value = t().to)), o
                })()
            })(), null), ye(r, V(Wt, {
                class: "my-2 ml-2",
                get children() {
                    return e.options?.labels?.button ?? Eo.button
                }
            }), null), k((t => {
                const n = "flex items-center p-4 " + (e.options?.isRange ? "pb-0 gap-2" : ""),
                    o = e.options?.hasTime ? "datetime-local" : "date",
                    r = e.options?.min,
                    i = e.options?.max;
                return n !== t._v$ && fe(s, t._v$ = n), o !== t._v$2 && ge(a, "type", t._v$2 = o), r !== t._v$3 && ge(a, "min", t._v$3 = r), i !== t._v$4 && ge(a, "max", t._v$4 = i), t
            }), {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0,
                _v$4: void 0
            }), k((() => a.value = t().from)), o
        })()
    },
    Lo = e => {
        if (!e.includes("to")) return {
            from: e,
            to: ""
        };
        const [t, n] = e.split(" to ");
        return {
            from: t,
            to: n
        }
    },
    No = "Numbers",
    Mo = 10,
    Oo = {
        button: so
    },
    Bo = 0,
    zo = pe('<form class="flex flex-col gap-2"><div class="flex flex-wrap justify-center gap-2"></div><div class="flex justify-end">'),
    Do = pe('<span class="text-sm w-full rating-label">'),
    jo = pe('<span class="text-sm w-full text-right pr-2 rating-label">'),
    Uo = pe("<div>"),
    Fo = e => {
        const [t, n] = _(e.defaultValue ? Number(e.defaultValue) : void 0), o = n => {
            n.preventDefault();
            const o = t();
            Oe(o) || e.onSubmit({
                value: o.toString()
            })
        }, r = t => {
            e.block.options?.isOneClickSubmitEnabled && e.onSubmit({
                value: t.toString()
            }), n(t)
        };
        return (() => {
            const n = zo(),
                i = n.firstChild,
                s = i.nextSibling;
            return n.addEventListener("submit", o), ye(n, (() => {
                const t = T((() => !!e.block.options?.labels?.left));
                return () => t() && (() => {
                    const t = Do();
                    return ye(t, (() => e.block.options.labels.left)), t
                })()
            })(), i), ye(i, V(te, {
                get each() {
                    return Array.from(Array((e.block.options?.length ?? Mo) + ("Numbers" === (e.block.options?.buttonType ?? No) ? -((e.block.options?.startsAt ?? Bo) - 1) : 0)))
                },
                children: (n, o) => V(Ho, X((() => e.block.options), {
                    get rating() {
                        return t()
                    },
                    get idx() {
                        return o() + ("Numbers" === (e.block.options?.buttonType ?? No) ? e.block.options?.startsAt ?? Bo : 1)
                    },
                    onClick: r
                }))
            })), ye(n, (() => {
                const t = T((() => !!e.block.options?.labels?.right));
                return () => t() && (() => {
                    const t = jo();
                    return ye(t, (() => e.block.options.labels.right)), t
                })()
            })(), s), ye(s, (() => {
                const n = T((() => !!Me(t())));
                return () => n() && V(Wt, {
                    disableIcon: !0,
                    get children() {
                        return e.block.options?.labels?.button ?? Oo.button
                    }
                })
            })()), n
        })()
    },
    Ho = e => {
        const t = t => {
            t.preventDefault(), e.onClick(e.idx)
        };
        return V(oe, {
            get children() {
                return [V(re, {
                    get when() {
                        return "Numbers" === (e.buttonType ?? No)
                    },
                    get children() {
                        return V(Vt, {
                            "on:click": t,
                            get class() {
                                return e.isOneClickSubmitEnabled || Me(e.rating) && e.idx <= e.rating ? "" : "selectable"
                            },
                            get children() {
                                return e.idx
                            }
                        })
                    }
                }), V(re, {
                    get when() {
                        return "Numbers" !== (e.buttonType ?? No)
                    },
                    get children() {
                        const t = Uo();
                        return t.addEventListener("click", (() => e.onClick(e.idx))), k((n => {
                            const o = "flex justify-center items-center rating-icon-container cursor-pointer " + (Me(e.rating) && e.idx <= e.rating ? "selected" : ""),
                                r = e.customIcon?.isEnabled && !Be(e.customIcon.svg) ? e.customIcon.svg : qo;
                            return o !== n._v$ && fe(t, n._v$ = o), r !== n._v$2 && (t.innerHTML = n._v$2 = r), n
                        }), {
                            _v$: void 0,
                            _v$2: void 0
                        }), t
                    }
                })]
            }
        })
    },
    qo = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
    Go = async ({
        apiHost: e,
        files: t,
        onUploadProgress: n
    }) => {
        const o = [];
        let r = 0;
        for (const {
                input: i,
                file: s
            }
            of t) {
            n && n(r / t.length * 100), r += 1;
            const {
                data: a
            } = await Ne({
                method: "POST",
                url: `${e}/api/v1/generate-upload-url`,
                body: {
                    filePathProps: i,
                    fileType: s.type
                }
            });
            if (a?.presignedUrl) {
                const e = new FormData;
                Object.entries(a.formData).forEach((([t, n]) => {
                    e.append(t, n)
                })), e.append("file", s);
                if (!(await fetch(a.presignedUrl, {
                        method: "POST",
                        body: e
                    })).ok) continue;
                o.push(a.fileUrl)
            }
        }
        return o
    }, Vo = {
        isRequired: !0,
        isMultipleAllowed: !1,
        visibility: "Auto",
        labels: {
            placeholder: "<strong>\n      Click to upload\n    </strong> or drag and drop<br>\n    (size limit: 10MB)",
            button: "Upload",
            clear: "Clear",
            skip: "Skip",
            success: {
                single: "File uploaded",
                multiple: "{total} files uploaded"
            }
        }
    }, Wo = pe('<div class="w-full bg-gray-200 rounded-full h-2.5"><div class="upload-progress-bar h-2.5 rounded-full">'), Yo = pe('<span class="relative"><div class="total-files-indicator flex items-center justify-center absolute -right-1 rounded-full px-1 w-4 h-4">'), Ko = pe('<div class="flex flex-col justify-center items-center"><p class="text-sm text-gray-500 text-center">'), Zo = pe('<input id="dropzone-file" type="file" class="hidden">'), Xo = pe('<div class="flex justify-end">'), Jo = pe('<div class="flex justify-end"><div class="flex gap-2">'), Qo = pe('<p class="text-red-500 text-sm">'), er = pe('<form class="flex flex-col w-full gap-2"><label for="dropzone-file">'), tr = pe('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-3 text-gray-500"><polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16">'), nr = pe('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-3 text-gray-500"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9">'), or = e => {
        const [t, n] = _([]), [o, r] = _(!1), [i, s] = _(0), [a, l] = _(!1), [c, d] = _(), u = o => {
            d(void 0);
            const r = Array.from(o),
                i = e.block.options && "sizeLimit" in e.block.options ? e.block.options?.sizeLimit ?? pt("NEXT_PUBLIC_BOT_FILE_UPLOAD_MAX_SIZE") : void 0;
            if (i && r.some((e => e.size > 1024 * i * 1024))) return d(`A file is larger than ${i}MB`);
            if (!e.block.options?.isMultipleAllowed && o) return h(r[0]);
            if (0 === t().length) return void n(r);
            const s = r.map((e => {
                let n = e.name,
                    o = 1;
                for (; t().some((e => e.name === n));) {
                    const t = e.name.lastIndexOf("."),
                        r = -1 !== t ? e.name.slice(t) : "";
                    n = `${e.name.slice(0,t)}(${o})${r}`, o++
                }
                return new File([e], n, {
                    type: e.type
                })
            }));
            n([...t(), ...s])
        }, p = async e => {
            e.preventDefault(), 0 !== t().length && g(t())
        }, h = async t => {
            if (e.context.isPreview || !e.context.resultId) return e.onSubmit({
                label: e.block.options?.labels?.success?.single ?? Vo.labels.success.single,
                value: "http://fake-upload-url.com"
            });
            r(!0);
            const n = await Go({
                apiHost: e.context.apiHost ?? ht({
                    ignoreChatApiUrl: !0
                }),
                files: [{
                    file: t,
                    input: {
                        sessionId: e.context.sessionId,
                        fileName: t.name
                    }
                }]
            });
            if (r(!1), n.length) return e.onSubmit({
                label: e.block.options?.labels?.success?.single ?? Vo.labels.success.single,
                value: n[0] ? sr(n[0]) : ""
            });
            d("An error occured while uploading the file")
        }, g = async t => {
            const n = e.context.resultId;
            if (e.context.isPreview || !n) return e.onSubmit({
                label: t.length > 1 ? (e.block.options?.labels?.success?.multiple ?? Vo.labels.success.multiple).replaceAll("{total}", t.length.toString()) : e.block.options?.labels?.success?.single ?? Vo.labels.success.single,
                value: t.map(((e, t) => `http://fake-upload-url.com/${t}`)).join(", ")
            });
            r(!0);
            const o = await Go({
                apiHost: e.context.apiHost ?? ht({
                    ignoreChatApiUrl: !0
                }),
                files: t.map((t => ({
                    file: t,
                    input: {
                        sessionId: e.context.sessionId,
                        fileName: t.name
                    }
                }))),
                onUploadProgress: s
            });
            if (r(!1), s(0), o.length !== t.length) return d("An error occured while uploading the files");
            e.onSubmit({
                label: o.length > 1 ? (e.block.options?.labels?.success?.multiple ?? Vo.labels.success.multiple).replaceAll("{total}", o.length.toString()) : e.block.options?.labels?.success?.single ?? Vo.labels.success.single,
                value: o.filter(Me).map(sr).join(", ")
            })
        }, f = e => {
            e.preventDefault(), l(!0)
        }, b = () => l(!1), m = e => {
            e.preventDefault(), e.stopPropagation(), e.dataTransfer?.files && u(e.dataTransfer.files)
        }, y = () => n([]), v = () => e.onSkip(e.block.options?.labels?.skip ?? Vo.labels.skip);
        return (() => {
            const n = er(),
                r = n.firstChild;
            return n.addEventListener("submit", p), r.addEventListener("drop", m), r.addEventListener("dragleave", b), r.addEventListener("dragover", f), ye(r, V(oe, {
                get children() {
                    return [V(re, {
                        get when() {
                            return o()
                        },
                        get children() {
                            return V(ne, {
                                get when() {
                                    return t().length > 1
                                },
                                get fallback() {
                                    return V(qt, {})
                                },
                                get children() {
                                    const e = Wo(),
                                        t = e.firstChild;
                                    return t.style.setProperty("transition", "width 150ms cubic-bezier(0.4, 0, 0.2, 1)"), k((() => null != `${i()>0?i:10}%` ? t.style.setProperty("width", `${i()>0?i:10}%`) : t.style.removeProperty("width"))), e
                                }
                            })
                        }
                    }), V(re, {
                        get when() {
                            return !o()
                        },
                        get children() {
                            return [(() => {
                                const n = Ko(),
                                    o = n.firstChild;
                                return ye(n, V(ne, {
                                    get when() {
                                        return t().length
                                    },
                                    get fallback() {
                                        return V(rr, {})
                                    },
                                    get children() {
                                        const e = Yo(),
                                            n = e.firstChild;
                                        return ye(e, V(ir, {}), n), n.style.setProperty("bottom", "5px"), ye(n, (() => t().length)), e
                                    }
                                }), o), k((() => o.innerHTML = e.block.options?.labels?.placeholder ?? Vo.labels.placeholder)), n
                            })(), (() => {
                                const t = Zo();
                                return t.addEventListener("change", (e => {
                                    e.currentTarget.files && u(e.currentTarget.files)
                                })), k((() => t.multiple = e.block.options?.isMultipleAllowed ?? Vo.isMultipleAllowed)), t
                            })()]
                        }
                    })]
                }
            })), ye(n, V(ne, {
                get when() {
                    return 0 === t().length && !1 === e.block.options?.isRequired
                },
                get children() {
                    const t = Xo();
                    return ye(t, V(Vt, {
                        "on:click": v,
                        get children() {
                            return e.block.options?.labels?.skip ?? Vo.labels.skip
                        }
                    })), t
                }
            }), null), ye(n, V(ne, {
                get when() {
                    return T((() => !!(e.block.options?.isMultipleAllowed && t().length > 0)))() && !o()
                },
                get children() {
                    const n = Jo(),
                        o = n.firstChild;
                    return ye(o, V(ne, {
                        get when() {
                            return t().length
                        },
                        get children() {
                            return V(Vt, {
                                variant: "secondary",
                                "on:click": y,
                                get children() {
                                    return e.block.options?.labels?.clear ?? Vo.labels.clear
                                }
                            })
                        }
                    }), null), ye(o, V(Wt, {
                        type: "submit",
                        disableIcon: !0,
                        get children() {
                            return T((() => (e.block.options?.labels?.button ?? Vo.labels.button) === Vo.labels.button))() ? `Upload ${t().length} file${t().length>1?"s":""}` : e.block.options?.labels?.button
                        }
                    }), null), n
                }
            }), null), ye(n, V(ne, {
                get when() {
                    return c()
                },
                get children() {
                    const e = Qo();
                    return ye(e, c), e
                }
            }), null), k((() => fe(r, "typebot-upload-input py-6 flex flex-col justify-center items-center w-full bg-gray-50 border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100 px-8 " + (a() ? "dragging-over" : "")))), n
        })()
    }, rr = () => tr(), ir = () => nr(), sr = e => {
        const t = e.split("/").pop();
        if (!t) return e;
        const n = encodeURIComponent(t);
        return e.replace(t, n)
    };
(function(e) {
    return e.STRIPE = "Stripe", e
})({}).STRIPE;
const ar = {
        button: "Pay",
        success: "Success"
    },
    lr = pe('<div class="typebot-input-error-message mt-4 text-center animate-fade-in">'),
    cr = pe('<form id="payment-form" class="flex flex-col p-4 typebot-input w-full items-center"><slot name="stripe-payment-form">');
let dr, ur = null,
    pr = null;
const hr = e => {
        const [t, n] = _(), [o, r] = _(!1), [i, s] = _(!1);
        C((async () => {
            if (gr(dr), !e.options?.publicKey) return n("Missing Stripe public key");
            var t;
            if (ur = await (t = e.options?.publicKey, new Promise((e => {
                    if (window.Stripe) return e(window.Stripe(t));
                    const n = document.createElement("script");
                    n.src = "https://js.stripe.com/v3", document.body.appendChild(n), n.onload = () => {
                        if (!window.Stripe) throw new Error("Stripe.js failed to load.");
                        e(window.Stripe(t))
                    }
                }))), !ur) return;
            pr = ur.elements({
                appearance: {
                    theme: "stripe",
                    variables: {
                        colorPrimary: getComputedStyle(dr).getPropertyValue("--typebot-button-bg-color")
                    }
                },
                clientSecret: e.options.paymentIntentSecret
            });
            pr.create("payment", {
                layout: "tabs"
            }).mount("#payment-element"), setTimeout((() => {
                r(!0), e.onTransitionEnd()
            }), 1e3)
        }));
        const a = async t => {
            if (t.preventDefault(), !ur || !pr) return;
            var o;
            s(!0), o = {
                sessionId: e.context.sessionId,
                typebot: e.context.typebot
            }, sessionStorage.setItem("typebotPaymentInProgress", JSON.stringify(o));
            const {
                postalCode: r,
                ...i
            } = e.options?.additionalInformation?.address ?? {}, {
                error: a,
                paymentIntent: l
            } = await ur.confirmPayment({
                elements: pr,
                confirmParams: {
                    return_url: window.location.href,
                    payment_method_data: {
                        billing_details: {
                            name: e.options?.additionalInformation?.name,
                            email: e.options?.additionalInformation?.email,
                            phone: e.options?.additionalInformation?.phoneNumber,
                            address: {
                                ...i,
                                postal_code: r
                            }
                        }
                    }
                },
                redirect: "if_required"
            });
            return ft(), s(!1), "validation_error" !== a?.type ? "card_error" === a?.type ? n(a.message) : a || "succeeded" !== l.status ? void 0 : e.onSuccess() : void 0
        };
        return (() => {
            const n = cr(),
                r = n.firstChild;
            n.addEventListener("submit", a);
            return "function" == typeof dr ? me(dr, r) : dr = r, r._$owner = A(), ye(n, V(ne, {
                get when() {
                    return o()
                },
                get children() {
                    return V(Wt, {
                        get isLoading() {
                            return i()
                        },
                        class: "mt-4 w-full max-w-lg animate-fade-in",
                        disableIcon: !0,
                        get children() {
                            return [T((() => e.options?.labels?.button ?? ar.button)), " ", T((() => e.options?.amountLabel))]
                        }
                    })
                }
            }), null), ye(n, V(ne, {
                get when() {
                    return t()
                },
                get children() {
                    const e = lr();
                    return ye(e, t), e
                }
            }), null), n
        })()
    },
    gr = e => {
        const t = e.getRootNode().host,
            n = document.createElement("div");
        n.style.width = "100%", n.slot = "stripe-payment-form", t.appendChild(n);
        const o = document.createElement("div");
        o.id = "payment-element", n.appendChild(o)
    },
    fr = e => V(hr, {
        get onSuccess() {
            return e.onSuccess
        },
        get options() {
            return e.options
        },
        get context() {
            return e.context
        },
        get onTransitionEnd() {
            return e.onTransitionEnd
        }
    }),
    br = pe('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3px" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12">'),
    mr = e => (() => {
        const t = br();
        return be(t, e, !0, !0), t
    })(),
    yr = pe("<div>"),
    vr = e => (() => {
        const t = yr();
        return ye(t, V(ne, {
            get when() {
                return e.isChecked
            },
            get children() {
                return V(mr, {})
            }
        })), k((() => fe(t, "w-4 h-4 typebot-checkbox" + (e.isChecked ? " checked" : "") + (e.class ? ` ${e.class}` : "")))), t
    })(),
    wr = pe('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2px" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18">'),
    xr = e => (() => {
        const t = wr();
        return be(t, e, !0, !0), t
    })(),
    _r = pe('<button class="w-5 h-5">'),
    kr = pe('<div class="flex justify-between items-center gap-2 w-full pr-4"><input class="focus:outline-none bg-transparent px-4 py-4 flex-1 w-full text-input" type="text">'),
    $r = e => {
        const [t, n] = _(""), [o, r] = J(e, ["onInput", "ref"]), i = () => {
            n(""), e.onClear()
        };
        return (() => {
            const s = kr(),
                a = s.firstChild;
            a.$$input = e => (e => {
                n(e), o.onInput(e)
            })(e.currentTarget.value);
            const l = e.ref;
            return "function" == typeof l ? me(l, a) : e.ref = a, a.style.setProperty("font-size", "16px"), be(a, X({
                get value() {
                    return t()
                }
            }, r), !1, !1), ye(s, V(ne, {
                get when() {
                    return t().length > 0
                },
                get children() {
                    const e = _r();
                    return e.addEventListener("click", i), ye(e, V(xr, {})), e
                }
            }), null), s
        })()
    };
he(["input"]);
const Tr = so,
    Sr = "Filter the options...",
    Cr = pe('<div class="flex items-end typebot-input w-full">'),
    Er = pe('<form class="flex flex-col items-end gap-2 w-full"><div>'),
    Ar = pe('<span><div role="checkbox"><div class="flex items-center gap-2"><span>'),
    Ir = pe('<span><div role="checkbox" aria-checked class="w-full py-2 px-4 font-semibold focus:outline-none cursor-pointer select-none typebot-selectable selected"><div class="flex items-center gap-2"><span>'),
    Pr = e => {
        let t;
        const [n, o] = _(e.defaultItems), [r, i] = _([]);
        C((() => {
            !Dt() && t && t.focus()
        }));
        const s = e => {
                a(e)
            },
            a = e => {
                const t = r().indexOf(e);
                i(-1 !== t ? t => t.filter((t => t !== e)) : t => [...t, e])
            },
            l = () => e.onSubmit({
                value: r().map((t => e.defaultItems.find((e => e.id === t))?.content)).join(", ")
            }),
            c = t => {
                o(e.defaultItems.filter((e => e.content?.toLowerCase().includes((t ?? "").toLowerCase()))))
            };
        return (() => {
            const i = Er(),
                a = i.firstChild;
            return i.addEventListener("submit", l), ye(i, V(ne, {
                get when() {
                    return e.options?.isSearchable
                },
                get children() {
                    const n = Cr();
                    return ye(n, V($r, {
                        ref(e) {
                            "function" == typeof t ? t(e) : t = e
                        },
                        onInput: c,
                        get placeholder() {
                            return e.options?.searchInputPlaceholder ?? Sr
                        },
                        onClear: () => o(e.defaultItems)
                    })), n
                }
            }), a), ye(a, V(te, {
                get each() {
                    return n()
                },
                children: e => (() => {
                    const t = Ar(),
                        n = t.firstChild,
                        o = n.firstChild,
                        i = o.firstChild;
                    return n.addEventListener("click", (() => s(e.id))), ye(o, V(vr, {
                        get isChecked() {
                            return r().some((t => t === e.id))
                        },
                        class: "flex-shrink-0"
                    }), i), ye(i, (() => e.content)), k((o => {
                        const i = "relative" + (Dt() ? " w-full" : ""),
                            s = r().some((t => t === e.id)),
                            a = "w-full py-2 px-4 font-semibold focus:outline-none cursor-pointer select-none typebot-selectable" + (r().some((t => t === e.id)) ? " selected" : ""),
                            l = e.id;
                        return i !== o._v$ && fe(t, o._v$ = i), s !== o._v$2 && ge(n, "aria-checked", o._v$2 = s), a !== o._v$3 && fe(n, o._v$3 = a), l !== o._v$4 && ge(n, "data-itemid", o._v$4 = l), o
                    }), {
                        _v$: void 0,
                        _v$2: void 0,
                        _v$3: void 0,
                        _v$4: void 0
                    }), t
                })()
            }), null), ye(a, V(te, {
                get each() {
                    return r().filter((e => n().every((t => t.id !== e))))
                },
                children: t => (() => {
                    const n = Ir(),
                        o = n.firstChild,
                        r = o.firstChild,
                        i = r.firstChild;
                    return o.addEventListener("click", (() => s(t))), ge(o, "data-itemid", t), ye(r, V(vr, {
                        isChecked: !0
                    }), i), ye(i, (() => e.defaultItems.find((e => e.id === t))?.content)), k((() => fe(n, "relative" + (Dt() ? " w-full" : "")))), n
                })()
            }), null), ye(i, (() => {
                const t = T((() => r().length > 0));
                return () => t() && V(Wt, {
                    disableIcon: !0,
                    get children() {
                        return e.options?.buttonLabel ?? Tr
                    }
                })
            })(), null), k((() => fe(a, "flex flex-wrap justify-end gap-2" + (e.options?.isSearchable ? " overflow-y-scroll max-h-80 rounded-md" : "")))), i
        })()
    },
    Rr = pe('<div class="flex items-end typebot-input w-full">'),
    Lr = pe('<div class="flex flex-col gap-2 w-full"><div>'),
    Nr = pe("<span>"),
    Mr = pe('<span class="flex h-3 w-3 absolute top-0 right-0 -mt-1 -mr-1 ping"><span class="animate-ping absolute inline-flex h-full w-full rounded-full brightness-200 opacity-75"></span><span class="relative inline-flex rounded-full h-3 w-3 brightness-150">'),
    Or = e => {
        let t;
        const [n, o] = _(e.defaultItems);
        C((() => {
            !Dt() && t && t.focus()
        }));
        const r = t => {
            o(e.defaultItems.filter((e => e.content?.toLowerCase().includes((t ?? "").toLowerCase()))))
        };
        return (() => {
            const i = Lr(),
                s = i.firstChild;
            return ye(i, V(ne, {
                get when() {
                    return e.options?.isSearchable
                },
                get children() {
                    const n = Rr();
                    return ye(n, V($r, {
                        ref(e) {
                            "function" == typeof t ? t(e) : t = e
                        },
                        onInput: r,
                        get placeholder() {
                            return e.options?.searchInputPlaceholder ?? Sr
                        },
                        onClear: () => o(e.defaultItems)
                    })), n
                }
            }), s), ye(s, V(te, {
                get each() {
                    return n()
                },
                children: (t, o) => (() => {
                    const r = Nr();
                    return ye(r, V(Vt, {
                        "on:click": () => {
                            return t = o(), e.onSubmit({
                                value: n()[t].content ?? ""
                            });
                            var t
                        },
                        get "data-itemid"() {
                            return t.id
                        },
                        class: "w-full",
                        get children() {
                            return t.content
                        }
                    }), null), ye(r, (() => {
                        const t = T((() => !(0 !== e.chunkIndex || 1 !== e.defaultItems.length)));
                        return () => t() && Mr()
                    })(), null), k((() => fe(r, "relative" + (Dt() ? " w-full" : "")))), r
                })()
            })), k((() => fe(s, "flex flex-wrap justify-end gap-2" + (e.options?.isSearchable ? " overflow-y-scroll max-h-80 rounded-md" : "")))), i
        })()
    },
    Br = pe('<div class="flex items-end typebot-input w-full">'),
    zr = pe('<div class="flex flex-col gap-2 w-full"><div>'),
    Dr = pe('<button><img fetchpriority="high" class="m-auto"><div><span class="font-semibold"></span><span class="text-sm whitespace-pre-wrap text-left">'),
    jr = e => {
        let t;
        const [n, o] = _(e.defaultItems), [r, i] = _(0);
        C((() => {
            !Dt() && t && t.focus()
        }));
        const s = t => {
            o(e.defaultItems.filter((e => e.title?.toLowerCase().includes((t ?? "").toLowerCase()) || e.description?.toLowerCase().includes((t ?? "").toLowerCase()))))
        };
        $((() => {
            r() === e.defaultItems.filter((e => Me(e.pictureSrc))).length && e.onTransitionEnd()
        }));
        const a = () => {
            i((e => e + 1))
        };
        return (() => {
            const r = zr(),
                i = r.firstChild;
            return ye(r, V(ne, {
                get when() {
                    return e.options?.isSearchable
                },
                get children() {
                    const n = Br();
                    return ye(n, V($r, {
                        ref(e) {
                            "function" == typeof t ? t(e) : t = e
                        },
                        onInput: s,
                        get placeholder() {
                            return e.options?.searchInputPlaceholder ?? ""
                        },
                        onClear: () => o(e.defaultItems)
                    })), n
                }
            }), i), ye(i, V(te, {
                get each() {
                    return n()
                },
                children: (t, o) => (() => {
                    const r = Dr(),
                        i = r.firstChild,
                        s = i.nextSibling,
                        l = s.firstChild,
                        c = l.nextSibling;
                    return r.addEventListener("click", (() => (t => {
                        const o = n()[t];
                        return e.onSubmit({
                            label: ze(o.title) ? o.title : o.pictureSrc ?? o.id,
                            value: o.id
                        })
                    })(o()))), i.addEventListener("load", a), ye(l, (() => t.title)), ye(c, (() => t.description)), k((e => {
                        const n = t.id,
                            a = "flex flex-col typebot-picture-button focus:outline-none filter hover:brightness-90 active:brightness-75 justify-between  " + (De(t.pictureSrc) ? "has-svg" : ""),
                            l = t.pictureSrc,
                            c = t.title ?? `Picture ${o()+1}`,
                            d = `Picture choice ${o()+1}`,
                            u = "flex flex-col gap-1 py-2 flex-shrink-0 px-4 w-full" + (t.description ? " items-start" : "");
                        return n !== e._v$ && ge(r, "data-itemid", e._v$ = n), a !== e._v$2 && fe(r, e._v$2 = a), l !== e._v$3 && ge(i, "src", e._v$3 = l), c !== e._v$4 && ge(i, "alt", e._v$4 = c), d !== e._v$5 && ge(i, "elementtiming", e._v$5 = d), u !== e._v$6 && fe(s, e._v$6 = u), e
                    }), {
                        _v$: void 0,
                        _v$2: void 0,
                        _v$3: void 0,
                        _v$4: void 0,
                        _v$5: void 0,
                        _v$6: void 0
                    }), r
                })()
            })), k((() => fe(i, "gap-2 flex flex-wrap justify-end" + (e.options?.isSearchable ? " overflow-y-scroll max-h-[464px] rounded-md" : "")))), r
        })()
    },
    Ur = so,
    Fr = "Filter the options...",
    Hr = pe('<div class="flex items-end typebot-input w-full">'),
    qr = pe('<form class="flex flex-col gap-2 w-full items-end"><div>'),
    Gr = pe('<span class="font-semibold">'),
    Vr = pe('<span class="text-sm whitespace-pre-wrap text-left">'),
    Wr = pe('<div class="flex flex-col gap-1 ">'),
    Yr = pe('<div role="checkbox"><img fetchpriority="high" class="m-auto"><div>'),
    Kr = pe('<div role="checkbox" aria-checked class="flex flex-col focus:outline-none cursor-pointer select-none typebot-selectable-picture selected"><img fetchpriority="high"><div>'),
    Zr = e => {
        let t;
        const [n, o] = _(e.defaultItems), [r, i] = _([]), [s, a] = _(0);
        C((() => {
            !Dt() && t && t.focus()
        }));
        const l = e => {
                c(e)
            },
            c = e => {
                const t = r().indexOf(e);
                i(-1 !== t ? t => t.filter((t => t !== e)) : t => [...t, e])
            },
            d = () => e.onSubmit({
                value: r().map((t => {
                    const n = e.defaultItems.find((e => e.id === t));
                    return ze(n?.title) ? n.title : n?.pictureSrc
                })).join(", ")
            }),
            u = t => {
                o(e.defaultItems.filter((e => e.title?.toLowerCase().includes((t ?? "").toLowerCase()) || e.description?.toLowerCase().includes((t ?? "").toLowerCase()))))
            };
        $((() => {
            s() === e.defaultItems.filter((e => Me(e.pictureSrc))).length && e.onTransitionEnd()
        }));
        const p = () => {
            a((e => e + 1))
        };
        return (() => {
            const i = qr(),
                s = i.firstChild;
            return i.addEventListener("submit", d), ye(i, V(ne, {
                get when() {
                    return e.options?.isSearchable
                },
                get children() {
                    const n = Hr();
                    return ye(n, V($r, {
                        ref(e) {
                            "function" == typeof t ? t(e) : t = e
                        },
                        onInput: u,
                        get placeholder() {
                            return e.options?.searchInputPlaceholder ?? Fr
                        },
                        onClear: () => o(e.defaultItems)
                    })), n
                }
            }), s), ye(s, V(te, {
                get each() {
                    return n()
                },
                children: (e, t) => (() => {
                    const n = Yr(),
                        o = n.firstChild,
                        i = o.nextSibling;
                    return n.addEventListener("click", (() => l(e.id))), o.addEventListener("load", p), ye(i, V(vr, {
                        get isChecked() {
                            return r().some((t => t === e.id))
                        },
                        get class() {
                            return "flex-shrink-0" + (e.title || e.description ? " mt-1" : void 0)
                        }
                    }), null), ye(i, V(ne, {
                        get when() {
                            return e.title || e.description
                        },
                        get children() {
                            const t = Wr();
                            return ye(t, V(ne, {
                                get when() {
                                    return e.title
                                },
                                get children() {
                                    const t = Gr();
                                    return ye(t, (() => e.title)), t
                                }
                            }), null), ye(t, V(ne, {
                                get when() {
                                    return e.description
                                },
                                get children() {
                                    const t = Vr();
                                    return ye(t, (() => e.description)), t
                                }
                            }), null), t
                        }
                    }), null), k((s => {
                        const a = r().some((t => t === e.id)),
                            l = "flex flex-col focus:outline-none cursor-pointer select-none typebot-selectable-picture" + (r().some((t => t === e.id)) ? " selected" : "") + (De(e.pictureSrc) ? " has-svg" : ""),
                            c = e.id,
                            d = e.pictureSrc,
                            u = e.title ?? `Picture ${t()+1}`,
                            p = `Picture choice ${t()+1}`,
                            h = "flex gap-3 py-2 flex-shrink-0" + (Be(e.title) && Be(e.description) ? " justify-center" : " px-3");
                        return a !== s._v$ && ge(n, "aria-checked", s._v$ = a), l !== s._v$2 && fe(n, s._v$2 = l), c !== s._v$3 && ge(n, "data-itemid", s._v$3 = c), d !== s._v$4 && ge(o, "src", s._v$4 = d), u !== s._v$5 && ge(o, "alt", s._v$5 = u), p !== s._v$6 && ge(o, "elementtiming", s._v$6 = p), h !== s._v$7 && fe(i, s._v$7 = h), s
                    }), {
                        _v$: void 0,
                        _v$2: void 0,
                        _v$3: void 0,
                        _v$4: void 0,
                        _v$5: void 0,
                        _v$6: void 0,
                        _v$7: void 0
                    }), n
                })()
            }), null), ye(s, V(te, {
                get each() {
                    return r().filter((e => n().every((t => t.id !== e)))).map((t => e.defaultItems.find((e => e.id === t)))).filter(Me)
                },
                children: (t, n) => (() => {
                    const o = Kr(),
                        i = o.firstChild,
                        s = i.nextSibling;
                    return o.addEventListener("click", (() => l(t.id))), ye(s, V(vr, {
                        get isChecked() {
                            return r().some((e => e === t.id))
                        },
                        get class() {
                            return "flex-shrink-0" + (t.title || t.description ? " mt-1" : void 0)
                        }
                    }), null), ye(s, V(ne, {
                        get when() {
                            return t.title || t.description
                        },
                        get children() {
                            const e = Wr();
                            return ye(e, V(ne, {
                                get when() {
                                    return t.title
                                },
                                get children() {
                                    const e = Gr();
                                    return ye(e, (() => t.title)), e
                                }
                            }), null), ye(e, V(ne, {
                                get when() {
                                    return t.description
                                },
                                get children() {
                                    const e = Vr();
                                    return ye(e, (() => t.description)), e
                                }
                            }), null), e
                        }
                    }), null), k((r => {
                        const a = t.id,
                            l = e.defaultItems.find((e => e.id === t.id))?.pictureSrc,
                            c = t.title ?? `Selected picture ${n()+1}`,
                            d = `Selected picture choice ${n()+1}`,
                            u = "flex gap-3 py-2 flex-shrink-0" + (Be(t.title) && Be(t.description) ? " justify-center" : " pl-4");
                        return a !== r._v$8 && ge(o, "data-itemid", r._v$8 = a), l !== r._v$9 && ge(i, "src", r._v$9 = l), c !== r._v$10 && ge(i, "alt", r._v$10 = c), d !== r._v$11 && ge(i, "elementtiming", r._v$11 = d), u !== r._v$12 && fe(s, r._v$12 = u), r
                    }), {
                        _v$8: void 0,
                        _v$9: void 0,
                        _v$10: void 0,
                        _v$11: void 0,
                        _v$12: void 0
                    }), o
                })()
            }), null), ye(i, (() => {
                const t = T((() => r().length > 0));
                return () => t() && V(Wt, {
                    disableIcon: !0,
                    get children() {
                        return e.options?.buttonLabel ?? Ur
                    }
                })
            })(), null), k((() => fe(s, "flex flex-wrap justify-end gap-2" + (e.options?.isSearchable ? " overflow-y-scroll max-h-[464px] rounded-md" : "")))), i
        })()
    },
    [Xr, Jr] = _([]);
let Qr = function(e) {
    return e.COLOR = "Color", e.IMAGE = "Image", e.NONE = "None", e
}({});
const ei = {
        chat: {
            roundness: "medium",
            hostBubbles: {
                backgroundColor: "#F7F8FF",
                color: "#303235"
            },
            guestBubbles: {
                backgroundColor: "#FF8E21",
                color: "#FFFFFF"
            },
            buttons: {
                backgroundColor: "#0042DA",
                color: "#FFFFFF"
            },
            inputs: {
                backgroundColor: "#FFFFFF",
                color: "#303235",
                placeholderColor: "#9095A0"
            },
            hostAvatar: {
                isEnabled: !0
            },
            guestAvatar: {
                isEnabled: !1
            }
        },
        general: {
            font: {
                type: "Google",
                family: "Open Sans"
            },
            background: {
                type: Qr.COLOR,
                content: "#ffffff"
            },
            progressBar: {
                isEnabled: !1,
                color: "#0042DA",
                backgroundColor: "#e0edff",
                thickness: 4,
                position: "absolute",
                placement: "Top"
            }
        }
    },
    ti = Symbol("store-raw"),
    ni = Symbol("store-node");

function oi(e) {
    let t;
    return null != e && "object" == typeof e && (e[l] || !(t = Object.getPrototypeOf(e)) || t === Object.prototype || Array.isArray(e))
}

function ri(e, t = new Set) {
    let n, o, r, i;
    if (n = null != e && e[ti]) return n;
    if (!oi(e) || t.has(e)) return e;
    if (Array.isArray(e)) {
        Object.isFrozen(e) ? e = e.slice(0) : t.add(e);
        for (let n = 0, i = e.length; n < i; n++) r = e[n], (o = ri(r, t)) !== r && (e[n] = o)
    } else {
        Object.isFrozen(e) ? e = Object.assign({}, e) : t.add(e);
        const n = Object.keys(e),
            s = Object.getOwnPropertyDescriptors(e);
        for (let a = 0, l = n.length; a < l; a++) i = n[a], s[i].get || (r = e[i], (o = ri(r, t)) !== r && (e[i] = o))
    }
    return e
}

function ii(e, t, n) {
    return e[t] || (e[t] = function(e) {
        const [t, n] = _(e, {
            equals: !1,
            internal: !0
        });
        return t.$ = n, t
    }(n))
}

function si(e, t, n, o = !1) {
    if (!o && e[t] === n) return;
    const r = e[t],
        i = e.length;
    void 0 === n ? delete e[t] : e[t] = n;
    let s, a = function(e) {
        let t = e[ni];
        return t || Object.defineProperty(e, ni, {
            value: t = Object.create(null)
        }), t
    }(e);
    if ((s = ii(a, t, r)) && s.$((() => n)), Array.isArray(e) && e.length !== i) {
        for (let t = e.length; t < i; t++)(s = a[t]) && s.$();
        (s = ii(a, "length", i)) && s.$(e.length)
    }(s = a._) && s.$()
}
const ai = Symbol("store-root");

function li(e, t, n, o, r) {
    const i = t[n];
    if (e === i) return;
    if (n !== ai && (!oi(e) || !oi(i) || r && e[r] !== i[r])) return void si(t, n, e);
    if (Array.isArray(e)) {
        if (e.length && i.length && (!o || r && e[0] && null != e[0][r])) {
            let t, n, s, a, l, c, d, u;
            for (s = 0, a = Math.min(i.length, e.length); s < a && (i[s] === e[s] || r && i[s] && e[s] && i[s][r] === e[s][r]); s++) li(e[s], i, s, o, r);
            const p = new Array(e.length),
                h = new Map;
            for (a = i.length - 1, l = e.length - 1; a >= s && l >= s && (i[a] === e[l] || r && i[s] && e[s] && i[a][r] === e[l][r]); a--, l--) p[l] = i[a];
            if (s > l || s > a) {
                for (n = s; n <= l; n++) si(i, n, e[n]);
                for (; n < e.length; n++) si(i, n, p[n]), li(e[n], i, n, o, r);
                return void(i.length > e.length && si(i, "length", e.length))
            }
            for (d = new Array(l + 1), n = l; n >= s; n--) c = e[n], u = r && c ? c[r] : c, t = h.get(u), d[n] = void 0 === t ? -1 : t, h.set(u, n);
            for (t = s; t <= a; t++) c = i[t], u = r && c ? c[r] : c, n = h.get(u), void 0 !== n && -1 !== n && (p[n] = i[t], n = d[n], h.set(u, n));
            for (n = s; n < e.length; n++) n in p ? (si(i, n, p[n]), li(e[n], i, n, o, r)) : si(i, n, e[n])
        } else
            for (let t = 0, n = e.length; t < n; t++) li(e[t], i, t, o, r);
        return void(i.length > e.length && si(i, "length", e.length))
    }
    const s = Object.keys(e);
    for (let t = 0, n = s.length; t < n; t++) li(e[s[t]], i, s[t], o, r);
    const a = Object.keys(i);
    for (let t = 0, n = a.length; t < n; t++) void 0 === e[a[t]] && si(i, a[t], void 0)
}

function ci(e, t = {}) {
    const {
        merge: n,
        key: o = "id"
    } = t, r = ri(e);
    return e => {
        if (!oi(e) || !oi(r)) return r;
        const t = li(r, {
            [ai]: e
        }, ai, n, o);
        return void 0 === t ? e : t
    }
}

function di(e, t) {
    const [n, o] = _(!1);
    if (!t.storage) return [...e, () => !1];
    const r = ui(t.storage || Bn.rememberUser.storage),
        i = JSON.stringify.bind(JSON),
        s = JSON.parse.bind(JSON),
        a = r.getItem(t.key),
        l = "function" == typeof e[0] ? t => e[1]((() => s(t))) : t => e[1](ci(s(t)));
    return a && (l(a), o(!0), t.onRecovered?.()), [e[0], "function" == typeof e[0] ? n => {
        o(!1);
        const s = e[1](n);
        return n ? r.setItem(t.key, i(s)) : r.removeItem(t.key), s
    } : (...n) => {
        o(!1), e[1](...n);
        const s = i(S((() => e[0])));
        r.setItem(t.key, s)
    }, n]
}
const ui = e => "session" === (e ?? Bn.rememberUser.storage) ? sessionStorage : localStorage,
    pi = pe('<div class="flex justify-end animate-fade-in gap-2">'),
    hi = pe("<div>"),
    gi = e => {
        const [t, n] = di(_(), {
            key: `typebot-${e.context.typebot.id}-input-${e.chunkIndex}`,
            storage: e.context.storage
        }), [o, r] = _(), i = async ({
            label: t,
            value: o
        }) => {
            n(t ?? o), e.onSubmit(o ?? t)
        }, s = t => {
            n(t), e.onSkip()
        };
        return $((() => {
            const t = Xr().findLast((t => e.chunkIndex === t.inputIndex))?.formattedMessage;
            t && r(t)
        })), V(oe, {
            get children() {
                return [V(re, {
                    get when() {
                        return t() && !e.hasError
                    },
                    get children() {
                        return V(io, {
                            get message() {
                                return o() ?? t()
                            },
                            get showAvatar() {
                                return e.guestAvatar?.isEnabled ?? ei.chat.guestAvatar.isEnabled
                            },
                            get avatarSrc() {
                                return e.guestAvatar?.url && e.guestAvatar.url
                            }
                        })
                    }
                }), V(re, {
                    get when() {
                        return Oe(t()) || e.hasError
                    },
                    get children() {
                        const n = pi(),
                            o = e.ref;
                        return "function" == typeof o ? me(o, n) : e.ref = n, ye(n, (() => {
                            const t = T((() => !!e.hasHostAvatar));
                            return () => t() && (() => {
                                const e = hi();
                                return k((() => fe(e, "flex flex-shrink-0 items-center " + (Dt() ? "w-6 h-6" : "w-10 h-10")))), e
                            })()
                        })(), null), ye(n, V(fi, {
                            get context() {
                                return e.context
                            },
                            get block() {
                                return e.block
                            },
                            get chunkIndex() {
                                return e.chunkIndex
                            },
                            get isInputPrefillEnabled() {
                                return e.isInputPrefillEnabled
                            },
                            get existingAnswer() {
                                return T((() => !!e.hasError))() ? t() : void 0
                            },
                            get onTransitionEnd() {
                                return e.onTransitionEnd
                            },
                            onSubmit: i,
                            onSkip: s
                        }), null), k((() => ge(n, "data-blockid", e.block.id))), n
                    }
                })]
            }
        })
    },
    fi = e => {
        const t = t => e.onSubmit(t),
            n = () => e.existingAnswer ?? (e.isInputPrefillEnabled ? e.block.prefilledValue : void 0),
            o = () => e.onSubmit({
                value: e.block.options?.labels?.success ?? ar.success
            });
        return V(oe, {
            get children() {
                return [V(re, {
                    get when() {
                        return e.block.type === ao.TEXT
                    },
                    get children() {
                        return V(uo, {
                            get block() {
                                return e.block
                            },
                            get defaultValue() {
                                return n()
                            },
                            onSubmit: t
                        })
                    }
                }), V(re, {
                    get when() {
                        return e.block.type === ao.NUMBER
                    },
                    get children() {
                        return V(go, {
                            get block() {
                                return e.block
                            },
                            get defaultValue() {
                                return n()
                            },
                            onSubmit: t
                        })
                    }
                }), V(re, {
                    get when() {
                        return e.block.type === ao.EMAIL
                    },
                    get children() {
                        return V(mo, {
                            get block() {
                                return e.block
                            },
                            get defaultValue() {
                                return n()
                            },
                            onSubmit: t
                        })
                    }
                }), V(re, {
                    get when() {
                        return e.block.type === ao.URL
                    },
                    get children() {
                        return V(wo, {
                            get block() {
                                return e.block
                            },
                            get defaultValue() {
                                return n()
                            },
                            onSubmit: t
                        })
                    }
                }), V(re, {
                    get when() {
                        return e.block.type === ao.PHONE
                    },
                    get children() {
                        return V(Co, {
                            get labels() {
                                return e.block.options?.labels
                            },
                            get defaultCountryCode() {
                                return e.block.options?.defaultCountryCode
                            },
                            get defaultValue() {
                                return n()
                            },
                            onSubmit: t
                        })
                    }
                }), V(re, {
                    get when() {
                        return e.block.type === ao.DATE
                    },
                    get children() {
                        return V(Ro, {
                            get options() {
                                return e.block.options
                            },
                            get defaultValue() {
                                return n()
                            },
                            onSubmit: t
                        })
                    }
                }), V(re, {
                    get when() {
                        return bi(e.block)
                    },
                    keyed: !0,
                    children: n => V(oe, {
                        get children() {
                            return [V(re, {
                                get when() {
                                    return !n.options?.isMultipleChoice
                                },
                                get children() {
                                    return V(Or, {
                                        get chunkIndex() {
                                            return e.chunkIndex
                                        },
                                        get defaultItems() {
                                            return n.items
                                        },
                                        get options() {
                                            return n.options
                                        },
                                        onSubmit: t
                                    })
                                }
                            }), V(re, {
                                get when() {
                                    return n.options?.isMultipleChoice
                                },
                                get children() {
                                    return V(Pr, {
                                        get defaultItems() {
                                            return n.items
                                        },
                                        get options() {
                                            return n.options
                                        },
                                        onSubmit: t
                                    })
                                }
                            })]
                        }
                    })
                }), V(re, {
                    get when() {
                        return mi(e.block)
                    },
                    keyed: !0,
                    children: n => V(oe, {
                        get children() {
                            return [V(re, {
                                get when() {
                                    return !n.options?.isMultipleChoice
                                },
                                get children() {
                                    return V(jr, {
                                        get defaultItems() {
                                            return n.items
                                        },
                                        get options() {
                                            return n.options
                                        },
                                        onSubmit: t,
                                        get onTransitionEnd() {
                                            return e.onTransitionEnd
                                        }
                                    })
                                }
                            }), V(re, {
                                get when() {
                                    return n.options?.isMultipleChoice
                                },
                                get children() {
                                    return V(Zr, {
                                        get defaultItems() {
                                            return n.items
                                        },
                                        get options() {
                                            return n.options
                                        },
                                        onSubmit: t,
                                        get onTransitionEnd() {
                                            return e.onTransitionEnd
                                        }
                                    })
                                }
                            })]
                        }
                    })
                }), V(re, {
                    get when() {
                        return e.block.type === ao.RATING
                    },
                    get children() {
                        return V(Fo, {
                            get block() {
                                return e.block
                            },
                            get defaultValue() {
                                return n()
                            },
                            onSubmit: t
                        })
                    }
                }), V(re, {
                    get when() {
                        return e.block.type === ao.FILE
                    },
                    get children() {
                        return V(or, {
                            get context() {
                                return e.context
                            },
                            get block() {
                                return e.block
                            },
                            onSubmit: t,
                            get onSkip() {
                                return e.onSkip
                            }
                        })
                    }
                }), V(re, {
                    get when() {
                        return e.block.type === ao.PAYMENT
                    },
                    get children() {
                        return V(fr, {
                            get context() {
                                return e.context
                            },
                            get options() {
                                return {
                                    ...e.block.options,
                                    ...e.block.runtimeOptions
                                }
                            },
                            onSuccess: o,
                            get onTransitionEnd() {
                                return e.onTransitionEnd
                            }
                        })
                    }
                })]
            }
        })
    },
    bi = e => e?.type === ao.CHOICE ? e : void 0,
    mi = e => e?.type === ao.PICTURE_CHOICE ? e : void 0,
    yi = pe("<div><div>"),
    vi = e => {
        let t;
        const [n, o] = _(0), r = new ResizeObserver((e => o(e[0].target.clientHeight - (Dt() ? 24 : 40))));
        return C((() => {
            t && r.observe(t)
        })), E((() => {
            t && r.unobserve(t)
        })), (() => {
            const o = yi(),
                r = o.firstChild;
            return "function" == typeof t ? me(t, o) : t = o, ye(r, V(oo, {
                get initialAvatarSrc() {
                    return e.hostAvatarSrc
                }
            })), k((t => {
                const i = "flex flex-shrink-0 items-center relative typebot-avatar-container " + (Dt() ? "w-6" : "w-10"),
                    s = "absolute flex items-center top-0" + (Dt() ? " w-6 h-6" : " w-10 h-10") + (e.hideAvatar ? " opacity-0" : " opacity-100"),
                    a = `${n()}px`,
                    l = e.isTransitionDisabled ? void 0 : "top 350ms ease-out, opacity 250ms ease-out";
                return i !== t._v$ && fe(o, t._v$ = i), s !== t._v$2 && fe(r, t._v$2 = s), a !== t._v$3 && (null != (t._v$3 = a) ? r.style.setProperty("top", a) : r.style.removeProperty("top")), l !== t._v$4 && (null != (t._v$4 = l) ? r.style.setProperty("transition", l) : r.style.removeProperty("transition")), t
            }), {
                _v$: void 0,
                _v$2: void 0,
                _v$3: void 0,
                _v$4: void 0
            }), o
        })()
    },
    [wi, xi] = _();

function _i() {
    return {
        async: !1,
        breaks: !1,
        extensions: null,
        gfm: !0,
        hooks: null,
        pedantic: !1,
        renderer: null,
        silent: !1,
        tokenizer: null,
        walkTokens: null
    }
}
let ki = {
    async: !1,
    breaks: !1,
    extensions: null,
    gfm: !0,
    hooks: null,
    pedantic: !1,
    renderer: null,
    silent: !1,
    tokenizer: null,
    walkTokens: null
};

function $i(e) {
    ki = e
}
const Ti = /[&<>"']/,
    Si = new RegExp(Ti.source, "g"),
    Ci = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
    Ei = new RegExp(Ci.source, "g"),
    Ai = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    },
    Ii = e => Ai[e];

function Pi(e, t) {
    if (t) {
        if (Ti.test(e)) return e.replace(Si, Ii)
    } else if (Ci.test(e)) return e.replace(Ei, Ii);
    return e
}
const Ri = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;

function Li(e) {
    return e.replace(Ri, ((e, t) => "colon" === (t = t.toLowerCase()) ? ":" : "#" === t.charAt(0) ? "x" === t.charAt(1) ? String.fromCharCode(parseInt(t.substring(2), 16)) : String.fromCharCode(+t.substring(1)) : ""))
}
const Ni = /(^|[^\[])\^/g;

function Mi(e, t) {
    e = "string" == typeof e ? e : e.source, t = t || "";
    const n = {
        replace: (t, o) => (o = (o = "object" == typeof o && "source" in o ? o.source : o).replace(Ni, "$1"), e = e.replace(t, o), n),
        getRegex: () => new RegExp(e, t)
    };
    return n
}

function Oi(e) {
    try {
        e = encodeURI(e).replace(/%25/g, "%")
    } catch (e) {
        return null
    }
    return e
}
const Bi = {
    exec: () => null
};

function zi(e, t) {
    const n = e.replace(/\|/g, ((e, t, n) => {
        let o = !1,
            r = t;
        for (; --r >= 0 && "\\" === n[r];) o = !o;
        return o ? "|" : " |"
    })).split(/ \|/);
    let o = 0;
    if (n[0].trim() || n.shift(), n.length > 0 && !n[n.length - 1].trim() && n.pop(), t)
        if (n.length > t) n.splice(t);
        else
            for (; n.length < t;) n.push("");
    for (; o < n.length; o++) n[o] = n[o].trim().replace(/\\\|/g, "|");
    return n
}

function Di(e, t, n) {
    const o = e.length;
    if (0 === o) return "";
    let r = 0;
    for (; r < o;) {
        const i = e.charAt(o - r - 1);
        if (i !== t || n) {
            if (i === t || !n) break;
            r++
        } else r++
    }
    return e.slice(0, o - r)
}

function ji(e, t, n, o) {
    const r = t.href,
        i = t.title ? Pi(t.title) : null,
        s = e[1].replace(/\\([\[\]])/g, "$1");
    if ("!" !== e[0].charAt(0)) {
        o.state.inLink = !0;
        const e = {
            type: "link",
            raw: n,
            href: r,
            title: i,
            text: s,
            tokens: o.inlineTokens(s)
        };
        return o.state.inLink = !1, e
    }
    return {
        type: "image",
        raw: n,
        href: r,
        title: i,
        text: Pi(s)
    }
}
class Ui {
    options;
    rules;
    lexer;
    constructor(e) {
        this.options = e || ki
    }
    space(e) {
        const t = this.rules.block.newline.exec(e);
        if (t && t[0].length > 0) return {
            type: "space",
            raw: t[0]
        }
    }
    code(e) {
        const t = this.rules.block.code.exec(e);
        if (t) {
            const e = t[0].replace(/^ {1,4}/gm, "");
            return {
                type: "code",
                raw: t[0],
                codeBlockStyle: "indented",
                text: this.options.pedantic ? e : Di(e, "\n")
            }
        }
    }
    fences(e) {
        const t = this.rules.block.fences.exec(e);
        if (t) {
            const e = t[0],
                n = function(e, t) {
                    const n = e.match(/^(\s+)(?:```)/);
                    if (null === n) return t;
                    const o = n[1];
                    return t.split("\n").map((e => {
                        const t = e.match(/^\s+/);
                        if (null === t) return e;
                        const [n] = t;
                        return n.length >= o.length ? e.slice(o.length) : e
                    })).join("\n")
                }(e, t[3] || "");
            return {
                type: "code",
                raw: e,
                lang: t[2] ? t[2].trim().replace(this.rules.inline._escapes, "$1") : t[2],
                text: n
            }
        }
    }
    heading(e) {
        const t = this.rules.block.heading.exec(e);
        if (t) {
            let e = t[2].trim();
            if (/#$/.test(e)) {
                const t = Di(e, "#");
                this.options.pedantic ? e = t.trim() : t && !/ $/.test(t) || (e = t.trim())
            }
            return {
                type: "heading",
                raw: t[0],
                depth: t[1].length,
                text: e,
                tokens: this.lexer.inline(e)
            }
        }
    }
    hr(e) {
        const t = this.rules.block.hr.exec(e);
        if (t) return {
            type: "hr",
            raw: t[0]
        }
    }
    blockquote(e) {
        const t = this.rules.block.blockquote.exec(e);
        if (t) {
            const e = t[0].replace(/^ *>[ \t]?/gm, ""),
                n = this.lexer.state.top;
            this.lexer.state.top = !0;
            const o = this.lexer.blockTokens(e);
            return this.lexer.state.top = n, {
                type: "blockquote",
                raw: t[0],
                tokens: o,
                text: e
            }
        }
    }
    list(e) {
        let t = this.rules.block.list.exec(e);
        if (t) {
            let n = t[1].trim();
            const o = n.length > 1,
                r = {
                    type: "list",
                    raw: "",
                    ordered: o,
                    start: o ? +n.slice(0, -1) : "",
                    loose: !1,
                    items: []
                };
            n = o ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = o ? n : "[*+-]");
            const i = new RegExp(`^( {0,3}${n})((?:[\t ][^\\n]*)?(?:\\n|$))`);
            let s = "",
                a = "",
                l = !1;
            for (; e;) {
                let n = !1;
                if (!(t = i.exec(e))) break;
                if (this.rules.block.hr.test(e)) break;
                s = t[0], e = e.substring(s.length);
                let o = t[2].split("\n", 1)[0].replace(/^\t+/, (e => " ".repeat(3 * e.length))),
                    c = e.split("\n", 1)[0],
                    d = 0;
                this.options.pedantic ? (d = 2, a = o.trimStart()) : (d = t[2].search(/[^ ]/), d = d > 4 ? 1 : d, a = o.slice(d), d += t[1].length);
                let u = !1;
                if (!o && /^ *$/.test(c) && (s += c + "\n", e = e.substring(c.length + 1), n = !0), !n) {
                    const t = new RegExp(`^ {0,${Math.min(3,d-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`),
                        n = new RegExp(`^ {0,${Math.min(3,d-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),
                        r = new RegExp(`^ {0,${Math.min(3,d-1)}}(?:\`\`\`|~~~)`),
                        i = new RegExp(`^ {0,${Math.min(3,d-1)}}#`);
                    for (; e;) {
                        const l = e.split("\n", 1)[0];
                        if (c = l, this.options.pedantic && (c = c.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")), r.test(c)) break;
                        if (i.test(c)) break;
                        if (t.test(c)) break;
                        if (n.test(e)) break;
                        if (c.search(/[^ ]/) >= d || !c.trim()) a += "\n" + c.slice(d);
                        else {
                            if (u) break;
                            if (o.search(/[^ ]/) >= 4) break;
                            if (r.test(o)) break;
                            if (i.test(o)) break;
                            if (n.test(o)) break;
                            a += "\n" + c
                        }
                        u || c.trim() || (u = !0), s += l + "\n", e = e.substring(l.length + 1), o = c.slice(d)
                    }
                }
                r.loose || (l ? r.loose = !0 : /\n *\n *$/.test(s) && (l = !0));
                let p, h = null;
                this.options.gfm && (h = /^\[[ xX]\] /.exec(a), h && (p = "[ ] " !== h[0], a = a.replace(/^\[[ xX]\] +/, ""))), r.items.push({
                    type: "list_item",
                    raw: s,
                    task: !!h,
                    checked: p,
                    loose: !1,
                    text: a,
                    tokens: []
                }), r.raw += s
            }
            r.items[r.items.length - 1].raw = s.trimEnd(), r.items[r.items.length - 1].text = a.trimEnd(), r.raw = r.raw.trimEnd();
            for (let e = 0; e < r.items.length; e++)
                if (this.lexer.state.top = !1, r.items[e].tokens = this.lexer.blockTokens(r.items[e].text, []), !r.loose) {
                    const t = r.items[e].tokens.filter((e => "space" === e.type)),
                        n = t.length > 0 && t.some((e => /\n.*\n/.test(e.raw)));
                    r.loose = n
                } if (r.loose)
                for (let e = 0; e < r.items.length; e++) r.items[e].loose = !0;
            return r
        }
    }
    html(e) {
        const t = this.rules.block.html.exec(e);
        if (t) {
            return {
                type: "html",
                block: !0,
                raw: t[0],
                pre: "pre" === t[1] || "script" === t[1] || "style" === t[1],
                text: t[0]
            }
        }
    }
    def(e) {
        const t = this.rules.block.def.exec(e);
        if (t) {
            const e = t[1].toLowerCase().replace(/\s+/g, " "),
                n = t[2] ? t[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline._escapes, "$1") : "",
                o = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline._escapes, "$1") : t[3];
            return {
                type: "def",
                tag: e,
                raw: t[0],
                href: n,
                title: o
            }
        }
    }
    table(e) {
        const t = this.rules.block.table.exec(e);
        if (t) {
            if (!/[:|]/.test(t[2])) return;
            const e = {
                type: "table",
                raw: t[0],
                header: zi(t[1]).map((e => ({
                    text: e,
                    tokens: []
                }))),
                align: t[2].replace(/^\||\| *$/g, "").split("|"),
                rows: t[3] && t[3].trim() ? t[3].replace(/\n[ \t]*$/, "").split("\n") : []
            };
            if (e.header.length === e.align.length) {
                let t, n, o, r, i = e.align.length;
                for (t = 0; t < i; t++) {
                    const n = e.align[t];
                    n && (/^ *-+: *$/.test(n) ? e.align[t] = "right" : /^ *:-+: *$/.test(n) ? e.align[t] = "center" : /^ *:-+ *$/.test(n) ? e.align[t] = "left" : e.align[t] = null)
                }
                for (i = e.rows.length, t = 0; t < i; t++) e.rows[t] = zi(e.rows[t], e.header.length).map((e => ({
                    text: e,
                    tokens: []
                })));
                for (i = e.header.length, n = 0; n < i; n++) e.header[n].tokens = this.lexer.inline(e.header[n].text);
                for (i = e.rows.length, n = 0; n < i; n++)
                    for (r = e.rows[n], o = 0; o < r.length; o++) r[o].tokens = this.lexer.inline(r[o].text);
                return e
            }
        }
    }
    lheading(e) {
        const t = this.rules.block.lheading.exec(e);
        if (t) return {
            type: "heading",
            raw: t[0],
            depth: "=" === t[2].charAt(0) ? 1 : 2,
            text: t[1],
            tokens: this.lexer.inline(t[1])
        }
    }
    paragraph(e) {
        const t = this.rules.block.paragraph.exec(e);
        if (t) {
            const e = "\n" === t[1].charAt(t[1].length - 1) ? t[1].slice(0, -1) : t[1];
            return {
                type: "paragraph",
                raw: t[0],
                text: e,
                tokens: this.lexer.inline(e)
            }
        }
    }
    text(e) {
        const t = this.rules.block.text.exec(e);
        if (t) return {
            type: "text",
            raw: t[0],
            text: t[0],
            tokens: this.lexer.inline(t[0])
        }
    }
    escape(e) {
        const t = this.rules.inline.escape.exec(e);
        if (t) return {
            type: "escape",
            raw: t[0],
            text: Pi(t[1])
        }
    }
    tag(e) {
        const t = this.rules.inline.tag.exec(e);
        if (t) return !this.lexer.state.inLink && /^<a /i.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && /^<\/a>/i.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0]) && (this.lexer.state.inRawBlock = !1), {
            type: "html",
            raw: t[0],
            inLink: this.lexer.state.inLink,
            inRawBlock: this.lexer.state.inRawBlock,
            block: !1,
            text: t[0]
        }
    }
    link(e) {
        const t = this.rules.inline.link.exec(e);
        if (t) {
            const e = t[2].trim();
            if (!this.options.pedantic && /^</.test(e)) {
                if (!/>$/.test(e)) return;
                const t = Di(e.slice(0, -1), "\\");
                if ((e.length - t.length) % 2 == 0) return
            } else {
                const e = function(e, t) {
                    if (-1 === e.indexOf(t[1])) return -1;
                    let n = 0;
                    for (let o = 0; o < e.length; o++)
                        if ("\\" === e[o]) o++;
                        else if (e[o] === t[0]) n++;
                    else if (e[o] === t[1] && (n--, n < 0)) return o;
                    return -1
                }(t[2], "()");
                if (e > -1) {
                    const n = (0 === t[0].indexOf("!") ? 5 : 4) + t[1].length + e;
                    t[2] = t[2].substring(0, e), t[0] = t[0].substring(0, n).trim(), t[3] = ""
                }
            }
            let n = t[2],
                o = "";
            if (this.options.pedantic) {
                const e = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(n);
                e && (n = e[1], o = e[3])
            } else o = t[3] ? t[3].slice(1, -1) : "";
            return n = n.trim(), /^</.test(n) && (n = this.options.pedantic && !/>$/.test(e) ? n.slice(1) : n.slice(1, -1)), ji(t, {
                href: n ? n.replace(this.rules.inline._escapes, "$1") : n,
                title: o ? o.replace(this.rules.inline._escapes, "$1") : o
            }, t[0], this.lexer)
        }
    }
    reflink(e, t) {
        let n;
        if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
            let e = (n[2] || n[1]).replace(/\s+/g, " ");
            if (e = t[e.toLowerCase()], !e) {
                const e = n[0].charAt(0);
                return {
                    type: "text",
                    raw: e,
                    text: e
                }
            }
            return ji(n, e, n[0], this.lexer)
        }
    }
    emStrong(e, t, n = "") {
        let o = this.rules.inline.emStrong.lDelim.exec(e);
        if (!o) return;
        if (o[3] && n.match(/[\p{L}\p{N}]/u)) return;
        if (!(o[1] || o[2] || "") || !n || this.rules.inline.punctuation.exec(n)) {
            const n = [...o[0]].length - 1;
            let r, i, s = n,
                a = 0;
            const l = "*" === o[0][0] ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
            for (l.lastIndex = 0, t = t.slice(-1 * e.length + o[0].length - 1); null != (o = l.exec(t));) {
                if (r = o[1] || o[2] || o[3] || o[4] || o[5] || o[6], !r) continue;
                if (i = [...r].length, o[3] || o[4]) {
                    s += i;
                    continue
                }
                if ((o[5] || o[6]) && n % 3 && !((n + i) % 3)) {
                    a += i;
                    continue
                }
                if (s -= i, s > 0) continue;
                i = Math.min(i, i + s + a);
                const t = [...e].slice(0, n + o.index + i + 1).join("");
                if (Math.min(n, i) % 2) {
                    const e = t.slice(1, -1);
                    return {
                        type: "em",
                        raw: t,
                        text: e,
                        tokens: this.lexer.inlineTokens(e)
                    }
                }
                const l = t.slice(2, -2);
                return {
                    type: "strong",
                    raw: t,
                    text: l,
                    tokens: this.lexer.inlineTokens(l)
                }
            }
        }
    }
    codespan(e) {
        const t = this.rules.inline.code.exec(e);
        if (t) {
            let e = t[2].replace(/\n/g, " ");
            const n = /[^ ]/.test(e),
                o = /^ /.test(e) && / $/.test(e);
            return n && o && (e = e.substring(1, e.length - 1)), e = Pi(e, !0), {
                type: "codespan",
                raw: t[0],
                text: e
            }
        }
    }
    br(e) {
        const t = this.rules.inline.br.exec(e);
        if (t) return {
            type: "br",
            raw: t[0]
        }
    }
    del(e) {
        const t = this.rules.inline.del.exec(e);
        if (t) return {
            type: "del",
            raw: t[0],
            text: t[2],
            tokens: this.lexer.inlineTokens(t[2])
        }
    }
    autolink(e) {
        const t = this.rules.inline.autolink.exec(e);
        if (t) {
            let e, n;
            return "@" === t[2] ? (e = Pi(t[1]), n = "mailto:" + e) : (e = Pi(t[1]), n = e), {
                type: "link",
                raw: t[0],
                text: e,
                href: n,
                tokens: [{
                    type: "text",
                    raw: e,
                    text: e
                }]
            }
        }
    }
    url(e) {
        let t;
        if (t = this.rules.inline.url.exec(e)) {
            let e, n;
            if ("@" === t[2]) e = Pi(t[0]), n = "mailto:" + e;
            else {
                let o;
                do {
                    o = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])[0]
                } while (o !== t[0]);
                e = Pi(t[0]), n = "www." === t[1] ? "http://" + t[0] : t[0]
            }
            return {
                type: "link",
                raw: t[0],
                text: e,
                href: n,
                tokens: [{
                    type: "text",
                    raw: e,
                    text: e
                }]
            }
        }
    }
    inlineText(e) {
        const t = this.rules.inline.text.exec(e);
        if (t) {
            let e;
            return e = this.lexer.state.inRawBlock ? t[0] : Pi(t[0]), {
                type: "text",
                raw: t[0],
                text: e
            }
        }
    }
}
const Fi = {
    newline: /^(?: *(?:\n|$))+/,
    code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
    fences: /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
    hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
    heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
    blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
    list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
    html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
    def: /^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
    table: Bi,
    lheading: /^(?!bull )((?:.|\n(?!\s*?\n|bull ))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
    _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
    text: /^[^\n]+/,
    _label: /(?!\s*\])(?:\\.|[^\[\]\\])+/,
    _title: /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/
};
Fi.def = Mi(Fi.def).replace("label", Fi._label).replace("title", Fi._title).getRegex(), Fi.bullet = /(?:[*+-]|\d{1,9}[.)])/, Fi.listItemStart = Mi(/^( *)(bull) */).replace("bull", Fi.bullet).getRegex(), Fi.list = Mi(Fi.list).replace(/bull/g, Fi.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + Fi.def.source + ")").getRegex(), Fi._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", Fi._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/, Fi.html = Mi(Fi.html, "i").replace("comment", Fi._comment).replace("tag", Fi._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), Fi.lheading = Mi(Fi.lheading).replace(/bull/g, Fi.bullet).getRegex(), Fi.paragraph = Mi(Fi._paragraph).replace("hr", Fi.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Fi._tag).getRegex(), Fi.blockquote = Mi(Fi.blockquote).replace("paragraph", Fi.paragraph).getRegex(), Fi.normal = {
    ...Fi
}, Fi.gfm = {
    ...Fi.normal,
    table: "^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
}, Fi.gfm.table = Mi(Fi.gfm.table).replace("hr", Fi.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Fi._tag).getRegex(), Fi.gfm.paragraph = Mi(Fi._paragraph).replace("hr", Fi.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("table", Fi.gfm.table).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Fi._tag).getRegex(), Fi.pedantic = {
    ...Fi.normal,
    html: Mi("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment", Fi._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^(#{1,6})(.*)(?:\n+|$)/,
    fences: Bi,
    lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
    paragraph: Mi(Fi.normal._paragraph).replace("hr", Fi.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", Fi.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
};
const Hi = {
    escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
    autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
    url: Bi,
    tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
    link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
    reflink: /^!?\[(label)\]\[(ref)\]/,
    nolink: /^!?\[(ref)\](?:\[\])?/,
    reflinkSearch: "reflink|nolink(?!\\()",
    emStrong: {
        lDelim: /^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,
        rDelimAst: /^[^_*]*?__[^_*]*?\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\*)[punct](\*+)(?=[\s]|$)|[^punct\s](\*+)(?!\*)(?=[punct\s]|$)|(?!\*)[punct\s](\*+)(?=[^punct\s])|[\s](\*+)(?!\*)(?=[punct])|(?!\*)[punct](\*+)(?!\*)(?=[punct])|[^punct\s](\*+)(?=[^punct\s])/,
        rDelimUnd: /^[^_*]*?\*\*[^_*]*?_[^_*]*?(?=\*\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\s]|$)|[^punct\s](_+)(?!_)(?=[punct\s]|$)|(?!_)[punct\s](_+)(?=[^punct\s])|[\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])/
    },
    code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
    br: /^( {2,}|\\)\n(?!\s*$)/,
    del: Bi,
    text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
    punctuation: /^((?![*_])[\spunctuation])/,
    _punctuation: "\\p{P}$+<=>`^|~"
};
Hi.punctuation = Mi(Hi.punctuation, "u").replace(/punctuation/g, Hi._punctuation).getRegex(), Hi.blockSkip = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g, Hi.anyPunctuation = /\\[punct]/g, Hi._escapes = /\\([punct])/g, Hi._comment = Mi(Fi._comment).replace("(?:--\x3e|$)", "--\x3e").getRegex(), Hi.emStrong.lDelim = Mi(Hi.emStrong.lDelim, "u").replace(/punct/g, Hi._punctuation).getRegex(), Hi.emStrong.rDelimAst = Mi(Hi.emStrong.rDelimAst, "gu").replace(/punct/g, Hi._punctuation).getRegex(), Hi.emStrong.rDelimUnd = Mi(Hi.emStrong.rDelimUnd, "gu").replace(/punct/g, Hi._punctuation).getRegex(), Hi.anyPunctuation = Mi(Hi.anyPunctuation, "gu").replace(/punct/g, Hi._punctuation).getRegex(), Hi._escapes = Mi(Hi._escapes, "gu").replace(/punct/g, Hi._punctuation).getRegex(), Hi._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/, Hi._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/, Hi.autolink = Mi(Hi.autolink).replace("scheme", Hi._scheme).replace("email", Hi._email).getRegex(), Hi._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/, Hi.tag = Mi(Hi.tag).replace("comment", Hi._comment).replace("attribute", Hi._attribute).getRegex(), Hi._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, Hi._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/, Hi._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/, Hi.link = Mi(Hi.link).replace("label", Hi._label).replace("href", Hi._href).replace("title", Hi._title).getRegex(), Hi.reflink = Mi(Hi.reflink).replace("label", Hi._label).replace("ref", Fi._label).getRegex(), Hi.nolink = Mi(Hi.nolink).replace("ref", Fi._label).getRegex(), Hi.reflinkSearch = Mi(Hi.reflinkSearch, "g").replace("reflink", Hi.reflink).replace("nolink", Hi.nolink).getRegex(), Hi.normal = {
    ...Hi
}, Hi.pedantic = {
    ...Hi.normal,
    strong: {
        start: /^__|\*\*/,
        middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
        endAst: /\*\*(?!\*)/g,
        endUnd: /__(?!_)/g
    },
    em: {
        start: /^_|\*/,
        middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
        endAst: /\*(?!\*)/g,
        endUnd: /_(?!_)/g
    },
    link: Mi(/^!?\[(label)\]\((.*?)\)/).replace("label", Hi._label).getRegex(),
    reflink: Mi(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Hi._label).getRegex()
}, Hi.gfm = {
    ...Hi.normal,
    escape: Mi(Hi.escape).replace("])", "~|])").getRegex(),
    _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
    url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
    _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
    del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
    text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
}, Hi.gfm.url = Mi(Hi.gfm.url, "i").replace("email", Hi.gfm._extended_email).getRegex(), Hi.breaks = {
    ...Hi.gfm,
    br: Mi(Hi.br).replace("{2,}", "*").getRegex(),
    text: Mi(Hi.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
};
class qi {
    tokens;
    options;
    state;
    tokenizer;
    inlineQueue;
    constructor(e) {
        this.tokens = [], this.tokens.links = Object.create(null), this.options = e || ki, this.options.tokenizer = this.options.tokenizer || new Ui, this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
            inLink: !1,
            inRawBlock: !1,
            top: !0
        };
        const t = {
            block: Fi.normal,
            inline: Hi.normal
        };
        this.options.pedantic ? (t.block = Fi.pedantic, t.inline = Hi.pedantic) : this.options.gfm && (t.block = Fi.gfm, this.options.breaks ? t.inline = Hi.breaks : t.inline = Hi.gfm), this.tokenizer.rules = t
    }
    static get rules() {
        return {
            block: Fi,
            inline: Hi
        }
    }
    static lex(e, t) {
        return new qi(t).lex(e)
    }
    static lexInline(e, t) {
        return new qi(t).inlineTokens(e)
    }
    lex(e) {
        let t;
        for (e = e.replace(/\r\n|\r/g, "\n"), this.blockTokens(e, this.tokens); t = this.inlineQueue.shift();) this.inlineTokens(t.src, t.tokens);
        return this.tokens
    }
    blockTokens(e, t = []) {
        let n, o, r, i;
        for (e = this.options.pedantic ? e.replace(/\t/g, "    ").replace(/^ +$/gm, "") : e.replace(/^( *)(\t+)/gm, ((e, t, n) => t + "    ".repeat(n.length))); e;)
            if (!(this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((o => !!(n = o.call({
                    lexer: this
                }, e, t)) && (e = e.substring(n.raw.length), t.push(n), !0)))))
                if (n = this.tokenizer.space(e)) e = e.substring(n.raw.length), 1 === n.raw.length && t.length > 0 ? t[t.length - 1].raw += "\n" : t.push(n);
                else if (n = this.tokenizer.code(e)) e = e.substring(n.raw.length), o = t[t.length - 1], !o || "paragraph" !== o.type && "text" !== o.type ? t.push(n) : (o.raw += "\n" + n.raw, o.text += "\n" + n.text, this.inlineQueue[this.inlineQueue.length - 1].src = o.text);
        else if (n = this.tokenizer.fences(e)) e = e.substring(n.raw.length), t.push(n);
        else if (n = this.tokenizer.heading(e)) e = e.substring(n.raw.length), t.push(n);
        else if (n = this.tokenizer.hr(e)) e = e.substring(n.raw.length), t.push(n);
        else if (n = this.tokenizer.blockquote(e)) e = e.substring(n.raw.length), t.push(n);
        else if (n = this.tokenizer.list(e)) e = e.substring(n.raw.length), t.push(n);
        else if (n = this.tokenizer.html(e)) e = e.substring(n.raw.length), t.push(n);
        else if (n = this.tokenizer.def(e)) e = e.substring(n.raw.length), o = t[t.length - 1], !o || "paragraph" !== o.type && "text" !== o.type ? this.tokens.links[n.tag] || (this.tokens.links[n.tag] = {
            href: n.href,
            title: n.title
        }) : (o.raw += "\n" + n.raw, o.text += "\n" + n.raw, this.inlineQueue[this.inlineQueue.length - 1].src = o.text);
        else if (n = this.tokenizer.table(e)) e = e.substring(n.raw.length), t.push(n);
        else if (n = this.tokenizer.lheading(e)) e = e.substring(n.raw.length), t.push(n);
        else {
            if (r = e, this.options.extensions && this.options.extensions.startBlock) {
                let t = 1 / 0;
                const n = e.slice(1);
                let o;
                this.options.extensions.startBlock.forEach((e => {
                    o = e.call({
                        lexer: this
                    }, n), "number" == typeof o && o >= 0 && (t = Math.min(t, o))
                })), t < 1 / 0 && t >= 0 && (r = e.substring(0, t + 1))
            }
            if (this.state.top && (n = this.tokenizer.paragraph(r))) o = t[t.length - 1], i && "paragraph" === o.type ? (o.raw += "\n" + n.raw, o.text += "\n" + n.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = o.text) : t.push(n), i = r.length !== e.length, e = e.substring(n.raw.length);
            else if (n = this.tokenizer.text(e)) e = e.substring(n.raw.length), o = t[t.length - 1], o && "text" === o.type ? (o.raw += "\n" + n.raw, o.text += "\n" + n.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = o.text) : t.push(n);
            else if (e) {
                const t = "Infinite loop on byte: " + e.charCodeAt(0);
                if (this.options.silent) {
                    console.error(t);
                    break
                }
                throw new Error(t)
            }
        }
        return this.state.top = !0, t
    }
    inline(e, t = []) {
        return this.inlineQueue.push({
            src: e,
            tokens: t
        }), t
    }
    inlineTokens(e, t = []) {
        let n, o, r, i, s, a, l = e;
        if (this.tokens.links) {
            const e = Object.keys(this.tokens.links);
            if (e.length > 0)
                for (; null != (i = this.tokenizer.rules.inline.reflinkSearch.exec(l));) e.includes(i[0].slice(i[0].lastIndexOf("[") + 1, -1)) && (l = l.slice(0, i.index) + "[" + "a".repeat(i[0].length - 2) + "]" + l.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))
        }
        for (; null != (i = this.tokenizer.rules.inline.blockSkip.exec(l));) l = l.slice(0, i.index) + "[" + "a".repeat(i[0].length - 2) + "]" + l.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
        for (; null != (i = this.tokenizer.rules.inline.anyPunctuation.exec(l));) l = l.slice(0, i.index) + "++" + l.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
        for (; e;)
            if (s || (a = ""), s = !1, !(this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((o => !!(n = o.call({
                    lexer: this
                }, e, t)) && (e = e.substring(n.raw.length), t.push(n), !0)))))
                if (n = this.tokenizer.escape(e)) e = e.substring(n.raw.length), t.push(n);
                else if (n = this.tokenizer.tag(e)) e = e.substring(n.raw.length), o = t[t.length - 1], o && "text" === n.type && "text" === o.type ? (o.raw += n.raw, o.text += n.text) : t.push(n);
        else if (n = this.tokenizer.link(e)) e = e.substring(n.raw.length), t.push(n);
        else if (n = this.tokenizer.reflink(e, this.tokens.links)) e = e.substring(n.raw.length), o = t[t.length - 1], o && "text" === n.type && "text" === o.type ? (o.raw += n.raw, o.text += n.text) : t.push(n);
        else if (n = this.tokenizer.emStrong(e, l, a)) e = e.substring(n.raw.length), t.push(n);
        else if (n = this.tokenizer.codespan(e)) e = e.substring(n.raw.length), t.push(n);
        else if (n = this.tokenizer.br(e)) e = e.substring(n.raw.length), t.push(n);
        else if (n = this.tokenizer.del(e)) e = e.substring(n.raw.length), t.push(n);
        else if (n = this.tokenizer.autolink(e)) e = e.substring(n.raw.length), t.push(n);
        else if (this.state.inLink || !(n = this.tokenizer.url(e))) {
            if (r = e, this.options.extensions && this.options.extensions.startInline) {
                let t = 1 / 0;
                const n = e.slice(1);
                let o;
                this.options.extensions.startInline.forEach((e => {
                    o = e.call({
                        lexer: this
                    }, n), "number" == typeof o && o >= 0 && (t = Math.min(t, o))
                })), t < 1 / 0 && t >= 0 && (r = e.substring(0, t + 1))
            }
            if (n = this.tokenizer.inlineText(r)) e = e.substring(n.raw.length), "_" !== n.raw.slice(-1) && (a = n.raw.slice(-1)), s = !0, o = t[t.length - 1], o && "text" === o.type ? (o.raw += n.raw, o.text += n.text) : t.push(n);
            else if (e) {
                const t = "Infinite loop on byte: " + e.charCodeAt(0);
                if (this.options.silent) {
                    console.error(t);
                    break
                }
                throw new Error(t)
            }
        } else e = e.substring(n.raw.length), t.push(n);
        return t
    }
}
class Gi {
    options;
    constructor(e) {
        this.options = e || ki
    }
    code(e, t, n) {
        const o = (t || "").match(/^\S*/)?.[0];
        return e = e.replace(/\n$/, "") + "\n", o ? '<pre><code class="language-' + Pi(o) + '">' + (n ? e : Pi(e, !0)) + "</code></pre>\n" : "<pre><code>" + (n ? e : Pi(e, !0)) + "</code></pre>\n"
    }
    blockquote(e) {
        return `<blockquote>\n${e}</blockquote>\n`
    }
    html(e, t) {
        return e
    }
    heading(e, t, n) {
        return `<h${t}>${e}</h${t}>\n`
    }
    hr() {
        return "<hr>\n"
    }
    list(e, t, n) {
        const o = t ? "ol" : "ul";
        return "<" + o + (t && 1 !== n ? ' start="' + n + '"' : "") + ">\n" + e + "</" + o + ">\n"
    }
    listitem(e, t, n) {
        return `<li>${e}</li>\n`
    }
    checkbox(e) {
        return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox">'
    }
    paragraph(e) {
        return `<p>${e}</p>\n`
    }
    table(e, t) {
        return t && (t = `<tbody>${t}</tbody>`), "<table>\n<thead>\n" + e + "</thead>\n" + t + "</table>\n"
    }
    tablerow(e) {
        return `<tr>\n${e}</tr>\n`
    }
    tablecell(e, t) {
        const n = t.header ? "th" : "td";
        return (t.align ? `<${n} align="${t.align}">` : `<${n}>`) + e + `</${n}>\n`
    }
    strong(e) {
        return `<strong>${e}</strong>`
    }
    em(e) {
        return `<em>${e}</em>`
    }
    codespan(e) {
        return `<code>${e}</code>`
    }
    br() {
        return "<br>"
    }
    del(e) {
        return `<del>${e}</del>`
    }
    link(e, t, n) {
        const o = Oi(e);
        if (null === o) return n;
        let r = '<a href="' + (e = o) + '"';
        return t && (r += ' title="' + t + '"'), r += ">" + n + "</a>", r
    }
    image(e, t, n) {
        const o = Oi(e);
        if (null === o) return n;
        let r = `<img src="${e=o}" alt="${n}"`;
        return t && (r += ` title="${t}"`), r += ">", r
    }
    text(e) {
        return e
    }
}
class Vi {
    strong(e) {
        return e
    }
    em(e) {
        return e
    }
    codespan(e) {
        return e
    }
    del(e) {
        return e
    }
    html(e) {
        return e
    }
    text(e) {
        return e
    }
    link(e, t, n) {
        return "" + n
    }
    image(e, t, n) {
        return "" + n
    }
    br() {
        return ""
    }
}
class Wi {
    options;
    renderer;
    textRenderer;
    constructor(e) {
        this.options = e || ki, this.options.renderer = this.options.renderer || new Gi, this.renderer = this.options.renderer, this.renderer.options = this.options, this.textRenderer = new Vi
    }
    static parse(e, t) {
        return new Wi(t).parse(e)
    }
    static parseInline(e, t) {
        return new Wi(t).parseInline(e)
    }
    parse(e, t = !0) {
        let n = "";
        for (let o = 0; o < e.length; o++) {
            const r = e[o];
            if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[r.type]) {
                const e = r,
                    t = this.options.extensions.renderers[e.type].call({
                        parser: this
                    }, e);
                if (!1 !== t || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(e.type)) {
                    n += t || "";
                    continue
                }
            }
            switch (r.type) {
                case "space":
                    continue;
                case "hr":
                    n += this.renderer.hr();
                    continue;
                case "heading": {
                    const e = r;
                    n += this.renderer.heading(this.parseInline(e.tokens), e.depth, Li(this.parseInline(e.tokens, this.textRenderer)));
                    continue
                }
                case "code": {
                    const e = r;
                    n += this.renderer.code(e.text, e.lang, !!e.escaped);
                    continue
                }
                case "table": {
                    const e = r;
                    let t = "",
                        o = "";
                    for (let t = 0; t < e.header.length; t++) o += this.renderer.tablecell(this.parseInline(e.header[t].tokens), {
                        header: !0,
                        align: e.align[t]
                    });
                    t += this.renderer.tablerow(o);
                    let i = "";
                    for (let t = 0; t < e.rows.length; t++) {
                        const n = e.rows[t];
                        o = "";
                        for (let t = 0; t < n.length; t++) o += this.renderer.tablecell(this.parseInline(n[t].tokens), {
                            header: !1,
                            align: e.align[t]
                        });
                        i += this.renderer.tablerow(o)
                    }
                    n += this.renderer.table(t, i);
                    continue
                }
                case "blockquote": {
                    const e = r,
                        t = this.parse(e.tokens);
                    n += this.renderer.blockquote(t);
                    continue
                }
                case "list": {
                    const e = r,
                        t = e.ordered,
                        o = e.start,
                        i = e.loose;
                    let s = "";
                    for (let t = 0; t < e.items.length; t++) {
                        const n = e.items[t],
                            o = n.checked,
                            r = n.task;
                        let a = "";
                        if (n.task) {
                            const e = this.renderer.checkbox(!!o);
                            i ? n.tokens.length > 0 && "paragraph" === n.tokens[0].type ? (n.tokens[0].text = e + " " + n.tokens[0].text, n.tokens[0].tokens && n.tokens[0].tokens.length > 0 && "text" === n.tokens[0].tokens[0].type && (n.tokens[0].tokens[0].text = e + " " + n.tokens[0].tokens[0].text)) : n.tokens.unshift({
                                type: "text",
                                text: e + " "
                            }) : a += e + " "
                        }
                        a += this.parse(n.tokens, i), s += this.renderer.listitem(a, r, !!o)
                    }
                    n += this.renderer.list(s, t, o);
                    continue
                }
                case "html": {
                    const e = r;
                    n += this.renderer.html(e.text, e.block);
                    continue
                }
                case "paragraph": {
                    const e = r;
                    n += this.renderer.paragraph(this.parseInline(e.tokens));
                    continue
                }
                case "text": {
                    let i = r,
                        s = i.tokens ? this.parseInline(i.tokens) : i.text;
                    for (; o + 1 < e.length && "text" === e[o + 1].type;) i = e[++o], s += "\n" + (i.tokens ? this.parseInline(i.tokens) : i.text);
                    n += t ? this.renderer.paragraph(s) : s;
                    continue
                }
                default: {
                    const e = 'Token with "' + r.type + '" type was not found.';
                    if (this.options.silent) return console.error(e), "";
                    throw new Error(e)
                }
            }
        }
        return n
    }
    parseInline(e, t) {
        t = t || this.renderer;
        let n = "";
        for (let o = 0; o < e.length; o++) {
            const r = e[o];
            if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[r.type]) {
                const e = this.options.extensions.renderers[r.type].call({
                    parser: this
                }, r);
                if (!1 !== e || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(r.type)) {
                    n += e || "";
                    continue
                }
            }
            switch (r.type) {
                case "escape": {
                    const e = r;
                    n += t.text(e.text);
                    break
                }
                case "html": {
                    const e = r;
                    n += t.html(e.text);
                    break
                }
                case "link": {
                    const e = r;
                    n += t.link(e.href, e.title, this.parseInline(e.tokens, t));
                    break
                }
                case "image": {
                    const e = r;
                    n += t.image(e.href, e.title, e.text);
                    break
                }
                case "strong": {
                    const e = r;
                    n += t.strong(this.parseInline(e.tokens, t));
                    break
                }
                case "em": {
                    const e = r;
                    n += t.em(this.parseInline(e.tokens, t));
                    break
                }
                case "codespan": {
                    const e = r;
                    n += t.codespan(e.text);
                    break
                }
                case "br":
                    n += t.br();
                    break;
                case "del": {
                    const e = r;
                    n += t.del(this.parseInline(e.tokens, t));
                    break
                }
                case "text": {
                    const e = r;
                    n += t.text(e.text);
                    break
                }
                default: {
                    const e = 'Token with "' + r.type + '" type was not found.';
                    if (this.options.silent) return console.error(e), "";
                    throw new Error(e)
                }
            }
        }
        return n
    }
}
class Yi {
    options;
    constructor(e) {
        this.options = e || ki
    }
    static passThroughHooks = new Set(["preprocess", "postprocess"]);
    preprocess(e) {
        return e
    }
    postprocess(e) {
        return e
    }
}
const Ki = new class {
    defaults = {
        async: !1,
        breaks: !1,
        extensions: null,
        gfm: !0,
        hooks: null,
        pedantic: !1,
        renderer: null,
        silent: !1,
        tokenizer: null,
        walkTokens: null
    };
    options = this.setOptions;
    parse = this.#e(qi.lex, Wi.parse);
    parseInline = this.#e(qi.lexInline, Wi.parseInline);
    Parser = Wi;
    parser = Wi.parse;
    Renderer = Gi;
    TextRenderer = Vi;
    Lexer = qi;
    lexer = qi.lex;
    Tokenizer = Ui;
    Hooks = Yi;
    constructor(...e) {
        this.use(...e)
    }
    walkTokens(e, t) {
        let n = [];
        for (const o of e) switch (n = n.concat(t.call(this, o)), o.type) {
            case "table": {
                const e = o;
                for (const o of e.header) n = n.concat(this.walkTokens(o.tokens, t));
                for (const o of e.rows)
                    for (const e of o) n = n.concat(this.walkTokens(e.tokens, t));
                break
            }
            case "list": {
                const e = o;
                n = n.concat(this.walkTokens(e.items, t));
                break
            }
            default: {
                const e = o;
                this.defaults.extensions?.childTokens?.[e.type] ? this.defaults.extensions.childTokens[e.type].forEach((o => {
                    n = n.concat(this.walkTokens(e[o], t))
                })) : e.tokens && (n = n.concat(this.walkTokens(e.tokens, t)))
            }
        }
        return n
    }
    use(...e) {
        const t = this.defaults.extensions || {
            renderers: {},
            childTokens: {}
        };
        return e.forEach((e => {
            const n = {
                ...e
            };
            if (n.async = this.defaults.async || n.async || !1, e.extensions && (e.extensions.forEach((e => {
                    if (!e.name) throw new Error("extension name required");
                    if ("renderer" in e) {
                        const n = t.renderers[e.name];
                        t.renderers[e.name] = n ? function(...t) {
                            let o = e.renderer.apply(this, t);
                            return !1 === o && (o = n.apply(this, t)), o
                        } : e.renderer
                    }
                    if ("tokenizer" in e) {
                        if (!e.level || "block" !== e.level && "inline" !== e.level) throw new Error("extension level must be 'block' or 'inline'");
                        const n = t[e.level];
                        n ? n.unshift(e.tokenizer) : t[e.level] = [e.tokenizer], e.start && ("block" === e.level ? t.startBlock ? t.startBlock.push(e.start) : t.startBlock = [e.start] : "inline" === e.level && (t.startInline ? t.startInline.push(e.start) : t.startInline = [e.start]))
                    }
                    "childTokens" in e && e.childTokens && (t.childTokens[e.name] = e.childTokens)
                })), n.extensions = t), e.renderer) {
                const t = this.defaults.renderer || new Gi(this.defaults);
                for (const n in e.renderer) {
                    const o = e.renderer[n],
                        r = n,
                        i = t[r];
                    t[r] = (...e) => {
                        let n = o.apply(t, e);
                        return !1 === n && (n = i.apply(t, e)), n || ""
                    }
                }
                n.renderer = t
            }
            if (e.tokenizer) {
                const t = this.defaults.tokenizer || new Ui(this.defaults);
                for (const n in e.tokenizer) {
                    const o = e.tokenizer[n],
                        r = n,
                        i = t[r];
                    t[r] = (...e) => {
                        let n = o.apply(t, e);
                        return !1 === n && (n = i.apply(t, e)), n
                    }
                }
                n.tokenizer = t
            }
            if (e.hooks) {
                const t = this.defaults.hooks || new Yi;
                for (const n in e.hooks) {
                    const o = e.hooks[n],
                        r = n,
                        i = t[r];
                    Yi.passThroughHooks.has(n) ? t[r] = e => {
                        if (this.defaults.async) return Promise.resolve(o.call(t, e)).then((e => i.call(t, e)));
                        const n = o.call(t, e);
                        return i.call(t, n)
                    } : t[r] = (...e) => {
                        let n = o.apply(t, e);
                        return !1 === n && (n = i.apply(t, e)), n
                    }
                }
                n.hooks = t
            }
            if (e.walkTokens) {
                const t = this.defaults.walkTokens,
                    o = e.walkTokens;
                n.walkTokens = function(e) {
                    let n = [];
                    return n.push(o.call(this, e)), t && (n = n.concat(t.call(this, e))), n
                }
            }
            this.defaults = {
                ...this.defaults,
                ...n
            }
        })), this
    }
    setOptions(e) {
        return this.defaults = {
            ...this.defaults,
            ...e
        }, this
    }
    #e(e, t) {
        return (n, o) => {
            const r = {
                    ...o
                },
                i = {
                    ...this.defaults,
                    ...r
                };
            !0 === this.defaults.async && !1 === r.async && (i.silent || console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."), i.async = !0);
            const s = this.#t(!!i.silent, !!i.async);
            if (null == n) return s(new Error("marked(): input parameter is undefined or null"));
            if ("string" != typeof n) return s(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n) + ", string expected"));
            if (i.hooks && (i.hooks.options = i), i.async) return Promise.resolve(i.hooks ? i.hooks.preprocess(n) : n).then((t => e(t, i))).then((e => i.walkTokens ? Promise.all(this.walkTokens(e, i.walkTokens)).then((() => e)) : e)).then((e => t(e, i))).then((e => i.hooks ? i.hooks.postprocess(e) : e)).catch(s);
            try {
                i.hooks && (n = i.hooks.preprocess(n));
                const o = e(n, i);
                i.walkTokens && this.walkTokens(o, i.walkTokens);
                let r = t(o, i);
                return i.hooks && (r = i.hooks.postprocess(r)), r
            } catch (e) {
                return s(e)
            }
        }
    }
    #t(e, t) {
        return n => {
            if (n.message += "\nPlease report this to https://github.com/markedjs/marked.", e) {
                const e = "<p>An error occurred:</p><pre>" + Pi(n.message + "", !0) + "</pre>";
                return t ? Promise.resolve(e) : e
            }
            if (t) return Promise.reject(n);
            throw n
        }
    }
};

function Zi(e, t) {
    return Ki.parse(e, t)
}
Zi.options = Zi.setOptions = function(e) {
    return Ki.setOptions(e), Zi.defaults = Ki.defaults, $i(Zi.defaults), Zi
}, Zi.getDefaults = _i, Zi.defaults = ki, Zi.use = function(...e) {
    return Ki.use(...e), Zi.defaults = Ki.defaults, $i(Zi.defaults), Zi
}, Zi.walkTokens = function(e, t) {
    return Ki.walkTokens(e, t)
}, Zi.parseInline = Ki.parseInline, Zi.Parser = Wi, Zi.parser = Wi.parse, Zi.Renderer = Gi, Zi.TextRenderer = Vi, Zi.Lexer = qi, Zi.lexer = qi.lex, Zi.Tokenizer = Ui, Zi.Hooks = Yi, Zi.parse = Zi, Zi.options, Zi.setOptions, Zi.use, Zi.walkTokens, Zi.parseInline;
/*! @license DOMPurify 3.0.6 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.0.6/LICENSE */
const {
    entries: Xi,
    setPrototypeOf: Ji,
    isFrozen: Qi,
    getPrototypeOf: es,
    getOwnPropertyDescriptor: ts
} = Object;
let {
    freeze: ns,
    seal: os,
    create: rs
} = Object, {
    apply: is,
    construct: ss
} = "undefined" != typeof Reflect && Reflect;
ns || (ns = function(e) {
    return e
}), os || (os = function(e) {
    return e
}), is || (is = function(e, t, n) {
    return e.apply(t, n)
}), ss || (ss = function(e, t) {
    return new e(...t)
});
const as = vs(Array.prototype.forEach),
    ls = vs(Array.prototype.pop),
    cs = vs(Array.prototype.push),
    ds = vs(String.prototype.toLowerCase),
    us = vs(String.prototype.toString),
    ps = vs(String.prototype.match),
    hs = vs(String.prototype.replace),
    gs = vs(String.prototype.indexOf),
    fs = vs(String.prototype.trim),
    bs = vs(RegExp.prototype.test),
    ms = (ys = TypeError, function() {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        return ss(ys, t)
    });
var ys;

function vs(e) {
    return function(t) {
        for (var n = arguments.length, o = new Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++) o[r - 1] = arguments[r];
        return is(e, t, o)
    }
}

function ws(e, t) {
    let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ds;
    Ji && Ji(e, null);
    let o = t.length;
    for (; o--;) {
        let r = t[o];
        if ("string" == typeof r) {
            const e = n(r);
            e !== r && (Qi(t) || (t[o] = e), r = e)
        }
        e[r] = !0
    }
    return e
}

function xs(e) {
    const t = rs(null);
    for (const [n, o] of Xi(e)) void 0 !== ts(e, n) && (t[n] = o);
    return t
}

function _s(e, t) {
    for (; null !== e;) {
        const n = ts(e, t);
        if (n) {
            if (n.get) return vs(n.get);
            if ("function" == typeof n.value) return vs(n.value)
        }
        e = es(e)
    }
    return function(e) {
        return console.warn("fallback value for", e), null
    }
}
const ks = ns(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]),
    $s = ns(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]),
    Ts = ns(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]),
    Ss = ns(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]),
    Cs = ns(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]),
    Es = ns(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]),
    As = ns(["#text"]),
    Is = ns(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "xmlns", "slot"]),
    Ps = ns(["accent-height", "accumulate", "additive", "alignment-baseline", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]),
    Rs = ns(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]),
    Ls = ns(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]),
    Ns = os(/\{\{[\w\W]*|[\w\W]*\}\}/gm),
    Ms = os(/<%[\w\W]*|[\w\W]*%>/gm),
    Os = os(/\${[\w\W]*}/gm),
    Bs = os(/^data-[\-\w.\u00B7-\uFFFF]/),
    zs = os(/^aria-[\-\w]+$/),
    Ds = os(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),
    js = os(/^(?:\w+script|data):/i),
    Us = os(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),
    Fs = os(/^html$/i);
var Hs = Object.freeze({
    __proto__: null,
    MUSTACHE_EXPR: Ns,
    ERB_EXPR: Ms,
    TMPLIT_EXPR: Os,
    DATA_ATTR: Bs,
    ARIA_ATTR: zs,
    IS_ALLOWED_URI: Ds,
    IS_SCRIPT_OR_DATA: js,
    ATTR_WHITESPACE: Us,
    DOCTYPE_NAME: Fs
});
const qs = function() {
    return "undefined" == typeof window ? null : window
};
var Gs = function e() {
    let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : qs();
    const n = t => e(t);
    if (n.version = "3.0.6", n.removed = [], !t || !t.document || 9 !== t.document.nodeType) return n.isSupported = !1, n;
    let {
        document: o
    } = t;
    const r = o,
        i = r.currentScript,
        {
            DocumentFragment: s,
            HTMLTemplateElement: a,
            Node: l,
            Element: c,
            NodeFilter: d,
            NamedNodeMap: u = t.NamedNodeMap || t.MozNamedAttrMap,
            HTMLFormElement: p,
            DOMParser: h,
            trustedTypes: g
        } = t,
        f = c.prototype,
        b = _s(f, "cloneNode"),
        m = _s(f, "nextSibling"),
        y = _s(f, "childNodes"),
        v = _s(f, "parentNode");
    if ("function" == typeof a) {
        const e = o.createElement("template");
        e.content && e.content.ownerDocument && (o = e.content.ownerDocument)
    }
    let w, x = "";
    const {
        implementation: _,
        createNodeIterator: k,
        createDocumentFragment: $,
        getElementsByTagName: T
    } = o, {
        importNode: S
    } = r;
    let C = {};
    n.isSupported = "function" == typeof Xi && "function" == typeof v && _ && void 0 !== _.createHTMLDocument;
    const {
        MUSTACHE_EXPR: E,
        ERB_EXPR: A,
        TMPLIT_EXPR: I,
        DATA_ATTR: P,
        ARIA_ATTR: R,
        IS_SCRIPT_OR_DATA: L,
        ATTR_WHITESPACE: N
    } = Hs;
    let {
        IS_ALLOWED_URI: M
    } = Hs, O = null;
    const B = ws({}, [...ks, ...$s, ...Ts, ...Cs, ...As]);
    let z = null;
    const D = ws({}, [...Is, ...Ps, ...Rs, ...Ls]);
    let j = Object.seal(rs(null, {
            tagNameCheck: {
                writable: !0,
                configurable: !1,
                enumerable: !0,
                value: null
            },
            attributeNameCheck: {
                writable: !0,
                configurable: !1,
                enumerable: !0,
                value: null
            },
            allowCustomizedBuiltInElements: {
                writable: !0,
                configurable: !1,
                enumerable: !0,
                value: !1
            }
        })),
        U = null,
        F = null,
        H = !0,
        q = !0,
        G = !1,
        V = !0,
        W = !1,
        Y = !1,
        K = !1,
        Z = !1,
        X = !1,
        J = !1,
        Q = !1,
        ee = !0,
        te = !1,
        ne = !0,
        oe = !1,
        re = {},
        ie = null;
    const se = ws({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
    let ae = null;
    const le = ws({}, ["audio", "video", "img", "source", "image", "track"]);
    let ce = null;
    const de = ws({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]),
        ue = "http://www.w3.org/1998/Math/MathML",
        pe = "http://www.w3.org/2000/svg",
        he = "http://www.w3.org/1999/xhtml";
    let ge = he,
        fe = !1,
        be = null;
    const me = ws({}, [ue, pe, he], us);
    let ye = null;
    const ve = ["application/xhtml+xml", "text/html"];
    let we = null,
        xe = null;
    const _e = o.createElement("form"),
        ke = function(e) {
            return e instanceof RegExp || e instanceof Function
        },
        $e = function() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if (!xe || xe !== e) {
                if (e && "object" == typeof e || (e = {}), e = xs(e), ye = ye = -1 === ve.indexOf(e.PARSER_MEDIA_TYPE) ? "text/html" : e.PARSER_MEDIA_TYPE, we = "application/xhtml+xml" === ye ? us : ds, O = "ALLOWED_TAGS" in e ? ws({}, e.ALLOWED_TAGS, we) : B, z = "ALLOWED_ATTR" in e ? ws({}, e.ALLOWED_ATTR, we) : D, be = "ALLOWED_NAMESPACES" in e ? ws({}, e.ALLOWED_NAMESPACES, us) : me, ce = "ADD_URI_SAFE_ATTR" in e ? ws(xs(de), e.ADD_URI_SAFE_ATTR, we) : de, ae = "ADD_DATA_URI_TAGS" in e ? ws(xs(le), e.ADD_DATA_URI_TAGS, we) : le, ie = "FORBID_CONTENTS" in e ? ws({}, e.FORBID_CONTENTS, we) : se, U = "FORBID_TAGS" in e ? ws({}, e.FORBID_TAGS, we) : {}, F = "FORBID_ATTR" in e ? ws({}, e.FORBID_ATTR, we) : {}, re = "USE_PROFILES" in e && e.USE_PROFILES, H = !1 !== e.ALLOW_ARIA_ATTR, q = !1 !== e.ALLOW_DATA_ATTR, G = e.ALLOW_UNKNOWN_PROTOCOLS || !1, V = !1 !== e.ALLOW_SELF_CLOSE_IN_ATTR, W = e.SAFE_FOR_TEMPLATES || !1, Y = e.WHOLE_DOCUMENT || !1, X = e.RETURN_DOM || !1, J = e.RETURN_DOM_FRAGMENT || !1, Q = e.RETURN_TRUSTED_TYPE || !1, Z = e.FORCE_BODY || !1, ee = !1 !== e.SANITIZE_DOM, te = e.SANITIZE_NAMED_PROPS || !1, ne = !1 !== e.KEEP_CONTENT, oe = e.IN_PLACE || !1, M = e.ALLOWED_URI_REGEXP || Ds, ge = e.NAMESPACE || he, j = e.CUSTOM_ELEMENT_HANDLING || {}, e.CUSTOM_ELEMENT_HANDLING && ke(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (j.tagNameCheck = e.CUSTOM_ELEMENT_HANDLING.tagNameCheck), e.CUSTOM_ELEMENT_HANDLING && ke(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (j.attributeNameCheck = e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), e.CUSTOM_ELEMENT_HANDLING && "boolean" == typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (j.allowCustomizedBuiltInElements = e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), W && (q = !1), J && (X = !0), re && (O = ws({}, [...As]), z = [], !0 === re.html && (ws(O, ks), ws(z, Is)), !0 === re.svg && (ws(O, $s), ws(z, Ps), ws(z, Ls)), !0 === re.svgFilters && (ws(O, Ts), ws(z, Ps), ws(z, Ls)), !0 === re.mathMl && (ws(O, Cs), ws(z, Rs), ws(z, Ls))), e.ADD_TAGS && (O === B && (O = xs(O)), ws(O, e.ADD_TAGS, we)), e.ADD_ATTR && (z === D && (z = xs(z)), ws(z, e.ADD_ATTR, we)), e.ADD_URI_SAFE_ATTR && ws(ce, e.ADD_URI_SAFE_ATTR, we), e.FORBID_CONTENTS && (ie === se && (ie = xs(ie)), ws(ie, e.FORBID_CONTENTS, we)), ne && (O["#text"] = !0), Y && ws(O, ["html", "head", "body"]), O.table && (ws(O, ["tbody"]), delete U.tbody), e.TRUSTED_TYPES_POLICY) {
                    if ("function" != typeof e.TRUSTED_TYPES_POLICY.createHTML) throw ms('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
                    if ("function" != typeof e.TRUSTED_TYPES_POLICY.createScriptURL) throw ms('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
                    w = e.TRUSTED_TYPES_POLICY, x = w.createHTML("")
                } else void 0 === w && (w = function(e, t) {
                    if ("object" != typeof e || "function" != typeof e.createPolicy) return null;
                    let n = null;
                    const o = "data-tt-policy-suffix";
                    t && t.hasAttribute(o) && (n = t.getAttribute(o));
                    const r = "dompurify" + (n ? "#" + n : "");
                    try {
                        return e.createPolicy(r, {
                            createHTML: e => e,
                            createScriptURL: e => e
                        })
                    } catch (e) {
                        return console.warn("TrustedTypes policy " + r + " could not be created."), null
                    }
                }(g, i)), null !== w && "string" == typeof x && (x = w.createHTML(""));
                ns && ns(e), xe = e
            }
        },
        Te = ws({}, ["mi", "mo", "mn", "ms", "mtext"]),
        Se = ws({}, ["foreignobject", "desc", "title", "annotation-xml"]),
        Ce = ws({}, ["title", "style", "font", "a", "script"]),
        Ee = ws({}, $s);
    ws(Ee, Ts), ws(Ee, Ss);
    const Ae = ws({}, Cs);
    ws(Ae, Es);
    const Ie = function(e) {
            cs(n.removed, {
                element: e
            });
            try {
                e.parentNode.removeChild(e)
            } catch (t) {
                e.remove()
            }
        },
        Pe = function(e, t) {
            try {
                cs(n.removed, {
                    attribute: t.getAttributeNode(e),
                    from: t
                })
            } catch (e) {
                cs(n.removed, {
                    attribute: null,
                    from: t
                })
            }
            if (t.removeAttribute(e), "is" === e && !z[e])
                if (X || J) try {
                    Ie(t)
                } catch (e) {} else try {
                    t.setAttribute(e, "")
                } catch (e) {}
        },
        Re = function(e) {
            let t = null,
                n = null;
            if (Z) e = "<remove></remove>" + e;
            else {
                const t = ps(e, /^[\r\n\t ]+/);
                n = t && t[0]
            }
            "application/xhtml+xml" === ye && ge === he && (e = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + e + "</body></html>");
            const r = w ? w.createHTML(e) : e;
            if (ge === he) try {
                t = (new h).parseFromString(r, ye)
            } catch (e) {}
            if (!t || !t.documentElement) {
                t = _.createDocument(ge, "template", null);
                try {
                    t.documentElement.innerHTML = fe ? x : r
                } catch (e) {}
            }
            const i = t.body || t.documentElement;
            return e && n && i.insertBefore(o.createTextNode(n), i.childNodes[0] || null), ge === he ? T.call(t, Y ? "html" : "body")[0] : Y ? t.documentElement : i
        },
        Le = function(e) {
            return k.call(e.ownerDocument || e, e, d.SHOW_ELEMENT | d.SHOW_COMMENT | d.SHOW_TEXT, null)
        },
        Ne = function(e) {
            return "function" == typeof l && e instanceof l
        },
        Me = function(e, t, o) {
            C[e] && as(C[e], (e => {
                e.call(n, t, o, xe)
            }))
        },
        Oe = function(e) {
            let t = null;
            if (Me("beforeSanitizeElements", e, null), (o = e) instanceof p && ("string" != typeof o.nodeName || "string" != typeof o.textContent || "function" != typeof o.removeChild || !(o.attributes instanceof u) || "function" != typeof o.removeAttribute || "function" != typeof o.setAttribute || "string" != typeof o.namespaceURI || "function" != typeof o.insertBefore || "function" != typeof o.hasChildNodes)) return Ie(e), !0;
            var o;
            const r = we(e.nodeName);
            if (Me("uponSanitizeElement", e, {
                    tagName: r,
                    allowedTags: O
                }), e.hasChildNodes() && !Ne(e.firstElementChild) && bs(/<[/\w]/g, e.innerHTML) && bs(/<[/\w]/g, e.textContent)) return Ie(e), !0;
            if (!O[r] || U[r]) {
                if (!U[r] && ze(r)) {
                    if (j.tagNameCheck instanceof RegExp && bs(j.tagNameCheck, r)) return !1;
                    if (j.tagNameCheck instanceof Function && j.tagNameCheck(r)) return !1
                }
                if (ne && !ie[r]) {
                    const t = v(e) || e.parentNode,
                        n = y(e) || e.childNodes;
                    if (n && t) {
                        for (let o = n.length - 1; o >= 0; --o) t.insertBefore(b(n[o], !0), m(e))
                    }
                }
                return Ie(e), !0
            }
            return e instanceof c && ! function(e) {
                let t = v(e);
                t && t.tagName || (t = {
                    namespaceURI: ge,
                    tagName: "template"
                });
                const n = ds(e.tagName),
                    o = ds(t.tagName);
                return !!be[e.namespaceURI] && (e.namespaceURI === pe ? t.namespaceURI === he ? "svg" === n : t.namespaceURI === ue ? "svg" === n && ("annotation-xml" === o || Te[o]) : Boolean(Ee[n]) : e.namespaceURI === ue ? t.namespaceURI === he ? "math" === n : t.namespaceURI === pe ? "math" === n && Se[o] : Boolean(Ae[n]) : e.namespaceURI === he ? !(t.namespaceURI === pe && !Se[o]) && !(t.namespaceURI === ue && !Te[o]) && !Ae[n] && (Ce[n] || !Ee[n]) : !("application/xhtml+xml" !== ye || !be[e.namespaceURI]))
            }(e) ? (Ie(e), !0) : "noscript" !== r && "noembed" !== r && "noframes" !== r || !bs(/<\/no(script|embed|frames)/i, e.innerHTML) ? (W && 3 === e.nodeType && (t = e.textContent, as([E, A, I], (e => {
                t = hs(t, e, " ")
            })), e.textContent !== t && (cs(n.removed, {
                element: e.cloneNode()
            }), e.textContent = t)), Me("afterSanitizeElements", e, null), !1) : (Ie(e), !0)
        },
        Be = function(e, t, n) {
            if (ee && ("id" === t || "name" === t) && (n in o || n in _e)) return !1;
            if (q && !F[t] && bs(P, t));
            else if (H && bs(R, t));
            else if (!z[t] || F[t]) {
                if (!(ze(e) && (j.tagNameCheck instanceof RegExp && bs(j.tagNameCheck, e) || j.tagNameCheck instanceof Function && j.tagNameCheck(e)) && (j.attributeNameCheck instanceof RegExp && bs(j.attributeNameCheck, t) || j.attributeNameCheck instanceof Function && j.attributeNameCheck(t)) || "is" === t && j.allowCustomizedBuiltInElements && (j.tagNameCheck instanceof RegExp && bs(j.tagNameCheck, n) || j.tagNameCheck instanceof Function && j.tagNameCheck(n)))) return !1
            } else if (ce[t]);
            else if (bs(M, hs(n, N, "")));
            else if ("src" !== t && "xlink:href" !== t && "href" !== t || "script" === e || 0 !== gs(n, "data:") || !ae[e]) {
                if (G && !bs(L, hs(n, N, "")));
                else if (n) return !1
            } else;
            return !0
        },
        ze = function(e) {
            return e.indexOf("-") > 0
        },
        De = function(e) {
            Me("beforeSanitizeAttributes", e, null);
            const {
                attributes: t
            } = e;
            if (!t) return;
            const o = {
                attrName: "",
                attrValue: "",
                keepAttr: !0,
                allowedAttributes: z
            };
            let r = t.length;
            for (; r--;) {
                const i = t[r],
                    {
                        name: s,
                        namespaceURI: a,
                        value: l
                    } = i,
                    c = we(s);
                let d = "value" === s ? l : fs(l);
                if (o.attrName = c, o.attrValue = d, o.keepAttr = !0, o.forceKeepAttr = void 0, Me("uponSanitizeAttribute", e, o), d = o.attrValue, o.forceKeepAttr) continue;
                if (Pe(s, e), !o.keepAttr) continue;
                if (!V && bs(/\/>/i, d)) {
                    Pe(s, e);
                    continue
                }
                W && as([E, A, I], (e => {
                    d = hs(d, e, " ")
                }));
                const u = we(e.nodeName);
                if (Be(u, c, d)) {
                    if (!te || "id" !== c && "name" !== c || (Pe(s, e), d = "user-content-" + d), w && "object" == typeof g && "function" == typeof g.getAttributeType)
                        if (a);
                        else switch (g.getAttributeType(u, c)) {
                            case "TrustedHTML":
                                d = w.createHTML(d);
                                break;
                            case "TrustedScriptURL":
                                d = w.createScriptURL(d)
                        }
                    try {
                        a ? e.setAttributeNS(a, s, d) : e.setAttribute(s, d), ls(n.removed)
                    } catch (e) {}
                }
            }
            Me("afterSanitizeAttributes", e, null)
        },
        je = function e(t) {
            let n = null;
            const o = Le(t);
            for (Me("beforeSanitizeShadowDOM", t, null); n = o.nextNode();) Me("uponSanitizeShadowNode", n, null), Oe(n) || (n.content instanceof s && e(n.content), De(n));
            Me("afterSanitizeShadowDOM", t, null)
        };
    return n.sanitize = function(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            o = null,
            i = null,
            a = null,
            c = null;
        if (fe = !e, fe && (e = "\x3c!--\x3e"), "string" != typeof e && !Ne(e)) {
            if ("function" != typeof e.toString) throw ms("toString is not a function");
            if ("string" != typeof(e = e.toString())) throw ms("dirty is not a string, aborting")
        }
        if (!n.isSupported) return e;
        if (K || $e(t), n.removed = [], "string" == typeof e && (oe = !1), oe) {
            if (e.nodeName) {
                const t = we(e.nodeName);
                if (!O[t] || U[t]) throw ms("root node is forbidden and cannot be sanitized in-place")
            }
        } else if (e instanceof l) o = Re("\x3c!----\x3e"), i = o.ownerDocument.importNode(e, !0), 1 === i.nodeType && "BODY" === i.nodeName || "HTML" === i.nodeName ? o = i : o.appendChild(i);
        else {
            if (!X && !W && !Y && -1 === e.indexOf("<")) return w && Q ? w.createHTML(e) : e;
            if (o = Re(e), !o) return X ? null : Q ? x : ""
        }
        o && Z && Ie(o.firstChild);
        const d = Le(oe ? e : o);
        for (; a = d.nextNode();) Oe(a) || (a.content instanceof s && je(a.content), De(a));
        if (oe) return e;
        if (X) {
            if (J)
                for (c = $.call(o.ownerDocument); o.firstChild;) c.appendChild(o.firstChild);
            else c = o;
            return (z.shadowroot || z.shadowrootmode) && (c = S.call(r, c, !0)), c
        }
        let u = Y ? o.outerHTML : o.innerHTML;
        return Y && O["!doctype"] && o.ownerDocument && o.ownerDocument.doctype && o.ownerDocument.doctype.name && bs(Fs, o.ownerDocument.doctype.name) && (u = "<!DOCTYPE " + o.ownerDocument.doctype.name + ">\n" + u), W && as([E, A, I], (e => {
            u = hs(u, e, " ")
        })), w && Q ? w.createHTML(u) : u
    }, n.setConfig = function() {
        $e(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}), K = !0
    }, n.clearConfig = function() {
        xe = null, K = !1
    }, n.isValidAttribute = function(e, t, n) {
        xe || $e({});
        const o = we(e),
            r = we(t);
        return Be(o, r, n)
    }, n.addHook = function(e, t) {
        "function" == typeof t && (C[e] = C[e] || [], cs(C[e], t))
    }, n.removeHook = function(e) {
        if (C[e]) return ls(C[e])
    }, n.removeHooks = function(e) {
        C[e] && (C[e] = [])
    }, n.removeAllHooks = function() {
        C = {}
    }, n
}();
const Vs = pe('<div class="flex flex-col animate-fade-in"><div class="flex w-full items-center"><div class="flex relative items-start typebot-host-bubble max-w-full"><div class="flex items-center absolute px-4 py-2 bubble-typing " data-testid="host-bubble"></div><div class="flex flex-col overflow-hidden text-fade-in mx-4 my-2 relative text-ellipsis h-full gap-6">'),
    Ws = e => {
        const [t, n] = _("");
        return Zi.use({
            renderer: {
                link: (e, t, n) => `<a href="${e}" target="_blank" rel="noopener noreferrer">${n}</a>`
            }
        }), $((() => {
            wi()?.id === e.streamingMessageId && n(Gs.sanitize(Zi.parse(wi()?.content ?? ""), {
                ADD_ATTR: ["target"]
            }))
        })), (() => {
            const e = Vs(),
                n = e.firstChild.firstChild.firstChild,
                o = n.nextSibling;
            return n.style.setProperty("width", "100%"), n.style.setProperty("height", "100%"), k((() => o.innerHTML = t())), e
        })()
    },
    Ys = pe('<div><div class="flex flex-col flex-1 gap-2">'),
    Ks = pe('<div class="flex flex-col w-full min-w-0 gap-2">'),
    Zs = e => {
        let t;
        const [n, o] = _(e.isTransitionDisabled ? e.messages.length : 0), [r, i] = _();
        C((() => {
            e.streamingMessageId || (0 === e.messages.length && e.onAllBubblesDisplayed(), e.onScrollToBottom(t?.offsetTop ? t?.offsetTop - 50 : void 0))
        }));
        const s = async t => {
            (e.settings.typingEmulation?.delayBetweenBubbles ?? zn.delayBetweenBubbles) > 0 && n() < e.messages.length - 1 && await new Promise((t => setTimeout(t, 1e3 * (e.settings.typingEmulation?.delayBetweenBubbles ?? zn.delayBetweenBubbles))));
            const r = e.messages[n()].id;
            await e.onNewBubbleDisplayed(r), o(n() === e.messages.length ? n() : n() + 1), e.onScrollToBottom(t), n() === e.messages.length && (i(t), e.onAllBubblesDisplayed())
        };
        return (() => {
            const o = Ks();
            return ye(o, V(ne, {
                get when() {
                    return e.messages.length > 0
                },
                get children() {
                    const t = Ys(),
                        o = t.firstChild;
                    return ye(t, V(ne, {
                        get when() {
                            return (e.theme.chat?.hostAvatar?.isEnabled ?? ei.chat.hostAvatar.isEnabled) && e.messages.length > 0
                        },
                        get children() {
                            return V(vi, {
                                get hostAvatarSrc() {
                                    return e.theme.chat?.hostAvatar?.url
                                },
                                get hideAvatar() {
                                    return e.hideAvatar
                                },
                                get isTransitionDisabled() {
                                    return e.isTransitionDisabled
                                }
                            })
                        }
                    }), o), ye(o, V(te, {
                        get each() {
                            return e.messages.slice(0, n() + 1)
                        },
                        children: (t, n) => V(Qn, {
                            message: t,
                            get typingEmulation() {
                                return e.settings.typingEmulation
                            },
                            get isTypingSkipped() {
                                return T((() => !(!(e.settings.typingEmulation?.isDisabledOnFirstMessage ?? zn.isDisabledOnFirstMessage) || 0 !== e.index)))() && 0 === n()
                            },
                            get onTransitionEnd() {
                                return e.isTransitionDisabled ? void 0 : s
                            },
                            get onCompleted() {
                                return e.onSubmit
                            }
                        })
                    })), k((n => {
                        const r = "flex" + (Dt() ? " gap-1" : " gap-2"),
                            i = e.theme.chat?.guestAvatar?.isEnabled ?? ei.chat.guestAvatar.isEnabled ? Dt() ? "calc(100% - 32px - 32px)" : "calc(100% - 48px - 48px)" : Dt() ? "calc(100% - 32px)" : "calc(100% - 48px)";
                        return r !== n._v$ && fe(t, n._v$ = r), i !== n._v$2 && (null != (n._v$2 = i) ? o.style.setProperty("max-width", i) : o.style.removeProperty("max-width")), n
                    }), {
                        _v$: void 0,
                        _v$2: void 0
                    }), t
                }
            }), null), ye(o, (() => {
                const o = T((() => !(!e.input || n() !== e.messages.length)));
                return () => o() && V(gi, {
                    ref(e) {
                        "function" == typeof t ? t(e) : t = e
                    },
                    get block() {
                        return e.input
                    },
                    get chunkIndex() {
                        return e.index
                    },
                    get hasHostAvatar() {
                        return e.theme.chat?.hostAvatar?.isEnabled ?? ei.chat.hostAvatar.isEnabled
                    },
                    get guestAvatar() {
                        return e.theme.chat?.guestAvatar
                    },
                    get context() {
                        return e.context
                    },
                    get isInputPrefillEnabled() {
                        return e.settings.general?.isInputPrefillEnabled ?? Bn.isInputPrefillEnabled
                    },
                    get hasError() {
                        return e.hasError
                    },
                    onTransitionEnd: () => e.onScrollToBottom(r()),
                    get onSubmit() {
                        return e.onSubmit
                    },
                    get onSkip() {
                        return e.onSkip
                    }
                })
            })(), null), ye(o, V(ne, {
                get when() {
                    return e.streamingMessageId
                },
                keyed: !0,
                children: t => (() => {
                    const n = Ys(),
                        o = n.firstChild;
                    return ye(n, V(ne, {
                        get when() {
                            return e.theme.chat?.hostAvatar?.isEnabled ?? ei.chat.hostAvatar.isEnabled
                        },
                        get children() {
                            return V(vi, {
                                get hostAvatarSrc() {
                                    return e.theme.chat?.hostAvatar?.url
                                },
                                get hideAvatar() {
                                    return e.hideAvatar
                                }
                            })
                        }
                    }), o), ye(o, V(Ws, {
                        streamingMessageId: t
                    })), k((t => {
                        const r = "flex" + (Dt() ? " gap-1" : " gap-2"),
                            i = e.theme.chat?.hostAvatar?.isEnabled ?? ei.chat.hostAvatar.isEnabled ? Dt() ? "calc(100% - 32px - 32px)" : "calc(100% - 48px - 48px)" : Dt() ? "calc(100% - 32px)" : "calc(100% - 48px)";
                        return r !== t._v$3 && fe(n, t._v$3 = r), i !== t._v$4 && (null != (t._v$4 = i) ? o.style.setProperty("max-width", i) : o.style.removeProperty("max-width")), t
                    }), {
                        _v$3: void 0,
                        _v$4: void 0
                    }), n
                })()
            }), null), o
        })()
    },
    Xs = async e => {
        e?.trackingId && (e => {
            e && (window.gtag ? window.gtag("event", e.action, {
                event_category: Be(e.category) ? void 0 : e.category,
                event_label: Be(e.label) ? void 0 : e.label,
                value: e.value,
                send_to: Be(e.sendTo) ? void 0 : e.sendTo
            }) : console.error("Google Analytics was not properly initialized"))
        })(e)
    };
let Js = null;
const Qs = e => async ({
    messages: t,
    onMessageStream: n
}) => {
    try {
        Js = new AbortController;
        const o = e.apiHost,
            r = await fetch(`${ze(o)?o:ht()}/api/integrations/openai/streamer`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    messages: t,
                    sessionId: e.sessionId
                }),
                signal: Js.signal
            });
        if (!r.ok) return (e.retryAttempt ?? 0) < 3 && (403 === r.status || 500 === r.status || 503 === r.status) ? (await new Promise((e => setTimeout(e, 3e3))), Qs({
            ...e,
            retryAttempt: (e.retryAttempt ?? 0) + 1
        })({
            messages: t,
            onMessageStream: n
        })) : {
            error: await r.json() || "Failed to fetch the chat response."
        };
        if (!r.body) throw new Error("The response body is empty.");
        let i = "";
        const s = r.body.getReader(),
            l = new TextDecoder,
            c = function() {
                const e = a.context;
                return e ? `${e.id}${e.count++}` : "cl-" + Q++
            }();
        for (;;) {
            const {
                done: e,
                value: t
            } = await s.read();
            if (e) break;
            if (i += l.decode(t), n && n({
                    id: c,
                    message: i
                }), null === Js) {
                s.cancel();
                break
            }
        }
        return Js = null, {
            message: i
        }
    } catch (e) {
        return console.error(e), "AbortError" === e.name ? (Js = null, {
            error: {
                message: "Request aborted"
            }
        }) : e instanceof Error ? {
            error: {
                message: e.message
            }
        } : {
            error: {
                message: "Failed to fetch the chat response."
            }
        }
    }
}, ea = e => {
    if (Oe(e)) return null;
    if ("string" == typeof e) return e;
    try {
        return JSON.stringify(e)
    } catch {
        return console.warn("Failed to safely stringify variable value", e), null
    }
}, ta = Object.getPrototypeOf((async function() {})).constructor, na = async e => {
    Be(e?.pixelId) || (e => {
        if (!e?.eventType || !e.pixelId) return;
        if (!window.fbq) return void console.error("Facebook Pixel was not properly initialized");
        const t = e.params?.length ? e.params.reduce(((e, t) => t.key && t.value ? {
            ...e,
            [t.key]: t.value
        } : e), {}) : void 0;
        if ("Custom" === e.eventType) {
            if (!e.name) return;
            window.fbq("trackSingleCustom", e.pixelId, e.name, t)
        }
        window.fbq("trackSingle", e.pixelId, e.eventType, t)
    })(e)
}, oa = async e => {
    const t = e.customHeadCode;
    ze(t) && (e => {
        e.split("</noscript>").forEach((e => {
            const [t, n] = e.split("<noscript>"), o = document.createRange().createContextualFragment(t);
            if (document.head.append(o), Oe(n)) return;
            const r = document.createElement("noscript"),
                i = document.createRange().createContextualFragment(n);
            r.append(i), document.head.append(r)
        }))
    })(t);
    const n = e.gtmId;
    ze(n) && document.body.prepend((e => {
        if (document.getElementById("gtm-noscript")) return "";
        const t = document.createElement("noscript");
        t.id = "gtm-noscript";
        const n = document.createElement("iframe");
        return n.src = `https://www.googletagmanager.com/ns.html?id=${e}`, n.height = "0", n.width = "0", n.style.display = "none", n.style.visibility = "hidden", t.appendChild(n), t
    })(n));
    const o = e.googleAnalyticsId;
    var r;
    ze(o) && await (r = o, Me(window.gtag) ? Promise.resolve() : new Promise((e => {
        const t = document.getElementById("gtag");
        if (!t) {
            const t = document.createElement("script");
            t.src = `https://www.googletagmanager.com/gtag/js?id=${r}`, t.id = "gtag";
            const n = document.createElement("script");
            n.innerHTML = `window.dataLayer = window.dataLayer || [];\n      function gtag(){dataLayer.push(arguments);}\n      gtag('js', new Date());\n    \n      gtag('config', '${r}');\n      `, document.body.appendChild(t), document.body.appendChild(n), t.onload = () => {
                e()
            }
        }
        t && e()
    })));
    const i = e.pixelIds;
    Me(i) && (e => {
        const t = document.createElement("script");
        t.innerHTML = `!function(f,b,e,v,n,t,s)\n  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?\n  n.callMethod.apply(n,arguments):n.queue.push(arguments)};\n  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';\n  n.queue=[];t=b.createElement(e);t.async=!0;\n  t.src=v;s=b.getElementsByTagName(e)[0];\n  s.parentNode.insertBefore(t,s)}(window, document,'script',\n  'https://connect.facebook.net/en_US/fbevents.js');\n  ${e.map((e=>`fbq('init', '${e}');`)).join("\n")}\n  fbq('track', 'PageView');`, document.head.appendChild(t)
    })(i)
}, ra = async ({
    clientSideAction: e,
    context: t,
    onMessageStream: n
}) => {
    if ("chatwoot" in e) return o = e.chatwoot, void dn(o.scriptToExecute);
    var o;
    if ("googleAnalytics" in e) return Xs(e.googleAnalytics);
    if ("scriptToExecute" in e) return dn(e.scriptToExecute);
    if ("redirect" in e) return (({
        url: e,
        isNewTab: t
    } = {}) => {
        if (!e) return;
        return window.open(e, t ? "_blank" : "_top") ? void 0 : {
            blockedPopupUrl: e
        }
    })(e.redirect);
    if ("wait" in e) return await (async ({
        secondsToWaitFor: e
    }) => {
        await new Promise((t => setTimeout(t, 1e3 * e)))
    })(e.wait), e.expectsDedicatedReply ? {
        replyToSend: void 0
    } : void 0;
    if ("setVariable" in e) return (async ({
        content: e,
        args: t
    }) => {
        try {
            if (!isNaN(e) && /0[^.].+/.test(e)) return {
                replyToSend: e
            };
            const n = ta(...t.map((e => e.id)), e.includes("return ") ? e : `return ${e}`),
                o = await n(...t.map((e => e.value)));
            return {
                replyToSend: ea(o) ?? void 0
            }
        } catch (t) {
            return console.error(t), {
                replyToSend: ea(e) ?? void 0
            }
        }
    })(e.setVariable.scriptToExecute);
    if ("streamOpenAiChatCompletion" in e || "stream" in e) {
        const {
            error: o,
            message: r
        } = await Qs(t)({
            messages: "streamOpenAiChatCompletion" in e ? e.streamOpenAiChatCompletion?.messages : void 0,
            onMessageStream: n
        });
        return o ? {
            replyToSend: void 0,
            logs: [{
                status: "error",
                description: "Message streaming returned an error",
                details: JSON.stringify(o, null, 2)
            }]
        } : {
            replyToSend: r
        }
    }
    if ("webhookToExecute" in e) {
        return {
            replyToSend: await (async e => {
                const {
                    url: t,
                    method: n,
                    body: o,
                    headers: r
                } = e;
                try {
                    const e = await fetch(t, {
                            method: n,
                            body: "GET" !== n && o ? JSON.stringify(o) : void 0,
                            headers: r
                        }),
                        i = e.status,
                        s = await e.json();
                    return JSON.stringify({
                        statusCode: i,
                        data: s
                    })
                } catch (e) {
                    return console.error(e), JSON.stringify({
                        statusCode: 500,
                        data: "An error occured while executing the webhook on the client"
                    })
                }
            })(e.webhookToExecute)
        }
    }
    return "startPropsToInject" in e ? oa(e.startPropsToInject) : "pixel" in e ? na(e.pixel) : "codeToExecute" in e ? pn(e.codeToExecute) : void 0
}, ia = pe('<div class="flex flex-col animate-fade-in"><div class="flex w-full items-center"><div class="flex relative items-start typebot-host-bubble"><div class="flex items-center absolute px-4 py-2 bubble-typing " data-testid="host-bubble"></div><p class="overflow-hidden text-fade-in mx-4 my-2 whitespace-pre-wrap slate-html-container relative opacity-0 h-6 text-ellipsis">'), sa = () => (() => {
    const e = ia(),
        t = e.firstChild.firstChild.firstChild;
    return t.style.setProperty("width", "64px"), t.style.setProperty("height", "32px"), ye(t, V(Kt, {})), e
})(), aa = pe('<div class="flex w-full"><div class="flex flex-col w-full min-w-0"><div class="flex gap-2">'), la = e => (() => {
    const t = aa(),
        n = t.firstChild.firstChild;
    return ye(n, V(ne, {
        get when() {
            return e.theme.chat?.hostAvatar?.isEnabled ?? ei.chat.hostAvatar.isEnabled
        },
        get children() {
            return V(vi, {
                get hostAvatarSrc() {
                    return e.theme.chat?.hostAvatar?.url
                }
            })
        }
    }), null), ye(n, V(sa, {}), null), t
})(), ca = pe('<div class="w-full max-w-xs p-4 text-gray-500 bg-white shadow flex flex-col gap-2 typebot-popup-blocked-toast" role="alert"><div class="flex flex-col gap-1"><span class=" text-sm font-semibold text-gray-900">Popup blocked</span><div class="text-sm font-normal">The bot wants to open a new tab but it was blocked by your browser. It needs a manual approval.</div></div><a target="_blank" class="py-1 px-4 justify-center text-sm font-semibold text-white focus:outline-none flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 filter hover:brightness-90 active:brightness-75 typebot-button" rel="noreferrer">Continue in new tab'), da = e => (() => {
    const t = ca(),
        n = t.firstChild.nextSibling;
    return n.$$click = () => e.onLinkClick(), k((() => ge(n, "href", e.url))), t
})();
he(["click"]);
const ua = async ({
    apiHost: e,
    sessionId: t,
    clientLogs: n
}) => {
    try {
        await zt.post(`${ze(e)?e:ht()}/api/v1/sessions/${t}/clientLogs`, {
            json: {
                clientLogs: n
            }
        })
    } catch (e) {
        console.log(e)
    }
}, pa = pe('<div class="flex flex-col overflow-y-auto w-full min-h-full px-3 pt-10 relative scrollable-container typebot-chat-view scroll-smooth gap-2">'), ha = pe('<div class="flex justify-end">'), ga = pe('<div class="w-full h-32 flex-shrink-0">'), fa = e => {
    let t;
    const [n, o, r] = di(_([{
        input: e.initialChatReply.input,
        messages: e.initialChatReply.messages,
        clientSideActions: e.initialChatReply.clientSideActions
    }]), {
        key: `typebot-${e.context.typebot.id}-chatChunks`,
        storage: e.context.storage,
        onRecovered: () => {
            setTimeout((() => {
                t?.scrollTo(0, t.scrollHeight)
            }), 200)
        }
    }), [i, s] = _(e.initialChatReply.dynamicTheme), [a, l] = _(e.initialChatReply.typebot.theme), [c, d] = _(!1), [u, p] = _(), [h, g] = _(!1);
    C((() => {
        (async () => {
            const e = n()[0];
            if (!e.clientSideActions) return;
            const t = e.clientSideActions.filter((e => Oe(e.lastBubbleBlockId)));
            await w(t)
        })()
    }));
    const f = ({
        id: e,
        message: t
    }) => {
        d(!1);
        const r = [...n()].pop();
        r && (r.streamingMessageId !== e && o((t => [...t, {
            messages: [],
            streamingMessageId: e
        }])), xi({
            id: e,
            content: t
        }))
    };
    $((() => {
        l(((e, t) => ({
            ...e,
            chat: {
                ...e.chat,
                hostAvatar: e.chat?.hostAvatar && t?.hostAvatarUrl ? {
                    ...e.chat.hostAvatar,
                    url: t.hostAvatarUrl
                } : e.chat?.hostAvatar,
                guestAvatar: e.chat?.guestAvatar && t?.guestAvatarUrl ? {
                    ...e.chat.guestAvatar,
                    url: t?.guestAvatarUrl
                } : e.chat?.guestAvatar
            }
        }))(e.initialChatReply.typebot.theme, i()))
    }));
    const b = async (t, r) => {
        r && (e.onNewLogs?.(r), await ua({
            apiHost: e.context.apiHost,
            sessionId: e.initialChatReply.sessionId,
            clientLogs: r
        })), g(!1);
        const i = [...n()].pop()?.input;
        i?.id && e.onAnswer && t && e.onAnswer({
            message: t,
            blockId: i.id
        }), i?.type === ao.FILE && e.onNewLogs?.([{
            description: "Files are not uploaded in preview mode",
            status: "info"
        }]);
        const a = setTimeout((() => {
                d(!0)
            }), 1e3),
            {
                data: l,
                error: c
            } = await (async ({
                apiHost: e,
                message: t,
                sessionId: n
            }) => {
                try {
                    return {
                        data: await zt.post(`${ze(e)?e:ht()}/api/v1/sessions/${n}/continueChat`, {
                            json: {
                                message: t
                            },
                            timeout: !1
                        }).json()
                    }
                } catch (e) {
                    return {
                        error: e
                    }
                }
            })({
                apiHost: e.context.apiHost,
                sessionId: e.initialChatReply.sessionId,
                message: t
            });
        if (clearTimeout(a), d(!1), c) {
            g(!0);
            const t = [{
                description: "Failed to send the reply",
                details: c instanceof bt ? {
                    status: c.response.status,
                    body: await c.response.json()
                } : c,
                status: "error"
            }];
            return await ua({
                apiHost: e.context.apiHost,
                sessionId: e.initialChatReply.sessionId,
                clientLogs: t
            }), void e.onNewLogs?.(t)
        }
        if (l) {
            if (l.progress && e.onProgressUpdate?.(l.progress), l.lastMessageNewFormat && Jr([...Xr(), {
                    inputIndex: [...n()].length - 1,
                    formattedMessage: l.lastMessageNewFormat
                }]), l.logs && e.onNewLogs?.(l.logs), l.dynamicTheme && s(l.dynamicTheme), l.input && e.onNewInputBlock && e.onNewInputBlock(l.input), l.clientSideActions) {
                const e = l.clientSideActions.filter((e => Oe(e.lastBubbleBlockId)));
                await w(e)
            }
            o((e => [...e, {
                input: l.input,
                messages: l.messages,
                clientSideActions: l.clientSideActions
            }]))
        }
    }, m = e => {
        const o = n();
        o.length >= 2 && o[o.length - 2].streamingMessageId || setTimeout((() => {
            t?.scrollTo(0, e ?? t.scrollHeight)
        }), 50)
    }, y = async () => {
        const t = [...n()].pop();
        t && Oe(t.input) && e.onEnd?.()
    }, v = async e => {
        const t = [...n()].pop();
        if (t && t.clientSideActions) {
            const n = t.clientSideActions.filter((t => t.lastBubbleBlockId === e));
            await w(n)
        }
    }, w = async t => {
        for (const n of t) {
            ("streamOpenAiChatCompletion" in n || "webhookToExecute" in n || "stream" in n) && d(!0);
            const t = await ra({
                clientSideAction: n,
                context: {
                    apiHost: e.context.apiHost,
                    sessionId: e.initialChatReply.sessionId
                },
                onMessageStream: f
            });
            if (t && "replyToSend" in t) return d(!1), void b(t.replyToSend, t.logs);
            t && "blockedPopupUrl" in t && p(t.blockedPopupUrl)
        }
    };
    E((() => {
        xi(void 0), Jr([])
    }));
    const x = () => b(void 0);
    return (() => {
        const o = pa();
        return "function" == typeof t ? me(t, o) : t = o, ye(o, V(te, {
            get each() {
                return n()
            },
            children: (t, o) => V(Zs, {
                get index() {
                    return o()
                },
                get messages() {
                    return t.messages
                },
                get input() {
                    return t.input
                },
                get theme() {
                    return a()
                },
                get settings() {
                    return e.initialChatReply.typebot.settings
                },
                get streamingMessageId() {
                    return t.streamingMessageId
                },
                get context() {
                    return e.context
                },
                get hideAvatar() {
                    return T((() => !t.input))() && ((n()[o() + 1]?.messages ?? 0).length > 0 || void 0 !== n()[o() + 1]?.streamingMessageId || t.messages.length > 0 && c())
                },
                get hasError() {
                    return T((() => !!h()))() && o() === n().length - 1
                },
                get isTransitionDisabled() {
                    return o() !== n().length - 1 || !t.input && r()
                },
                onNewBubbleDisplayed: v,
                onAllBubblesDisplayed: y,
                onSubmit: b,
                onScrollToBottom: m,
                onSkip: x
            })
        }), null), ye(o, V(ne, {
            get when() {
                return c()
            },
            get children() {
                return V(la, {
                    get theme() {
                        return a()
                    }
                })
            }
        }), null), ye(o, V(ne, {
            get when() {
                return u()
            },
            keyed: !0,
            children: e => (() => {
                const t = ha();
                return ye(t, V(da, {
                    url: e,
                    onLinkClick: () => p(void 0)
                })), t
            })()
        }), null), ye(o, V(ba, {}), null), o
    })()
}, ba = () => ga(), ma = pe('<div class="h-full flex justify-center items-center flex-col"><p class="text-2xl text-center"></p><pre>'), ya = e => (() => {
    const t = ma(),
        n = t.firstChild,
        o = n.nextSibling;
    return ye(n, (() => e.error.message)), ye(o, (() => JSON.stringify(e.error.cause, null, 2))), t
})(), va = "resultId", wa = () => {
    try {
        sessionStorage.setItem("typebot-botOpened", "true")
    } catch {}
}, xa = () => {
    try {
        sessionStorage.removeItem("typebot-botOpened")
    } catch {}
}, _a = () => {
    try {
        return "true" === sessionStorage.getItem("typebot-botOpened")
    } catch {
        return !1
    }
}, ka = e => "session" === (e ?? Bn.rememberUser.storage) ? sessionStorage : localStorage, $a = {
    bgImage: "--typebot-container-bg-image",
    bgColor: "--typebot-container-bg-color",
    fontFamily: "--typebot-container-font-family",
    color: "--typebot-container-color",
    progressBar: {
        position: "--typebot-progress-bar-position",
        color: "--typebot-progress-bar-color",
        colorRgb: "--typebot-progress-bar-color-rgb",
        height: "--typebot-progress-bar-height",
        top: "--typebot-progress-bar-top",
        bottom: "--typebot-progress-bar-bottom"
    }
}, Ta = {
    hostBubbles: {
        bgColor: "--typebot-host-bubble-bg-color",
        color: "--typebot-host-bubble-color"
    },
    guestBubbles: {
        bgColor: "--typebot-guest-bubble-bg-color",
        color: "--typebot-guest-bubble-color"
    },
    inputs: {
        bgColor: "--typebot-input-bg-color",
        color: "--typebot-input-color",
        placeholderColor: "--typebot-input-placeholder-color"
    },
    buttons: {
        bgColor: "--typebot-button-bg-color",
        bgColorRgb: "--typebot-button-bg-color-rgb",
        color: "--typebot-button-color"
    },
    checkbox: {
        bgColor: "--typebot-checkbox-bg-color",
        color: "--typebot-checkbox-color",
        baseAlpha: "--selectable-base-alpha"
    }
}, Sa = (e, t, n) => {
    La(e.background ?? ei.general.background, t), t.setProperty($a.fontFamily, ("string" == typeof e.font ? e.font : e.font?.family) ?? ei.general.font.family), Ca(e.progressBar ?? ei.general.progressBar, t, n)
}, Ca = (e, t, n) => {
    const o = e.position ?? ei.general.progressBar.position;
    t.setProperty($a.progressBar.position, "fixed" === o ? n ? "absolute" : "fixed" : o), t.setProperty($a.progressBar.color, e.color ?? ei.general.progressBar.color), t.setProperty($a.progressBar.colorRgb, je(e.backgroundColor ?? ei.general.progressBar.backgroundColor).join(", ")), t.setProperty($a.progressBar.height, `${e.thickness??ei.general.progressBar.thickness}px`);
    const r = e.placement ?? ei.general.progressBar.placement;
    t.setProperty($a.progressBar.top, "Top" === r ? "0" : "auto"), t.setProperty($a.progressBar.bottom, "Bottom" === r ? "0" : "auto")
}, Ea = (e, t) => {
    Aa(e.hostBubbles ?? ei.chat.hostBubbles, t), Ia(e.guestBubbles ?? ei.chat.guestBubbles, t), Pa(e.buttons ?? ei.chat.buttons, t), Ra(e.inputs ?? ei.chat.inputs, t), Ma(e.roundness ?? ei.chat.roundness, t)
}, Aa = (e, t) => {
    t.setProperty(Ta.hostBubbles.bgColor, e.backgroundColor ?? ei.chat.hostBubbles.backgroundColor), t.setProperty(Ta.hostBubbles.color, e.color ?? ei.chat.hostBubbles.color)
}, Ia = (e, t) => {
    t.setProperty(Ta.guestBubbles.bgColor, e.backgroundColor ?? ei.chat.guestBubbles.backgroundColor), t.setProperty(Ta.guestBubbles.color, e.color ?? ei.chat.guestBubbles.color)
}, Pa = (e, t) => {
    const n = e.backgroundColor ?? ei.chat.buttons.backgroundColor;
    t.setProperty(Ta.buttons.bgColor, n), t.setProperty(Ta.buttons.bgColorRgb, je(n).join(", ")), t.setProperty(Ta.buttons.color, e.color ?? ei.chat.buttons.color)
}, Ra = (e, t) => {
    t.setProperty(Ta.inputs.bgColor, e.backgroundColor ?? ei.chat.inputs.backgroundColor), t.setProperty(Ta.inputs.color, e.color ?? ei.chat.inputs.color), t.setProperty(Ta.inputs.placeholderColor, e.placeholderColor ?? ei.chat.inputs.placeholderColor)
}, La = (e, t) => {
    t.setProperty($a.bgImage, null), t.setProperty($a.bgColor, null), t.setProperty(e?.type === Qr.IMAGE ? $a.bgImage : $a.bgColor, Na(e)), t.setProperty(Ta.checkbox.bgColor, e?.type === Qr.IMAGE ? "rgba(255, 255, 255, 0.75)" : (e?.type === Qr.COLOR ? e.content : "#ffffff") ?? "#ffffff");
    const n = e.type === Qr.IMAGE ? "#000000" : e?.type === Qr.COLOR && ze(e.content) ? e.content : "#ffffff";
    t.setProperty($a.color, Ue(n) ? "#303235" : "#ffffff"), e.type === Qr.IMAGE ? t.setProperty(Ta.checkbox.baseAlpha, "0.40") : t.setProperty(Ta.checkbox.baseAlpha, "0")
}, Na = ({
    type: e,
    content: t
} = {}) => {
    switch (e) {
        case Qr.NONE:
            return "transparent";
        case void 0:
        case Qr.COLOR:
            return t ?? ei.general.background.content;
        case Qr.IMAGE:
            return `url(${t})`
    }
}, Ma = (e, t) => {
    switch (e) {
        case "none":
            t.setProperty("--typebot-border-radius", "0");
            break;
        case "medium":
            t.setProperty("--typebot-border-radius", "6px");
            break;
        case "large":
            t.setProperty("--typebot-border-radius", "20px")
    }
};
const Oa = "typebot-font",
    Ba = e => {
        const t = document.getElementById(Oa);
        if ("string" == typeof e || "Google" === e.type) {
            const n = ("string" == typeof e ? e : e.family) ?? ei.general.font.family;
            if (t?.getAttribute("href")?.includes(n)) return;
            t?.remove();
            const o = document.createElement("link");
            return o.href = `https://fonts.bunny.net/css2?family=${n}:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap`, o.rel = "stylesheet", o.id = Oa, void document.head.appendChild(o)
        }
        if ("Custom" === e.type) {
            if (ze(e.css)) {
                if (t?.innerHTML === e.css) return;
                t?.remove();
                const n = document.createElement("style");
                n.innerHTML = e.css, n.id = Oa, document.head.appendChild(n)
            }
            if (ze(e.url)) {
                if (t?.getAttribute("href") === e.url) return;
                t?.remove();
                const n = document.createElement("link");
                n.href = e.url, n.rel = "stylesheet", n.id = Oa, document.head.appendChild(n)
            }
        }
    },
    za = pe('<div class="typebot-progress-bar-container"><div class="typebot-progress-bar">'),
    Da = e => (() => {
        const t = za(),
            n = t.firstChild;
        return k((() => null != `${e.value}%` ? n.style.setProperty("width", `${e.value}%`) : n.style.removeProperty("width"))), t
    })(),
    ja = pe("<style>"),
    Ua = pe('<div><div class="flex w-full h-full justify-center">'),
    Fa = e => {
        const [t, n] = _(), [o, r] = _(""), [i, s] = _(!1), [a, l] = _(), c = async () => {
            e.font && Ba(e.font), s(!0);
            const t = new URLSearchParams(location.search);
            e.onInit?.();
            const o = {};
            t.forEach(((e, t) => {
                o[t] = e
            }));
            const i = "string" == typeof e.skymodbot ? e.skymodbot : void 0,
                a = "string" != typeof e.skymodbot || (e.isPreview ?? !1),
                c = (e => {
                    if (e) try {
                        return sessionStorage.getItem(`${va}-${e}`) ?? localStorage.getItem(`${va}-${e}`) ?? void 0
                    } catch {}
                })(i),
                {
                    data: d,
                    error: u
                } = await async function({
                    skymodbot: e,
                    isPreview: t,
                    apiHost: n,
                    prefilledVariables: o,
                    resultId: r,
                    stripeRedirectStatus: i,
                    startFrom: s
                }) {
                    if (Oe(e)) throw new Error("Typebot ID is required to get initial messages");
                    const a = gt() ?? void 0,
                        l = a ? JSON.parse(a) : void 0;
                    if (l) {
                        ft();
                        try {
                            return {
                                data: await zt.post(`${ze(n)?n:ht()}/api/v1/sessions/${l.sessionId}/continueChat`, {
                                    json: {
                                        message: l ? "failed" === i ? "fail" : "Success" : void 0
                                    },
                                    timeout: !1
                                }).json()
                            }
                        } catch (e) {
                            return {
                                error: e
                            }
                        }
                    }
                    const c = "string" == typeof e ? e : e.id;
                    if (t) try {
                        return {
                            data: await zt.post(`${ze(n)?n:ht()}/api/v1/typebots/${c}/preview/startChat`, {
                                json: {
                                    isStreamEnabled: !0,
                                    startFrom: s,
                                    typebot: e,
                                    prefilledVariables: o
                                },
                                timeout: !1
                            }).json()
                        }
                    } catch (e) {
                        return {
                            error: e
                        }
                    }
                    try {
                        return {
                            data: await zt.post(`${ze(n)?n:ht()}/api/v1/typebots/${c}/startChat`, {
                                json: {
                                    isStreamEnabled: !0,
                                    prefilledVariables: o,
                                    resultId: r,
                                    isOnlyRegistering: !1
                                },
                                timeout: !1
                            }).json()
                        }
                    } catch (e) {
                        return {
                            error: e
                        }
                    }
                }({
                    stripeRedirectStatus: t.get("redirect_status") ?? void 0,
                    skymodbot: e.skymodbot,
                    apiHost: e.apiHost,
                    isPreview: a,
                    resultId: ze(e.resultId) ? e.resultId : c,
                    prefilledVariables: {
                        ...o,
                        ...e.prefilledVariables
                    },
                    startFrom: e.startFrom
                });
            if (u instanceof bt) return a ? l(new Error("An error occurred while loading the bot.", {
                cause: {
                    status: u.response.status,
                    body: await u.response.json()
                }
            })) : 400 === u.response.status || 403 === u.response.status ? l(new Error("This bot is now closed.")) : 404 === u.response.status ? l(new Error("The bot you're looking for doesn't exist.")) : l(new Error(`Error! Couldn't initiate the chat. (${u.response.statusText})`));
            if (!d) return u && (console.error(u), a) ? l(new Error("Error! Could not reach server. Check your connection.", {
                cause: u
            })) : l(new Error("Error! Could not reach server. Check your connection."));
            if (d.resultId && i && (d.typebot.settings.general?.rememberUser?.isEnabled ?? Bn.rememberUser.isEnabled)) {
                c && c !== d.resultId && (p = d.typebot.id, Object.keys(localStorage).forEach((e => {
                    e.startsWith(`typebot-${p}`) && localStorage.removeItem(e)
                })), Object.keys(sessionStorage).forEach((e => {
                    e.startsWith(`typebot-${p}`) && sessionStorage.removeItem(e)
                })));
                const t = d.typebot.settings.general?.rememberUser?.storage ?? Bn.rememberUser.storage;
                ((e = "session") => (t, n) => {
                    try {
                        ka(e).setItem(`${va}-${t}`, n)
                    } catch {}
                })(t)(i, d.resultId);
                const o = (e => {
                    if (e) try {
                        const t = sessionStorage.getItem(`typebot-${e}-initialChatReply`) ?? localStorage.getItem(`typebot-${e}-initialChatReply`);
                        if (!t) return;
                        return JSON.parse(t)
                    } catch {}
                })(d.typebot.id);
                o ? n(o) : (n(d), ((e, {
                    typebotId: t,
                    storage: n
                }) => {
                    try {
                        const o = JSON.stringify(e);
                        ka(n).setItem(`typebot-${t}-initialChatReply`, o)
                    } catch {}
                })(d, {
                    typebotId: d.typebot.id,
                    storage: t
                })), e.onChatStatePersisted?.(!0)
            } else n(d), d.input?.id && e.onNewInputBlock && e.onNewInputBlock(d.input), d.logs && e.onNewLogs?.(d.logs), e.onChatStatePersisted?.(!1);
            var p;
            r(d.typebot.theme.customCss ?? "")
        };
        return $((() => {
            Oe(e.skymodbot) || i() || c().then()
        })), $((() => {
            Oe(e.skymodbot) || "string" == typeof e.skymodbot || (r(e.skymodbot.theme.customCss ?? ""), e.skymodbot.theme.general?.progressBar?.isEnabled && t() && !t()?.typebot.theme.general?.progressBar?.isEnabled && (s(!1), c().then()))
        })), E((() => {
            s(!1)
        })), [(() => {
            const e = ja();
            return ye(e, o), e
        })(), (() => {
            const e = ja();
            return ye(e, "#lite-badge{background-color:#fff!important;border-radius:4px!important;border-width:1px!important;bottom:20px!important;color:#111827!important;display:flex!important;font-size:14px!important;font-weight:600!important;gap:8px!important;left:auto!important;line-height:20px!important;opacity:1!important;padding:4px 8px!important;position:absolute!important;right:auto!important;text-decoration:none!important;top:auto!important;transition:background-color .2s ease-in-out!important;visibility:visible!important;z-index:50!important}#lite-badge:hover{background-color:#f7f8ff!important}"), e
        })(), V(ne, {
            get when() {
                return a()
            },
            keyed: !0,
            children: e => V(ya, {
                error: e
            })
        }), V(ne, {
            get when() {
                return t()
            },
            keyed: !0,
            children: t => V(Ha, {
                get class() {
                    return e.class
                },
                get initialChatReply() {
                    return {
                        ...t,
                        typebot: {
                            ...t.typebot,
                            settings: "string" == typeof e.skymodbot ? t.typebot?.settings : e.skymodbot?.settings,
                            theme: "string" == typeof e.skymodbot ? t.typebot?.theme : e.skymodbot?.theme
                        }
                    }
                },
                get context() {
                    return {
                        apiHost: e.apiHost,
                        isPreview: "string" != typeof e.skymodbot || (e.isPreview ?? !1),
                        resultId: t.resultId,
                        sessionId: t.sessionId,
                        typebot: t.typebot,
                        storage: t.typebot.settings.general?.rememberUser?.isEnabled && "string" == typeof e.skymodbot && !e.isPreview ? t.typebot.settings.general?.rememberUser?.storage ?? Bn.rememberUser.storage : void 0
                    }
                },
                get progressBarRef() {
                    return e.progressBarRef
                },
                get onNewInputBlock() {
                    return e.onNewInputBlock
                },
                get onNewLogs() {
                    return e.onNewLogs
                },
                get onAnswer() {
                    return e.onAnswer
                },
                get onEnd() {
                    return e.onEnd
                }
            })
        })]
    },
    Ha = e => {
        const [t, n] = di(_(e.initialChatReply.progress), {
            storage: e.context.storage,
            key: `typebot-${e.context.typebot.id}-progressValue`
        });
        let o;
        const r = new ResizeObserver((e => jt(e[0].target.clientWidth < 400)));
        return C((() => {
            o && (r.observe(o), gn(`${o.clientHeight}px`))
        })), $((() => {
            Ba(e.initialChatReply.typebot.theme.general?.font ?? ei.general.font), o && ((e, t, n) => {
                if (!e) return;
                const o = t?.style;
                o && (Sa(e.general ?? ei.general, o, n), Ea(e.chat ?? ei.chat, o))
            })(e.initialChatReply.typebot.theme, o, e.context.isPreview)
        })), E((() => {
            o && r.unobserve(o)
        })), (() => {
            const r = Ua(),
                i = r.firstChild;
            return "function" == typeof o ? me(o, r) : o = r, ye(r, V(ne, {
                get when() {
                    return Me(t()) && e.initialChatReply.typebot.theme.general?.progressBar?.isEnabled
                },
                get children() {
                    return V(ne, {
                        get when() {
                            return e.progressBarRef && "fixed" === (e.initialChatReply.typebot.theme.general?.progressBar?.position ?? ei.general.progressBar.position)
                        },
                        get fallback() {
                            return V(Da, {
                                get value() {
                                    return t()
                                }
                            })
                        },
                        get children() {
                            return V(Ce, {
                                get mount() {
                                    return e.progressBarRef
                                },
                                get children() {
                                    return V(Da, {
                                        get value() {
                                            return t()
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            }), i), ye(i, V(fa, {
                get context() {
                    return e.context
                },
                get initialChatReply() {
                    return e.initialChatReply
                },
                get onNewInputBlock() {
                    return e.onNewInputBlock
                },
                get onAnswer() {
                    return e.onAnswer
                },
                get onEnd() {
                    return e.onEnd
                },
                get onNewLogs() {
                    return e.onNewLogs
                },
                onProgressUpdate: n
            })), ye(r, V(ne, {
                get when() {
                    return e.initialChatReply.typebot.settings.general?.isBrandingEnabled
                },
                get children() {
                    return V(ut, {
                        botContainer: o
                    })
                }
            }), null), k((() => fe(r, He("relative flex w-full h-full text-base overflow-hidden bg-cover bg-center flex-col items-center typebot-container @container", e.class)))), r
        })()
    },
    qa = pe("<style>"),
    Ga = pe("<div>"),
    Va = pe('<div part="bot">'),
    Wa = e => {
        const [t, n] = J(e, ["onOpen", "onClose", "previewMessage", "onPreviewMessageClick", "theme", "autoShowDelay"]), [o, r] = _(!0), [i, s] = _(n.prefilledVariables), [a, l] = _(!1), [c, d] = _({
            message: t.previewMessage?.message ?? "",
            avatarUrl: t.previewMessage?.avatarUrl
        }), [u, p] = _(!1), [h, g] = _(!1), [f, b] = _(Ya(t.theme?.button?.size ?? "medium"));
        let m;
        $((() => {
            b(Ya(t.theme?.button?.size ?? "medium"))
        })), C((() => {
            window.addEventListener("message", y);
            const e = t.autoShowDelay,
                n = t.previewMessage?.autoShowDelay;
            (_a() || gt()) && v(), Me(e) && setTimeout((() => {
                v()
            }), e), Me(n) && setTimeout((() => {
                S()
            }), n)
        })), E((() => {
            window.removeEventListener("message", y)
        })), $((() => {
            e.prefilledVariables && s((t => ({
                ...t,
                ...e.prefilledVariables
            })))
        }));
        const y = e => {
                const {
                    data: t
                } = e;
                t.isFromTypebot && ("open" === t.command && v(), "close" === t.command && w(), "toggle" === t.command && x(), "showPreviewMessage" === t.command && S(t.message), "hidePreviewMessage" === t.command && A(), "setPrefilledVariables" === t.command && s((e => ({
                    ...e,
                    ...t.variables
                }))), "unmount" === t.command && I())
            },
            v = () => {
                h() || g(!0), A(), p(!0), u() && t.onOpen?.()
            },
            w = () => {
                p(!1), xa(), u() && t.onClose?.()
            },
            x = () => {
                u() ? w() : v()
            },
            T = () => {
                t.onPreviewMessageClick?.(), v()
            },
            S = e => {
                e && d(e), u() || l(!0)
            },
            A = () => {
                l(!1)
            },
            I = () => {
                u() ? (w(), setTimeout((() => {
                    r(!1)
                }), 200)) : r(!1)
            },
            P = e => {
                n.onChatStatePersisted?.(e), e && wa()
            };
        return V(ne, {
            get when() {
                return o()
            },
            get children() {
                return [(() => {
                    const e = qa();
                    return ye(e, Le), e
                })(), V(ne, {
                    get when() {
                        return a()
                    },
                    get children() {
                        return V(st, X(c, {
                            get placement() {
                                return t.theme?.placement
                            },
                            get previewMessageTheme() {
                                return t.theme?.previewMessage
                            },
                            get buttonSize() {
                                return f()
                            },
                            onClick: T,
                            onCloseClick: A
                        }))
                    }
                }), V(et, X((() => t.theme?.button), {
                    get placement() {
                        return t.theme?.placement
                    },
                    toggleBot: x,
                    get isBotOpened() {
                        return u()
                    },
                    get buttonSize() {
                        return f()
                    }
                })), (() => {
                    const e = Ga();
                    return "function" == typeof m ? me(m, e) : m = e, e
                })(), (() => {
                    const o = Va();
                    return o.style.setProperty("transition", "transform 200ms cubic-bezier(0, 1.2, 1, 1), opacity 150ms ease-out"), o.style.setProperty("box-shadow", "rgb(0 0 0 / 16%) 0px 5px 40px"), o.style.setProperty("z-index", "42424242"), ye(o, V(ne, {
                        get when() {
                            return h()
                        },
                        get children() {
                            return V(Fa, X(n, {
                                onChatStatePersisted: P,
                                get prefilledVariables() {
                                    return i()
                                },
                                class: "rounded-lg",
                                progressBarRef: m
                            }))
                        }
                    })), k((n => {
                        const r = `calc(100% - ${f()} - 32px)`,
                            i = e.theme?.chatWindow?.maxHeight ?? "704px",
                            s = e.theme?.chatWindow?.maxWidth ?? "400px",
                            a = "left" === e.theme?.placement ? "bottom left" : "bottom right",
                            l = u() ? "scale3d(1, 1, 1)" : "scale3d(0, 0, 1)",
                            c = t.theme?.chatWindow?.backgroundColor,
                            d = `calc(${f()} + 32px)`,
                            p = "fixed rounded-lg w-full" + (u() ? " opacity-1" : " opacity-0 pointer-events-none") + ("left" === e.theme?.placement ? " left-5" : " sm:right-5 right-0");
                        return r !== n._v$ && (null != (n._v$ = r) ? o.style.setProperty("height", r) : o.style.removeProperty("height")), i !== n._v$2 && (null != (n._v$2 = i) ? o.style.setProperty("max-height", i) : o.style.removeProperty("max-height")), s !== n._v$3 && (null != (n._v$3 = s) ? o.style.setProperty("max-width", s) : o.style.removeProperty("max-width")), a !== n._v$4 && (null != (n._v$4 = a) ? o.style.setProperty("transform-origin", a) : o.style.removeProperty("transform-origin")), l !== n._v$5 && (null != (n._v$5 = l) ? o.style.setProperty("transform", l) : o.style.removeProperty("transform")), c !== n._v$6 && (null != (n._v$6 = c) ? o.style.setProperty("background-color", c) : o.style.removeProperty("background-color")), d !== n._v$7 && (null != (n._v$7 = d) ? o.style.setProperty("bottom", d) : o.style.removeProperty("bottom")), p !== n._v$8 && fe(o, n._v$8 = p), n
                    }), {
                        _v$: void 0,
                        _v$2: void 0,
                        _v$3: void 0,
                        _v$4: void 0,
                        _v$5: void 0,
                        _v$6: void 0,
                        _v$7: void 0,
                        _v$8: void 0
                    }), o
                })()]
            }
        })
    },
    Ya = e => "medium" === e ? "48px" : "large" === e ? "64px" : e || "48px",
    Ka = pe("<style>"),
    Za = pe('<div class="relative" aria-labelledby="modal-title" role="dialog" aria-modal="true"><style></style><div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity animate-fade-in" part="overlay"></div><div class="fixed inset-0 z-10 overflow-y-auto"><div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0"><div>'),
    Xa = e => {
        const [t, n] = J(e, ["onOpen", "onClose", "autoShowDelay", "theme", "isOpen", "defaultOpen"]), [o, r] = _(n.prefilledVariables), [i, s] = _(t.isOpen ?? !1);
        C((() => {
            (t.defaultOpen || gt() || _a()) && c(), window.addEventListener("message", l);
            const e = t.autoShowDelay;
            Me(e) && setTimeout((() => {
                c()
            }), e)
        })), E((() => {
            window.removeEventListener("message", l)
        })), $((() => {
            Oe(e.isOpen) || e.isOpen === i() || u()
        })), $((() => {
            e.prefilledVariables && r((t => ({
                ...t,
                ...e.prefilledVariables
            })))
        }));
        const a = e => {
                e.stopPropagation()
            },
            l = e => {
                const {
                    data: t
                } = e;
                t.isFromTypebot && ("open" === t.command && c(), "close" === t.command && d(), "toggle" === t.command && u(), "setPrefilledVariables" === t.command && r((e => ({
                    ...e,
                    ...t.variables
                }))))
            },
            c = () => {
                s(!0), t.onOpen?.(), document.body.style.setProperty("overflow", "hidden", "important"), document.addEventListener("pointerdown", d)
            },
            d = () => {
                s(!1), t.onClose?.(), document.body.style.overflow = "auto", document.removeEventListener("pointerdown", d), xa()
            },
            u = () => {
                i() ? d() : c()
            },
            p = e => {
                n.onChatStatePersisted?.(e), e && wa()
            };
        return V(ne, {
            get when() {
                return i()
            },
            get children() {
                return [(() => {
                    const e = Ka();
                    return ye(e, Le), e
                })(), (() => {
                    const t = Za(),
                        r = t.firstChild,
                        i = r.nextSibling.nextSibling.firstChild.firstChild;
                    return ye(r, Le), i.addEventListener("pointerdown", a), ye(i, V(Fa, X(n, {
                        get prefilledVariables() {
                            return o()
                        },
                        onChatStatePersisted: p
                    }))), k((n => {
                        const o = e.theme?.zIndex ?? 42424242,
                            r = "relative h-[80vh] transform overflow-hidden rounded-lg text-left transition-all sm:my-8 w-full max-w-lg" + (e.theme?.backgroundColor ? " shadow-xl" : ""),
                            s = e.theme?.backgroundColor ?? "transparent",
                            a = e.theme?.width ?? "512px";
                        return o !== n._v$ && (null != (n._v$ = o) ? t.style.setProperty("z-index", o) : t.style.removeProperty("z-index")), r !== n._v$2 && fe(i, n._v$2 = r), s !== n._v$3 && (null != (n._v$3 = s) ? i.style.setProperty("background-color", s) : i.style.removeProperty("background-color")), a !== n._v$4 && (null != (n._v$4 = a) ? i.style.setProperty("max-width", a) : i.style.removeProperty("max-width")), n
                    }), {
                        _v$: void 0,
                        _v$2: void 0,
                        _v$3: void 0,
                        _v$4: void 0
                    }), t
                })()]
            }
        })
    },
    Ja = pe("<style>\n:host {\n  display: block;\n  width: 100%;\n  height: 100%;\n  overflow-y: hidden;\n}\n"),
    Qa = (e, {
        element: t
    }) => {
        const [n, o] = _(!1), r = new IntersectionObserver((e => {
            e.some((e => e.isIntersecting)) && o(!0)
        }));
        C((() => {
            window.addEventListener("message", i), r.observe(t)
        }));
        const i = e => {
            const {
                data: t
            } = e;
            t.isFromTypebot
        };
        return E((() => {
            r.disconnect()
        })), [(() => {
            const e = Ja(),
                t = e.firstChild;
            return ye(e, Le, t), e
        })(), V(ne, {
            get when() {
                return n()
            },
            get children() {
                return V(Fa, e)
            }
        })]
    },
    el = () => {
        window.postMessage({
            isFromTypebot: !0,
            command: "close"
        })
    },
    tl = () => {
        window.postMessage({
            isFromTypebot: !0,
            command: "hidePreviewMessage"
        })
    },
    nl = () => {
        window.postMessage({
            isFromTypebot: !0,
            command: "open"
        })
    },
    ol = e => {
        const t = {
            isFromTypebot: !0,
            command: "setPrefilledVariables",
            variables: e
        };
        window.postMessage(t)
    },
    rl = e => {
        const t = {
            isFromTypebot: !0,
            command: "showPreviewMessage",
            message: e
        };
        window.postMessage(t)
    },
    il = () => {
        window.postMessage({
            isFromTypebot: !0,
            command: "toggle"
        })
    },
    sl = e => {
        const t = {
            isFromTypebot: !0,
            command: "setInputValue",
            value: e
        };
        window.postMessage(t)
    },
    al = () => {
        window.postMessage({
            isFromTypebot: !0,
            command: "unmount"
        })
    },
    ll = e => {
        const t = e.id ? document.getElementById(e.id) : document.querySelector("typebot-standard");
        if (!t) throw new Error("<typebot-standard> element not found.");
        Object.assign(t, e)
    },
    cl = e => {
        const t = document.createElement("typebot-popup");
        Object.assign(t, e), document.body.prepend(t)
    },
    dl = e => {
        const t = document.createElement("typebot-bubble");
        Object.assign(t, e), document.body.prepend(t)
    };
"undefined" != typeof window && (Ae("typebot-standard", Ie, Qa), Ae("typebot-bubble", Re, Wa), Ae("typebot-popup", Pe, Xa));
const ul = {
    initStandard: ll,
    initPopup: cl,
    initBubble: dl,
    close: el,
    hidePreviewMessage: tl,
    open: nl,
    setPrefilledVariables: ol,
    showPreviewMessage: rl,
    toggle: il,
    setInputValue: sl,
    unmount: al
};
(e => {
    "undefined" != typeof window && (window.Typebot = {
        ...e
    })
})(ul);
export {
    ul as
    default
};