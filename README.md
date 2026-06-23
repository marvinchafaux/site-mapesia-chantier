# MAPESIA — Site vitrine lead-generation

Site vitrine pour **MAPESIA**, fournisseur de matériel de chantier et de
signalisation pour les professionnels. Objectif unique : **générer des demandes
de devis** (appel, WhatsApp, formulaire). Ce n'est pas un e-commerce : aucun
prix, aucun panier, aucun compte.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript** + **Tailwind CSS**
- Emails de devis via **Resend**, validation **zod**
- **Vercel Analytics**
- Déploiement cible : **Vercel**

## Démarrage

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
npm run start    # sert le build
```

> ⚠️ Ne pas lancer `npm run build` pendant que `npm run dev` tourne : ils
> partagent le dossier `.next`. Arrêtez le serveur de dev d'abord.

## Configuration à remplir par le client

### 1. Coordonnées — `lib/site-config.ts`

Toutes les coordonnées sont centralisées dans ce fichier (téléphone, WhatsApp,
email, infos légales). Elles sont **vides par défaut** : tant qu'un champ est
vide, le bouton correspondant s'affiche mais pointe vers `#` (aucun lien cassé).
Remplir le fichier suffit à activer les CTA — aucune autre modification de code.

### 2. Images — `public/images/`

Toutes les images sont des **placeholders gris**. Voir
[`public/images/A-REMPLACER.md`](public/images/A-REMPLACER.md) : il liste les
67 images attendues, leurs chemins exacts et dimensions conseillées. Remplacez
chaque fichier en gardant le **même nom** ; le site les prend automatiquement.

Pour régénérer les placeholders (nécessite Python + Pillow) :

```bash
python3 scripts/gen-placeholders.py     # photos produits/familles/hero/og
python3 scripts/gen-brand-assets.py     # image OG brandée + favicon/icônes
python3 scripts/gen-a-remplacer.py      # régénère le guide A-REMPLACER.md
```

### 3. Envoi des devis — Resend (`.env.local`)

Le formulaire de devis envoie un email via [Resend](https://resend.com).
Copiez `.env.local.example` en `.env.local` et renseignez :

```bash
RESEND_API_KEY=re_xxxxxxxx        # clé API Resend
DEVIS_TO_EMAIL=contact@mapesia.fr # email qui reçoit les demandes
DEVIS_FROM_EMAIL=devis@mapesia.fr # expéditeur (domaine vérifié dans Resend)
```

Étapes Resend :

1. Créer un compte sur resend.com.
2. Vérifier votre domaine d'envoi (DNS) — ou utiliser `onboarding@resend.dev`
   pour les tests.
3. Générer une clé API et la coller dans `RESEND_API_KEY`.
4. Sur Vercel : ajouter ces 3 variables dans **Settings → Environment Variables**.

**Sans clé configurée, le site ne plante pas** : le formulaire renvoie un
message clair invitant à contacter par téléphone / WhatsApp.

## Données du site

- `lib/site-config.ts` — coordonnées et infos légales (source unique). Les 3
  coordonnées (tél / WhatsApp / email) sont en tête de fichier.
- `lib/products.ts` — 9 familles et 56 produits typés (source unique, aucune
  donnée produit codée en dur dans les pages).
- `lib/content.ts` — contenu éditable des sections « Comment ça marche » et
  « FAQ ». Passe `faq.isPlaceholder` à `false` pour activer le SEO FAQPage.
- `lib/jsonld.ts` — générateurs de données structurées Schema.org.
- `lib/seo.ts` — Open Graph par page. `lib/images.ts` — placeholder flou.

## SEO

- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts` (génération native Next)
- Metadata + Open Graph par page
- JSON-LD : `Organization` + `LocalBusiness` (global), `Product` (cône phare),
  `ItemList`/`Product` (pages familles)

## Sécurité

- **En-têtes HTTP** (`next.config.mjs`) : Content-Security-Policy, HSTS,
  `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, Referrer-Policy,
  Permissions-Policy. `X-Powered-By` désactivé.
- **API `/api/devis`** : contrôle d'origine (anti-CSRF/abus cross-site), garde
  de taille de corps (anti-DoS), rate limiting par IP, validation zod, honeypot,
  échappement HTML de l'email et sujet sur une seule ligne.
- **Secrets** : `RESEND_API_KEY` est uniquement lue côté serveur, jamais
  exposée au client. Les fichiers `.env*.local` sont ignorés par git.
- **Rate limiting** : en mémoire (best-effort). En production à fort trafic,
  brancher un store partagé (Vercel KV / Upstash) ou un CAPTCHA
  (Cloudflare Turnstile / hCaptcha) pour une protection robuste anti-bot.
- **CSP** : `script-src` autorise `'unsafe-inline'` car le site est rendu en
  statique (un CSP à nonce imposerait un rendu dynamique, au détriment de la
  performance). La surface XSS est minimale (aucun contenu utilisateur affiché,
  formulaire échappé).
- **Dépendances** : Next 16 / React 19, `npm audit` = **0 vulnérabilité**
  (relancer régulièrement après chaque mise à jour).

## Déploiement Vercel

1. Pousser le repo sur GitHub.
2. Importer le projet dans Vercel (framework détecté automatiquement).
3. Ajouter les variables d'environnement Resend.
4. Déployer.
