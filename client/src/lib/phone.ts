export function formatBelarusPhone(value: string): string {
  const digits = value.replace(/\D/g, "");

  let normalized = digits;
  if (normalized.startsWith("375")) {
    normalized = normalized.slice(3);
  } else if (normalized.startsWith("80")) {
    normalized = normalized.slice(2);
  }

  normalized = normalized.slice(0, 9);

  let formatted = "+375";
  if (normalized.length > 0) {
    formatted += ` (${normalized.slice(0, 2)}`;
  }
  if (normalized.length >= 2) {
    formatted += `) ${normalized.slice(2, 5)}`;
  }
  if (normalized.length >= 5) {
    formatted += `-${normalized.slice(5, 7)}`;
  }
  if (normalized.length >= 7) {
    formatted += `-${normalized.slice(7, 9)}`;
  }

  return formatted;
}

export function isValidBelarusPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length === 12 && digits.startsWith("375");
}

export function phoneToTel(value: string): string {
  return `+${value.replace(/\D/g, "")}`;
}
