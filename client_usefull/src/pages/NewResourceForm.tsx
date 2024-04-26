import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../context/useAuth";
import { useLocation } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  username: z
    .string()
    .min(4, {
      message: "Le nom d'utilisateur doit faire au moins 4 caractères.",
    })
    .max(20, {
      message: "Le nom d'utilisateur doit moins de 20 caractères.",
    }),

});

type FormFields = z.infer<typeof schema>;


export const NewResourceForm = () => {
  const { user } = useAuth();
  const location = useLocation();
  const defaultUsername = location.state?.user || "";
  console.log("state => ", location.state);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { username } = data;

  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Adresse de la ressource (Url)
          </label>
          <div className="mt-2">
            <input
              id="username"
              {...register("username")}
              type="text"
              // autoComplete="username"
              defaultValue={defaultUsername}
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
          </div>
          <div className="mt-2">
            <input
              id="password"
              // {...register("e")}
              type="password"
              autoComplete="current-password"
              placeholder="**********"
              className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {/* {errors.password && (
              <div className="text-error">{errors.password.message}</div>
            )} */}
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
              // {...register("e")}
              type="password"
              autoComplete="current-password"
              placeholder="**********"
              className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />

            {/* {errors.password && (
              <div className="text-error">{errors.password.message}</div>
            )} */}
          </div>
        </div>
        {/* Honeypot ?*/}

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isSubmitting ? "Loading..." : "Enregistrer"}
          </button>
        </div>
      </form>
      {errors.root && <div className="text-error">{errors.root.message}</div>}
    </div>
  );
}
