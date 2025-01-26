import type { LinkedInUser } from "../../../../../packages/db/src/schema";

interface Props {
  user: LinkedInUser;
}

const LinkedInUserCard = ({ user }: Props) => {
  return (
    <div className="flex flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-sm text-gray-500">{user.headline}</p>
      </div>
      <a
        href={`https://www.linkedin.com/in/${user.publicIdentifier}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block rounded-md bg-blue-500 px-4 py-2 text-center text-white transition duration-200 hover:bg-blue-600"
      >
        View LinkedIn Profile
      </a>
    </div>
  );
};

export default LinkedInUserCard;
