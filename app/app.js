import $ from "jquery";
import _ from "underscore";
import Backbone from "backbone";
import Layout from "layoutmanager";

// Alias the module for easier identification.
var app = {};

// The root path to run the application through.
app.root = "/";

// API endpoint.
app.api = "https://api.github.com/";

// Useful defaults for GitHub Viewer.
_.extend(Backbone.Collection.prototype, {
  cache: true,

  initialize: function(models, options) {
    // Automatically extend in passed options.
    _.extend(this, options);

    // Listen for request and sync events to control the `isRequest` flag.
    this.on({
      request: function() {
        this.isRequest = true;
      },

      sync: function() {
        this.isRequest = false;
      }
    });

    // By default the collection is not in a request.
    this.isRequest = false;
  },

  parse: function(obj) {
    // Safety check ensuring only valid data is used.
    if (obj.data.message !== "Not Found") {
      return obj.data;
    }

    return this.models;
  }
});

export default app;
