FROM node:12

ENV TZ=Asia/Tokyo \
    DEBUG=backend:*

RUN npm install -g nodemon

# ワークディレクトリを作成・指定
RUN mkdir -p /app
WORKDIR /app

# アプリケーションの依存関係をインストールする
# ワイルドカードを使用して、package.json と package-lock.json の両方が確実にコピーされるようにする。
COPY package*.json ./

RUN npm install

# アプリケーションのソースをバンドルする
COPY . .

EXPOSE 8080
CMD [ "node" ]