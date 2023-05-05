# Projeto 06 - Ignite Call

O sexto projeto da trilha atualizada de React.js do *bootcamp* Ignite da [Rocketseat](https://www.rocketseat.com.br/) ensina como desenvolver um aplicativo web para agendamento de vídeo-conferências integrado ao Google Calendar utilizando o *framework* Next.js.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screencast](#screencast)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Questions](#questions)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

Ignite Call é um aplicativo web para agendamento de vídeo-conferências no Google Meet integrado ao Google Calendar. O website é renderizado no servidor utilizando as funcionalidades do Next.js; é estilizado com o [Design System desenvolvido do projeto anterior](../design-system/README.md) e utiliza as APIs do Google para comunicação com os serviços.

O *layout/design* da aplicação está disponível [nesse projeto Figma](https://www.figma.com/community/file/1161274296921389678).

### The challenge

A proposta desse módulo é desenvolver um projeto *fullstack* completo, do zero ao deploy, utilizando Next.js, Next Auth, Google APIs, Prisma, PlanetScale, Vercel dentre outros serviços, tecnologias e ferramentas.

#### Design

- ✔️ Aplicação correta de fontes, cores, tamanhos, espaçamentos, ilustrações, ícones e textos;
- ✔️ Reação de botões e campos de texto a *hover over*, *focus* e *disabled*;
- ✔️ Responsividade a partir de 320px (bônus)

#### Funcionalidades

- ✔️ Criar conta de usuário e conectar à conta Google utilizando OAuth;
- ✔️ Criar agendamentos e relacioná-los a um usuário;
- ✔️ Criar lembrete com *link* para o Google Meet no Google Calendar do usuário;
- ✔️ Formulários formatados e validados;
- ✔️ API Routes para CRUD no banco de dados.

### Screencast

![App preview](./screenshots/screencast.gif)

### Links

- [Live preview](https://ignite-call-jvmdo.vercel.app/)

- [Remote repository](https://github.com/jvmdo/rocketseat-ignite/tree/main/reactjs/ignite-call)

## My process

Por conta do tamanho deste módulo (10h de duração), adotei a abordagem de implementar uma parte do projeto a cada seção de lições. Assim, o processo foi assistir a seção inteira, tomando notas dos pontos importantes para, então, partir para o código, evitando ao máximo consultar a fonte.

### Built with

#### Technologies, libraries and tools

- React.js
- Next.js
- TypeScript
- [Ignite UI Design System](../design-system/README.md)
- Next Auth
- Nookies
- Prisma
- Google APIs
- Axios
- React Query
- Day.js
- React Hook Form
- Zod
- Validator
- Next SEO
- Phosphor React

#### Techniques, concepts and more

- Mobile-first workflow
- Semantic HTML5 markup
- Flexbox / Grid
- Backend for Frontend with Next.js API Routes
- Docker
- PlanetScale
- Vercel

### What I learned

1. In order to pass flags to pre-defined NPM scripts, you must include a double dash before the flags:

    ```bash
    npm run lint -- --fix
    ```

2. By default, Next.js sees every file placed within `/pages` as an actual page route. In cases you want to tell Next.js that only certain files are meant to be pages, use `pageExtensions` option in `next.config.js`

    For example, the following config sets pages to be only files with `page.tsx`

    ```tsx
    const nextConfig = {
     ...,
     pageExtensions: ['page.tsx']
    }
    ```

    **N.B**: `_app.tsx` and `_document.tsx` also must be renamed to include page in their filenames.

    Then `export { default } from './home'` where an `index.tsx` file is placed

3. By setting the callback function passed to Hookform's `handleSubmit` as asynchronous, we can make the form aware of the submitting state and utilize its `isSubmitting` property.

4. Next.js font optimization. I don’t like the official snippet to inject the font, so I used [this snippet from this open issue about the official one](https://github.com/vercel/next.js/issues/44840#issuecomment-1442347859)

    I had to change to the common Google Fonts links after because that shit does not worked as expected

5. A little bit about the Singleton Pattern with ES Modules

    The singleton design pattern is a way of ensuring that there is only one instance of a class, and that it can be accessed globally by other components.

    The **`new PrismaClient()`** call in the **`prisma.ts`** module is executed once when the module is imported, and the resulting instance is exported as the **`prisma`** object. Any module that imports **`prisma`** will receive the same instance of **`PrismaClient`**. Therefore, the **`prisma.ts`** module provides a singleton instance of **`PrismaClient`**.

6. In cases wherein the `baseURL` from both client and server API is the same, the `axios` config is set as the path (`/api`) without needing to provide the full URL.

7. How to clear query params out from URL

8. Hookform’s field arrays. Including uses of `<Controller />` and `watch()`

9. It’s a good practice to transform the times format to something that eases its use in operations the app will need to do upon them later

10. The type inferred from `z.infer<>` matches the output type after the `transform` and `refine` pipeline, the same as `z.output<>`. Use `z.input<>` to get the type before the pipeline.

11. Cookies with `nookies`. Cookies over Local Storage because we can access them in both front and back.

12. You must restart Prisma Studio every time you add/remove rows from tables

    Use `npx prisma migrate reset` to wipe the database out!

13. It’s not possible to use `Prisma.createMany()` with SQLite because the database does not support multi-insert. The workaround is to loop and individually `create()` each record.

14. An empty array in `getStaticPaths` with `fallback: block` means that the server will generate a static page only on its first access. Then, subsequent access will return the already built page.

15. It’s a common (maybe good) practice to set a button’s `line-height: 0` when button content is only an icon.

16. The goddamned generics used in `useForm` is not an “array of objects”. It’s actually an object of array of objects!!!

    I must pay attention to that shit

17. Make sure hookform has the resolver set otherwise nothing will work and you will spent hours!

18. Zod’s `refine` method allows us to write custom validation logic

19. The `step` attribute of `input time` is ignored in some browsers, including FF for Devs KEKW

20. You want to set `height: x%` but the parent has no explicitly height set. If you know the factor between width and height, `aspect-ratio` come in rescue! Bonus: responsiveness.

    An alternative approach to the previous technique is to absolute positioning the child and set its `inset-block`. However… remember the element will be take out of the normal flow.

    Or... just try out Grid. Grids implicit sizes may be the way for you to go

21. Grid animations can be a good approach to avoid vertical layout shifting

22. How to build a backend for frontend in Next.js

23. A thing about serverless I didn't know: it can't neither run web sockets, long process nor write files because it is stateless. What does it mean? Well...

24. Be careful when renaming directories already in Git. Use the suitable Git commands to rename or remove the folder

25. It’s needed to run `prisma generate` before build when deploying to Vercel. The recommend way is to add `postinstall: prisma generate` to NPM scripts.

#### Stuff I learned the basics of

  1. Prisma

      Prisma is an Object-Relational Mapping (ORM) for Node.js highly integrated with TypeScript. Besides the Client (query-builder), it comes with a built-in migration system and a GUI studio.

      ORM stands for Object-Relational Mapping. It is a programming technique that allows developers to interact with relational databases using object-oriented programming (OOP) principles.

      In an ORM, each table in a relational database is represented by a class, and each row in the table is represented by an object of that class. This allows developers to use familiar OOP concepts like inheritance, polymorphism, and encapsulation to manipulate data in the database.

      ORMs provide an abstraction layer between the application code and the database, which can simplify database interactions and reduce the amount of SQL code that developers need to write. ORMs typically provide an API or set of APIs that allow developers to perform CRUD (create, read, update, delete) operations on the database using object-oriented methods.

      Workflow | Data modeling | Schema | Client | Migrate | CLI | CRUD

  2. Next Auth

      OAuth | Adapters | Refresh tokens

  3. Day.js
  4. React Query
  5. Next SEO
  6. Docker
  7. PlanetScale

      Database as a service suitable for serverless MySQL

  8. Google APIs

      Documentação mais bagunçada que o meio campo da Vasco ou eu não sei ler.

### Questions

1. I would like to extend the Ignite UI Stitches objects. My approach would destructure the objects in my own Stitches but it would need to install the package in my project. In this case, my project would store two Stitches packages or the bundle process does some magic?

2. Why `TextInput` outline did not work? I had to styled by my own

3. In my custom `<ValidationMessage />` component, why does TS autocomplete not work for name prop?

4. Why do I need to use `!important` to override default CSS from the Ignite UI, but the instructor’s project don’t?

5. What’s the difference between `axios.create()` and `new Axios()`

6. How to prevent the time input to display end times earlier than start times?

7. On Firefox, the time input styles does not update when the checkbox states changes. It does not occurs neither on Edge nor on Chrome.

8. Why `field.id` as id for checkbox raises an error “id on the client does not match id on the server”

9. How to prevent some routes to be loaded by directly typing its URL in the browser? I am able to reach the `intervals` page without login.

10. Hookform is not understanding zod’s `z.input<>` and `z.output<>`. Is that a bug of am I burro?

11. What's the deal with Next.js Fonts?

12. Considering the following code snippet

    ```tsx
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null)
    const dateYm = selectedDate?.format('YYYY-MM')
    const { data: busyDates } = useQuery({
        queryKey: ['dates', { date: dateYm }],
        queryFn: async ({ queryKey }) => {...}

    ```

    My question is: will `dateYm` trigger `queryFn` on every `selectedDate` in the same month and year? For example, if I click on days 03, 04, 05, 06 of the same month and year, will it trigger another query?

    Answer according to ChatGPT: “

    No, it won't trigger another query. Since **`dateYm`** is derived from **`selectedDate`** and **`useQuery`** is using the **`queryKey`** to identify the query, as long as the **`dateYm`** value remains the same, the query will not be re-triggered.

    In your example, **`dateYm`** would only change when the month or year of the **`selectedDate`** changes, triggering a new query. If you click on days 03, 04, 05, 06 of the same month and year, **`dateYm`** will remain the same, and the query will not be re-triggered.

13. In `api/users/schedule`, how should I handle the GoogleApi exceptions? What if the scheduling is created in database but the GoogleApi fails?

14. About [WAL #3](#what-i-learned). In production, the button is enabled back before the backend process actually ends. How to prevent that?

### Continued development

Wow! That's too much information. There are plenty things in the projects that could be improved:

1. When an user tries to create another account using the same provider, the app will link every resource to the previous created account, not this new one.

2. User Logout

3. Go to Schedule page when a User is already logged in

4. Prevent get to routes by typing them directly in browser

5. Production issue: I’m getting HTTP 304 on GET requests for some resources, that’s why the front-end is not able to display the `busy-dates` correctly. I’m not fixing it for now since it’s not related to React and the app is working live.

    ![304 logs](./screenshots/304.jpg)

Despite of all that things, however, I'm marching forward because there are much more to learn.

### Useful resources

- [Ignite UI Storybook](https://rocketseat-education.github.io/05-design-system/?path=/story/home--page)

- [Animating CSS Grid (How To + Examples) | CSS-Tricks](https://css-tricks.com/animating-css-grid-how-to-examples/)

- [Next.js Fonts workaround](https://github.com/vercel/next.js/issues/44840#issuecomment-1442347859)

- [In a Git repository, how to properly rename a directory?](https://stackoverflow.com/a/11183844/7631147)

- [Prisma - How to configure your build process on Vercel to avoid caching-related problems](https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/vercel-caching-issue)

## Author

- GitHub - [jvmdo](https://github.com/jvmdo)

- Frontend Mentor - [@jvmdo](https://www.frontendmentor.io/profile/jvmdo)

- CodeWars - [jvmdo](https://www.codewars.com/users/jvmdo)

- LinkedIn - [João Oliveira](https://www.linkedin.com/in/de-oliveira-joao/)

## ~~Step Tracker~~

### ~~Project: Initial setup (chore)~~

- [x]  Start up a new Next project
    1. `npx create-nextapp@latest`
- [x]  Install Ignite UI
    1. `npm i @ignite-ui/react@latest`
    2. Define the global CSS rules
    3. Setup font links
    4. Add favicon
    5. Setup SSR for styles
    6. Extends Rocketseat ESLint config
- [x]  Setup `pageExtensions` in `next.config.js`
- [x]  Try to destructure the Stitches’ from Ignite UI into the app’s own `createStitches`

### ~~UI: Home (feat)~~

- [x]  Get the hero and background image
- [x]  Put `index.tsx` in `/home` directory. The `index.tsx` must export from home directory.
- [x]  Write the page markup and styles. Don’t forget to use the components from our UI Kit
    1. Next.js `<Image quality={100} priority/>`
        1. What’s the width that fits entirely in 1080px screen?
    2. `maxWidth: calc()` ?
    3. Target the Stitches component and style it as regular
    4. Remember: the Google button was changed by that form
- [x]  Implement the form logic and validation
    1. Import zodResolver from the zod module of the resolvers package and pass the schema as its argument in the form’s options
    2. Regex for usernames. Only letters and dashes, min 3. Transform to lowercase
    3. The error message is placed outside the `<Box as='form'/>`

### ~~UI: Register (feat)~~

- [x]  Directory `pages/register`
- [x]  Markup and styles
- [x]  Form logic and validation

### ~~Pagination: First Step (feat)~~

- [x]  Push the new route with the username as query param
- [x]  Get the param and set the input field value at the first render
    1. Check the param’s type before assign it

### ~~Database: Initial setup (chore)~~

- [x]  Setup Prisma
    1. `npm i -D prisma` CLI
    2. `npm i @prisma/client` API
    3. `npx prisma init --datasource-provider SQLite`
    4. Ignore `.env` file
    5. Install Prisma extension
    6. Format on save in settings
    7. Define the `User` model
    8. `npx prisma migrate dev`
    9. `npx prisma studio`
    10. `touch src/lib/prisma.ts`

### ~~API: Persist new user (feat)~~

- [x]  Setup axios at lib directory
    1. Frontend and backend is in the same base URL
- [x]  Implement `users/index.api.ts`
    1. Check request method
        1. `res.status(405).end()`
    2. `prisma.user.create({...})`
        1. `res.status(201).json(user)`
    3. Check if `username` already exists
        1. `res.status(400).json({m})`
- [x]  Make POST request in register page
    1. In case of errors, display `message`

### ~~API: Signup | OAuth (feat)~~

- [x]  Setup Google OAuth
    1. console.cloud.google
    2. New project
    3. OAuth permissions
    4. External
    5. Publish app
    6. Credentials > OAuth Client ID
    7. Origin: <https://localhost:3000>
    8. Redirect: origin/api/auth/callback/google
    9. .env both tokens
    10. Activate services API > calendar
- [x]  Setup NextAuth.js
    1. `npm i next-auth`
    2. `api/auth/[...nextauth.api.ts]`
        1. Copy from docs
        2. `NextAutoOptions` type
        3. `GoogleProvider`
            1. `clientId`
            2. `clientSecret`
        4. .env NEXTAUTH_SECRET=””
    3. Wrap `app` in `SessionProvider`
        1. get `session` `pageProps`
- [x]  Invoke `signIn('google')` on click
- [x]  Check it’s working
    1. next-auth cookies or
    2. `useSession` hook `.data`
- [x]  Ask for permissions
    1. `authorization: { params: scope`
    2. `https://www.googleapis.com/auth/{userinfo.email userinfo.profile calendar}`
    3. Remove access in G account if you want to go through the whole sign in flow again. Delete cookies as well
    4. In case the user does not provides permissions
        1. `callbacks: { signIn` check if scope does not includes calendar then return redirect string with query param
        2. return true otherwise

### ~~UI: Register | Calendar (feat)~~

- [x]  `register/calendar/index.page.tsx`
    1. Check if the URL contains permission error. If true, display error message and disable button
    2. Otherwise, change connect button

### ~~Pagination: Second Step (feat)~~

- [x]  From route `register` to `calendar`

### ~~API: nookies user session (feat)~~

- [x]  `setCookies` in the user API route after persist user in database

### ~~API: Auth adapter (feat)~~

- [x]  Implement your own adapter
    1. schema.prisma (copy)
    2. run migration
- [x]  `touch lib/auth/prisma-adapter.ts`
    1. `touch src/@types/next-auth.d.ts`
    2. ESLint ignore `.d.ts`
    3. import in api/auth…
    4. Clear everything (g account, cookies, db) then test the sign up flow

### ~~UI: Register | Time Intervals (feat)~~

Intervals? Are there any other better name?

- [x]  Layout and styles
    1. `IntervalOuterBox`
    2. `IntervalInnerBox as form`
    3. `IntervalItem`
    4. `<Input type="time" step={60}/>`
    5. `input::webkit-calendar-picker-indicator`
- [x]  Form logic
    1. `intervals` array of weekdays
    2. `const fields = seFieldArray({`
    3. Iterate over `fields`
    4. The name passed to`register` method is based on the array from `fields`
    5. Utils. Format weekday with `Intl, Array and Date.UTC()`
    6. `<Controller/>` for checkbox
    7. `watch` fields for not checked boxes and disabled their respective time inputs
- [x]  Form validation
    1. Define an empty schema and type just to log data
    2. `z.array(...)`
    3. Make sure array length = 7
    4. `transform` filter enabled only
    5. `refine` filter array length > 0
        1. Selecione pelo menos um dia da semana
    6. `<ValidationMessage />`
    7. `transform` times to minute. The new object overwrites the old one
        1. Utils. `calendarTimeToMinutes`
    8. `refine` check if every time makes sense (end > start)
        1. O horário de término não pode ser menor ou igual ao horário de início

### ~~API: Persist user intervals (feat)~~

Cadastrar o intervalo de tempo que o user tem disponibilidade

- [x]  new Prisma model
- [x]  `touch auth/time-intervals.api.ts`
    1. Get the user session on server with `getServerSession`
    2. If no session, return 401
    3. Define the schema then parse body
    4. New interface in `@types`
    5. Loop over intervals and create a new record for each of them in a promise all
    6. Return 201
- [x]  Make POST request

### ~~Pagination: Third Step (feat)~~

- [x]  From `calendar` to `intervals`, push `register/intervals` on click

### ~~UI: Register | Profile (feat)~~

~~Profile picture button removed~~

Na primeira renderização, os dados da sessão do usuário não estão disponíveis porque a `useSession` é uma operação assíncrona: O Next.js faz uma requisição do front ao back. Porém, é possível contornar esse comportamento padrão.

O `session` passado no `SessionProvider` na raiz é proveniente do servidor através do `getServerSideProps`. Porém, como nenhuma página está aplicando SSR, a variável é `undefined` ainda. O seu valor é alterado somente quando o hook é utilizado.

Portanto, se a sessão do usuário for gerada no `getServerSideProps` da página, os dados da sessão estarão disponíveis logo na primeira renderização através do `useSession`.

- [x]  Extend types in `buildNextAuthOptions` and `PrismaAdapter`.
- [x]  Get the user session within SSR method (the same that is done in the auth endpoint - unstable) and return it `{ props: { session`
    1. That data contains the user profile picture URL
- [x]  UI

### ~~API: Update profile (feat)~~

- [x]  Add `bio` row to User model
- [x]  Implement `api/users/profile.api.ts`
    1. Method PUT
    2. Get user session. Use its Id to find and update its bio row.
    3. Success 204
- [x]  Make request from page
- [x]  Navigate to `schedule/{username}`

### ~~Pagination: Fourth Step (feat)~~

- [x]  From intervals to profile, push to `register/profile`

### ~~UI: Schedule (feat)~~

- [x]  Slug route [username]
- [x]  SSG
    1. Get username using `params`
    2. Make a query into database
    3. If no user, `notFound: true`
    4. Otherwise, return name, bio, img
    5. Revalidate 24 hours
    6. `getStaticPaths` empty array
    7. fallback block

Ao contrário das etapas de cadastro, as etapas de agendamento não necessitam persistir dados, exceto a etapa final. Por isso, apenas uma única rota é utilizada.

- [x]  Components/Calendar
    1. Body is a table
    2. Days are button
    3. Refactor Formatter to return ABC
- [x]  Calendar logic and behavior
    1. useState and dayjs library
    2. Define the `/lib/dayjs.ts` file where the locale is set then import it in the app root
    3. Handle previous and next months with `dayjs().sub/add`

    It’s a matrix! Each array is a week that includes the days.

    1. Create the array using `dayjs.daysInMonth()` and `dayjs.set('date', i + 1)`.

    The above date method does not return a number. It actually returns an object full if information about.

    1. Create another array that contains the dates of the previous month using `get('day')` and `.subtract(i +1, 'day')`
    2. Create another array that contains the dates of the next month using `.set('date', obj.daysInMonth()`, `get('day')` and `.add(i + 1, 'day')`
    3. Define the final array interface / type
    4. Concatenate the arrays, where the other months’ dates are disabled.
    5. Reduce the concat ones to create the matrix
    6. Wrap memo. Custom hook?
- [x]  More about calendar
    1. Disable days that are before today
    2. Calendar props: boolean and callback
        1. Apply them!
        2. They come from Scheduling
- [x]  Components/TimePicker
    1. The weekday header depends on whether a date is selected or not. If so, use that date to get the info
        1. Pass as props
    2. Define the times interface
        1. Pass times and available times as props
    3. Disabled if no avaialble time
- [x]  Page layout and styles
    1. baseWidth 😮

    How to deal with the table’s open and close state? It’s simple! If there is enough space, the time picker is displayed aside the calendar, otherwise below. The time picker has two different layouts for each situation.

- [x]  ConfirmationForm
    1. UI
    2. Form logic and validation

### ~~API: Scheduling | Ava. Time Slots~~

- [x]  Create Scheduling model
- [x]  `touch users/[username]/ava.api.ts`

    Retorna os horários disponíveis de um usuário em uma dada data (usar timestamp?)

    1. Check if is GET || 405
    2. Get the username from URL
    3. Get the date from URL
        1. If null, 400
    4. Query for user in database
        1. If null, 400
    5. Parse date to dayjs
    6. Check if date is before today
        1. If true, two empty arrays
    7. Query for a user time interval where `week_day` matches the day from date
        1. If null, two empty arrays
    8. Get the times, transform them to hours then create a range of hours array
    9. Get the busy times from scheduling than filter the previous array
- [x]  Make the GET request
    1. Define the interface (times and available times)
    2. Define the state variable
    3. If some date is selected, make the API request within an `useEffect` in the SchedulingCalendar comp
        1. set state
- [x]  `npm i @tanstack/react-query`
    1. `touch rc/lib/react-query.ts`
    2. Wrap the root in the provider passing the singleton as client
    3. `useQuery`

### ~~API: Scheduling | Busy Dates~~

- [x]  `touch api/users/[username]/busy-daytes.ts`
    1. Get `year` and `month` from query params
        1. If either one is null, res 400
    2. Find user available dates
    3. Filter, returning busy dates
    4. raw SQL query (copy)
        1. Docker for SQL
        2. `docker run --name mysql -e MYSQL_ROOT_PASSWORD=docker -p 3306:3306 mysql:latest`
        3. `docker start mysql`
        4. `docker stop mysql`
        5. `DATABASE_URL="mysql://root:docker@localhost:3306/ignite-call` in .env file
        6. Delete dev.db
        7. Change provider name to `mysql`
        8. Delete migrations folder
        9. For string fields that can be larger than 191 characters, add `@db.Text` option
        10. run migrate
        11. Manually add schedules
- [x]  Make the query GET request in Calendar(?) component
    1. busyDates is passed to useCalendar to disabled the busy dates
    2. Before computing, check if there exists busyDates

### ~~UI: Scheduling | Scheduling Flow~~

- [x]  Add a callback to SchedulingCalendar
    1. It must return the selected date to its parent
    2. The callback is trigger on TimePicker time click, passing the hour
    3. The handler creates a dayjs object, set the hour to its start and go back do date object, then invoke the callback
- [x]  In the index, create the state

    The ConfirmForm is rendered as soon as some time is picked

    1. Use its value to check which component to render
    2. Pass the date variable as props to ConfirmStep
        1. Format `“DD[ de ]MMMM[ de ]YYYY”` e `“HH:mm[h]”`
    3. The Cancel button from form invokes the callback from parent.
        1. In parent, this callback is a function that wipes the date state, setting it to null

### ~~API: Scheduling | Schedule~~

- [x]  `touch users/[username]/schedule.api.ts`
    1. Only POST allowed
    2. Retrieve form data and date from body
        1. Create schema and parse it
        2. …
- [x]  Refresh token
    1. […nextauth] auth params
- [x]  `npm i googleapis`
    1. `src/lib/google.ts`
- [x]  In the schedule.api file
    1. Access google calendar
    2. Insert events
- [x]  Make POST request in SchedulingForm component
    1. Redirect to index using the same callback used to Cancel

### ~~SEO (feat)~~

- [x]  `npm i next-seo`
    1. Put `DefaultSeo` in root, right before `Component`
    2. `NextSeo` in each page

### ~~Deploy~~

- [x]  Sign up and create Planescale
    1. ?
    2. schema.prisma `relationMode`
    3. `npx prisma migrate dev`
    4. Get and replace DATABASE_URL
    5. `npx prisma db push`
- [x]  Push repository
- [x]  Create Vercel project
    1. Get the URL connection from PlanetScale
        1. Project > Connect
    2. Add keys
        1. NEXTAUTH_URL (deployed app URL without /)
- [x]  Add deployed app URL to both origens and redirect in console.cloud.google
    1. New OAuth credential
        1. Copy CliendID and secret
        2. Add to Vercel Keys
    2. Credentials
    3. Permissions OAuth
