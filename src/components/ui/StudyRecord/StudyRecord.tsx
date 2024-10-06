import { useState } from "react";
import { Modal } from "../Modal/Modal";

export type StudyRecordType = {
  id: string;
  title: string;
  time: number;
};

type StudyRecordProps = {
  studyRecord: StudyRecordType[];
  deleteStudyRecord: (id: string) => void;
};

export const StudyRecord = ({
  studyRecord,
  deleteStudyRecord,
}: StudyRecordProps) => {
  const [currentTarget, setCurrentTarget] = useState<{
    targetRecord: StudyRecordType;
    resolve: (isOk: boolean) => void;
  } | null>(null);

  const handleModal = async (value: StudyRecordType) => {
    const ok = await new Promise((resolve) => {
      setCurrentTarget({ targetRecord: value, resolve });
    });
    if (!ok) return;
    await deleteStudyRecord(value.id);
  };

  return (
    <div className="mt-4 grow overflow-auto">
      <p className="font-medium text-lg">完了した学習</p>
      <div>
        {studyRecord.map((value) => (
          <div key={value.id} className="flex gap-8 justify-between my-4">
            <div>
              <p>{value.title}</p>
              <p>{value.time}h</p>
            </div>
            <button className="bg-blue-400" onClick={() => handleModal(value)}>
              削除
            </button>
          </div>
        ))}
      </div>
      <Modal
        isVisible={currentTarget !== null}
        studyRecord={
          currentTarget?.targetRecord ?? {
            id: "",
            title: "",
            time: 0,
          }
        }
        onClickCancel={() => {
          currentTarget?.resolve(false);
          setCurrentTarget(null);
        }}
        onClickDelete={() => {
          currentTarget?.resolve(true);
          setCurrentTarget(null);
        }}
      />
    </div>
  );
};
