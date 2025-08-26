# Guía de Instalación y Despliegue de LionFix Cloud ERP en un VPS (Hostinger)

Esta guía describe los pasos para instalar y desplegar la aplicación en un servidor VPS, como los ofrecidos por Hostinger.

## Requisitos Previos del Servidor

Antes de comenzar, asegúrate de que tu VPS tenga instalado lo siguiente:
1.  **Node.js**: Versión 18.x o superior.
2.  **npm** (viene con Node.js) o **yarn**.
3.  **Git** (para clonar el repositorio).
4.  **PM2**: Un gestor de procesos para Node.js que mantendrá tu aplicación en línea.
5.  **Nginx** (Recomendado): Como proxy inverso para servir la aplicación de forma segura en el puerto 80/443.
6.  **Acceso a una base de datos PostgreSQL**: Puede estar en el mismo VPS o en un servicio de base de datos gestionado.

Puedes instalar Node.js, npm y PM2 con los siguientes comandos (ejemplo para Ubuntu):
```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js (ejemplo para v20.x)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar PM2 globalmente
sudo npm install pm2 -g
```

---

## Paso 1: Obtener el Código del Proyecto

1.  **Conéctate a tu VPS** a través de SSH.
2.  Navega al directorio donde deseas alojar tu aplicación (ej. `/var/www`).
3.  **Clona o sube el proyecto**. Si tienes el código en un repositorio Git:
    ```bash
    git clone <URL_DEL_REPOSITORIO> lionfix-erp
    cd lionfix-erp
    ```
    Si no, puedes subir los archivos del proyecto a este directorio usando SFTP o el Administrador de Archivos de Hostinger.

---

## Paso 2: Instalar Dependencias

Dentro del directorio del proyecto (`lionfix-erp`), instala todas las dependencias necesarias:
```bash
npm install
```
O si prefieres usar `yarn`:
```bash
yarn install
```

---

## Paso 3: Configurar Variables de Entorno

Este es el paso más crítico para conectar la aplicación con tus servicios (base de datos, IA, etc.).

1.  Crea una copia del archivo `.env.example` (si existe) o crea un nuevo archivo llamado `.env` en la raíz del proyecto.
    ```bash
    cp .env.example .env
    ```
    O si no existe:
    ```bash
    touch .env
    ```

2.  Abre el archivo `.env` con un editor de texto (como `nano` o `vim`) y añade las siguientes variables:

    ```ini
    # Variables de Conexión a PostgreSQL
    # Esta es la cadena de conexión que tu cliente de base de datos (node-postgres, Prisma, etc.) usará.
    DATABASE_URL="postgresql://USUARIO:CONTRASEÑA@HOST:PUERTO/NOMBRE_DB"

    # API Key para Google Genkit (Generative AI)
    # Obtén esta clave desde Google AI Studio (https://aistudio.google.com/).
    GEMINI_API_KEY="TU_API_KEY_DE_GEMINI"

    # Otras variables de entorno que tu aplicación pueda necesitar.
    # NEXT_PUBLIC_...
    ```

    **Importante:** Reemplaza `USUARIO`, `CONTRASEÑA`, `HOST`, `PUERTO` y `NOMBRE_DB` con los datos reales de tu base de datos PostgreSQL.

---

## Paso 4: Construir la Aplicación para Producción

Next.js necesita ser "construido" para optimizar el código para producción.
```bash
npm run build
```
Este comando creará un directorio `.next` con todo el código optimizado, listo para ser servido.

---

## Paso 5: Ejecutar la Aplicación con PM2

Para que tu aplicación se ejecute de forma continua (incluso si se cierra o el servidor se reinicia), usamos PM2.

1.  **Iniciar la aplicación**:
    ```bash
    pm2 start npm --name "lionfix-erp" -- start
    ```
    - `pm2 start npm`: Le dice a PM2 que use un script de npm.
    - `--name "lionfix-erp"`: Le da un nombre fácil de recordar al proceso.
    - `-- start`: Ejecuta el script `start` definido en `package.json`, que es `next start`.

2.  **Verificar que la aplicación está corriendo**:
    ```bash
    pm2 list
    ```
    Deberías ver "lionfix-erp" en la lista con el estado "online".

3.  **Guardar la configuración de PM2** para que se reinicie automáticamente si el VPS se reinicia:
    ```bash
    pm2 save
    pm2 startup
    ```
    (Sigue las instrucciones que te dé el último comando para completar la configuración del startup-script).

La aplicación ahora estará corriendo en el puerto por defecto de Next.js (generalmente el 3000).

---

## Paso 6 (Recomendado): Configurar Nginx como Proxy Inverso

Para que los usuarios puedan acceder a tu aplicación a través de tu dominio (ej. `http://tu-dominio.com`) en lugar de `http://tu-dominio.com:3000`, y para añadir seguridad con SSL (HTTPS), debes usar Nginx.

1.  **Instalar Nginx**: `sudo apt install nginx -y`
2.  **Crear un archivo de configuración** para tu sitio en `/etc/nginx/sites-available/lionfix-erp`:
    ```bash
    sudo nano /etc/nginx/sites-available/lionfix-erp
    ```
3.  **Pega la siguiente configuración**, reemplazando `tu-dominio.com` con tu dominio real:

    ```nginx
    server {
        listen 80;
        server_name tu-dominio.com www.tu-dominio.com;

        location / {
            proxy_pass http://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
    ```

4.  **Habilita el sitio y reinicia Nginx**:
    ```bash
    sudo ln -s /etc/nginx/sites-available/lionfix-erp /etc/nginx/sites-enabled/
    sudo nginx -t  # Para probar la configuración
    sudo systemctl restart nginx
    ```

5.  **Añadir SSL (HTTPS)**: Usa Certbot para obtener un certificado SSL gratuito de Let's Encrypt.
    ```bash
    sudo apt install certbot python3-certbot-nginx -y
    sudo certbot --nginx -d tu-dominio.com -d www.tu-dominio.com
    ```
    Sigue las instrucciones en pantalla.

¡Y listo! Tu aplicación LionFix ERP estará desplegada, corriendo de forma robusta y segura en tu VPS.
```
