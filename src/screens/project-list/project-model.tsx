/*
 * @Description: x新建项目的弹框
 * @Author: OriX
 * @LastEditors: OriX
 */
import { Button, Drawer } from "antd";

export const ProjectModal = () => {
  return (
    <Drawer
      // TODO:设置modal的 关闭及默认课时
      onClose={() => console.log("关闭model 的方法")}
      visible={false}
      width={"100%"}
    >
      <h1>Project Modal</h1>
      {/* // TODO:设置modal的 关闭及默认课时 */}
      <Button onClick={() => console.log("关闭model 的方法")}>关闭</Button>
    </Drawer>
  );
};
