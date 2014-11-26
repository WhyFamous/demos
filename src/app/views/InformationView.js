define(function(require, exports, module) {
  var View = require('famous/core/View');
  var Surface = require('famous/core/Surface');
  var Modifier = require('famous/core/Modifier');
  var Transform = require('famous/core/Transform');
  var RenderNode = require('famous/core/RenderNode');
  var RenderController = require('famous/views/RenderController');
  var Lightbox = require('famous/views/Lightbox');
  var Easing = require('famous/transitions/Easing');
  var FontAwesomeSurface = require('adarta/surfaces/FontAwesomeSurface');

  InformationView.prototype = Object.create(View.prototype);
  InformationView.prototype.constructor = InformationView;

  InformationView.DEFAULT_OPTIONS = {

  };

  function InformationView(options) {
      View.apply(this, arguments);

      _initialize.call(this);
      _setListeners.call(this);
      _setInfoContent.call(this, this.options.data);
      _buildTree.call(this);
    }

    function _initialize() {
      var _controlColor = this.options.color;
      var _backColor = this.options.backgroundColor;

      this._renderer = new Lightbox({
        inTransform: Transform.scale(1, 0.001, 1),
        inOpacity: 0,
        inOrigin: [0.5, 0],
        inAlign: [0.5, 0],
        outTransform: Transform.scale(1, 0.001, 1),
        outOpacity: 0,
        outOrigin: [0.5, 0],
        outAlign: [0.5, 0],
        showTransform: Transform.identity,
        showOpacity: 1,
        showOrigin: [0.5, 0],
        showAlign: [0.5, 0],
        inTransition: true,
        outTransition: true,
        overlap: false
      });

      this.info = new Surface({
        size: [this.options.size[0], this.options.size[1]],
        properties: {
          minHeight: '100px',
          backgroundColor: _backColor,
          color: 'white',
          borderRadius: '0px 0px 4px 4px',
          textAlign: 'center',
          cursor: 'pointer'
        }
      });

      this.pull = new FontAwesomeSurface({
        size: [80, 20],
        name: 'chevron-down',
        properties: {
          fontSize: '18px',
          textAlign: 'center',
          color: 'white',
          backgroundColor: _controlColor,
          borderRadius: '0px 0px 4px 4px',
          cursor: 'pointer'
        }
      });
    }

    if (!String.prototype.format) {
      String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
          return typeof args[number] != 'undefined'
          ? args[number]
          : match
          ;
        });
      };
    }

    function _setInfoContent(data) {
      if (data) {
        var authorLink = '<a href="{1}" target="_blank">{0}</a>'.format(data.author, data.authorUrl);
        var html = '<h1>{0}</h1>By: {2}<hr>{1}'.format(data.title, data.description, authorLink.toString());
        this.info.setContent(html);
      }
    }

    function _togglePull(isPulled) {
      //this._renderer.hide();
      if (!isPulled) {
        this._renderer.show(this.info);
        this.info.pulled = true;
      } else {
        this._renderer.show(this.pull);
        this.info.pulled = false;
      }
    }

    function _setListeners() {

      this._optionsManager.on('change', function(event) {
        var key = event.id;
        var val = event.value;
        if (key === 'content') {

        }
      }.bind(this));

      this.info.on('click', function(e){
        var node = event.target;
        if (node && !(node.nodeName === 'A')) {
          _togglePull.call(this, this.info.pulled);
        }
      }.bind(this));

      this.pull.on('click', function(e){
          _togglePull.call(this, false);
      }.bind(this));
    }

    function _buildTree() {
      this.add(this._renderer);
      _togglePull.call(this, true);
    };

    InformationView.prototype.setData = function setData(data) {
      _setInfoContent.call(this, data);
    }

    module.exports = InformationView;
});
