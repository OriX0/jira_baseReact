/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import { Rate } from "antd";

interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}
// 收藏 钉住 组件
export const Pin = ({ checked, onCheckedChange, ...restProps }: PinProps) => {
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(num) => onCheckedChange?.(!!num)}
      {...restProps}
    />
  );
};
