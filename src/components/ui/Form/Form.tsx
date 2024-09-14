import { useForm, useWatch } from "react-hook-form";
import { supabase } from "../../../utils/supabase";
import { Alert } from "../Alert/Alert";

type FormType = {
  title: string;
  time: number;
};

export const Form = () => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
    control,
  } = useForm();
  const title = useWatch({ control, name: "title" });
  const time = useWatch({ control, name: "time" });

  const handleRegister = async (value) => {
    try {
      const { data, error } = await supabase
        .from("study-record")
        .insert(value)
        .select("*");
      if (error) throw error;
      reset();
    } catch (e) {
      setError("root.server", {
        type: "serverError",
        message: e.message,
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="text-base font-medium">
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
        <label className="text-base font-medium ">
          学習時間
          <input
            className={`border border-solid  rounded font-normal ml-2 ${
              errors.time ? "border-red-600" : "border-blue-600"
            }`}
            type="number"
            {...register("time", { required: true, min: 0 })}
          />
          時間
        </label>
        {errors.time && <Alert text="入力必須項目です。" />}
      </div>
      <div>入力されている学習内容：{title}</div>
      <div>入力されている学習時間：{time}</div>
      <button onClick={handleSubmit(handleRegister)}>登録</button>
      {errors.root && <Alert text={errors.root.message} />}
    </div>
  );
};
