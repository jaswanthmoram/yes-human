FROM node:22-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    python3-pip \
    python3-venv \
    git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

COPY requirements.txt ./
RUN python3 -m venv /app/.venv \
    && /app/.venv/bin/python -m pip install --no-cache-dir -r requirements.txt

COPY . .

ENV YES_PYTHON=/app/.venv/bin/python
ENV PATH="/app/.venv/bin:${PATH}"

RUN npm run validate && npm test

ENTRYPOINT ["node", "packages/yes-cli/index.js"]
CMD ["help"]
