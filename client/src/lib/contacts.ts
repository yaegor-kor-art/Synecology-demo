const PHONE_E164 = "375296024280";

export const CONTACTS = {
  phone: {
    display: "+375 (29) 602-42-80",
    tel: `+${PHONE_E164}`,
  },
  email: "synecology@yandex.by",
  messengers: {
    telegram: `https://t.me/+${PHONE_E164}`,
    viber: `viber://chat?number=${PHONE_E164}`,
    whatsapp: `https://wa.me/${PHONE_E164}`,
  },
  address: "г. Минск, пр-т. Газеты звезда д.16, пом. 53, офис 5В",
  workingHours: "Пн-Пт: 9:00 - 18:00",
} as const;

export const CTA_LABELS = {
  consultation: "Получить консультацию",
  freeConsultation: "Бесплатная консультация",
  costEstimate: "Получить расчет стоимости",
  commercialOffer: "Получить коммерческое предложение",
  callNow: "Позвонить сейчас",
} as const;

export const INTEREST_OPTIONS = [
  "Инвентаризация выбросов",
  "Инвентаризация отходов",
  "ОВОС",
  "Экологический паспорт",
  "Паспорт ГОУ",
] as const;

export const LEAD_MAGNET_ITEMS = [
  "Бесплатный аудит экологической документации",
  "Проверка необходимых документов",
  "Чек-лист подготовки к экологической проверке",
  "Бесплатная консультация эколога",
  "Предварительная оценка стоимости сопровождения",
] as const;

export const FORM_VALUE_PROPOSITION =
  "Получите бесплатную консультацию эколога. Мы выявим возможные риски, проверим текущую ситуацию и предложим варианты решения.";
