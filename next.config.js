const withImages = require("next-images");
module.exports = withImages({
  env: {
    IPINFO_KEY: process.env.IPINFO_KEY
  }
});
