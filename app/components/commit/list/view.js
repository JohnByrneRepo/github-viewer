import app from "app";
import template from "text!components/commit/list/template.html";
import Item from "components/commit/item/view";

var Layout = Backbone.Layout.extend({
  template: _.template(template),

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

export default Layout;
