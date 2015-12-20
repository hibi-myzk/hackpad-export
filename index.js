var Hackpad = require("hackpad");
var mkdirp = require("mkdirp")
var fs = require("fs");
var getDirName = require("path").dirname;

var argv = require("optimist")
    .usage("Exports hackpad documents")

    .options("c", {
        alias: "client_id",
        describe: "The hackpad client ID"
    })

    .options("s", {
        alias: "secret",
        describe: "The hackpad secret"
    })

    .options("f", {
        alias: "format",
        describe: "The format to export the hackpad in (either 'html', 'md' or 'txt' - defaults to 'html')"
    })

    .options("d", {
        alias: "domain",
        describe: "The domain ID - defaults to blank"
    })

    .options("p", {
        alias: "path",
        describe: "The export path - defaults to domain or 'pads'"
    })

    .demand("c", "s")
    .argv;

if(argv.format && !(argv.format in { html: true, md: true, txt: true })) {
    throw new Error("Format must be 'html', 'md' or 'txt'");
}

var path = argv.path || argv.domain || "pads";
var option = (argv.domain != null) ? { site: argv.domain } : {};

var client = new Hackpad(argv.client_id, argv.secret, option);
var format = argv.format || "html";

var exportPads = function(ids) {
  ids.forEach(function(padId) {
      // Hackpad API's bug of text encoding
      var fmt = (format == "md") ? "txt" : format;

      client.export(padId, null, fmt, function(error, response) {
          if(error) {
              console.error(error);
          } else {
              var filePath = path + "/" + padId + "." + format;
              console.log(filePath);

              mkdirp(getDirName(filePath), function (err) {
                  if (err) {
                      console.error(err);
                  } else {
                      fs.writeFileSync(filePath, response);
                  }
              })
          }
      });
  });
};

if (0 < argv._.length) {
    exportPads(argv._);
} else {
    client.list(function(err, result) {
        if (err) {
            console.error(err);
        } else {
            exportPads(result);
        }
    });
}
