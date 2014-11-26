define(function(require, exports, module) {
    // load non-js resources (css, index.html)
    require('./resources');

    // import dependencies
    var Engine = require('famous/core/Engine');
    var RenderController = require('famous/views/RenderController');
    var Timer = require('famous/Utilities/Timer');
    var AppView = require('./app/views/AppView');
    var AppData = require('./app/views/data/AppData');
    var AppConfig = require('./app/views/data/AppConfig');
    var Splash = require('./app/views/Splash');

    // create the main context
    var mainContext = Engine.createContext();
    //mainContext.setPerspective(1000);

    var size = [undefined, undefined];
    Engine.nextTick(function() {
        //console.log('After tick=' + mainContext.getSize());
        size = mainContext.getSize();
    });
    var splash = new Splash({
        content: 'Why Famo.us Demos',
        imagePath: require('./assets/images/whyfamous_logo.svg')
    });

    var switcher = new RenderController();

    var data = new AppData();
    data.on('data-loaded', function(response) {
      console.log('data-loaded', response.error || response.data);
    });

    var mainView;
    function loadData(domain, path) {
        data.getData(domain, path, function(error) {
            console.log('getData', error || this.data);
            mainView = new AppView({appData: this.data});
            mainView.setOptions({size: [size[0], size[1]]});
            Timer.setTimeout(function() {
                switcher.show(mainView);
            }, 500);
        });
    }

    mainContext.add(switcher);

    var config = new AppConfig({ filename: require('./assets/data/app.config.txt') });
    config.get(function(error) {
        console.log('app.config', this.data);
        config.data = this.data;
        splash.setOptions({ content: this.data.site_title });
        switcher.show(splash);
        loadData(config.data.domain, require('./assets/data/demo.config.txt'));
    });

    mainContext.on('resize', function(e) {
        console.log('After resize=' + mainContext.getSize());
        size = mainContext.getSize();
        if (mainView)
            mainView.setOptions({size: [size[0], size[1]]});
    }.bind(this));

});
