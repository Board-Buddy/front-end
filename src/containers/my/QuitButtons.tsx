import LogoutButton from './LogoutButton';
import WithdrawalButton from './WithdrawalButton';

const QuitButtons = () => {
  return (
    <div className="flex pt-8 gap-4">
      <LogoutButton />
      <WithdrawalButton />
    </div>
  );
};

export default QuitButtons;
