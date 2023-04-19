# gconf
Commandes disponibles
### set
Cette commande permet de définir un token Github dans la configuration de l'application.

shell
$ gconf set --token <github_token>
Options:

- `--token`: (obligatoire) Token Github à définir dans la configuration de l'application.
Exemple d'utilisation:

shell
$ gconf set --token abc12345
del
Cette commande permet de supprimer le token Github de la configuration de l'application.

shell
$ gconf del --token <github_token>
Options:

--token: (obligatoire) Token Github à supprimer de la configuration de l'application.
Exemple d'utilisation:

shell
$ gconf del --token abc12345
repo
Cette commande permet de créer un nouveau repository sur Github.

shell
$ gconf repo
Exemple d'utilisation:

shell
$ gconf repo
issue
Cette commande permet de créer un nouvel issue sur Github.

shell
$ gconf issue
Exemple d'utilisation:

shell
$ gconf issue
branch
Cette commande permet de gérer les branches sur Github.

shell
$ gconf branch [-d]
Options:

-d ou --delete: Supprime une branche locale.
Exemple d'utilisation:

shell
$ gconf branch -d
test
Cette commande permet de gérer les branches localement.

