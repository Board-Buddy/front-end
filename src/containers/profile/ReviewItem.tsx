import Image, { StaticImageData } from 'next/image';

interface Props {
  imageSrc: StaticImageData;
  altText: string;
  label: string;
  count: number;
}

const ReviewItem = ({ imageSrc, altText, label, count }: Props) => (
  <div className="flex items-center gap-4 py-1.5">
    <Image src={imageSrc} alt={altText} width={50} height={50} />
    <div className="flex h-12 items-center justify-center rounded-xl rounded-bl-none bg-bgGray px-8">
      <p className="font-bold text-gray-600">{label}</p>
    </div>
    <div className="h-fit -translate-x-8 rounded-xl bg-primary px-2.5">
      <p className="text-sm font-bold text-white">
        {count.toString().padStart(2, '0')}
      </p>
    </div>
  </div>
);

export default ReviewItem;
