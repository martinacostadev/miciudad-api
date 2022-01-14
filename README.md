# Levantar base de datos en local con docker

Como primer paso debemos verificar que tengamos docker instalado, con el siguiente comando

```bash
docker --version
```

## Instalacion de docker en windows o mac

Si el comando no regresa una respuesta debemos descargar e instalar docker en nuestro computador
[install docker](https://www.docker.com/get-started)
Buscamos nuestro sistema operativo (windows o mac) y descargamos el instalador

## Instalacion de docker en linux

Para instalar docker en ubuntu podemos seguir los siguentes paso

1. Actualizamos nuestro gestor de descargas e instalamos las dependencias correspondientes

```bash
 sudo apt-get update

 sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```

2. Agregamos la GPG key oficial de docker:

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

3. Activamos el repositorio con la version estable

```bash
  echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

4. Instalamos docker

```bash
sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io
```

# Levantar base de datos

Este comando crea el setup de datos y la corre en segundo plano

```bash
docker-compose up -d
```

Podemos verificar el estado de nuestro contenedor con el siguiente comando

```bash
docker ps
```

Y para apagar nuestro contenedor utilizamos

```bas
docker-compose stop
```
