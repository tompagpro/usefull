import { useAuth } from "../context/useAuth";

export const Welcome = () => {
  const { user } = useAuth();

  return (
    <div className="p-24 mx-0 my-auto w-full">
      <h1 className="text-xl">Bonjour {user?.username} !</h1>
      <h2></h2>
    </div>
  );
};
