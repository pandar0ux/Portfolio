import { Link, type MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
};

export default function Home() {
  return (
    <div>
      <h1>Mon Portfolio</h1>

      <p>
        <Link to="/signin">Se connecter</Link>
      </p>
      <p>
        <Link to="/signup">Créer un compte</Link>
      </p>
    </div>
  );
}
