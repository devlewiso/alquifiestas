# Alquifiestas — Contexto Maestro para Claude Code

> **Estado:** Planificación activa. Ningún código implementado aún.
> **Objetivo:** Marketplace B2B2C de alquiler de equipos y servicios para eventos en Guatemala y Centroamérica.
> **Meta de negocio:** Q8M GTQ/año + $1M USD/año (Año 3).
> **Filosofía:** "Love as a metric. People over revenue. Action over explanation."

---

## 1. Visión del Producto

### Problema que resolvemos
- Los proveedores de eventos (sillas, mesas, inflables, DJ, catering) pasan 60-70% de su tiempo en coordinación logística manual (WhatsApp, llamadas, Excel).
- Los clientes necesitan contactar 3-5 proveedores diferentes por evento sin visibilidad de disponibilidad real.
- 40% de eventos tienen disputas por pagos parciales, daños o cancelaciones.
- Proveedores rurales (Quiché, Huehuetenango, Alta Verapaz, Petén) no acceden al mercado urbano y cobran 50% menos por falta de visibilidad.

### Propuesta de valor única
- **Automation-first:** 80% menos costos operativos vs coordinación manual.
- **Multi-currency nativo:** GTQ para Guatemala, USD para expansión regional — sin fricción de cambio.
- **Red de proveedores rurales:** Difícil de replicar. Training en español + idiomas locales.
- **Integración bancaria local:** Banrural, BAC, G&T Continental — no solo Stripe.
- **Vertical integration:** Insurance, financing, inventory management (no solo marketplace).

---

## 2. Stack Tecnológico Definido

| Capa | Tecnología | Justificación |
|------|-----------|---------------|
| **Frontend Web** | Next.js 14 (App Router) + TypeScript + Tailwind CSS | SSR/SSG para SEO, route groups para separar público/auth/dashboard en una sola app. |
| **Frontend Mobile (futuro)** | Tauri + React Native | Una codebase, multi-plataforma. |
| **Backend** | Supabase (PostgreSQL + Auth + Edge Functions) | Auth lista, DB real-time, Row Level Security, Edge Functions serverless. |
| **Edge Functions** | Deno (TypeScript) | Serverless en Supabase, baja latencia, sin servidor propio. |
| **Automatización** | *Stack a definir* | Motor interno de flujos: booking, pagos, recordatorios, invoices. Evaluar: Edge Functions + cron, Inngest, Temporal, o BullMQ. |
| **AI / Chat** | *Stack a definir* | Soporte automatizado y calificación de leads. Evaluar: solución propia con LLM, Intercom, o proveedor local LATAM. |
| **Comunicación** | WhatsApp Business API | Notificaciones, confirmaciones, recordatorios 24h antes. |
| **Pagos USD** | Stripe Connect | Split payments, escrow, payouts automáticos a proveedores. |
| **Pagos GTQ** | Banrural API + QPaypro + Visa QR | Pagos locales en Quetzales, acceso a banca rural. |
| **Infra** | Proxmox (asgard) + Docker + Cloudflare Tunnel | Self-hosted, costo controlado, privacidad de datos LATAM. |
| **Monorepo** | npm workspaces (evaluar Turborepo si crece) | Compartir UI, types, configs entre apps. |

---

## 3. Etapas de Planificación Completas

> Cada etapa debe estar 100% definida antes de pasar a la siguiente. No codear hasta que la etapa esté cerrada.

---

### ETAPA 0 — Fundamentos del Proyecto (Actual)
**Status:** `EN CURSO`
**Output esperado:** Este documento + estructura de directorios + inicialización de repo.

**Tareas:**
- [x] Definir stack tecnológico
- [x] Definir estructura de carpetas del monorepo
- [x] Crear business case (HTML) con métricas de negocio
- [x] Crear CLAUDE.md (contexto maestro)
- [ ] Inicializar repositorio Git (`git init`, `.gitignore`, commits semánticos)
- [ ] Crear `package.json` root con workspaces
- [ ] Crear `.env.example` con todas las variables necesarias
- [ ] Definir convention de commits (Conventional Commits)
- [ ] Definir branching strategy (trunk-based o GitFlow simplificado)
- [ ] Crear `.github/workflows/` templates vacíos (CI/CD futuro)

---

### ETAPA 1 — Diseño de Producto y UX
**Status:** `PENDIENTE`
**Output esperado:** Wireframes, user flows, diseño de DB completo, decisiones de UX documentadas.

**1.1 User Research & Validación**
- [ ] 20 entrevistas con proveedores (10 urbanos: Zona 10, Zona 14, Antigua; 10 rurales: Quiché, Huehuetenango)
- [ ] 10 entrevistas con clientes (organizadores de eventos)
- [ ] Documentar fricciones, pain points, deseos
- [ ] Definir 3 user personas: Proveedor Urbano, Proveedor Rural, Cliente Organizador

**1.2 User Flows & Wireframes**
- [ ] Flow de booking completo (búsqueda → carrito → checkout → confirmación)
- [ ] Flow de onboarding de proveedor (registro → verificación → primer listing)
- [ ] Flow de dashboard de proveedor (calendario, inventario, analytics)
- [ ] Flow de dashboard de cliente (mis eventos, pagos, chat)
- [ ] Flow de soporte/ disputes
- [ ] Flow de cancelación y refund

**1.3 Decisiones de UX críticas**
- [ ] ¿Calendario de disponibilidad en tiempo real o batch?
- [ ] ¿Chat interno o todo por WhatsApp?
- [ ] ¿Reviews antes o después del evento?
- [ ] ¿Cómo manejar overbooking (primero en pagar vs primero en reservar)?
- [ ] ¿Flujo de verificación de identidad de proveedores (DPI en GT)?
- [ ] ¿Experiencia offline-first para áreas rurales con mala conectividad?

---

### ETAPA 2 — Arquitectura de Base de Datos
**Status:** `PENDIENTE`
**Output esperado:** Esquema SQL completo, RLS policies, triggers, índices, seeds de prueba.

**2.1 Entidades Core**
```
users (auth managed por Supabase)
├── profiles (extensión de users, roles: client, provider, admin)
├── providers (datos de negocio, verificación, geolocalización, preferred_currency)
├── provider_documents (DPI, licencias, fotos de equipos)
├── categories (mesas, sillas, inflables, sonido, etc.)
├── products (items individuales de un proveedor)
├── product_availability (calendario por producto)
├── events (booking de un cliente, multi-proveedor)
├── event_items (líneas de evento: producto + cantidad + precio)
├── payments (transacciones, multi-moneda)
├── payment_splits (distribución: plataforma + proveedor)
├── reviews (post-evento, dual: cliente→proveedor, proveedor→cliente)
├── disputes (reclamos por daños, cancelaciones)
├── messages (chat interno o log de WhatsApp)
├── notifications (canal: email, WhatsApp, push)
├── exchange_rates (historial de tasas Banguat)
├── insurance_policies (pólizas por evento)
└── audit_logs (cambios críticos, compliance)
```

**2.2 Consideraciones de diseño**
- [ ] ¿Soft deletes o hard deletes en productos/bookings?
- [ ] ¿Versionado de precios (histórico)?
- [ ] ¿Geo-indexing para búsqueda por ubicación (PostGIS)?
- [ ] ¿Partitioning de tablas grandes (payments, events)?
- [ ] ¿Cómo manejar horarios en múltiples zonas horarias (GT, SV, HN)?
- [ ] ¿Estrategia de backup y point-in-time recovery?

**2.3 Seguridad a nivel DB**
- [ ] RLS policies por rol (client, provider, admin)
- [ ] RLS: un proveedor solo ve sus propios productos, eventos, pagos
- [ ] RLS: un cliente solo ve sus propios eventos y datos
- [ ] Triggers para audit_logs en pagos y cambios de estado de eventos
- [ ] Constraints para evitar overbooking a nivel DB

**2.4 Multi-currency en DB**
```sql
-- Estructura propuesta (a validar)
CREATE TABLE payments (
  id UUID PRIMARY KEY,
  event_id UUID REFERENCES events(id),
  amount_gtq NUMERIC(12,2),
  amount_usd NUMERIC(12,2),
  currency_charged VARCHAR(3) NOT NULL,       -- GTQ o USD
  exchange_rate_at_payment NUMERIC(10,6),     -- Tasa al momento de la transacción
  platform_fee_gtq NUMERIC(12,2),
  platform_fee_usd NUMERIC(12,2),
  provider_payout_gtq NUMERIC(12,2),
  provider_payout_usd NUMERIC(12,2),
  payment_method VARCHAR(50),                 -- stripe, banrural, qpaypro, cash
  status VARCHAR(20),                         -- pending, paid, failed, refunded
  external_reference TEXT,                    -- ID de Stripe, Banrural, etc.
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### ETAPA 3 — Arquitectura de API y Backend
**Status:** `PENDIENTE`
**Output esperado:** Documento de API (OpenAPI spec), lista de Edge Functions, webhooks definidos.

**3.1 API Routes (Next.js App Router)**
- [ ] `POST /api/auth/register` (extensión de Supabase Auth para crear profile)
- [ ] `POST /api/providers/onboarding` (flujo de verificación)
- [ ] `GET /api/products/search` (búsqueda con filtros: categoría, ubicación, fecha, precio)
- [ ] `POST /api/bookings` (crear evento + items + iniciar pago)
- [ ] `GET /api/bookings/[id]` (detalle de evento con estado de pagos)
- [ ] `POST /api/payments/initiate` (iniciar transacción Stripe/Banrural)
- [ ] `POST /api/payments/webhook/stripe` (webhook de Stripe)
- [ ] `POST /api/payments/webhook/banrural` (webhook de Banrural)
- [ ] `POST /api/payments/split` (distribución post-pago)
- [ ] `GET /api/providers/dashboard` (analytics: revenue, ocupación, reviews)
- [ ] `POST /api/disputes` (iniciar disputa)
- [ ] `GET /api/exchange-rate` (tasa actual del Banguat, cacheada)
- [ ] `POST /api/whatsapp/send` (enviar mensaje vía WhatsApp Business API)
- [ ] `POST /api/jobs/schedule` (encolar jobs de automatización interna)
- [ ] `POST /api/jobs/webhook` (callbacks del motor de automatización)

**3.2 Edge Functions (Supabase / Deno)**
- [ ] `booking-confirmation` — Validar disponibilidad, crear evento, iniciar pago
- [ ] `payment-split` — Post-pago: calcular comisión, crear payout al proveedor
- [ ] `inventory-sync` — Actualizar disponibilidad post-booking/cancelación
- [ ] `whatsapp-reminder` — Recordatorios 24h antes del evento
- [ ] `exchange-rate-sync` — Fetch diario de tasa Banguat, guardar en DB (cron)
- [ ] `provider-payout` — Ejecutar payouts a Stripe Connect / Banrural
- [ ] `dispute-resolution` — Lógica de mediación automática (escrow)
- [ ] `review-reminder` — Solicitar review 48h post-evento
- [ ] `analytics-daily` — Agregar métricas para dashboard
- [ ] `invoice-generation` — Generar factura electrónica SAT post-pago
- [ ] `payment-split` — Post-pago: calcular comisión, crear payout al proveedor
- [ ] `provider-churn-risk` — Si proveedor sin bookings en 30días, ofrecer incentivo

**3.3 Webhooks externos (entrada)**
- [ ] Stripe: `payment_intent.succeeded`, `payment_intent.payment_failed`, `payout.paid`
- [ ] Banrural: confirmación de pago QR / transferencia
- [ ] WhatsApp Business API: mensajes entrantes, status de entrega
- [ ] Motor de automatización: callbacks de jobs completados o fallidos

**3.4 Webhooks internos (salida)**
- [ ] Motor de automatización: trigger en cambio de estado de booking
- [ ] Motor de automatización: trigger en pago recibido
- [ ] Motor de automatización: trigger en disputa creada
- [ ] Chat/AI: consulta de disponibilidad por chat (a definir)

---

### ETAPA 4 — Arquitectura de Frontend
**Status:** `PENDIENTE`
**Output esperado:** Component tree, state management decisions, routing map, design tokens.

**4.1 Estructura de Rutas (Next.js App Router)**
```
app/
├── (public)/                    # No requiere auth
│   ├── page.tsx                 # Landing principal
│   ├── about/
│   ├── providers/[id]/          # Perfil público de proveedor
│   ├── categories/[slug]/       # Listado por categoría
│   ├── search/                  # Búsqueda con filtros
│   └── how-it-works/
│
├── (auth)/                      # Auth semi-aislada
│   ├── login/
│   ├── register/
│   ├── register/provider/       # Onboarding específico proveedor
│   ├── forgot-password/
│   └── verify-email/
│
├── (dashboard)/                 # Requiere auth
│   ├── client/
│   │   ├── events/              # Mis eventos
│   │   ├── bookings/new/        # Crear evento (wizard)
│   │   ├── payments/
│   │   ├── messages/
│   │   └── profile/
│   │
│   └── provider/
│       ├── dashboard/             # Analytics principal
│       ├── calendar/              # Disponibilidad
│       ├── products/              # CRUD de productos
│       ├── events/                # Eventos que me contrataron
│       ├── payments/              # Mis pagos/payouts
│       ├── messages/
│       ├── reviews/
│       └── settings/
│
├── api/                         # API Routes
│   ├── auth/
│   ├── bookings/
│   ├── payments/
│   ├── providers/
│   ├── search/
│   └── webhooks/
│
├── layout.tsx                   # Root layout (providers React, theme)
├── error.tsx
├── not-found.tsx
└── loading.tsx
```

**4.2 Design System (packages/ui)**
- [ ] Tokens: colores (primary, secondary, success, warning, danger), tipografía, spacing, breakpoints
- [ ] Componentes base: Button, Input, Select, Card, Modal, Toast, Avatar, Badge
- [ ] Componentes de layout: Navbar, Sidebar, Footer, Container, Grid
- [ ] Componentes de negocio: ProductCard, BookingSummary, PaymentForm, CalendarWidget, ReviewStars
- [ ] Hooks compartidos: `useAuth`, `useBooking`, `useAvailability`, `useCurrency`, `useSearch`
- [ ] Utilidades: `lib/currency.ts` (GTQ↔USD), `lib/date.ts` (zona horaria GT), `lib/validation.ts`

**4.3 Estado Global**
- [ ] ¿Zustand, Redux Toolkit, o React Context + useReducer?
- [ ] ¿TanStack Query (React Query) para server state?
- [ ] ¿Cómo manejar carrito de booking (multi-proveedor)?
- [ ] ¿Offline cache para áreas rurales?

**4.4 Decisiones técnicas frontend**
- [ ] ¿Server Components por defecto? ¿Cuáles necesitan ser Client Components?
- [ ] ¿Estrategia de fetching: Server Actions vs API Routes?
- [ ] ¿Cómo manejar imágenes de productos (UploadThing, Supabase Storage, Cloudflare R2)?
- [ ] ¿Optimización de SEO para perfiles de proveedores (generateMetadata)?
- [ ] ¿PWA desde el inicio o en fase 2?

---

### ETAPA 5 — Motor de Automatización (Stack a Definir)
**Status:** `PENDIENTE`
**Output esperado:** Arquitectura del motor de jobs/flujos, elección de tecnología, mapa de triggers, diagrama de flujo por job.

> **Nota:** n8n fue descartado. Se evaluará una solución más integrada al stack existente.

**5.1 Opciones a evaluar**
- [ ] **Opción A — Edge Functions + pg_cron:** Usar cron nativo de PostgreSQL (si Supabase lo soporta o si se usa PostgREST) + Edge Functions como workers. Simple, sin infra adicional.
- [ ] **Opción B — Inngest:** Plataforma de event-driven jobs con retries, scheduling, idempotencia. Buena integración con Next.js.
- [ ] **Opción C — Temporal (self-hosted):** Orquestación durable de workflows complejos. Más pesado, pero robusto para pagos y split.
- [ ] **Opción D — BullMQ (Redis):** Queue system para Node.js. Requiere Redis/Valkey, pero es estándar y probado.
- [ ] **Opción E — Serverless cron externo:** AWS EventBridge, Google Cloud Scheduler, o similar, disparando webhooks a nuestra API.

**5.2 Jobs / Workflows Core (independientes del stack elegido)**
- [ ] `booking-confirmation` — Post-booking: confirmar disponibilidad, enviar email/WhatsApp a cliente y proveedor
- [ ] `payment-reminder` — 48h antes de pago pendiente
- [ ] `payment-split` — Post-pago exitoso: calcular comisión, programar payout al proveedor
- [ ] `inventory-sync` — Post-booking/cancelación: actualizar calendario de disponibilidad
- [ ] `whatsapp-reminder` — 24h antes del evento: recordatorio a cliente y proveedor
- [ ] `review-request` — 48h post-evento: solicitar review vía WhatsApp/email
- [ ] `dispute-escalation` — Si disputa no resuelta en 72h, escalar a equipo humano
- [ ] `provider-onboarding` — Post-registro: verificar documentos, activar cuenta
- [ ] `provider-churn-risk` — Si proveedor sin bookings en 30días, ofrecer incentivo
- [ ] `exchange-rate-alert` — Si tasa varía >2% en 24h, notificar a contabilidad
- [ ] `daily-analytics` — Agregar métricas, enviar reporte a admins
- [ ] `invoice-generation` — Generar factura electrónica post-pago (SAT Guatemala)

**5.3 Integraciones del motor**
- [ ] Supabase (DB triggers o polling como fuente de eventos)
- [ ] Stripe (crear payout, consultar estado)
- [ ] WhatsApp Business API (enviar mensajes template)
- [ ] Email (SendGrid / Resend)
- [ ] Banrural API (consultar estado de pago)
- [ ] Google Sheets o similar (backup de métricas diarias)

**5.4 Infraestructura del motor**
- [ ] Decidir si corre dentro del mismo proyecto (monolito) o como servicio separado
- [ ] Estrategia de retries con backoff exponencial
- [ ] Dead letter queue para jobs fallidos
- [ ] Monitoreo de ejecución (dashboard de jobs)
- [ ] Idempotencia (evitar duplicar payouts o emails)
- [ ] Backup y export de definiciones de jobs/workflows

---

### ETAPA 6 — Pagos Multi-moneda y Finanzas
**Status:** `PENDIENTE`
**Output esperado:** Documento de flujo de pagos, estados de transacción, políticas de refund.

**6.1 Flujo de pago de un evento**
```
1. Cliente crea booking → sistema calcula total (GTQ o USD según preferencia)
2. Cliente paga 100% o depósito (configurable por proveedor)
3. Plataforma retiene fondos (escrow) hasta post-evento o fecha definida
4. Post-evento / fecha de liberación:
   a. Stripe: transferencia automática via Connect
   b. Banrural: transferencia programada vía API
5. Si disputa: fondos congelados hasta resolución
```

**6.2 Comisiones y split**
- [ ] Take rate plataforma: 12% por transacción
- [ ] Processing fee passthrough: Stripe 2.9% + 30¢, Banrural X%
- [ ] Insurance add-on: 3% del valor (opcional)
- [ ] SaaS subscription: Q385/mes ($49 USD) — facturado aparte, no por transacción

**6.3 Estrategia de tasa de cambio**
- [ ] Fuente oficial: Banco de Guatemala (Banguat) API
- [ ] Spread: +0.5% sobre oficial
  - 0.25% → Fondo de protección para proveedores rurales
  - 0.25% → Descuentos para clientes frecuentes
- [ ] Cache de tasa: actualizar cada 6 horas
- [ ] Historial completo en `exchange_rates` para audit

**6.4 Políticas de refund**
- [ ] Cancelación >7 días: 100% refund menos processing fee
- [ ] Cancelación 3-7 días: 50% refund
- [ ] Cancelación <3 días: no refund (o credit)
- [ ] Disputa por daños: escrow hasta resolución (máx 14 días)
- [ ] No-show del proveedor: 100% refund + crédito plataforma

**6.5 Facturación electrónica (SAT Guatemala)**
- [ ] Integración con API de facturación electrónica GT
- [ ] Emisión automática post-pago
- [ ] Soporte para factura consumidor final y factura empresa (NIT)
- [ ] Respaldo de DTEs emitidos

---

### ETAPA 7 — Infraestructura y DevOps
**Status:** `PENDIENTE`
**Output esperado:** Diagrama de infra, Dockerfiles, scripts de deploy, plan de backup.

**7.1 Entornos**
- [ ] **Local:** Supabase local + Next.js dev + motor de automatización local
- [ ] **Staging:** Vercel Preview + Supabase project staging + motor de automatización staging
- [ ] **Producción:** Vercel Pro + Supabase Pro + motor de automatización en Proxmox/VPS + Cloudflare

**7.2 Proxmox / Self-hosted**
- [ ] VM para motor de automatización (Docker o nativo según stack elegido)
- [ ] VM para base de datos de backup (opcional, si no se usa Supabase managed)
- [ ] VM para almacenamiento de archivos (si no se usa Supabase Storage)
- [ ] Configuración de Cloudflare Tunnel para exponer webhooks seguros
- [ ] Firewall rules, fail2ban, updates automáticos

**7.3 CI/CD (GitHub Actions)**
- [ ] Lint + Type check + Build en cada PR
- [ ] Tests unitarios + integración en cada PR
- [ ] Deploy automático a Vercel Preview en PRs
- [ ] Deploy automático a producción en merge a `main`
- [ ] DB migrations automáticas en deploy (con cuidado, revisión manual en prod)
- [ ] Backup de DB antes de cada migration en producción

**7.4 Monitoreo**
- [ ] Vercel Analytics + Speed Insights
- [ ] Supabase logs + real-time health
- [ ] Uptime monitoring (UptimeRobot o similar)
- [ ] Error tracking (Sentry)
- [ ] Alertas por Slack/email si el motor de automatización cae o un job crítico falla

---

### ETAPA 8 — Seguridad, Compliance y Legal
**Status:** `PENDIENTE`
**Output esperado:** Documento de seguridad, checklist de compliance, políticas de privacidad.

**8.1 Seguridad aplicación**
- [ ] Auth: Supabase Auth con MFA opcional
- [ ] RLS en todas las tablas sensibles
- [ ] Rate limiting en API routes
- [ ] Sanitización de inputs (SQL injection, XSS)
- [ ] CSP headers
- [ ] HTTPS everywhere (Cloudflare + Vercel)
- [ ] Secure cookies (HttpOnly, SameSite, Secure)
- [ ] Rotación de API keys y service role keys
- [ ] No loggear datos sensibles (PII, números de tarjeta)

**8.2 Verificación de identidad**
- [ ] Clientes: email/phone verificación
- [ ] Proveedores: verificación de DPI (Guatemala), selfie + documento
- [ ] Empresas: verificación de NIT / registro mercantil
- [ ] Lista de verificación manual para rurales (si OCR falla)

**8.3 Compliance por país**
- [ ] **Guatemala:** Registro en SAT, facturación electrónica, Ley de Protección de Datos Personales
- [ ] **El Salvador:** Ley de Protección de Datos Personales, Banco Central regulación de pagos
- [ ] **Honduras:** Regulación similar a evaluar
- [ ] **KYC/AML:** Para pagos >Q50,000 o $6,500 USD, verificación adicional

**8.4 Legal**
- [ ] Términos y condiciones de plataforma
- [ ] Política de privacidad (GDPR-style adaptado a LATAM)
- [ ] Contrato entre plataforma y proveedor
- [ ] Contrato de servicio entre cliente y proveedor (mediado por plataforma)
- [ ] Política de seguro (cobertura, exclusiones, claims)

---

### ETAPA 9 — Inteligencia Artificial y Chat
**Status:** `PENDIENTE`
**Output esperado:** Casos de uso de AI, evaluación de proveedores/pilas, prompts de respuesta.

> **Nota:** Dialogflow CX fue descartado. Se evaluará alternativa a definir.

**9.1 Opciones de stack de AI/Chat a evaluar**
- [ ] **Opción A — LLM propio (OpenAI/Anthropic + function calling):** Mayor control, customizable, requiere gestión de contexto.
- [ ] **Opción B — Intercom / Zendesk AI:** Solución managed, rápida de implementar, costo recurrente.
- [ ] **Opción C — Proveedor local LATAM:** Soporte nativo en español, compliance local, posiblemente menor costo.
- [ ] **Opción D — Bot simple basado en reglas (no LLM):** Para MVP, suficiente para FAQ y calificación básica.

**9.2 Casos de uso de AI (independientes del stack)**
- [ ] **Soporte 24/7:** Responder preguntas frecuentes (precios, disponibilidad, cómo funciona)
- [ ] **Calificación de leads:** Preguntar presupuesto, fecha, tipo de evento, ubicación → pasar a humano si califica
- [ ] **Booking assistant:** Ayudar a cliente a armar paquete de evento sugerido
- [ ] **Dispute mediator:** Primer intento de mediación automática antes de escalar
- [ ] **Provider assistant:** Sugerencias de precios basadas en mercado local

**9.3 Integración**
- [ ] AI/Chat → motor de automatización → WhatsApp Business API / Email
- [ ] Fallback a humano si confianza <80% o intención no reconocida
- [ ] Contexto pasado: historial de bookings del cliente, eventos pasados

---

### ETAPA 10 — MVP y Lanzamiento (Fase 1: Meses 1-6)
**Status:** `PENDIENTE`
**Output esperado:** App funcional con flujo core, 10 proveedores onboarded, 50 eventos completados.

**10.1 Scope del MVP (mínimo viable)**
- Registro/login de clientes y proveedores
- Perfil básico de proveedor con productos
- Búsqueda por categoría y ubicación
- Booking flow: carrito → checkout → pago
- Pago único: Banrural (GTQ) o Stripe (USD) — no split en MVP
- Confirmación por email/WhatsApp
- Dashboard básico de proveedor (mis eventos)
- Tasa de cambio mostrada pero no protección aún

**10.2 Lanzamiento Guatemala**
- [ ] Ciudad de Guatemala, Antigua Guatemala, Quetzaltenango
- [ ] 5 proveedores urbanos, 5 proveedores rurales (Quiché, Huehuetenango)
- [ ] Onboarding manual, aprender fricciones reales
- [ ] Medir: NPS, tiempo ahorrado, ingresos generados, conversion rate

---

### ETAPA 11 — Escalamiento Regional (Fase 2: Meses 7-18)
**Status:** `PENDIENTE`
**Output esperado:** 300 proveedores, 600 eventos/mes, expansion SV+HN.

**Features a agregar:**
- [ ] Payment split automático (plataforma + proveedor)
- [ ] Insurance add-on
- [ ] Inventory tracking completo
- [ ] Automated contracts (firmas digitales)
- [ ] Multi-currency wallets (cliente puede pagar en USD, proveedor recibe en GTQ)
- [ ] Expansion a El Salvador y Honduras
- [ ] SaaS Pro subscription
- [ ] API pública para partners

---

### ETAPA 12 — Rentabilidad y Expansión (Fase 3: Meses 19-36)
**Status:** `PENDIENTE`
**Output esperado:** Q8M GTQ + $1M USD revenue, 1,200 proveedores, 10,000 eventos/año.

**Features a agregar:**
- [ ] Expansion a Nicaragua y Costa Rica
- [ ] Premium analytics para proveedores
- [ ] White-label para grandes empresas de eventos
- [ ] Financing / microcréditos para proveedores (basado en historial en plataforma)
- [ ] App móvil nativa
- [ ] AI avanzada: pricing dinámico, demand forecasting

---

## 4. Estructura de Carpetas Objetivo

```
alquifiestas/
├── apps/
│   ├── web/                    # Next.js 14 principal
│   │   ├── app/               # App Router (route groups)
│   │   ├── components/        # Componentes específicos de la app
│   │   ├── hooks/             # Hooks específicos
│   │   ├── lib/               # Utils, clients, types
│   │   ├── public/            # Assets estáticos
│   │   └── package.json
│   └── marketing/             # Landing estática (Astro o Next static)
│       ├── src/
│       └── package.json
│
├── packages/
│   ├── ui/                     # Design System
│   │   ├── components/         # Button, Input, Card, etc.
│   │   ├── hooks/              # useAuth, useCurrency, etc.
│   │   ├── lib/                # Currency utils, date utils, validation
│   │   ├── styles/             # Tailwind config, tokens CSS
│   │   └── package.json
│   │
│   └── config/                 # Configs compartidas
│       ├── eslint/
│       ├── prettier/
│       ├── tailwind/
│       └── tsconfig/
│
├── supabase/
│   ├── migrations/             # SQL versionado (yyyyMMddHHmmss_description.sql)
│   ├── functions/              # Edge Functions (Deno)
│   ├── seeds/                  # Datos de prueba
│   └── config.toml
│
├── engine/                     # Motor de automatización (stack a definir)
│   ├── jobs/                   # Definiciones de jobs/workflows
│   ├── workers/                # Implementación de workers
│   └── README.md               # Documentación del motor elegido
│
├── docs/
│   ├── architecture.md         # Diagramas C4, decisiones ADR
│   ├── database-schema.md      # Diagrama ER, descripción de tablas
│   ├── api-reference.md        # OpenAPI spec o documentación de endpoints
│   ├── deployment.md           # Guía de deploy paso a paso
│   ├── security.md             # Checklist de seguridad, RLS, compliance
│   └── automation-engine.md    # Documentación del motor de automatización
│
├── infra/
│   ├── docker/                 # Dockerfiles y compose files
│   ├── proxmox/                # Scripts de VM setup
│   └── cloudflare/             # Configs de tunnel, DNS, rules
│
├── .github/
│   └── workflows/              # CI/CD GitHub Actions
│
├── scripts/                    # Scripts de utilidad (setup, backup, etc.)
├── .env.example
├── .gitignore
├── package.json               # Root workspaces
├── turbo.json                 # Si usamos Turborepo
└── README.md
```

---

## 5. Métricas Clave (KPIs)

### Negocio
| KPI | Y1 | Y2 | Y3 |
|-----|----|----|----|
| GMV mensual (GTQ) | Q1M | Q3.9M | Q65M/año |
| GMV mensual (USD) | $125K | $500K | $8.3M/año |
| Revenue (GTQ/año) | Q2M | Q6.1M | Q10.3M |
| Revenue (USD/año) | $260K | $800K | $1.37M |
| Proveedores activos | 50 | 300 | 1,200 |
| Eventos/mes | 150 | 600 | ~833 |
| NPS clientes | >50 | >60 | >70 |
| NPS proveedores | >60 | >70 | >75 |

### Técnica / Producto
| KPI | Target |
|-----|--------|
| Uptime | 99.9% |
| API response time p95 | <500ms |
| Webhook delivery success | >99.5% |
| Pago exitoso (conversion) | >85% |
| Mobile page speed (Lighthouse) | >90 |
| Tiempo de onboarding proveedor | <15 min |
| Tiempo de booking (search → confirmación) | <5 min |

### Impacto Social
| KPI | Y1 | Y2 | Y3 |
|-----|----|----|----|
| Proveedores que duplicaron ingresos | 15 | 85 | 280 |
| Eventos en comunidades rurales | 40 | 180 | 600 |
| Horas ahorradas/proveedor/mes | 25h | 25h | 25h |
| Disputas resueltas satisfactoriamente | 95% | 97% | 98% |
| Proveedores con acceso a crédito | 5 | 40 | 150 |

---

## 6. Riesgos y Mitigaciones

| Riesgo | Prob. | Impacto | Mitigación |
|--------|-------|---------|------------|
| Competencia establecida | Media | Alto | Foco rural + automation + UX superior + multi-currency |
| Fraude (clientes o proveedores) | Media | Medio | Escrow, verificación DPI/reviews, límite de bookings para nuevos |
| Regulatorio (SAT, bancos) | Media | Alto | Legal counsel Y1, compliance por país, facturación electrónica desde inicio |
| Fluctuación cambiaria | Media | Medio | Fondo de protección 0.5%, hedging natural, historial de tasas |
| Churn de proveedores | Media | Medio | Lock-in vía SaaS Pro, inventory mgmt, analytics, acceso a crédito |
| Conectividad rural | Alta | Medio | Offline-first cache, SMS fallback, app liviana |
| Dependencia de WhatsApp API | Media | Medio | Fallback a SMS y email, no hacer WhatsApp el único canal crítico |
| Dependencia del motor de automatización | Media | Medio | Arquitectura desacoplada, jobs idempotentes, dead letter queue, monitoreo |
| Escalabilidad técnica | Baja | Medio | Serverless desde inicio, caching, CDN, arquitectura desacoplada |

---

## 7. Decisiones Pendientes (Need Decision)

> Lista de decisiones que bloquean el avance a implementación. Deben resolverse antes de codear.

1. **¿Motor de automatización: Edge Functions + cron, Inngest, Temporal, BullMQ, u otro?** (Impacta: infra, costo, robustez de flujos) ← *Crítica, bloquea Etapa 5*
2. **¿Stack de AI/Chat: LLM propio, Intercom, proveedor local LATAM, o bot reglas para MVP?** (Impacta: Etapa 9)
3. **¿Monorepo con npm workspaces o Turborepo?** (Impacta: build, caching, CI)
4. **¿Server Actions de Next.js o API Routes tradicionales?** (Impacta: arquitectura backend)
5. **¿Zustand o React Context para estado global?** (Impacta: complejidad frontend)
6. **¿Supabase Storage o Cloudflare R2 para imágenes?** (Impacta: costo, CDN)
7. **¿App móvil en fase 1 (PWA) o fase 2 (nativa)?** (Impacta: scope MVP)
8. **¿Chat interno en app o todo por WhatsApp?** (Impacta: UX, costo)
9. **¿Escrow automático o manual en fase 1?** (Impacta: complejidad de pagos)
10. **¿Verificación de proveedores automática (AI) o manual en MVP?** (Impacta: tiempo al mercado)
11. **¿Stripe Connect Express o Custom para payouts?** (Impacta: UX del proveedor, compliance)
12. **¿Resend o SendGrid para emails transaccionales?** (Impacta: costo, deliverability)

---

## 8. Glosario / Términos del Dominio

| Término | Significado |
|---------|-------------|
| **GMV** | Gross Merchandise Value — valor total de transacciones en plataforma |
| **Take Rate** | Comisión que cobra la plataforma por transacción (12%) |
| **Escrow** | Retención de fondos hasta cumplimiento del servicio |
| **Payout** | Pago al proveedor después de completar/confirmar el evento |
| **Split Payment** | División de un pago: X% a plataforma, Y% a proveedor |
| **SaaS Pro** | Suscripción mensual para proveedores con features premium |
| **DPI** | Documento Personal de Identificación (Guatemala) |
| **SAT** | Superintendencia de Administración Tributaria (Guatemala) |
| **DTE** | Documento Tributario Electrónico (factura electrónica GT) |
| **Banguat** | Banco de Guatemala — fuente oficial de tasa de cambio |
| **MRR** | Monthly Recurring Revenue |
| **NPS** | Net Promoter Score |
| **CAC** | Customer Acquisition Cost |
| **LTV** | Lifetime Value |

---

## 9. Checklist de Inicio a Implementación

> Antes de escribir la primera línea de código, verificar que todo esto esté completo:

- [ ] Todas las etapas de planificación (1-9) revisadas y documentadas en `/docs/`
- [ ] Decisiones pendientes (sección 7) resueltas y documentadas
- [ ] Esquema de base de datos aprobado (diagrama ER completo)
- [ ] User flows aprobados (wireframes o descripciones textuales)
- [ ] API spec primera versión (lista de endpoints + payloads)
- [ ] Motor de automatización elegido y documentado (`/engine/README.md`)
- [ ] Jobs/workflows mapeados con triggers y acciones
- [ ] Cuentas de servicio creadas: Supabase, Stripe, Banrural, WhatsApp Business
- [ ] Entorno local funcional: Node.js, Docker, Supabase CLI
- [ ] Git repo inicializado con conventional commits
- [ ] `.env.example` completo y actualizado
- [ ] Equipo/yo tiene claridad sobre el scope del MVP (qué SÍ y qué NO entra)

---

> **Última actualización:** 2026-06-03
> **Próxima revisión:** Al completar Etapa 1 (Diseño de Producto) o al inicio de implementación.
