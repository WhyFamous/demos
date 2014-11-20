define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Modifier = require('famous/core/Modifier');
    var RenderNode = require('famous/core/RenderNode');
    var RenderController = require('famous/views/RenderController');
    var FontAwesomeSurface = require('adarta/surfaces/FontAwesomeSurface');

    ControllerView.prototype = Object.create(View.prototype);
    ControllerView.prototype.constructor = ControllerView;

    ControllerView.DEFAULT_OPTIONS = {

    };

    var _initialize = function() {
      var _controlColor = 'rgba(0,180,0,0.4)';
      this.renderer = new RenderController();

      this.fasl = new FontAwesomeSurface({
        size: [40, 40],
        name: 'chevron-circle-left',
        properties: {
          fontSize: '40px',
          color: _controlColor,
          cursor: 'pointer'
        }
      });
      this.fasl.mod = new Modifier({ origin: [0, 0],align: [0.2, 0]});
      this.fasr = new FontAwesomeSurface({
        size: [40, 40],
        name: 'chevron-circle-right',
        properties: {
          fontSize: '40px',
          color: _controlColor,
          cursor: 'pointer'
        }
      });
      this.fasr.mod = new Modifier({ origin: [0, 0],align: [0.8, 0]});
    };

    var _listeners = function() {
      this.fasl.on('click', function() {
        this._eventOutput.emit('previous', {});
      }.bind(this));
      this.fasr.on('click', function() {
        this._eventOutput.emit('next', {});
      }.bind(this));
    };

    var _buildTree = function() {
      this.add(this.renderer);
      this.add(this.fasl.mod).add(this.fasl);
      this.add(this.fasr.mod).add(this.fasr);
    };

    function ControllerView(options) {
        View.apply(this, arguments);

        _initialize.call(this);
        _listeners.call(this);
        _buildTree.call(this);
    }

    module.exports = ControllerView;
});
