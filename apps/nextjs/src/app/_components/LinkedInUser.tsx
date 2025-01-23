import type { LinkedInUser } from "../../../../../packages/db/src/schema";

interface Props {
  user: LinkedInUser;
}

const LinkedInUserCard = ({ user }: Props) => {
  return (
    <div className="flex flex-col p-4 bg-white shadow-lg rounded-lg border border-gray-200 max-w-sm">
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
        className="inline-block text-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
      >
        View LinkedIn Profile
      </a>
    </div>
  );
};

export default LinkedInUserCard;