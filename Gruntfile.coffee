# Please install `grunt` locally and install `grunt-cli` globally.
module.exports = ->

  # Initialize the configuration.
  @initConfig

    # Empty and remove `dist/` directory.
    clean: ["dist/"]

    # Run your source code through JSHint's defaults.
    jshint: ["app/**/*.js"]

    # This task uses James Burke's excellent r.js AMD builder to take all
    # modules and concatenate them into a single file.
    requirejs:
      release:
        options:
          # Include the main configuration file.
          mainConfigFile: "app/config.js"

          # Setting the base url to the distribution directory allows the
          # Uglify minification process to correctly map paths for Source
          # Maps.
          baseUrl: "dist/app"

          # Include Almond to slim down the built filesize.
          name: "almond"

          # Set the Bootstrap as the main entry point.
          include: ["main"]
          insertRequire: ["main"]

          # Since we bootstrap with nested `require` calls this option allows
          # R.js to find them.
          findNestedDependencies: true

          # Wrap everything in an IIFE.
          wrap: true

          # Output file.
          out: "dist/source.min.js"

          # Enable Source Map generation.
          generateSourceMaps: true

          # Do not preserve any license comments when working with source maps.
          # These options are incompatible.
          preserveLicenseComments: false

          # Minify using UglifyJS.
          optimize: "uglify2"

    # This task simplifies working with CSS inside Backbone Boilerplate
    # projects.  Instead of manually specifying your stylesheets inside the
    # HTML, you can use `@imports` and this task will concatenate only those
    # paths.
    styles:
      # Out the concatenated contents of the following styles into the below
      # development file path.
      "dist/styles.css":
        # Point this to where your `index.css` file is location.
        src: "app/styles/index.css"

        # The relative path to use for the @imports.
        paths: ["app/styles"]

        # Rewrite image paths during release to be relative to the `img`
        # directory.
        forceRelative: "/"

    # Minfiy the distribution CSS.
    cssmin:
      release:
        files:
          "dist/styles.min.css": ["dist/styles.css"]

    server:
      options:
        host: "0.0.0.0"
        port: 8000

      development: {}

      release:
        options:
          prefix: "dist"

    processhtml:
      release:
        files:
          "dist/index.html": ["index.html"]

    # Move vendor and app logic during a build.
    copy:
      release:
        files: [
          { src: ["app/**"], dest: "dist/" },
          { src: "vendor/**", dest: "dist/" }
        ]

    compress:
      release:
        files:
          "dist/source.min.js.gz": ["dist/source.min.js"]

  # Grunt contribution tasks.
  @loadNpmTasks("grunt-contrib-clean")
  @loadNpmTasks("grunt-contrib-jshint")
  @loadNpmTasks("grunt-contrib-cssmin")
  @loadNpmTasks("grunt-contrib-copy")
  @loadNpmTasks("grunt-contrib-compress")

  # Third-party tasks.
  @loadNpmTasks("grunt-processhtml")

  # Grunt BBB tasks.
  @loadNpmTasks("grunt-bbb-server")
  @loadNpmTasks("grunt-bbb-requirejs")
  @loadNpmTasks("grunt-bbb-styles")

  # When running the default Grunt command, just lint the code.
  @registerTask("default", [
    "clean", "jshint", "processhtml", "copy", "requirejs", "styles", "cssmin",
    "compress"
  ])
