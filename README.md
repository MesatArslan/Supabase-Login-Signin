# Supabase Login & Signin

Next.js 14, TypeScript, Tailwind CSS ve Supabase ile oluşturulmuş bir authentication projesi.

## Teknolojiler

- **Next.js 14** - React framework (App Router)
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Supabase** - Authentication ve backend

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Environment değişkenlerini ayarlayın:
```bash
cp .env.local.example .env.local
```

3. `.env.local` dosyasını düzenleyin ve Supabase bilgilerinizi ekleyin:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Development server'ı başlatın:
```bash
npm run dev
```

5. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## Proje Yapısı

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Ana sayfa
│   └── globals.css        # Global styles
├── lib/                   # Utility functions
│   └── supabase/          # Supabase clients
│       ├── client.ts      # Browser client
│       └── server.ts      # Server client
├── middleware.ts          # Next.js middleware (Supabase session management)
└── ...config files
```

## Özellikler

- ✅ Next.js 14 App Router
- ✅ TypeScript yapılandırması
- ✅ Tailwind CSS entegrasyonu
- ✅ Supabase client yapılandırması (browser & server)
- ✅ Middleware ile session yönetimi

## Geliştirme

Proje tabanı hazır. Login ve signin özellikleri eklenecek.

