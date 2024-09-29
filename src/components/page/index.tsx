import { Form, FormType } from "../ui/Form/Form";
import { StudyRecord, StudyRecordType } from "../ui/StudyRecord/StudyRecord";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import { Loading } from "../ui/Loading/Loading";
import { Title } from "../ui/Title/Title";

export const Page = () => {
  const [studyRecord, setStudyRecord] = useState<StudyRecordType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
      await getStudyRecord();
    })();
  }, []);

  const getStudyRecord = async () => {
    try {
      (async () => {
        const { data, error } = await supabase.from("study-record").select("*");
        if (error) throw error;
        if (!data) return;
        setStudyRecord(data);
      })();
    } catch (e) {
      console.log(e);
    }
  };

  const createStudyRecord = async (value: FormType) => {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from("study-record")
        .insert(value)
        .select("*");
      if (error) throw error;
      await getStudyRecord();
      setIsLoading(false);
      return true;
    } catch {
      return false;
    }
  };

  const deleteStudyRecord = async (id: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from("study-record")
        .delete()
        .eq("id", id);
      if (error) throw error;
      await getStudyRecord();
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-screen h-screen p-3 flex flex-col items-center bg-blue-200">
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <>
          <Title />
          <Form createStudyRecord={createStudyRecord} />
          <StudyRecord
            studyRecord={studyRecord}
            deleteStudyRecord={deleteStudyRecord}
          />
        </>
      )}
    </div>
  );
};
