## Back-End:

- Node.js
- JavaScript
- Express
- MongoDB
- Mongoose

# Índice

- [Índice](#índice)
  - [**Primeros pasos**](#primeros-pasos)
    - [Requisitos](#requisitos)
    - [Instalación](#instalación)
  - [**Endpoint Users**](#endpoint-users)
    - [Crear Usuario](#crear-usuario)
    - [Inicio de sesión](#inicio-de-sesión)
    - [Cambio de contraseña](#cambio-de-contraseña)
    - [Obtener usuario especifico](#obtener-usuario-especifico)
    - [Actualizar usuario especifico](#actualizar-usuario-especifico)
    - [Eliminar usuario especifico](#eliminar-usuario-especifico)
  - [**Endpoint Pets**](#endpoint-pets)
    - [Crear Mascota](#crear-mascota)
    - [Obtener mascota especifica](#obtener-mascota-especifica)
    - [Actualizar mascota especifica](#actualizar-mascota-especifica)
    - [Eliminar mascota especifica](#eliminar-mascota-especifica)
  - [**Developers!**](#developers)

Volver al [Índice](#índice)

## **Primeros pasos**

### Requisitos

Asegúrate de tener instalados los siguientes requisitos antes de ejecutar la aplicación:

- **NPM**: Versión >= 10.3.0
- **Node.js**: Versión >= 18.19.0
- **MongoDB**: Asegúrate de tener MongoDB instalado y en ejecución.

### Instalación

1. Clona este repositorio:

- ```bash
  git clone https://github.com/MaxiV95/Practice-server
  ```

2. Navega al directorio del proyecto:

- ```bash
  cd server
  ```

3. Instala las dependencias:

- ```bash
  npm install
  ```

4. Crea un archivo .env con los siguientes parámetros:

- ```env
  PORT=puerto_por_defecto_3001
  MONGO_URL=uri_mongo_db o 'mongodb://127.0.0.1:27017/'
  DB_NAME=name_mongoDB_por_defecto_'PetPal'
  ```

5. Para iniciar la aplicación:

- ```bash
  npm run dev
  ```

La aplicación estará disponible en http://localhost:3001

Volver al [Índice](#índice)

## **Endpoint Users**

### Crear Usuario

- **`POST /users`** - Registro de nuevos usuario.
- **Params**:
- **Query**:
- **header**:
- **Body**:
  ```javascript
  {
    "email": string - required - Correo electrónico del usuario.
    "password": string - required - Password del usuario.
  }
  ```
- **Request Body** example: Status **201**
  ```javascript
  {
    id: "6570bb7db2ad523394706c12",
    email: "test@gmail.com",
    name: "",
    lastName: "",
    pets: [],
    telephone: 0,
    image: "",
  }
  ```
  volver al [Índice](#índice)

### Inicio de sesión

- **`POST /users/login`** - Inicio de sesión de usuario.
- **Params**:
- **Query**:
- **header**:
- **Body**:
  ```javascript
  {
    "email": string - required - Correo electrónico del usuario.
    "password": string - required - Password del usuario.
  }
  ```
- **Request Body** example: Status **200**
  ```javascript
  {
  	accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC';
  }
  ```
  volver al [Índice](#índice)

### Cambio de contraseña

- **`POST /users/password`** - Inicio de sesión de usuario.
- **Params**:
- **Query**:
- **header**:
- **Body**:
  ```javascript
  {
    "email": string - required - Correo electrónico del usuario.
    "oldPassword": string - required - Password antigua del usuario.
    "newPassword": string - required - Password nueva del usuario.
  }
  ```
- **Request Body** example: Status **201**
  ```javascript
  {
    "message": "El JWT"
  }
  ```
  volver al [Índice](#índice)

### Obtener usuario especifico

- **`GET /users/{:id}`** - Obtener detalles de un usuario específico.
- **Params**:
  ```javascript
  "id": string - required - id del usuario.
  ```
- **Query**:
- **header**:
  ```javascript
  Authorization: `Bearer ${token}` string - required - token de acceso.
  ```
- **Body**:
- **Request Body** example: Status **200**
  ```javascript
  {
    id: "6570bb7db2ad523394706c12",
    email: "test@gmail.com",
    name: "",
    lastName: "",
    pets: [],
    telephone: 0,
    image: "",
  }
  ```

volver al [Índice](#índice)

### Actualizar usuario especifico

- **`PUT /users/{:id}`** - Actualizar un usuario específico.
- **Params**:
  ```javascript
  "id": string - required - id del usuario.
  ```
- **Query**:
- **header**:
  ```javascript
  Authorization: `Bearer ${token}` string - required - token de acceso.
  ```
- **Body**:
  ```javascript
  {
    "nickName": string - optional - Nombre de usuario.
    "telephone": number - optional - Teléfono del usuario.
    "image": string - optional - Imagen del usuario.
  }
  ```
- **Request Body** example: Status **200**
  ```javascript
  {
    id: "6570bb7db2ad523394706c12",
    email: "test@gmail.com",
    name: "",
    lastName: "",
    pets: [],
    telephone: 0,
    image: "",
  }
  ```

volver al [Índice](#índice)

### Eliminar usuario especifico

- **`DELETE /users/{:id}`** - Eliminar un usuario especifico.
- **Params**:
  ```javascript
  "id": string - required - id del usuario.
  ```
- **Query**:
- **header**:
  ```javascript
  Authorization: `Bearer ${token}` string - required - token de acceso.
  ```
- **Body**:
- **Request Body** example: Status **200**
  ```javascript
  {
    acknowledged: true,
    deletedCount: 1
  }
  ```

Volver al [Índice](#índice)

## **Endpoint Pets**

### Crear Mascota

- **`POST /pets`** - Registro de nueva mascota.
- **Params**:
- **Query**:
- **header**:
  ```javascript
  Authorization: `Bearer ${token}` string - required - token de acceso.
  ```
- **Body**:
  ```javascript
  {
    "nickName": string - required - Nombre de la mascota.
    "breed": string - requires - Raza de la mascota.
    "images": array - requires - Imágenes de la mascota.
    "birth": number - optional - Nacimiento de la mascota.
    "description": string - optional - Descripción de la mascota.
  }
  ```
- **Request Body** example: Status **201**
  ```javascript
  {
    id: "65ccbc44a4e9f43e7b4460b4",
    nickName: "loky",
    owner: "65ccba58e023b17ef6697de1",
    breed: "",
    birth: 0,
    images: [
      {
        id: "String",
        URL: "String",
      }
    ],
    description: "",
    lost: false
  }
  ```

volver al [Índice](#índice)

### Obtener mascota especifica

- **`GET /pets/{:id}`** - Obtener detalles de una mascota específica.
- **Params**:
  ```javascript
  "id": string - required - id de la mascota.
  ```
- **Query**:
- **header**:
- **Body**:
- **Request Body** example: Status **200**
  ```javascript
  {
    id: "65ccbc44a4e9f43e7b4460b4",
    nickName: "loky",
    owner: "65ccba58e023b17ef6697de1",
    breed: "",
    birth: 0,
    images: [
      {
        id: "String",
        URL: "String",
      }
    ],
    description: "",
    lost: false
  }
  ```

volver al [Índice](#índice)

### Actualizar mascota especifica

- **`PUT /pets/{:id}`** - Actualizar una mascota específica.
- **Params**:
  ```javascript
  "id": string - required - id del usuario.
  ```
- **Query**:
- **header**:
  ```javascript
  Authorization: `Bearer ${token}` string - required - token de acceso.
  ```
- **Body**:
  ```javascript
  {
    "nickName": string - required - Nombre de la mascota.
    "breed": string - requires - Raza de la mascota.
    "images": array - requires - Imágenes de la mascota.
    "birth": number - optional - Nacimiento de la mascota.
    "description": string - optional - Descripción de la mascota.
    "lost": boolean - optional - Si el estado es perdido.
  }
  ```
- **Request Body** example: Status **200**
  ```javascript
  {
    id: "65ccbc44a4e9f43e7b4460b4",
    nickName: "loky",
    owner: "65ccba58e023b17ef6697de1",
    breed: "",
    birth: 0,
    images: [
      {
        id: "String",
        URL: "String",
      }
    ],
    description: "",
    lost: false
  }
  ```

volver al [Índice](#índice)

### Eliminar mascota especifica

- **`DELETE /pets/{:id}`** - Eliminar una mascota específica.
- **Params**:
  ```javascript
  "id": string - required - id del usuario.
  ```
- **Query**:
- **header**:
  ```javascript
  Authorization: `Bearer ${token}` string - required - token de acceso.
  ```
- **Body**:
- **Request Body** example: Status **200**
  ```javascript
  {
    acknowledged: true,
    deletedCount: 1
  }
  ```

Volver al [Índice](#índice)

## **Developers!**

### **💻 EXTENSIONES VSC!!** <!-- omit from toc -->

1. **Code Spell Check** (ortografía)
2. **Spanish - Code Spell Checker** (necesita pequeña configuración)
3. **ESLint** (formato de código)
4. **Error Lens** (ver los errores en el código)
5. **Prettier** (se puede configurar para que al guardar formatee automáticamente siguiendo las reglas)

#### **🔄 COMANDOS GIT** <!-- omit from toc -->

- **git remote update origin --prune** estando en main actualiza las ramas
- **git checkout nombre_de_la_rama** cambia de rama
- **git add .** agrega todos los archivos guardados para hacer commit
- **git commit -m 'mensaje'** realiza un nuevo commit con un mensaje
- **git commit --amend** modifica el ultimo commit (cambiar archivos y mensaje, en rama propia)
- **git push** sube el commit a la nube
- **git push --force** sube el commit a la nube de manera forzosa, para luego de haber realizado un amend (cuidado! solo en rama propia)

Volver al [Índice](#índice)
