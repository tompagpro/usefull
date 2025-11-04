import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../context/useAuth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategoryApi } from "../services/CategoryService";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Ce champ doit être renseigné.",
    })
});

type FormFields = z.infer<typeof schema>;

export const NewCategoryForm = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { name } = data;
    const id = await createCategoryApi(token, name);
    if (id) {
      navigate(`/usr/${name}/resources`, { state: { categoryId : id } });
    }
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Nom de la catégorie
          </label>
          <div className="mt-2">
            <input
              id="name"
              {...register("name")}
              type="text"
              placeholder="Cuisine"
              className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.name && (
              <div className="text-error">{errors.name.message}</div>
            )}
          </div>
        </div>

        {/* Honeypot ?*/}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full btn btn-outline btn-secondary"
            // className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isSubmitting ? "Chargement..." : "Enregistrer"}
          </button>
        </div>
      </form>
      {errors.root && <div className="text-error">{errors.root.message}</div>}
    </div>
  );
};
