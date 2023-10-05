(()=>{
    "use strict";
    var e = {
        370: (e,t,n)=>{
            n.r(t)
        }
        ,
        2142: (e,t,n)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.Main = void 0;
            var o = n(7343)
              , i = n(8571)
              , r = n(5220)
              , a = n(3348)
              , s = function() {
                function e() {}
                return e.start = function() {
                    e.loadServiceWorkerIfNeeded(),
                    e.showLocalHostLabelIfNeeded(),
                    e.removeAdsForPurchased(),
                    e.testIfInIframe(),
                    e.loadTheme((new r.GameSettingsManager).getThemeName()),
                    e.registerBackButtonHandler(),
                    o.Envirorment.makePlatformEngine().isPurchaseConfirmed() ? o.Envirorment.getPlatformType() === i.PlatformType.Web && (window.location.hash = "",
                    a.ActivityManager.load("unlockcodeview-web")) : a.ActivityManager.load("main")
                }
                ,
                e.loadTheme = function(e) {
                    for (var t = 0; t < document.querySelector("body").classList.length; t++) {
                        var n = document.querySelector("body").classList.item(t);
                        0 === n.indexOf("theme") && document.querySelector("body").classList.remove(n)
                    }
                    "" !== e && document.querySelector("body").classList.add(e)
                }
                ,
                e.showLocalHostLabelIfNeeded = function() {
                    if (o.Envirorment.getPlatformType() === i.PlatformType.Web && o.Envirorment.isLocalHost()) {
                        document.querySelector("body").appendChild(document.createRange().createContextualFragment('<div class="localhostLabel">localhost</div>').firstChild)
                    }
                }
                ,
                e.loadServiceWorkerIfNeeded = function() {
                    o.Envirorment.getPlatformType() !== i.PlatformType.Web || o.Envirorment.isLocalHost() || "serviceWorker"in navigator && navigator.serviceWorker.register("service-worker.js").then((function(e) {
                        console.log("ServiceWorker registration successful with scope: ", e.scope)
                    }
                    ), (function(e) {
                        console.log("ServiceWorker registration failed: ", e)
                    }
                    ))
                }
                ,
                e.testIfInIframe = function() {
                    try {
                        var e = window.self !== window.top;
                        o.Envirorment.getTracker().trackLoadInIframe(e)
                    } catch (e) {}
                }
                ,
                e.removeAdsForPurchased = function() {
                    if (o.Envirorment.makePlatformEngine().isPurchased()) {
                        var e = document.getElementById("ads");
                        e.parentNode.removeChild(e)
                    }
                }
                ,
                e.registerBackButtonHandler = function() {
                    history.pushState(null, null, location.href),
                    window.onpopstate = function() {
                        a.ActivityManager.isMainActivityLoaded() || history.go(1),
                        a.ActivityManager.passBackButtonClickEvent()
                    }
                }
                ,
                e
            }();
            t.Main = s
        }
        ,
        7343: (e,t,n)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.Envirorment = void 0;
            var o = n(9885)
              , i = n(8936)
              , r = n(2543)
              , a = n(8571)
              , s = n(606)
              , l = function() {
                function e() {}
                return e.isDebug = function() {
                    return !!document.querySelector('meta[name="app.debug"]') && "true" === document.querySelector('meta[name="app.debug"]').getAttribute("content") && -1 !== window.location.search.indexOf("debug")
                }
                ,
                e.isLocalHost = function() {
                    return "localhost" === window.location.hostname || "127.0.0.1" === window.location.hostname
                }
                ,
                e.getPlatformType = function() {
                    return a.PlatformType.Web
                }
                ,
                e.makePlatformEngine = function() {
                    return e.getPlatformType() === a.PlatformType.Web ? new s.WebPlatformEngine : e.getPlatformType() === a.PlatformType.IOS ? new r.IOSPlatformEngine : void 0
                }
                ,
                e.getAppVersion = function() {
                    var t = document.querySelector('meta[name="app.version"]').getAttribute("content");
                    return t ? [e.APP_VERSION, ".", t].join("") : e.APP_VERSION
                }
                ,
                e.getTracker = function() {
                    if (e.getPlatformType() === a.PlatformType.Web)
                        return new i.GoogleAnalyticsTracker;
                    throw new Error("Tracker not implemented for this platform")
                }
                ,
                e.getDefaultSoundEffectsEngine = function() {
                    return new o.MidiSoundEffects
                }
                ,
                e.APP_VERSION = "2.0",
                e
            }();
            t.Envirorment = l
        }
        ,
        8936: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.GoogleAnalyticsTracker = void 0;
            var n = function() {
                function e() {}
                return e.prototype.trackActivityLoad = function(t) {
                    this.sendEvent(e.CATEGORY_ACTIVITY, e.ACTION_LOAD, t)
                }
                ,
                e.prototype.levelLoaded = function(t) {
                    this.sendEvent(e.CATEGORY_LEVEL, e.ACTION_LOAD, "" + t)
                }
                ,
                e.prototype.levelCompleted = function(t, n) {
                    this.sendEvent(e.CATEGORY_LEVEL, e.ACTION_COMPLETED + "_" + t, "" + n)
                }
                ,
                e.prototype.appUnlocked = function() {
                    this.sendEvent(e.CATEGROY_GAME, e.ACTION_UNLOCKED, "")
                }
                ,
                e.prototype.trackLoadInIframe = function(t) {
                    this.sendEvent(e.CATEGROY_GAME, e.ACTION_LOADED_IN_IFRAME, t ? "yes" : "no")
                }
                ,
                e.prototype.sendEvent = function(e, t, n) {
                    try {
                        window.ga("send", "event", e, t, n)
                    } catch (e) {}
                }
                ,
                e.CATEGORY_ACTIVITY = "activity",
                e.CATEGORY_LEVEL = "level",
                e.CATEGROY_GAME = "game",
                e.ACTION_LOAD = "load",
                e.ACTION_UNLOCKED = "unlocked",
                e.ACTION_COMPLETED = "completed",
                e.ACTION_LOADED_IN_IFRAME = "loadedInIframe",
                e
            }();
            t.GoogleAnalyticsTracker = n
        }
        ,
        2543: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.IOSPlatformEngine = void 0;
            var n = function() {
                function e() {}
                return e.prototype.isOffline = function() {
                    throw new Error("Method not implemented.")
                }
                ,
                e.prototype.isPurchaseConfirmed = function() {
                    throw new Error("Method not implemented.")
                }
                ,
                e.prototype.showUnlockCode = function() {
                    throw new Error("Method not implemented.")
                }
                ,
                e.prototype.confirmPurchased = function() {
                    throw new Error("Method not implemented.")
                }
                ,
                e.prototype.validateUnlockCode = function(e) {
                    throw Error("Unlock code is not supported for IOS platform")
                }
                ,
                e.prototype.getPurchaseAction = function() {
                    return ""
                }
                ,
                e.prototype.isPurchased = function() {
                    return !0
                }
                ,
                e.prototype.getNumberOfFreeLevels = function() {
                    return 10
                }
                ,
                e
            }();
            t.IOSPlatformEngine = n
        }
        ,
        8571: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.PlatformType = void 0,
            function(e) {
                e[e.Web = 1] = "Web",
                e[e.FB = 2] = "FB",
                e[e.IOS = 3] = "IOS",
                e[e.Android = 5] = "Android"
            }(t.PlatformType || (t.PlatformType = {}))
        }
        ,
        606: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.WebPlatformEngine = void 0;
            var n = function() {
                function e() {}
                return e.prototype.getPurchaseAction = function() {
                    return "purchase-web"
                }
                ,
                e.prototype.isOffline = function() {
                    return "onLine"in navigator && !1 === window.navigator.onLine
                }
                ,
                e.prototype.isPurchaseConfirmed = function() {
                    var e = this.generateCode([1, 2, 5, 2, 11, 9, 12, 7, -4, 4, 6, 3, 4, 12, 22, 1, 4, 5, -5, 3, 7, -8, 11, 3, -2, 33, 11, 22, 7, 4, 7, 2, 4, 9, 1, 6, 7, -2, 3, 22, 7, 14, 1, -23, 11, 2, 3, 8, 2, 2, 2, 2, 4, 5, 6, 1, 1, 1, 2, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 11, 2, -1, -1, -2, -3, -2, -2, -2, -2, -4, -5, -6, -1, -1, -1, -2, -2, -3, -1, -2, -3, -1, -2, -3, 20, -3, -3]);
                    return window.location.hash.indexOf(e) > 0
                }
                ,
                e.prototype.isPurchased = function() {
                    var t = this.generateCode(e.PURCHASE_KEY);
                    return window.localStorage.getItem(t) === this.generateCode(e.PURCHASE_VALUE)
                }
                ,
                e.prototype.getNumberOfFreeLevels = function() {
                    return 15
                }
                ,
                e.prototype.validateUnlockCode = function(t) {
                    return t.length === e.CODE.length + 4 && t.substr(2, e.CODE.length) === this.generateCode(e.CODE)
                }
                ,
                e.prototype.confirmPurchased = function() {
                    var t = this.generateCode(e.PURCHASE_KEY);
                    window.localStorage.setItem(t, this.generateCode(e.PURCHASE_VALUE))
                }
                ,
                e.prototype.showUnlockCode = function() {
                    return [this.generateCode([this.getRandomNum(), this.getRandomNum()]).toLowerCase(), this.generateCode(e.CODE), this.generateCode([this.getRandomNum(), this.getRandomNum()]).toLowerCase()].join("")
                }
                ,
                e.prototype.getRandomNum = function() {
                    return Math.floor(10 * Math.random() + 1)
                }
                ,
                e.prototype.generateCode = function(e) {
                    for (var t = "fERTGHUKHFCDWRTHGRR467TVGHkjadsfh239f8h3fjrakhfR467TVGHkjadsfh239f8h3fjakhf1ljHH3JJk4hg391048ghkjhahljHsHJJk4hga390R4r67TVGaHkjadhsfh239f8h3fjakhfljHHJJk4hg39048ghkjah48ghkjahdslgh4HJJYYJ398ghkR467TVGHkjadsfh239f8h3fjakhfljHHJJk4hg39048ghkjahjaghlsdkjghu349ughpgihalkjghvbhlkjhlKJFEHBEfp93ADR467TVGHkjadsfh239f8h3fjakhfljHHJJk4hg39048ghkjahE2fhkjlhlBSJFhlkjh", n = 0, o = [], i = 0; i < e.length; i++)
                        (n += e[i]) >= t.length && (n = 0),
                        o.push(t.charAt(n));
                    return o.join("")
                }
                ,
                e.PURCHASE_KEY = [22, 3, 4, -4, 2, 13, 17, 45, -32, 11, 8, 5],
                e.PURCHASE_VALUE = [1, 3, 4, 5, -2, 15, 17, 8, -3, 12, 24, 7, -8, 9, 14, 31, 8, -9, 12, 4, 6, 8],
                e.CODE = [30, -2, 14, -14, 4, 43, -41],
                e
            }();
            t.WebPlatformEngine = n
        }
        ,
        4854: (e,t,n)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.GameBoard = void 0;
            var o = n(8819)
              , i = function() {
                function e(e) {
                    this.setBoardSize(e)
                }
                return e.prototype.setBoardSize = function(e) {
                    (e = Math.ceil(e)) % 2 != 0 && e++,
                    this.boardSize = e < 2 ? 2 : e > 36 ? 36 : e
                }
                ,
                e.prototype.countNumberOfOpenedAndNotSeenItems = function() {
                    var e = 0;
                    return this.memoryItems.forEach((function(t) {
                        t.isOpened() && !t.isSeen() && e++
                    }
                    )),
                    e
                }
                ,
                e.prototype.isOpeningAllowed = function() {
                    return this.countNumberOfOpenedAndNotSeenItems() < 2
                }
                ,
                e.prototype.isGuessed = function() {
                    if (2 === this.countNumberOfOpenedAndNotSeenItems()) {
                        var e = this.findOpenedAndNotSeenMemoryItem(!0)
                          , t = this.findOpenedAndNotSeenMemoryItem(!1);
                        return e.compare(t)
                    }
                    throw Error("There are no two items opened to compare")
                }
                ,
                e.prototype.areAllItemsGuessed = function() {
                    var e = !0;
                    return this.memoryItems.forEach((function(t) {
                        !1 === t.isSeen() && (e = !1)
                    }
                    )),
                    e
                }
                ,
                e.prototype.countNumberOfNotSeenItems = function() {
                    var e = 0;
                    return this.memoryItems.forEach((function(t) {
                        t.isSeen() || e++
                    }
                    )),
                    e
                }
                ,
                e.prototype.convertOpenedToSeen = function() {
                    this.memoryItems.forEach((function(e) {
                        e.isOpened() && e.setSeen(!0)
                    }
                    ))
                }
                ,
                e.prototype.findOpenedAndNotSeenMemoryItem = function(e) {
                    var t = null
                      , n = 0;
                    return this.memoryItems.forEach((function(o) {
                        o.isOpened() && !o.isSeen() && (1 === ++n && e ? t = o : 2 !== n || e || (t = o))
                    }
                    )),
                    t
                }
                ,
                e.prototype.closeAllOpened = function() {
                    this.memoryItems.forEach((function(e) {
                        e.setOpened(!1)
                    }
                    ))
                }
                ,
                e.prototype.getBoardSize = function() {
                    return this.boardSize
                }
                ,
                e.prototype.getMemoryItems = function() {
                    return this.memoryItems
                }
                ,
                e.prototype.start = function() {
                    var e = this.generateValuesArray();
                    this.memoryItems = new Array,
                    this.setupAndShuffleMemoryItems(e)
                }
                ,
                e.prototype.getNumberOfMemoriItems = function() {
                    return this.boardSize
                }
                ,
                e.prototype.getNumberOfSymbols = function() {
                    return this.getNumberOfMemoriItems() / 2
                }
                ,
                e.prototype.generateValuesArray = function() {
                    for (var e = new Array, t = 0; t < this.getNumberOfSymbols(); t++)
                        e.push(t + 1),
                        e.push(t + 1);
                    return e
                }
                ,
                e.prototype.setupAndShuffleMemoryItems = function(e) {
                    for (var t, n = e.length; n; )
                        t = Math.floor(Math.random() * n--),
                        this.memoryItems.push(new o.MemoryItem(e.splice(t, 1)[0]))
                }
                ,
                e.prototype.findHiddenPairItem = function() {
                    var e = this.findOpenedAndNotSeenMemoryItem(!0)
                      , t = null;
                    return this.memoryItems.forEach((function(n) {
                        n == e || n.isOpened() || n.isSeen() || !n.compare(e) || (t = n)
                    }
                    )),
                    t
                }
                ,
                e
            }();
            t.GameBoard = i
        }
        ,
        1355: (e,t,n)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.GameEngine = t.OpenMemoryItemResult = void 0;
            var o, i = n(4854), r = n(6244);
            !function(e) {
                e[e.ALREADY_OPEN = 1] = "ALREADY_OPEN",
                e[e.ALREADY_SEEN = 2] = "ALREADY_SEEN",
                e[e.PROCESSING = 3] = "PROCESSING",
                e[e.OK_WAITING_NEXT_MOVE = 4] = "OK_WAITING_NEXT_MOVE",
                e[e.OK_READY_FOR_PROCESSING = 5] = "OK_READY_FOR_PROCESSING"
            }(o = t.OpenMemoryItemResult || (t.OpenMemoryItemResult = {}));
            var a = function() {
                function e(e) {
                    this.level = e,
                    this.board = new i.GameBoard(e.numberOfFields),
                    this.gameScore = new r.GameScore(e)
                }
                return e.prototype.start = function() {
                    this.board.start()
                }
                ,
                e.prototype.getGameScore = function() {
                    return this.gameScore
                }
                ,
                e.prototype.getBoard = function() {
                    return this.board
                }
                ,
                e.prototype.openMemoryItem = function(e) {
                    return this.board.isOpeningAllowed() ? e.isOpened() ? o.ALREADY_OPEN : e.isSeen() ? o.ALREADY_SEEN : (e.toggleOpened(),
                    2 === this.board.countNumberOfOpenedAndNotSeenItems() ? (this.getGameScore().popGuess(),
                    o.OK_READY_FOR_PROCESSING) : o.OK_WAITING_NEXT_MOVE) : o.PROCESSING
                }
                ,
                e.prototype.processOpenedMemoryItems = function() {
                    return this.board.isGuessed() ? (this.board.convertOpenedToSeen(),
                    this.gameScore.convertSuccessfullMoveToScore(this.isLevelCompleted()),
                    !0) : (this.board.closeAllOpened(),
                    !1)
                }
                ,
                e.prototype.isLevelCompleted = function() {
                    return this.board.areAllItemsGuessed()
                }
                ,
                e.prototype.isLevelFailed = function() {
                    return this.board.countNumberOfNotSeenItems() / 2 > this.gameScore.getMovesLeft()
                }
                ,
                e.prototype.isNumberOfMovesLeftCritical = function() {
                    return this.board.countNumberOfNotSeenItems() / 2 === this.getGameScore().getMovesLeft()
                }
                ,
                e.prototype.addAdditionalMove = function() {
                    this.gameScore.pushGuess()
                }
                ,
                e
            }();
            t.GameEngine = a
        }
        ,
        6244: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.GameScore = void 0;
            var n = function() {
                function e(t) {
                    this.numberOfGuesses = 0,
                    this.points = 0,
                    this.lastEarnedPoints = 0,
                    this.numberOfMoves = t.numberOfMoves,
                    this.pointsValue = t.dificultyGroup * e.POINTS_MULTIPLAYER
                }
                return e.prototype.popGuess = function() {
                    this.numberOfGuesses++
                }
                ,
                e.prototype.pushGuess = function() {
                    this.numberOfGuesses--
                }
                ,
                e.prototype.getMovesLeft = function() {
                    return this.numberOfMoves - this.numberOfGuesses
                }
                ,
                e.prototype.getNumberOfGuesses = function() {
                    return this.numberOfGuesses
                }
                ,
                e.prototype.getPoints = function() {
                    return this.points
                }
                ,
                e.prototype.convertSuccessfullMoveToScore = function(e) {
                    var t = (this.getMovesLeft() + 1) * this.pointsValue;
                    this.addPoints(t),
                    e && this.addBonusPoints()
                }
                ,
                e.prototype.addBonusPoints = function() {
                    for (var e = 0, t = this.getMovesLeft(), n = 0; n <= t; n++)
                        e += n * this.pointsValue;
                    this.addPoints(e, !0)
                }
                ,
                e.prototype.addPoints = function(e, t) {
                    void 0 === t && (t = !1),
                    this.points += e,
                    t || (this.lastEarnedPoints = e)
                }
                ,
                e.prototype.getLastEarnedPoints = function() {
                    return this.lastEarnedPoints
                }
                ,
                e.POINTS_MULTIPLAYER = 5,
                e
            }();
            t.GameScore = n
        }
        ,
        5886: (e,t,n)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.LevelBuilder = void 0;
            var o = n(9266)
              , i = n(1515)
              , r = n(2097)
              , a = n(4907)
              , s = n(45)
              , l = n(3945)
              , u = n(7517)
              , c = n(5897)
              , d = n(3730)
              , p = n(6652)
              , v = n(3960)
              , f = n(8797)
              , h = n(1360)
              , m = n(4868)
              , y = n(7040)
              , b = n(8582)
              , g = n(4148)
              , _ = n(8833)
              , w = n(3144)
              , O = n(9670)
              , E = n(6162)
              , P = n(9976)
              , k = n(8175)
              , S = n(8304)
              , M = n(2203)
              , L = n(3977)
              , T = n(8016)
              , C = n(4791)
              , A = n(3106)
              , U = n(5470)
              , B = function() {
                function e() {
                    this.levels = [o.level_0, i.level_1, c.level_2, d.level_3, p.level_4, v.level_5, f.level_5_1, h.level_6, m.level_6_1, y.level_6_2, b.level_6_3, g.level_7, _.level_7_1, w.level_7_2, O.level_7_3, E.level_7_4, P.level_7_5, k.level_8, S.level_8_1, M.level_8_2, L.level_8_3, T.level_8_4, C.level_8_5, A.level_9, U.level_9_1, r.level_10, a.level_10_1, s.level_10_2, l.level_10_3, u.level_11]
                }
                return e.prototype.getMaximum = function() {
                    return this.levels.length - 1
                }
                ,
                e.prototype.build = function(e) {
                    return this.levels[e]
                }
                ,
                e.prototype.findLevel = function(e) {
                    for (var t = 0, n = 0; n < this.levels.length; n++)
                        if (this.levels[n].id === e) {
                            t = n;
                            break
                        }
                    return t
                }
                ,
                e
            }();
            t.LevelBuilder = B
        }
        ,
        8585: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.LevelInfo = void 0;
            var n = function() {
                function e(e) {
                    this.level = e
                }
                return e.prototype.getLevelComplexity = function() {
                    return this.level.numberOfFields * (this.level.numberOfFields / 2 / this.level.numberOfMoves)
                }
                ,
                e
            }();
            t.LevelInfo = n
        }
        ,
        2800: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.LevelVisualizer = void 0;
            var n = function() {
                function e(e) {
                    this.level = e
                }
                return e.prototype.getVisualisation = function() {
                    for (var e = ['<div class="levelVisualizer">'], t = 0; t < this.level.pattern.length; t++)
                        1 === this.level.pattern[t] ? e.push('<span class="field"></span>') : e.push('<span class="empty"></span>');
                    return e.push("</div>"),
                    e.join("")
                }
                ,
                e
            }();
            t.LevelVisualizer = n
        }
        ,
        8819: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.MemoryItem = void 0;
            var n = function() {
                function e(e) {
                    this.seen = !1,
                    this.opened = !1,
                    this.value = e
                }
                return e.prototype.toogleSeen = function() {
                    this.seen = !this.seen
                }
                ,
                e.prototype.isSeen = function() {
                    return this.seen
                }
                ,
                e.prototype.compare = function(e) {
                    return e.value === this.value
                }
                ,
                e.prototype.toggleOpened = function() {
                    this.seen || (this.opened = !this.opened)
                }
                ,
                e.prototype.isOpened = function() {
                    return this.opened
                }
                ,
                e.prototype.setOpened = function(e) {
                    this.opened = e
                }
                ,
                e.prototype.setSeen = function(e) {
                    this.seen = !0
                }
                ,
                e.prototype.swap = function(e) {
                    var t = this.value;
                    this.value = e.value,
                    e.value = t
                }
                ,
                e
            }();
            t.MemoryItem = n
        }
        ,
        9885: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.MidiSoundEffects = void 0;
            var n = function() {
                function e(e, t) {
                    void 0 === e && (e = "square"),
                    void 0 === t && (t = .2),
                    this.soundType = e,
                    this.audioContext = new (window.AudioContext || window.webkitAudioContext),
                    this.mainGainNode = this.audioContext.createGain(),
                    this.mainGainNode.connect(this.audioContext.destination),
                    this.mainGainNode.gain.value = t
                }
                return e.prototype.playFirstBoxOpened = function() {
                    this.playSound(261.6255653005986)
                }
                ,
                e.prototype.playSecoundBoxOpened = function() {
                    this.playSound(329.6275569128699)
                }
                ,
                e.prototype.playSoundOfSuccess = function() {
                    this.playSound(391.99543598174927)
                }
                ,
                e.prototype.playSoundOfFailure = function() {
                    this.playSound(293.6647679174076)
                }
                ,
                e.prototype.playSound = function(t) {
                    var n = this.audioContext.createOscillator();
                    n.connect(this.mainGainNode),
                    n.type = this.soundType,
                    n.frequency.value = t,
                    n.start(0),
                    n.stop(this.audioContext.currentTime + e.TONE_DURATION)
                }
                ,
                e.TONE_DURATION = .4,
                e
            }();
            t.MidiSoundEffects = n
        }
        ,
        3775: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.NoSoundsEffect = void 0;
            var n = function() {
                function e() {}
                return e.prototype.playFirstBoxOpened = function() {}
                ,
                e.prototype.playSecoundBoxOpened = function() {}
                ,
                e.prototype.playSoundOfSuccess = function() {}
                ,
                e.prototype.playSoundOfFailure = function() {}
                ,
                e
            }();
            t.NoSoundsEffect = n
        }
        ,
        4385: (e,t,n)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.PowerUpInfo = void 0;
            var o = n(6335)
              , i = function() {
                function e() {}
                return e.getPowerUpName = function(e) {
                    return e === o.PowerUpType.PlusOne ? "Plus One" : e === o.PowerUpType.SeekAndFind ? "Seek and Find" : e === o.PowerUpType.SneakPeek ? "Sneak Peek" : e === o.PowerUpType.UndoRotate ? "Undo Rotate" : ""
                }
                ,
                e.getPowerUpPrerequisiteInfo = function(e) {
                    return e == o.PowerUpType.SeekAndFind ? "To activate this power up you must first open one bubble." : e == o.PowerUpType.UndoRotate ? "Undoing rotation is possible only after wrong move." : ""
                }
                ,
                e
            }();
            t.PowerUpInfo = i
        }
        ,
        6335: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.PowerUpType = void 0,
            function(e) {
                e.PlusOne = "PLUS_ONE",
                e.UndoRotate = "UNDO_ROTATE",
                e.SneakPeek = "SNEAK_PEEK",
                e.SeekAndFind = "SEEK_AND_FIND",
                e.FreezeRotation = "FREEZE_ROTATION"
            }(t.PowerUpType || (t.PowerUpType = {}))
        }
        ,
        777: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.ScoreRating = void 0;
            var n = function() {
                function e(e, t, n) {
                    this.numberOfMovesUsed = n,
                    this.numberOfPairs = e,
                    this.numberOfMoves = t
                }
                return e.prototype.setNumberOfMovesUsed = function(e) {
                    this.numberOfMovesUsed = e
                }
                ,
                e.prototype.calculate = function() {
                    var e = (this.numberOfMoves - this.numberOfPairs) / 3;
                    return this.numberOfMovesUsed <= this.numberOfPairs + Math.ceil(e) ? 3 : this.numberOfMovesUsed <= this.numberOfPairs + Math.ceil(2 * e) ? 2 : 1
                }
                ,
                e.prototype.isTheLastMove = function() {
                    return this.numberOfMoves - this.numberOfMovesUsed == 0
                }
                ,
                e.prototype.isIncredible = function() {
                    return this.numberOfMovesUsed <= this.numberOfPairs
                }
                ,
                e
            }();
            t.ScoreRating = n
        }
        ,
        9266: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.level_0 = void 0,
            t.level_0 = {
                id: "Intro1",
                hint: "Tap on boxes to open them",
                colorSet: "Standard",
                numberOfFields: 2,
                numberOfMoves: 1,
                rotation: !1,
                dificultyGroup: 1,
                powerUp: 0,
                pattern: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
        }
        ,
        1515: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.level_1 = void 0,
            t.level_1 = {
                id: "Intro2",
                hint: "Find two pairs in max 3 moves",
                colorSet: "Standard",
                numberOfFields: 4,
                numberOfMoves: 3,
                rotation: !1,
                dificultyGroup: 1,
                powerUp: 0,
                pattern: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
        }
        ,
        2097: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.level_10 = void 0,
            t.level_10 = {
                id: "L10",
                hint: "",
                colorSet: "Standard",
                numberOfFields: 30,
                numberOfMoves: 45,
                rotation: !0,
                dificultyGroup: 1,
                powerUp: 4,
                pattern: [1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1]
            }
        }
        ,
        4907: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.level_10_1 = void 0,
            t.level_10_1 = {
                id: "L10_1",
                hint: "",
                colorSet: "Standard",
                numberOfFields: 30,
                numberOfMoves: 45,
                rotation: !0,
                dificultyGroup: 1,
                powerUp: 4,
                pattern: [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1]
            }
        }
        ,
        45: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.level_10_2 = void 0,
            t.level_10_2 = {
                id: "L10_2",
                hint: "",
                colorSet: "Standard",
                numberOfFields: 32,
                numberOfMoves: 48,
                rotation: !0,
                dificultyGroup: 1,
                powerUp: 4,
                pattern: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            }
        }
        ,
        3945: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.level_10_3 = void 0,
            t.level_10_3 = {
                id: "L10_3",
                hint: "",
                colorSet: "Standard",
                numberOfFields: 32,
                numberOfMoves: 48,
                rotation: !0,
                dificultyGroup: 1,
                powerUp: 4,
                pattern: [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1]
            }
        }
        ,
        7517: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.level_11 = void 0,
            t.level_11 = {
                id: "L11",
                hint: "",
                colorSet: "Standard",
                numberOfFields: 36,
                numberOfMoves: 51,
                rotation: !0,
                dificultyGroup: 1,
                powerUp: 4,
                pattern: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            }
        }
        ,
        5897: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.level_2 = void 0,
            t.level_2 = {
                id: "Intro3",
                hint: "I will rotate on your wrong guess",
                colorSet: "Standard",
                numberOfFields: 12,
                numberOfMoves: 18,
                rotation: !0,
                dificultyGroup: 1,
                powerUp: 0,
                pattern: [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]
            }
        }
        ,
        3730: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.level_3 = void 0,
            t.level_3 = {
                id: "L3",
                hint: "",
                colorSet: "Standard",
                numberOfFields: 16,
                numberOfMoves: 24,
                rotation: !0,
                dificultyGroup: 1,
                powerUp: 0,
                pattern: [1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1]
            }
        }
        ,
        6652: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.level_4 = void 0,
            t.level_4 = {
                id: "L4",
                hint: "",
                colorSet: "Standard",
                numberOfFields: 16,
                numberOfMoves: 24,
                rotation: !0,
                dificultyGroup: 1,
                powerUp: 0,
                pattern: [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]
            }
        }
        ,
        3960: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.level_5 = void 0,
            t.level_5 = {
                id: "L5",
                hint: "",
                colorSet: "Standard",
                numberOfFields: 16,
                numberOfMoves: 22,
                rotation: !0,
                dificultyGroup: 1,
                powerUp: 0,
                pattern: [0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0]
            }
        }
        ,
        8797: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.level_5_1 = void 0,
            t.level_5_1 = {
                id: "L5-1",
                hint: '<b>Things are getting harder so here are Power Ups to help!</b><br/>\n    <div class="puButtonPreview icoRotateLeft"></div>\n    Use this <b>Power Up</b> if you want to prevent rotation for the next 4 wrong moves. <br />&nbsp;<br/>\n    You can use it just once per level so use it wisely.',
                colorSet: "Standard",
                numberOfFields: 16,
                numberOfMoves: 20,
                rotation: !0,
                dificultyGroup: 1,
                powerUp: 1,
                pattern: [1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1]
            }
        }
        ,
        1360: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.level_6 = void 0,
            t.level_6 = {
                id: "L6",
                hint: "",
                colorSet: "Standard",
                numberOfFields: 18,
                numberOfMoves: 24,
                rotation: !0,
                dificultyGroup: 1,
                powerUp: 1,
                pattern: [0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0]
            }
        }
        ,
        4868: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.level_6_1 = void 0,
            t.level_6_1 = {
                id: "L6-1",
                hint: "",
                colorSet: "Standard",
                numberOfFields: 18,
                numberOfMoves: 23,
                rotation: !0,
                dificultyGroup: 1,
                powerUp: 1,
                pattern: [1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1]
            }
        }
        ,
        7040: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.level_6_2 = void 0,
            t.level_6_2 = {
                id: "L6-2",
                hint: '<b>A new Power Up is in the town!</b><br/>\n    <div class="puButtonPreview icoPlusOne"></div>\n    Use this <b>Power Up</b> if you need one extra move. <br />&nbsp;<br/>\n    You can use it just once per level so use it wisely.',
                colorSet: "Standard",
                numberOfFields: 20,
                numberOfMoves: 28,
                rotation: !0,
                dificultyGroup: 1,
                powerUp: 2,
                pattern: [1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1]
            }
        }
        ,
        8582: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.level_6_3 = void 0,
            t.level_6_3 = {
                id: "L6-3",
                hint: "",
                colorSet: "Standard",
                numberOfFields: 20,
                numberOfMoves: 28,
                rotation: !0,
                dificultyGroup: 1,
                powerUp: 2,
                pattern: [1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1]
            }
        }
        ,
        4148: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.level_7 = void 0,
            t.level_7 = {
                id: "L7",
                hint: '<b>A new Power Up is in the town!</b><br/>\n    <div class="puButtonPreview icoEye"></div>\n    Use this <b>Power Up</b> to sneak a peek all bubbles for a moment. <br />&nbsp;<br/>\n    You can use it just once per level so use it wisely.',
                colorSet: "Standard",
                numberOfFields: 20,
                numberOfMoves: 28,
                rotation: !0,
                dificultyGroup: 1,
                powerUp: 3,
                pattern: [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1]
            }
        }
        ,
        8833: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.level_7_1 = void 0,
            t.level_7_1 = {
                id: "L7-1",
                hint: "",
                colorSet: "Standard",
                numberOfFields: 22,
                numberOfMoves: 32,
                rotation: !0,
                dificultyGroup: 1,
                powerUp: 3,
                pattern: [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1]
            }
        }
        ,
        3144: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.level_7_2 = void 0,
            t.level_7_2 = {
                id: "L7-2",
                hint: "",
                colorSet: "Standard",
                numberOfFields: 24,
                numberOfMoves: 34,
                rotation: !0,
                dificultyGroup: 1,
                powerUp: 3,
                pattern: [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1]
            }
        }
        ,
        9670: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.level_7_3 = void 0,
            t.level_7_3 = {
                id: "L7-3",
                hint: '<b>A new Power Up is in the town!</b><br/>\n    <div class="puButtonPreview icoSavedSearch"></div>\n    Use this <b>Power Up</b> to find a pair of opened bubble. <br />&nbsp;<br/>\n    You can use it just once per level so use it wisely.',
                colorSet: "Standard",
                numberOfFields: 24,
                numberOfMoves: 34,
                rotation: !0,
                dificultyGroup: 1,
                powerUp: 4,
                pattern: [0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0]
            }
        }
        ,
        6162: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.level_7_4 = void 0,
            t.level_7_4 = {
                id: "L7-4",
                hint: "",
                colorSet: "Standard",
                numberOfFields: 24,
                numberOfMoves: 34,
                rotation: !0,
                dificultyGroup: 1,
                powerUp: 4,
                pattern: [0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0]
            }
        }
        ,
        9976: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.level_7_5 = void 0,
            t.level_7_5 = {
                id: "L7-5",
                hint: "",
                colorSet: "Standard",
                numberOfFields: 24,
                numberOfMoves: 34,
                rotation: !0,
                dificultyGroup: 1,
                powerUp: 4,
                pattern: [0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0]
            }
        }
        ,
        8175: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.level_8 = void 0,
            t.level_8 = {
                id: "L8",
                hint: "",
                colorSet: "Standard",
                numberOfFields: 24,
                numberOfMoves: 34,
                rotation: !0,
                dificultyGroup: 1,
                powerUp: 4,
                pattern: [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1]
            }
        }
        ,
        8304: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.level_8_1 = void 0,
            t.level_8_1 = {
                id: "L8-1",
                hint: "",
                colorSet: "Standard",
                numberOfFields: 24,
                numberOfMoves: 34,
                rotation: !0,
                dificultyGroup: 1,
                powerUp: 4,
                pattern: [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1]
            }
        }
        ,
        2203: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.level_8_2 = void 0,
            t.level_8_2 = {
                id: "L8-2",
                hint: "",
                colorSet: "Standard",
                numberOfFields: 24,
                numberOfMoves: 34,
                rotation: !0,
                dificultyGroup: 1,
                powerUp: 4,
                pattern: [0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0]
            }
        }
        ,
        3977: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.level_8_3 = void 0,
            t.level_8_3 = {
                id: "L8-3",
                hint: "",
                colorSet: "Standard",
                numberOfFields: 24,
                numberOfMoves: 33,
                rotation: !0,
                dificultyGroup: 1,
                powerUp: 4,
                pattern: [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0]
            }
        }
        ,
        8016: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.level_8_4 = void 0,
            t.level_8_4 = {
                id: "L8-4",
                hint: "",
                colorSet: "Standard",
                numberOfFields: 28,
                numberOfMoves: 42,
                rotation: !0,
                dificultyGroup: 1,
                powerUp: 4,
                pattern: [0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0]
            }
        }
        ,
        4791: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.level_8_5 = void 0,
            t.level_8_5 = {
                id: "L8-5",
                hint: "",
                colorSet: "Standard",
                numberOfFields: 28,
                numberOfMoves: 42,
                rotation: !0,
                dificultyGroup: 1,
                powerUp: 4,
                pattern: [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1]
            }
        }
        ,
        3106: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.level_9 = void 0,
            t.level_9 = {
                id: "L9",
                hint: "",
                colorSet: "Standard",
                numberOfFields: 28,
                numberOfMoves: 40,
                rotation: !0,
                dificultyGroup: 1,
                powerUp: 4,
                pattern: [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1]
            }
        }
        ,
        5470: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.level_9_1 = void 0,
            t.level_9_1 = {
                id: "L9-1",
                hint: "",
                colorSet: "Standard",
                numberOfFields: 28,
                numberOfMoves: 40,
                rotation: !0,
                dificultyGroup: 1,
                powerUp: 4,
                pattern: [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1]
            }
        }
        ,
        5191: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.DefaultGameSettings = void 0;
            var n = function() {
                this.colorBlindMode = !1,
                this.themeName = ""
            };
            t.DefaultGameSettings = n
        }
        ,
        2192: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.DefaultScoreTable = void 0;
            var n = function() {
                this.levelNumber = 0,
                this.scoresByLevel = []
            };
            t.DefaultScoreTable = n
        }
        ,
        5220: (e,t,n)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.GameSettingsManager = void 0;
            var o = n(5191)
              , i = function() {
                function e() {
                    var t = window.localStorage.getItem(e.KEY) || JSON.stringify(new o.DefaultGameSettings);
                    this.gameSettings = JSON.parse(t)
                }
                return e.prototype.save = function() {
                    window.localStorage.setItem(e.KEY, JSON.stringify(this.gameSettings))
                }
                ,
                e.prototype.isColorBlindMode = function() {
                    return this.gameSettings.colorBlindMode || !1
                }
                ,
                e.prototype.setColorBlindMode = function(e) {
                    this.gameSettings.colorBlindMode = e
                }
                ,
                e.prototype.getThemeName = function() {
                    return this.gameSettings.themeName
                }
                ,
                e.prototype.setThemeName = function(e) {
                    this.gameSettings.themeName = e
                }
                ,
                e.prototype.isSoundsEnabled = function() {
                    return this.gameSettings.soundsEnabled
                }
                ,
                e.prototype.isVibrationEnabled = function() {
                    return this.gameSettings.vibrationEnabled
                }
                ,
                e.prototype.setSoundsEnabled = function(e) {
                    this.gameSettings.soundsEnabled = e
                }
                ,
                e.prototype.setVibrationEnabled = function(e) {
                    this.gameSettings.vibrationEnabled = e
                }
                ,
                e.KEY = "gameSettings",
                e
            }();
            t.GameSettingsManager = i
        }
        ,
        4142: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.LevelScoreItem = void 0;
            var n = function(e, t, n, o) {
                this.levelId = e,
                this.points = t,
                this.moves = n,
                this.stars = o
            };
            t.LevelScoreItem = n
        }
        ,
        709: (e,t,n)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.ScoreTableManager = void 0;
            var o = n(2192)
              , i = n(4142)
              , r = function() {
                function e() {}
                return e.prototype.load = function() {
                    var t = window.localStorage.getItem(e.KEY) || JSON.stringify(new o.DefaultScoreTable);
                    return JSON.parse(t)
                }
                ,
                e.prototype.save = function(t) {
                    window.localStorage.setItem(e.KEY, JSON.stringify(t))
                }
                ,
                e.prototype.reset = function() {
                    var t = new o.DefaultScoreTable;
                    window.localStorage.setItem(e.KEY, JSON.stringify(t))
                }
                ,
                e.prototype.putNewLevelScore = function(e, t, n, o, r) {
                    var a = !1;
                    e.scoresByLevel.forEach((function(e) {
                        e.levelId === t && (a = !0,
                        n > e.points && (e.points = n))
                    }
                    )),
                    a || e.scoresByLevel.push(new i.LevelScoreItem(t,n,o,r))
                }
                ,
                e.prototype.setLevelNumber = function(e, t) {
                    t > e.levelNumber && (e.levelNumber = t)
                }
                ,
                e.prototype.isNewLevelRecordAchieved = function(e, t, n) {
                    var o = !1;
                    return e.scoresByLevel.forEach((function(e) {
                        e.levelId === t && e.points < n && (o = !0)
                    }
                    )),
                    o
                }
                ,
                e.KEY = "gameScore",
                e
            }();
            t.ScoreTableManager = r
        }
        ,
        6909: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.MessageBox = void 0;
            var n = function() {
                function e() {}
                return e.show = function(t, n, o, i, r) {
                    e.createDomIfNeeded(),
                    e.setText(t),
                    e.handler = o,
                    e.addButtons(n, r),
                    e.setTitle(i),
                    document.getElementById("" + e.DOM_ID).style.display = "block"
                }
                ,
                e.showAlert = function(t, n, o) {
                    void 0 === n && (n = "OK"),
                    e.show(t, [n], (function() {}
                    ), o)
                }
                ,
                e.createDomIfNeeded = function() {
                    if (!document.getElementById("" + e.DOM_ID)) {
                        var t = document.createRange().createContextualFragment(this.getTemplate());
                        document.querySelector("body").appendChild(t.firstChild)
                    }
                }
                ,
                e.getTemplate = function() {
                    return '<div id="' + e.DOM_ID + '" class="messageBox">\n                    <div class="messageBoxContent">\n                        <div class="messageBoxHeader">\n                            <h2></h2>\n                        </div>\n                        <p></p>\n                        <div class="messageBoxButtonBar"></div>\n                    </div>\n                </div>'
                }
                ,
                e.setText = function(t) {
                    document.querySelector("#" + e.DOM_ID).querySelectorAll("p")[0].innerHTML = t
                }
                ,
                e.addButtons = function(t, n) {
                    void 0 === n && (n = "");
                    var o = document.getElementById("" + e.DOM_ID).querySelector(".messageBoxButtonBar");
                    o.innerHTML = "";
                    for (var i = function(t) {
                        var i = document.createElement("button");
                        i.innerText = t,
                        n === t && i.classList.add("default"),
                        i.onclick = function() {
                            e.reset(),
                            e.handler(i.innerText)
                        }
                        ,
                        o.appendChild(i)
                    }, r = 0, a = t; r < a.length; r++) {
                        i(a[r])
                    }
                }
                ,
                e.reset = function() {
                    var t = document.getElementById("" + e.DOM_ID);
                    t.style.display = "none",
                    t.querySelector(".messageBoxButtonBar").innerHTML = "",
                    e.setText("")
                }
                ,
                e.setTitle = function(t) {
                    var n = document.getElementById("" + e.DOM_ID).querySelector(".messageBoxHeader")
                      , o = document.getElementById("" + e.DOM_ID).querySelector("h2");
                    t ? (n.style.display = "block",
                    o.innerHTML = t) : (n.style.display = "none",
                    o.innerHTML = "")
                }
                ,
                e.isShown = function() {
                    var t = document.getElementById("" + e.DOM_ID);
                    return !!t && "block" === t.style.display
                }
                ,
                e.DOM_ID = "messageBox",
                e.handler = null,
                e
            }();
            t.MessageBox = n
        }
        ,
        8404: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.UiWidget = void 0;
            var n = function() {
                function e() {
                    this.eventHandler = null,
                    this.tpl = document.createRange().createContextualFragment(this.provideTemplate())
                }
                return e.prototype.init = function(e, t, n) {
                    void 0 === n && (n = !1),
                    n && (e.innerHTML = "");
                    e.appendChild(this.tpl.firstChild)
                }
                ,
                e.prototype.findUiElement = function(e) {
                    return this.tpl.querySelector('[data-uid="' + e + '"]')
                }
                ,
                e.prototype.setEventHandler = function(e) {
                    this.eventHandler = e
                }
                ,
                e.prototype.removeEventHandler = function() {
                    this.eventHandler = null
                }
                ,
                e.prototype.invokeEvent = function(e, t) {
                    this.eventHandler && this.eventHandler(e, t)
                }
                ,
                e
            }();
            t.UiWidget = n
        }
        ,
        3348: (e,t,n)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.ActivityManager = void 0;
            var o = n(7343)
              , i = n(2501)
              , r = n(5192)
              , a = n(5089)
              , s = n(2241)
              , l = n(4802)
              , u = n(9927)
              , c = n(8150)
              , d = n(4133)
              , p = n(1798)
              , v = function() {
                function e() {}
                return e.load = function(t, n) {
                    this.activity = this.getActivity(t),
                    this.activity.init(document.getElementById(e.CONTAINER_ID), [], !0),
                    this.activity.start(n),
                    o.Envirorment.makePlatformEngine().isOffline() || o.Envirorment.isLocalHost() || o.Envirorment.getTracker().trackActivityLoad(t)
                }
                ,
                e.getActivity = function(e) {
                    return "main" === e ? new l.MainActivity : "gameplay" === e ? new a.GamePlayActivity : "levelbrowser" === e ? new s.LevelBrowser : "purchase-web" === e ? new c.PurchaseOnWebActivity : "unlock-web" === e ? new p.UnlockOnWebActivity : "buynow-web" === e ? new r.BuyNowOnWebActivity : "unlockcodeview-web" === e ? new d.UnlockCodeViewOnWebActivity : "about" === e ? new i.AboutActivity : "options" === e ? new u.OptionsActivity : new l.MainActivity
                }
                ,
                e.passBackButtonClickEvent = function() {
                    this.activity.onBackButtonClicked()
                }
                ,
                e.isMainActivityLoaded = function() {
                    return this.activity instanceof l.MainActivity
                }
                ,
                e.CONTAINER_ID = "app",
                e
            }();
            t.ActivityManager = v
        }
        ,
        2787: function(e, t, n) {
            var o, i = this && this.__extends || (o = function(e, t) {
                return (o = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                }
                )(e, t)
            }
            ,
            function(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
                function n() {
                    this.constructor = e
                }
                o(e, t),
                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
                new n)
            }
            );
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.GameDebugerView = void 0;
            var r = n(8585)
              , a = function(e) {
                function t(t, n) {
                    var o = e.call(this) || this;
                    return o.gameLevel = t,
                    o.debugEventHandler = n,
                    o.btnCheat = o.findUiElement("btnCheat"),
                    o.spanComplexity = o.findUiElement("spanComplexity"),
                    o.btnCheat.onclick = function() {
                        o.btnCheat_onClick()
                    }
                    ,
                    o.spanComplexity.innerText = new r.LevelInfo(o.gameLevel).getLevelComplexity().toFixed(2),
                    o
                }
                return i(t, e),
                t.prototype.provideTemplate = function() {
                    return '<div class="debugBox">\n                <button data-uid="btnCheat">Cheat</button>\n\n                &nbsp;|&nbsp; \n                \n                <label>Complexity: <b data-uid="spanComplexity"></b></label>\n            </div>'
                }
                ,
                t.prototype.btnCheat_onClick = function() {
                    document.querySelectorAll('[data-debug="1"]').forEach((function(e) {
                        e.classList.toggle("debug")
                    }
                    ))
                }
                ,
                t
            }(n(8404).UiWidget);
            t.GameDebugerView = a
        },
        946: (e,t)=>{
            var n;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.GameEvent = t.GameEventType = void 0,
            function(e) {
                e[e.Warning = 0] = "Warning",
                e[e.UpdateResult = 1] = "UpdateResult",
                e[e.PointsEarned = 2] = "PointsEarned",
                e[e.LevelFailed = 3] = "LevelFailed",
                e[e.LevelCompleted = 4] = "LevelCompleted"
            }(n = t.GameEventType || (t.GameEventType = {}));
            var o = function() {
                function e(e, t) {
                    this.type = e,
                    this.value = t
                }
                return e.createUpdateResult = function(t, o) {
                    return new e(n.UpdateResult,[t, o].join(","))
                }
                ,
                e.createWarning = function(t) {
                    return new e(n.Warning,t)
                }
                ,
                e.createPointsEarned = function(t) {
                    return new e(n.PointsEarned,"" + t)
                }
                ,
                e.createLevelFailed = function() {
                    return new e(n.LevelFailed,"")
                }
                ,
                e.makeLevelCompleted = function(t, o, i, r, a, s) {
                    var l = [t, o, i, r, a, s];
                    return new e(n.LevelCompleted,l)
                }
                ,
                e
            }();
            t.GameEvent = o
        }
        ,
        9044: (e,t)=>{
            var n;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.LevelCompletedMessage = t.LevelCompletedType = void 0,
            function(e) {
                e[e.Normal = 0] = "Normal",
                e[e.Incredable = 1] = "Incredable",
                e[e.AlmostFailed = 2] = "AlmostFailed"
            }(n = t.LevelCompletedType || (t.LevelCompletedType = {}));
            var o = function() {
                function e(e, t, n, o, i) {
                    this.stars = t,
                    this.points = e,
                    this.complitionType = n,
                    this.newLevelRecord = o,
                    this.lastLevelCompleted = i
                }
                return e.prototype.generateStarRating = function() {
                    return '<div class="starRating stars' + this.stars + '"></div>'
                }
                ,
                e.prototype.generatePointsInfo = function() {
                    return '<div class="scoreInfo">\n                    <big>' + this.points + "</big>\n                    <span>points</span>\n                </div>"
                }
                ,
                e.prototype.generateMessage = function() {
                    var e = [];
                    return 3 === this.stars ? this.complitionType === n.Incredable ? e.push("This is outstanding result.") : e.push("Perfect job.") : 2 === this.stars ? e.push("Great job.") : this.complitionType === n.AlmostFailed ? e.push("This was close.") : e.push("Well done."),
                    this.newLevelRecord && e.push("<br/>Congratulations, this is new the best LEVEL's score."),
                    this.lastLevelCompleted && e.push("<br/>Big respect, you managed to pass all levels."),
                    e.join("")
                }
                ,
                e.prototype.render = function() {
                    return [this.generateStarRating(), this.generatePointsInfo(), "<p>", this.generateMessage(), "</p>"].join("")
                }
                ,
                e
            }();
            t.LevelCompletedMessage = o
        }
        ,
        5244: function(e, t, n) {
            var o, i = this && this.__extends || (o = function(e, t) {
                return (o = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                }
                )(e, t)
            }
            ,
            function(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
                function n() {
                    this.constructor = e
                }
                o(e, t),
                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
                new n)
            }
            );
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.LevelItemView = void 0;
            var r = n(7343)
              , a = n(8571)
              , s = function(e) {
                function t(t, n, o, i, r, a, s, l) {
                    var u = e.call(this) || this;
                    return u.locked = a,
                    u.selected = s,
                    u.pointsEarned = o,
                    u.starsEarned = i,
                    u.levelNumber = t,
                    u.levelItemClickHandler = r,
                    u.purchased = l,
                    u.divWholeItem = u.findUiElement("container"),
                    u.spanLevelNo = u.findUiElement("spanLevelNo"),
                    u.spanPoints = u.findUiElement("spanPoints"),
                    u.spanStars = u.findUiElement("spanStars"),
                    u.draw(n),
                    !u.locked && u.purchased && (u.divWholeItem.onclick = function() {
                        u.divWholeItem_onClick()
                    }
                    ),
                    u
                }
                return i(t, e),
                t.prototype.provideTemplate = function() {
                    return '<div class="levelItem" data-uid="container">\n                    <span data-uid="spanStars" class="stars"></span>\n                    <span data-uid="spanLevelNo" class="num"></span>\n                    <span data-uid="spanPoints" class="points"></span>\n                </div>'
                }
                ,
                t.prototype.getShowDebugInfo = function() {
                    return this.showDebugInfo
                }
                ,
                t.prototype.setShowDebugInfo = function(e) {
                    this.showDebugInfo = e
                }
                ,
                t.prototype.setPurchased = function(e) {
                    this.purchased = e
                }
                ,
                t.prototype.isPurchased = function() {
                    return this.purchased
                }
                ,
                t.prototype.draw = function(e) {
                    this.spanLevelNo.innerText = "#" + this.levelNumber,
                    this.locked && this.divWholeItem.classList.add("locked"),
                    this.selected && this.divWholeItem.classList.add("selected"),
                    this.purchased || this.divWholeItem.classList.add("notPurchased"),
                    this.showDebugInfo && (this.spanLevelNo.innerHTML = "#" + this.levelNumber + " <sup>" + e.id + "</sup>"),
                    this.drawPointsAndStarsEarned()
                }
                ,
                t.prototype.divWholeItem_onClick = function() {
                    this.levelItemClickHandler(this.levelNumber)
                }
                ,
                t.prototype.drawPointsAndStarsEarned = function() {
                    r.Envirorment.getPlatformType() === a.PlatformType.Web && (this.spanPoints.innerText = this.pointsEarned > 0 ? "" + this.pointsEarned : "",
                    this.spanStars.innerText = this.starsEarned > 0 ? this.generateStars(this.starsEarned) : "")
                }
                ,
                t.prototype.generateStars = function(e) {
                    for (var t = [], n = 0; n < e; n++)
                        t.push("★");
                    return t.join("")
                }
                ,
                t
            }(n(8404).UiWidget);
            t.LevelItemView = s
        },
        6529: function(e, t, n) {
            var o, i = this && this.__extends || (o = function(e, t) {
                return (o = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                }
                )(e, t)
            }
            ,
            function(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
                function n() {
                    this.constructor = e
                }
                o(e, t),
                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
                new n)
            }
            );
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.MemoryItemBox = void 0;
            var r = function(e) {
                function t(t, n, o) {
                    void 0 === o && (o = !1);
                    var i = e.call(this) || this;
                    return i.data = t,
                    i.memoryItemBoxClickHandler = n,
                    i.debug = o,
                    i.divElement = i.findUiElement("container"),
                    i.spanContent = i.findUiElement("content"),
                    i.divElement.onclick = function() {
                        i.onClick()
                    }
                    ,
                    o && (i.divElement.setAttribute("data-debug-value", "" + i.data.value),
                    i.divElement.setAttribute("data-debug", "1")),
                    i
                }
                return i(t, e),
                t.prototype.getData = function() {
                    return this.data
                }
                ,
                t.prototype.provideTemplate = function() {
                    return '<div data-uid="container" class="memoryBlock closed">\n                    <span data-uid="content"></span>\n                </div>'
                }
                ,
                t.prototype.onClick = function() {
                    this.memoryItemBoxClickHandler(this)
                }
                ,
                t.prototype.update = function() {
                    this.data.isSeen() ? (this.spanContent.setAttribute("class", ""),
                    this.divElement.classList.remove("opened", "closed"),
                    this.divElement.classList.add("seen")) : this.data.isOpened() ? (this.spanContent.setAttribute("class", "col" + this.data.value),
                    this.divElement.classList.remove("closed"),
                    this.divElement.classList.add("opened")) : (this.spanContent.setAttribute("class", ""),
                    this.divElement.classList.remove("opened"),
                    this.divElement.classList.add("closed"))
                }
                ,
                t.prototype.enforceOpening = function() {
                    this.data.isSeen() || (this.spanContent.setAttribute("class", "col" + this.data.value),
                    this.divElement.classList.remove("closed"),
                    this.divElement.classList.add("opened"))
                }
                ,
                t.prototype.updateColorset = function() {
                    this.spanContent.setAttribute("class", "col" + this.data.value)
                }
                ,
                t.prototype.sneakPeek = function() {
                    var e = this;
                    this.data.isSeen() || this.data.isOpened() || (this.divElement.classList.add("sneakPeek"),
                    this.spanContent.setAttribute("class", "col" + this.data.value),
                    this.divElement.onanimationend = function() {
                        e.unSneakPeek(e.divElement, e.spanContent)
                    }
                    ,
                    this.divElement.onwebkitanimationend = function() {
                        e.unSneakPeek(e.divElement, e.spanContent)
                    }
                    )
                }
                ,
                t.prototype.unSneakPeek = function(e, t) {
                    e.classList.remove("sneakPeek"),
                    t.setAttribute("class", "")
                }
                ,
                t.prototype.highlight = function() {
                    var e = this;
                    this.divElement.classList.add("highlighted"),
                    this.divElement.onwebkitanimationend = function() {
                        e.divElement.classList.remove("highlighted")
                    }
                    ,
                    this.divElement.onanimationend = function() {
                        e.divElement.classList.remove("highlighted")
                    }
                }
                ,
                t
            }(n(8404).UiWidget);
            t.MemoryItemBox = r
        },
        7498: function(e, t, n) {
            var o, i = this && this.__extends || (o = function(e, t) {
                return (o = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                }
                )(e, t)
            }
            ,
            function(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
                function n() {
                    this.constructor = e
                }
                o(e, t),
                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
                new n)
            }
            );
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.MemoryItemHolder = void 0;
            var r = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return i(t, e),
                t.prototype.provideTemplate = function() {
                    return '<div class="memoryBlock empty"></div>'
                }
                ,
                t
            }(n(8404).UiWidget);
            t.MemoryItemHolder = r
        },
        4827: function(e, t, n) {
            var o, i = this && this.__extends || (o = function(e, t) {
                return (o = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                }
                )(e, t)
            }
            ,
            function(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
                function n() {
                    this.constructor = e
                }
                o(e, t),
                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
                new n)
            }
            );
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.PlaygroundView = void 0;
            var r = n(7343)
              , a = n(1355)
              , s = n(5886)
              , l = n(3775)
              , u = n(5220)
              , c = n(6335)
              , d = n(777)
              , p = n(8404)
              , v = n(946)
              , f = n(6529)
              , h = n(7498)
              , m = function(e) {
                function t(t, n, o) {
                    void 0 === o && (o = !1);
                    var i = e.call(this) || this;
                    return i.cachedItems = [],
                    i.angle = 0,
                    i.alertedOnCriticalMovesLeft = !1,
                    i.memoryItemBoxes = [],
                    i.gameSettingsManager = new u.GameSettingsManager,
                    i.justRotated = !1,
                    i.rotationForzen = 0,
                    i.soundEffects = i.gameSettingsManager.isSoundsEnabled() ? r.Envirorment.getDefaultSoundEffectsEngine() : new l.NoSoundsEffect,
                    i.gameEventHandler = n,
                    i.levelNumber = t,
                    i.debug = o,
                    i.divBoard = i.findUiElement("boardWraper"),
                    i.level = (new s.LevelBuilder).build(i.levelNumber),
                    i.gameEngine = new a.GameEngine(i.level),
                    i.gameEngine.start(),
                    i.drawBoard(),
                    i.updateScoreBoard(),
                    i
                }
                return i(t, e),
                t.prototype.updateScoreBoard = function() {
                    this.gameEventHandler(v.GameEvent.createUpdateResult(this.gameEngine.getGameScore().getMovesLeft(), this.gameEngine.getGameScore().getPoints()))
                }
                ,
                t.prototype.provideTemplate = function() {
                    return '<div>\n                    <div class="board apear ' + ((new u.GameSettingsManager).isColorBlindMode() ? "colorBlind" : "") + '" data-uid="boardWraper"></div>\n                </div>'
                }
                ,
                t.prototype.drawBoard = function() {
                    var e = this
                      , t = this.gameEngine.getBoard().getMemoryItems()
                      , n = 0;
                    this.level.pattern.forEach((function(o) {
                        if (1 === o) {
                            var i = new f.MemoryItemBox(t[n++],(function(t) {
                                e.tryToOpenMemoryItem(t)
                            }
                            ),e.debug);
                            i.init(e.divBoard),
                            e.memoryItemBoxes.push(i)
                        } else {
                            (new h.MemoryItemHolder).init(e.divBoard)
                        }
                    }
                    ))
                }
                ,
                t.prototype.tryToOpenMemoryItem = function(e) {
                    var t = this
                      , n = this.gameEngine.openMemoryItem(e.getData());
                    n == a.OpenMemoryItemResult.OK_WAITING_NEXT_MOVE && this.soundEffects.playFirstBoxOpened(),
                    n !== a.OpenMemoryItemResult.OK_WAITING_NEXT_MOVE && n !== a.OpenMemoryItemResult.OK_READY_FOR_PROCESSING || (this.cachedItems.push(e),
                    this.updateCachedItems(!1)),
                    n === a.OpenMemoryItemResult.OK_READY_FOR_PROCESSING && (this.soundEffects.playSecoundBoxOpened(),
                    setTimeout((function() {
                        t.processGame()
                    }
                    ), 300))
                }
                ,
                t.prototype.updateCachedItems = function(e) {
                    this.cachedItems.forEach((function(e) {
                        e.update()
                    }
                    )),
                    e && (this.cachedItems = [])
                }
                ,
                t.prototype.processGame = function() {
                    var e = !1
                      , t = !1;
                    this.gameEngine.processOpenedMemoryItems() ? (this.soundEffects.playSoundOfSuccess(),
                    this.gameEventHandler(v.GameEvent.createPointsEarned(this.gameEngine.getGameScore().getLastEarnedPoints())),
                    this.gameEngine.isLevelCompleted() && (e = !0,
                    this.showLevelCompleted()),
                    this.updateCachedItems(!0)) : (this.soundEffects.playSoundOfFailure(),
                    t = !0),
                    this.updateScoreBoard(),
                    this.justRotated = t,
                    e || this.postProcessGame(t)
                }
                ,
                t.prototype.showLevelCompleted = function() {
                    var e = this.level.numberOfMoves - this.gameEngine.getGameScore().getMovesLeft()
                      , t = new d.ScoreRating(this.level.numberOfFields / 2,this.level.numberOfMoves,e);
                    this.gameEventHandler(v.GameEvent.makeLevelCompleted(this.level.id, this.gameEngine.getGameScore().getPoints(), e, t.calculate(), t.isTheLastMove(), t.isIncredible()))
                }
                ,
                t.prototype.swapExperimental = function() {
                    var e = this;
                    2 == this.cachedItems.length && this.cachedItems[0].getData().swap(this.cachedItems[1].getData()),
                    this.cachedItems.forEach((function(e) {
                        e.updateColorset()
                    }
                    )),
                    setTimeout((function() {
                        e.updateCachedItems(!0)
                    }
                    ), 1e3)
                }
                ,
                t.prototype.postProcessGame = function(e) {
                    var t = this;
                    this.alertOnCriticalMovesIfNeeded(),
                    this.gameEngine.isLevelFailed() ? (this.memoryItemBoxes.forEach((function(e) {
                        e.enforceOpening()
                    }
                    )),
                    setTimeout((function() {
                        t.divBoard.classList.remove("apear"),
                        t.divBoard.classList.add("disapear")
                    }
                    ), 1e3),
                    this.gameEventHandler(v.GameEvent.createLevelFailed())) : e && (this.rotate(),
                    this.vibrate())
                }
                ,
                t.prototype.alertOnCriticalMovesIfNeeded = function() {
                    this.alertedOnCriticalMovesLeft || this.gameEngine.isNumberOfMovesLeftCritical() && (this.gameEventHandler(v.GameEvent.createWarning("Watch out! You are running out of moves...")),
                    this.alertedOnCriticalMovesLeft = !0)
                }
                ,
                t.prototype.rotate = function() {
                    var e = this;
                    if (this.updateCachedItems(!0),
                    this.level.rotation && !(--this.rotationForzen > 0)) {
                        this.angle += 90;
                        var t = "rotated" + this.angle;
                        this.divBoard.classList.remove("rotated0", "rotated90", "rotated180", "rotated270", "rotated360", "immidiateRotate360"),
                        this.divBoard.classList.add(t),
                        360 === this.angle && (this.angle = 0,
                        setTimeout((function() {
                            e.divBoard.classList.remove("rotated360")
                        }
                        ), 1e3))
                    }
                }
                ,
                t.prototype.powerUpUnrotate = function() {
                    var e = this;
                    this.level.rotation && (0 === this.angle && (this.angle = 360,
                    this.divBoard.classList.remove("rotated0"),
                    this.divBoard.classList.add("immidiateRotate360")),
                    this.angle -= 90,
                    setTimeout((function() {
                        var t = "rotated" + e.angle;
                        e.divBoard.classList.remove("rotated0", "rotated90", "rotated180", "rotated270", "rotated360", "immidiateRotate360"),
                        e.divBoard.classList.add(t)
                    }
                    ), 100))
                }
                ,
                t.prototype.vibrate = function() {
                    this.gameSettingsManager.isVibrationEnabled() && navigator.vibrate(200)
                }
                ,
                t.prototype.powerUpAdditionalMove = function() {
                    this.gameEngine.addAdditionalMove(),
                    this.updateScoreBoard()
                }
                ,
                t.prototype.powerUpSneakPeek = function() {
                    this.memoryItemBoxes.forEach((function(e) {
                        e.sneakPeek()
                    }
                    ))
                }
                ,
                t.prototype.poweUpSeekAndFind = function() {
                    if (1 === this.gameEngine.getBoard().countNumberOfOpenedAndNotSeenItems()) {
                        var e = this.gameEngine.getBoard().findHiddenPairItem();
                        null !== e && this.memoryItemBoxes.forEach((function(t) {
                            t.getData().isOpened() || t.getData().isSeen() || t.getData().value !== e.value || t.highlight()
                        }
                        ))
                    }
                }
                ,
                t.prototype.powerUpFreezeRotation = function() {
                    this.rotationForzen = 5
                }
                ,
                t.prototype.isPowerUpApplicable = function(e) {
                    return e === c.PowerUpType.PlusOne || e === c.PowerUpType.SneakPeek || e === c.PowerUpType.FreezeRotation || (e === c.PowerUpType.UndoRotate ? this.justRotated : e === c.PowerUpType.SeekAndFind ? 1 === this.gameEngine.getBoard().countNumberOfOpenedAndNotSeenItems() : void 0)
                }
                ,
                t.prototype.applyPowerUp = function(e) {
                    e === c.PowerUpType.PlusOne ? this.powerUpAdditionalMove() : e === c.PowerUpType.SneakPeek ? this.powerUpSneakPeek() : e === c.PowerUpType.UndoRotate ? this.powerUpUnrotate() : e === c.PowerUpType.SeekAndFind ? this.poweUpSeekAndFind() : e === c.PowerUpType.FreezeRotation && this.powerUpFreezeRotation()
                }
                ,
                t
            }(p.UiWidget);
            t.PlaygroundView = m
        },
        1310: function(e, t, n) {
            var o, i = this && this.__extends || (o = function(e, t) {
                return (o = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                }
                )(e, t)
            }
            ,
            function(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
                function n() {
                    this.constructor = e
                }
                o(e, t),
                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
                new n)
            }
            );
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.PowerUpsToolbar = void 0;
            var r = n(6335)
              , a = function(e) {
                function t() {
                    var t = e.call(this) || this;
                    return t.puPlusOne = t.findUiElement("puPlusOne"),
                    t.puPlusOne.onclick = function() {
                        t.invokeButtonClick(r.PowerUpType.PlusOne)
                    }
                    ,
                    t.puUnrotate = t.findUiElement("puUnrotate"),
                    t.puUnrotate.onclick = function() {
                        t.invokeButtonClick(r.PowerUpType.UndoRotate)
                    }
                    ,
                    t.puSneakPeek = t.findUiElement("puSneakPeek"),
                    t.puSneakPeek.onclick = function() {
                        t.invokeButtonClick(r.PowerUpType.SneakPeek)
                    }
                    ,
                    t.puSeekAndFind = t.findUiElement("puSeekAndFind"),
                    t.puSeekAndFind.onclick = function() {
                        t.invokeButtonClick(r.PowerUpType.SeekAndFind)
                    }
                    ,
                    t.puFreezeRotation = t.findUiElement("puFreezeRotation"),
                    t.puFreezeRotation.onclick = function() {
                        t.invokeButtonClick(r.PowerUpType.FreezeRotation)
                    }
                    ,
                    t.powerUpsToolbar = t.findUiElement("powerUpsToolbar"),
                    t
                }
                return i(t, e),
                t.prototype.provideTemplate = function() {
                    return '<div class="powerUpsToolbar" data-uid="powerUpsToolbar">\n    \n            <div class="puButton icoRotateLeft disabled" data-uid="puUnrotate" style="display: none;"></div>    \n            <div class="puButton icoRotateLeft" data-uid="puFreezeRotation"></div>    \n            <div class="puButton icoPlusOne" data-uid="puPlusOne"></div>\n            <div class="puButton icoEye" data-uid="puSneakPeek"></div>\n            <div class="puButton icoSavedSearch" data-uid="puSeekAndFind"></div>\n        \n        </div>'
                }
                ,
                t.prototype.setButtonAvailable = function(e, t) {
                    var n = this.getButton(e);
                    null !== n && (t ? n.classList.remove("empty") : n.classList.add("empty"))
                }
                ,
                t.prototype.isButtonEnabled = function(e) {
                    var t = this.getButton(e);
                    if (null === t)
                        throw Error("Button " + e.toString() + " not found!");
                    return !t.classList.contains("disabled")
                }
                ,
                t.prototype.setButtonEnabled = function(e, t) {
                    var n = this.getButton(e);
                    null !== n && (t ? n.classList.remove("disabled") : n.classList.add("disabled"))
                }
                ,
                t.prototype.getButton = function(e) {
                    var t = null;
                    return e === r.PowerUpType.PlusOne ? t = this.puPlusOne : e === r.PowerUpType.SeekAndFind ? t = this.puSeekAndFind : e === r.PowerUpType.SneakPeek ? t = this.puSneakPeek : e === r.PowerUpType.UndoRotate ? t = this.puUnrotate : e === r.PowerUpType.FreezeRotation && (t = this.puFreezeRotation),
                    t
                }
                ,
                t.prototype.invokeButtonClick = function(e) {
                    var t = this.getButton(e);
                    null !== t && (t.classList.contains("disabled") || t.classList.contains("empty") || this.invokeEvent(e.toString(), null))
                }
                ,
                t
            }(n(8404).UiWidget);
            t.PowerUpsToolbar = a
        },
        685: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.PromoBubbleMaker = void 0;
            var n = function() {
                function e() {}
                return e.prototype.show = function(e) {
                    var t = this.buildSimpleBubble(e);
                    document.querySelector("body").appendChild(t)
                }
                ,
                e.prototype.buildSimpleBubble = function(e) {
                    var t = document.createElement("div");
                    return t.classList.add("simpleBubble"),
                    t.classList.add("col" + this.randomNumber(1, 19)),
                    t.classList.add("fallDown"),
                    t.style.zIndex = "" + (e + 9999),
                    t.style.position = "fixed",
                    t.style.top = "100%",
                    t.style.left = this.randomNumber(0, 90) + "%",
                    t
                }
                ,
                e.prototype.randomNumber = function(e, t) {
                    var n = Math.ceil(e)
                      , o = Math.floor(t);
                    return Math.floor(Math.random() * (o - n) + n)
                }
                ,
                e.cleanUpAllEasterEggs = function() {
                    for (var e = document.querySelectorAll(".simpleBubble"), t = 0; t < e.length; t++) {
                        var n = e[t];
                        n.parentNode.removeChild(n)
                    }
                }
                ,
                e
            }();
            t.PromoBubbleMaker = n
        }
        ,
        563: function(e, t, n) {
            var o, i = this && this.__extends || (o = function(e, t) {
                return (o = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                }
                )(e, t)
            }
            ,
            function(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
                function n() {
                    this.constructor = e
                }
                o(e, t),
                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
                new n)
            }
            );
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.ResultBoardView = void 0;
            var r = function(e) {
                function t() {
                    var t = e.call(this) || this;
                    return t.points = 0,
                    t.moves = 0,
                    t.labelLevel = t.findUiElement("labelLevel"),
                    t.labelMoves = t.findUiElement("labelMoves"),
                    t.labelScore = t.findUiElement("labelScore"),
                    t.spanPointsEarned = t.findUiElement("spanPointsEarned"),
                    t.spanPointsEarned.onanimationend = function() {
                        t.onPotintAnimationEnd()
                    }
                    ,
                    t.spanPointsEarned.onwebkitanimationend = function() {
                        t.onPotintAnimationEnd()
                    }
                    ,
                    t
                }
                return i(t, e),
                t.prototype.onPotintAnimationEnd = function() {
                    this.spanPointsEarned.classList.remove("fadeOutDown"),
                    this.spanPointsEarned.innerText = ""
                }
                ,
                t.prototype.provideTemplate = function() {
                    return '<div>\n                    <div class="score">\n                        <small>Moves: <label data-uid="labelMoves"></label></small>\n                            &nbsp; | &nbsp;\n                        <small>Level: <label data-uid="labelLevel"></label></small>\n                            &nbsp; | &nbsp;\n                        <small>Score: <label data-uid="labelScore"></label></small>\n                    </div>\n                    <div class="pointsEarnedBox">\n                        <span data-uid="spanPointsEarned"></span>\n                    </div>\n                </div>'
                }
                ,
                t.prototype.updateLevel = function(e) {
                    this.labelLevel.innerText = "" + e
                }
                ,
                t.prototype.updateMoves = function(e) {
                    this.labelMoves.innerText = "" + e
                }
                ,
                t.prototype.updateScore = function(e) {
                    this.labelScore.innerText = "" + e,
                    this.animateScore(this.points, e),
                    this.points = e
                }
                ,
                t.prototype.animateScore = function(e, t) {
                    var n = this
                      , o = -1
                      , i = e
                      , r = Date.now()
                      , a = function(e, s) {
                        n.labelScore.innerText = "" + e,
                        e >= s || Date.now() - r > 500 ? (n.labelScore.innerText = "" + t,
                        window.cancelAnimationFrame(o)) : (i++,
                        o = window.requestAnimationFrame((function() {
                            a(i, t)
                        }
                        )))
                    };
                    e !== t && (o = window.requestAnimationFrame((function() {
                        a(i, t)
                    }
                    )))
                }
                ,
                t.prototype.updatePointsEarned = function(e) {
                    this.spanPointsEarned.innerText = "+" + e,
                    this.spanPointsEarned.classList.add("fadeOutDown")
                }
                ,
                t.prototype.emphasizeMoves = function() {
                    this.labelMoves.classList.add("emphasized")
                }
                ,
                t
            }(n(8404).UiWidget);
            t.ResultBoardView = r
        },
        7141: function(e, t, n) {
            var o, i = this && this.__extends || (o = function(e, t) {
                return (o = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                }
                )(e, t)
            }
            ,
            function(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
                function n() {
                    this.constructor = e
                }
                o(e, t),
                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
                new n)
            }
            );
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.Toast = void 0;
            var r = function(e) {
                function t() {
                    var t = e.call(this) || this;
                    return t.divToast = t.findUiElement("toast"),
                    t
                }
                return i(t, e),
                t.prototype.provideTemplate = function() {
                    return '<div data-uid="toast" class="toast"></div>'
                }
                ,
                t.prototype.show = function(e, t) {
                    var n = this;
                    void 0 === t && (t = !1);
                    var o = t ? "showQuick" : "show";
                    this.divToast.innerText = e,
                    this.divToast.classList.toggle(o),
                    setTimeout((function() {
                        n.divToast.classList.toggle(o)
                    }
                    ), t ? 1e3 : 3e3)
                }
                ,
                t
            }(n(8404).UiWidget);
            t.Toast = r
        },
        2501: function(e, t, n) {
            var o, i = this && this.__extends || (o = function(e, t) {
                return (o = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                }
                )(e, t)
            }
            ,
            function(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
                function n() {
                    this.constructor = e
                }
                o(e, t),
                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
                new n)
            }
            );
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.AboutActivity = void 0;
            var r = n(7343)
              , a = n(6909)
              , s = n(3348)
              , l = n(685)
              , u = function(e) {
                function t() {
                    var t = e.call(this) || this;
                    return t.numberOfPromoBubbles = 0,
                    t.bubbleMaker = new l.PromoBubbleMaker,
                    t.closeButton = t.findUiElement("closeButton"),
                    t.divTerms = t.findUiElement("divTerms"),
                    t.appVersion = t.findUiElement("appVersion"),
                    t.userAgentLabel = t.findUiElement("userAgentLabel"),
                    t.imgIcon = t.findUiElement("imgIcon"),
                    t.closeButton.onclick = function() {
                        s.ActivityManager.load("main")
                    }
                    ,
                    t.imgIcon.onclick = function() {
                        t.imgIconClicked()
                    }
                    ,
                    t.loadTerms(),
                    t.appVersion.innerText = r.Envirorment.getAppVersion(),
                    t.userAgentLabel.innerText = window.navigator.userAgent,
                    t
                }
                return i(t, e),
                t.prototype.start = function(e) {}
                ,
                t.prototype.provideTemplate = function() {
                    return '<div>\n                    <div class="closeButton" data-uid="closeButton"></div>\n                    <h1>About</h1>\n                    <img src="game-icon-big.png" border="0" class="icon" data-uid="imgIcon"/>                        \n\n                    <h2>Bubble Pairs</h2>\n                    <p>Version: <span data-uid="appVersion"></span></p>\n                                   <div data-uid="divTerms" class="paper"></div>\n                </div>'
                }
                ,
                t.prototype.loadTerms = function() {
                    var e = this;
                    fetch("terms.html?v=" + r.Envirorment.getAppVersion()).then((function(t) {
                        t.text().then((function(t) {
                            e.divTerms.innerHTML = t
                        }
                        ))
                    }
                    ))
                }
                ,
                t.prototype.imgIconClicked = function() {
                    this.numberOfPromoBubbles >= 32 || (this.bubbleMaker.show(++this.numberOfPromoBubbles),
                    32 == this.numberOfPromoBubbles && this.showEasterEgg())
                }
                ,
                t.prototype.showEasterEgg = function() {
                    var e = this;
                    a.MessageBox.show('<div>\n            <div style="font-size: 72px; color: #e74c3c; font-family: sans-serif; margin-bottom: 30px;">&#9829;</div>\n            <div>To my daughter Sara, with love!</div>\n        </div>', ["OK"], (function(t) {
                        e.cleanUpEasterEggs()
                    }
                    ), "Dedication")
                }
                ,
                t.prototype.cleanUpEasterEggs = function() {
                    l.PromoBubbleMaker.cleanUpAllEasterEggs(),
                    this.numberOfPromoBubbles = 0
                }
                ,
                t.prototype.onBackButtonClicked = function() {
                    a.MessageBox.isShown() || s.ActivityManager.load("main")
                }
                ,
                t
            }(n(3784).Activity);
            t.AboutActivity = u
        },
        3784: function(e, t, n) {
            var o, i = this && this.__extends || (o = function(e, t) {
                return (o = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                }
                )(e, t)
            }
            ,
            function(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
                function n() {
                    this.constructor = e
                }
                o(e, t),
                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
                new n)
            }
            );
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.Activity = void 0;
            var r = function(e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return i(t, e),
                t.prototype.onBackButtonClicked = function() {}
                ,
                t
            }(n(8404).UiWidget);
            t.Activity = r
        },
        5192: function(e, t, n) {
            var o, i = this && this.__extends || (o = function(e, t) {
                return (o = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                }
                )(e, t)
            }
            ,
            function(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
                function n() {
                    this.constructor = e
                }
                o(e, t),
                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
                new n)
            }
            );
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.BuyNowOnWebActivity = void 0;
            var r = n(7343)
              , a = n(6909)
              , s = n(3348)
              , l = function(e) {
                function t() {
                    var t = e.call(this) || this;
                    return t.termsLoaded = !1,
                    t.closeButton = t.findUiElement("closeButton"),
                    t.divTerms = t.findUiElement("divTerms"),
                    t.showTermsLink = t.findUiElement("showTermsLink"),
                    t.closeButton.onclick = function() {
                        s.ActivityManager.load("purchase-web")
                    }
                    ,
                    t.showTermsLink.onclick = function() {
                        t.showTermsLink_onClick()
                    }
                    ,
                    t
                }
                return i(t, e),
                t.prototype.start = function(e) {}
                ,
                t.prototype.provideTemplate = function() {
                    return '<div>\n                <div class="closeButton" data-uid="closeButton"></div>\n                    <h1>Buy the unlock code</h1>\n\n                    <p>\n                        The unlock code for all levels costs only 1.00 EUR. <br />\n                        You can purchase it via PayPal. <br />&nbsp;<br />\n\n                        Click on the button bellow to proceed.\n                    </p>\n\n                    <br/>\n\n                    <div>\n                        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">\n                        <input type="hidden" name="cmd" value="_s-xclick">\n                        <input type="hidden" name="hosted_button_id" value="VPF59PAPPDZW4">\n                        <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">\n                        <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">\n                        </form>                   \n                    </div>\n\n\n                    <p>\n                        By clicking the button above to buy the game you are accepting \n                        <span data-uid="showTermsLink" class="linkLike">Terms and Conditions</span>. \n                    </p>\n\n                    <div class="paper" data-uid="divTerms"></div>\n                </div>'
                }
                ,
                t.prototype.showTermsLink_onClick = function() {
                    var e = this;
                    this.termsLoaded ? this.divTerms.style.display = "none" === this.divTerms.style.display ? "block" : "none" : fetch("terms.html?v=" + r.Envirorment.getAppVersion()).then((function(t) {
                        t.text().then((function(t) {
                            e.divTerms.innerHTML = t,
                            e.termsLoaded = !0
                        }
                        ))
                    }
                    ))
                }
                ,
                t.prototype.onBackButtonClicked = function() {
                    a.MessageBox.isShown() || s.ActivityManager.load("purchase-web")
                }
                ,
                t
            }(n(3784).Activity);
            t.BuyNowOnWebActivity = l
        },
        5089: function(e, t, n) {
            var o, i = this && this.__extends || (o = function(e, t) {
                return (o = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                }
                )(e, t)
            }
            ,
            function(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
                function n() {
                    this.constructor = e
                }
                o(e, t),
                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
                new n)
            }
            );
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.GamePlayActivity = void 0;
            var r = n(7343)
              , a = n(5886)
              , s = n(2800)
              , l = n(709)
              , u = n(4385)
              , c = n(6335)
              , d = n(6909)
              , p = n(3348)
              , v = n(2787)
              , f = n(946)
              , h = n(9044)
              , m = n(4827)
              , y = n(1310)
              , b = n(563)
              , g = n(7141)
              , _ = function(e) {
                function t() {
                    var t = e.call(this) || this;
                    return t.divPlaygroundContainer = t.findUiElement("divPlaygroundContainer"),
                    t.divResultBoardContainer = t.findUiElement("divResultBoardContainer"),
                    t.divDebug = t.findUiElement("divDebug"),
                    t.divPowerUps = t.findUiElement("divPowerUps"),
                    t.powerUpsToolbar = new y.PowerUpsToolbar,
                    t.powerUpsToolbar.setEventHandler((function(e, n) {
                        t.onPowerUpRequested(e)
                    }
                    )),
                    t.powerUpsToolbar.init(t.divPowerUps),
                    t.closeButton = t.findUiElement("closeButton"),
                    t.closeButton.onclick = function() {
                        t.closeButtonClicked()
                    }
                    ,
                    t.gameEventHandler = function(e) {
                        t.onGameEvent(e)
                    }
                    ,
                    t.resultBoardView = new b.ResultBoardView,
                    t.resultBoardView.init(t.divResultBoardContainer),
                    t.toaster = new g.Toast,
                    t.toaster.init(document.querySelector("body")),
                    t
                }
                return i(t, e),
                t.prototype.provideTemplate = function() {
                    return '<div data-uid="divContainer">\n                    <div class="closeButton" data-uid="closeButton"></div>\n        \n                    <div data-uid="divResultBoardContainer"></div>                      \n                    <div data-uid="divDebug"></div>\n                    <div data-uid="divPlaygroundContainer"></div>\n                    <div data-uid="divPowerUps"></div>\n                </div>'
                }
                ,
                t.prototype.start = function(e) {
                    var t = r.Envirorment.isDebug();
                    if (this.gameLevelNumber = parseInt(e[0]),
                    this.gameLevel = (new a.LevelBuilder).build(this.gameLevelNumber),
                    this.divPowerUps.style.display = this.gameLevel.powerUp > 0 ? "block" : "none",
                    this.setupPowerUps(),
                    this.isLevelPlayable()) {
                        var n = !r.Envirorment.makePlatformEngine().isPurchased() && this.willThisLevelPromotePurchaseOfApp();
                        this.startLevel(t, n)
                    } else
                        this.divResultBoardContainer.style.visibility = "hidden",
                        d.MessageBox.show("You have to purchase the rest levels.", ["OK"], (function() {
                            p.ActivityManager.load(r.Envirorment.makePlatformEngine().getPurchaseAction())
                        }
                        ), "All free levels fullfiled")
                }
                ,
                t.prototype.setupPowerUps = function() {
                    this.powerUpsToolbar.setButtonAvailable(c.PowerUpType.FreezeRotation, this.gameLevel.powerUp >= 1),
                    this.powerUpsToolbar.setButtonAvailable(c.PowerUpType.PlusOne, this.gameLevel.powerUp >= 2),
                    this.powerUpsToolbar.setButtonAvailable(c.PowerUpType.SneakPeek, this.gameLevel.powerUp >= 3),
                    this.powerUpsToolbar.setButtonAvailable(c.PowerUpType.SeekAndFind, this.gameLevel.powerUp >= 4)
                }
                ,
                t.prototype.willThisLevelPromotePurchaseOfApp = function() {
                    return t.LEVELS_TO_PROMOTE_PURCHASE.indexOf(this.gameLevelNumber) >= 0
                }
                ,
                t.prototype.startLevel = function(e, t) {
                    var n = this;
                    r.Envirorment.getTracker().levelLoaded(this.gameLevelNumber),
                    t ? d.MessageBox.show("Free version of game has limited number of levels. \n                            By purchasing this game for only 1.00 EUR you will get a code that unlocks all levels.<br/>&nbsp;<br/>\n                            <b>Will you consider buying this game?</b>", ["Purchase Now", "Continue"], (function(t) {
                        "Purchase Now" === t ? p.ActivityManager.load(r.Envirorment.makePlatformEngine().getPurchaseAction()) : n.startGamePlay(e)
                    }
                    ), "Unlock all levels", "Purchase Now") : this.startGamePlay(e)
                }
                ,
                t.prototype.isLevelPlayable = function() {
                    var e = r.Envirorment.makePlatformEngine();
                    return !!e.isPurchased() || e.getNumberOfFreeLevels() > this.gameLevelNumber
                }
                ,
                t.prototype.onGameEvent = function(e) {
                    if (e.type === f.GameEventType.UpdateResult) {
                        var t = e.value.split(",");
                        this.updateResult(parseInt(t[0]), parseInt(t[1]))
                    } else
                        e.type === f.GameEventType.Warning ? (this.toaster.show(e.value),
                        this.resultBoardView.emphasizeMoves()) : e.type === f.GameEventType.PointsEarned ? this.resultBoardView.updatePointsEarned(parseInt(e.value)) : e.type === f.GameEventType.LevelFailed ? this.showLevelFailedMessage() : e.type === f.GameEventType.LevelCompleted && (this.persistResults(e.value[1], e.value[2], e.value[3]),
                        this.showLevelCompletedMessage(e.value[1], e.value[3], e.value[4], e.value[5]),
                        r.Envirorment.getTracker().levelCompleted(this.gameLevelNumber, e.value[1]))
                }
                ,
                t.prototype.updateResult = function(e, t) {
                    this.resultBoardView.updateMoves(e),
                    this.resultBoardView.updateScore(t)
                }
                ,
                t.prototype.showLevelWelcomeMessage = function(e) {
                    var t = new s.LevelVisualizer(this.gameLevel).getVisualisation() + "<br/>\n                <p>The challange: \n                    <b>" + this.gameLevel.numberOfFields / 2 + "</b> pairs in <b>" + this.gameLevel.numberOfMoves + "</b> moves. \n                \n                <br/><br/>\n                Good luck!\n                </p>";
                    this.gameLevel.hint.length > 0 && (t = this.gameLevel.hint),
                    setTimeout((function() {
                        d.MessageBox.showAlert(t, "Start", "Level " + e)
                    }
                    ), 600)
                }
                ,
                t.prototype.showLevelFailedMessage = function() {
                    var e = this;
                    setTimeout((function() {
                        d.MessageBox.show("You did not manage to fulfill the challenge!", ["Play Again", "Quit"], (function(t) {
                            "Play Again" === t ? p.ActivityManager.load("gameplay", ["" + e.gameLevelNumber]) : p.ActivityManager.load("main")
                        }
                        ), "Not enough moves :(", "Play Again")
                    }
                    ), 1e3)
                }
                ,
                t.prototype.showLevelCompletedMessage = function(e, t, n, o) {
                    var i = this
                      , r = this.gameLevelNumber == (new a.LevelBuilder).getMaximum()
                      , s = this.generateComplitionType(n, o)
                      , l = new h.LevelCompletedMessage(e,t,s,this.isNewLevelRecord(e),r);
                    d.MessageBox.show(l.render(), r ? ["OK"] : ["Next Level"], (function(e) {
                        "Next Level" === e ? p.ActivityManager.load("gameplay", ["" + (i.gameLevelNumber + 1)]) : p.ActivityManager.load("main")
                    }
                    ), "Level Completed")
                }
                ,
                t.prototype.generateComplitionType = function(e, t) {
                    return e ? h.LevelCompletedType.AlmostFailed : t ? h.LevelCompletedType.Incredable : h.LevelCompletedType.Normal
                }
                ,
                t.prototype.isNewLevelRecord = function(e) {
                    var t = new l.ScoreTableManager
                      , n = t.load();
                    return t.isNewLevelRecordAchieved(n, this.gameLevel.id, e)
                }
                ,
                t.prototype.closeButtonClicked = function() {
                    var e = this;
                    d.MessageBox.show('<span class="blink">Paused</span>', ["Continue", "Restart", "Change level", "Quit"], (function(t) {
                        "Change level" === t ? p.ActivityManager.load("levelbrowser") : "Quit" === t ? p.ActivityManager.load("home") : "Restart" === t && p.ActivityManager.load("gameplay", ["" + e.gameLevelNumber])
                    }
                    ), "Paused", "Continue")
                }
                ,
                t.prototype.persistResults = function(e, t, n) {
                    if (!r.Envirorment.isDebug()) {
                        var o = new l.ScoreTableManager
                          , i = o.load();
                        o.setLevelNumber(i, this.gameLevelNumber + 1),
                        o.putNewLevelScore(i, this.gameLevel.id, e, t, n),
                        o.save(i)
                    }
                }
                ,
                t.prototype.startGamePlay = function(e) {
                    var t = this;
                    this.playGround = new m.PlaygroundView(this.gameLevelNumber,this.gameEventHandler,e),
                    this.playGround.init(this.divPlaygroundContainer, [], !0),
                    this.resultBoardView.updateLevel(this.gameLevelNumber),
                    this.showLevelWelcomeMessage(this.gameLevelNumber),
                    e && new v.GameDebugerView(this.gameLevel,(function(e) {
                        t.playGround.applyPowerUp(e)
                    }
                    )).init(this.divDebug, [], !0)
                }
                ,
                t.prototype.onPowerUpRequested = function(e) {
                    var t = e;
                    this.playGround.isPowerUpApplicable(t) ? (this.playGround.applyPowerUp(t),
                    this.powerUpsToolbar.setButtonEnabled(t, !1),
                    t === c.PowerUpType.PlusOne ? this.toaster.show("Additional move added.", !1) : t === c.PowerUpType.FreezeRotation && this.toaster.show("I will not rotate on your next 4 wrong moves.")) : d.MessageBox.show(u.PowerUpInfo.getPowerUpPrerequisiteInfo(t), ["OK"], (function() {}
                    ), "Power Up: " + u.PowerUpInfo.getPowerUpName(t))
                }
                ,
                t.prototype.onBackButtonClicked = function() {
                    d.MessageBox.isShown() || this.closeButtonClicked()
                }
                ,
                t.LEVELS_TO_PROMOTE_PURCHASE = [4, 7, 10, 13],
                t
            }(n(3784).Activity);
            t.GamePlayActivity = _
        },
        2241: function(e, t, n) {
            var o, i = this && this.__extends || (o = function(e, t) {
                return (o = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                }
                )(e, t)
            }
            ,
            function(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
                function n() {
                    this.constructor = e
                }
                o(e, t),
                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
                new n)
            }
            );
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.LevelBrowser = void 0;
            var r = n(7343)
              , a = n(8571)
              , s = n(5886)
              , l = n(709)
              , u = n(6909)
              , c = n(3348)
              , d = n(5244)
              , p = function(e) {
                function t() {
                    var t = e.call(this) || this;
                    return t.divContainer = t.findUiElement("container"),
                    t.divPurchaseContainer = t.findUiElement("divPurchaseContainer"),
                    t.closeButton = t.findUiElement("closeButton"),
                    t.btnUnlock = t.findUiElement("btnUnlock"),
                    t.closeButton.onclick = function() {
                        c.ActivityManager.load("main")
                    }
                    ,
                    t.btnUnlock.onclick = function() {
                        t.btnUnlock_onClick()
                    }
                    ,
                    r.Envirorment.makePlatformEngine().isPurchased() || (t.divPurchaseContainer.style.display = "block"),
                    t.loadAllLevels(),
                    t
                }
                return i(t, e),
                t.prototype.provideTemplate = function() {
                    return '<div>\n                    <div class="closeButton" data-uid="closeButton"></div>\n                    <h1>Levels</h1>\n\n                    <div data-uid="divPurchaseContainer" style="display: none; margin-bottom: 10px;">\n                        <button data-uid="btnUnlock"></button>\n                    </div>\n\n                    <div data-uid="container" class="levelsList apear"></div>\n                </div>'
                }
                ,
                t.prototype.start = function(e) {}
                ,
                t.prototype.loadAllLevels = function() {
                    for (var e = this, t = new s.LevelBuilder, n = t.getMaximum(), o = 0; o <= n; o++) {
                        var i = t.build(o)
                          , a = this.loadLevelScore(i.id)
                          , u = null === a ? 0 : a.points
                          , c = null === a ? 0 : a.stars
                          , p = (new l.ScoreTableManager).load().levelNumber
                          , v = p < o
                          , f = p === o
                          , h = this.isLevelPurchased(o);
                        r.Envirorment.isDebug() && (v = !1,
                        h = !0);
                        var m = new d.LevelItemView(o,i,u,c,(function(t) {
                            e.onLevelSelected(t)
                        }
                        ),v,f,h);
                        m.setShowDebugInfo(r.Envirorment.isDebug()),
                        m.init(this.divContainer)
                    }
                }
                ,
                t.prototype.isLevelPurchased = function(e) {
                    var t = r.Envirorment.makePlatformEngine();
                    return e < t.getNumberOfFreeLevels() || t.isPurchased()
                }
                ,
                t.prototype.loadLevelScore = function(e) {
                    var t = null;
                    return (new l.ScoreTableManager).load().scoresByLevel.forEach((function(n) {
                        n.levelId === e && (t = n)
                    }
                    )),
                    t
                }
                ,
                t.prototype.onLevelSelected = function(e) {
                    c.ActivityManager.load("gameplay", ["" + e])
                }
                ,
                t.prototype.btnUnlock_onClick = function() {
                    r.Envirorment.getPlatformType() === a.PlatformType.Web && c.ActivityManager.load("purchase-web")
                }
                ,
                t.prototype.onBackButtonClicked = function() {
                    u.MessageBox.isShown() || c.ActivityManager.load("main")
                }
                ,
                t
            }(n(3784).Activity);
            t.LevelBrowser = p
        },
        4802: function(e, t, n) {
            var o, i = this && this.__extends || (o = function(e, t) {
                return (o = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                }
                )(e, t)
            }
            ,
            function(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
                function n() {
                    this.constructor = e
                }
                o(e, t),
                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
                new n)
            }
            );
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.MainActivity = void 0;
            var r = n(7343)
              , a = n(8571)
              , s = n(709)
              , l = n(3348)
              , u = n(685)
              , c = function(e) {
                function t() {
                    var t = e.call(this) || this;
                    return t.promoBubbleMaker = new u.PromoBubbleMaker,
                    t.btnNewGame = t.findUiElement("btnNewGame"),
                    t.btnPickLevel = t.findUiElement("btnPickLevel"),
                    t.btnOptions = t.findUiElement("btnOptions"),
                    t.imgLogo = t.findUiElement("imgLogo"),
                    t.btnNewGame.onclick = function() {
                        t.btnNewGame_onClick()
                    }
                    ,
                    t.btnPickLevel.onclick = function() {
                        t.btnPickLevel_onClick()
                    }
                    ,
                    t.btnOptions.onclick = function() {
                        t.btnOptions_onClick()
                    }
                    ,
                    t.imgLogo.onclick = function() {
                        t.imgLogoClicked()
                    }
                    ,
                    t
                }
                return i(t, e),
                t.prototype.provideTemplate = function() {
                    return '<div>\n                    <h1>Bubble Pairs</h1>\n                    <img src="img.png" border="0" class="icon" data-uid="imgLogo"/>\n                    \n                    <div class="apear mainMenu">\n                        <button data-uid="btnNewGame" class="default">Play</button>\n                        <button data-uid="btnPickLevel">Level browser</button>\n                        <button data-uid="btnPurchase" style="display: none;">Purchase Game</button>\n                        <button data-uid="btnOptions">Options</button>\n                   </div>\n                </div>'
                }
                ,
                t.prototype.start = function(e) {}
                ,
                t.prototype.btnNewGame_onClick = function() {
                    var e = (new s.ScoreTableManager).load().levelNumber;
                    l.ActivityManager.load("gameplay", ["" + e])
                }
                ,
                t.prototype.btnPickLevel_onClick = function() {
                    l.ActivityManager.load("levelbrowser")
                }
                ,
                t.prototype.btnOptions_onClick = function() {
                    l.ActivityManager.load("options")
                }
                ,
                t.prototype.imgLogoClicked = function() {
                    u.PromoBubbleMaker.cleanUpAllEasterEggs(),
                    this.promoBubbleMaker.show(1)
                }
                ,
                t
            }(n(3784).Activity);
            t.MainActivity = c
        },
        9927: function(e, t, n) {
            var o, i = this && this.__extends || (o = function(e, t) {
                return (o = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                }
                )(e, t)
            }
            ,
            function(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
                function n() {
                    this.constructor = e
                }
                o(e, t),
                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
                new n)
            }
            );
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.OptionsActivity = void 0;
            var r = n(2142)
              , a = n(7343)
              , s = n(5220)
              , l = n(709)
              , u = n(6909)
              , c = n(3348)
              , d = n(7141)
              , p = function(e) {
                function t() {
                    var n = e.call(this) || this;
                    return n.gameSettingsManager = new s.GameSettingsManager,
                    n.closeButton = n.findUiElement("closeButton"),
                    n.chkColorBlind = n.findUiElement("chkColorBlind"),
                    n.btnReset = n.findUiElement("btnReset"),
                    n.chkLightTheme = n.findUiElement("chkLightTheme"),
                    n.chkSounds = n.findUiElement("chkSounds"),
                    n.chkVibrate = n.findUiElement("chkVibrate"),
                    n.closeButton.onclick = function() {
                        n.closeButton_onClick()
                    }
                    ,
                    n.btnReset.onclick = function() {
                        n.btnReset_onClick()
                    }
                    ,
                    n.chkColorBlind.checked = n.gameSettingsManager.isColorBlindMode(),
                    n.chkColorBlind.onchange = function() {
                        n.chkColorBlind_onChange()
                    }
                    ,
                    n.chkLightTheme.checked = n.gameSettingsManager.getThemeName() === t.THEME_NAME_LIGHT,
                    n.chkLightTheme.onchange = function() {
                        n.chkLightTheme_onChange()
                    }
                    ,
                    n.chkSounds.checked = n.gameSettingsManager.isSoundsEnabled(),
                    n.chkSounds.onchange = function() {
                        n.chkSounds_onChange()
                    }
                    ,
                    n.chkVibrate.checked = n.gameSettingsManager.isVibrationEnabled(),
                    n.chkVibrate.onchange = function() {
                        n.chkVibrate_onChange()
                    }
                    ,
                    n.toaster = new d.Toast,
                    n.toaster.init(document.querySelector("body")),
                    n
                }
                return i(t, e),
                t.prototype.start = function(e) {}
                ,
                t.prototype.provideTemplate = function() {
                    return '<div>\n                    <div class="closeButton" data-uid="closeButton"></div>\n                    <h1>Options</h1>\n\n                    <div class="apear">\n\n                        <h2>Appearance</h2>\n                        <label class="block">Color blind mode</label>\n                        \n                        <label class="switch">\n                            <input type="checkbox" data-uid="chkColorBlind" />\n                            <div class="slider"></div>\n                        </label>\n                        <br />\n\n                        <label class="block">Light theme</label>\n                        \n                        <label class="switch">\n                            <input type="checkbox" data-uid="chkLightTheme" />\n                            <div class="slider"></div>\n                        </label>\n                        <br />\n\n                        <h2>Sounds and Gameplay</h2>\n                        <label class="block">Vibrate on false move</label>\n                        \n                        <label class="switch">\n                            <input type="checkbox" data-uid="chkVibrate" />\n                            <div class="slider"></div>\n                        </label>\n                        <label class="block" style="font-size: smaller;">(experimantal)</label>\n                        <br />\n\n                        <label class="block">Sounds</label>\n\n                        <label class="switch">\n                            <input type="checkbox" data-uid="chkSounds" />\n                            <div class="slider"></div>\n                        </label>\n                        <label class="block" style="font-size: smaller;">(experimantal)</label>\n                        <br />\n\n                        <h2>Factory state</h2>\n                        <button data-uid="btnReset">Reset</button>\n\n                        <p>Click button above to reset all scores.</p>\n                    </div>\n\n                </div>'
                }
                ,
                t.prototype.closeButton_onClick = function() {
                    c.ActivityManager.load("main")
                }
                ,
                t.prototype.chkColorBlind_onChange = function() {
                    this.gameSettingsManager.setColorBlindMode(this.chkColorBlind.checked),
                    this.gameSettingsManager.save()
                }
                ,
                t.prototype.chkLightTheme_onChange = function() {
                    r.Main.loadTheme(this.chkLightTheme.checked ? t.THEME_NAME_LIGHT : ""),
                    this.gameSettingsManager.setThemeName(this.chkLightTheme.checked ? t.THEME_NAME_LIGHT : ""),
                    this.gameSettingsManager.save()
                }
                ,
                t.prototype.chkSounds_onChange = function() {
                    this.chkSounds.checked && a.Envirorment.getDefaultSoundEffectsEngine().playFirstBoxOpened(),
                    this.gameSettingsManager.setSoundsEnabled(this.chkSounds.checked),
                    this.gameSettingsManager.save()
                }
                ,
                t.prototype.chkVibrate_onChange = function() {
                    this.chkVibrate.checked && navigator.vibrate(200),
                    this.gameSettingsManager.setVibrationEnabled(this.chkVibrate.checked),
                    this.gameSettingsManager.save()
                }
                ,
                t.prototype.btnReset_onClick = function() {
                    var e = this;
                    u.MessageBox.show("This action would reset all scores that you ever made. \n                        Are you sure you want to proceed?", ["Yes", "No"], (function(t) {
                        "Yes" === t && ((new l.ScoreTableManager).reset(),
                        e.toaster.show("Reset of score table succeed."))
                    }
                    ), "Confirm reset action", "No")
                }
                ,
                t.prototype.onBackButtonClicked = function() {
                    u.MessageBox.isShown() || this.closeButton_onClick()
                }
                ,
                t.THEME_NAME_LIGHT = "themeLight",
                t
            }(n(3784).Activity);
            t.OptionsActivity = p
        },
        8150: function(e, t, n) {
            var o, i = this && this.__extends || (o = function(e, t) {
                return (o = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                }
                )(e, t)
            }
            ,
            function(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
                function n() {
                    this.constructor = e
                }
                o(e, t),
                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
                new n)
            }
            );
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.PurchaseOnWebActivity = void 0;
            var r = n(6909)
              , a = n(3348)
              , s = function(e) {
                function t() {
                    var t = e.call(this) || this;
                    return t.closeButton = t.findUiElement("closeButton"),
                    t.btnUnlockCode = t.findUiElement("btnUnlockCode"),
                    t.btnPurchase = t.findUiElement("btnPurchase"),
                    t.closeButton.onclick = function() {
                        t.closeButton_onClick()
                    }
                    ,
                    t.btnUnlockCode.onclick = function() {
                        t.btnUnlockCode_onClick()
                    }
                    ,
                    t.btnPurchase.onclick = function() {
                        t.btnPurchase_onClick()
                    }
                    ,
                    t
                }
                return i(t, e),
                t.prototype.start = function(e) {}
                ,
                t.prototype.provideTemplate = function() {
                    return '<div>\n                    <div class="closeButton" data-uid="closeButton"></div>\n                    <h1>Purchase</h1>\n                    <div>\n                        <p>\n                            By purchasing this game for only \n                            <b>1.00 EUR</b> you will get \n                            a code that unlocks all levels.\n                        </p>\n                        \n                                           </div>\n                </div>'
                }
                ,
                t.prototype.closeButton_onClick = function() {
                    a.ActivityManager.load("main")
                }
                ,
                t.prototype.btnUnlockCode_onClick = function() {
                    a.ActivityManager.load("unlock-web")
                }
                ,
                t.prototype.btnPurchase_onClick = function() {
                    a.ActivityManager.load("buynow-web")
                }
                ,
                t.prototype.onBackButtonClicked = function() {
                    r.MessageBox.isShown() || this.closeButton_onClick()
                }
                ,
                t
            }(n(3784).Activity);
            t.PurchaseOnWebActivity = s
        },
        4133: function(e, t, n) {
            var o, i = this && this.__extends || (o = function(e, t) {
                return (o = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                }
                )(e, t)
            }
            ,
            function(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
                function n() {
                    this.constructor = e
                }
                o(e, t),
                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
                new n)
            }
            );
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.UnlockCodeViewOnWebActivity = void 0;
            var r = n(7343)
              , a = n(6909)
              , s = n(3348)
              , l = function(e) {
                function t() {
                    var t = e.call(this) || this;
                    return t.btnOk = t.findUiElement("btnOk"),
                    t.divCode = t.findUiElement("divCode"),
                    t.divCode.innerText = r.Envirorment.makePlatformEngine().showUnlockCode(),
                    t.btnOk.onclick = function() {
                        t.btnOk_onClick()
                    }
                    ,
                    t
                }
                return i(t, e),
                t.prototype.start = function(e) {}
                ,
                t.prototype.provideTemplate = function() {
                    return '<div>\n                    <h1>Unlock code</h1>\n\n                    <p>\n                        Thank you for purchasing this game. <br/>&nbsp;<br/>\n\n                        Your unlock code is \n                        \n                        <div data-uid="divCode" class="secretCode"></div>\n                        <br/>&nbsp;<br/>                            \n                        \n                        Plase remember and save this code somwhere so you can be \n                        able to provide it when you unlock this game. <br/>\n\n                        <button data-uid="btnOk" class="default">Ok</button>\n                    </p>\n                </div>'
                }
                ,
                t.prototype.btnOk_onClick = function() {
                    var e = this;
                    a.MessageBox.show("Please make sure that you remember and save unlock code before proceeding to the next step.", ["Unlock", "Cancel"], (function(t) {
                        "Unlock" === t && (e.unlockAndGo(),
                        r.Envirorment.getTracker().appUnlocked())
                    }
                    ), "Confirm saving of unlock code", "Next step")
                }
                ,
                t.prototype.unlockAndGo = function() {
                    var e = r.Envirorment.makePlatformEngine();
                    e.validateUnlockCode(this.divCode.innerText) ? (e.confirmPurchased(),
                    s.ActivityManager.load("main")) : s.ActivityManager.load("unlock-web")
                }
                ,
                t
            }(n(3784).Activity);
            t.UnlockCodeViewOnWebActivity = l
        },
        1798: function(e, t, n) {
            var o, i = this && this.__extends || (o = function(e, t) {
                return (o = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                }
                )(e, t)
            }
            ,
            function(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
                function n() {
                    this.constructor = e
                }
                o(e, t),
                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
                new n)
            }
            );
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.UnlockOnWebActivity = void 0;
            var r = n(7343)
              , a = n(6909)
              , s = n(3348)
              , l = function(e) {
                function t() {
                    var t = e.call(this) || this;
                    return t.numberOfTryouts = 0,
                    t.closeButton = t.findUiElement("closeButton"),
                    t.txtCode = t.findUiElement("txtCode"),
                    t.btnUnlock = t.findUiElement("btnUnlock"),
                    t.closeButton.onclick = function() {
                        s.ActivityManager.load("purchase-web")
                    }
                    ,
                    t.btnUnlock.onclick = function() {
                        t.btnUnlock_onClick()
                    }
                    ,
                    t.txtCode.onkeydown = function(e) {
                        "Enter" === e.key && t.btnUnlock_onClick()
                    }
                    ,
                    t.focusTextBox(),
                    t
                }
                return i(t, e),
                t.prototype.start = function(e) {}
                ,
                t.prototype.provideTemplate = function() {
                    return '<div>\n                    <div class="closeButton" data-uid="closeButton"></div>\n                    <h1>Unlock code</h1>\n\n                    <div data-uid="sceneUnlock">\n                        <p>Please enter unlock code that you purchased.</p>\n\n                        <label>\n                            Unlock code: <br />\n                            <input type="text" data-uid="txtCode" />\n                        </label>\n                        <br />\n\n                        <button data-uid="btnUnlock">Unlock</button>\n                    </div>\n                </div>'
                }
                ,
                t.prototype.btnUnlock_onClick = function() {
                    var e = this;
                    if (this.isInputValid()) {
                        var t = r.Envirorment.makePlatformEngine()
                          , n = this.txtCode.value.trim();
                        t.validateUnlockCode(n) ? (t.confirmPurchased(),
                        a.MessageBox.show("You have successfully unlocked all levels", ["OK"], (function() {
                            s.ActivityManager.load("main")
                        }
                        ), "Unlock sucessfull")) : (this.numberOfTryouts++,
                        a.MessageBox.show("The code that you have entered is not valid!", ["OK"], (function() {
                            e.txtCode.select(),
                            e.txtCode.focus(),
                            3 === e.numberOfTryouts && s.ActivityManager.load("main")
                        }
                        ), "Invalid unlock code"))
                    }
                }
                ,
                t.prototype.isInputValid = function() {
                    var e = this
                      , t = !0;
                    return 0 === this.txtCode.value.trim().length && (t = !1,
                    a.MessageBox.show("You need to enter the unlock code!", ["OK"], (function() {
                        e.txtCode.select(),
                        e.txtCode.focus()
                    }
                    ), "Validation code error")),
                    t
                }
                ,
                t.prototype.focusTextBox = function() {
                    var e = this;
                    setTimeout((function() {
                        e.txtCode.focus()
                    }
                    ), 300)
                }
                ,
                t.prototype.onBackButtonClicked = function() {
                    a.MessageBox.isShown() || s.ActivityManager.load("purchase-web")
                }
                ,
                t
            }(n(3784).Activity);
            t.UnlockOnWebActivity = l
        }
    }
      , t = {};
    function n(o) {
        var i = t[o];
        if (void 0 !== i)
            return i.exports;
        var r = t[o] = {
            exports: {}
        };
        return e[o].call(r.exports, r, r.exports, n),
        r.exports
    }
    n.r = e=>{
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ;
    (()=>{
        n(370);
        var e = n(2142);
        window.onload = function() {
            e.Main.start()
        }
    }
    )()
}
)();
