import { StyledLogo } from "./StyledLogo";
import { Typography } from "./Typography";

export const AuthenticationHeader = ({ title }: { title: string }) => {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
      <StyledLogo className="bg-primary text-primary-content mb-4">
        U
      </StyledLogo>
      <Typography variant="subtitle1" fontWeight={700} className="text-primary">
        Usefull
      </Typography>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        {title}
      </h2>
    </div>
  );
};
