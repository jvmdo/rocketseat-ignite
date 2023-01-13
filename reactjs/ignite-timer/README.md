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

#### **Pergunta X. Por que a página de histórico não atualiza em tempo real o status do Timer?**

  Quando um timer está em contagem, seu estado no histórico é "On going". Quando o timer finaliza, seu estado é "Finished" porém para a tabela atualizar, deve-se navegar à pagina Home e voltar à History.

  **Resposta X.**
  No projeto original, a contagem regressiva no título também não atualiza quando o app está na History. Um detalhe interessante é que, no meu projeto, escrevi um retorno no código do ```useEffect``` para restaurar o título original da página enquanto no projeto original esse retorno não existe. Isso leva a um comportamento diferente: no meu app, ao alternar para History, a contagem regressiva no título da página é substituída por "Ignite Timer" enquanto no app original a contagem simplesmente congela.

  ```js
    if (currentActiveTimer) {
      document.title = `Countdown ${minutesCountdownString}:${secondsCountdownString}`
    }
    return () => {
      document.title = 'Ignite Timer'
    }
  ```

  Portanto, acredito que os hooks de estado de uma página não são executadas enquanto o app está em outra página. Daí, concluo que, da maneira foi implementado, não tem como a página de histórico ser notificada de que o estado do Timer foi alterado, porque ele não é alterado até visitar a página do Timer.


#### **Pergunta X+1. Se a conclusão da pergunta anterior é verdadeira, por que o Timer apresenta a contagem regressiva correta e atualizada quando o app retorna à Home? Se é incorreta, então como evitar o congelamento da contagem no título?**
  **Resposta X+1.**
  Porque a função responsável pelos *ticks* do relógio é o *callback* executado pelo **setInterval**, o qual é disparado pelo **useEffect** que é disparado pela criação de uma nova contagem. Após isso, a sua execução é independente do hook.

  Esse fato reforça minha crença de que os hooks não são executados em segundo plano, porque, se fossem, o estado da quantidade de segundos seria atualizado, o que iria atualizar a renderização da contagem no título. Enfim, esse é exatamente o tipo de dúvida sanada ao se lê a documentação.

#### Por que, ao deixar e retornar à Home após iniciar uma contagem, o display apresenta, durante 1s, a quantidade total de minutos inicial?
  **Resposta**
  Certamente esse comportamento é devido ao ```useEffect``` ser executado sempre que o app abre a página. O que leva à execução do hook:

  ```js
    setSecondsLeftToEnd(currentActiveTimer.minutes * 60)
  ```
  

### Useful Resources

About immutability https://immerjs.github.io/immer/
See also [this script](./map-vs-reference.js)

About reducer https://dmitripavlutin.com/react-usereducer/