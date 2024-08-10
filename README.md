i#1ª Instalação do frontend do AssadosOnline a partir do git <br>
git clone https://github.com/valdeirprestes/frontendassados.git<br>
<br>
<br>
<br>
#2ª Se usar o ssh para git<br>
git clone git@github.com:valdeirprestes/frontendassados.git<br>
<br>
#3ª Entre na pasta frontendassados e instale as dependencias<br>
npm i<br>

#4ª Copie o arquivo env.example para .env (linux)<br>
cp env.example .env<br>
#No MS Windows<br>
copy env.example .env<br>
#5ª Edite o arquivo .env e ajuste tanto o domain e porta da frontend e também o da aplicação<br>
#6ª execute o front-end em modo desenvolvimento<br>
npm run dev<br>
