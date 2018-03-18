#### Nest-server-starter
 1. install docker
 2. Create config `src/config`
 3. chmod 755 entrypoint.sh
 4. build/run containers  docker-compose up (for rebuild use docker-compose up --build)
 

#####Config for VSC debugging -> launch.json

{
    // Use IntelliSense to learn about possible Node.js debug attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Debug mode",
            "type": "node",
            "request": "attach",
            "protocol": "inspector",
            "port": 5858,
            "address": "localhost",
            "restart": true,
            "sourceMaps": true,
            "localRoot": "${workspaceRoot}",
            "remoteRoot": "/var/www/planarsys"
        }
    ]
}
