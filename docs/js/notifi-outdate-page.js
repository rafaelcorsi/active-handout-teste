{
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/lastModified#notes
    var
    nCurrentId = Date.parse(document.lastModified);
    nRemoteId = 0;

    function getlastmod(url, cb) {
        var req = new XMLHttpRequest();
        // by-pass cache
        req.open("GET", url + ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime());
        req.send(null);
        req.addEventListener("load", function() {
            cb(req.getResponseHeader("Last-Modified"));
        }, false);
    }

    function checkChange() {
        getlastmod(window.location.href, function(v) {
            nRemoteId = Date.parse(v);
        });

        if (isNaN(nRemoteId) || nRemoteId > nCurrentId) {
            const text = window.ihandout_config["notifi-outdate-page"]["text"];
            notification.toast(text, {color: "important",
                                      href: window.location.href });
        }
      }

    window.setInterval(checkChange, 100);

  }
