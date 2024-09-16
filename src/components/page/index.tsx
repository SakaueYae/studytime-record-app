import { Form, FormType } from "../ui/Form/Form";
import { StudyRecord, StudyRecordType } from "../ui/StudyRecord/StudyRecord";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";

export const Page = () => {
  const [studyRecord, setStudyRecord] = useState<StudyRecordType[]>([]);

  useEffect(() => {
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
  }, []);

  const createStudyRecord = async (value: FormType) => {
    try {
      const { error } = await supabase
        .from("study-record")
        .insert(value)
        .select("*");
      if (error) throw error;
      return true;
    } catch {
      return false;
    }
  };

  const deleteStudyRecord = async (id: string) => {
    try {
      const { error } = await supabase
        .from("study-record")
        .delete()
        .eq("id", id);
      if (error) throw error;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-screen h-max p-3 flex flex-col items-center">
      <Form createStudyRecord={createStudyRecord} />
      <StudyRecord
        studyRecord={studyRecord}
        deleteStudyRecord={deleteStudyRecord}
      />
    </div>
  );
};
