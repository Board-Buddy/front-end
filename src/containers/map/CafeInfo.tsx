import { Button } from '@/components/ui/button';
import { Cafe } from '@/types/map';
import { Link as LinkIcon, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

interface Props {
  cafe: Cafe | null;
  onClick: () => void;
  buttonTitle: string;
}

const CafeInfo = ({ cafe, onClick, buttonTitle }: Props) => {
  if (cafe === null) return null;

  const { phone, placeName, placeUrl, roadAddressName } = cafe;

  return (
    <div className="p-4 bg-white rounded-2xl shadow-[0_-2px_10px_0_rgba(48,48,48,0.1)]">
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-lg">{placeName}</h2>
        <div className="flex flex-col text-md text-gray-800 gap-1 min-h-[114px]">
          {roadAddressName !== '' && (
            <div className="flex items-center gap-2">
              <div className="bg-[#FFF7EA] p-1.5 rounded-full">
                <MapPin className="size-5 text-secondary" />
              </div>
              {roadAddressName}
            </div>
          )}
          {phone !== '' && (
            <div className="flex items-center gap-2">
              <div className="bg-[#FFF7EA] p-1.5 rounded-full">
                <Phone className="size-5 text-secondary" />
              </div>
              {phone}
            </div>
          )}
          {placeUrl !== '' && (
            <div className="flex items-center gap-2">
              <div className="bg-[#FFF7EA] p-1.5 rounded-full">
                <LinkIcon className="size-5 text-secondary" />
              </div>
              <Link href={placeUrl} target="_blank">
                <span className="underline underline-offset-2">{placeUrl}</span>
              </Link>
            </div>
          )}
        </div>
      </div>
      <Button
        onClick={onClick}
        className="text-white font-bold mt-3 w-full text-md h-12"
      >
        {buttonTitle}
      </Button>
    </div>
  );
};

export default CafeInfo;
