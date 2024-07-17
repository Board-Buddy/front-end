import { Dispatch, SetStateAction } from 'react';

const LocationSettingButton = ({
  location,
  setLocation,
}: {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
}) => {
  return <p>{location}</p>;
};

export default LocationSettingButton;
