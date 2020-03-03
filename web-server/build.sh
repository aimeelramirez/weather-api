#! bin/bash/env 
FILE="./node_modules" 
if test -f [node_modules]; then
    echo "$FILE exist"
    npm install
    npx nodemon src/app.js
    
else 
    echo "$FILE does not exist" 
    rm -rf node_modules/
    npm install
      npx nodemon src/app.js
fi

# if test -f  [ -f node_modules] then
#     echo "Node exist"
#     npm install
# else 
#     echo "Node mod does not exist" 
#     rm -rf node_modules/
#     npm install
# fi
#netstat -ano|findstr "PID :8081" 
#taskkill /pid 18264 /f