falar do modulo e link to repo

```js
  //Injecting 2 or more classes in CSS Modules
  export function Button({ variant = "primary" }: ButtonProps) {
    return <button className={`${style.btn} ${style[variant]}`}>Submit</button>;
  }
```

```js
${(props) => {
    return css`
      background-color: ${props.theme['green-300']};
      color: ${props.theme['green-500']};
      // ...
    `
  }}
```
```jsx
  css`background-color: ${(props) => props.theme['green-300']};`
```

styled component, acessar props, versão typescript, integração de tipos no arquivo .d.ts, extensão vs code, tema, estilos globais, eslint

1. sfkljasdf

2. asfasdf

3. lafsçjdf

![ESLint Conflict Error](./screenshots/eslint-conflict-error.png)
Add the following object inside ```rules``` in .eslintrc.json file
```json
"prettier/prettier": [
  "error",
  {
    "endOfLine": "CRLF"
  }
]
```
Uppercase is not valid. Correct is crlf. Prettier is overtaking ESLint even tho I'm setting ESLint as default in settings.json

npm run lint --fix flag not working
  It works if the flag is directly written in the npm script command

npx eslint src --ext .ts,.tsx --fix working properly
  It affects only the currently opened files
  Must run for every new file. Then the CTRL + Save starts work
  It fixes the prettier CRLF error

Set the input's width within nested rules did not work. But when I changed to styled component inheritance it worked fine.

Por que a primeira execution do timer do projeto original starts exatamente no tempo e nao com 1s de atraso?

```const countdown = useRef({ intervalId: 0 })```