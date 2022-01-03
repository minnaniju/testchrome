FROM node:14-buster-slim

ENV NODE_ENV=production \
    PROJECT_HOME=/usr/app/ \
    DEBUG="app:*" \
    BUILD_DEPS="git python build-essential"


# install deps
RUN apt-get update > /dev/null \
    && apt-get install -y -qq --no-install-recommends ${BUILD_DEPS} \
    vim curl > /dev/null

# Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
# Note: this installs the necessary libs to make the bundled version of Chromium that Puppeteer
# installs, work.
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# create project home
RUN mkdir -p ${PROJECT_HOME}

# switch to working directory
WORKDIR ${PROJECT_HOME}

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ${PROJECT_HOME}

#npm install
RUN npm i -g npm \
    && npm i -g --quiet pm2 \
    && npm install --quiet

#cleanup
RUN apt-get purge -y ${BUILD_DEPS} > /dev/null \
    && rm -rf /var/lib/apt/lists/*

# copy source code and run the build
COPY . $PROJECT_HOME

RUN npm run build

EXPOSE 80 443 8080

# start the application
CMD ["pm2-runtime","process.yml"]
