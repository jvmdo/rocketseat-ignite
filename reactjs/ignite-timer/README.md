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
    `
  }}
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