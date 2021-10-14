module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })

    return config
  },
  env: {
    MONGODB_URI: "mongodb://localhost",
    MONGODB_DB: "alda-florist",
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/home",
  //       destination: "/",
  //       permanent: false,
  //     },
  //   ]
  // },
}
