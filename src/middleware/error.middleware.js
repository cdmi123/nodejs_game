function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err.type === "entity.too.large") {
    return res.status(413).json({ error: "Request body must be 7 MB or smaller" });
  }

  if (err.name === "MulterError") {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({ error: "Image must be 5 MB or smaller" });
    }

    return res.status(400).json({ error: err.message });
  }

  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Request body must contain valid JSON" });
  }

  if (err.name === "ValidationError") {
    const details = Object.values(err.errors).map((error) => error.message);
    return res.status(400).json({ error: "Validation failed", details });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ error: "Invalid resource ID" });
  }

  if (err.code === 11000) {
    return res.status(409).json({ error: "A user with this email already exists" });
  }

  console.error(err);
  res.status(500).json({ error: "Internal server error" });
}

module.exports = errorHandler;
