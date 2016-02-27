(function (w, d, n) {
    var ad;
    var customParams = '';
    var url = '';
    while (ad = w[n].pop()) {
        if (customParams != '') {
            customParams += '|';
        }
        customParams += ad.id;
        url = ad.url;
    }
    var rnt_aud_params = '';
    if (!(typeof w['rnt_aud_params'] == 'undefined') && w['rnt_aud_params'].length > 0) {
        rnt_aud_params = '&rnt_aud_params=';
        for (var i = 0; i < w['rnt_aud_params'].length; i++) {
            if (i > 0) {
                rnt_aud_params += '__';
            }
            rnt_aud_params += w['rnt_aud_params'][i].key + '--' + w['rnt_aud_params'][i].val;
        }
    }
    if (url != '') {
        var img = document.createElement('img');
        img.src = url + 'cp.axd?aud=' + customParams + rnt_aud_params + '&ref=' + encodeURIComponent(d.referrer);
        img.width = '1';
        img.height = '1';
        img.style.display = 'none';
        d.body.appendChild(img);
    }
})(this, this.document, "rontar_aud");