import { Link } from "react-router-dom";

export const NotFoundErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center absolute m-auto top-0 right-0 left-0 bottom-0 w-80 h-80 bg-base-100">
      <h1 className="mb-8 font-bold">Oups !</h1>
      <p className="mb-6">Nous n'avons pas pu trouver cette page 😕</p>
      <Link to={"/"} className="btn btn-primary">
        Retour à la page d'accueil
      </Link>
    </div>
  );
};
