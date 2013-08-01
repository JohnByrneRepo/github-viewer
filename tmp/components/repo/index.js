define("components/repo/index",
  [],
  function() {
    "use strict";
    module.exports = {
      Collection: require("components/repo/collection"),

      Views: {
        Item: require("components/repo/item/view"),
        List: require("components/repo/list/view")
      }
    };

  });