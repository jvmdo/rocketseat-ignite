### Play through (failed)
1. Vite
2. styled-components
  - Install default and types
  - Setup type file
  - Implementar CSS global at styles/global.ts
  - At this point... I realized ESLint was needed already
3. eslint [TT]
  - Install
  - Auto setup command npm init @eslint/config
  - Stuck in errors
    - Add "project": ["reactjs/coffee-delivery/tsconfig.json"] to parseOptions in .eslintrc.json
    - add "react/react-in-jsx-scope": "off" to rules in .eslintrc.json
  - At this point... I realized I didn't wipe the project

xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

### Step tracker
1. Vite
2. Wipe project
3. eslint
  - npm i -D eslint
  - npx eslint --init
  - npm i -D @rocketseat/eslint-config
  - Add "@rocketseat/eslint-config/react" to "extends" in .eslintrc.json file
  - Add "lint": "eslint src --ext .ts,.tsx --fix" to npm scripts
  - Reload window
  - npm run lint still needed for every new file
4. styled-components
  - Create global style file
  - Create theme
    - VS Code regex (be careful about quotation marks in font-family)
    - OBS: You must not change DefaultTheme name in export interface DefaultTheme extends ThemeType {}
  - Import fonts in index.html
  - Add <ThemeProvider> in App.tsx
    - Pass created theme as props
    - Instatiate <GlobalStyle/>
      - Create type definition file
      - Change default theme shape createGlobalStyle<{ theme: LightTheme }>
      - Change var to props
        - Regex: var\(--(.+)\) --> ${({ theme }) => theme['$1']}	
5. react-router-dom
  - Create pages files
  - Define Router.tsx
  - Import in App.tsx and wrap it in <BrowserRouter>
6. Implement Header.tsx [T]
  - How to move from traditional way class="container" to styled
  - Create assets directory
  - Import logo and icons from phosphor
7. React layouts
  - Create MainLayout component using <Outlet/>
  - No styles
  - Wrap <Route.../> in another <Route path="/" element={<MainLayout/>}/>
8. Implement IconBox component [T]
  - Define two interfaces (ReactNode and actual props) and combine them
  - Implement styles
  - Headache dealing with props and Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'DefaultTheme'.
    - I defined an ThemeString map as const. Then use it props.theme[ThemeStrings[props.backgroundColor]]
  - How to pass props to ReactNode passed as prop
    - I don't know. I pass directly to its instance as child of IconBox
  - How to pass props to IconBox
    - It as simple as pass one string with autocomplete CTRL + Space because all the values were stablished in the map
  - At this point I realized that... there must be one Theme Map for each category (colors, typography, sizing...)
  - At this point I realized that... There is no need to define a theme map if there is only one theme, since you can MyTheme[p.themeString] to get the values. However, if there was 2 or more themes, p.theme[...] is the right way
9. Figuring out how to implement the cart number
  - content string interpolation must be surrounded by quotes content: '${}'
  - ${({ number }) => number && `content: "${number}"`};
10. 