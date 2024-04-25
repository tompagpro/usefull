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
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <Link to={"/login"} className="btn btn-ghost">
              Se connecter
            </Link>
            <Link to={"/register"} className="btn btn-primary">
              Créer un compte
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
