class t {
    constructor(t) {
        this.t = 0,
        this.l = 0,
        this.h = {},
        this.seed = t,
        8 > this.seed.length && (this.seed = "padding_" + this.seed),
        this.seed.length % 2 == 0 && (this.seed = "1" + this.seed),
        this.i = [2972948403, 3086140710, 2071788248, 3026137486, 1411764137, 2265725585, 2923087685, 1593177610],
        this.o = 3234042090;
        for (let t = this.seed.length - 1; t >= 0; t--) {
            let e = this.seed.charCodeAt(t);
            this.o = ((this.o << 5) + this.o ^ e ^ this.o << e % 13 + 1 ^ this.o >> e % 17 + 1) >>> 0,
            this.i[t % 8] ^= ((this.o >> 9) * (this.o % 16384 + 3427) ^ e) >>> 0
        }
    }
    M() {
        let t = this.seed.charCodeAt(this.t)
          , e = this.i[this.l];
        return this.o = ((this.o << 5) + this.o + e ^ t ^ this.o << t % 17 + 1 ^ this.o >> t % 13 + 1) >>> 0,
        this.i[this.l] = (e >> 3 ^ e << t % 19 + 1 ^ this.o % 134217728 * 3427) >>> 0,
        this.t = (this.t + 1) % this.seed.length,
        this.l = (this.l + 1) % 8,
        this.o
    }
    u(t) {
        let e = [1160605769, 1424711319, 876532818, 1419174464]
          , r = 1206170165;
        if (t || (t = "?/?/?/",
        r = 3379896793),
        this.h[t])
            return this.h[t];
        for (let a = t.length - 1; a >= 0; a--) {
            let l = t.charCodeAt(a)
              , h = e[0] ^ l;
            h = (h ^ h << 11) >>> 0,
            h = (h ^ h >> 8) >>> 0,
            e[0] = e[1],
            e[1] = e[2],
            e[2] = e[3],
            e[3] = (e[3] ^ e[3] >> 19 ^ h) >>> 0,
            r = 3427 * (r ^ l << 24) ^ e[3]
        }
        for (let t = this.seed.length - 1; t >= 0; t--) {
            let a = this.seed.charCodeAt(t)
              , l = e[0] ^ a;
            l = (l ^ l << 11) >>> 0,
            l = (l ^ l >> 8) >>> 0,
            e[0] = e[1],
            e[1] = e[2],
            e[2] = e[3],
            e[3] = (e[3] ^ e[3] >> 19 ^ l) >>> 0,
            r = 3427 * (r ^ a << 24) ^ e[3]
        }
        return this.h[t] = r >>> 0,
        this.h[t]
    }
    m(t, e) {
        return (4294967296 * this.M() + this.M()) / 0x10000000000000000 * (e - t) + t
    }
    p(t, e) {
        return Math.floor(this.m(t, e + 1))
    }
    g(t) {
        return this.m(0, 1) < t
    }
    v(t, e, r) {
        return (4294967296 * this.u(r) + this.u(r + "@")) / 0x10000000000000000 * (e - t) + t
    }
    A(t, e, r) {
        return Math.floor(this.v(t, e + 1, r))
    }
    S(t, e) {
        return this.v(0, 1, e) < t
    }
    k(t) {
        return this.g(t) ? -1 : 1
    }
    q(t, e) {
        let r = 0;
        for (; this.g(t) && e > r; )
            r++;
        return r
    }
    D(t, e, r) {
        let a = 0;
        for (; (4294967296 * this.u(r + a) + this.u(r + "@" + a)) / 0x10000000000000000 < t && e > a; )
            a++;
        return a
    }
    K(t) {
        let e = 0;
        for (let r = 0; t.length > r; r++)
            e += t[r];
        let r = this.m(0, e);
        for (let e = 0; t.length > e; e++)
            if (r -= t[e],
            0 > r)
                return e;
        return 0
    }
    O(t, e) {
        let r = 0;
        for (let e = 0; t.length > e; e++)
            r += t[e];
        let a = this.v(0, r, e);
        for (let e = 0; t.length > e; e++)
            if (a -= t[e],
            0 > a)
                return e;
        return 0
    }
}
function e(t, e, r) {
    return Math.max(e, Math.min(r, t))
}
function r(t, e) {
    return `rgb(${t.map(t=>t * e * 100).join("%,")}%)`
}
function a(t, e, r) {
    let a = (a,l=(a + 6 * t) % 6)=>r - r * e * Math.max(Math.min(l, 4 - l, 1), 0);
    return [a(5), a(3), a(1)]
}
function l(l, h, n) {
    return ((l,h,n)=>{
        let i = (t=>{
            let e = [];
            return e[0] = .8 * t.m(.001, 1) * 2 ** t.m(0, 8),
            e[1] = .9 * t.m(.01, 1) * 2 ** t.m(0, 8),
            e[2] = 1 * t.m(.001, 1) * 2 ** t.m(0, 8),
            e[3] = 3 * t.m(0, 1) * 2 ** t.m(0, 8),
            e[4] = .5 * t.m(0, 1) * 2 ** t.m(0, 8),
            e[5] = .05 * t.m(0, 1) * 2 ** t.m(0, 8),
            e[6] = .5 * t.m(0, 1) * 2 ** t.m(0, 8),
            e
        }
        )(l)
          , o = []
          , f = []
          , M = 1 + (l.S(.7, "base color +1") ? 1 : 0) + l.D(.3, 3, "base color count");
        for (let t = 0; M > t; t++) {
            let r = "base color" + t;
            o.push(a(l.v(0, 1, r + "hue") ** 2, e(l.v(-.2, 1, r + "saturation"), 0, l.v(0, 1, r + "saturation bound") ** 4), e(l.v(.7, 1.1, r + "value"), 0, 1))),
            f.push(2 ** l.v(0, 6, r + "chances"))
        }
        let s = new t(l.seed + h);
        function c() {
            let t = o[s.K(f)];
            return s.g(l.v(0, .5, "base color shift chance") ** 2) && (t = [t[0], t[1], t[2]],
            t[0] = e(t[0] + l.v(0, .6, "base color shift range red") ** 2 * e(s.m(-1, 1.2), 0, 1) * e(s.k(.7) + s.k(.7), -1, 1), 0, 1),
            t[1] = e(t[1] + l.v(0, .6, "base color shift range green") ** 2 * e(s.m(-1, 1.2), 0, 1) * e(s.k(.7) + s.k(.7), -1, 1), 0, 1),
            t[2] = e(t[2] + l.v(0, .6, "base color shift range blue") ** 2 * e(s.m(-1, 1.2), 0, 1) * e(s.k(.7) + s.k(.7), -1, 1), 0, 1)),
            t
        }
        n = n || s.m(l.v(2.5, 3.5, "size min"), l.v(5, 7, "size max")) ** 3;
        let u = s.m(l.v(.5, 1, "wratio min"), l.v(1, 1.3, "wratio max"))
          , m = s.m(l.v(.7, 1, "hratio min"), l.v(1.1, 1.7, "hratio max"))
          , d = Math.floor(n * u)
          , b = Math.floor(d / 2)
          , p = Math.floor(d / 6)
          , g = (d - 6 * p) / 2
          , w = Math.floor(n * m)
          , x = Math.floor(w / 2)
          , v = Math.floor(w / 6)
          , y = (w - 6 * v) / 2
          , A = document.createElement("canvas");
        A.width = d,
        A.height = w;
        let S = A.getContext("2d")
          , k = d * w / 20;
        [()=>{
            let t = Math.ceil(d * l.v(.1, 1, "outline0 iw") / 5)
              , r = [[[b - t, 0], [b + t, w]]]
              , a = 2 + Math.floor(s.m(.5, 1) * l.v(2, 8, "outline0 bc") * n ** .5);
            for (let t = 1; a > t; t++) {
                let t = r[s.p(0, r.length - 1)]
                  , a = [t[0][0] + s.m(0, 1) * (t[1][0] - t[0][0]), t[0][1] + s.m(0, 1) * (t[1][1] - t[0][1])];
                (t[0][1] + t[1][1]) / 2 > a[1] && s.g(l.v(.5, 1.5, "outline0 frontbias")) && (a[1] = t[1][1] - (a[1] - t[0][1]));
                let h = [e(s.m(0, 1) * d, 0, d), e(s.m(0, 1) * w, 0, w)]
                  , n = k / Math.abs((h[0] - a[0]) * (h[1] - a[1]));
                if (1 > n && (h[0] = a[0] + (h[0] - a[0]) * n,
                h[1] = a[1] + (h[1] - a[1]) * n),
                a[0] > h[0]) {
                    let t = a[0];
                    a[0] = h[0],
                    h[0] = t
                }
                if (a[1] > h[1]) {
                    let t = a[1];
                    a[1] = h[1],
                    h[1] = t
                }
                r.push([[Math.floor(a[0]), Math.floor(a[1])], [Math.ceil(h[0]), Math.ceil(h[1])]])
            }
            S.fillStyle = "#fff";
            for (let t = 0; r.length > t; t++) {
                let e = r[t];
                S.fillRect(e[0][0], e[0][1], e[1][0] - e[0][0], e[1][1] - e[0][1]),
                S.fillRect(d - e[1][0], e[0][1], e[1][0] - e[0][0], e[1][1] - e[0][1])
            }
        }
        , ()=>{
            let t = Math.max(2, (k / Math.PI) ** .5)
              , e = Math.ceil(d * l.v(.1, 1, "outline1 iw") / 5)
              , r = []
              , a = Math.floor(w / (2 * e));
            for (let t = 0; a > t; t++)
                r.push({
                    B: [b, w - e * (2 * t + 1)],
                    r: e
                });
            let h = a + Math.floor(s.m(.5, 1) * l.v(10, 50, "outline1 cc") * n ** .5);
            for (let e = a; h > e; e++) {
                let e = r[Math.max(s.p(0, r.length - 1), s.p(0, r.length - 1))]
                  , a = s.m(1, t)
                  , h = s.m(Math.max(0, e.r - a), e.r)
                  , n = s.m(0, 2 * Math.PI);
                n > Math.PI && s.g(l.v(.5, 1.5, "outline1 frontbias")) && (n = s.m(0, Math.PI));
                let i = [e.B[0] + Math.cos(n) * h, e.B[1] + Math.sin(n) * h];
                a = Math.min(a, i[0], d - i[0], i[1], w - i[1]),
                r.push({
                    B: i,
                    r: a
                })
            }
            S.fillStyle = "#fff";
            for (let t = 0; r.length > t; t++) {
                let e = r[t];
                S.beginPath(),
                S.arc(e.B[0], e.B[1], e.r, 0, 7),
                S.fill(),
                S.beginPath(),
                S.arc(d - e.B[0], e.B[1], e.r, 0, 7),
                S.fill()
            }
        }
        , ()=>{
            let t = [[b, s.m(0, .05) * w], [b, s.m(.95, 1) * w]]
              , e = 6 / n + l.v(.03, .1, "outline2 basefatness")
              , r = Math.max(3, Math.ceil(s.m(.05, .1) / e * n ** .5));
            S.lineCap = ["round", "square"][l.A(0, 1, "outline2 linecap")],
            S.strokeStyle = "#fff";
            for (let a = 1; r > a; a++) {
                let r = t[a];
                r || (r = [s.m(0, 1) * d, s.m(0, 1) ** l.v(.1, 1, "outline2 frontbias") * w],
                t.push(r));
                let h = 1 + s.q(l.v(0, 1, "outline2 conadjust"), 3);
                for (let a = 0; h > a; a++) {
                    let a = t[s.p(0, t.length - 2)];
                    S.lineWidth = s.m(.7, 1) * e * n,
                    S.beginPath(),
                    S.moveTo(a[0], a[1]),
                    S.lineTo(r[0], r[1]),
                    S.stroke(),
                    S.beginPath(),
                    S.moveTo(d - a[0], a[1]),
                    S.lineTo(d - r[0], r[1]),
                    S.stroke()
                }
            }
        }
        ][l.O([1, 1, 1], "outline type")]();
        let q = S.getImageData(0, 0, d, w);
        function D(t, e) {
            return q.data[4 * (e * d + t) + 3]
        }
        let K = [];
        for (let t = 0; p > t; t++) {
            K[t] = [];
            for (let e = 0; v > e; e++)
                K[t][e] = {
                    C: t,
                    I: e,
                    x: Math.floor(g + 6 * (t + .5)),
                    y: Math.floor(y + 6 * (e + .5))
                }
        }
        let O = [K[Math.floor(p / 2)][Math.floor(v / 2)]]
          , B = 0;
        for (; O.length > B; ) {
            let t = O[B];
            if (t.C > 0) {
                let e = K[t.C - 1][t.I];
                e.j || (D(e.x, e.y) ? (e.j = 1,
                O.push(e)) : e.j = 2)
            }
            if (p - 1 > t.C) {
                let e = K[t.C + 1][t.I];
                e.j || (D(e.x, e.y) ? (e.j = 1,
                O.push(e)) : e.j = 2)
            }
            if (t.I > 0) {
                let e = K[t.C][t.I - 1];
                e.j || (D(e.x, e.y) ? (e.j = 1,
                O.push(e)) : e.j = 2)
            }
            if (v - 1 > t.I) {
                let e = K[t.C][t.I + 1];
                e.j || (D(e.x, e.y) ? (e.j = 1,
                O.push(e)) : e.j = 2)
            }
            B++
        }
        for (let t = 0; O.length > t; t++) {
            let e = O[t]
              , r = K[p - 1 - e.C][e.I];
            1 != r.j && (r.j = 1,
            O.push(r))
        }
        let C = l.A(1, 2, "base component passes")
          , I = Math.max(1, Math.floor(O.length * l.v(0, 1 / C, "extra component amount")))
          , Q = C * O.length + I;
        function j(t, e) {
            let r = Math.floor((t - g) / 6)
              , a = Math.floor((e - y) / 6);
            return 0 > r || r >= p || 0 > a || a >= v ? 0 : 1 == K[r][a].j
        }
        function F(t) {
            return 1 - t[1] / w
        }
        function N(t, e) {
            let r = Math.min(1, 1 - Math.abs(t[0] - b) / b);
            return e && (r = Math.min(r, 1 - Math.abs(t[1] - x) / x)),
            r
        }
        function G(t, e, r, a, h, n, i) {
            let o = (N(e, 1) * (1 - 1 / ((d + w) / 1e3 + 1)) * l.v(0, 1, "master bigness") ** .5 * (1 - P / Q)) ** r
              , f = 8;
            if (s.g(l.v(a, h, `com ${t} bigchance`) * o)) {
                let r = l.v(n, i, `com ${t} bigincchance`);
                for (; s.g(r * o) && Math.min(e[0] - f, d - e[0] - f, e[1] - f, w - e[1] - f) > f / 2; )
                    f *= 1.5
            }
            return f
        }
        function U(t, e, r) {
            let a = S.createLinearGradient(e[0], e[1], 2 * t[0] - e[0], 2 * t[1] - e[1])
              , l = `rgba(0,0,0,${r})`;
            return a.addColorStop(0, l),
            a.addColorStop(.5, "rgba(0,0,0,0)"),
            a.addColorStop(1, l),
            a
        }
        A.width |= 0;
        let $ = [t=>{
            let a = G(0, t, .3, 0, .9, 0, .5)
              , l = 2 * a
              , h = [Math.ceil(s.m(1, Math.max(2, a / 2))), Math.ceil(s.m(1, Math.max(2, a / 2)))]
              , n = Math.min(h[0], h[1]) * s.m(.1, 1.2)
              , i = [h[0] + 2 * n, h[1] + 2 * n]
              , o = [Math.ceil(l / i[0]), Math.ceil(l / i[1])]
              , f = [Math.round(o[0] * i[0] / 2), Math.round(o[1] * i[1] / 2)]
              , M = c()
              , u = r(M, s.m(.4, 1))
              , m = r(M, s.m(.4, 1));
            S.fillStyle = `rgba(0,0,0,${s.m(0, .25)})`,
            S.fillRect(t[0] - f[0] - 1, t[1] - f[1] - 1, i[0] * o[0] + 2, i[1] * o[1] + 2),
            S.fillStyle = m,
            S.fillRect(t[0] - f[0], t[1] - f[1], i[0] * o[0], i[1] * o[1]),
            S.fillStyle = u;
            for (let e = 0; o[0] > e; e++) {
                let r = t[0] + n + e * i[0] - f[0];
                for (let e = 0; o[1] > e; e++)
                    S.fillRect(r, t[1] + n + e * i[1] - f[1], h[0], h[1])
            }
            s.g(e(a / 8 * (.6 * P / Q + .3), 0, .98)) && (S.fillStyle = U(t, [t[0] + f[0], t[1]], s.m(0, .9)),
            S.fillRect(t[0] - f[0], t[1] - f[1], i[0] * o[0], i[1] * o[1]))
        }
        , t=>{
            let a = G(1, t, .2, .3, 1, 0, .6)
              , h = Math.ceil(s.m(.8, 2) * a)
              , n = Math.ceil(s.m(.8, 2) * a)
              , i = s.p(3, Math.max(4, h))
              , o = Math.max(1, Math.round(h / i));
            h = o * i;
            let f = r(c(), s.m(.5, 1))
              , M = s.m(.3, .9);
            if (s.g(e(l.v(-.2, 1.2, "com1 hchance"), 0, 1))) {
                let e = [t[0] - Math.floor(h / 2), t[1] - Math.floor(n / 2)];
                S.fillStyle = `rgba(0,0,0,${s.m(0, .25)})`,
                S.fillRect(e[0] - 1, e[1] - 1, h + 2, n + 2),
                S.fillStyle = f,
                S.fillRect(e[0], e[1], h, n);
                for (let r = 0; o > r; r++)
                    S.fillStyle = U([e[0] + (r + .5) * i, t[1]], [e[0] + r * i, t[1]], M),
                    S.fillRect(e[0] + r * i, e[1], i, n)
            } else {
                let e = [t[0] - Math.floor(n / 2), t[1] - Math.floor(h / 2)];
                S.fillStyle = `rgba(0,0,0,${s.m(0, .25)})`,
                S.fillRect(e[0] - 1, e[1] - 1, n + 2, h + 2),
                S.fillStyle = f,
                S.fillRect(e[0], e[1], n, h);
                for (let r = 0; o > r; r++)
                    S.fillStyle = U([t[0], e[1] + (r + .5) * i], [t[0], e[1] + r * i], M),
                    S.fillRect(e[0], e[1] + r * i, h, i)
            }
        }
        , t=>{
            let a = G(2, t, .05, 0, 1, 0, .9)
              , h = Math.ceil(s.m(.6, 1.4) * a)
              , n = Math.ceil(s.m(1, 2) * a)
              , i = [Math.ceil(e(h * s.m(.7, 1) / 2, 1, h)), Math.ceil(e(h * s.m(.8, 1) / 2, 1, h))]
              , o = [Math.floor(e(h * s.m(.05, .25), 1, n)), Math.floor(e(h * s.m(.1, .3), 1, n))]
              , f = o[0] + o[1]
              , M = s.g(l.v(0, 1, "com2 oddchance") ** .5)
              , u = e(Math.floor(n / f), 1, n)
              , m = u * f + (M ? o[0] : 0)
              , d = c()
              , b = s.m(.6, 1)
              , p = s.m(.6, 1)
              , g = [r(d, b), r(d, p)]
              , w = 1 - s.m(.5, .95)
              , x = [r(d, w * b), r(d, w * p)];
            if (s.g(l.v(0, 1, "com2 verticalchance") ** .1)) {
                let e = S.createLinearGradient(t[0] - i[0], t[1], t[0] + i[0], t[1])
                  , r = S.createLinearGradient(t[0] - i[1], t[1], t[0] + i[1], t[1])
                  , a = Math.floor(t[1] - m / 2);
                e.addColorStop(0, x[0]),
                e.addColorStop(.5, g[0]),
                e.addColorStop(1, x[0]),
                r.addColorStop(0, x[1]),
                r.addColorStop(.5, g[1]),
                r.addColorStop(1, x[1]);
                for (let l = 0; u > l; l++)
                    S.fillStyle = e,
                    S.fillRect(t[0] - i[0], a + l * f, 2 * i[0], o[0]),
                    S.fillStyle = r,
                    S.fillRect(t[0] - i[1], a + l * f + o[0], 2 * i[1], o[1]);
                M && (S.fillStyle = e,
                S.fillRect(t[0] - i[0], a + u * f, 2 * i[0], o[0]))
            } else {
                let e = S.createLinearGradient(t[0], t[1] - i[0], t[0], t[1] + i[0])
                  , r = S.createLinearGradient(t[0], t[1] - i[1], t[0], t[1] + i[1])
                  , a = Math.floor(t[0] - m / 2);
                e.addColorStop(0, x[0]),
                e.addColorStop(.5, g[0]),
                e.addColorStop(1, x[0]),
                r.addColorStop(0, x[1]),
                r.addColorStop(.5, g[1]),
                r.addColorStop(1, x[1]);
                for (let l = 0; u > l; l++)
                    S.fillStyle = e,
                    S.fillRect(a + l * f, t[1] - i[0], o[0], 2 * i[0]),
                    S.fillStyle = r,
                    S.fillRect(a + l * f + o[0], t[1] - i[1], o[1], 2 * i[1]);
                M && (S.fillStyle = e,
                S.fillRect(a + u * f, t[1] - i[0], o[0], 2 * i[0]))
            }
        }
        , t=>{
            if (s.g(F(t) - .3) || j(t[0], t[1] + 6 * 1.2) || j(t[0], t[1] + 10.8))
                for (let e = 0; 100 > e; e++) {
                    let e = s.K(i);
                    if (3 != e)
                        return void $[e](t)
                }
            let e = G(3, t, .1, .6, 1, .3, .8)
              , a = s.m(1, 2) * e
              , h = Math.ceil(s.m(.3, 1) * e)
              , n = a * s.m(.25, .6)
              , M = (a + n) / 2 / 2
              , c = [Math.max(1, Math.ceil(h * s.m(.08, .25))), Math.max(1, Math.ceil(h * s.m(.03, .15)))]
              , u = c[0] + c[1]
              , m = Math.ceil(h / u);
            h = m * u + c[0];
            let d = o[l.O(f, "com3 basecolor")]
              , b = l.v(.5, .8, "com3 lightness0 mid")
              , p = b - l.v(.2, .4, "com3 lightness0 edge")
              , g = l.v(0, .2, "com3 lightness1 edge")
              , w = [S.createLinearGradient(t[0] - M, t[1], t[0] + M, t[1]), S.createLinearGradient(t[0] - M, t[1], t[0] + M, t[1])]
              , x = Math.ceil(t[1] - h / 2)
              , v = [x + c[0], x + u];
            w[0].addColorStop(0, r(d, p)),
            w[0].addColorStop(.5, r(d, b)),
            w[0].addColorStop(1, r(d, p)),
            w[1].addColorStop(0, r(d, g)),
            w[1].addColorStop(.5, r(d, 1)),
            w[1].addColorStop(1, r(d, g)),
            S.fillStyle = w[0],
            S.beginPath(),
            S.moveTo(t[0] - n / 2, x),
            S.lineTo(t[0] + n / 2, x),
            S.lineTo(t[0] + a / 2, x + h),
            S.lineTo(t[0] - a / 2, x + h),
            S.fill(),
            S.fillStyle = w[1];
            for (let e = 0; m > e; e++) {
                let r = [e * u + c[0], (e + 1) * u]
                  , l = [v[0] + e * u, v[1] + e * u]
                  , i = [(n + r[0] / h * (a - n)) / 2, (n + r[1] / h * (a - n)) / 2];
                S.beginPath(),
                S.moveTo(t[0] - i[0], l[0]),
                S.lineTo(t[0] + i[0], l[0]),
                S.lineTo(t[0] + i[1], l[1]),
                S.lineTo(t[0] - i[1], l[1]),
                S.fill()
            }
        }
        , t=>{
            let e, a = N(t, 0), h = s.m(.7, 1), i = s.m(0, .2), o = c(), f = r(o, h), M = r(o, i), u = Math.max(3, Math.ceil(n * s.m(.4, 1) ** 2 * l.v(.02, .1, "com4 maxwidth"))), m = Math.floor(u / 2), d = u % 2, p = l.v(0, 1, "com4 directionc0") ** 4, g = .1 * l.v(0, 1, "com4 directionc1") ** 4, x = .2 * l.v(0, 1, "com4 directionc2") ** 4, v = s.K([p * (2 - a), g, x * (1 + a)]);
            if (v)
                if (2 > v) {
                    let r = Math.min(Math.max(8, w - t[1] - s.p(0, 16)), Math.floor(.6 * n * s.m(0, 1) ** l.v(2, 7, "com4 hpower1")))
                      , a = t[0] - m
                      , h = t[1]
                      , i = S.createLinearGradient(a, h, t[0] + m + d, h);
                    i.addColorStop(0, M),
                    i.addColorStop(.5, f),
                    i.addColorStop(1, M),
                    S.fillStyle = i,
                    S.fillRect(a, h, u, r),
                    e = [t[0], t[1] + r]
                } else {
                    let r = S.createLinearGradient(t[0], t[1] - m, t[0], t[1] + m + d);
                    r.addColorStop(0, M),
                    r.addColorStop(.5, f),
                    r.addColorStop(1, M),
                    S.fillStyle = r,
                    S.fillRect(t[0], t[1] - m, Math.ceil(b - t[0]) + 1, u),
                    e = [b, t[1]]
                }
            else {
                let r = Math.min(Math.max(8, t[1] - s.p(0, 16)), Math.floor(.7 * n * s.m(0, 1) ** l.v(2, 6, "com4 hpower0")))
                  , a = t[0] - m
                  , h = t[1] - r
                  , i = S.createLinearGradient(a, h, t[0] + m + d, h);
                i.addColorStop(0, M),
                i.addColorStop(.5, f),
                i.addColorStop(1, M),
                S.fillStyle = i,
                S.fillRect(a, h, u, r),
                e = [t[0], t[1] - r]
            }
            let y = [.6 * l.v(0, 1, "com4 covercomc0") ** 2, .2 * l.v(0, 1, "com4 covercomc1") ** 2, l.v(0, 1, "com4 covercomc2") ** 2];
            if ($[s.K(y)](t),
            j(e[0], e[1])) {
                let t = [e[0] + Math.round(6 * s.m(-1, 1)), e[1] + Math.round(6 * s.m(-1, 1))];
                $[s.K(y)](j(t[0], t[1]) ? t : e)
            }
        }
        , t=>{
            let e = G(5, t, .1, 0, .9, 0, .8)
              , a = s.m(.75, 1)
              , h = s.m(0, .25)
              , n = c()
              , i = r(n, a)
              , o = r(n, h)
              , f = 1 + s.q(l.v(0, 1, "com5 multxc"), Math.floor(1.2 * (e / 8) ** .6))
              , M = 1 + s.q(l.v(0, 1, "com5 multyc"), Math.floor(1.2 * (e / 8) ** .6))
              , u = s.m(.5, 1) * e / Math.max(f, M)
              , m = u + .5
              , d = u + 1
              , b = u / 5
              , p = [t[0] - u * f, t[1] - u * M];
            S.fillStyle = `rgba(0,0,0,${s.m(0, .2)})`;
            for (let t = 0; f > t; t++) {
                let e = p[0] + (2 * t + 1) * u;
                for (let t = 0; M > t; t++) {
                    let r = p[1] + (2 * t + 1) * u;
                    S.beginPath(),
                    S.arc(e, r, d, 0, 7),
                    S.fill()
                }
            }
            for (let t = 0; f > t; t++) {
                let e = p[0] + (2 * t + 1) * u;
                for (let t = 0; M > t; t++) {
                    let r = p[1] + (2 * t + 1) * u
                      , a = S.createRadialGradient(e, r, b, e, r, m);
                    a.addColorStop(0, i),
                    a.addColorStop(1, o),
                    S.fillStyle = a,
                    S.beginPath(),
                    S.arc(e, r, m, 0, 7),
                    S.fill()
                }
            }
        }
        , t=>{
            if (0 >= H || s.g(F(t)))
                return void $[s.K(i.slice(0, 6))](t);
            let e = G(6, t, .05, 0, .9, 0, .8)
              , a = Math.ceil(2 * e * s.m(.6, 1))
              , h = Math.floor(a / 2)
              , n = a % 2
              , o = a * s.m(l.v(0, .8, "com6 h1min") ** .5, .9) ** l.v(.5, 1.5, "com6 h1power")
              , f = Math.floor(o / 2)
              , M = Math.max((o - a) / 2, a * (s.m(0, .45) + s.m(0, .45)) * (l.S(.8, "com6 backnesstype") ? l.v(.2, .9, "com6 backness#pos") : l.v(-.2, -.05, "com6 backness#neg")))
              , u = Math.ceil(e * s.m(.7, 1) * l.v(.1, 3.5, "com6 width") ** .5)
              , m = Math.floor(u / 2)
              , d = u % 2
              , b = [[t[0] - m, t[1] + M - f], [t[0] + m + d, t[1] - h], [t[0] + m + d, t[1] + h + n], [t[0] - m, t[1] + M + f + a % 2]]
              , p = c();
            S.fillStyle = `rgba(0,0,0,${s.m(0, .2)})`,
            S.beginPath(),
            S.moveTo(b[0][0] - 1, b[0][1]),
            S.lineTo(b[1][0] - 1, b[1][1]),
            S.lineTo(b[2][0] - 1, b[2][1]),
            S.lineTo(b[3][0] - 1, b[3][1]),
            S.fill(),
            S.fillStyle = r(p, s.m(.7, 1)),
            S.beginPath(),
            S.moveTo(b[0][0], b[0][1]),
            S.lineTo(b[1][0], b[1][1]),
            S.lineTo(b[2][0], b[2][1]),
            S.lineTo(b[3][0], b[3][1]),
            S.fill()
        }
        ]
          , z = 0
          , H = 0
          , L = 0
          , P = 0;
        for (; ; ) {
            let t;
            if (C > H)
                O.length > L ? (t = O[L],
                L++) : (H++,
                t = O[0],
                L = 1);
            else {
                if (z >= I)
                    break;
                t = O[s.p(0, O.length - 1)],
                z++
            }
            let e = [t.x, t.y];
            for (let r = 0; 10 > r; r++) {
                let r = [t.x + s.p(-6, 6), t.y + s.p(-6, 6)];
                if (!(0 > r[0] || r[0] > d || 0 > r[1] || r[1] > w) && D(r[0], r[1])) {
                    e = r;
                    break
                }
            }
            6 > Math.abs(e[0] - b) && s.g(l.v(0, 1, "com middleness")) && (e[0] = b),
            $[s.K(i)](e),
            P++
        }
        return S.clearRect(b + d % 2, 0, d, w),
        S.scale(-1, 1),
        S.drawImage(A, -d, 0),
        A
    }
    )(l, h, n)
}
function h(t) {
    return t.getContext("2d")
}
function n(t, e) {
    let r = document.createElement("canvas");
    return r.width = t,
    r.height = e,
    [r, h(r)]
}
function i(t, e, r, a) {
    t.beginPath(),
    t.arc(e, r, a, 0, 7),
    t.fill()
}
function o(t) {
    return h(t).getImageData(0, 0, t.width, t.height)
}
function f(t) {
    let e = h(t)
      , r = o(t)
      , a = []
      , l = [];
    for (let t = 0; r.width > t; t++)
        for (let e = 0; r.height > e; e++)
            r.data[4 * (e * r.width + t) + 3] && (a.push(t),
            l.push(e));
    let n = Math.min(...a)
      , i = Math.min(...l)
      , f = e.getImageData(n, i, 1 + Math.max(...a) - n, 1 + Math.max(...l) - i);
    return t.width = f.width,
    t.height = f.height,
    e.putImageData(f, 0, 0),
    t
}
function M(t) {
    let e = t.width
      , r = t.height
      , a = Math.max(12, Math.floor(Math.min(e, r) / 12))
      , l = o(t)
      , h = Math.floor(e / a)
      , i = Math.floor(r / a)
      , f = []
      , M = Math.floor(r / i / 2);
    for (let t = 0; i > t; t++) {
        let a = Math.floor(e / ((2 - t % 2) * h));
        for (let l = 0; h - t % 2 > l; l++)
            f.push([1e9, 1e9, 0, 0, a + (l + (Math.random() - .5)) * e / h, M + (t + (Math.random() - .5)) * r / i, []])
    }
    for (let t = 0; r > t; t++)
        for (let r = 0; e > r; r++) {
            let a = 4 * (t * e + r);
            if (l.data[a + 3]) {
                let e, h = 1e9;
                f.map(a=>{
                    let l = Math.hypot(a[4] - r, a[5] - t);
                    h > l && (h = l,
                    e = a)
                }
                ),
                e[0] = Math.min(r, e[0]),
                e[2] = Math.max(r, e[2]),
                e[1] = Math.min(t, e[1]),
                e[3] = Math.max(t, e[3]),
                e[6].push([r, t, l.data.slice(a, a + 4)])
            }
        }
    let s = [];
    return f.map(t=>{
        if (1e9 > t[0]) {
            let e = t[2] - t[0] + 1
              , r = t[3] - t[1] + 1
              , [a,l] = n(e, r)
              , h = o(a);
            t[6].map(r=>h.data.set(r[2], 4 * ((r[1] - t[1]) * e + (r[0] - t[0])))),
            l.putImageData(h, 0, 0),
            s.push([t[4], t[5], t[0] - t[4], t[1] - t[5], a])
        }
    }
    ),
    s
}
function s(t, e, r) {
    let a = t[0] - e / 2
      , l = t[1] - r / 2
      , h = Math.hypot(a, l)
      , n = h ** 2
      , i = h * (.5 + 1.5 * Math.random());
    return [...t, i * (1 - l ** 2 / n) ** .5 * (a > 0 ? 1 : -1), i * (1 - a ** 2 / n) ** .5 * (l > 0 ? 1 : -1), 3 * (Math.random() - .5)]
}
let c = new (window.AudioContext || webkitAudioContext)
  , u = ([t,e,r,a,l,h=4,n=0,i=0,o=0,f=0,M=0,s=.1,u=0,m=0,d=0,b=.04,p=0,g=0,w=0])=>{
    let x, v, y, A, S = 2 * Math.PI, k = n *= 500 * S / 44100 / 44100, q = e *= (1 + .1 * Math.random() - .05) * S / 44100, D = [], K = 0, O = 0, B = 0, C = 1, I = 0, Q = 0, j = 0;
    for (M *= 500 * S / 44100 ** 3,
    m *= S / 44100,
    w *= S / 44100,
    g *= 44100,
    p = 44100 * p | 0,
    v = (o = 44100 * o + 9) + (b *= 44100) + (r *= 44100) + (a *= 44100) + (f *= 44100) | 0; v > B; D[B++] = j)
        ++Q % (100 * u | 0) || (j = h ? h > 1 ? h > 2 ? h > 3 ? Math.sin((K % S) ** 3) : Math.max(Math.min(Math.tan(K), 1), -1) : 1 - (2 * K / S % 2 + 2) % 2 : 1 - 4 * Math.abs(Math.round(K / S) - K / S) : Math.sin(K),
        j = (p ? 1 - i + i * Math.sin(S * B / p) : 1) * (j > 0 ? 1 : -1) * Math.abs(j) ** s * t * .3 * (o > B ? B / o : o + b > B ? 1 - (B - o) / b * (1 - l) : o + b + r > B ? l : v - f > B ? (v - B - f) / a * l : 0),
        j = f ? j / 2 + (f > B ? 0 : (v - f > B ? 1 : (v - B) / f) * D[B - f | 0] / 2) : j),
        x = (e += n += M) * Math.cos(m * O++),
        K += x - x * d * (1 - 1e9 * (Math.sin(B) + 1) % 2),
        C && ++C > g && (e += w,
        q += w,
        C = 0),
        !p || ++I % p || (e = q,
        n = k,
        C ||= 1);
    return y = c.createBuffer(1, v, 44100),
    y.getChannelData(0).set(D),
    A = c.createBufferSource(),
    A.buffer = y,
    A.connect(c.destination),
    A.start(),
    A
}
;
function m() {
    u([.1, 467, .06, .14, .58, , , .02, , , , , .4, 303, .5, .02])
}
function d(t) {
    u([t, 274, .03, .67, .63, , , , , .25, , 1.11, .5, , .8, .02, .04])
}
function b() {
    u([.3, 279, .09, .09, .89, 3, -4.9, .02, .02, .05, -.6, 1.2])
}
function p(t) {
    Z.save(),
    t(),
    Z.restore()
}
function w(t) {
    let[e,r] = n(t.width, t.height)
      , a = o(t)
      , l = a.data;
    for (let t = 0; l.length > t; t += 4) {
        let[e,r,a] = l.slice(t, t + 4);
        l.set([255 - (.393 * e + .769 * r + .189 * a), 255 - (.349 * e + .686 * r + .168 * a), 255 - (.272 * e + .534 * r + .131 * a)], t)
    }
    return r.putImageData(a, 0, 0),
    e
}
function x(t) {
    let[e,r] = n(20, 20)
      , a = r.createRadialGradient(10, 10, 0, 10, 10, 10);
    return a.addColorStop(t, "#ff0"),
    a.addColorStop(1, "#f00"),
    r.fillStyle = a,
    i(r, 10, 10, 10),
    e
}
function v(t) {
    let[e,r] = n(t.width, t.height);
    return r.scale(1, -1),
    r.drawImage(t, 0, 0, t.width, -t.height),
    e
}
let y, A, S, k, q, D, K, O, B, C, I, Q, j, F, N, G, U, $, z, H, L, P = ["#9af", "#abf", "#ccf", "#fef", "#fee", "#fc9", "#fc6"], Y = g, Z = h(Y), J = f(l(new t("piBbgDn4CZqlkqiF"), "ie7jMyCFouoUjkVs", 60)), T = M(J), V = J.width, W = J.height, E = Math.floor(V / 2), X = Math.floor(W / 2), R = o(J).data, _ = [], tt = [], [et,rt] = (()=>{
    let[t,e] = n(20, 60);
    return e.fillStyle = "#ff0",
    e.beginPath(),
    e.moveTo(10, 60),
    e.lineTo(0, 10),
    e.arc(10, 10, 10, Math.PI, 0),
    e.lineTo(10, 60),
    e.fill(),
    e.strokeStyle = "#0ff",
    e.shadowColor = "#00f",
    e.globalCompositeOperation = "source-atop",
    e.shadowBlur = 4,
    e.lineWidth = 10,
    e.beginPath(),
    e.moveTo(10, 70),
    e.lineTo(-3, 10),
    e.arc(10, 10, 13, Math.PI, 0),
    e.lineTo(10, 70),
    e.stroke(),
    [t, o(t).data]
}
)(), at = (()=>{
    let t = [];
    for (let e = 9; e--; )
        t.unshift(x(e / 10)),
        t.push(x(e / 10));
    return t
}
)(), lt = o(at[0]).data, [ht,nt] = (()=>{
    let[t,e] = n(60, 60)
      , r = e.createRadialGradient(30, 30, 0, 30, 30, 30);
    return r.addColorStop(.6, "#008"),
    r.addColorStop(1, "#00f"),
    e.fillStyle = r,
    i(e, 30, 30, 30),
    [t, o(t).data]
}
)(), it = JSON.parse(localStorage.pnf_highscores || 0) || [], ot = (()=>{
    let[t,e] = n(99, 99);
    e.font = "bold 20px Arial",
    e.translate(50, 50),
    e.rotate(-Math.PI / 2),
    e.fillStyle = "#fff",
    e.textAlign = "center",
    e.fillText("NEW!", 0, 0),
    f(t);
    let[r,a] = n(t.width + 10, t.height + 10);
    return a.fillStyle = "#f00",
    a.fillRect(0, 0, 1e9, 1e9),
    a.drawImage(t, 5, 5),
    r
}
)(), ft = 0, Mt = [], st = performance.now();
(t=>{
    let[e,r] = n(32, 32)
      , a = 32
      , l = 32;
    t.width > t.height ? l *= t.height / t.width : a *= t.width / t.height,
    r.drawImage(t, 0, 0, a, l);
    let h = document.createElement("link");
    h.setAttribute("rel", "icon"),
    h.setAttribute("href", e.toDataURL()),
    document.head.appendChild(h)
}
)(J);
for (let t = 0; 10 > t; t++) {
    let[e,r] = n(V + 20, W + 20)
      , a = t ? 0 : 10;
    for (let t = -1; 2 > t; t++)
        for (let e = -1; 2 > e; e++)
            r.drawImage(_[0] || J, e + a, a + t);
    r.globalCompositeOperation = "source-in",
    r.fillStyle = t > 5 ? "#0ff" : "#00f",
    r.fillRect(0, 0, 1e9, 1e9),
    r.globalCompositeOperation = "source-over",
    t && r.drawImage(_[0], 0, 0),
    _.unshift(e)
}
function ct(t) {
    F += t,
    N = (new Intl.NumberFormat).format(F)
}
function ut() {
    It += Math.max(400, 1e3 - 25 * j) + Bt.p(0, 400)
}
function mt(t) {
    let e = f(t[0]);
    t.push(o(e).data, w(e), M(e))
}
_.map(t=>{
    let e = h(t);
    e.globalCompositeOperation = "destination-out",
    e.globalAlpha = .2;
    for (let t = 5; 9 > t; t++)
        e.drawImage(_[t], 0, 0)
}
),
_.length = 5;
let dt = [["c4pf4K5xHzu4CyZM", "Wl9w64KNQvFNbbbU", 50, 10, .35, 0, []], ["VTjHVRDIYTbXk766", "a3QM5c7MnbQlWns3", 80, 30, .27, 0, []], ["1fOXvyryYCvwBWPL", "I4xttvPYWxB1So2A", 230, 80, .2, 6, []], ["VsM4qdcBSiuCPDGJ", "q4D72OvJMb23kSZC", 60, 20, .4, 0, []], ["l4pyu8yF0mt84Q4u", "jPU5GcKNpf2JMgoG", 100, 40, .35, 0, [[350]]], ["NMp3mtsPHIwzMKYk", "dBzvSKo7wpema3S5", 220, 90, .22, 9, []], ["o67yOby6izpasGgo", "fyKKupDEId96qQHu", 70, 20, .5, 0, [[350]]], ["IU7xqL8UqZIXJQDQ", "aVBO8buAfBbQ4DOY", 100, 40, .35, 0, [[350, 6]]], ["LP6kUeGMn7S5xZzi", "p5O7jAQK67mDULTD", 230, 100, .25, 14, []], ["SsSvCKpjLVTGITYH", "aOEjI2Owpqpl06ex", 65, 30, .5, 0, [[350]]], ["AGUwhB1E94wgKe49", "pwUtokX7oS7ZKFK1", 110, 50, .35, 6, [[350, 6]]], ["qRF6GA3xnzX0lMcH", "RIdNudvB6T2ro7C3", 240, 120, .3, 22, []]];
function bt(t, e) {
    let r = Math.round(t[0] - t[2] / 2)
      , a = Math.round(t[1] - t[3] / 2)
      , l = Math.round(e[0] - e[2] / 2)
      , h = Math.round(e[1] - e[3] / 2);
    if (l + e[2] > r && r + t[2] > l && h + e[3] > a && a + t[3] > h) {
        let n = Math.min(r + t[2], l + e[2])
          , i = Math.min(a + t[3], h + e[3])
          , [o,f,M] = r > l ? [0, r - l, n - r] : [l - r, 0, n - l]
          , [s,c,u] = a > h ? [0, a - h, i - a] : [h - a, 0, i - h];
        for (let r = 0; u > r; r++)
            for (let a = 0; M > a; a++)
                if (t[4][4 * ((s + r) * t[2] + o + a) + 3] > 0 && e[4][4 * ((c + r) * e[2] + f + a) + 3] > 0)
                    return 1
    }
}
function pt() {
    Q ? (Q--,
    u([.9, 119, 0, .44, .85, 0, 5.3, , , .01, -4.2, .09, .1, -340, .7, .08])) : O || (d(1),
    O = 1)
}
function gt(t, e) {
    let[r,a] = n(99, 99);
    return a.font = "bold 40px Arial",
    a.fillStyle = e,
    a.fillText(t, 0, 50),
    f(r)
}
let wt, xt, vt, yt = [gt("F", "#fa0"), gt("S", "#0ff"), gt("B", "#f00")], At = [t=>{
    C = t + 6500
}
, ()=>{
    u([.5, 505, .12, .46, .69, 2, , , .21, , , 1.67, , , , .03, .28, .02, 58]),
    Q++
}
, t=>{
    d(1.5),
    I = t + 1e3,
    It += 1500
}
];
function St([t,e,r,a,l,h,n,i], o, f, M, s) {
    return c=>{
        let u = (c - s) / M;
        if (1 > u)
            return p(()=>{
                Z.globalAlpha = 1 - u ** 2,
                Z.translate(o + t + h * u, f + e + n * u),
                Z.rotate(i * u),
                Z.drawImage(l, r, a)
            }
            ),
            1
    }
}
function kt(t, e, r, a, l, h) {
    let n = at[0].width
      , i = at[0].height
      , o = Math.hypot(r - t, a - e)
      , f = (r - t) / o
      , M = (a - e) / o;
    return r=>{
        if (I > r)
            return;
        let a = r - h;
        return bt(K, [t += a * l * f, e += a * l * M, n, i, lt]) && (pt(),
        !O) || e - i / 2 > 700 || 0 > e + i / 2 || t - n / 2 > 480 || 0 > t + n / 2 ? void 0 : (h = r,
        Z.drawImage(at[r % at.length | 0], t - n / 2, e - i / 2),
        2)
    }
}
function qt(t, e, r, a, l, h, n) {
    for (let i = 0; e > i; i++) {
        let o = l + 2 * i * Math.PI / e;
        t.push(kt(r, a, r + 100 * Math.cos(o), a + 100 * Math.sin(o), h, n))
    }
}
function Dt() {
    return (navigator.getGamepads ? [...navigator.getGamepads()] : []).filter(t=>!!t)
}
function Kt(t) {
    let e = Dt();
    for (let r = 0; e.length > r; r++)
        try {
            if (e[r].buttons[t].pressed)
                return 1
        } catch (t) {}
}
function Ot(t) {
    let e = Dt()
      , r = 0;
    for (let a = 0; e.length > a; a++)
        try {
            r += e[a].axes[t]
        } catch (t) {}
    return Math.round(100 * r) / 100
}
let Bt, Ct, It, Qt, jt, Ft, Nt, Gt, Ut = 5;
function $t(t) {
    t.preventDefault();
    let e = 480 / 700
      , [r,a] = Y.offsetWidth / Y.offsetHeight > e ? [Y.offsetHeight * e, Y.offsetHeight] : [Y.offsetWidth, Y.offsetWidth / e]
      , [l] = t.changedTouches || [t];
    return [Math.floor(480 * (l.pageX - (Y.offsetWidth - r) / 2) / r), Math.floor(700 * (l.pageY - (Y.offsetHeight - a) / 2) / a)]
}
self.onmousedown = t=>{
    $t(t),
    ft = 1
}
,
self.ontouchstart = t=>{
    [y,A] = $t(t),
    ft = 1
}
,
self.onmousemove = t=>{
    [S,k] = $t(t)
}
,
self.ontouchmove = t=>{
    let[e,r] = $t(t);
    S += e - y,
    k += r - A,
    y = e,
    A = r
}
,
self.ontouchend = self.onmouseup = t=>{
    $t(t),
    ft = 0
}
,
self.onkeydown = self.onkeyup = t=>{
    Mt[t.keyCode] = t.type[5]
}
,
Y.width = 480,
Y.height = 700,
function e(r) {
    2 == G ? (t=>{
        let e = t - Gt;
        Gt = t,
        e > 160 && (st += e,
        e = 0,
        Mt = []);
        let r = t - st;
        if (!O) {
            let t = .6 * e
              , r = Ot(0)
              , a = Ot(1);
            if ((Mt[38] || Mt[90] || Kt(12)) && a--,
            (Mt[40] || Mt[83] || Kt(13)) && a++,
            (Mt[37] || Mt[65] || Kt(14)) && r--,
            (Mt[39] || Mt[68] || Kt(15)) && r++,
            r || a) {
                let e = Math.max(Math.hypot(r, a), 1);
                q += t * r / e,
                D += t * a / e,
                S = q,
                k = D
            } else {
                let e = S - q
                  , r = k - D
                  , a = Math.hypot(e, r);
                a > t ? (q += e / a * t,
                D += r / a * t) : (q = S,
                D = k)
            }
            E > q ? q = E : q > 480 - E && (q = 480 - E),
            X > D ? D = X : D > 700 - X && (D = 700 - X),
            K = [q, D, V, W, R]
        }
        Z.fillStyle = "#002",
        Z.fillRect(0, 0, 1e9, 1e9);
        for (let t, e = 100; e--; Z.fillStyle = P[e % P.length],
        i(Z, -60 * (1 - e / 100) * q / (480 - V) + 102797 * (1 + Math.sin(t)) * e % 540, 700 * (Math.tan(e / 9) + t * r / 3e3) % 700, 3.3 * (t - .3)))
            t = 150 / (3 * e + 200);
        let a = O
          , l = []
          , h = []
          , n = [];
        function o(t) {
            let e = []
              , a = t(r, e);
            a && (a - 2 ? l.push(t) : h.push(t),
            a.call && n.push(a)),
            e.map(o)
        }
        if (wt.map(o),
        !a && O && (B = r,
        T.map(t=>St(s(t, V, W), q - E, D - X, 1500, r)).map(o)),
        wt = l.concat(h),
        xt = n,
        Z.fillStyle = "#fff",
        Z.textAlign = "center",
        O)
            p(()=>{
                Z.globalAlpha = Math.min(1, (r - B) / 2e3),
                Z.textBaseline = "middle",
                Z.font = "40px Arial",
                Z.fillText("Game Over", 240, 350)
            }
            );
        else {
            if (Q) {
                let t = _[Math.max(0, _.length - Q)];
                Z.drawImage(t, q - Math.floor(t.width / 2), D - Math.floor(t.height / 2))
            }
            Z.drawImage(J, q - E, D - X)
        }
        I > r && p(()=>{
            Z.globalAlpha = (I - r) / 1e3,
            Z.fillRect(0, 0, 1e9, 1e9)
        }
        ),
        Z.textBaseline = "top",
        Z.font = "16px Arial",
        Z.fillText(N, 240, 5);
        let f = C > r;
        if (!O && r > vt + (f ? 100 : 200) && (Ut = -Ut,
        wt.push(((t,e,r)=>a=>{
            let l = [t, e -= .625 * (a - r), et.width, et.height, rt];
            for (let t = 0; xt.length > t; t++)
                if (xt[t](l, 10, a))
                    return;
            if (e + et.height / 2 > 0)
                return r = a,
                Z.drawImage(et, t - et.width / 2, e - et.height / 2),
                1
        }
        )(q + (f ? Ut : 0), D - Math.floor(W / 2), r)),
        vt = Math.max(r),
        u([.04, 292, .01, .08, .74, 3, -3.9, .43, .02])),
        r > Qt && !Nt && (++j % 5 ? Qt = r + 1e4 : (Nt = 1,
        wt.push(((t,e)=>{
            let r, a, l = $.width, h = $.height, n = 0, i = 1e9, o = e, f = 240, M = -500, c = 0, d = 0, g = 0;
            function w(t, e, a) {
                if (bt(t, r))
                    return d = a,
                    i -= e,
                    i > 0 && m(),
                    1
            }
            return (e,m)=>{
                let x = 0;
                if (i > 0) {
                    let r = e - o;
                    n ? 0 == c ? (f += .1 * r,
                    f + l / 2 > 480 && (f = 480 - l / 2,
                    c = 1)) : (f -= .1 * r,
                    0 > f - l / 2 && (f = l / 2,
                    c = 0)) : (M += .2 * r,
                    M > 150 && (M = 150,
                    i = 100 + 250 * t,
                    n = 1,
                    a = e))
                } else
                    x = 1;
                if (x)
                    return u([1.1, 369, .1, 1, .77, 2, .4, , , .37, , .05, .8, -1.3, .7]),
                    ct(500 * t),
                    Qt = e + 1e4,
                    jt = It = 500 + e,
                    ut(),
                    L.map(t=>m.push(St(s(t, l, h), f - l / 2, M - h / 2, 500, e))),
                    Nt = 0;
                r = [f, M, l, h, z],
                bt(K, r) && (O = 1),
                o = e,
                Z.drawImage($, f - l / 2, M - h / 2);
                let v = 400 - e + d;
                if (v > 0 && p(()=>{
                    Z.globalAlpha = v / 400,
                    Z.drawImage(H, f - l / 2, M - h / 2)
                }
                ),
                !O && 1 == n && e > a) {
                    if (b(),
                    5 * t > g) {
                        let[r,a] = [[28, 119], [42, 123], [108, 94], [121, 80], [143, 50]][Math.floor(g / t)];
                        m.push(kt(f - r, M + a, f - r, M + a + 100, .5, e), kt(f + r, M + a, f + r, M + a + 100, .5, e))
                    } else
                        m.push(kt(f, M + 125, q, D, .3, e));
                    g++,
                    10 * t > g ? a = g > 5 * t ? e + 200 : g == 5 * t ? e + 800 : g % t ? e + 180 : e + 500 : (g = 0,
                    a = e + 800)
                }
                return w
            }
        }
        )(Math.floor(j / 5), r)))),
        r > jt && !Nt && (wt.push(((t,e,r,a)=>l=>{
            let h = [t, e += 5 * (l - a) / 32, ht.width, ht.height, nt]
              , n = .75 + Math.sin(l / 200) / 4
              , i = yt[r];
            return !O && bt(K, h) ? At[r](l) : e - Math.floor(ht.height / 2) > 700 ? void 0 : (a = l,
            p(()=>{
                Z.translate(t, e),
                Z.drawImage(ht, -ht.width / 2, -ht.height / 2),
                Z.scale(n, n),
                Z.drawImage(i, -i.width / 2, -i.height / 2)
            }
            ),
            2)
        }
        )(Ct.p(30, 450), Math.floor(-ht.height / 2), Ft++, r)),
        Ft %= yt.length,
        jt = r + 9e3),
        r > It && !Nt) {
            let t = Bt.p(Math.min(Math.max(j - 2, 0), tt.length - 3), Math.min(j, tt.length - 1));
            wt.push((([t,e,r,a,l,h,n,i],o,f,M)=>{
                let c, u = Bt.m(0, 2 * Math.PI), g = t.width, w = t.height, x = -w / 2, v = 0;
                function y(t, r, a) {
                    if (bt(t, c))
                        return v = a,
                        (e -= r) > 0 && m(),
                        1
                }
                return (m,A)=>{
                    let S = x
                      , k = 400 - m + v
                      , B = 0;
                    if (0 >= e || I > m ? B = 1 : (x += (m - M) * r,
                    c = [o, x, g, w, h],
                    bt(K, c) && (pt(),
                    O || (B = 1))),
                    B)
                        return d(g / 275),
                        a > 0 && qt(A, a, o, x + 17 * r, u, .45, m),
                        i.map(t=>A.push(St(s(t, g, w), o - g / 2, x - w / 2, 500, m))),
                        ct(f);
                    if (700 >= x - w / 2) {
                        if (M = m,
                        Z.drawImage(t, o - g / 2, x - w / 2),
                        k > 0 && p(()=>{
                            Z.globalAlpha = k / 400,
                            Z.drawImage(n, o - g / 2, x - w / 2)
                        }
                        ),
                        !O)
                            for (let t = 0; l.length > t; t++) {
                                let e = l[t][0];
                                if (e > S && x > e) {
                                    b();
                                    let e = l[t][1]
                                      , a = x + 17 * r;
                                    e ? qt(A, e, o, a, u, .3, m) : A.push(kt(o, a, q, D, .3, m))
                                }
                            }
                        return y
                    }
                }
            }
            )(tt[t], Bt.p(30, 450), 50 * (t + 1), r)),
            ut()
        }
        O && r > B + 3500 && ((()=>{
            let t = [F, Date.now()];
            F && (it.push(t),
            it.sort((t,e)=>e[0] - t[0] || e[1] - t[1]),
            it.length = Math.min(it.length, 5),
            localStorage.pnf_highscores = JSON.stringify(it)),
            U = it.indexOf(t)
        }
        )(),
        G = 1,
        ft = 0)
    }
    )(r) : (e=>{
        Z.fillStyle = "#002",
        Z.fillRect(0, 0, 1e9, 1e9);
        for (let t = 100; t--; ) {
            Z.fillStyle = P[t % P.length];
            let r = 100 / (4 - (e / 1e3 + t / 13) % 4);
            i(Z, Math.cos(t) * r + 240, Math.sin(t * t) * r + 350, r / 100)
        }
        if (Z.fillStyle = "#fff",
        Z.textBaseline = "middle",
        Z.textAlign = "center",
        G)
            Z.font = "italic small-caps 40px Futura-CondensedMedium,sans-serif-condensed,sans-serif",
            it.length ? (Z.fillText("High Scores", 240, 100),
            p(()=>{
                Z.textAlign = "start",
                Z.textBaseline = "top";
                for (let t = 0; it.length > t; t++) {
                    Z.fillStyle = "#fff",
                    t == U && (Z.drawImage(ot, 90 - Math.floor(ot.width / 2), 185 + 80 * t - Math.floor(ot.height / 2)),
                    Z.fillStyle = "#fc6");
                    let e = Intl.NumberFormat().format(it[t][0])
                      , r = new Date(it[t][1]).toLocaleString();
                    Z.font = "50px Arial",
                    Z.fillText(t + 1, 115, 160 + 80 * t),
                    Z.font = "60px Arial",
                    Z.fillText("{", 145, 150 + 80 * t),
                    Z.font = "25px Arial",
                    Z.fillText(e + " points", 170, 160 + 80 * t),
                    Z.font = "15px Arial",
                    Z.fillText(r, 170, 190 + 80 * t)
                }
            }
            )) : Z.fillText("Space Shooter impact", 240, 350),
            Z.font = "20px Arial",
            Z.fillText("<Touch anywhere to play>", 240, 670),
            (ft || Mt[13] || Kt(9)) && (G = 2,
            Bt = new t("enemy"),
            Ct = new t("powerup"),
            It = 1e3,
            Qt = 5e3,
            jt = 9e3,
            wt = [],
            xt = [],
            Gt = st = performance.now(),
            ct(Nt = O = j = Ft = vt = I = C = F = 0),
            S = q = 240,
            k = D = 630,
            Q = 1);
        else if (Z.font = "italic 30px Arial",
        Z.fillText("Loading\u2026", 240, 350),
        $)
            if (dt.length > tt.length)
                tt.push((([e,r,a,...h])=>[v(l(new t(e), r, a)), ...h])(dt[tt.length]));
            else {
                for (let t = 0; tt.length > t; t++)
                    if (!tt[t][5])
                        return mt(tt[t]);
                G = 1
            }
        else
            $ = v(f(l(new t("HYj7ADLjQr6icLtO"), "CdiB9N2ZoQWuAxur", 270))),
            H = w($),
            L = M($),
            z = o($).data
    }
    )(r),
    requestAnimationFrame(e)
}(st);
