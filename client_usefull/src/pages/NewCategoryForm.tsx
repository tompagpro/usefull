import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../context/useAuth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategoryApi } from "../services/CategoryService";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  name: z.string().min(1, {
    message: "Ce champ doit être renseigné.",
  }),
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
      navigate(`/usr/${name}/resources`, { state: { categoryId: id } });
    }
  };

  return (
    <div className="mx-auto mt-4 max-w-lg">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">
        Nouvelle catégorie
      </h1>
      <form
        className="space-y-5 rounded-box border border-base-300 bg-base-100 p-6 md:p-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor="name" className="mb-1.5 block font-medium">
            Nom de la catégorie
          </label>
          <input
            id="name"
            {...register("name")}
            type="text"
            placeholder="Cuisine"
            className="input input-bordered w-full"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-error">{errors.name.message}</p>
          )}
        </div>

        {/* Honeypot ?*/}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full"
        >
          {isSubmitting ? "Chargement..." : "Enregistrer"}
        </button>
        {errors.root && (
          <p className="text-sm text-error">{errors.root.message}</p>
        )}
      </form>
    </div>
  );
};
