import { useForm, useWatch } from "react-hook-form";
import { Alert } from "../Alert/Alert";

export type FormType = {
  title: string;
  time: number;
};

type FormProps = {
  createStudyRecord: (record: FormType) => Promise<boolean>;
};

export const Form = ({ createStudyRecord }: FormProps) => {
  const defaultValue = {
    title: "",
    time: 0,
  };
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
    control,
  } = useForm<FormType>({
    defaultValues: defaultValue,
  });
  const title = useWatch({ control, name: "title" });
  const time = useWatch({ control, name: "time" });

  const handleRegister = async (value: FormType) => {
    const ok = await createStudyRecord(value);
    if (ok) reset(defaultValue);
    else
      setError("root.server", {
        type: "serverError",
      });
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div>
          <label className="text-lg font-medium">
            学習内容
            <input
              className={`border border-solid  rounded font-normal ml-2 ${
                errors.title ? "border-red-600" : "border-blue-600"
              }`}
              {...register("title", { required: true })}
            />
          </label>
          {errors.title && <Alert text="入力必須項目です。" />}
        </div>
        <div>
          <label className="text-lg font-medium ">
            学習時間
            <input
              className={`border border-solid  rounded font-normal ml-2 ${
                errors.time ? "border-red-600" : "border-blue-600"
              }`}
              type="number"
              {...register("time", { required: true, min: 1 })}
            />
            時間
          </label>
          {errors.time && <Alert text="入力必須項目です。" />}
        </div>
      </div>
      <div>
        <div>入力されている学習内容：{title}</div>
        <div>入力されている学習時間：{time}</div>
      </div>
      <button className="bg-blue-400" onClick={handleSubmit(handleRegister)}>
        登録
      </button>
      {errors.root && <Alert text={errors.root.message} />}
    </div>
  );
};
