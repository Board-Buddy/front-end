interface Props {
  message: string;
}

const EmptyFallback = ({ message }: Props) => {
  return (
    <div className="pt-16 text-center">
      <p className="mb-4 whitespace-pre-line text-center text-gray-700">
        {message}
      </p>
    </div>
  );
};

export default EmptyFallback;
