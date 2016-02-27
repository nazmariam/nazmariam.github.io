var commonModel = function(){
    var self = this;

    self.postQuery = function (url, data, handler, errorHandler) {
        data = data || {};
        data.shopId = data.shopId || self.shopId;
        data.goodShopId = data.goodShopId || self.goodShopId;

        $.ajax({
            type : 'POST',
            url : url,
            data : data,
            dataType : 'json',
            success : handler,
            error : errorHandler ? errorHandler : function(xhr, type){
                self.showErrorMessage && self.showErrorMessage(_('Приносим свои извинения. Повторите попытку позже.'));
            }
        });
    };

    self.getQuery = function (url, data, handler) {
        data = data || {};
        data.shopId = data.shopId || self.shopId;
        data.goodShopId = data.goodShopId || self.goodShopId;

        $.ajax({
            type : 'GET',
            url : url,
            data : data,
            dataType : 'json',
            success: handler,
            error : function(xhr, type){
                self.showErrorMessage && self.showErrorMessage(_('Приносим свои извинения. Повторите попытку позже.'));
            }
        });
    };

    self.loadFromCache = function (key) {
        return amplify.store(key + '_' + self.shopId + '_' + self.goodShopId);
    };

    self.saveToCache = function (key, value, ttl) {
        amplify.store(key + '_' + self.shopId + '_' + self.goodShopId, value, {expires: ttl});
    };

    self.clearCache = function (key) {
        amplify.store(key + '_' + self.shopId + '_' + self.goodShopId, null);
    };

    self.formatDate = function (timestamp) {
        var supFormat = function (str) {
            return str.toString().length == 1 ? ('0' + str) : str;
        };
        return moment(new Date(-(-(timestamp + '000')))).format('lll');
    };

    self.truncate = function(str, length) {
        var etc = '...';
        str = String(str);
        if (typeof length == undefined) {
            length = 80;
        }
        if (length == 0) {
            return '';
        }

        if (str.length <= length) {
            return str;
        }
        length -= Math.min(length, etc.length);
        str = str.substr(0, length+1);
        str = str.replace(/\s+?(\S+)?$/, '');
        return str.substr(0, length) + etc;
    };

    return self;
};

commonModel.prototype.shopId = 0;
commonModel.prototype.goodShopId = 0;
