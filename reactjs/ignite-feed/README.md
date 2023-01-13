# Projeto 01 - Ignite Feed

No primeiro projeto do <em>bootcamp</em> Rocketseat Ignite, desenvolvi uma página responsiva a partir de um <em>design</em> Figma em que há postagens de usuários e funcionalidades de comentários em postagens, likes e remoção.

## Screenshots

|                                              Mobile                                              |                                              Desktop                                               |
| :----------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------: |
| <img src="screenshots/mobile.jpeg" alt="Screenshot of my solution for mobile devices" width=200> | <img src="screenshots/desktop.jpeg" alt="Screenshot of my solution for desktop devices" width=600> |

## Live site preview

Disponível assim que eu souber resolver [esse problema do .git](https://stackoverflow.com/a/74926059/7631147). A pasta .git deve estar no mesmo nível do projeto Vite, o que não é o meu caso. Por isso meu deploy para o GitHub pages não tem sucesso.

## O que eu aprendi

- Iniciar um projeto ReactJS utilizando Vite

  ```bash
    npm create vite@latest
  ```

- O que é e como utilizar componentes

- Como passar dados para componentes utilizando `props`

- Como aplicar CSS global

- Como aplicar CSS Modules

- Renderização condicional

- Como utilizar biblioteca de ícones e formatação de datas e horas

- Como mapear uma lista de dados para componentes

- O que é e para que serve a propriedade `key`

- Como utilizar variáveis de estado e `useState()`

- Como trocar dados entre componentes passando `callbacks` pelas suas `props`

- O elemento HTML `textarea` não possui atributo `pattern`

- Imutabilidade em React (ler mais)

  - Não se altera variáveis, cria-se outras pois é mais fácil para o React comparar seus valores e atualizar a apresentação

- Closures (ler mais)

  - Utilizar o valor atualizado de uma variável de estado logo após atualizar o seu valor? O valor utilizado será o antigo e não o atualizado como esperado.

    ```js
    const [counter, setCounter] = useState(0);
    setCounter(++counter);
    console.log(counter); // Expected: 1; Real value: 0;
    ```

    ```js
    // Solution #1: use another variable
    const otherCounter = counter + 1;
    setCounter(otherCounter);
    ```

    ```js
    // Solution #2: pass a callback to setCounter that holds the updated desired value
    setCounter((state) => {
      return state++;
    });
    setItems((state) => [...state, newItem]);
    ```

  - Quando se precisar atualizar uma variable de estado que depende de seu valor anterior, recomenda-se utilizar a solution #2.

## Dúvidas

- **Question**. O escopo do modules não funcionou quando utilizei <em>tag selectors</em>. Tive que tornar o seletor mais específico colocando uma class na frente.

  ```css
  /* This rule affects all the components */
  span {
    display: block;
    margin: -2rem 1rem;
  }
  /* This rule affects only the sidebar component */
  .sidebar span {
    display: block;
    margin: -2rem 1rem;
  }
  ```
  **Answer**. That's exactly how CSS Modules is supposed to work: "a CSS Module is a CSS file in which *all class names* and animation names are scoped locally by default.". [Read more](https://github.com/css-modules/css-modules)

- **Pergunta**.Como utilizar várias classes no `className` para evitar repetir regras no CSS (como fiz no componente Avatar)? Ou se existe uma solução mais adequada, sem repetição de CSS.

    **Resposta**. Com CSS Modules composition feature é possível criar uma classe base e utilizar a propriedade ```composes``` para implementar uma composição. [Read more.](https://glenmaddern.com/articles/css-modules")

    ```css
      .common {
        /* all the common styles you want */
      }
      .normal {
        composes: common;
        /* anything that only applies to Normal */
      }
      .disabled {
        composes: common;
        /* anything that only applies to Disabled */
      }
      .error {
        composes: common;
        /* anything that only applies to Error */
      }
      .inProgress {
        composes: common;
        /* anything that only applies to In Progress */
      }
    ```
    Para passar duas ou mais classes:

    ```js
      return <button 
        className={`${style.btn} ${style[variant]}`}
        >
          Submit
        </button>
    ```
