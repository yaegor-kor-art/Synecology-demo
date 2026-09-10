import emailjs from "@emailjs/browser";

export const EMAILJS_CONFIG = {
  SERVICE_ID: "service_mzr5mpq",
  TEMPLATE_ID: "template_8p4lm8b",
  PUBLIC_KEY: "K97JbpQHZV_m1Taa4",
};

emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

export default emailjs;
