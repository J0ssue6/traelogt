import { ArrowUpRight, Mail, MapPin, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  SiInstagram,
  SiFacebook,
  // SiTiktok,
} from "@icons-pack/react-simple-icons";

import logo from "@/assets/logo.png";
import LanguageSwitcher from "@/features/i18n/components/LanguageSwitcher";

import { siteConfig } from "@/config/site";

function StoreFooter() {
  const { t } = useTranslation("storefront");

  return (
    <footer className="hidden border-t bg-background md:block">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Brand / introduction */}
        <div className="border-b py-14 sm:py-16 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-2xl">
              <Link
                to="/"
                className="inline-flex items-center gap-2"
                aria-label="Traelogt"
              >
                <img
                  src={logo}
                  alt=""
                  aria-hidden="true"
                  className="h-10 w-auto object-contain sm:h-12"
                />

                <span className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Trae<span className="text-accent">logt</span>
                </span>
              </Link>

              <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
                {t("footer.brand.description")}
              </p>
            </div>

            <Link
              to="/products"
              className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-accent"
            >
              {t("footer.brand.cta")}

              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-14">
          <FooterColumn title={t("footer.navigation.shop.title")}>
            <FooterLink to="/products">
              {t("footer.navigation.shop.allProducts")}
            </FooterLink>

            <FooterLink to="/categories">
              {t("footer.navigation.shop.categories")}
            </FooterLink>

            <FooterLink to="/products">
              {t("footer.navigation.shop.featured")}
            </FooterLink>
          </FooterColumn>

          <FooterColumn title={t("footer.navigation.explore.title")}>
            <FooterLink to="/">
              {t("footer.navigation.explore.home")}
            </FooterLink>

            <FooterLink to="/categories">
              {t("footer.navigation.explore.categories")}
            </FooterLink>

            <FooterLink to="/cart">
              {t("footer.navigation.explore.cart")}
            </FooterLink>
          </FooterColumn>

          <FooterColumn title={t("footer.navigation.support.title")}>
            <FooterLink to="/contact">
              {t("footer.navigation.support.contact")}
            </FooterLink>

            {/* <FooterLink to="/faq">
              {t("footer.navigation.support.faq")}
            </FooterLink> */}

            <FooterLink to="/shipping">
              {t("footer.navigation.support.shipping")}
            </FooterLink>
          </FooterColumn>

          <FooterColumn title={t("footer.navigation.connect.title")}>
            <a
              href="mailto:hello@traelogt.com"
              className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="size-4" />
              {t("footer.navigation.connect.email")}
            </a>

            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <SiInstagram className="size-5 text-muted-foreground transition-colors hover:text-accent" />
              </a>

              <a
                href={siteConfig.social.facebook}
                target="_blank"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <SiFacebook className="size-5 text-muted-foreground transition-colors hover:text-accent" />
              </a>

              {/* <a
                href={siteConfig.social.tiktok}
                target="_blank"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <SiTiktok className="size-5 text-muted-foreground transition-colors hover:text-accent" />
              </a> */}
            </div>

            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <span>{t("footer.navigation.connect.location")}</span>
            </div>
          </FooterColumn>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-6 border-t py-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:gap-4">
            <span>{t("footer.legal.copyright")}</span>

            <span className="hidden sm:inline" aria-hidden="true">
              ·
            </span>

            <div className="flex gap-4">
              <Link
                to="/privacy"
                className="transition-colors hover:text-foreground"
              >
                {t("footer.legal.privacy")}
              </Link>

              <Link
                to="/terms"
                className="transition-colors hover:text-foreground"
              >
                {t("footer.legal.terms")}
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MessageCircle className="size-4 text-accent" />

            <span className="text-sm text-muted-foreground">
              {t("footer.legal.language")}
            </span>

            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}

type FooterColumnProps = {
  title: string;
  children: React.ReactNode;
};

function FooterColumn({ title, children }: FooterColumnProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>

      <div className="mt-5 flex flex-col gap-3">{children}</div>
    </div>
  );
}

type FooterLinkProps = {
  to: string;
  children: React.ReactNode;
};

function FooterLink({ to, children }: FooterLinkProps) {
  return (
    <Link
      to={to}
      className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      {children}
    </Link>
  );
}

export default StoreFooter;
