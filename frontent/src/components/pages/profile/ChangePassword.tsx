import type { UserType } from "../../../helpers/types";

const ChangePassword = ({
  open,
  setOpenChangePassword,
  user,
}: {
  open: boolean;
  setOpenChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType | null;
}) => {
  return <div>ChangePassword</div>;
};

export default ChangePassword;
