import { useState } from "react";

function App() {
  const defaultValue = { content: "", hour: 0 };
  const [formValue, setFormValue] = useState(defaultValue);
  const [sum, setSum] = useState(0);
  const [isError, setIsError] = useState(false);

  return (
    <>
      <div>
        <label>
          学習内容
          <input
            name="study-content"
            value={formValue.content}
            onChange={(e) =>
              setFormValue((prev) => ({ ...prev, content: e.target.value }))
            }
          />
        </label>
      </div>
      <div>
        <label>
          学習時間
          <input
            type="number"
            name="study-hour"
            value={formValue.hour}
            min={0}
            onChange={(e) =>
              setFormValue((prev) => ({
                ...prev,
                hour: Number(e.target.value),
              }))
            }
          />
          時間
        </label>
      </div>
      <div>入力されている学習内容：{formValue.content}</div>
      <div>入力されている学習時間：{formValue.hour}</div>
      <input
        type="submit"
        value="登録"
        onClick={() => {
          if (formValue.content === "" || formValue.hour === 0)
            setIsError(true);
          else {
            setIsError(false);
            setSum((sum) => sum + formValue.hour);
            setFormValue(defaultValue);
          }
        }}
      />
      {isError && <div>入力されていない項目があります</div>}
      <div>合計時間：{sum}/1000(h)</div>
    </>
  );
}

export default App;
