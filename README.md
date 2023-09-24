DDR:
Marvelous: +/- 16.7 ms (+/- One Frame)
Perfect: +/- 33 ms (+/- Two Frames)
Great: +/- 92 ms (+/- 5.5 Frames)
Good: +/- 142 ms (+/- 8.5 Frames)
Boo: +/- 225 ms (+/- 13.5 Frames)

Perfect: -8 ms / +24 ms
Great: -16 ms / +38 ms
Good: -24 ms / +64 ms
Bad: -36 ms / +92 ms

TODO: changeable tones, tap tempo, volume meter
login, save

grade: downbeat vs subdivisions

'drill' vs 'bpm'
{
   name: drillName
   data: {
      toneData
   }
}


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
