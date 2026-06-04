# Alquifiestas — Estructura del Proyecto

## Stack
- **Frontend:** Next.js 14 (App Router) + TypeScript + Tailwind
- **Backend:** Supabase (PostgreSQL + Auth + Edge Functions)
- **Automation:** n8n (self-hosted en Proxmox)
- **AI:** Dialogflow CX (soporte + leads)
- **Infra:** Proxmox + Docker + Cloudflare Tunnel

## Estructura de Carpetas

```
alquifiestas/
├── apps/
│   ├── web/                    # Next.js app principal (webapp + dashboard)
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
│   │
│   └── marketing/              # Landing page estática (Astro o Next.js static)
│       ├── src/
│       └── package.json
│
├── packages/
│   ├── ui/                     # Componentes compartidos (Design System)
│   │   ├── components/
│   │   ├── index.ts
│   │   └── package.json
│   │
│   └── config/                 # Configs compartidas
│       ├── tsconfig/
│       ├── eslint/
│       └── tailwind/
│
├── supabase/
│   ├── migrations/             # SQL migrations (versionadas)
│   ├── functions/              # Edge Functions (Deno)
│   ├── seeds/                  # Datos de prueba
│   └── config.toml
│
├── n8n/
│   ├── workflows/              # Workflows exportados (.json)
│   ├── credentials/            # Credentials (no commitear, solo template)
│   └── README.md
│
├── docs/
│   ├── architecture.md
│   ├── database-schema.md
│   ├── api-reference.md
│   └── deployment.md
│
├── infra/
│   ├── docker/
│   ├── proxmox/
│   └── cloudflare/
│
├── .github/
│   └── workflows/
│
├── .env.example
├── .gitignore
├── package.json               # Root (scripts globales)
└── README.md
```

## Por qué esta estructura

### 1. **apps/web** (Next.js monolito)
No separés website y webapp en repos diferentes. Usá **route groups**:
- `(public)` → Landing, SEO, captación
- `(dashboard)` → Panel autenticado (proveedores + clientes)
- `(auth)` → Login, registro, recuperación

**Ventaja:** Compartís componentes, auth, y types en un solo lugar.

### 2. **apps/marketing** (Separado solo si escala)
Si la landing necesita:
- Otro equipo trabajando
- Deploy independiente
- Stack diferente (Astro, Framer)

Si no, empezá con `(public)` dentro de `apps/web`.

### 3. **supabase/** (Todo el backend)
- `migrations/` → SQL versionado (RLS, tablas, triggers)
- `functions/` → Edge Functions (Deno) para lógica serverless
- `seeds/` → Datos de prueba para desarrollo

**Flujo:** `supabase db push` en dev, `supabase db diff` para crear migrations.

### 4. **packages/ui** (Design System)
Componentes compartidos:
- Botones, inputs, cards
- Layouts específicos de Alquifiestas
- Hooks de UI (useBooking, useAvailability)

**Ventaja:** Si después hacés app móvil, reutilizás la misma UI.

### 5. **n8n/workflows** (Automation como código)
Exportá los workflows de n8n como `.json` y versionalos.

**Flujos clave:**
- `booking-confirmation.json` → Confirmación automática
- `payment-split.json` → Dividir pagos (cliente → plataforma → proveedor)
- `inventory-sync.json` → Sincronizar disponibilidad
- `whatsapp-reminder.json` → Recordatorios 24h antes

### 6. **Multi-currency (GTQ + USD)**
Estructura de base de datos:
```sql
-- Tabla de eventos
CREATE TABLE events (
  id UUID PRIMARY KEY,
  amount_gtq NUMERIC(12,2),
  amount_usd NUMERIC(12,2),
  currency VARCHAR(3) DEFAULT 'GTQ',
  exchange_rate NUMERIC(10,4), -- Tasa al momento de la transacción
  -- ...
);

-- Tabla de proveedores
CREATE TABLE providers (
  id UUID PRIMARY KEY,
  preferred_currency VARCHAR(3) DEFAULT 'GTQ',
  -- ...
);
```

**En el frontend:**
```typescript
// lib/currency.ts
export const EXCHANGE_RATE = 7.85; // Q7.85 = $1 USD

export function gtqToUsd(gtq: number): number {
  return gtq / EXCHANGE_RATE;
}

export function usdToGtq(usd: number): number {
  return usd * EXCHANGE_RATE;
}
```

## Comandos de Desarrollo

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

# n8n
cd n8n
# Importar workflows desde UI de n8n
```

## Environment Variables

```bash
# .env.example
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

STRIPE_SECRET_KEY=sk_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

BANRURAL_API_KEY=xxx
QPAYPRO_API_KEY=xxx

N8N_WEBHOOK_URL=https://n8n.neuralcodelab.com/webhook/
DIALOGFLOW_PROJECT_ID=alquifiestas-dfcx
DIALOGFLOW_LOCATION=global

EXCHANGE_RATE_API_URL=https://api.banguat.gob.gt/
```

## Próximos Pasos

1. **Inicializar repo:**
   ```bash
   cd ~/neuralcodelab/projects/alquifiestas
   git init
   npm init -y
   ```

2. **Crear apps/web:**
   ```bash
   npx create-next-app@latest apps/web --typescript --tailwind --app --eslint
   ```

3. **Configurar Supabase:**
   ```bash
   npx supabase init
   supabase start
   ```

4. **Primer migration:**
   ```bash
   supabase migration new create_users_table
   ```

¿Empezamos?
