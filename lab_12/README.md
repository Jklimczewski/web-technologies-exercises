# Laboratorium 12

## Instalacja zależności

```sh
npm install
```

## Uruchomienie `json-server`

```sh
json-server --host 0.0.0.0 db.json
```

Wyjaśnienie: parametr `--host` może być „nadmiarowy”, ale z uwagi na potencjalny problem wspomniany poniżej warto go użyć.

### Uruchomienie serwera deweloperskiego `Vue.js`

```sh
vite
```

__Uwaga__: jeśli serwer deweloperski uruchamiasz w sesji WSL(2), a przeglądarka działa poza nią (np. „pod Windows”) konieczna może okazać się nieco bardziej rozbudowana postać powyższego polecenia:

```sh
vite --host 0.0.0.0
```

W efekcie pojawią się komunikaty podobne do:

```sh
  VITE v5.0.2  ready in 265 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.30.247:5173/
  ➜  press h + enter to show help
```

Wówczas wystarczy w przeglądarce otworzyć adres URL podany po słowie „Network”. Powinno to pomóc.
