### What I learned

#### HTMLAttributes vs HTMLProps vs {Specific}HTMLAttributes

`HTMLAttributes` é uma interface que define os atributos comuns a todos os elementos HTML, como `className`, `id`, `style`, etc. `HTMLProps` é uma interface que estende `HTMLAttributes` e adiciona alguns atributos extras do React que são específicos para cada tipo de elemento HTML, como `ref`, `key`, etc.

Por exemplo, se você quiser criar um componente de botão que aceita todos os atributos de um elemento `<button>`, você pode usar `HTMLProps<HTMLButtonElement>` como o tipo das props do seu componente. Isso vai garantir que você possa passar atributos como `type`, `disabled`, `onClick`, etc. para o seu componente de botão.

```tsx
interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  // Custom properties
}

export function Button(props: ButtonProps) {
  return <button {...props} />;
}

// Instantiating
<Button type="button" onClick={() => alert("Olá!")}>
  Clique aqui
</Button>
```

Se você usar `HTMLAttributes<HTMLButtonElement>` em vez de `HTMLProps<HTMLButtonElement>`, você vai perder os atributos `ref` e `key`, que são importantes para o React gerenciar os elementos do DOM e as listas de componentes.

Portanto, a recomendação é usar HTMLProps quando você quiser criar um componente personalizado que aceita todos os atributos de um elemento HTML específico.

**Onde entram os {Specific}HTMLAttributes?**

No exemplo anterior, deve-se atentar que o component `<Button>` retorna um elemento HTML padrão. Caso o seu componente retorne um `styled component`, então não use `HTMLProps<T>`, pois um erro e *overload* será gerado ao tentar passar as props. Nesses casos, eu utilizo `ButtonHTMLAttributes`, `AnchorHTMLAttributes`, `InputHTMLAttributes`, etc., que são interfaces específicas de cada elemento, oferecendo seus atributos HTML corretamente sem gerar erros. Os demais atributos específicos do React já vêm embutidos no styled component.

### Questions

- How to type an `utils` that accepts an object as parameter? I tried to use what the docs advise but it seems it works only for single values.

- Why does a TypeScript error is raised when I apply the `fluidFontSize` utils in the top level of a style object? No error occurs in nested objects tho.

  > Type 'string' is not assignable to type 'number | { readonly [$$ScaleValue]: "fontSizes"; }'.ts(2322)

- Is it possible to prevent the slider from restoring its scroll position on page navigation?

  > It may be possible to achieve this by programmatically controlling the snap container's scroll behavior based on its scroll values and the offsetWidth/offsetHeight of its children.

- Is it possible to prevent `container` property from creating the same context as `position: relative`? Because of that, I could not make the `GradientArrow` span the entire screen height.

### Continued

Keen-Slider
delete src/layout and api/hello
