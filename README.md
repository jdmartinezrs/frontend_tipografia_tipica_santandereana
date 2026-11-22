# FrontendTipografia

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.2.7.

## Project structure

```
├── public/                        # Archivos estáticos servidos en la raíz
│   └── images/
│       ├── backgrounds/           # Fondos de la app (aside, auth)
│       ├── brand/                 # Logos (aside, auth)
│       └── icons/                 # Iconos
│
├── src/
│   ├── app/                       # Código de la aplicación Angular
│   │   ├── core/                  # Núcleo transversal
│   │   │   ├── guards/            # Guards de rutas
│   │   │   ├── interceptors/      # Interceptores HTTP
│   │   │   └── services/          # Servicios core
│   │   │
│   │   ├── features/              # Módulos por funcionalidad
│   │   │   ├── artists/           # Artistas
│   │   │   │   ├── components/
│   │   │   │   ├── models/
│   │   │   │   ├── pages/
│   │   │   │   ├── services/
│   │   │   │   └── artists.routes.ts
│   │   │   ├── auth/              # Autenticación
│   │   │   │   ├── components/
│   │   │   │   ├── models/
│   │   │   │   ├── pages/
│   │   │   │   ├── services/
│   │   │   │   └── auth.routes.ts
│   │   │   ├── cart/              # Carrito
│   │   │   │   ├── components/
│   │   │   │   ├── models/
│   │   │   │   ├── pages/
│   │   │   │   ├── services/
│   │   │   │   └── cart.routes.ts
│   │   │   └── fonts/             # Tipografías
│   │   │       ├── components/
│   │   │       ├── models/
│   │   │       ├── pages/
│   │   │       ├── services/
│   │   │       └── fonts.routes.ts
│   │   │
│   │   ├── layouts/               # Layouts de la aplicación
│   │   │   ├── auth-layout/
│   │   │   └── main-layout/
│   │   │
│   │   ├── shared/                # Código reutilizable
│   │   │   ├── components/
│   │   │   ├── directives/
│   │   │   └── pipes/
│   │   │
│   │   ├── app.config.ts          # Configuración de la app
│   │   ├── app.routes.ts          # Rutas principales
│   │   ├── app.ts / app.html / app.css
│   │   └── app.spec.ts
│   │
│   ├── environments/              # Variables de entorno
│   ├── index.html                 # HTML principal (incluye Google Fonts)
│   ├── main.ts                    # Punto de entrada
│   └── styles.css                 # Estilos globales (Tailwind)
│
├── angular.json                   # Configuración de Angular CLI
├── package.json
└── README.md
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
