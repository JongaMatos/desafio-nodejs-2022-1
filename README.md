# desafio-nodejs-2022-1

## Como rodar localmente

1. Certifique se que os sequintes encontram-se instalados:
    - Docker
    - Docker-compose
    - NodeJs (versão 16)
    - Yarn
    - Git 
2. Clone e instale:
    - Clone o repositório com o seguinte comando:
    ``` bash
     git clone https://github.com/JongaMatos/desafio-nodejs-2022-1.git
     ```
     - Navegue para dentro do diretório criado com o comando:
     ```bash
     cd desafio-nodejs-2022-1
     ```
    - E por fim, instale as dependencias do projeto com o comando:
    ```bash
    sudo yarn install
    ```
3. Rodando a aplicação:
    Uma vez que os passos acima tenham sido cumpridos, deve se:
    - Na primeira vez, rodar:
    ```bash
        sudo docker-compose up --build
    ```
    - Nas vezes seguintes:
    ```bash
    sudo docker-compose up
    ```