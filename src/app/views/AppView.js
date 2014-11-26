define(function(require, exports, module) {
  var Surface = require('famous/core/Surface');
  var View = require('famous/core/View');
  var RenderController = require('famous/views/RenderController');
  var Modifier = require('famous/core/Modifier');
  var Transform = require('famous/core/Transform');
  var RenderNode = require('famous/core/RenderNode');
  var DemoView = require('./DemoView');
  var ControllerView = require('./ControllerView');

  AppView.DEFAULT_OPTIONS = {

  };


  function _initialize() {
    this._keys = [];
    this._currentIndex = 0;

    var _controlColor = 'rgba(0,180,0,0.4)';

    this._keys = [];
    this.renderer = new RenderController();

    this.controller = new ControllerView();
    this.controller._mod = new Modifier({
      size: [undefined, undefined],
      origin: [0, 0],
      align: [0, 0],
      transform: Transform.translate(0, 0, 0.0002)
    });
  }

  function _buildKeys() {
    // We must build a key list to be able to next and previous our objects
    for (var key in this.options.appData) {
      this._keys.push(key);
    }
  }

  function _listeners() {
    this.controller.on('previous', function(e) {
      console.log('previous', e);
      this.goPrevious();
    }.bind(this));
    this.controller.on('next', function(e) {
      console.log('next', e);
      this.goNext();
    }.bind(this));
  };

  function _buildTree() {
    this.add(new Modifier({transform: Transform.translate(0, 0, 0.0001)})).add(this.renderer);

    var data = this.options.appData[this._keys[this._currentIndex].toString()];
    this.demo = new DemoView({ url: data.url });
    this.renderer.show(this.demo);

    this.controller.setData(data);

    this.add(this.controller._mod).add(this.controller);
  };

  function AppView(options) {
    View.apply(this, arguments);

    _initialize.call(this);
    _listeners.call(this);
    _buildKeys.call(this);
    _buildTree.call(this);
  }

  AppView.prototype = Object.create(View.prototype);
  AppView.prototype.constructor = AppView;

  /**
  * Move to the next demo of this component's data.
  *
  * @private
  * @method render
  * @return {number} next index
  */
  AppView.prototype.goNext = function goNext() {
    this._currentIndex = (this._currentIndex + 1 < this._keys.length ) ? this._currentIndex + 1 : 0;
    var data = this.options.appData[this._keys[this._currentIndex].toString()];

    this.renderer.hide();
    this.demo = new DemoView({ url: data.url });
    this.renderer.show(this.demo);
    this.controller.setData(data);

    return this._currentIndex;
  };

  /**
  * Move to the previous demo of this component's data.
  *
  * @private
  * @method render
  * @return {number} previous index
  */
  AppView.prototype.goPrevious = function goPrevious() {
    this._currentIndex = (this._currentIndex - 1 >= 0 ) ? this._currentIndex - 1 : this._keys.length - 1;
    var data = this.options.appData[this._keys[this._currentIndex].toString()];

    this.renderer.hide();
    this.demo = new DemoView({ url: data.url });
    this.renderer.show(this.demo);
    this.controller.setData(data);

    return this._currentIndex;
  };

  module.exports = AppView;
});
