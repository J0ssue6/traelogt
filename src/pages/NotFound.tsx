import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NotFound() {
  const { t } = useTranslation("notFound");

  return (
    <div className="min-h-screen flex items-center justify-center  bg-background">
      <div className="w-full max-w-lg text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Traelogt
        </p>

        <h1 className="mt-4 text-6xl font-bold tracking-tight">404</h1>

        <h2 className="mt-4 text-2xl font-semibold">{t("title")}</h2>

        <p className="mt-3 text-muted-foreground">{t("description")}</p>

        <div className="mt-8 flex gap-2 justify-center gap-3">
          <Link to="/" className="font-medium hover:text-accent">
            {t("actions.home")}
          </Link>

          <Link to="/products" className="font-medium hover:text-accent">
            {t("actions.shop")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
