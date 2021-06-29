/*
 * @description:
 * @Author: OriX
 * @LastEditors: OriX
 */
const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#79d2d2" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
