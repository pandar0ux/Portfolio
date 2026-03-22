import {
    Form,
    Link,
    redirect,
    useActionData,
    useNavigation,
    type ActionFunctionArgs,
    type MetaFunction,
} from "react-router";

type ActionData = {
    fieldErrors?: {
        email?: string;
        password?: string;
    };
    values?: {
        email: string;
    };
};

export const meta: MetaFunction = () => {
    return [
        { title: "Connexion | Portfolio" },
        { name: "description", content: "Connecte-toi pour accéder à ton espace admin." },
    ];
};

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    const fieldErrors: ActionData["fieldErrors"] = {};

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

    if (fieldErrors.email || fieldErrors.password) {
        return {
            fieldErrors,
            values: { email },
        } satisfies ActionData;
    }

    return redirect("/");
}

export default function SignIn() {
    const actionData = useActionData<typeof action>();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-10 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
            <div className="mx-auto w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <h1 className="text-2xl font-semibold">Connexion</h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    Connecte-toi à ton espace admin.
                </p>

                <Form method="post" className="mt-6 space-y-5" noValidate>
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
                            placeholder="admin@example.com"
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
                            autoComplete="current-password"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none ring-blue-500 focus:ring-2 dark:border-gray-700 dark:bg-gray-800"
                            placeholder="••••••••"
                            required
                        />
                        {actionData?.fieldErrors?.password ? (
                            <p className="mt-1 text-sm text-red-600">{actionData.fieldErrors.password}</p>
                        ) : null}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {isSubmitting ? "Connexion..." : "Se connecter"}
                    </button>
                </Form>

                <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
                    Retour à l'accueil :{" "}
                    <Link to="/" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                        Portfolio
                    </Link>
                </p>
            </div>
        </main>
    );
}
