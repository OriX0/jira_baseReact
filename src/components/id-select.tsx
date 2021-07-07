/*
 * @Description: 通用的二次封装的select组件 解决id为非number类型导致的错误
 * @Author: OriX
 * @LastEditors: OriX
 */
import { Select } from "antd";
// 从antd 的select组件中获取props的所有类型
type SelectAntdProps = React.ComponentProps<typeof Select>;
// 定义参数接口
interface IdSelectProps
  extends Omit<
    SelectAntdProps,
    "value" | "onChange" | "options" | "defaultOptionName"
  > {
  value?: string | number | null | undefined;
  onChange?: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}

export const IdSelect = (props: IdSelectProps) => {
  // 从props中解构获取参数
  const { value, onChange, defaultOptionName, options, ...restOption } = props;
  //
  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={(value) => onChange?.(toNumber(value))}
      {...restOption}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => {
        return (
          <Select.Option key={option.id} value={option.id}>
            {option.name}
          </Select.Option>
        );
      })}
    </Select>
  );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
