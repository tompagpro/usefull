import { Link } from "react-router-dom";
import { StyledLogo } from "../components/StyledLogo";
import { Typography } from "../components/Typography";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginAPI } from "../services/AuthService";

const schema = z.object({
  // email: z.string().email({ message: "Email invalide"}),
  username: z
    .string()
    .min(4, {
      message: "Le nom d'utilisateur doit faire au moins 4 caractères.",
    })
    .max(20, {
      message: "Le nom d'utilisateur doit moins de 20 caractères.",
    }),
  password: z
    .string()
    .min(8, { message: "Le mot de passe contient au moins 8 caractères" }),
});

type FormFields = z.infer<typeof schema>;

export const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const { username, password } = data;
      const response = await loginAPI(username, password);
      console.log(response);

      // throw new Error();
    } catch (error) {
      console.error(error);
      setError("root", {
        message: "Les données de connexions sont incorrectes.",
      });
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
          <StyledLogo className="bg-primary mb-4">U</StyledLogo>
          <Typography
            variant="subtitle1"
            fontWeight={700}
            className="text-primary"
          >
            Usefull
          </Typography>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Connectez-vous à votre compte
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nom d'utilisateur
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  {...register("username")}
                  type="text"
                  // autoComplete="username"
                  placeholder="johnd86"
                  className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.username && (
                  <div className="text-error">{errors.username.message}</div>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mot de passe
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-primary hover:text-indigo-500"
                  >
                    Mot de passe oublié ?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password")}
                  type="password"
                  autoComplete="current-password"
                  placeholder="**********"
                  className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <div className="text-error">{errors.password.message}</div>
                )}
              </div>
            </div>
            {/* Honeypot ?*/}

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isSubmitting ? "Loading..." : "Connexion"}
              </button>
            </div>
          </form>
          {errors.root && (
            <div className="text-error">{errors.root.message}</div>
          )}

          <p className="mt-10 text-center text-sm text-gray-500">
            Pas encore membre ?{" "}
            <Link
              to={"/register"}
              className="font-semibold leading-6 text-primary hover:text-indigo-500"
            >
              Inscrivez-vous, c'est gratuit !
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
