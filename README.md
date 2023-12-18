# TALLER 03 INTRODUCCIÓN WEB MÓVIL APARTADO MÓVIL

## Frontend (React-native)

### 1. Navegación a la Carpeta del Proyecto ReactNative

Abre la carpeta del proyecto y mediante comando cmd ejecuta la terminal de Visual Studio Code o la ide que tengas, para ejecutarlo con Visual Studio es lo siguiente:
```cli
code .
```

### 2. Instalación de Node.js y Expo CLI
Asegúrate de tener Node.js instalado en tu sistema.
Luego, instala Expo CLI globalmente utilizando el siguiente comando:
```cli
npm install -g expo-cli
```

### 3. Navegación a la carpeta del Proyecto Backend
Ahora con el frontend abra una terminal y navege a la carpeta del proyecto backend:
```cli
cd /frontend
cd /mobilehub
```

### 4. Instalación de Dependencias:
Ejecuta el siguiente comando para restaurar las dependencias del proyecto:
```cli
npm install
```

### 4. Ejecución del proyecto React Native
```cli
npx expo start
```

## Backend (Dotnet 8)

### 1. Instalación de Dotnet SDK 8

Descarga e instala el SDK de Dotnet 8 desde el sitio oficial: : [Dotnet8](https://dotnet.microsoft.com/es-es/download/dotnet/8.0).

### 2. Navegación a la carpeta del Proyecto Backend

Siguiendo los mismos pasos que realizó con el Frontend, ahora con el backend abra una terminal y navege a la carpeta del proyecto backend:
```cli
cd /backend
cd /mobilehub
```

### 3. Copia el archivo .env.example a .env para poder ejecutar el proyecto
```cli
Copy .env.example .env
```

### 3. Restauración de Dependencias:

Ejecuta el siguiente comando para restaurar las dependencias del proyecto:
```cli
dotnet restore
```

### 4. Asegurate que la base de datos esté operativa. (Opcional)

Ejecuta el siguiente comando para corroborrar que existe una base de datos en el sistema.
```cli
dotnet ef database update
```

### 5. Ejecucion del proyecto Dotnet 
```cli
dotnet run
```
