import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../context/useAuth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createResourceApi, getTitleApi } from "../services/RessourceService";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useEffect, useState } from "react";
import { getTagsApi } from "../services/TagService";
import { getCategoriesApi } from "../services/CategoryService";
import { selectObjectConverter } from "../helpers/SelectObjectConverter";
import { SelectOptions } from "../types/selectOptions";
import { useNavigate } from "react-router-dom";
import { getSelectStyles } from "../helpers/SelectStyles";

const schema = z.object({
  url: z.string().url({ message: "Veuillez entrer une URL valide." }),
  title: z
    .string()
    .min(4, { message: "Le titre doit faire au moins 4 caractères." }),
  category: z.object({
    value: z.string(),
    label: z.string(),
  }),
  tags: z.array(z.object({ value: z.string(), label: z.string() })),
  alreadyRead: z.boolean(),
});

type FormFields = z.infer<typeof schema>;

export const NewResourceForm = () => {
  const urlRegex =
    // eslint-disable-next-line no-useless-escape
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  const [tags, setTags] = useState<SelectOptions[]>([]);
  const [categories, setCategories] = useState<SelectOptions[]>([]);
  const { token, logoutTriggered, logout } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  // ---- LOAD TAGS -----

  useEffect(() => {
    const fetchTags = async () => {
      const data = await getTagsApi(token);
      if (data.statusCode === 401 && !logoutTriggered) {
        logout();
      }
      const tagChoices: SelectOptions[] = selectObjectConverter(data);
      setTags(tagChoices);
    };
    fetchTags();
  }, [token, logout, logoutTriggered]);

  // ---- LOAD CATEGORIES -----

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategoriesApi(token);
      if (data.statusCode === 401 && !logoutTriggered) {
        logout();
      }
      const categoryChoices: SelectOptions[] = selectObjectConverter(data);
      // sort choices
      setCategories(categoryChoices);
    };

    fetchCategories();
  }, [token, logout, logoutTriggered]);

  // ------------------------
  console.log("ERRORS =>", errors);
  // ------------------------

  // ---- GET TITLE FROM URL INPUT -----

  const handleOnBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const urlInputValue = e.target.value;

    if (urlInputValue.match(urlRegex)) {
      const data = await getTitleApi(token, urlInputValue);
      if (data?.title) {
        setValue("title", data.title);
      }
    }
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { url, tags, category, title, alreadyRead } = data;
    let tagsName: string[] = [];
    if (tags.length >= 1) {
      tagsName = tags.map((tag) => tag.value);
    }
    console.log("TAGSNAME", tagsName);

    const resource = await createResourceApi(
      token,
      url,
      category.value,
      title,
      tagsName,
      alreadyRead
    );
    if (resource.category) {
      navigate(`/usr/${resource.category.name}/resources`, {
        state: { categoryId: resource.category.id },
      });
    }
  };

  return (
    <div className="mx-auto mt-4 max-w-lg">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">
        Nouvelle ressource
      </h1>
      <form
        className="space-y-5 rounded-box border border-base-300 bg-base-100 p-6 md:p-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor="category" className="mb-1.5 block font-medium">
            Catégorie
          </label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                inputId="category"
                styles={getSelectStyles<SelectOptions>()}
                options={categories}
                placeholder="Choisir..."
                {...field}
              />
            )}
          />
        </div>
        <div>
          <label htmlFor="url" className="mb-1.5 block font-medium">
            Adresse de la ressource (URL)
          </label>
          <input
            id="url"
            {...register("url")}
            type="url"
            onBlur={handleOnBlur}
            placeholder="https://www.tompaganel.fr/contact"
            className="input input-bordered w-full"
          />
          {errors.url && (
            <p className="mt-1 text-sm text-error">{errors.url.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="tags" className="mb-1.5 block font-medium">
            Tags
          </label>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <CreatableSelect
                inputId="tags"
                styles={getSelectStyles<SelectOptions, true>()}
                isMulti
                options={tags}
                placeholder="Choisir..."
                {...field}
              />
            )}
          />
        </div>

        <div>
          <label htmlFor="title" className="mb-1.5 block font-medium">
            Titre
          </label>
          <input
            id="title"
            {...register("title")}
            disabled={!watch("url")} // disable input when url empty
            type="text"
            placeholder="Eloquent Javascript, 3rd Edition"
            className="input input-bordered w-full"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-error">{errors.title.message}</p>
          )}
        </div>

        <label className="flex cursor-pointer items-center gap-3">
          <input
            id="alreadyRead"
            {...register("alreadyRead")}
            type="checkbox"
            className="checkbox checkbox-primary"
          />
          <span>Déjà lue</span>
        </label>

        {/* Honeypot ?*/}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full"
        >
          {isSubmitting ? "Chargement..." : "Ajouter"}
        </button>
        {errors.root && (
          <p className="text-sm text-error">{errors.root.message}</p>
        )}
      </form>
    </div>
  );
};
