/*
 * @Description:wdyr
 * @Author: OriX
 * @LastEditors: OriX
 */
import React from "react";

if (process.env.NODE_ENV === "development") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  whyDidYouRender(React, {
    trackAllPureComponents: false,
    // 是否跟踪所有的函数组件
  });
}
