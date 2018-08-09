"use strict";

module.exports = function(app, server){
	app.use("/annotatedMetadata", require("./routes/annotatedMetadata")(app, server));
};
