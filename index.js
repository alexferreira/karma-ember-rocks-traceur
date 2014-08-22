var traceur = require('traceur');
var path = require('path');
var createTraceurPreprocessor = function(args, config, logger, helper) {
  config = config || {};

  var log = logger.create('preprocessor.emberRocksTraceur');
  var defaultOptions = {
    sourceMaps: false,
    modules: 'amd'
  };
  var options = helper.merge(defaultOptions, args.options || {}, config.options || {});

  var transformPath = args.transformPath || config.transformPath || function(filepath) {
    return filepath.replace(/\.es6.js$/, '.js').replace(/\.es6$/, '.js');
  };

  return function(content, file, done) {
    log.debug('Processing "%s".', file.originalPath);
    file.path = transformPath(file.originalPath);
    
    file.relative = file.path.split('ember_rocks_mocha_testing/')[1];

    options.filename = file.originalPath;
    var result = traceur.compile(content, options);
    var transpiledContent = result.js;
    transpiledContent = transpiledContent.replace(/\$__(\w).__esModule/g, '$__$1.__esModule && !$__$1.default');

    result.errors.forEach(function(err) {
      log.error(err);
    });

    if (result.errors.length) {
      return done(new Error('TRACEUR COMPILE ERRORS\n' + result.errors.join('\n')));
    }

    return done(null, transpiledContent);
  };
};

createTraceurPreprocessor.$inject = ['args', 'config.traceurPreprocessor', 'logger', 'helper'];

var initTraceurFramework = function(files) {
  files.unshift({pattern: traceur.RUNTIME_PATH, included: true, served: true, watched: false});
};

initTraceurFramework.$inject = ['config.files'];

// PUBLISH DI MODULE
module.exports = {
  'preprocessor:emberRocksTraceur': ['factory', createTraceurPreprocessor],
  'framework:emberRocksTraceur': ['factory', initTraceurFramework]
};
