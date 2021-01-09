//favico error middleware
exports.favicoError = (req, res, next) => {
	if (req.originalUrl && req.originalUrl.split("/").pop() === "favicon.ico") {
		return res.sendStatus(204);
	}

	return next();
};
