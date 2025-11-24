import AppLink from '@/components/AppLink';
import { Button } from '@/components/ui/button';
import { Cafe } from '@/types/map';
import { Link as LinkIcon, MapPin, Phone } from 'lucide-react';

interface Props {
  cafe: Cafe | null;
  onClick: () => void;
  buttonTitle: string;
}

const CafeInfo = ({ cafe, onClick, buttonTitle }: Props) => {
  if (cafe === null) return null;

  const { phone, placeName, placeUrl, roadAddressName } = cafe;

  return (
    <div className="h-64 bg-white p-4 shadow-[0_-2px_10px_0_rgba(48,48,48,0.1)]">
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold">{placeName}</h2>
        <div className="flex min-h-[114px] flex-col gap-1 text-base text-gray-800">
          {roadAddressName !== '' && (
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-[#FFF7EA] p-1.5">
                <MapPin className="size-5 text-secondary" />
              </div>
              {roadAddressName}
            </div>
          )}
          {phone !== '' && (
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-[#FFF7EA] p-1.5">
                <Phone className="size-5 text-secondary" />
              </div>
              {phone}
            </div>
          )}
          {placeUrl !== '' && (
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-[#FFF7EA] p-1.5">
                <LinkIcon className="size-5 text-secondary" />
              </div>
              <AppLink href={placeUrl}>
                <span className="underline underline-offset-2">{placeUrl}</span>
              </AppLink>
            </div>
          )}
        </div>
      </div>
      <Button
        onClick={onClick}
        className="mt-3 h-12 w-full text-base font-bold text-white"
      >
        {buttonTitle}
      </Button>
    </div>
  );
};

export default CafeInfo;
