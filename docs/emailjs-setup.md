# Настройка EmailJS для формы на synecology.by

Нужно завести **новый официальный аккаунт EmailJS** и подключить **Яндекс-почту** (`synecology@yandex.by`).
Gmail не используем: токен OAuth отваливается, письма перестают уходить.

Бесплатный план: 200 писем в месяц.

После настройки пришлите три значения: **Service ID**, **Template ID**, **Public Key**.

---

## 1. Регистрация

1. Откройте https://dashboard.emailjs.com/sign-up
2. Зарегистрируйтесь через Google или email/пароль.
3. Подтвердите почту, если EmailJS попросит.

---

## 2. Подключить почту (не Gmail)

1. В левом меню: **Email Services**.
2. **Add New Service**.
3. В блоке **Personal Services** выберите **Yandex**.
4. Имя сервиса: `Synecology` (можно любое).
5. Нажмите **Connect Account** и войдите в `synecology@yandex.by`.
6. Разрешите доступ.
7. Нажмите **Create Service** / **Add Service**.

Если Яндекса нет в списке — Outlook или Custom SMTP. **Gmail не брать.**

**Скопировать отсюда:** `Service ID`  
Пример вида: `service_xxxxxxx`

---

## 3. Шаблон письма

1. В левом меню: **Email Templates** → **Create New Template**.
2. Можно взять готовый шаблон **Contact Us**.
3. Заполните поля:

| Поле | Значение |
|------|----------|
| **To Email** | `synecology@yandex.by` |
| **From Name** | `{{from_name}}` |
| **Reply To** | `{{reply_to}}` |
| **Subject** | `Заявка с сайта: {{project_type}}` |

4. В **Content** вставьте:

```
Имя: {{from_name}}
Телефон: {{phone}}
Email: {{from_email}}
Интерес: {{project_type}}
```

Имена переменных должны быть **точно такими**:
`from_name`, `from_email`, `phone`, `project_type`, `reply_to`.

Получатель заявки (**To Email**) настраивается только в шаблоне EmailJS, не в коде сайта.

5. Нажмите **Save**.

**Скопировать отсюда:** `Template ID`  
Пример вида: `template_xxxxxxx`

---

## 4. Public Key

1. В левом меню: **Account** → **General** (иногда вкладка **API Keys**).
2. Скопируйте **Public Key**.

Пример вида: `AbCdEfGhIjKlMnOpQr`

---

## 5. Разрешить домены сайта

В **Account** найдите **Allowed Origins** (или **Restrict API to these origins**) и добавьте:

- `https://synecology.by`
- `https://www.synecology.by`
- `http://localhost:5001`

Без этого с сайта письма могут не уходить (ошибка 403).

---

## Что прислать разработчику

Три строки:

```
SERVICE_ID: service_...
TEMPLATE_ID: template_...
PUBLIC_KEY: ...
```

После этого ключи подставят в код, и форма снова будет слать письма на `synecology@yandex.by`.

---

## Письмо приходит на Gmail, но не на Яндекс

1. **Email Templates** → ваш шаблон → поле **To Email**  
   Должно быть `synecology@yandex.by`. Если там gmail — заявки уходят только на gmail. **Save**.

2. Проверьте **Cc / Bcc** в том же шаблоне — иногда gmail оставили в копии.

3. На **synecology@yandex.by**: папка **Спам**, фильтры, «Почтовые программы».

4. **Email Services** → **History** — статус отправки «Sent» или ошибка.

5. Яндекс иногда плохо показывает письма, отправленные **на тот же ящик** через SMTP (EmailJS). Если To уже yandex, но inbox пуст — посмотрите **Отправленные** и спам; при необходимости временно поставьте To на другой ящик с пересылкой на yandex.

6. На **проде** (synecology.by) могут быть **старые ключи** EmailJS с Gmail-сервисом — нужен деплой с актуальным кодом.
