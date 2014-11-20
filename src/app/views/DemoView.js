define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');

    DemoView.prototype = Object.create(View.prototype);
    DemoView.prototype.constructor = DemoView;

    DemoView.DEFAULT_OPTIONS = {

    };

    function DemoView(options) {
        View.apply(this, arguments);

        var surface = new Surface({
             size: [undefined, undefined],
             content: '<iframe src="' + this.options.url + '" frameborder="0" height="100%" width="100%"></iframe>',
             classes: []
         });
         this.add(surface);

    }

    module.exports = DemoView;
});
