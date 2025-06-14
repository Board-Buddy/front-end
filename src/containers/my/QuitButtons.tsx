import LogoutButton from './LogoutButton';
import WithdrawalButton from './WithdrawalButton';

const QuitButtons = () => {
  return (
    <div className="flex gap-4 pt-8">
      <LogoutButton />
      <WithdrawalButton />
    </div>
  );
};

export default QuitButtons;
