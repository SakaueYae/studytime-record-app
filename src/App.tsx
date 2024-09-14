import { useEffect, useState } from "react";
import { supabase } from "./utils/supabase";
import { Form } from "./components/ui/Form/Form";

function App() {
  const defaultValue = { title: "", time: 0 };
  const [formValue, setFormValue] = useState(defaultValue);
  const [studyRecord, setStudyRecord] = useState([]);
  const [sum, setSum] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const { data, error } = await supabase
        .from("study-record")
        .insert(formValue)
        .select("*");
      if (error) throw new Error(error.message);
      if (!data) return;
      setStudyRecord([...studyRecord, ...data]);
      setSum((sum) => sum + formValue.time);
      setFormValue(defaultValue);
    } catch (e) {
      setIsError(true);
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const { error } = await supabase
        .from("study-record")
        .delete()
        .eq("id", id);
      if (error) throw new Error(error.message);
      setStudyRecord((studyRecord) =>
        studyRecord.filter(({ id: dataId }) => id !== dataId)
      );
      setSum((sum) => sum - formValue.time);
    } catch (e) {
      setIsError(true);
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      (async () => {
        const { data, error } = await supabase.from("study-record").select("*");
        if (error) throw new Error(error.message);
        if (!data) return;
        setStudyRecord(data);
        setSum((sum) => sum + formValue.time);
        setFormValue(defaultValue);
      })();
    } catch (e) {
      setIsError(true);
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <Form />

      {isError && <div>入力されていない項目があります</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>
            完了した学習
            {studyRecord.map(({ id, title, time }) => (
              <div key={id}>
                <div>内容：{title}</div>
                <div>時間：{time}h</div>
                <input
                  type="submit"
                  value="削除"
                  onClick={() => {
                    handleDelete(id);
                  }}
                />
              </div>
            ))}
          </div>
          <div>合計時間：{sum}/1000(h)</div>
        </>
      )}
    </>
  );
}

export default App;
