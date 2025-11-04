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
  // const { categoryId } = useParams<Record<string, string | undefined>>();
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null
  );
  // const categoryName = decodeURIComponent(location.pathname.split("/")[2]);

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
        // console.log("fetch resources by category =>", data);
        setResources(data);
      }
    };
    const fetchResourcesByTag = async (tagId: string | undefined) => {
      if (tagId) {
        console.log("TAGID ->", tagId);
        const data = await getResourcesByTagApi(token, tagId);
        // console.log("fetch resources by category =>", data);
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
    <div style={{ padding: "0 8px" }}>
      <h1 className="mb-4 text-2xl text-primary font-bold">
        {state.categoryName}
      </h1>
      <div className="flex flex-col gap-4">
        {resources.length > 0 ? (
          resources.map((resource) => (
            <div className="flex" key={`Resource-${resource.id}`}>
              <div className="collapse collapse-arrow bg-base-100 shadow-md mr-4">
                <input type="radio" name="my-accordion-2" />
                <div
                  className={`collapse-title text-xl font-medium ${
                    resource.alreadyRead ? "" : "text-secondary"
                  }`}
                >
                  {resource.title}
                </div>
                <div className="collapse-content flex flex-col gap-1">
                  {resource.alreadyRead ? <p>true</p> : <p>false</p>}

                  <div className="flex">
                    {resource.tags &&
                      resource.tags.map((tag) => (
                        <div
                          key={`Tag-${tag.name}-Resource-${resource.title}`}
                          className="badge badge-secondary badge-outline mr-1"
                        >
                          {tag.name}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <button onClick={() => handleModal(true, resource)}>
                  <DeleteOutlineIcon
                    fontSize="large"
                    className="text-red-400 hover:text-red-600 cursor-pointer"
                  />
                </button>
                <dialog id="delete-modal" className="modal">
                  <div className="modal-box">
                    <h3 className="text-lg font-medium">
                      Êtes-vous sur de voir supprimer cette ressource :
                    </h3>
                    <p className="py-4 text-primary">
                      {selectedResource?.title}
                    </p>
                    <div className="flex justify-end items-center">
                      <button
                        className="mr-2 hover:text-secondary"
                        onClick={() => handleModal(false)}
                      >
                        Annuler
                      </button>
                      <button
                        className="btn btn-outline btn-primary"
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
            </div>
          ))
        ) : (
          <EmptyResource />
        )}
      </div>
    </div>
  );
};
