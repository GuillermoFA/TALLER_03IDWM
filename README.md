# TALLER 03 INTRODUCCIÓN WEB MÓVIL APARTADO MÓVIL

## Frontend (React-native)



## Backend (Dotnet 8)

### 1. Instalación de Dotnet SDK 8

Descarga e instala el SDK de Dotnet 7 desde el sitio oficial: : [Dotnet8](https://dotnet.microsoft.com/es-es/download/dotnet/8.0).

### 2. Navegación a la carpeta del Proyecto Backend

Siguiendo los mismos pasos que realizó con el Frontend, ahora con el backend abra una terminal y navege a la carpeta del proyecto backend:
```cli
cd /backend
cd /mobilehub
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
