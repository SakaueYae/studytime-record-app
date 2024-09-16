import { StudyRecordType } from "../StudyRecord/StudyRecord";

type ModalProps = {
  isVisible: boolean;
  studyRecord: StudyRecordType;
  onClickCancel: () => void;
  onClickDelete: () => void;
};

export const Modal = ({
  isVisible,
  studyRecord,
  onClickCancel,
  onClickDelete,
}: ModalProps) => {
  return (
    <div
      className={`w-screen h-screen bg-gray-500 bg-opacity-80 fixed top-0 left-0 flex flex-col items-center justify-center ${
        !isVisible && "hidden"
      }`}
    >
      <div className="max-w-md bg-white max-h-72 rounded-md text-center p-5">
        <p>以下の記録を削除します。よろしいでしょうか？</p>
        <p className="font-medium">{studyRecord.title}</p>
        <p className="font-medium">{studyRecord.time}h</p>
        <div className="flex justify-between ">
          <button className="text-white bg-gray-600 " onClick={onClickCancel}>
            キャンセル
          </button>
          <button className="text-white bg-red-600" onClick={onClickDelete}>
            削除する
          </button>
        </div>
      </div>
    </div>
  );
};
