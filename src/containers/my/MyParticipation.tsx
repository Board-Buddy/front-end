const MyParticipation = ({ joinCount }: { joinCount: number }) => {
  return (
    <div className="border-b-[1px] border-gray-200 py-4 px-1">
      <div className="flex justify-between items-center text-md">
        <div className="flex gap-2">참여 횟수 {joinCount}</div>
      </div>
    </div>
  );
};

export default MyParticipation;