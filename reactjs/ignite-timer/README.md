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

  A lógica de contagem é diferente: a minha se baseia na quantidade de segundos para o final da contatem enquanto a deles, no total de segundos menos a quantidade de segundos que se passou desde o início da contagem.

  Daí, na minha lógica, quando a UI atualiza após 1 segundo por conta do ```setInterval```, já se passou 1 segundo; enquanto na dele, o valor inicial é o total de segundos e, após 1 segundo, há a subtração, gerando o comportamento normal de um cronômetro.

  ```jsx
    // Mine
    const activeTimerSeconds = activeTimerId ? secondsLeftToEnd : 0
    // Theirs
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  ```

  Portanto, para contornar esse 1s de atraso, escrevi as linhas 80 e 81.

```const countdown = useRef({ intervalId: 0 })```

A linha nao comentada fere o principio da imutabilidade?
Mas esse objeto esta dentro de um map que vai gerar outra lista
  Outra lista é criada, porém o objeto é modificado na lista fonte também.
  Portanto, não é a maneira adequada para atualizar um objeto.
```jsx
  setTimers((state) =>
    state.map((timer) => {
      if (timer.id === activeTimerId) {
        timer.interruptedAt = Date.now()
        // Ou
        // return { ...timer, interruptedAt = Date.now() } 
      }
      return timer
    }),
  )
```

A página de histórico deveria ter o status atualizado em tempo real ou o projeto original também não funciona assim?
  Por exemplo, quando um timer está em contagem, seu estado no histórico é "On going". Quando o timer finaliza, seu estado é "Finished" porém para a tabela atualizar, deve navegar à pagina do timer e voltar à tabela.