import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getDirectusBlog } from "./routes/directus-blog.js";
import { DIRECTUS_URL } from "./directus-config.js";

export async function registerRoutes(app: Express): Promise<Server> {
  // Register Directus blog route
  app.get("/api/directus-blog", getDirectusBlog);


  // Directus proxy endpoint for case studies
  app.get("/api/directus-cases", async (req, res) => {
    try {
      const directusUrl = `${DIRECTUS_URL}/items/case_studies?fields=*`;

      console.log('Proxying request to Directus:', directusUrl);

      const response = await fetch(directusUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      console.log('Directus response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Directus error response:', errorText);
        return res.status(500).json({
          status: 500,
          message: `Directus API error: ${response.status} - ${errorText.substring(0, 200)}`
        });
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const responseText = await response.text();
        console.error('Non-JSON response from Directus:', responseText.substring(0, 300));
        return res.status(500).json({
          status: 500,
          message: `Expected JSON from Directus but received ${contentType}: ${responseText.substring(0, 100)}`
        });
      }

      const data = await response.json();
      console.log('Successfully fetched from Directus, data length:', data?.data?.length || 0);

      // Return the data as-is from Directus
      res.status(200).json(data);
    } catch (error) {
      console.error("Directus proxy error:", error);
      res.status(500).json({
        message: `Proxy error: ${error.message || 'Unknown error'}`
      });
    }
  });

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { firstName, phone, interest, email } = req.body;

      if (!phone || !interest) {
        return res.status(400).json({
          message: "Обязательные поля: телефон и интересующая услуга",
        });
      }

      const phoneDigits = String(phone).replace(/\D/g, "");
      if (phoneDigits.length !== 12 || !phoneDigits.startsWith("375")) {
        return res.status(400).json({
          message: "Некорректный номер телефона. Используйте формат +375 (XX) XXX-XX-XX",
        });
      }

      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({
            message: "Некорректный email адрес",
          });
        }
      }

      res.status(200).json({
        message: "Заявка успешно отправлена!",
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({
        message: "Ошибка сервера. Попробуйте позже.",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}