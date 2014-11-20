define(function(require, exports, module) {
    var RenderNode = require('famous/core/RenderNode');
    var OptionsManager = require('famous/core/OptionsManager');
    var Utility = require('famous/utilities/Utility');
    var Surface = require('famous/core/Surface');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var ImageSurface = require('famous/surfaces/ImageSurface');

    /**
     * A class to show the logo and title of the app
     *   at a single point in the render tree
     *
     * @class Splash
     * @constructor
     */
    function Splash(options) {
        this._node = new RenderNode();

        this.options = Utility.clone(this.constructor.DEFAULT_OPTIONS || View.DEFAULT_OPTIONS);
        this._optionsManager = new OptionsManager(this.options);
        _setListeners.call(this);

        if (options) this.setOptions(options);

        var logo = new ImageSurface({
            size: [200, 200],
            content: this.options.imagePath || require('../../assets/images/whyfamous_logo.svg'),
            classes: ['double-sided']
        });

        this.desc = new Surface({
            size: [200, 20],
            content: this.options.content || 'Title',
            classes: ['double-sided', 'double-font'],
            properties: {
                textAlign: 'center',
                lineHeight: '80px',
                backgroundColor: 'rgba(76,8,30,1)',
                borderRadius: '4px 4px 0 0'
            }
        });

        this.desc.mod = new Modifier({
            transform: Transform.translate(0, 110, 50)
        });

        var initialTime = Date.now();
        var centerSpinModifier = new Modifier({
            origin: [0.5, 0.5],
            align: [0.5, 0.5],
            transform: function() {
                return Transform.rotateY(0.0015 * (Date.now() - initialTime));
            }
        });

        this.renderNode = new RenderNode();
        this.renderNode.add(logo);
        this.renderNode.add(this.desc.mod).add(this.desc);

        this._node.add(centerSpinModifier).add(this.renderNode);

    }

    Splash.DEFAULT_OPTIONS = {}; // no defaults

    /**
     * Look up options value by key
     * @method getOptions
     *
     * @param {string} key key
     * @return {Object} associated object
     */
    Splash.prototype.getOptions = function getOptions() {
        return this._optionsManager.value();
    };

    /*
     *  Set internal options.
     *  No defaults options are set in View.
     *
     *  @method setOptions
     *  @param {Object} options
     */
    Splash.prototype.setOptions = function setOptions(options) {
        this._optionsManager.patch(options);
    };

    /**
     * Generate a render spec from the contents of this component.
     *
     * @private
     * @method render
     * @return {number} Render spec for this component
     */
    Splash.prototype.render = function render() {
        return this._node.render();
    };

    var _setListeners = function() {

        this._optionsManager.on('change', function(event) {
            var key = event.id;
            var data = event.value;
           if (key === 'content') {
                 if (this.desc) this.desc.setOptions({content: data});
            }
        }.bind(this));
    };

    module.exports = Splash;
});
