import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  deleteResourceApi,
  getResourcesByCategoryApi,
  getResourcesByTagApi,
} from "../services/RessourceService";
import { useAuth } from "../context/useAuth";
import { Tag } from "../components/TagsMenu";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { toast } from "react-toastify";
import { handleError } from "../helpers/ErrorHandler";
import { EmptyResource } from "../components/EmptyResource";
import { formatShortDate, getDomain } from "../helpers/Formatters";

type Resource = {
  id: string;
  url: string;
  title: string;
  alreadyRead: boolean;
  createdAt: Date;
  updatedAt: Date;
  category: Category;
  tags: Tag[];
};

type Category = {
  id: string;
  name: string;
};

export const Resources = () => {
  const { token } = useAuth();
  const { state } = useLocation();
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null
  );

  const toReadCount = resources.filter((r) => !r.alreadyRead).length;

  const handleDelete = async (resourceId: string) => {
    console.log("resource :", resourceId);
    try {
      await deleteResourceApi(token, resourceId);
      toast.success("La ressource a bien été supprimée");
    } catch (error) {
      handleError(error);
    }
  };

  const handleModal = (action: boolean, resource: Resource | null = null) => {
    const modalElement = document.getElementById(
      "delete-modal"
    ) as HTMLDialogElement | null;
    // Show modal when action param is true, close when false
    if (action) {
      setSelectedResource(resource);
      modalElement?.showModal();
    } else {
      setSelectedResource(null);
      modalElement?.close();
    }
  };

  useEffect(() => {
    const fetchResourcesByCategory = async (categoryId: string | undefined) => {
      if (categoryId) {
        const data = await getResourcesByCategoryApi(token, categoryId);
        setResources(data);
      }
    };
    const fetchResourcesByTag = async (tagId: string | undefined) => {
      if (tagId) {
        console.log("TAGID ->", tagId);
        const data = await getResourcesByTagApi(token, tagId);
        setResources(data);
      }
    };
    if (Object.keys(state).includes("categoryId")) {
      fetchResourcesByCategory(state.categoryId);
    } else if (Object.keys(state).includes("tagId")) {
      fetchResourcesByTag(state.tagId);
    }
  }, [token, state]);

  return (
    <div>
      <header className="mb-5 flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">
          {state.categoryName}
        </h1>
        {resources.length > 0 && (
          <p className="text-base-content/70">
            {resources.length} ressource{resources.length > 1 && "s"} ·{" "}
            {toReadCount} à lire
          </p>
        )}
      </header>

      {resources.length > 0 ? (
        <ul className="divide-y divide-base-300 overflow-hidden rounded-box border border-base-300 bg-base-100">
          {resources.map((resource) => (
            <li
              key={`Resource-${resource.id}`}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 md:px-5"
            >
              {/* Unread marker, fixed width so titles stay aligned */}
              <span className="flex w-2 justify-center">
                {!resource.alreadyRead && (
                  <span className="h-2 w-2 rounded-full bg-primary">
                    <span className="sr-only">À lire</span>
                  </span>
                )}
              </span>

              <div className="min-w-0 flex-1 basis-60">
                <p
                  className={`truncate text-base ${
                    resource.alreadyRead
                      ? "text-base-content/70"
                      : "font-semibold"
                  }`}
                >
                  {resource.title}
                </p>
                <p className="truncate text-base-content/70">
                  {getDomain(resource.url)} ·{" "}
                  {formatShortDate(resource.createdAt)}
                </p>
              </div>

              {resource.tags && resource.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {resource.tags.map((tag) => (
                    <span
                      key={`Tag-${tag.name}-Resource-${resource.id}`}
                      className="rounded-md bg-primary/10 px-2 py-0.5 text-xs text-primary"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}

              <button
                className="btn btn-square btn-ghost text-base-content/70 hover:text-error"
                aria-label={`Supprimer ${resource.title}`}
                onClick={() => handleModal(true, resource)}
              >
                <DeleteOutlineIcon />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyResource />
      )}

      {/* One modal for the whole list: an id must be unique in the page */}
      <dialog id="delete-modal" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-semibold">
            Êtes-vous sûr de vouloir supprimer cette ressource ?
          </h3>
          <p className="py-4 text-base-content/70">
            {selectedResource?.title}
          </p>
          <div className="modal-action">
            <button className="btn btn-ghost" onClick={() => handleModal(false)}>
              Annuler
            </button>
            <button
              className="btn btn-error"
              onClick={() =>
                selectedResource && handleDelete(selectedResource.id)
              }
            >
              Supprimer
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};
