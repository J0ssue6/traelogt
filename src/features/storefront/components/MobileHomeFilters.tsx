import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";

function MobileHomeFilters() {
  const navigate = useNavigate();
  const { t } = useTranslation("storefront");

  return (
    <div className="sticky top-[112px] z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:hidden">
      <div className="flex items-center gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="shrink-0 rounded-full"
          onClick={() => navigate("/products")}
        >
          {t("mobileFilters.all")}
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="shrink-0 rounded-full"
          onClick={() => navigate("/products")}
        >
          {t("mobileFilters.new")}
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="shrink-0 rounded-full"
          onClick={() => navigate("/products")}
        >
          {t("mobileFilters.popular")}
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="shrink-0 rounded-full"
          onClick={() => navigate("/products")}
        >
          {t("mobileFilters.featured")}
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="shrink-0 gap-1 rounded-full"
          onClick={() => navigate("/categories")}
        >
          {t("mobileFilters.categories")}
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}

export default MobileHomeFilters;
