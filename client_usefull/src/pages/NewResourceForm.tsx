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
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
      <h1 className="mb-8 text-xl text-primary font-bold text-center">
        Nouvelle ressource
      </h1>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Catégorie
          </label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                className="mt-2 text-sm font-medium leading-6 text-gray-900"
                options={categories}
                placeholder="Choisir..."
                {...field}
              />
            )}
          />
        </div>
        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Adresse de la ressource (Url)
          </label>
          <div className="mt-2">
            <input
              id="url"
              {...register("url")}
              type="url"
              onBlur={handleOnBlur}
              placeholder="https://www.tompaganel.fr/contact"
              className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.url && (
              <div className="text-error">{errors.url.message}</div>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Tags
          </label>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <CreatableSelect
                className="mt-2 text-sm font-medium leading-6 text-gray-900"
                isMulti
                options={tags}
                placeholder="Choisir..."
                {...field}
              />
            )}
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Titre
            </label>
          </div>
          <div className="mt-2">
            <input
              id="title"
              {...register("title")}
              disabled={!watch("url")} // disable input when url empty
              type="text"
              placeholder="Eloquent Javascript, 3rd Edition"
              className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Marquer comme lue ?</span>
            <input
              id="alreadyRead"
              {...register("alreadyRead")}
              type="checkbox"
              className="checkbox checkbox-primary"
            />
          </label>
        </div>

        {/* Honeypot ?*/}

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isSubmitting ? "Loading..." : "Ajouter"}
          </button>
        </div>
      </form>
      {errors.root && <div className="text-error">{errors.root.message}</div>}
    </div>
  );
};
