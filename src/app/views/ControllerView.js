define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var RenderNode = require('famous/core/RenderNode');
    var FontAwesomeSurface = require('adarta/surfaces/FontAwesomeSurface');
    var InformationView = require('./InformationView');

    ControllerView.prototype = Object.create(View.prototype);
    ControllerView.prototype.constructor = ControllerView;

    ControllerView.DEFAULT_OPTIONS = {

    };

    var _node;
    function _initialize() {
      _node = new RenderNode();
      _node.mod = new Modifier({
        size: this.options.size,
        origin: [0, 0],
        align: [0.5, 0]
      });

      var _controlColor = 'rgba(180,180,180,0.6)';

      this.fasl = new FontAwesomeSurface({
        size: [40, 40],
        name: 'chevron-circle-left',
        properties: {
          fontSize: '40px',
          textAlign: 'center',
          color: _controlColor,
          cursor: 'pointer'
        }
      });
      this.fasl._mod = new Modifier({
        size: this.options.size,
        transform: Transform.translate(-240,0,0.0001)
        });
      this._faslNode = new RenderNode();

      this.fasr = new FontAwesomeSurface({
        size: [40, 40],
        name: 'chevron-circle-right',
        properties: {
          fontSize: '40px',
          textAlign: 'center',
          color: _controlColor,
          cursor: 'pointer'
        }
      });
      this.fasr._mod = new Modifier({
        size: this.options.size,
        transform: Transform.translate(200,0,0.0001)
        });
      this._fasrNode = new RenderNode();

      this.pull = new InformationView({
        size: [400, true],
        color: _controlColor,
        backgroundColor: 'rgba(40, 40, 40, 0.70)'
      });
      this.pull._mod = new Modifier({
        size: this.options.size,
        origin: [0, 0],
        align: [0, 0],
        transform: Transform.translate(0, 0, 0.0001)
      });
      this._pullNode = new RenderNode();
    };

    function _listeners() {
      this.fasl.on('click', function() {
        this._eventOutput.emit('previous', {});
      }.bind(this));
      this.fasr.on('click', function() {
        this._eventOutput.emit('next', {});
      }.bind(this));

      this._optionsManager.on('change', function(event) {
        var key = event.id;
        var data = event.value;
        if (key === 'content') {
        }
      }.bind(this));

    };

    function _buildTree() {
      _node.add(this._faslNode);
      _node.add(this._fasrNode);

      this.add(this.pull._mod).add(this.pull);
      this._faslNode.add(this.fasl._mod).add(this.fasl);
      this._fasrNode.add(this.fasr._mod).add(this.fasr);

      this.add(_node.mod).add(_node);
    };

    function ControllerView(options) {
        View.apply(this, arguments);

        _initialize.call(this);
        _listeners.call(this);
        _buildTree.call(this);
    }

    ControllerView.prototype.setData = function setData(data) {
      this.pull.setData(data);
    }

    module.exports = ControllerView;
});
