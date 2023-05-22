import Profile from "../../../pages/Profile";

//The page that appears at user/[user_id]:
const Page = ({ params }) => {
  const { user_id } = params;

  // return <div>{JSON.stringify(params)}</div>;
  return (
    <div>
      <Profile user_id={user_id} />
    </div>
  );
};

export default Page;
