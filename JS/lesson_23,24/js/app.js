requirejs.config({
    paths: {
        'jquery': 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min'
    },
    shim: {
        'jquery': {
            exports: 'jQuery'
        }
    }
});

require(
    [
        'tmpl',
        'jquery',
        'Model',
        'View',
        'Controller'
    ],
    
    function (tmpl, $, Model, View, Controller) {
        $(function() {

            var data = ['Example'];
            var model = new Model(data);
            var view = new View(model);
            var controller = new Controller(model, view);

        });
    }
);
