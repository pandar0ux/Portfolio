import type { Route } from "./+types/about";
import { Link } from "react-router";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "À Propos - Mon Portfolio" },
        { name: "description", content: "Découvrez mon histoire et mes compétences" },
    ];
}

export default function About() {
    return (
        <div className="about-container">
            <header className="header">
                <nav className="navbar">
                    <Link to="/" className="nav-link">Accueil</Link>
                    <Link to="/about" className="nav-link active">À Propos</Link>
                </nav>
            </header>

            <main className="main-content">
                <section className="about-hero">
                    <h1>À Propos de Moi</h1>
                    <p className="subtitle">Développeur passionné par la création web</p>
                </section>

                <section className="about-section">
                    <h2>Mon Histoire</h2>
                    <p>
                        Je suis un développeur web créatif avec une passion pour la création
                        d'expériences numériques élégantes et performantes. Avec une expertise
                        en React, TypeScript et technologies modernes, je transforme les idées
                        en solutions web innovantes.
                    </p>
                </section>

                <section className="about-section">
                    <h2>Mes Compétences</h2>
                    <ul className="skills-list">
                        <li>React & React Router</li>
                        <li>TypeScript</li>
                        <li>Vite</li>
                        <li>CSS & Design Responsive</li>
                        <li>Docker</li>
                        <li>Frontend Development</li>
                    </ul>
                </section>

                <section className="about-section">
                    <h2>Ma Philosophie</h2>
                    <p>
                        Je crois que le code doit être à la fois fonctionnel et beau. Chaque
                        projet que j'entreprends est une opportunité de créer quelque chose
                        d'exceptionnel qui fait une réelle différence pour les utilisateurs.
                    </p>
                </section>

                <section className="about-section">
                    <h2>Contactez-moi</h2>
                    <p>
                        Intéressé par une collaboration ? N'hésitez pas à me contacter pour
                        discuter de vos projets !
                    </p>
                </section>
            </main>
        </div>
    );
}
