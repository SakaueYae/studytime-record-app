type AlertProps = {
  text?: string;
};

export const Alert = ({ text }: AlertProps) => {
  return (
    <div className="text-red-600">{text ?? "入力内容にエラーがあります。"}</div>
  );
};
