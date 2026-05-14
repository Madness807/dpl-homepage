# Homepage — Portail DPL

Page d'accueil interne de la plateforme DPL ([gethomepage.dev](https://gethomepage.dev)).

## Lancement

Build local :

```bash
docker build -t dpl-homepage .
docker run --rm -p 3001:3001 dpl-homepage
```

## Dokploy

Déployer en type **Dockerfile** avec :

- Build Path : `/`
- Container Port : `3001`

L'image garde Homepage en interne sur `3000` et expose `3001` via `start.js`. Cela évite de casser le chargement de `settings.yaml` tout en laissant Dokploy router vers `3001`.

## Accès

Local : `http://localhost:3001`

Dokploy : domaine configuré dans l'onglet Domains.

## Configuration

Tout se passe dans `config/` :

| Fichier | Rôle |
|---|---|
| `settings.yaml` | Titre, thème, layout des catégories |
| `services.yaml` | Liste des tuiles services |
| `widgets.yaml` | Widgets d'en-tête (CPU, RAM, etc.) |
| `bookmarks.yaml` | Liens secondaires, vide actuellement |
| `custom.css` | Habillage visuel du portail |
| `custom.js` | Ajustements client légers |

Pour ajouter un service : éditer `services.yaml`, rebuild et redéployer.

## Notes

- `HOMEPAGE_ALLOWED_HOSTS=*` est défini pour éviter les cassures avec les domaines temporaires Dokploy/sslip.io.
- Les tuiles restent statiques et définies en YAML.
- Les métriques sont basées sur VictoriaMetrics, pas Prometheus.

Quand le domaine final sera stable, remplacer `HOMEPAGE_ALLOWED_HOSTS=*` par une liste explicite de domaines autorisés.
