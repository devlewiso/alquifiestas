# Alquifiestas — Contexto Maestro para Hermes Agent

> **Fecha de contexto:** 2026-06-08
> **Estado del proyecto:** MVP frontend funcional con seeds en memoria. Auth con Supabase activa. ~20 commits. Backend real pendiente.
> **Autor del contexto:** Iran Lewis <iran@neuralcodelab.com>
> **Filosofía:** "Love as a metric. People over revenue. Action over explanation."

---

## 1. Identidad del Proyecto

**Alquifiestas** es un marketplace B2B2C de alquiler de equipos y servicios para eventos en Guatemala y Centroamérica.

- **Foco:** Conectar proveedores de eventos (sillas, mesas, inflables, DJ, catering, sonido) con clientes que organizan eventos.
- **Meta de negocio:** Q8M GTQ/año + $1M USD/año (Año 3).
- **Diferenciadores clave:**
  - Automation-first (80% menos costos operativos vs coordinación manual).
  - Multi-currency nativo (GTQ para Guatemala, USD para expansión regional).
  - Red de proveedores rurales (Quiché, Huehuetenango, Alta Verapaz, Petén) — difícil de replicar.
  - Integración bancaria local (Banrural, BAC, G&T Continental) — no solo Stripe.
  - Vertical integration: insurance, financing, inventory management.

---

## 2. Estado Actual del Proyecto

| Aspecto | Estado |
|---------|--------|
| **Fase** | MVP funcional — frontend completo, seeds en memoria, backend pendiente |
| **Repo Git** | ✅ Inicializado, ~20 commits, conventional commits activo |
| **Estructura de carpetas** | ✅ Monorepo con apps/web funcional |
| **Código fuente** | ✅ Next.js 14 + TypeScript + Tailwind + Zustand + Supabase SSR |
| **Base de datos** | ⚠️ Seeds en memoria + tipos TypeScript definidos. Tablas reales pendientes. |
| **Apps/web** | ✅ Landing, búsqueda IA, perfiles, reservas, auth, dashboard dual |
| **Business case** | ✅ `business-cases/alquifiestas-1m-year.html` (v2.0, Junio 2026) |
| **Contexto maestro** | ✅ `CLAUDE.md` (última actualización: 2026-06-08) |

---

## 3. Stack Tecnológico Definido

| Capa | Tecnología | Justificación |
|------|-----------|---------------|
| **Frontend Web** | Next.js 14 (App Router) + TypeScript + Tailwind CSS | SSR/SSG para SEO, route groups para separar público/auth/dashboard en una sola app. |
| **Frontend Mobile (futuro)** | Tauri + React Native | Una codebase, multi-plataforma. |
| **Backend** | Supabase (PostgreSQL + Auth + Edge Functions) | Auth lista, DB real-time, Row Level Security, Edge Functions serverless. |
| **Edge Functions** | Deno (TypeScript) | Serverless en Supabase, baja latencia, sin servidor propio. |
| **Automatización** | *Stack a definir* | Motor interno de flujos: booking, pagos, recordatorios, invoices. Evaluar: Inngest, Temporal, o BullMQ. |
| **AI / Chat** | ✅ Motor de matching propio | Scoring multi-factorial (texto, ubicación, presupuesto, rating, disponibilidad). Chat soporte a definir. |
| **Comunicación** | WhatsApp Business API | Notificaciones, confirmaciones, recordatorios 24h antes. |
| **Pagos USD** | Stripe Connect | Split payments, escrow, payouts automáticos a proveedores. |
| **Pagos GTQ** | Banrural API + QPaypro + Visa QR | Pagos locales en Quetzales, acceso a banca rural. |
| **Infra** | Proxmox (asgard) + Docker + Cloudflare Tunnel | Self-hosted, costo controlado, privacidad de datos LATAM. |
| **Monorepo** | npm workspaces (evaluar Turborepo si crece) | Compartir UI, types, configs entre apps. |

### Nota importante sobre stack descartado
- `n8n` fue descartado como motor de automatización (legacy en business case HTML v2.0, removido de configs).
- `Dialogflow CX` fue descartado como stack de AI/Chat (legacy en business case HTML v2.0, removido de configs).

---

## 4. Métricas de Negocio (KPIs)

### 4.1 Negocio

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

### 4.2 Técnico / Producto

| KPI | Target |
|-----|--------|
| Uptime | 99.9% |
| API response time p95 | <500ms |
| Webhook delivery success | >99.5% |
| Pago exitoso (conversion) | >85% |
| Mobile page speed (Lighthouse) | >90 |
| Tiempo de onboarding proveedor | <15 min |
| Tiempo de booking (search → confirmación) | <5 min |

### 4.3 Impacto Social

| KPI | Y1 | Y2 | Y3 |
|-----|----|----|----|
| Proveedores que duplicaron ingresos | 15 | 85 | 280 |
| Eventos en comunidades rurales | 40 | 180 | 600 |
| Horas ahorradas/proveedor/mes | 25h | 25h | 25h |
| Disputas resueltas satisfactoriamente | 95% | 97% | 98% |
| Proveedores con acceso a crédito | 5 | 40 | 150 |

---

## 5. Modelo de Ingresos (Dual Currency)

### 5.1 Fuentes de Ingreso

| Fuente | Modelo | Moneda |
|--------|--------|--------|
| Commission (Take Rate) | 12% por transacción | GTQ + USD |
| SaaS Pro (proveedores) | Q385/mes ($49 USD) | GTQ + USD |
| Insurance Add-on | 3% del valor del evento | GTQ + USD |
| Premium Features | Analytics, API, white-label | USD |

### 5.2 Unit Economics

| Concepto | Guatemala (GTQ) | Centroamérica (USD) |
|----------|-----------------|---------------------|
| Ticket promedio por evento | Q6,670 | $850 |
| Revenue por evento (12%) | Q800 | $102 |
| Costo de servicio por evento | Q180 | $23 |
| Margen bruto por evento | Q620 | $79 |

### 5.3 Estrategia de Tasa de Cambio

- Fuente oficial: Banco de Guatemala (Banguat) API.
- Spread: +0.5% sobre oficial.
  - 0.25% → Fondo de protección para proveedores rurales.
  - 0.25% → Descuentos para clientes frecuentes.
- Cache de tasa: actualizar cada 6 horas.
- Tasa actual de referencia: **Q7.85 = $1.00 USD**.

---

## 6. Estructura de Carpetas

### 6.1 Actual (MVP funcional)

```
projecto-alquifiestas/
├── business-cases/
│   └── alquifiestas-1m-year.html
└── projects/
    └── alquifiestas/
        ├── apps/
        │   └── web/              # Next.js 14 funcional
        │       ├── app/          # Route groups (public, auth, dashboard, api)
        │       ├── components/   # UI base + productos
        │       ├── hooks/        # useAuth (Zustand)
        │       ├── lib/          # Seeds, utils, DB types, AI matching
        │       └── public/images/# Assets estáticos (seeds)
        ├── docs/
        │   └── FAL_AI.md         # Nota de herramienta dev (NO parte del producto)
        ├── scripts/
        │   └── generate-images.mjs # Script dev para seeds visuales
        ├── supabase/
        │   └── seed.sql          # SQL seeds
        ├── .github/workflows/
        │   └── ci.yml            # GitHub Actions (lint, typecheck, build)
        ├── CLAUDE.md
        ├── HERMES_CONTEXT.md
        ├── package.json
        ├── .env.example
        └── netlify.toml
```

### 6.2 Objetivo (monorepo con npm workspaces)

```
alquifiestas/
├── apps/
│   ├── web/                    # Next.js 14 principal (App Router)
│   │   ├── app/
│   │   │   ├── (auth)/        # Login, registro, recuperación
│   │   │   ├── (dashboard)/   # Panel proveedores + clientes
│   │   │   ├── (public)/      # Landing pública (SEO)
│   │   │   ├── api/           # API routes (webhooks, integraciones)
│   │   │   └── layout.tsx
│   │   ├── components/
│   │   ├── lib/               # Utils, helpers, types
│   │   ├── hooks/
│   │   └── next.config.js
│   └── marketing/              # Landing page estática (Astro o Next static)
│       ├── src/
│       └── package.json
├── packages/
│   ├── ui/                     # Componentes compartidos (Design System)
│   │   ├── components/
│   │   ├── index.ts
│   │   └── package.json
│   └── config/                 # Configs compartidas
│       ├── tsconfig/
│       ├── eslint/
│       └── tailwind/
├── supabase/
│   ├── migrations/             # SQL migrations (versionadas)
│   ├── functions/              # Edge Functions (Deno)
│   ├── seeds/                  # Datos de prueba
│   └── config.toml
├── engine/                     # Motor de automatización (stack a definir)
│   ├── jobs/
│   ├── workers/
│   └── README.md
├── docs/
│   ├── architecture.md
│   ├── database-schema.md
│   ├── api-reference.md
│   ├── deployment.md
│   ├── security.md
│   └── automation-engine.md
├── infra/
│   ├── docker/
│   ├── proxmox/
│   └── cloudflare/
├── .github/
│   └── workflows/
├── scripts/
├── .env.example
├── .gitignore
├── package.json
├── turbo.json
└── README.md
```

---

## 7. Problema que Resolvemos

- Los proveedores de eventos pasan **60-70%** de su tiempo en coordinación logística manual (WhatsApp, llamadas, Excel).
- Los clientes necesitan contactar **3-5 proveedores diferentes** por evento sin visibilidad de disponibilidad real.
- **40%** de eventos tienen disputas por pagos parciales, daños o cancelaciones.
- Proveedores rurales (Quiché, Huehuetenango, Alta Verapaz, Petén) **no acceden al mercado urbano** y cobran 50% menos por falta de visibilidad.

---

## 8. Entidades Core de la Base de Datos (esquema propuesto)

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

### Multi-currency en DB (estructura propuesta)

```sql
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

## 9. Rutas de Next.js App Router (planificado)

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

---

## 10. Edge Functions Planificadas (Supabase / Deno)

| Function | Propósito |
|----------|-----------|
| `booking-confirmation` | Validar disponibilidad, crear evento, iniciar pago |
| `payment-split` | Post-pago: calcular comisión, crear payout al proveedor |
| `inventory-sync` | Actualizar disponibilidad post-booking/cancelación |
| `whatsapp-reminder` | Recordatorios 24h antes del evento |
| `exchange-rate-sync` | Fetch diario de tasa Banguat, guardar en DB (cron) |
| `provider-payout` | Ejecutar payouts a Stripe Connect / Banrural |
| `dispute-resolution` | Lógica de mediación automática (escrow) |
| `review-reminder` | Solicitar review 48h post-evento |
| `analytics-daily` | Agregar métricas para dashboard |
| `invoice-generation` | Generar factura electrónica SAT post-pago |
| `provider-churn-risk` | Si proveedor sin bookings en 30 días, ofrecer incentivo |

---

## 11. Jobs / Workflows Core del Motor de Automatización

Independientes del stack elegido:

- `booking-confirmation` — Post-booking: confirmar disponibilidad, enviar email/WhatsApp.
- `payment-reminder` — 48h antes de pago pendiente.
- `payment-split` — Post-pago exitoso: calcular comisión, programar payout.
- `inventory-sync` — Post-booking/cancelación: actualizar calendario.
- `whatsapp-reminder` — 24h antes del evento: recordatorio a cliente y proveedor.
- `review-request` — 48h post-evento: solicitar review.
- `dispute-escalation` — Si disputa no resuelta en 72h, escalar a humano.
- `provider-onboarding` — Post-registro: verificar documentos, activar cuenta.
- `provider-churn-risk` — Si proveedor sin bookings en 30 días, ofrecer incentivo.
- `exchange-rate-alert` — Si tasa varía >2% en 24h, notificar a contabilidad.
- `daily-analytics` — Agregar métricas, enviar reporte a admins.
- `invoice-generation` — Generar factura electrónica post-pago (SAT Guatemala).

---

## 12. Roadmap de 12 Etapas

| Etapa | Título | Estado |
|-------|--------|--------|
| **0** | Fundamentos del Proyecto | 🔄 En curso |
| **1** | Diseño de Producto y UX | ⏳ Pendiente |
| **2** | Arquitectura de Base de Datos | ⏳ Pendiente |
| **3** | Arquitectura de API y Backend | ⏳ Pendiente |
| **4** | Arquitectura de Frontend | ⏳ Pendiente |
| **5** | Motor de Automatización | ⏳ Pendiente |
| **6** | Pagos Multi-moneda y Finanzas | ⏳ Pendiente |
| **7** | Infraestructura y DevOps | ⏳ Pendiente |
| **8** | Seguridad, Compliance y Legal | ⏳ Pendiente |
| **9** | Inteligencia Artificial y Chat | ⏳ Pendiente |
| **10** | MVP y Lanzamiento (Meses 1-6) | ⏳ Pendiente |
| **11** | Escalamiento Regional (Meses 7-18) | ⏳ Pendiente |
| **12** | Rentabilidad y Expansión (Meses 19-36) | ⏳ Pendiente |

### 12.1 Scope del MVP (Fase 1)

- Registro/login de clientes y proveedores.
- Perfil básico de proveedor con productos.
- Búsqueda por categoría y ubicación.
- Booking flow: carrito → checkout → pago.
- Pago único: Banrural (GTQ) o Stripe (USD) — **no split en MVP**.
- Confirmación por email/WhatsApp.
- Dashboard básico de proveedor (mis eventos).
- Tasa de cambio mostrada pero no protección aún.

---

## 13. Decisiones Pendientes Críticas

> Estas decisiones bloquean el avance a implementación. Deben resolverse antes de codear.

1. **Motor de automatización:** ¿Edge Functions + cron, Inngest, Temporal, BullMQ, u otro? (Bloquea Etapa 5)
2. **Stack de AI/Chat:** ¿LLM propio, Intercom, proveedor local LATAM, o bot reglas para MVP? (Bloquea Etapa 9)
3. **Monorepo:** ¿npm workspaces o Turborepo? (Impacta build, caching, CI)
4. **API:** ¿Server Actions de Next.js o API Routes tradicionales? (Impacta arquitectura backend)
5. **Estado global:** ¿Zustand o React Context? (Impacta complejidad frontend)
6. **Almacenamiento de imágenes:** ¿Supabase Storage o Cloudflare R2? (Impacta costo, CDN)
7. **App móvil:** ¿PWA en fase 1 o nativa en fase 2? (Impacta scope MVP)
8. **Chat:** ¿Interno en app o todo por WhatsApp? (Impacta UX, costo)
9. **Escrow:** ¿Automático o manual en fase 1? (Impacta complejidad de pagos)
10. **Verificación de proveedores:** ¿Automática (AI) o manual en MVP? (Impacta tiempo al mercado)
11. **Stripe Connect:** ¿Express o Custom para payouts? (Impacta UX del proveedor, compliance)
12. **Emails transaccionales:** ¿Resend o SendGrid? (Impacta costo, deliverability)

---

## 14. Seguridad y Compliance (planificado)

### 14.1 Seguridad aplicación
- Auth: Supabase Auth con MFA opcional.
- RLS en todas las tablas sensibles.
- Rate limiting en API routes.
- Sanitización de inputs (SQL injection, XSS).
- CSP headers.
- HTTPS everywhere (Cloudflare + Vercel).
- Secure cookies (HttpOnly, SameSite, Secure).
- Rotación de API keys y service role keys.
- No loggear datos sensibles (PII, números de tarjeta).

### 14.2 Verificación de identidad
- Clientes: email/phone verificación.
- Proveedores: verificación de DPI (Guatemala), selfie + documento.
- Empresas: verificación de NIT / registro mercantil.
- Lista de verificación manual para rurales (si OCR falla).

### 14.3 Compliance por país
- **Guatemala:** Registro en SAT, facturación electrónica, Ley de Protección de Datos Personales.
- **El Salvador:** Ley de Protección de Datos Personales, Banco Central regulación de pagos.
- **Honduras:** Regulación similar a evaluar.
- **KYC/AML:** Para pagos >Q50,000 o $6,500 USD, verificación adicional.

---

## 15. Riesgos y Mitigaciones

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

## 16. Políticas de Refund (planificado)

- Cancelación >7 días: 100% refund menos processing fee.
- Cancelación 3-7 días: 50% refund.
- Cancelación <3 días: no refund (o credit).
- Disputa por daños: escrow hasta resolución (máx 14 días).
- No-show del proveedor: 100% refund + crédito plataforma.

---

## 17. Infraestructura y DevOps (planificado)

### 17.1 Entornos
- **Local:** Supabase local + Next.js dev + motor de automatización local.
- **Staging:** Vercel Preview + Supabase project staging + motor staging.
- **Producción:** Vercel Pro + Supabase Pro + motor en Proxmox/VPS + Cloudflare.

### 17.2 CI/CD (GitHub Actions)
- Lint + Type check + Build en cada PR.
- Tests unitarios + integración en cada PR.
- Deploy automático a Vercel Preview en PRs.
- Deploy automático a producción en merge a `main`.
- DB migrations automáticas en deploy (con revisión manual en prod).
- Backup de DB antes de cada migration en producción.

### 17.3 Monitoreo
- Vercel Analytics + Speed Insights.
- Supabase logs + real-time health.
- Uptime monitoring (UptimeRobot o similar).
- Error tracking (Sentry).
- Alertas por Slack/email si el motor de automatización cae o un job crítico falla.

---

## 18. Inconsistencias Detectadas entre Documentos

| Documento | Menciona | Estado real |
|-----------|----------|-------------|
| `business-cases/alquifiestas-1m-year.html` v2.0 | `n8n` como motor de automatización definitivo | ❌ Descartado en `CLAUDE.md` |
| `business-cases/alquifiestas-1m-year.html` v2.0 | `Dialogflow CX` como stack de AI definitivo | ❌ Descartado en `CLAUDE.md` |

**Acción requerida:** Actualizar el business case HTML para reflejar los stacks descartados y el estado de "a definir".

---

## 19. Glosario / Términos del Dominio

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

## 20. Checklist de Inicio a Implementación

> Antes de escribir la primera línea de código, verificar que todo esto esté completo:

- [ ] Todas las etapas de planificación (1-9) revisadas y documentadas en `/docs/`
- [ ] Decisiones pendientes (sección 13) resueltas y documentadas
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

## 21. Variables de Entorno (.env.example)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# Pagos
STRIPE_SECRET_KEY=sk_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
BANRURAL_API_KEY=xxx
QPAYPRO_API_KEY=xxx

# Automatización / AI
N8N_WEBHOOK_URL=https://n8n.neuralcodelab.com/webhook/
DIALOGFLOW_PROJECT_ID=alquifiestas-dfcx
DIALOGFLOW_LOCATION=global

# Tasa de cambio
EXCHANGE_RATE_API_URL=https://api.banguat.gob.gt/
```

---

## 22. Comandos de Desarrollo (planificados)

```bash
# Root (desde alquifiestas/)
npm install                    # Instala todo (workspaces)
npm run dev                    # Corre apps/web + supabase local

# Apps
cd apps/web
npm run dev                    # Next.js en localhost:3000

# Supabase
cd supabase
supabase start                 # Local Supabase stack
supabase db push               # Push cambios al schema
supabase functions deploy      # Deploy edge functions

# n8n / motor (según stack elegido)
cd engine
# Comandos dependen del motor elegido
```

---

## 23. Notas para el Agente

1. **Este proyecto tiene un MVP frontend funcional.** La app web existe con seeds en memoria. El backend real (DB, Edge Functions, pagos) está pendiente.
2. **Las decisiones críticas pendientes (sección 13) deben resolverse antes de cualquier implementación.**
3. **El business case HTML v2.0 está desactualizado** respecto al stack descartado (n8n, Dialogflow CX). Usar `CLAUDE.md` y este documento como fuente de verdad.
4. **Las imágenes en `public/images/` son seeds estáticos.** El destino real para fotos de proveedores es Supabase Storage. El script `generate-images.mjs` y fal.ai son herramientas de desarrollo, NO parte del producto.
5. **La filosofía del proyecto prioriza impacto social sobre revenue puro.** Las métricas de "amor" (proveedores rurales, horas ahorradas, acceso a crédito) son tan importantes como las financieras.
5. **El foco geográfico es Guatemala primero,** con expansión a El Salvador y Honduras en fase 2, y Nicaragua/Costa Rica en fase 3.
6. **El monorepo usa npm workspaces** (no Turborepo aún, evaluar si escala).
7. **Toda implementación debe considerar:**
   - Multi-currency (GTQ + USD)
   - Row Level Security (RLS) en Supabase
   - Idempotencia en jobs de automatización
   - Offline-first para áreas rurales con mala conectividad
   - Compliance local (SAT Guatemala, protección de datos)

---

> **Última actualización de contexto:** 2026-06-07
> **Fuente:** Consolidación de `CLAUDE.md`, `README.md`, `package.json`, y `business-cases/alquifiestas-1m-year.html`
