type AlertProps = {
  text?: string;
};

export const Alert = ({ text }: AlertProps) => {
  return (
    <div className="text-red-600 font-medium text-sm text-center">
      {text ?? "入力内容にエラーがあります。"}
    </div>
  );
};
