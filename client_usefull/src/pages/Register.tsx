import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "../context/useAuth";
import { Link } from "react-router-dom";
import { AuthenticationHeader } from "../components/AuthenticationHeader";

// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const schema = z.object({
  username: z
    .string()
    .min(4, {
      message: "Le nom d'utilisateur doit faire au moins 4 caractères.",
    })
    .max(20, {
      message: "Le nom d'utilisateur doit moins de 20 caractères.",
    }),
  email: z
    .string()
    .email("Il ne s'agit pas d'un email valide.")
    .min(1, {
      message: "Ce champ doit être renseigné.",
    }),
  password: z
    .string()
    .min(8, { message: "Le mot de passe contient au moins 8 caractères." })
    .regex(passwordValidation, {
      message: "Le mot de passe n'est pas correct.",
    }),
});

type FormFields = z.infer<typeof schema>;

export const Register = () => {
  const { registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { email, username, password } = data;
    registerUser(email, username, password);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <AuthenticationHeader title="Créer votre compte" />

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
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email")}
                  type="text"
                  placeholder="johnd@mail.com"
                  className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <div className="text-error">{errors.email.message}</div>
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
                {isSubmitting ? "Loading..." : "Inscription"}
              </button>
            </div>
          </form>
          {errors.root && (
            <div className="text-error">{errors.root.message}</div>
          )}
          <p className="mt-10 text-center text-sm text-gray-500">
            Déjà membre ?{" "}
            <Link
              to={"/login"}
              className="font-semibold leading-6 text-primary hover:text-indigo-500"
            >
              Connectez-vous !
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
