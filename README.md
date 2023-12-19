# TALLER 03 INTRODUCCIÓN WEB MÓVIL APARTADO MÓVIL

## Frontend (React-native)

### 1. Navegación a la Carpeta del Proyecto ReactNative

Abre la carpeta del proyecto y mediante comando cmd ejecuta la terminal de Visual Studio Code o la ide que tengas, para ejecutarlo con Visual Studio es lo siguiente:
```cli
code .
```

### 2. Navegación a la carpeta del Proyecto Backend
Ahora con el frontend abra una terminal y navege a la carpeta del proyecto backend:
```cli
cd frontend
cd mobilehub
```

### 3. Instalación de Node.js y Expo CLI
Asegúrate de tener Node.js instalado en tu sistema.
Luego, instala Expo CLI globalmente utilizando el siguiente comando:
```cli
npm install -g expo-cli
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
cd backend
cd mobilehub
```

### 3. Copia el archivo .env.example a .env para poder ejecutar el proyecto
```cli
Copy .env.example .env
```

### 4. Cambio de configuraciones por las propias: ( PASO IMPORTANTE ) 
```
En el archivo .env que se creó. En el .env debes poner la IP de ejecucion del frontend que proporciona expo.

LUEGO EN LA RUTA: \Backend\MobileHub\Properties en launchSettings tambien debes poner TU IP LOCAL IPV4
```


### 5. Restauración de Dependencias:

Ejecuta el siguiente comando para restaurar las dependencias del proyecto:
```cli
dotnet restore
```

### 6. Asegurate que la base de datos esté operativa. (Opcional)

Ejecuta el siguiente comando para corroborrar que existe una base de datos en el sistema.
```cli
dotnet ef database update
```

### 7. Ejecucion del proyecto Dotnet 
```cli
dotnet run
```

# IMPORTANTE: 
LA API NO SE CONSUME COMO LOCALHOST SINO QUE ESTA PROPORCIONADA LA IPV4 DE TU RED LOCAL. DEBES OBTENER TU IP IPV4 ES DECIR: PARA EL CONSUMO DE API HACIA EL FRONT DEBES CAMBIAR TODAS LAS PETICIONES QUE SON REALIZADAS POR LA IP LOCAL A TU IP LOCAL EN LAS SIGUIENTES RUTAS:
```RUTAS API
\Backend\MobileHub\Properties -> launchSettings LINEA 9 
\Backend\MobileHub -> env LINEA 2 
\Frontend\MobileHub\components\auth -> LoginScreen LINEA 114
\Frontend\MobileHub\components\auth -> RegisterSCreen LINEA 153
\Frontend\MobileHub\components\home -> HomeScreen LINEA 58
\Frontend\MobileHub\components\home -> ReposityScreen LINEA 63
```

