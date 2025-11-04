// import { Navbar } from "../components/Navbar";
import background from "../assets/hero-img.jpg"
import { Link } from "react-router-dom";

export const GuestHomepage = () => {
  return (
    <>
      <div
        className="hero min-h-screen w-full"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-10 text-5xl text-primary font-bold">Usefull</h1>
            <p className="mb-10 text-xl">
              Trop d'onglets ouverts dans votre navigateur ? <br/>
              Des dossiers entiers d'articles en favori ? <br/>
              Avec Usefull, c'est terminé ! Usefull est l'application qui vous aide à organiser vos ressources.
            </p>
            <Link to={"/login"} className="btn btn-ghost mr-2 text-primary">
              Se connecter
            </Link>
            <Link to={"/register"} className="btn btn-primary ml-2">
              Créer un compte
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
