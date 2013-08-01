define("config",
  [],
  function() {
    "use strict";
    // This is the runtime configuration file.  It complements the Gruntfile.js by
    // supplementing shared properties.
    require.config({
      paths: {
        // Make vendor easier to access.
        "vendor": "../vendor",
        "plugins": "../vendor/js/plugins",

        // Almond is used to lighten the output filesize.
        "almond": "../vendor/bower/almond/almond",

        // Opt for Lo-Dash Underscore compatibility build over Underscore.
        "underscore": "../vendor/bower/lodash/dist/lodash.underscore",

        // Map remaining vendor dependencies.
        "jquery": "../vendor/bower/jquery/jquery",
        "backbone": "../vendor/bower/backbone/backbone",
        "layoutmanager": "../vendor/bower/layoutmanager/backbone.layoutmanager",
        "text": "../vendor/bower/requirejs-text/text",
        "bootstrap": "../vendor/bower/bootstrap/dist/js/bootstrap"
      },

      shim: {
        // This is required to ensure Backbone works as expected within the AMD
        // environment.
        "backbone": {
          // These are the two hard dependencies that will be loaded first.
          deps: ["jquery", "underscore"],

          // This maps the global `Backbone` object to `require("backbone")`.
          exports: "Backbone"
        },

        // LayoutManager depends on Backbone.
        "layoutmanager": {
          deps: ["backbone"],

          init: function() {
            return this.Backbone.Layout;
          }
        },

        // Backbone.CollectionCache depends on Backbone.
        "plugins/backbone.collectioncache": ["backbone"],

        // Twitter Bootstrap depends on jQuery.
        "bootstrap": ["jquery"]
      }
    });

  });