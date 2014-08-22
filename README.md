# karma-ember-rocks-traceur

> Preprocessor to compile ES6 JavaScript on the fly using [traceur-compiler] for [Ember Rocks][ember-rocks].

## Installation

Install `karma-ember-rocks-traceur` as a devDependency for your project:

```bash
npm install karma --save-dev
npm install karma-ember-rocks-traceur --save-dev
```

## Configuration
The following example configuration shows some of the required settings for enabling Traceur support.  Traceur compiles source files into either AMD or Node.js modules.  Since Karma is testing in a browser you need to [configure RequireJS][configure-requirejs].

```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    // at a minimum need requirejs + emberRocksTraceur
    frameworks: ['mocha', 'requirejs', 'emberRocksTraceur'],

    preprocessors: {
      'src/**/*.es6': ['emberRocksTraceur']
    },

    files: [
      {pattern: 'src/**/*.es6', included: false},
      {pattern: 'test/**/*Spec.es6', included: false},
      'test/test-main.js'
    ],

    // default configuration, not required
    traceurPreprocessor: {
      // options passed to the traceur-compiler
      // see traceur --longhelp for list of options
      options: {
        sourceMaps: false,
        modules: 'amd'
      }
    }
  });
};
```

## Supported Karma Launchers

Traceur is an ES6 to ES5 transpiler, and as such, does not support older browsers without ES5 support like IE8 or PhantomJS. (This is the case for any Traceur-compiled code, not just that produced by karma-ember-rocks-traceur.)

----

For more information on Karma see the [homepage].

[Karma Ember Rocks Traceur][karma-ember-rocks-traceur] was based on [Karma Ember Rocks Traceur][karma-traceur-preprocessor] to be using the [ember-rocks];


[karma-ember-rocks-traceur]: https://github.com/alexferreira/karma-ember-rocks-traceur
[karma-traceur-preprocessor]: https://github.com/karma-runner/karma-traceur-preprocessor
[homepage]: http://karma-runner.github.com
[traceur-compiler]: https://github.com/google/traceur-compiler
[source-map-overview]: https://hacks.mozilla.org/2013/05/compiling-to-javascript-and-debugging-with-source-maps/
[configure-requirejs]: http://karma-runner.github.io/0.10/plus/requirejs.html
[ember-rocks]: https://github.com/mattma/ember-rocks