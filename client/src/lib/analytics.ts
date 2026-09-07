import React from "react";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsEvent =
  | "phone_click"
  | "messenger_click"
  | "email_click"
  | "form_submit"
  | "cta_click";

export function trackEvent(
  event: AnalyticsEvent,
  params: Record<string, string | boolean | number> = {},
) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });

  if (typeof window.gtag === "function") {
    window.gtag("event", event, params);
  }
}

export function trackCtaClick(label: string, location: string) {
  trackEvent("cta_click", { label, location });
}

export function trackPhoneClick(location: string) {
  trackEvent("phone_click", { location });
}

export function trackEmailClick(location: string) {
  trackEvent("email_click", { location });
}

export function trackMessengerClick(messenger: string, location: string) {
  trackEvent("messenger_click", { messenger, location });
}

export function trackFormSubmit(params: Record<string, string>) {
  trackEvent("form_submit", params);
}

function flattenChildrenText(children: React.ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children).trim();
  }
  if (Array.isArray(children)) {
    return children.map(flattenChildrenText).join(" ").replace(/\s+/g, " ").trim();
  }
  if (React.isValidElement(children) && children.props?.children) {
    return flattenChildrenText(children.props.children);
  }
  return "";
}

export function getLinkAnalyticsLabel(
  children: React.ReactNode,
  fallback = "CTA",
): string {
  return flattenChildrenText(children) || fallback;
}
