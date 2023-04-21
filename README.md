# gconf
### Installation

```javascript
$ npm i -g gconf
```
Commandes disponibles
### Config
Cette commande permet de définir ou supprimer un token Github dans la configuration de l'application.

```bash
$ gconf token -t <github_token>
```

ou

```bash
$ gconf token -r <github_repo>
```

ou

```bash
$ gconf token -o <github_owner>
```
Options
La commande token supporte les options suivantes :

-t, --token : Définit un token Github dans la configuration de l'application. Exige un argument <token> pour spécifier le token à définir.
-r, --repo : Définit un repo Github dans la configuration de l'application. Exige un argument <repo> pour spécifier le repo à définir.
-o, --owner : Définit un owner Github dans la configuration de l'application. Exige un argument <owner> pour spécifier le owner à définir.
Exemple d'utilisation pour définir un token Github :

```bash
$ gconf token -t 151515
```
### repo
Cette commande permet de créer un nouveau repository sur Github.

```shell
$ gconf repo
```
Exemple d'utilisation:

```shell
$ gconf repo
```
### issue
Cette commande permet de créer un nouvel issue sur Github.

```shell
$ gconf issue
Exemple d'utilisation:

shell
$ gconf issue
```
### branch
Cette commande permet de gérer les branches sur Github.

```shell
$ gconf branch [-d]
```
Sans options:

Permet de créer une branch à partir d'une issue

Options:

-d ou --delete: Supprime une branche locale.
Exemple d'utilisation:

```shell
$ gconf branch -d
```


