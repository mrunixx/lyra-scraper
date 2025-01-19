import { LinkedInUser } from "../../../../../packages/db/src/schema";

type Props = {
  user: LinkedInUser;
};

const LinkedInUserCard = ({ user }: Props) => {
  return (
    <div className="">
      {user.firstName}
      {user.lastName}
      {user.headline}
      {user.publicIdentifier}
    </div>
  );
};

export default LinkedInUserCard;
