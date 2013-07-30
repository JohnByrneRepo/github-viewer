var app = require("app");

var Item = require("components/commit/item/view");

module.exports = Backbone.Layout.extend({
  template: _.template(require("text!components/commit/list/template.html")),

  beforeRender: function() {
    this.options.commits.each(function(commit) {
      this.insertView("table", new Item({
        model: commit,
        repo: this.options.commits.repo,
        user: this.options.commits.user
      }));
    }, this);
  },

  serialize: function() {
    return { commits: this.options.commits };
  },

  initialize: function() {
    this.listenTo(this.options.commits, "reset sync request", this.render);
  }
});
