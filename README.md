# cgg
### Installation

```javascript
$ npm i -g cgg
```
Commandes disponibles
### Config
Créer un fichier gconf.json à la racine du projet au format suivant: 

```bash
{
    token: 'githubToken',
    repo: 'githubRepo',
    owner: 'githubOwner'
}
```

Permet l'accès au repo.
Toute les commandes doivent être lancé à la racine du projet.

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


