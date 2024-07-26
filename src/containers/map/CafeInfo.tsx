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

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { phone, place_name, place_url, road_address_name } = cafe;

  return (
    <div className="p-4 bg-white rounded-2xl shadow-[0_-2px_10px_0_rgba(48,48,48,0.1)]">
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-lg">{place_name}</h2>
        <div className="flex flex-col text-md text-gray-800 gap-1">
          <div className="flex items-center gap-2">
            <MapPin className="size-5 text-secondary" />
            {road_address_name}
          </div>
          <div className="flex items-center gap-2">
            <Phone className="size-5 text-secondary" />
            {phone}
          </div>
          <div className="flex items-center gap-2">
            <LinkIcon className="size-5 text-secondary" />
            <Link href={place_url} target="_blank">
              <span className="underline underline-offset-2">{place_url}</span>
            </Link>
          </div>
        </div>
      </div>
      <Button
        onClick={onClick}
        className="text-white font-bold mt-11 w-full text-md h-12"
      >
        {buttonTitle}
      </Button>
    </div>
  );
};

export default CafeInfo;
