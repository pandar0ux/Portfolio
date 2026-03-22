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
      <h1>Portfolio</h1>
      <p>Welcome to my portfolio website.</p>
      <p>
        <Link to="/signin">Se connecter</Link>
      </p>
    </div>
  );
}
