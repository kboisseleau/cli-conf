# cgg
### Installation

```javascript
$ npm i -g cgg
```
Commandes disponibles
### Config
Cette commande permet de définir ou supprimer un token Github dans la configuration de l'application.

```bash
$ cgg token -t <github_token>
```

ou

```bash
$ cgg token -r <github_repo>
```

ou

```bash
$ cgg token -o <github_owner>
```
Options
La commande token supporte les options suivantes :

-t, --token : Définit un token Github dans la configuration de l'application. Exige un argument <token> pour spécifier le token à définir.
-r, --repo : Définit un repo Github dans la configuration de l'application. Exige un argument <repo> pour spécifier le repo à définir.
-o, --owner : Définit un owner Github dans la configuration de l'application. Exige un argument <owner> pour spécifier le owner à définir.
Exemple d'utilisation pour définir un token Github :

```bash
$ cgg token -t 151515
```
### repo
Cette commande permet de créer un nouveau repository sur Github.

```shell
$ cgg repo
```
Exemple d'utilisation:

```shell
$ cgg repo
```
### issue
Cette commande permet de créer un nouvel issue sur Github.

```shell
$ cgg issue
Exemple d'utilisation:

shell
$ cgg issue
```
### branch
Cette commande permet de gérer les branches sur Github.

```shell
$ cgg branch [-d]
```
Sans options:

Permet de créer une branch à partir d'une issue

Options:

-d ou --delete: Supprime une branche locale.
Exemple d'utilisation:

```shell
$ cgg branch -d
```


