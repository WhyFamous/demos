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
        // A callback will allow the controller to handle the load through a return call
        callback.call({ data: returnObj }, error);
        // Sending an event will also ensure the application knows data was loaded
        this._eventOutput.emit('data-loaded', {data: returnObj, error: error});
    }

    /*
     * @name AppData
     * @constructor
     * @description
     */

    function AppData(options) {

        this._eventInput = new EventHandler();
        this._eventOutput = new EventHandler();
        EventHandler.setInputHandler(this, this._eventInput);
        EventHandler.setOutputHandler(this, this._eventOutput);

        this.options = Utility.clone(this.constructor.DEFAULT_OPTIONS || View.DEFAULT_OPTIONS);
        this._optionsManager = new OptionsManager(this.options);

        if (options) this.setOptions(options);
    }

    AppData.DEFAULT_OPTIONS = {}; // no defaults

    /**
     * Look up options value by key
     * @method getOptions
     *
     * @param {string} key key
     * @return {Object} associated object
     */
    AppData.prototype.getOptions = function getOptions() {
        return this._optionsManager.value();
    };

    /*
     *  Set internal options.
     *  No defaults options are set in View.
     *
     *  @method setOptions
     *  @param {Object} options
     */
    AppData.prototype.setOptions = function setOptions(options) {
        this._optionsManager.patch(options);
    };

    /*
     *  Get Data.
     *
     *  @method setOptions
     *  @param {Object} options
     */
    AppData.prototype.getData = function getData(domain, path, callback) {
        if (typeof callback === 'function') {
            var url = (domain) ? '//' + domain + '/' + path : path;
            _getData.call(this, url, callback);
            return true;
        }
        return false;
    };


    module.exports = AppData;
});
