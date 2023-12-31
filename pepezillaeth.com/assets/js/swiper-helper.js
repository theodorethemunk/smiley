{
    const e = "undefined" != typeof jQuery ? jQuery : null,
        t = window.Swiper,
        n = {
            boolean: {
                test: e => "true" === e || "false" === e,
                convert: e => "false" !== e,
                items: ["centeredSlides", "pagination-clickable", "observer", "observeParents", "freeMode", "watchSlidesVisibility", "watchSlidesProgress", "loop", "centeredSlidesBounds", "autoplay-disableOnInteraction", "autoHeight", "fraction-zeros", "cssMode", "fadeEffect-crossFade", "mousewheel", "allowTouchMove", "grabCursor", "freeModeMomentum"]
            },
            number: {
                test: e => !isNaN(parseFloat(e)),
                convert: e => parseFloat(e),
                items: ["spaceBetween", "autoplay-delay", "initialSlide", "slidesPerView", "speed", "touchRatio"]
            },
            string: {
                test: () => !0,
                convert: e => e,
                items: []
            }
        },
        a = {
            items: "slidesPerView",
            sets: "slidesPerGroup",
            center: "centeredSlides",
            "center-bounds": "centeredSlidesBounds",
            gap: "spaceBetween",
            next: "navigation-nextEl",
            prev: "navigation-prevEl",
            "disable-class": "navigation-disabledClass",
            active: "initialSlide",
            connect: "thumbs-connect",
            offset: "slidesOffsetAfter",
            dots: "pagination-el",
            "dots-type": "pagination-type",
            "dots-click": "pagination-clickable",
            "auto-height": "autoHeight",
            autoplay: "autoplay-delay",
            "autoplay-int": "autoplay-disableOnInteraction",
            fade: "fadeEffect-crossFade",
            free: "freeMode",
            "free-momentum": "freeModeMomentum",
            "grab-cursor": "grabCursor"
        },
        s = "\n        gap: 48;\n        next: .swiper-next;\n        prev: .swiper-prev;\n        disable-class: uk-opacity-40;\n        dots: .swiper-dotnav;\n        dots-click: true;\n        fraction-zeros: true;\n        observer: true;\n        observeParents: true;\n        watchSlidesVisibility: true;\n        watchSlidesProgress: true;\n    ",
        i = (t, i, o = !1) => {
            const r = {};
            ((o ? s + ";" : "") + t).split(";").filter((e => e.trim())).map((e => e.split(":").map((e => e.trim())))).forEach((([e, t]) => {
                a[e] && (e = a[e]);
                e: for (const a in n)
                    if (n[a].items.includes(e) && (!n[a].test || n[a].test(t))) {
                        t = n[a].convert(t);
                        break e
                    }
                const s = e.split("-");
                let i = r;
                s.forEach(((e, n) => {
                    n < s.length - 1 ? (i[e] = i[e] || {}, i = i[e]) : i[e] = t
                }))
            })); {
                let e = i.closest(r.parent || ".swiper-parent");
                e || (e = i), r.navigation && "object" == typeof r.navigation && (r.navigation.nextEl && "string" == typeof r.navigation.nextEl && (r.navigation.nextEl = [...e.querySelectorAll(r.navigation.nextEl)]), r.navigation.prevEl && "string" == typeof r.navigation.prevEl && (r.navigation.prevEl = [...e.querySelectorAll(r.navigation.prevEl)])), r.pagination && "object" == typeof r.pagination && r.pagination.el && "string" == typeof r.pagination.el && (r.pagination.el = [...e.querySelectorAll(r.pagination.el)]), r.thumbs && r.thumbs.connect && "string" == typeof r.thumbs.connect && (r.thumbs.connect = [...e.querySelectorAll(r.thumbs.connect)]), r.progress && r.progress.bar && "string" == typeof r.progress.bar && (r.progress.bar = [...e.querySelectorAll(r.progress.bar)]), delete r.parent
            }
            if (r.progress && r.progress.bar) {
                const t = e(r.progress.bar);
                delete r.progress, r.on = {
                    init() {
                        t.removeClass("animate"), t.removeClass("active"), t.eq(0).addClass("animate"), t.eq(0).addClass("active")
                    },
                    slideChangeTransitionStart() {
                        t.removeClass("animate"), t.removeClass("active"), t.eq(0).addClass("active")
                    },
                    slideChangeTransitionEnd() {
                        t.eq(0).addClass("animate")
                    }
                }
            }
            if (r.fraction && r.fraction.zeros && r.pagination) {
                const e = 2,
                    t = "0";
                delete r.fraction, Object.assign(r.pagination, {
                    formatFractionCurrent: n => String(n).padStart(e, t),
                    formatFractionTotal: n => String(n).padStart(e, t)
                })
            }
            return r
        },
        o = {
            xs: 480,
            s: 640,
            m: 960,
            l: 1200,
            xl: 1600
        },
        r = (e, n = "data-swiper") => {
            let a = {};
            try {
                a = i(e.getAttribute(n), e, !0);
                for (const t in o) {
                    const n = e.getAttribute("data-swiper-" + t);
                    if (n) {
                        a.breakpoints = a.breakpoints || {};
                        const s = o[t];
                        a.breakpoints[s] = i(n, e)
                    }
                }
            } catch (e) {
                console.warn(e)
            }
            a.on || (a.on = {}), a.on.init = function(e) {
                e.$el.addClass("swiper-initialized")
            };
            const s = () => {
                const n = new t(e, a);
                n.update(), document.addEventListener("DOMContentLoaded", (() => n.update()), {
                    once: !0
                }), window.addEventListener("load", (() => n.update()), {
                    once: !0
                })
            };
            if (a.thumbs && a.thumbs.connect) {
                const e = a.thumbs.connect;
                delete a.thumbs.connect, setTimeout((() => {
                    const t = e[0];
                    t && a.thumbs ? (a.thumbs.swiper = t.swiper, a.thumbs.swiper ? s() : console.warn(`thumbs connect with selector "${e}" not setup!`)) : console.warn(`thumbs connect with selector "${e}" not exist!`)
                }))
            } else s()
        },
        l = e => {
            r(e, "data-swiper")
        };
    document.addEventListener("DOMContentLoaded", (() => {
        dataAttrHelpers.watchDataAttr("data-swiper", l)
    })), Object.assign(window, {
        initSwiper: r
    })
}