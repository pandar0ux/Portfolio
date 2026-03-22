import {
    Link,
    useNavigate,
    useNavigation,
    type MetaFunction,
} from "react-router";
import { useState, type FormEvent } from "react";

type ActionData = {
    fieldErrors?: {
        name?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
    };
    values?: {
        name: string;
        email: string;
    };
};

export const meta: MetaFunction = () => {
    return [
        { title: "Créer un compte | Portfolio" },
        { name: "description", content: "Crée ton compte pour accéder à ton espace." },
    ];
};

export default function SignUp() {
    const navigate = useNavigate();
    const navigation = useNavigation();
    const [actionData, setActionData] = useState<ActionData | null>(null);
    const isSubmitting = navigation.state === "submitting";

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const name = String(formData.get("name") ?? "").trim();
        const email = String(formData.get("email") ?? "").trim();
        const password = String(formData.get("password") ?? "");
        const confirmPassword = String(formData.get("confirmPassword") ?? "");

        const fieldErrors: ActionData["fieldErrors"] = {};

        if (!name) {
            fieldErrors.name = "Le nom est requis.";
        } else if (name.length < 2) {
            fieldErrors.name = "Le nom doit contenir au moins 2 caractères.";
        }

        if (!email) {
            fieldErrors.email = "L'email est requis.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            fieldErrors.email = "Format d'email invalide.";
        }

        if (!password) {
            fieldErrors.password = "Le mot de passe est requis.";
        } else if (password.length < 8) {
            fieldErrors.password = "Le mot de passe doit contenir au moins 8 caractères.";
        }

        if (!confirmPassword) {
            fieldErrors.confirmPassword = "Merci de confirmer le mot de passe.";
        } else if (confirmPassword !== password) {
            fieldErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
        }

        if (fieldErrors.name || fieldErrors.email || fieldErrors.password || fieldErrors.confirmPassword) {
            setActionData({
                fieldErrors,
                values: { name, email },
            });
            return;
        }

        setActionData(null);
        navigate("/signin");
    }

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-10 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
            <div className="mx-auto w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <h1 className="text-2xl font-semibold">Créer un compte</h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    Renseigne tes informations pour créer ton compte.
                </p>

                <form onSubmit={onSubmit} className="mt-6 space-y-5" noValidate>
                    <div>
                        <label htmlFor="name" className="mb-1 block text-sm font-medium">
                            Nom
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            defaultValue={actionData?.values?.name ?? ""}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none ring-blue-500 focus:ring-2 dark:border-gray-700 dark:bg-gray-800"
                            placeholder="Ton nom"
                            required
                        />
                        {actionData?.fieldErrors?.name ? (
                            <p className="mt-1 text-sm text-red-600">{actionData.fieldErrors.name}</p>
                        ) : null}
                    </div>

                    <div>
                        <label htmlFor="email" className="mb-1 block text-sm font-medium">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            defaultValue={actionData?.values?.email ?? ""}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none ring-blue-500 focus:ring-2 dark:border-gray-700 dark:bg-gray-800"
                            placeholder="toi@example.com"
                            required
                        />
                        {actionData?.fieldErrors?.email ? (
                            <p className="mt-1 text-sm text-red-600">{actionData.fieldErrors.email}</p>
                        ) : null}
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-1 block text-sm font-medium">
                            Mot de passe
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none ring-blue-500 focus:ring-2 dark:border-gray-700 dark:bg-gray-800"
                            placeholder="••••••••"
                            required
                        />
                        {actionData?.fieldErrors?.password ? (
                            <p className="mt-1 text-sm text-red-600">{actionData.fieldErrors.password}</p>
                        ) : null}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium">
                            Confirmer le mot de passe
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none ring-blue-500 focus:ring-2 dark:border-gray-700 dark:bg-gray-800"
                            placeholder="••••••••"
                            required
                        />
                        {actionData?.fieldErrors?.confirmPassword ? (
                            <p className="mt-1 text-sm text-red-600">{actionData.fieldErrors.confirmPassword}</p>
                        ) : null}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {isSubmitting ? "Création..." : "Créer mon compte"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
                    Déjà inscrit ?{" "}
                    <Link to="/signin" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                        Se connecter
                    </Link>
                </p>
            </div>
        </main>
    );
}
