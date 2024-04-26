import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getResourcesByCategoryApi } from "../services/RessourceService";
import { useAuth } from "../context/useAuth";

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

type Tag = {
  id: string;
  name: string;
};

export const Resources = () => {
  const { token } = useAuth();
  const { categoryId } = useParams<Record<string, string | undefined>>();
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    const fetchResourcesByCategory = async (categoryId: string | undefined) => {
      if (categoryId) {
        const data = await getResourcesByCategoryApi(token, categoryId);
        console.log("fetch resources by category =>", data);
        setResources(data);
      }
    };
    fetchResourcesByCategory(categoryId?.toString());
  }, [categoryId, token]);

  return (
    <div style={{ padding: "0 8px" }}>
      {/* <div className="flex flex-wrap gap-4">
        {resources ? (
          resources.map((resource) => (
            <div
              className="card w-96 bg-base-100 shadow-xl"
              key={`Resource-${resource.id}`}
            >
              <div className="card-body">
                <h2
                  className={`card-title ${
                    resource.alreadyRead ? "" : "text-red-500"
                  }`}
                >
                  {resource.title}
                </h2>
                {resource.tags &&
                  resource.tags.map((tag) => (
                    <p key={`Tag-${tag.name}-Resource-${resource.title}`}>
                      {tag.name}
                    </p>
                  ))}
                <div className="card-actions justify-end">
                  <button className="btn btn-outline btn-primary">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Il n'y a pas encore de ressource dans cette catégorie !</p>
        )}
      </div> */}

      <div className="flex flex-col gap-2">
        {resources ? (
          resources.map((resource) => (
            <div
              className="collapse collapse-arrow bg-base-100 shadow-md"
              key={`Resource-${resource.id}`}
            >
              <input type="radio" name="my-accordion-2" />
              <div
                className={`collapse-title text-xl font-medium ${
                  resource.alreadyRead ? "" : "text-primary"
                }`}
              >
                {resource.title}
              </div>
              <div className="collapse-content flex gap-1">
                {resource.tags &&
                  resource.tags.map((tag) => (
                    // <p key={`Tag-${tag.name}-Resource-${resource.title}`}>
                    //   {tag.name}
                    // </p>
                    <div key={`Tag-${tag.name}-Resource-${resource.title}`} className="badge badge-secondary badge-outline">{tag.name}</div>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <p>Il n'y a pas encore de ressource dans cette catégorie !</p>
        )}
      </div>
    </div>
  );
};
