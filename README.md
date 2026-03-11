# Incident Web

Aplicación frontend desarrollada en Angular para la prueba tecnica que consiste en la gestión de incidentes.  
Permite listar incidentes, filtrar, paginar, crear nuevos registros, consultar el detalle con timeline de eventos y modificar estados de este..

## Tecnologías usadas

- Angular
- TypeScript
- Bootstrap
- Angular HttpClient
- Angular Reactive Forms

---

## Cómo correr el proyecto

### 1. Instalar dependencias

npm install

### 3. Configurar variables de entorno

Editar el archivo:

src/environments/environment.ts

y configurar la URL del backend.

Ejemplo:

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};

### 4. Ejecutar la aplicación en modo desarrollo
npm start o ng serve

La aplicación estará disponible en: http://localhost:4200

### 5. Generar build de producción

npm run build


```bash