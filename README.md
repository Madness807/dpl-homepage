# Homepage — Portail DPL

Page d'accueil interne de la plateforme DPL ([gethomepage.dev](https://gethomepage.dev)).

## Lancement

Depuis la racine du repo :

```bash
make homepage-up      # Démarre Homepage
make homepage-logs    # Suit les logs
make homepage-down    # Arrête
```

Ou directement :

```bash
docker compose -f platform/homepage/docker-compose.yml up -d
```

## Accès

**Phase 1 (sans Traefik) :** `http://<ip-vps-platform>:3001` ou `http://localhost:3001` en local.

**Phase 2 (avec Traefik + AUTH) :** `https://dpl.<domain>` derrière forward-auth Authelia.

## Configuration

Tout se passe dans `config/` (hot reload — pas besoin de redémarrer le container) :

| Fichier | Rôle |
|---|---|
| `settings.yaml` | Titre, thème, layout des catégories |
| `services.yaml` | Liste des tuiles services |
| `widgets.yaml` | Widgets d'en-tête (CPU, RAM, etc.) |
| `bookmarks.yaml` | Liens secondaires |

Pour ajouter un service : éditer `services.yaml`, sauvegarder. Homepage recharge tout seul.

## Phase 1 — limitations assumées

- ⚠️ `HOMEPAGE_ALLOWED_HOSTS=*` : aucune restriction d'accès (cf. ADR 0001).
- ⚠️ Pas d'auto-discovery Docker (YAML statique uniquement).
- ⚠️ Pas de widget vivant (les tuiles sont des liens, pas des panneaux de monitoring).

Toutes ces limitations seront levées en Phase 2 (Traefik + AUTH + Prometheus widgets).
