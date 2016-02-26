// To distinguish touch devices
if (!("ontouchstart" in document.documentElement)) {
    document.documentElement.className += " no-touch";
}
// Avoid `console` errors in browsers that lack a console.
(function () {
    var method,
        noop = function () {
        },
        methods = [
            'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
            'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
            'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
            'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
        ],
        length = methods.length,
        console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

var PAMPIK = new CoreApplication(dataLayer[0]),

    validationModule = {

        init: function (elem) {

            var module = this;

            elem
                .keyup(function () {
                    var me = $(this),
                        size = me.data('size');

                    if (me.data('type') != 'number') {
                        if (me.attr("type") != "email") {
                            if (me.val().length >= size) {
                                if (me.data('symbol') == "" || typeof  me.data('symbol') == "undefined") {
                                    module.correct(me);
                                } else {
                                    module.isValid(me, (me.val().indexOf('@') > -1));
                                }
                            } else { // if (me.val().length >= size) {
                                if (me.attr("required") == "required") {
                                    module.error(me);
                                }
                                me.removeClass("correct");
                            }
                        } else { // if (me.attr("type") != "email") {
                            if (me.val().length != "0") {
                                module.isValid(me, module.isValidEmail(me.val()));
                            } else {
                                module.normal(me);
                            }
                        }
                    } else { // if (me.data('type') != 'number') {
                        module.isValid(me, module.isValidPhone(me.val()));
                    }

                })
                .focus(function () {
                    var me = $(this),
                        size = me.data('size');

                    if (me.data('type') != "number") {
                        if (me.attr("type") != "email") {
                            if (me.val().length >= size) {
                                if (me.data('symbol') == "" || typeof  me.data('symbol') == "undefined") {
                                    module.correct(me);
                                } else {
                                    module.isValid(me, (me.val().indexOf('@') > -1));
                                }
                            } else { // if (me.val().length >= size) {
                                if (me.attr("required") == "required") {
                                    // myself.error(me);
                                }
                                me.removeClass("correct");
                            }
                        } else { // if (me.attr("type") != "email") {
                            if (module.isValidEmail(me.val()) && me.val().length != "0") {
                                module.correct(me);
                            }
                            else {
                                me.removeClass("correct");
                            }
                        }

                    }

                })
                .focusout(function () {
                    var me = $(this);

                    if (me.data('type') == "number") {
                        module.isValid(me, module.isValidPhone(me.val()));
                    }

                    else {
                        if (me.data('type') == "text" && me.val().length > 0) {
                            module.correct(me);
                        }


                    }
                })
                .change(function () {
                    var me = $(this);

                    if (me.data('type') == "text" && me.val().length > 0) {
                        module.correct(me);
                    }
                })

        },
        correct: function (elem) {
            elem.removeClass('error').addClass('correct');
            return elem;
        },
        error: function (elem) {
            elem.removeClass('correct').addClass('error');
            return elem;
        },
        normal: function (elem) {
            elem.removeClass('correct').removeClass('error');
            return elem;
        },
        isValid: function (elem, test) {
            if (test) {
                this.correct(elem);
            } else {
                this.error(elem);
            }
        },
        numbersOnly: function numbersOnly(str) {
            //return str.replace(/\s/g, "").replace(/[-_—]+/g, "").replace(/[+]+/g, "").replace(/[(]+/g, "").replace(/[)]+/g, "");
            return str.replace(/[^0-9.]/g, '');
        },
        removeWhitespaces: function removeWhitespaces(str) {
            return str.replace(/\s/g, '');
        },
        isValidEmail: function validateEmail(email) {
            /*
             var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
             return emailReg.test(email);
             */
            return this.regexCheck(email, this.isEmailRegEx);
        },
        isValidPhone: function validatePhone(phone) {
            // return ( this.numbersOnly(phone).length == 9 ) ;
            return ( this.regexCheck(phone, this.isPhoneMaskedRegEx) ) || ( this.regexCheck(this.numbersOnly(phone), this.isPhoneUnmaskedRegEx) );
        },
        regexCheck: function regexCheck(value, re) {
            return String(value).search(re) != -1;
        },
        isEmailRegEx: /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/,
        isPhoneMaskedRegEx: /[0-9]{2} [0-9]{3} [0-9]{2} [0-9]{2}/,
        isPhoneUnmaskedRegEx: /[0-9]{9}/
    },

// S: form controls helper class
    pseudoFormControlsModule = {
        ns: '.pseudoFormControls',
        init: function () {

            var module = this,
                d = $(document);

            d.on('click' + module.ns, '.radio-pseudo-radio', function () {
                var me = $(this),
                    checkedClass = 'radio-pseudo-radio-checked';
                if (me.hasClass('radio-pseudo-disabled')) {
                    // do nothing
                } else {
                    var input = $("#" + me.data('id'));

                    $('.' + checkedClass).each(function (i, elem) {
                        $(elem).removeClass(checkedClass);
                        $('#' + $(elem).data('id')).prop('checked', false);
                    });

                    me.addClass(checkedClass);
                    input.prop('checked', true);

                }
            });

            d.on('click' + module.ns, ".checkbox-pseudo-checkbox", function () {
                var me = $(this),
                    checkedClass = 'checkbox-pseudo-checkbox-checked';
                if (me.hasClass('checkbox-pseudo-disabled')) {
                    // do nothing
                } else {
                    var target = me.parent().find('a:first').attr('href'),
                        id = me.data('id'),
                        input = $("#" + id),
                        dataValue = input.data('value'),
                        value = input.val();

                    if (target != undefined && target != 'javascript:void(0)') {
                        location.href = target;
                    } else {
                        if (me.hasClass('checkbox-cart-time')) {
                            var c = 0;
                            $('.checkbox-time').find('.checkbox-date > input').each(function (index, element) {
                                if ($(element).val() != '0') {
                                    c++;
                                }
                            });

                            if (c > 1 || value == '0') {
                                me.toggleClass(checkedClass);
                                input.val((me.hasClass(checkedClass)) ? dataValue : '0');
                            }
                        } else {
                            me.toggleClass(checkedClass);
                            input.val((me.hasClass(checkedClass)) ? dataValue : '0');
                        }
                    }
                }
            });
        }
    };
// E: form controls helper class

// S: main application object
function CoreApplication(dataLayer) {
    var app = this,
        eventObject = $('body'),
        beforePageReady = $.Deferred(), afterPageReady = $.Deferred(),
        modules = [];

    app.version = '1.0.0';
    app.pageType = 'Home';

    // extend App with dataLayer
    $.extend(app, dataLayer);

    function CoreModule(name, controller) {
        var module = this;

        module.name = 'CoreModule: ' + name.charAt(0).toUpperCase() + name.substring(1);
        module.version = '1.0.0';
        module.controller = controller;
        module.ns = '.' + name;

        console.info('construct ' + module.name);

        module.ajax = function (action, data, callback, options) {

            if (data instanceof Array) {
                data.push({name: module.csrfTokenName, value: module.csrfToken});
            } else if (typeof data === 'string') {
                data += '&' + module.csrfTokenName + '=' + module.csrfToken;
            } else {
                data[module.csrfTokenName] = module.csrfToken;
            }

            options = $.extend({
                type: 'POST',
                url: ( (module.controller) ? '/' + module.controller : location.href ) + ( (action) ? '/' + action : '' ),
                cache: false,
                data: data,
                dataType: 'json',
                success: callback,
                error: function (jqXHR, textStatus, errorThrown) {
                    var msg =
                        'Module: ' + module.name + ' ' + module.version + '\n' +
                            'Contoller: ' + module.controller + '\n' +
                            'Action: ' + action + '\n' +
                            'Status: ' + textStatus + '\n' +
                            'Error thrown: ' + errorThrown + '\n' +
                            'Error details: ' + jqXHR.status + ' ' + jqXHR.statusText + '\n' +
                            'Error description: ' + jqXHR.responseText;
                    // TODO add logging
                    console.error(msg);
                    // When an HTTP error occurs, errorThrown receives the textual portion of the HTTP status, such as "Not Found" or "Internal Server Error."
                    // Possible values for the second argument (besides null) are "timeout", "error", "abort", and "parsererror"
                    // При отправке запроса произошла ошибка.<br />Проверьте правильность введенных данных и повторите попытку.<br />Если данная ошибка будет повторяться – свяжитесь с нами по телефону или напишите на <a href=\"mailto:customercare@pampik.com\">customercare@pampik.com</a>
                }
            }, options);

            return $.ajax(options);
        };
    }

    function CartModule() {
        var module = this,
            isCatalog = ($('#cartModal').length > 0);

        module.name = 'CartModule';
        module.version = '1.0.0';

        /*
         * private function initCartEvents
         * */
        function initCartEvents(off) {
            var doc = $(document);


            if (off)
                doc.off(module.ns);

            // Checkout and Catalog events
            /*
             doc.on('click' + me.ns, '.item-del', function () {
             $('#modalAlert').attr("product-id", $(this).attr("product-id")).modal('show');
             });
             */


	        /**
	         *
	         * Данный участок кода вешает EventListener'ы на кнопки декремента на сайте, и в корзине
	         *
	         */
            doc.on('click' + module.ns, '.item-del, .item-minus, .minus-product-bt', function () {
                var product_id = $(this).attr('product-id'),
                    qty = parseInt($('#item-qty' + product_id).html()) - 1;
                // TODO us global cart object instead of UI
                if ((qty == 0) || ($(this).hasClass('item-del'))) {
                    $('#modalAlert').attr("product-id", product_id).modal('show');

                } else {
                    updateProductInCart(product_id, '-1', function (d) {
                        afterUpdateProductInCart(isCatalog, product_id, d,  '-1');
                    });
                }
            });

            /*
             doc.on('click' + me.ns, '.item-plus', function () {
             var product_id = $(this).attr('product-id'),
             qty = parseInt($('#item-qty'+product_id).html()) + 1,
             callback = function(d) {
             afterUpdateProductInCart(isCatalog, product_id, d);
             };
             updateProductInCart(product_id,qty,callback);
             });
             */

            // use JS to close this modal, since it may be raised above another one
            doc.on('click' + module.ns, '#closeAlertItemBtn, #closeAlertItem', function () {
                $("#modalAlert").modal('hide');
            });

            doc.on('click' + module.ns, '#deleteAlertItemBtn', function () {
                var modal = $("#modalAlert"),
                    product_id = modal.attr("product-id"),
                    product = modal;

                updateProductInCart(product_id, 0, function (d, product) {
                    modal.modal('hide');
                    if (isCatalog) {
                        afterUpdateProductInCart(isCatalog, product_id, d, 0);
                    } else {
                        // TODO use same classes and ids as @ catalog
                        $('#willTotalBonus').html( parseInt($('#willTotalBonus').html()) - Math.round(parseInt( $("#item-total"+product_id).html().replace(',','')))*parseInt(d.loyalty_points) );
                        $(".cart-item[product-id='" + product_id + "']").remove();
                        if (d.total_items < 1) {
                            // TODO refactor: id should be used instead of next()
                            $("#main-cart-form").hide().next().show();
                        }

                        $('#total-price').html( d.total_items );
                        updatePromocode();
                    }
                });
            });

            // Catalog only events
            /*
             doc.on('click' + me.ns,'.minus-product-bt',function () {
             var product_id =  $(this).attr("product-id"),
             callback = function(d) {
             afterUpdateProductInCart('catalog', product_id, d);
             };
             updateProductInCart(product_id,'-1',callback);
             });
             */


	        /**
	         *
	         * Этот участок кода вешает EventListener'ы на кнопки инкремента
	         *
	         */
            doc.on('click' + module.ns, '.plus-product-bt, .button-buy, .item-plus', function () {

                var product_id = $(this).attr("product-id");

                // do not animate when itum-plus clicked
                if (!$(this).hasClass('item-plus')) {
                    var origin = $("#product-image" + product_id),
                        img = origin.clone(),
                        target = $("#cartModalClick").offset();

                    $(".clone-image")
                        .html(" ")
                        .append(img)
                        .show()
                        .css(origin.offset())
                        .animate(
                        target,
                        800,
                        function () {
                            $(this).animate({top: target.top - 15, left: target.left - 15}, 300);
                            img.animate({width: 0}, 300, function () {
                                img.remove();
                            });
                        }
                    );
                }

                updateProductInCart(product_id, '+1', function (d) {
                    afterUpdateProductInCart(true, product_id, d, '+1');
                });
            });

        }

        /*
         * private function updateProductInCart
         * */
        function updateProductInCart(id, qty, callback) {
            var postData = {
                'id': id,
                'qty': qty,
                '_t': (new Date).getTime()
            };

            module.ajax('UpdateProductInCart', postData, callback);
        }

        /*
         * private function afterUpdateProductInCart
         * */
        function afterUpdateProductInCart(catalog, id, data, qty) {
            if (catalog) {
                $('#cart-header-box-quantity-total').text(data.count_items); // update header cart qty
                $('#cart-header-box-subtotal-price').text(data.total_items); // update header cart total
                $('#header-widget-order-number-id').text(data.cartId); // update header cart cart id
                $('#header-widget-order-text').text($('#header-widget-order-text').attr('data-you-order')); // update header cart default text
                var button_qty = $('#basket-product-qty' + id),
                    button = $('#button-buy-id' + id);
                if (data.product_count > 0) {
                    if (button_qty.length > 0) {
                        button_qty.html('<i></i>' + data.product_count); // update basket product qty
                    } else {
                        button
                            .removeClass('button-buy')
                            .addClass('button-buy-form')
                            .html('<a class="minus-product-bt" product-id="' + id + '">-</a><span id="basket-product-qty' + id + '" class="val"><i></i>' + data.product_count + '</span><a class="plus-product-bt" product-id="' + id + '" >+</a>');
                    }
                    if (data.product_line.length > 0) {
                        $("#cart-products").append(data.product_line);
                    } else {
                        afterUpdateProductInCart(false, id, data, qty);
                    }
                } else {
                    button
                        .removeClass('button-buy-form')
                        .addClass('button-buy')
                        .attr('product-id', id)
                        .html('<i></i>Купить');
                    $('#cart-product' + id).remove();
                }

	            if (data.count_items.replace(/\D+/gm, '') > 0) {
                    $("#cartModalClick").addClass("resize-modal").attr({'data-target': "#cartModal", 'data-toggle': "modal"});
                } else {
                    $('#cartModal').modal('hide');
                    $("#cartModalClick").removeClass("resize-modal").attr({'data-target': "", 'data-toggle': ""});
                }
            } else {
                updateBonus(data, id, qty);
                updatePromocode();
            }

            $('#total-price').html(data.total_items); // update table total
        }

        // at construct
        initCartEvents();
    }
    function updateBonus (data, id, qty) {

        var thisProdOldPrice = $('#item-total' + id).html(); // update row subtotal
        var thisProdOldQty = $('#item-qty' + id).html(); // update row qty

        $('#item-total' + id).html(data.product_price); // update row subtotal
        $('#item-qty' + id).html(data.product_count); // update row qty

        if(qty === 0){
            bonus = -(thisProdOldPrice * thisProdOldQty);
        } else {
            bonus = data.loyalty_points / data.product_count * Math.round(parseInt(data.product_price.replace(',',''))) *(qty);
        }
        $('#willTotalBonus').attr('sub-value',(parseInt($('#willTotalBonus').html()) + parseInt(bonus)));
        $('#willTotalBonus').html(parseInt($('#willTotalBonus').attr('sub-value')).toFixed()); // update total Bonus
    }

    //после каждого изменения товаров в корзине мы перепроверяем валидность промокода
    //должно дергатся только на странице чекаута
    function updatePromocode () {
        var promoInput = $('#InputPromo');

        if(promoInput.length > 0){
            if(promoInput.val().length > 1){
                $('#addPromoCode').trigger('click');
            }
        }

    }

    // extend Core Module with csrf
    CoreModule.prototype.csrfTokenName = app.csrfTokenName;
    CoreModule.prototype.csrfToken = app.csrfToken;

    /*
     * public function getModule
     * */
    app.getModule = function (name, controller, constructor) {

        if (modules[name] === undefined) {
            if (constructor) {
                constructor.prototype = new CoreModule(name, controller);
                modules[name] = new constructor();
            } else {
                modules[name] = new CoreModule(name, controller);
            }
        }

        return modules[name];
    };

    app.onLoad = function () {
        app.trigger('beforePageLoad').off('beforePageLoad');

        console.warn('load');

        app.trigger('afterPageLoad').off('afterPageLoad');
    };

    app.onUnload = function () {
        app.trigger('beforePageUnload').off('beforePageUnload');

        console.warn('unload');

        app.trigger('afterPageUnload').off('afterPageUnload');
    };

    app.onReady = function () {
        beforePageReady.resolve();
        app.trigger('beforePageReady').off('beforePageReady');

        console.warn('ready');

        app.getModule('cart', 'cart/default', CartModule);

        // at construct
        UI.initSomePage();

        (UI['init' + app.pageType + 'Page']) && UI['init' + app.pageType + 'Page'].call(UI);

        afterPageReady.resolve();
        app.trigger('afterPageReady').off('afterPageReady');

    };

    app.beforePageReady = function (fn) {
        beforePageReady.promise().done(fn);
    };
    app.afterPageReady = function (fn) {
        afterPageReady.promise().done(fn);
    };
    app.on = function () {
        $.fn.on.apply(eventObject, arguments);
        return this;
    };
    app.off = function () {
        $.fn.off.apply(eventObject, arguments);
        return this;
    };
    app.trigger = function () {
        $.fn.trigger.apply(eventObject, arguments);
        return this;
    };

    app.loadScript = function (url, id, callback) {
        var e,
            d = document,
            s = d.getElementsByTagName("script")[0];

        if (d.getElementById(id)) return;
        e = d.createElement("script");
        e.async = 1;
        // e.src = ("https:" == ;.location.protocol ? "https" : "http")+url;
        e.src = url;
        if (id) e.id = id;

        if (callback) {
            e.onload = e.onreadystatechange = function () {
                if (!e.readyState || e.readyState == "loaded" || e.readyState == "complete") {
                    if (!e.executed) {
                        e.executed = true;
                        setTimeout(callback, 0);
                    }
                }
            };
        }
        s.parentNode.insertBefore(e, s);

        return this;
    };

    // extend jQuery
    $.fn.maskPhone = function (mask) {
        mask = mask || '99 999 99 99';
        $(this)
            .mask(mask, {completed: function () {
                $(this).addClass("correct").removeClass("error");
            }})
            .attr('placeholder', mask.replace(/9/g, '_'));

    };

    var UI = {

        // S: Page specific inits
        initSomePage: function () {
            console.info('initSomePage');

            UI
                .initMainMenuWidget()
                .initMainSearchWidget()
                .initPhoneWidget()
                //.initChatButtonsWidget()
                .initSubscribeWidget()
                .initGoTopButton($("#topBtnClick"), $(".top-tab-main"))
                .initFormPlaceholder($('input,textarea'))
                .initTooltips()
                .initValidation($("input, textarea"))
                .initProductBadges()
                .moveSecondaryContent();

            return this;
        },

        initErrorPage: function () {
            console.info('init Error');
            UI
                //.initProductBadges()
                .initTabScroll();

            return this;
        },

        initHomePage: function () {
            console.info('init Home');
            UI
                .initMainSliderWidget()
                .initErrorPage();
        },

        initCategoryPage: function () {
            console.info('init Category');
            UI
                .initFilterScroll($('.row-cat-select'))
                .initFilterHelper($('.tab-info-close'))
                .initPriceFilterSliderRange($('#slider-range'))
                .initFormPseudoControls()
                //.initProductBadges()
                .initSortPopup()
                .initInfiniteScrollWidget($('.paginator'));

            return this;
        },

        initBrandPage: function () {
            console.info('init Brand');
            UI
                .initBrandList()
                .initCategoryPage()
                .initJohnsonPromo();
        },

        initSearchPage: function () {
            console.info('init Search');
            UI
                .initCategoryPage()
                .initTabScroll();
        },

        initProductPage: function () {
            console.info('init Product');
            UI
                .initProductPhoto()
                .initTabScroll()
                .initProductReviewsWidgetCustomise();
        },

        initCheckoutPage: function () {
            console.info('init Checkout');
            UI.initFormPseudoControls();
        },

        initThankYouPage: function () {
            console.info('init ThankYou');
        },

        initBagPage: function () {
            console.info('init Bag');
        },

        initNewsPage: function () {
            console.info('init News');
            if ($('.article-list').length > 0) {
                UI
                    .initFilterScroll($('.row-cat-select'))
                    .initFormPseudoControls()
                    .initInfiniteScrollWidget($('.paginator'));
            } else {
                UI.initPromoCountdown($('.promo-countdown'));
                // single article page
                app.on('afterPageLoad', function () {
                    UI.initSocialLikeWidget();
                });
            }
            return this;
        },

        initArticlePage: function () {
            console.info('init Article');
            var article = $('.row-content-article');
            if (article.length > 0) {
                app.on('afterPageLoad', function () {
                    UI.initArticleProductLookup(article);
                });
            }
            UI.initNewsPage();
        },

        initPagePage: function () {
            console.info('init Page');
        },
        // E: Page specific inits

        // S: page parts

        // s: GoToTop button & sticky header
        initGoTopButton: function (btn, header) {
            var elems = arguments;

            btn.click(function () {
                $("html, body").animate({scrollTop: 0}, '1000', 'swing', function () {
                    btn.stop().animate({opacity: 0}, 500);
                });
            });

            $(window).scroll(function () {
                var me = $(this);

                if (me.scrollTop() >= 500) {
                    $.each(elems, function (i, elem) {
                        if (elem.css("opacity") <= 0) {
                            elem.show().stop().animate({opacity: 1}, 500);
                        }
                    });
                } else if (me.scrollTop() <= 200) {
                    $.each(elems, function (i, elem) {
                        elem.stop().animate({opacity: 0}, 500, function () {
                            elem.hide();
                        });
                    });
                }
            });

            return this;
        },
        // e: GoToTop button & stocky header

        // s: init scroll for filters in category
        initFilterScroll: function (elem) {

            if (elem.length !== 0) {
                elem.mCustomScrollbar({
                    verticalScroll: true,
                    scrollButtons: {
                        enable: true
                    }
                });
            }

            return this;
        },
        // e: init scroll for filters in category

        // s: close filter helper
        initFilterHelper: function (elem) {
            elem.find('.close').click(function () {
                elem.remove();
            });
            return this;
        },
        // e: close filter helper

        // s: init price filter
        initPriceFilterSliderRange: function (elem) {

            if (elem.length !== 0) {
                var fromElem = $('#fromPrice'),
                    toElem = $('#toPrice'),
                    minStar = parseInt(fromElem.attr('min-start-value')),
                    maxStar = parseInt(toElem.attr('max-start-value')),
                    min = fromElem.attr('min-current-value'),
                    max = toElem.attr('max-current-value');

                elem.slider({
                    range: true,
                    min: minStar,
                    max: maxStar,
                    values: [ min, max ],
                    slide: function (event, ui) {
                        fromElem.val(ui.values[ 0 ] + " грн.");
                        toElem.val(ui.values[ 1 ] + " грн.");
                    },
                    change: function (event, ui) {
                        $(".submit-to-click").addClass("hidden-for-click");
                        $("[data-choose='price-to']").removeClass("hidden-for-click");
                        fromElem.attr('current-price-value', elem.slider("values", 0));
                        toElem.attr('current-price-value', elem.slider("values", 1));
                    }
                });

                fromElem.val(elem.slider("values", 0) + " грн.");
                toElem.val(elem.slider("values", 1) + " грн.");

                $('#submit-price-to-click').click(function () {
                    var fromPrice = parseInt($("#fromPrice").attr('current-price-value')),
                        toPrice = parseInt($("#toPrice").attr('current-price-value'));
                    location.href = elem.attr('filter-base-url') + '/p/' + fromPrice + '-' + toPrice;
                });
            }

            return this;
        },
        // e: init price filter

        initFormPlaceholder: function (elem) {
            var attr = 'placeholder',
                txt = 'place-holder-text';
            elem
                .focusin(function () {
                    $(this).data(txt, $(this).attr(attr)).attr(attr, '');
                })
                .focusout(function () {
                    $(this).attr(attr, $(this).data(txt));
                });
            return this;
        },

        initMainSliderWidget: function () {
            if ($('.bxslider').length > 0) {

                var sliding = true,
                    defaultTimeout = 6000,
                    last_change = new Date().getTime();

                $('.bxslider a').click(function (event) {
                    event.stopPropagation(); // important prevents bootstrap from firing extra events
                    var li = $(this).parent();
                    ga('send', 'event', 'Internal', 'Main-Slider', 's' + li.data('slide') + '-' + li.data('label'));
                    return true;
                });

                $(".bx-ct-slide .orange-button").click(function (e) {
                    e.stopPropagation();
                    sliding = false;
                    location.href = $(this).parent().parent().attr('href');
                });

                $(".bx-wrapper .arrows-slider-row").on("click", ".top-arrow, .bottom-arrow", function (e) {
                    if ($(e.target).hasClass('top-arrow')) {
                        clickSliderImg_bottom();
                    } else {
                        clickSliderImg_top();
                    }
                });

                $(".bx-ct-slide li").click(function () {
                    var slide = $(this),
                        container = $('.bx-ct-slide'),
                        adj;

                    $('.bx-ct-slide ul li').removeClass("active");
                    slide.addClass('active');
                    adj = container.offset().top - slide.offset().top;
                    if (adj > 0) {
                        slide.parent().stop().animate({marginTop: 0}, 100);
                    } else {
                        adj += container.outerHeight() - slide.outerHeight();
                        if (adj < 0) {
                            slide.parent().stop().animate({marginTop: adj}, 100);
                        }
                    }
                    changeSlide(slide.data("slide"));
                });

                function clickSliderImg_bottom() {
                    //sync slides
                    changeSlide($('.bx-ct-slide ul li:first-of-type').data('slide'));

                    $.each(['bxslider', 'bx-ct-slide ul'], function (i) {
                        var that = this,
                            elem = $('.' + that);
                        elem.children(':last').prependTo(elem);
                        activateSlide('.' + that + ' li');
                        elem.stop().css({marginTop: (-213 * (1 - i) - 80 * i)}).animate({marginTop: "0"}, 500);
                    });

                }

                function clickSliderImg_top() {
                    //sync slides
                    changeSlide($('.bx-ct-slide ul li:first-of-type').data('slide'));

                    $.each(['bxslider', 'bx-ct-slide ul'], function (i) {
                        var that = this,
                            elem = $('.' + that);
                        elem.stop().animate({marginTop: (-213 * (1 - i) - 80 * i) }, 500,
                            function () {
                                elem.css({marginTop: 0}).children(':first').appendTo(elem);
                                activateSlide('.' + that + ' li');
                            });
                    });
                }

                function activateSlide(selector) {
                    $(selector).removeClass("active").first().addClass("active");
                    last_change = new Date().getTime();
                }

                function changeSlide(slideId) {
                    sliding = false;

                    var activeSlide = $(".bxslider li:first-of-type");

                    if (slideId != parseInt(activeSlide.attr("data-slide"))) {
                        activeSlide.appendTo('.bxslider');
                        changeSlide(slideId);
                    } else {
                        activateSlide('.bxslider li');
                        sliding = true;
                    }
                }

                (function caruselInterval(timeout) {
                    setTimeout(function () {
                        var adj = (new Date().getTime() - last_change);

                        if (adj < defaultTimeout) {
                            // less than 6 sec passed from last update
                            timeout = Math.max(0, defaultTimeout - adj);
                        } else {
                            // 6+ seconds passed from last update
                            if (sliding) {
                                clickSliderImg_top();
                            }
                            timeout = defaultTimeout;
                        }
                        caruselInterval(timeout);
                    }, timeout);
                })(defaultTimeout);
            }

            return this;
        },

        initMainMenuWidget: function () {
            /* S: For widget MainMenuWidget   */

            $('.menu-ico').click(function (e) {
                e.stopPropagation();

                UI.hideCallback();

                if (!$(this).parent("div").parent("li").hasClass("active")) {
                    UI.hideMainMenu();

                    $(this).parent("div").parent("li").addClass("active");

                    var menu = $(this).parent("div").find(".header-menu-click"),
                        before = $('.before', menu);

                    if (before.size() == 0)
                        before = $('<div />').addClass('before').prependTo(menu);

                    menu.show();

                    // ruslan
                    // var li=$('.header-menu > div > ul > li:last'),
                    var li = $('.header-menu > div > ul > li:nth-last-of-type(2)'),
                        maxRight = Math.round(li.offset().left + li.outerWidth()),
                        oLeft = Math.round(menu.offset().left) + 3,
                        menuWidth = Math.round(menu.outerWidth());

                    if (oLeft + menuWidth > maxRight) {
                        var left = (maxRight - oLeft - menuWidth);
                        menu.css('left', left + 'px');
                        before.css('left', -left + (li.outerWidth() / 2) - 5 + 'px');
                    }
                } else {
                    UI.hideMainMenu();
                }

                UI.popupHandler('.header-menu', function () {
                    UI.hideMainMenu();
                });

            });

            // lazy load brand logos
            app.on('afterPageLoad', function () {
                $('.brand-link').each(function () {
                    var a = $(this);
                    a.append($('<img>').attr({
                        'src': a.data('img'),
                        //'alt': a.text(),
                        'title': a.text()
                    }));
                });
            });
            /* E: For widget MainMenuWidget   */

            return this;
        },

        initMainSearchWidget: function () {

            var searchModule = app.getModule('search', 'search/default');

            $(".button-search").click(function (e) {
                e.stopPropagation();
                var form = $(this).parents('form'),
                    query = form.find('input[name=q]');
                if (query.val() != '') {
                    form.submit();
                } else {
                    query.focus();
                }
                return false;
            });

            $('#mainSearch,#searchTab').each(function () {
                $(this).attr('title', $(this).val())
                    .focus(function () {
                        if ($(this).val() == $(this).attr('title')) {
                            $(this).val('');
                        }
                    }).blur(function () {
                        if ($(this).val() == '' || $(this).val() == ' ') {
                            $(this).val($(this).attr('title'));
                        }
                    });
            });

            $.widget('search.autocomplete', $.ui.autocomplete, {
                _renderItem: function (ul, item) {
                    var tmp = $(item.value);
                    if (tmp.hasClass('all-result')) {
                        return $('<li>').addClass('all-result').append(tmp).appendTo(ul);
                    } else {
                        return $('<li>').append(tmp).appendTo(ul);
                    }

                },
                _resizeMenu: function () {
                    if (this.element.attr('id') == 'searchTab')
                        this.menu.element.outerWidth(490);
                }
            });

            $("#mainSearch,#searchTab").autocomplete({
                source: function (request, response) {
                    searchModule.ajax('search', {
                        'q': request.term,
                        'autocomplete': 1
                    }, response);
                },
                /* autoFocus: true, */
                delay: 500,
                minLength: 3,
                focus: function (event, ui) {
                    if (ui.item != null) {
                        if ($(ui.item.label).children('.title').length > 0)
                            $(this).val($(ui.item.label).children('.title').text());
                    }
                    return false;
                },
                change: function (event, ui) {
                    return false;
                },
                select: function (event, ui) {
                    if (ui.item != null) {
                        if ($(ui.item.label).children('.title').length > 0)
                            $(this).val($(ui.item.label).children('.title').text());
                        location.href = $(ui.item.label).attr('href');
                    }
                    return false;
                }
            });

            return this;
        },

        initJohnsonPromo: function () {
            $('.accordeon-banner li').mouseenter(function () {
                var ul = $(this).closest('ul');
                $('li', ul).removeClass('roll-up roll-down');
                $(this).addClass('roll-down');
                var li = $(this).prev('li');
                while (li.size() > 0) {
                    li.addClass('roll-up');
                    li = li.prev('li');
                }
                window.setTimeout(function () {
                    if ($('li.roll-down', ul).size() > 0) ul.closest('.h-accordeon-wrap').find('h2').removeClass('big_text_h2');
                }, 10);
            }).mouseleave(function () {
                    var ul = $(this).closest('ul');
                    $('li', ul).removeClass('roll-down').addClass('roll-up');
                    window.setTimeout(function () {
                        if ($('li.roll-down', ul).size() == 0) ul.closest('.h-accordeon-wrap').find('h2').addClass('big_text_h2');
                    }, 10);
                });

            return this;
        },

        initBrandList: function () {
            $('#brand-letters a').click(function () {
                var a = $(this);
                $('#brand-letters a.active').removeClass('active');
                a.addClass('active');
                var s = $.trim(a.text());
                var div = $('.row-container-list[data-letter="' + s + '"]');
                var popup = $('#brands-list-popup');
                var html = '';
                popup.find('div.firstletter').hide();
                if (div.size() > 0) html = div.html();
                popup.html('<div class="row-container-list">' + html + '</div>').show();
                popup.find('div.firstletter').hide();
                $(document).on('click.hidePopup', function (e) {
                    var target = $(e.target);
                    if (target.closest('#brand-letters').size() == 0 && target.closest('#brands-list-popup').size() == 0) {
                        popup.hide();
                        $('#brand-letters a.active').removeClass('active');
                        $(document).off('click.hidePopup');
                    }
                });
            });

            var searchModule = app.getModule('search', 'search/default');

            $("#brandSearchButton").click(function (e) {
                e.preventDefault();
                var form = $("#brandSearch"),
                    query = form.find('input[name=br]');
                if (query.val().length == 0) {
                    query.focus();
                }
                else {
                    query.autocomplete("search", query.val());
                }

                $(document).on('click', function () {
                    query.autocomplete("close");
                });

                return false;
            });

            $.widget('search.autocomplete', $.ui.autocomplete, {
                _renderItem: function (ul, item) {
                    var tmp = $(item.value);
                    return $('<li>').append(tmp).appendTo(ul);
                },
                _resizeMenu: function () {
                    if (this.element.attr('id') == 'brandSearchInput')
                        this.menu.element.outerWidth(278);
                }
            });

            $("#brandSearch input").autocomplete({
                source: function (request, response) {
                    searchModule.ajax('brandSearch', {
                        'br': request.term,
                        'autocomplete': 1
                    }, response);
                },
                /* autoFocus: true, */
                delay: 500,
                minLength: 2,
                focus: function (event, ui) {
                    if (ui.item != null) {
                        if ($(ui.item.label).children('.title').length > 0)
                            $(this).val($(ui.item.label).children('.title').text());
                    }
                    return false;
                },

                change: function (event, ui) {
                    if (ui.item != null) {
                        if ($(ui.item.label).children('.title').length > 0)
                            $(this).val($(ui.item.label).children('.title').text());
                    }
                    return false;
                },
                select: function (event, ui) {
                    if (ui.item != null) {
                        if ($(ui.item.label).children('.title').length > 0)
                            $(this).val($(ui.item.label).children('.title').text());
                        location.href = $(ui.item.label).attr('href');
                    }
                    return false;
                }
            });

            return this;
        },


        initPhoneWidget: function () {
            var callbackModule = app.getModule('asterisk', 'Asterisk'),
                wrap = $('#formBackcall'),
                link = $(".callback-link"),
                frm = $('#callback'),
                btn = frm.find('.orange-button'),
                phone = $('#phoneCallback');

            function getCookie(name)
            {
                var results = document.cookie.match ( '(^|;) ?' + name + '=([^;]*)(;|$)' );

                if ( results )
                    return ( unescape ( results[2] ) );
                else
                    return null;
            }

            function createGuid() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
                    return v.toString(16);
                });
            }

            function getTelerSessionId() {
                var telerSessionId = getCookie("TELERSESSIONID");

                if(!telerSessionId) {
                    telerSessionId = createGuid();
                    document.cookie = "TELERSESSIONID=" + telerSessionId + ";";
                }
                return telerSessionId;
            }

            /* s: phoneWidget: phones slider */
            $(".header-content-c-left .arrov-left-c, .header-content-c-left .arrov-right-c").click(function () {
                $(".header-content-c-left li:first-of-type").appendTo(".header-content-c-left ul");
            });
            /* e: phoneWidget: phones slider */

            /* s: phoneWidget: callback */
            phone.maskPhone();

            btn.click(function (e) {
                e.stopPropagation();
                frm.submit();
            });

            frm.submit(function (e) {
                e.stopPropagation();
                var spin = frm.find(".spinner"),
                    hint = frm.parent().find(".hintCallback");
                var telerWdDomain="pampik.phonet.com.ua";
                var telerWdWidgetId="a3d30c87-e13f-4d9e-bed3-0f1c37d0d16e";
                var callbackJson = {};

                if (validationModule.isValidPhone(phone.val())) {
                    callbackJson.phone = "+380" + phone.val().replace(/\s+/g, '');
                    callbackJson.referrerUrl = 'http://pampik.com/';
                    callbackJson.telerSessionId = getTelerSessionId();
                    $.ajax({
                        type: "POST",
                        url: "//" + telerWdDomain + "/rest/public/widget/callback/" + telerWdWidgetId
                        + "/call",
                        data: JSON.stringify(callbackJson),
                        contentType: "application/json; charset=utf-8",
                        complete: function(jqXHR, textStatus) {
                            switch (jqXHR.status) {
                                case 202:
                                    showErrorMsg("Ошибка. Повторите запрос позже.");
                                    break;
                                case 403:
                                    showErrorMsg("Превышен лимит заказанных звонков.<br> Повторите попытку через 1 мин.");
                                    break;
                                default:
                                    showErrorMsg("Ошибка. Повторите запрос позже.");
                            }
                        }
                    });
                    callbackModule.ajax('Callback', frm.serializeArray(),
                        function (msg) {
                            if (msg == 'OK') {
                                // OK to clear data and hide
                                hint
                                    .html("Мы перезвоним вам в ближайшее время")
                                    .show(200)
                                    .delay(1700)
                                    .hide(200);
                                wrap
                                    .delay(1900)
                                    .hide(200, function () {
                                        link.removeClass('active');
                                        $(this).removeAttr('style');
                                    });
                            } else {
                                hint
                                    .html(msg)
                                    .show();
                            }
                        },
                        {
                            dataType: 'html',
                            beforeSend: function () {
                                //hide button
                                btn.hide();
                                spin.show();
                            },
                            complete: function () {
                                //show button
                                spin.hide();
                                btn.show();
                            },
                            error: function () {
                                hint
                                    .html("При отправке запроса произошла ошибка.<br />Проверьте правильность введенных данных и повторите попытку.<br />Если данная ошибка будет повторяться – свяжитесь с нами по телефону или напишите на <a href=\"mailto:customercare@pampik.com\">customercare@pampik.com</a>")
                                    .show();
                            }
                        });
                } else {
                    phone.blur().focus();
                }
                e.preventDefault();
            });

            link.click(function (e) {
                e.stopPropagation();

                UI.hideMainMenu();

                wrap.insertAfter($(this));

                $(this).toggleClass("active");
                UI.popupHandler('.callback-wrap', function () {
                    UI.hideCallback();
                });
            });
            /* e: phoneWidget: callback */
            return this;
        },

        initChatButtonsWidget: function () {

            $(".m-skype-btn").click(function () {
                $(this).toggleClass("active");
            });

            $(".icq-ico a").click(function () {
                window.prompt('Чтобы скопировать, нажмите: Ctrl+C, Enter', '569464355');
            });

            _shcp.push({
                widget_id: 9904,
                template: 'orange',
                // hide : true,
                // hide_offline : true,
                // track : true
                // autostart : true
                // w_type : 'embed',
                // w_selector : '.item-text-content',
                callback: function (chat) {
                    // $('#sh_button').hide();
                    // $('.sh_chat_logo').attr('src','/favicon.ico');
                    var btn = $('.m-chat-btn'),
                        ctrl = $('.sh_hico_popup,.sh_hico_hide');

                    if ($('.sh_chat:visible').length == 0) {
                        btn.show();
                    } else {
                        ctrl.one("click", function () {
                            btn.show();
                        });
                    }

                    btn.click(function () {
                        $('#sh_button').click();
                    });


                    if ($('.ask-question').length > 0) {
                        $('.ask-question:first').click(function () {
                            $('#sh_button').click();
                        });
                    }

                    chat.on("eventJSWidgetExit", function () {
                        btn.show();
                    });
                    chat.on("eventJSWidgetShow", function () {
                        btn.hide();
                        ctrl.one("click", function () {
                            btn.show();
                        });
                    });
                }
            });

            app.loadScript("//widget.siteheart.com/widget/sh/9904/ru/widget.js");

            return this;
        },

        initSubscribeWidget: function () {

            var submitButton = $("#subscribeSubmit"),
                subscribeModal = $("#subscribeModal"),
                customerModule = app.getModule('Customer', 'customer/default'),
                birthDateForm = $(".birth-date"),
                clientName = $("#subscribeClientName"),
                email = $("#subscribeEmail"),
                spinner = $(".spinner-subscribe"),
                additionalBabyForm2 = $('.bbd-2'),
                additionalBabyForm3 = $('.bbd-3'),
                hideBirthDate = $('#hideBirthDate');

            $('#addBirthDate').on('click', function () {

                if (additionalBabyForm2.is(':visible')) {
                    additionalBabyForm3.show('fast');
                }
                else if (!additionalBabyForm2.is(':visible')) {
                    additionalBabyForm2.show('fast');
                }
                hideBirthDate.show('fast');

            });
            hideBirthDate.on('click', function () {
                $(this).toggle(function () {
                    $('.bbd-2').hide();
                    $('.bbd-3').hide();
                });

            });

            subscribeModal.on('hidden.bs.modal', function () {
                $("#subscribeMail").trigger("reset");
            });

            submitButton.on('click', function () {
                if (validationModule.isValidEmail(email.val()) && clientName.val().length > 0) {

                    subscribeModal.find(".response").hide();
                    spinner.show();
                    customerModule.ajax(
                        "subscribe",
                        {
                            "clientname": clientName.val(),
                            "email": email.val(),
                            "babies": [
                                {
                                    "name": $("#subscribeBabyName").val(),
                                    "birthday": $("#subscribeDateDatepicker1").val(),
                                },
                                {
                                    "name": $("#subscribeBabyName2").val(),
                                    "birthday": $("#subscribeDateDatepicker2").val(),
                                },
                                {
                                    "name": $("#subscribeBabyName3").val(),
                                    "birthday": $("#subscribeDateDatepicker3").val(),
                                }
                            ]
                        },
                        function (d) {
                            spinner.hide();
                            subscribeModal.modal('show').find(".response").show().html(d);
                            $("#subscribeMail").trigger("reset");
                        }, {dataType: 'html'});
                }
                else {
                    if (clientName.val().length <= 0) {
                        clientName.addClass('error');
                    }

                    else if (email.val().length <= 0) {
                        email.addClass('error');
                    }
                }
            });

            $.datepicker.regional['ru'] = {
                closeText: 'Закрыть',
                prevText: '&#x3c;Пред',
                nextText: 'След&#x3e;',
                currentText: 'Сегодня',
                monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
                    'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
                dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
                dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
                dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
                weekHeader: 'Не',
                dateFormat: 'dd.mm.yy',
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: false,
                yearSuffix: ''};
            $.datepicker.setDefaults($.datepicker.regional['ru']);

            birthDateForm.datepicker({
                dateFormat: 'dd.mm.yy',
                changeMonth: true,
                changeYear: true,
                minDate: "-10Y",
                maxDate: "+1Y",
                onChangeMonthYear: function () {
                    setTimeout(function () {
                        $('[data-handler="selectMonth"],[data-handler="selectYear"]').selectbox();
                    }, 1);
                }
            })
                .click(function () {
                    $('[data-handler="selectMonth"],[data-handler="selectYear"]').selectbox();
                });


            return this;
        },

        popupHandler: function (parent, callback) {
            $('html').click(function (event) {
                if (( $(event.target).parents(parent).length == 0 ) || ($(event.target).hasClass('close'))) {
                    callback();
                    $(this).unbind(event);
                }
            });
        },

        hideCallback: function () {
            $(".callback-link").removeClass("active");
        },

        hideMainMenu: function () {
            $(".header-menu-click").hide();
            $(".header-menu > div > ul > li").removeClass("active");
        },

        initTooltips: function () {
            // TODO use only bootstrap ones
            $('a[rel=tipsy]').tipsy({fade: true, gravity: 's'});

            $('[rel=helpTipe]').click(function (e) {
                e.stopPropagation();
                $(".helpTipe").toggle();
            });

            $(document).on("click", '[rel=accTipe]', function (e) {
                e.stopPropagation();
                $(".accTipe").toggle();
            });

            $("body").click(function () {
                $(".helpTipe").hide();
                $(".accTipe").hide();
            });
            return this;
        },

        // S: tab scrolling animation
        initTabScroll: function () {

            $('.trigger-select').click(function () {
                var top = $('a[name="' + $(this).data('href').split('#')[1] + '"]').offset().top;
                $('html, body').stop().animate(
                    {scrollTop: top},
                    300
                );
            });

            return this;
        },
        // E: tab scrolling animation

        // S: advanced breadcrumbs and sorting
        initSortPopup: function () {
            // TODO add sorting for news and categories
            $(".list-on-click").click(function (e) {
                e.stopPropagation();
                $(this).next("ul").toggle();
                $(this).parent("div").toggleClass("active");
            });

            $(".list-on-click + ul a").click(function (e) {
                var _val = $(this).html(),
                    _obj = $(this).parents(".to-list").find(".list-on-click");
                $(this).html(_obj.html());
                _obj.html(_val);
                $(this).parent("li").parent("ul").toggle().parent("div").toggleClass("active");
            });

            return this;
        },
        // E: advanced breadcrumbs and sorting

        // S: badges
        initProductBadges: function () {
            var preventDuplicateRequest = false;
            $('#promoModal').on('hidden.bs.modal', function () {
                $('.promo-details').addClass('hidden');
            });
            /* does not work well
             $('#promoModal').find('.modal-body').mCustomScrollbar({
             scrollButtons: { enable: true }, advanced: { updateOnContentResize: true }
             });
             */
            $(document).on('click', '.badge-2', function () {

                if (!$(this).data('clicked')) {

                    var obj = $(this),
                        newsModule = app.getModule('news', 'news/default'),
                        promoId = obj.data('promo'),
                        promo = $('#promo-' + promoId),
                        promoModal = $('#promoModal');

                    obj.data('clicked', true);

                    if (promoId) {
                        if (promo.length > 0) {
                            promo.removeClass('hidden');
                            promoModal.modal({show: true});
                        } else {
                            newsModule.ajax('GetPromoDetails', {'promoId': promoId}, function (d) {
                                if (promoModal && promoModal.length > 0) {
                                    promoModal.find('#promoModalBody').append(d);
                                    UI.initPromoCountdown($('#promo-' + promoId).find('.promo-countdown'))
                                    promoModal.modal({show: true});
                                }
                                obj.data('clicked', false);
                            }, {dataType: 'html'});
                        }
                    }
                }
            });

            // not used at the moment
            // $(".icon-tab i").click(function () { $(this).toggleClass("active"); });

            return this;
        },
        // E: badges

        initProductPhoto: function () {

            var modal = $('#photoModal'),
                modalTitle = modal.find('.modal-title'),
                modalArrowLeft = modal.find('.controll-arrows .left-arrow'),
                modalArrowRight = modal.find('.controll-arrows .right-arrow'),
                modalBody = modal.find('.modal-body'),
                modalBodyImg = modalBody.find('img'),
                modalPhotoList = modal.find('.sub-photos ul li'),
                lastItemId = modalPhotoList.length,
                photoList = $('.sub-photos ul li'),
                photoContainer = $('.photo-main');

            // TODO restyle element so it become clickable
            //$('.photo-main::after').click( $(".photo-main").click );

            photoContainer.click(function () {
                var img = $(this).find('img');
                updatePhoto(modalBodyImg, img.data('image'), img.attr('src'), 'big');
                modalTitle.html(img.attr('alt'));
            });

            photoList.click(function () {
                var li = $(this),
                    id = li.data('image'),
                    src = li.find("img").attr("src");

                photoList.removeClass('active').filter('[data-image="' + id + '"]').addClass('active');

                updatePhoto(photoContainer.find('img'), id, src, 'middle');
                updatePhoto(modalBodyImg, id, src, 'big');
            });


            // TODO add cursor style
            modalBody.click(function () {
                modalArrowRight.click()
            });

            modalArrowLeft.click(function () {
                switchProductPhoto(modalBodyImg.data('image') - 1);
            });

            modalArrowRight.click(function () {
                switchProductPhoto(modalBodyImg.data('image') + 1);
            });

            function switchProductPhoto(id) {
                modalPhotoList.filter('[data-image="' + ( ( id <= lastItemId ) * (id > 0) * id + ( id == 0) * lastItemId + ( id > lastItemId ) ) + '"]').click();
            }

            function updatePhoto(img, id, src, size) {
                img
                    .data('image', id)
                    .attr("src", src.replace('/pic/', '/' + size + '/').replace('/middle/', '/' + size + '/'));
            }

            return this;
        },

        initProductReviewsWidgetCustomise: function () {
            app.on('afterPageLoad', function () {
                $('div.spk-good-rating.spk-ref-to-reviews a').attr('href', location.href + '#spk-widget-reviews');
            });
            return this;
        },

        // S: InfiniteScrollWidget
        initInfiniteScrollWidget: function (elem) {
            if (elem.length > 0) {
                (function () {
                    // помещам стандартный навигатор после кнопки 'showmore'
                    elem.insertAfter('#showMore');
                    // запоминаем текущую страницу и их максимальное количество
                    var page = parseInt($('#page-id').val()),
                        items = $('.products-items'),
                        isArticle = ( items.length == 0 ),
                        pageCount = parseInt($('#page-count-id').val()),
                        loadingFlag = false,
                        spinner = $('.spinner'),
                        showMore = $('#showMore'),
                        paginator = $('ul.paginator'),
                        pagerModule = app.getModule('paginator'),
                        showAll = $('#showAllProduct'),
                        pageSize = showAll.attr('data-itemsCount'),
                        pageButton = $('ul.paginator li'),
                        ajaxPageNumber = getQueryVariable('ajaxPage');

                    if (ajaxPageNumber) {
                        //history.pushState({page: page}, '', location.pathname);
                        for (var i = page; i < ajaxPageNumber; i++) {
                            pagerModule.ajax('', {page: i + 1}, function (d) {
                                loadingFlag = false;
                                spinner.hide();
                                $(items).append(d);
                                page++;
                                listPage = paginator.find('.selected');
                                listPage.next().addClass('selected');
                                UI.moveSecondaryContent();
                            }, {dataType: 'html'});
                        }


                    }

                    //если мы находимя на последней странице, то прячем кнопки 'more' 'all'
                    if (ajaxPageNumber >= pageCount || page >= pageCount) {
                        showMore.hide();
                        showAll.hide();
                    }

                    pageButton.click(function () {
                        window.location = $(this).children('a').attr('href');
                    });

                    showMore.click(function () {

                        if (!loadingFlag) {
                            loadingFlag = true;
                            spinner.show();
                            showMore.hide();
                            showAll.hide();
                            pagerModule.ajax('', {page: page + 1}, function (d) {
                                loadingFlag = false;
                                spinner.hide();
                                if (isArticle) {
                                    $('#page' + page).after(d);
                                } else {
                                    $(items).append(d);
                                }
                                page++;
                                listPage = paginator.find('.selected');
                                listPage.next().addClass('selected');
                                if (page < pageCount) {
                                    showMore.show();
                                    showAll.show();
                                }

                                history.pushState({page: page}, '', location.pathname + '?ajaxPage=' + page);

                                UI.moveSecondaryContent();
                            }, {dataType: 'html'});
                        }
                        return false;
                    });

                    showAll.click(function () {
                        if (!loadingFlag) {
                            loadingFlag = true;
                            spinner.show();
                            $('.paginator-title').hide();
                            showMore.hide();
                            showAll.hide();
                            paginator.hide();
                            pagerModule.ajax('', {pageSize: pageSize}, function (d) {
                                loadingFlag = false;
                                spinner.hide();
                                $(items).html(d);
                                history.pushState({page: page}, '', location.pathname + '?ajaxPage=' + pageCount);
                                UI.moveSecondaryContent();
                            }, {dataType: 'html'});
                        }
                        return false;
                    });


                })();
            }
            //получает параметр из URL
            function getQueryVariable(variable) {
                var query = window.location.search.substring(1);
                var vars = query.split("&");
                for (var i = 0; i < vars.length; i++) {
                    var pair = vars[i].split("=");
                    if (pair[0] == variable) {
                        return pair[1];
                    }
                }
                return(false);
            }

            return this;
        },
        // E: InfiniteScrollWidget

        moveSecondaryContent: function () {
            var s = $("#secondaryContent"), m = $("#mainContent");
            if (s.length > 0) {
                //некоторые вещи оставил, тк jQuery возвращает другой результат
                m.css("padding-bottom", s.height() + 10);
                //top: s['0'].style.top == '' || s['0'].style.top == '0' ? (g['0'].clientHeight + o) : (g['0'].clientHeight - s.height() + o)
                s.offset({top: m.offset().top + m.height() + 10}).css("visibility", "visible");
            }
            return this;
        },

        initValidation: function (elem) {
            validationModule.init(elem);
            return this;
        },

        initFormPseudoControls: function () {
            pseudoFormControlsModule.init();
            return this;
        },

        initArticleProductLookup: function (elem) {

            var productLookupModule = app.getModule('product', 'product/default');

            elem.find("a[href*=catalog]").each(function () {
                var a,
                    c = $(this),
                    b = elem;

                if (a = c.attr("href").match(/catalog\/[^.]*$/gi)) {
                    a = a.toString();
                    a = a.slice(a.indexOf("/") + 1);
                    if (a.indexOf("/") != -1)
                        a = a.slice(0, a.indexOf("/"));
                    ab = a.slice(a.lastIndexOf("-") + 1, a.lastIndexOf("-") + 2);
                    if (ab != 'r' && ab != 'p' && a[0] != '?') {
                        if (!b.data(a)) {
                            productLookupModule.ajax('lookup', {'url': a}, function (d) {
                                b.append(d);
                            }, {dataType: 'html'});
                            b.data(a, true);
                        }
                        c.addClass("bluexhr tLookup").attr("tlookup", a)
                            .click(function () {
                                return false;
                            })
                            .mouseenter(function () {
                                clearTimeout(c.data("timeoutId"));
                                $("#tlookup" + a).show().css({top: c.position().top - 255, left: c.position().left - 160 + c.width() / 2}).mouseenter(function () {
                                    $(this).data("hover", true)
                                }).mouseleave(function () {
                                        $(this).data("hover", false)
                                    });
                            })
                            .mouseleave(function () {
                                var d = setTimeout(function () {
                                    if (!$("#tlookup" + a).data("hover")) {
                                        $("#tlookup" + a).hide()
                                    }
                                    else {
                                        d = setTimeout(arguments.callee, 500);
                                        c.data("timeoutId", d)
                                    }
                                }, 500);
                                c.data("timeoutId", d)
                            });
                    }
                }
            });

            return this;
        },

        initSocialLikeWidget: function () {

//            app
//                .loadScript ('//apis.google.com/js/plusone.js', 'plusone-jssdk')
//                .loadScript ('//platform.twitter.com/widgets.js', 'twitter-jssdk', function() {
//                    $('#twitter-like').removeClass('hidden');
//                })
//                // https://developers.facebook.com/docs/plugins/like-button
//                .loadScript ('//connect.facebook.net/ru_RU/sdk.js#xfbml=1&appId=239816062709236&version=v2.0', 'facebook-jssdk')
//                // http://apiok.ru/wiki/pages/viewpage.action?pageId=42476656
//                .loadScript ('//connect.ok.ru/connect.js', 'ok-jssdk', function () {
//                    OK.CONNECT.insertShareWidget('ok_shareWidget',document.URL,'{width:100,height:30,st:"rounded",sz:20,nt:1}');
//                })
//                // https://vk.com/dev/Like
//                .loadScript ('//vk.com/js/api/openapi.js?115', 'vk-jssdk', function () {
//                    // VK.init({apiId: {$vk}, onlyWidgets: true});
//                    VK.Widgets.Like('vk_like', {type: 'mini', height: 20});
//                });

            if (window.pluso)if (typeof window.pluso.start == "function") return;
            if (window.ifpluso == undefined) {
                window.ifpluso = 1;
                var d = document, s = d.createElement('script'), g = 'getElementsByTagName';
                s.type = 'text/javascript';
                s.charset = 'UTF-8';
                s.async = true;
                s.src = ('https:' == window.location.protocol ? 'https' : 'http') + '://share.pluso.ru/pluso-like.js';
                var h = d[g]('body')[0];
                h.appendChild(s);
            }
            return this;
        },

        initPromoCountdown: function (elem) {

            function pluralEnding(qty, single, plural1, plural2) {
                if (((qty % 100 < 10) || (qty % 100 > 20)) && (qty % 10 != 0)) {
                    if (qty % 10 == 1) {
                        return single;
                    } else if (qty % 10 < 5) {
                        return plural1;
                    }
                }
                return plural2;
            }

            if (elem.length > 0) {
                var note = elem.next('.countdown-note'),
                    data = elem.data('dateto'),
                    dateSplit = data.split('-'),
                    ts = new Date(dateSplit[0], dateSplit[1] - 1, parseInt(dateSplit[2]) + 1);

                elem.countdown({
                    timestamp: ts,
                    callback: function (days, hours, minutes, seconds) {
                        var message = "";
                        if (days > 0) {
                            elem.find(".countHours, .countDiv1, .countMinutes, .countDiv2, .countSeconds").hide();
                            message = pluralEnding(days, "день", "дня", "дней");
                        } else {
                            elem.find(".countDays").hide();
                            elem.find(".countHours, .countDiv1, .countMinutes, .countDiv2, .countSeconds").css({display: "inline-block"});
                            message =
                                "<span class='h'>" + pluralEnding(hours, "час", "часа", "часов") + "</span>&nbsp;" +
                                    "<span class='i'>" + pluralEnding(minutes, "минута", "минуты", "минут") + "</span>";

                        }
                        note.html(message);
                    }
                });
            }

            return this;
        }

        // E: page parts
    };

}
// E: main application object

$(window)
    .on('load.PAMPIK', PAMPIK.onLoad)
    .on('beforeunload.PAMPIK', PAMPIK.onUnload)
    .on('unload.PAMPIK', PAMPIK.onUnload);

$(PAMPIK.onReady);

$(document).on("click", ".login-block-link", function() {
	$(".login-block").toggle();
});


// S: helper class for tooltips
// TODO use bootstrap ones and/or tipsy
var helperModule = {
	init: function () {
		var _this = this;
		$('.helper').each(function () {
			if (!$(this).data('helper-init')) {
				var o = $(this);
				o.data('helper-init', true);
				var text = o.html();
				o.click(function () {
					_this.show(o, text, o.hasClass('helper-auto'));
				});
			}
		});
	},
	show: function (o, text, isAuto) {
		o = $(o);
		var tooltip = $('<div class="helper-tooltip"><div class="cn"></div><div class="close">&times;</div>' + text + '</div>');
		if (isAuto) tooltip.css('max-width', '999px');
		$('body').append(tooltip);
		this.setPos(o, tooltip);
		var _this = this;
		$(document).on('resize.tooltipPos', function () {
			_this.setPos(o, tooltip);
		});

		window.setTimeout(function () {
			$(document).on('click.tooltipClose', function (e) {
				if (!$(e.target).hasClass('helper-tooltip')) {
					tooltip.remove();
					$(document).off('click.tooltipClose');
					$(document).off('resize.tooltipPos');
				}
			});
		}, 1000);

	},
	hide: function () {
		$(document).trigger('click.tooltipClose');
	},
	setPos: function (o, tooltip) {
		var top = o.offset().top - tooltip.outerHeight() - 10, left = o.offset().left - tooltip.outerWidth() / 2 + 7;
		var main = $('.container');
		if (left + tooltip.outerWidth() > main.offset().left + main.outerWidth()) {
			left = main.offset().left + main.outerWidth() - tooltip.outerWidth();
			var cn = $('.cn', tooltip);
			var cn_left = o.offset().left - left + o.outerWidth() / 2;
			cn.css('left', cn_left + 'px');
		}

		tooltip.css('left', left + 'px').css('top', top + 'px');
	}
};
helperModule.init();
// E: helper class for tooltips