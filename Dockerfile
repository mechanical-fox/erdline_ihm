
FROM node:22

# Ajoute les fichiers/code source de "." à /app dans l'application
ADD  .  /app/
WORKDIR /app

# Construit les fichiers web à servir (index.html, css, js...)
RUN npm install
RUN npx ng build

# Indique les ports à publier par docker (fonction de documentation)
EXPOSE 8080

# Servir les fichiers web (index.html, css, js...)
WORKDIR /app/dist/erdline-ihm/browser
CMD ["python3","-m","http.server","8080"]
