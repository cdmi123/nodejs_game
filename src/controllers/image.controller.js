const Image = require("../models/image.model");
const asyncHandler = require("../utils/async-handler");

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_CONTENT_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp"
]);

function hasMatchingSignature(buffer, contentType) {
  switch (contentType) {
    case "image/jpeg":
      return buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
    case "image/png":
      return buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    case "image/gif":
      return ["GIF87a", "GIF89a"].includes(buffer.subarray(0, 6).toString("ascii"));
    case "image/webp":
      return (
        buffer.length >= 12 &&
        buffer.toString("ascii", 0, 4) === "RIFF" &&
        buffer.toString("ascii", 8, 12) === "WEBP"
      );
    default:
      return false;
  }
}

const uploadImage = asyncHandler(async (req, res) => {
  let contentType;
  let data;

  if (req.file) {
    contentType = req.file.mimetype;
    data = req.file.buffer;
  } else {
    const { image, contentType: requestedContentType } = req.body || {};

    if (typeof image !== "string") {
      return res.status(400).json({
        error: "Provide an image file or a Base64 image string"
      });
    }

    const dataUrlMatch = image.match(/^data:(image\/(?:jpeg|png|gif|webp));base64,(.+)$/);
    contentType = dataUrlMatch ? dataUrlMatch[1] : requestedContentType;
    const base64 = dataUrlMatch ? dataUrlMatch[2] : image;

    const validBase64 =
      base64.length > 0 &&
      base64.length % 4 === 0 &&
      /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(base64);

    if (!validBase64) {
      return res.status(400).json({ error: "image must contain valid Base64 data" });
    }

    data = Buffer.from(base64, "base64");
  }

  if (!ALLOWED_CONTENT_TYPES.has(contentType)) {
    return res.status(400).json({
      error: "Image must be JPEG, PNG, GIF, or WebP"
    });
  }

  if (data.length > MAX_IMAGE_SIZE) {
    return res.status(413).json({ error: "Image must be 5 MB or smaller" });
  }

  if (!hasMatchingSignature(data, contentType)) {
    return res.status(400).json({
      error: "The image data does not match the specified content type"
    });
  }

  const savedImage = await Image.create({ contentType, data });

  res.status(201).json({
    data: {
      id: savedImage.id,
      contentType: savedImage.contentType,
      size: data.length,
      url: `/image/${savedImage.id}`
    }
  });
});

const getImage = asyncHandler(async (req, res) => {
  const image = await Image.findById(req.params.id);

  if (!image) {
    return res.status(404).json({ error: "Image not found" });
  }

  res
    .status(200)
    .set("Content-Type", image.contentType)
    .set("Content-Length", image.data.length)
    .set("X-Content-Type-Options", "nosniff")
    .send(image.data);
});

module.exports = { uploadImage, getImage };
