import Image from 'next/image';

interface Props {
  imageSrc: string;
  altText: string;
  label: string;
  count: number;
}

const ReviewItem = ({ imageSrc, altText, label, count }: Props) => (
  <div className="flex items-center gap-4 py-1.5">
    <Image src={imageSrc} alt={altText} width={50} height={50} />
    <div className="bg-bgGray rounded-xl rounded-bl-none h-12 flex justify-center items-center px-8">
      <p className="font-bold text-gray-600">{label}</p>
    </div>
    <div className="bg-primary h-fit px-2.5 rounded-xl -translate-x-8">
      <p className="text-white font-bold text-sm">
        {count.toString().padStart(2, '0')}
      </p>
    </div>
  </div>
);

export default ReviewItem;
