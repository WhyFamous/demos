define(function(require, exports, module) {
  var Surface = require('famous/core/Surface');
  var View = require('famous/core/View');
  var RenderController = require('famous/views/RenderController');
  var Modifier = require('famous/core/Modifier');
  var DemoView = require('./DemoView');
  var ControllerView = require('./ControllerView');

  AppView.DEFAULT_OPTIONS = {

  };


  var _initialize = function() {
    this._keys = [];
    this._currentIndex = 0;

    var _controlColor = 'rgba(0,180,0,0.4)';

    this._keys = [];
    this.renderer = new RenderController();

    this.controller = new ControllerView();
  }

  var _buildKeys = function() {
    // We must build a key list to be able to next and previous our objects
    for (var key in this.options.appData) {
      this._keys.push(key);
    }
  }

  var _listeners = function() {
    this.controller.on('previous', function(e) {
      console.log('previous', e);
    }.bind(this));
    this.controller.on('next', function(e) {
      console.log('next', e);
    }.bind(this));
  };

  var _buildTree = function() {
    this.add(this.renderer);

    this.demo = new DemoView({ url: this.options.appData['rolex'].url });
    this.renderer.show(this.demo, function() {

      this.add(this.controller);

    }.bind(this));
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

  module.exports = AppView;
});
