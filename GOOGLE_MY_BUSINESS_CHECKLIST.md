# Checklist para que LISMAOT aparezca en Google

Este documento es para entregar al dueño del restaurante. Lo guía paso a paso para reclamar el perfil de Google y aparecer en búsquedas locales como *"comida Chitagá"*, *"hamburguesas Chitagá"*, etc. **Tiempo total: ~30 min.**

> **Nota técnica:** El código de la web ya está optimizado al 100% para SEO (meta tags, structured data Schema.org, sitemap.xml, robots.txt, geo-coordinates). Lo que falta es la parte que SOLO el dueño puede hacer porque requiere verificación de identidad por Google.

---

## 1. Crear / reclamar el Perfil de Empresa en Google (15 min)

### Paso 1.1 — Ir al sitio
Abrir: **https://www.google.com/business/**

### Paso 1.2 — Click en "Administrar ahora"
Iniciar sesión con la cuenta de Gmail del restaurante (recomendado crear una nueva: `lismaot.contacto@gmail.com` si no existe).

### Paso 1.3 — Buscar "LISMAOT"
- Si aparece el negocio en el listado → click en él → **"Reclamarlo"**.
- Si NO aparece → click en **"Agregar tu empresa a Google"**.

### Paso 1.4 — Datos a llenar (copiar exacto)
| Campo | Valor |
|---|---|
| Nombre | `LISMAOT Restaurant` |
| Categoría primaria | `Restaurante de hamburguesas` |
| Categorías secundarias | `Restaurante`, `Restaurante de comida rápida`, `Servicio de entrega de comida` |
| Dirección | `Cra. 7 #3-58, Chitagá, Norte de Santander` |
| Área de servicio | `Chitagá` y municipios cercanos |
| Teléfono | `313 345 5659` |
| Sitio web | `https://lismaot.netlify.app/` |

### Paso 1.5 — Verificación
Google enviará una **postal a la dirección física** con un código (5–14 días hábiles), o por **llamada/SMS** si está disponible. Es OBLIGATORIO completar este paso para aparecer en Google Maps.

---

## 2. Optimizar el perfil (10 min, después de verificar)

### Fotos a subir (mínimo 10)
- 3 fotos del local (fachada, interior, cocina)
- 5 fotos de hamburguesas (las más vistosas)
- 1 foto del logo
- 1 foto del equipo de trabajo

> Las fotos del local son las que más impactan. Google prioriza negocios con fotos reales sobre stock.

### Horarios
Configurar horarios reales de cada día (lunes-domingo). Marcar días cerrados si aplica.

### Descripción (copiar este texto)
```
Restaurante en Chitagá especializado en hamburguesas premium, carnes, alitas, perros calientes, pinchos y bebidas. Reconocimiento BOB Premium Burger Prime 2025 a la hamburguesa más original y creativa de Norte de Santander. Domicilios locales. Pide por WhatsApp al 313 345 5659.
```

### Atributos a marcar
- Acepta efectivo / transferencia
- Servicio a domicilio
- Para llevar
- Comida en el lugar

### Productos destacados
Subir las 5 hamburguesas más vendidas con foto + nombre + precio.

---

## 3. Reseñas (la palanca #1 para subir en Google)

### Estrategia de arranque (primera semana)
1. Pedir reseñas a los 10 mejores clientes habituales por WhatsApp.
2. Enviar el link directo de reseña (Google lo genera automáticamente cuando el perfil está verificado).
3. Responder cada reseña en menos de 24h — Google premia eso.

### Mensaje plantilla para WhatsApp
```
¡Hola [nombre]! Gracias por ser cliente fiel de Lismaot 🍔
Estamos en Google Maps y nos ayudaría mucho una reseña tuya.
Solo te toma 30 segundos: [LINK_DE_RESEÑA]
¡Y la próxima vez te invitamos a unas alitas de la casa! 🔥
```

> **Meta primer mes:** 20 reseñas con 4.5+ estrellas promedio. Con eso ya apareces de primero buscando *"hamburguesas Chitagá"*.

---

## 4. Indexación en Google Search (3 min)

### Paso 4.1 — Search Console
Abrir: **https://search.google.com/search-console**

### Paso 4.2 — Agregar propiedad
- Click "Agregar propiedad" → tipo **"Prefijo de URL"**
- Pegar: `https://lismaot.netlify.app/`
- Verificar (Google da varias opciones; la más fácil es **DNS** si tienes acceso, o **Etiqueta HTML** si no — pegamos el código en el `<head>` del sitio).

### Paso 4.3 — Enviar el sitemap
- En el menú lateral → **"Sitemaps"**
- Pegar: `sitemap.xml` → click **"Enviar"**
- Google indexará el sitio en 1–7 días.

---

## 5. Bing Places (bonus, 5 min)

Mismo proceso que Google pero en Bing. Cubre el ~5% del mercado de búsqueda restante.
**https://www.bingplaces.com/**

---

## ✅ Resumen de lo que YA está hecho en el código

- ✅ Meta tags optimizados (title, description, keywords)
- ✅ Structured Data Schema.org (Restaurant + LocalBusiness) — **esto genera "rich snippets" en Google con foto, rating y horarios cuando se busca el negocio**
- ✅ Open Graph para compartir en WhatsApp/Facebook con foto + descripción atractiva
- ✅ Geo-coordenadas (lat/long) en el HTML para Google Maps
- ✅ `sitemap.xml` con la imagen destacada
- ✅ `robots.txt` que excluye el panel admin
- ✅ Canonical URL para evitar contenido duplicado
- ✅ `theme-color` para PWA y barra del navegador móvil
- ✅ Lang="es" + locale es_CO

## ⏳ Lo que depende del dueño (este checklist)

- [ ] Reclamar perfil Google My Business
- [ ] Verificar dirección física (postal)
- [ ] Subir 10+ fotos
- [ ] Configurar horarios reales
- [ ] Conseguir 20 reseñas en el primer mes
- [ ] Verificar el sitio en Google Search Console
