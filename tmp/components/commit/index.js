define("components/commit/index",
  [],
  function() {
    "use strict";
    module.exports = {
      Collection: require("components/commit/collection"),

      Views: {
        Item: require("components/commit/item/view"),
        List: require("components/commit/list/view")
      }
    };

  });