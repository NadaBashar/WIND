//Init vars
var botFrameJs, botFrameCss , autoCompleteLib;
! function(e) {
    function t(o) {
        if (n[o]) return n[o].exports;
        var i = n[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(i.exports, i, i.exports, t), i.l = !0, i.exports
    }
    var n = {};
    t.m = e, t.c = n, t.d = function(e, n, o) {
        t.o(e, n) || Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: o
        })
    }, t.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return t.d(n, "a", n), n
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, t.p = "/bots-client-sdk-js/",t(t.s = 305)
}({
    10: function(e, t) {
        var n;
        n = function() {
            return this
        }();
        try {
            n = n || Function("return this")() || (0, eval)("this")
        } catch (e) {
            "object" == typeof window && (n = window)
        }
        e.exports = n
    },
    115: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        t.IFRAME_ID = "web-messenger-container"
    },
    137: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        t.SCREEN_SIZES = {
            lg: {
                minHeight: 668,
                minWidth: 1200
            },
            md: [{
                minHeight: 508,
                minWidth: 768,
                maxWidth: 1199
            }, {
                minHeight: 508,
                maxHeight: 667,
                minWidth: 768
            }],
            sm: {
                maxHeight: 507,
                minWidth: 768
            },
            xs: {
                maxWidth: 767
            }
        }
    },
    207: function(e, t, n) {
        "use strict";

        function o(e) {
            "complete" !== document.readyState && "loaded" !== document.readyState && "interactive" !== document.readyState || !document.body ? document.addEventListener("DOMContentLoaded", function() {
                e()
            }) : e()
        }

        function i(e) {
            var t = ["screen"];
            return e.minHeight && t.push("(min-height: " + e.minHeight + "px)"), e.maxHeight && t.push("(max-height: " + e.maxHeight + "px)"), e.minWidth && t.push("(min-width: " + e.minWidth + "px)"), e.maxWidth && t.push("(max-width: " + e.maxWidth + "px)"), t.join(" and ")
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.waitForPage = o, t.generateMediaQuery = i
    },
    208: function(e, t) {
        function n(e, t) {
            var n = 0,
                o = e.length;
            for (n; n < o && !1 !== t(e[n], n); n++);
        }

        function o(e) {
            return "[object Array]" === Object.prototype.toString.apply(e)
        }

        function i(e) {
            return "function" == typeof e
        }
        e.exports = {
            isFunction: i,
            isArray: o,
            each: n
        }
    },
    305: function(e, t, n) {
        "use strict";
        (function(e) {
            var t = n(306),
                o = n(115);
            document.getElementById(o.IFRAME_ID) || ((0, t.setUp)(), window.__onWebMessengerHostReady__ ? window.__onWebMessengerHostReady__(t.WebMessenger) : e.Smooch = t.WebMessenger)
        }).call(t, n(10))
    },
    306: function(e, t, n) {
        "use strict";

        function o(e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                return n
            }
            return Array.from(e)
        }

        function i() {
            if (!document.getElementById(p.IFRAME_ID)) {
                g = void 0, v = void 0, window.__onWebMessengerFrameReady__ = s;
                for (var e = E[0], t = 0; t < E.length; e = E[++t]) m[e] && delete m[e];
                c(m, O)
            }
        }

        function r() {
            var t = document.createElement("link");
			////////////////////////////////////////////////////////////////////////////////////	
            fetch('/stylesheets/init.txt').then(function(response) {
                // Convert to JSON
                return response.json();
            }).then(function(data) {
                var botsCss = data.botsCss;
				t.rel = "stylesheet", t.type = "text/css", t.href = botsCss, document.body.appendChild(t)

            });
			////////////////////////////////////////////////////////////////////////////////////			
        }


        function s(e) {
            window.__onWebMessengerFrameReady__ = function() {}, g = e, y || f.init(v);
            for (var t = E[0], n = 0; n < E.length; t = E[++n]) m[t] = g[t];
            if (_) {
                for (var i = _[0], r = 0; r < _.length; i = _[++r]) {
                    var s;
                    (s = g).on.apply(s, o(i.args))
                }
                _ = void 0
            }
            if (x) {
                var a, c = (a = g).init.apply(a, o(x));
                x = void 0;
                for (var u = w[0], d = 0; d < w.length; u = w[++d]) c = "then" === u.type ? c.then(u.next) : c.catch(u.next);
                w = []
            }
        }
        
           function a() {
            ////////////////////////////////////////////////////////////////////////////////////	
            fetch('/stylesheets/init.txt').then(function(response) {
                // Convert to JSON
                return response.json();
            }).then(function(data) {
                botFrameJs = data.botFrameJs;
                botFrameCss = data.botFrameCss;
                autoCompleteLib = data.autoCompleteLib;
                if (!v) {
                var e = null,
                    t = !1;
                v = document.createElement("iframe"), v.id = p.IFRAME_ID, v.frameBorder = 0, v.allowFullscreen = !0, v.allowTransparency = !0, v.scrolling = "no", v.className = d.default.iframe;
                var n = function() {
                    t = !0, clearInterval(e), delete v.onload;
                    var n = I(v);
                    n.open(), n.write("\n<!DOCTYPE html>\n<html>\n<head>\n\n<style>select { font-family: Cursive; font-size: 15px; -webkit-appearance: button; -moz-appearance: button; -webkit-user-select: none; -moz-user-select: none; -webkit-padding-end: 20px; -moz-padding-end: 20px; -webkit-padding-start: 2px; -moz-padding-start: 2px; background-color: #ffffff; /* fallback color if gradients are not supported */ background-image: url(../images/select-arrow.png), -webkit-linear-gradient(top, #ffffff, #ffffff); /* For Chrome and Safari */ background-image: url(../images/select-arrow.png), -moz-linear-gradient(top, #ffffff, #ffffff); /* For old Fx (3.6 to 15) */ background-image: url(../images/select-arrow.png), -ms-linear-gradient(top, #ffffff, #ffffff); /* For pre-releases of IE 10*/ background-image: url(../images/select-arrow.png), -o-linear-gradient(top, #ffffff, #ffffff); /* For old Opera (11.1 to 12.0) */ background-image: url(../images/select-arrow.png), linear-gradient(to bottom, #ffffff, #ffffff); /* Standard syntax; must be last */ background-position: center right; background-repeat: no-repeat; border: 1px solid #AAA; border-radius: 10px; box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.9); color: #555; margin: 0;cursor: pointer; overflow: hidden; padding-top: 2px; padding-bottom: 2px; text-overflow: ellipsis; white-space: nowrap;}option:hover {background:#dbdbdb;}*:focus {outline: transparent;}option:checked {box-shadow: 0 0 10px 100px #dbdbdb inset;}</style><script>function myFunction(e) {e = e || window.event;if (e.keyCode == '40') { if(document.getElementById('IP_temp_listBox')){ document.getElementById('IP_temp_listBox').focus(); document.getElementById('IP_temp_listBox').selectedIndex = 0; } }else if(e.keyCode == '38'){if(document.getElementById('IP_temp_listBox')){ document.getElementById('IP_temp_listBox').focus(); var options = document.getElementById('IP_temp_listBox').options; document.getElementById('IP_temp_listBox').selectedIndex = options.length -1; }}else if (e.keyCode == '27'){ if(document.getElementById('IP_temp_listBox')){}}}</script> <script language='JavaScript'><!--document.onkeydown = keyhandler;function keyhandler(evt) { evt = evt || window.event ; var isEscape = false; if ('key' in evt) { isEscape = (evt.key === 'Escape' || evt.key === 'Esc'); } else { isEscape = (evt.keyCode === '27'); } if (isEscape && document.getElementById('IP_temp_listBox')) {try { var elem = document.getElementById('IP_temp_listBox'); elem.parentNode.removeChild(elem);}catch(err) { document.getElementById('textAreaTags').focus;} }}</script><link rel='stylesheet' href=" + "'" + botFrameCss + "'" + "type='text/css' />\n<script src=" + "'" + botFrameJs + "'" + "async crossorigin='anonymous'><\/script>\n<script type='text/javascript' src="+ "'" +autoCompleteLib + "'" +"></script>                   </head>\n                        <body>\n                        <div id='mount'></div>\n                    </body>\n                    </html>\n                    "), n.close()
                };
                e = setInterval(function() {
                    var e = I(v);
                    t || !e || "complete" != e.readyState && "interactive" != e.readyState || n()
                }, 1e3), v.onload = function() {
                    t || n()
                }
            }
            y ? b && (b.appendChild(v), b = void 0) : document.body.appendChild(v)
            });
			////////////////////////////////////////////////////////////////////////////////////	
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.WebMessenger = void 0;
        var c = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o])
            }
            return e
        };
        t.setUp = i;
        var u = n(307),
            d = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(u),
            l = n(207),
            h = n(309),
            f = function(e) {
                if (e && e.__esModule) return e;
                var t = {};
                if (null != e)
                    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e, t
            }(h),
            p = n(115),
            m = t.WebMessenger = {},
            g = void 0,
            v = void 0,
            y = void 0,
            b = void 0,
            w = [],
            _ = [],
            x = void 0,
            M = /lebo|awle|pide|obo|rawli|dsbo/i.test(navigator.userAgent),
            W = /PhantomJS/.test(navigator.userAgent) && !0,
            E = ["init", "login", "on", "off", "logout", "sendMessage", "triggerPostback", "updateUser", "getConversation", "getUser", "open", "close", "isOpened", "startConversation", "setDelegate", "markAllAsRead", "notificationChannelPromptEnabled", "setPredefinedMessage"];
        var O = {
                VERSION: "4.17.2",
                on: function() {
                    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    _ || (_ = []), _.push({
                        args: t
                    })
                },
                init: function() {
                    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    x = t, y = t.length > 0 && !!t[0].embedded, M || W || (0, l.waitForPage)(function() {
                        r(), a()
                    });
                    var o = {
                        then: function(e) {
                            return w.push({
                                type: "then",
                                next: e
                            }), o
                        },
                        catch: function(e) {
                            return w.push({
                                type: "catch",
                                next: e
                            }), o
                        }
                    };
                    return o
                },
                render: function(e) {
                    v ? e.appendChild(v) : b = e
                },
                destroy: function() {
                    g && (g.destroy(), v.remove ? v.remove() : v.parentNode.removeChild(v), f.unregister(), i())
                }
            },
            I = function(e) {
                return e.contentWindow && e.contentWindow.document
            }
    },
    307: function(e, t) {
        e.exports = {
            iframe: "_2ChX4GFAl1-UBiWknYZyEQ",
            displayButton: "avcHn2VQJenBvoR5hilPG",
            widgetClosed: "_3fQbteJd3oQu4il3LpMKkX",
            "iframe-button-close-lg": "_3FxKeTOOgcsFroUq6se9N7",
            "iframe-button-close-md": "_1GmqPtlICLsWVMg2Kpdx_0",
            "iframe-button-close-sm": "_36mHeCXpAKdhEsuuD5g8oV",
            "iframe-button-close-xs": "_1ZWQW0p6AI6UGwBFbdBf9M",
            displayTab: "_3dtqBiGeC8k3yop4A-9Lwm",
            widgetOpened: "_2TELtk5nDKlQudVSivRjpt",
            widgetEmbedded: "_24n-ftZlG3wDvoWFR8zUnn"
        }
    },
    309: function(e, t, n) {
        "use strict";

        function o(e) {
            for (var t = 0; t < d.length; t++) {
                var n = d[t],
                    o = c.SCREEN_SIZES[n];
                "[object Array]" !== Object.prototype.toString.call(o) && (o = [o]);
                for (var i = 0; i < o.length; i++) {
                    e({
                        rule: o[i],
                        size: n
                    })
                }
            }
        }

        function i(e) {
            o(function(t) {
                var n = t.rule,
                    o = t.size;
                a.default.register((0, u.generateMediaQuery)(n), function() {
                    e.contentWindow.postMessage({
                        type: "sizeChange",
                        value: o
                    }, location.protocol + "//" + location.host)
                })
            })
        }

        function r() {
            o(function(e) {
                var t = e.rule;
                a.default.unregister((0, u.generateMediaQuery)(t))
            })
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.init = i, t.unregister = r;
        var s = n(310),
            a = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(s),
            c = n(137),
            u = n(207),
            d = ["lg", "md", "sm", "xs"]
    },
    310: function(e, t, n) {
        var o = n(311);
        e.exports = new o
    },
    311: function(e, t, n) {
        function o() {
            if (!window.matchMedia) throw new Error("matchMedia not present, legacy browsers require a polyfill");
            this.queries = {}, this.browserIsIncapable = !window.matchMedia("only all").matches
        }
        var i = n(312),
            r = n(208),
            s = r.each,
            a = r.isFunction,
            c = r.isArray;
        o.prototype = {
            constructor: o,
            register: function(e, t, n) {
                var o = this.queries,
                    r = n && this.browserIsIncapable;
                return o[e] || (o[e] = new i(e, r)), a(t) && (t = {
                    match: t
                }), c(t) || (t = [t]), s(t, function(t) {
                    a(t) && (t = {
                        match: t
                    }), o[e].addHandler(t)
                }), this
            },
            unregister: function(e, t) {
                var n = this.queries[e];
                return n && (t ? n.removeHandler(t) : (n.clear(), delete this.queries[e])), this
            }
        }, e.exports = o
    },
    312: function(e, t, n) {
        function o(e, t) {
            this.query = e, this.isUnconditional = t, this.handlers = [], this.mql = window.matchMedia(e);
            var n = this;
            this.listener = function(e) {
                n.mql = e.currentTarget || e, n.assess()
            }, this.mql.addListener(this.listener)
        }
        var i = n(313),
            r = n(208).each;
        o.prototype = {
            constuctor: o,
            addHandler: function(e) {
                var t = new i(e);
                this.handlers.push(t), this.matches() && t.on()
            },
            removeHandler: function(e) {
                var t = this.handlers;
                r(t, function(n, o) {
                    if (n.equals(e)) return n.destroy(), !t.splice(o, 1)
                })
            },
            matches: function() {
                return this.mql.matches || this.isUnconditional
            },
            clear: function() {
                r(this.handlers, function(e) {
                    e.destroy()
                }), this.mql.removeListener(this.listener), this.handlers.length = 0
            },
            assess: function() {
                var e = this.matches() ? "on" : "off";
                r(this.handlers, function(t) {
                    t[e]()
                })
            }
        }, e.exports = o
    },
    313: function(e, t) {
        function n(e) {
            this.options = e, !e.deferSetup && this.setup()
        }
        n.prototype = {
            constructor: n,
            setup: function() {
                this.options.setup && this.options.setup(), this.initialised = !0
            },
            on: function() {
                !this.initialised && this.setup(), this.options.match && this.options.match()
            },
            off: function() {
                this.options.unmatch && this.options.unmatch()
            },
            destroy: function() {
                this.options.destroy ? this.options.destroy() : this.off()
            },
            equals: function(e) {
                return this.options === e || this.options.match === e
            }
        }, e.exports = n
    }
});
//# sourceMappingURL=smooch.4.17.2.min.js.map