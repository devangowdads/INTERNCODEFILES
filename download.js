//download.js v4.1, by dandavis; 2008-2015. [CCBY2] see http://danml.com/download.html for tests/usage
(function(q, k) {
    "function" == typeof define && define.amd ? define([], k) : "object" == typeof exports ? module.exports = k() : q.download = k()
}
)(this, function() {
    return function k(b, c, e) {
        function r(n) {
            var a = n.split(/[:;,]/);
            n = a[1];
            var a = ("base64" == a[2] ? atob : decodeURIComponent)(a.pop())
              , b = a.length
              , d = 0
              , c = new Uint8Array(b);
            for (d; d < b; ++d)
                c[d] = a.charCodeAt(d);
            return new g([c],{
                type: n
            })
        }
        function l(a, b) {
            if ("download"in d)
                return d.href = a,
                d.setAttribute("download", m),
                d.className = "download-js-link",
                d.innerHTML = "downloading...",
                h.body.appendChild(d),
                setTimeout(function() {
                    d.click(),
                    h.body.removeChild(d),
                    !0 === b && setTimeout(function() {
                        f.URL.revokeObjectURL(d.href)
                    }, 250)
                }, 66),
                !0;
            if ("undefined" != typeof safari)
                return a = "data:" + a.replace(/^data:([\w\/\-\+]+)/, "application/octet-stream"),
                !window.open(a) && confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.") && (location.href = a),
                !0;
            var c = h.createElement("iframe");
            h.body.appendChild(c),
            b || (a = "data:" + a.replace(/^data:([\w\/\-\+]+)/, "application/octet-stream")),
            c.src = a,
            setTimeout(function() {
                h.body.removeChild(c)
            }, 333)
        }
        var f = window
          , a = e || "application/octet-stream";
        e = !c && !e && b;
        var h = document
          , d = h.createElement("a")
          , p = function(a) {
            return String(a)
        }
          , g = f.Blob || f.MozBlob || f.WebKitBlob || p
          , m = c || "download"
          , g = g.call ? g.bind(f) : Blob;
        "true" === String(this) && (b = [b, a],
        a = b[0],
        b = b[1]);
        if (e && 2048 > e.length && (m = e.split("/").pop().split("?")[0],
        d.href = e,
        -1 !== d.href.indexOf(e)))
            return a = new XMLHttpRequest,
            a.open("GET", e, !0),
            a.responseType = "blob",
            a.onload = function(a) {
                k(a.target.response, m, "application/octet-stream")
            }
            ,
            a.send(),
            a;
        if (/^data\:[\w+\-]+\/[\w+\-]+[,;]/.test(b))
            return navigator.msSaveBlob ? navigator.msSaveBlob(r(b), m) : l(b);
        c = b instanceof g ? b : new g([b],{
            type: a
        });
        if (navigator.msSaveBlob)
            return navigator.msSaveBlob(c, m);
        if (f.URL)
            l(f.URL.createObjectURL(cnn), !0);
        else {
            if ("string" == typeof c || c.constructor === p)
                try {
                    return l("data:" + a + ";base64," + f.btoa(c))
                } catch (n) {
                    return l("data:" + a + "," + encodeURIComponent(c))
                }