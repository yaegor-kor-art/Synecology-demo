import React from "react";
import { useLocation } from "wouter";
import { addFromParam } from "@/lib/navigation";
import { getLinkAnalyticsLabel, trackCtaClick } from "@/lib/analytics";

interface NavigationLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  openInNewTab?: boolean;
  analyticsLabel?: string;
  analyticsLocation?: string;
  trackCta?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  [key: string]: unknown;
}

function isInternalPageLink(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

function isContactLink(href: string): boolean {
  return href.split("?")[0] === "/contact";
}

export const NavigationLink: React.FC<NavigationLinkProps> = ({
  href,
  children,
  className = "",
  openInNewTab = true,
  analyticsLabel,
  analyticsLocation,
  trackCta,
  onClick,
  ...props
}) => {
  const [location] = useLocation();
  const linkHref = addFromParam(href, location);
  const isSamePage = location.split("?")[0] === href.split("?")[0];
  const shouldOpenNewTab = openInNewTab && isInternalPageLink(href) && !isSamePage;
  const shouldTrackCta = trackCta ?? isContactLink(href);

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (shouldTrackCta) {
      trackCtaClick(
        analyticsLabel || getLinkAnalyticsLabel(children),
        analyticsLocation || location || "unknown",
      );
    }
    onClick?.(event);
  };

  return (
    <a
      href={linkHref}
      className={className}
      onClick={handleClick}
      {...(shouldOpenNewTab
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      {...props}
    >
      {children}
    </a>
  );
};

export default NavigationLink;
