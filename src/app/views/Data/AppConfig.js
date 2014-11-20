define(function(require, exports, module) {
    var Utility = require('famous/utilities/Utility');
    var EventHandler = require('famous/core/EventHandler');
    var OptionsManager = require('famous/core/OptionsManager');

    function _getData(url, callback) {
        if (url)
            Utility.loadURL(url, _setData.bind(this, callback));
    }

    function _setData(callback, returnData, error) {
        if (!returnData)
            return;
        var returnObj = JSON && JSON.parse(returnData);
        callback.call({ data: returnObj }, error);
    }

    /*
     * @name AppConfig
     * @constructor
     * @description
     */

    function AppConfig(options) {

        this._eventInput = new EventHandler();
        this._eventOutput = new EventHandler();
        EventHandler.setInputHandler(this, this._eventInput);
        EventHandler.setOutputHandler(this, this._eventOutput);

        this.options = Utility.clone(this.constructor.DEFAULT_OPTIONS || AppConfig.DEFAULT_OPTIONS);
        this._optionsManager = new OptionsManager(this.options);

        if (options) this.setOptions(options);
    }

    AppConfig.DEFAULT_OPTIONS = {
        filename: './assets/data/app.config.txt'
    };

    /**
     * Look up options value by key
     * @method getOptions
     *
     * @param {string} key key
     * @return {Object} associated object
     */
    AppConfig.prototype.getOptions = function getOptions() {
        return this._optionsManager.value();
    };

    /*
     *  Set internal options.
     *  No defaults options are set in View.
     *
     *  @method setOptions
     *  @param {Object} options
     */
    AppConfig.prototype.setOptions = function setOptions(options) {
        this._optionsManager.patch(options);
    };

    /*
     *  Get Posts.
     *
     *  @method setOptions
     *  @param {Object} options
     */
    AppConfig.prototype.get = function get(callback) {
        if (typeof callback === 'function') {
            var url = this.options.filename || './assets/data/app.config.txt';
            _getData(url, callback);
            return true;
        }
        return false;
    };


    module.exports = AppConfig;
});
