import {
  ChevronRight,
  FileText,
  Globe,
  HelpCircle,
  Info,
  Mail,
  Moon,
  Shield,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { ThemeToggle } from "@/components/ThemeToggle";
import LanguageSwitcher from "@/features/i18n/components/LanguageSwitcher";

type MobileMoreSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function MobileMoreSheet({ open, onOpenChange }: MobileMoreSheetProps) {
  const { t } = useTranslation("storefront");

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="max-h-[85vh] rounded-t-3xl px-0 pb-[env(safe-area-inset-bottom)]"
      >
        <SheetHeader className="border-b px-6 pb-5 pt-2">
          <SheetTitle className="text-left text-xl font-bold">
            Trae<span className="text-accent">logt</span>
          </SheetTitle>
        </SheetHeader>

        <div className="overflow-y-auto px-6 py-5">
          <section>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("mobileMore.support.title")}
            </p>

            <div className="overflow-hidden rounded-2xl border">
              <MobileMoreLink
                to="/contact"
                icon={<Mail className="size-5" />}
                label={t("footer.navigation.support.contact")}
                onNavigate={() => onOpenChange(false)}
              />

              <MobileMoreLink
                to="/faq"
                icon={<HelpCircle className="size-5" />}
                label={t("footer.navigation.support.faq")}
                onNavigate={() => onOpenChange(false)}
              />

              <MobileMoreLink
                to="/shipping"
                icon={<Truck className="size-5" />}
                label={t("footer.navigation.support.shipping")}
                onNavigate={() => onOpenChange(false)}
              />
            </div>
          </section>

          <section className="mt-7">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("mobileMore.preferences.title")}
            </p>

            <div className="overflow-hidden rounded-2xl border">
              <div className="flex min-h-14 items-center justify-between gap-4 px-4">
                <div className="flex min-w-0 items-center gap-3">
                  <Globe className="size-5 shrink-0 text-muted-foreground" />

                  <span className="truncate text-sm font-medium">
                    {t("header.language.label")}
                  </span>
                </div>

                <div className="shrink-0">
                  <LanguageSwitcher />
                </div>
              </div>

              <div className="border-t" />

              <div className="flex min-h-14 items-center justify-between px-4">
                <div className="flex items-center gap-3">
                  <Moon className="size-5 text-muted-foreground" />

                  <span className="text-sm font-medium">
                    {t("mobileMore.preferences.appearance")}
                  </span>
                </div>

                <ThemeToggle />
              </div>
            </div>
          </section>

          <section className="mt-7">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("mobileMore.legal.title")}
            </p>

            <div className="overflow-hidden rounded-2xl border">
              <MobileMoreLink
                to="/privacy"
                icon={<Shield className="size-5" />}
                label={t("footer.legal.privacy")}
                onNavigate={() => onOpenChange(false)}
              />

              <MobileMoreLink
                to="/terms"
                icon={<FileText className="size-5" />}
                label={t("footer.legal.terms")}
                onNavigate={() => onOpenChange(false)}
              />
            </div>
          </section>

          <div className="mt-7 pb-2 text-center">
            <Link
              to="/"
              onClick={() => onOpenChange(false)}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Info className="size-4" />
              Traelogt
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

type MobileMoreLinkProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  onNavigate: () => void;
};

function MobileMoreLink({ to, icon, label, onNavigate }: MobileMoreLinkProps) {
  return (
    <SheetClose
      nativeButton={false}
      render={
        <Link
          to={to}
          onClick={onNavigate}
          className="flex min-h-14 items-center justify-between px-4 transition-colors hover:bg-muted/50"
        >
          <span className="flex items-center gap-3">
            <span className="text-muted-foreground">{icon}</span>

            <span className="text-sm font-medium">{label}</span>
          </span>

          <ChevronRight className="size-4 text-muted-foreground" />
        </Link>
      }
    />
  );
}

export default MobileMoreSheet;
