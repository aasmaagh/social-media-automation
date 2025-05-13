# 🤖 Social Media Automation

Este projeto automatiza tarefas em redes sociais, como o LinkedIn, utilizando **n8n**, **Playwright**, **Redis** e uma API em **Node.js**. Com ele, é possível orquestrar fluxos automatizados, processar filas e integrar IA no controle de conteúdos.

---

## 🛠️ Tecnologias Utilizadas

- [x] Node.js  
- [x] Playwright  
- [x] Redis  
- [x] n8n  (externo)
- [x] Bull & BullMQ  
- [x] Express  
- [x] Docker  

---

## 🚀 Como rodar o projeto

### 1. Suba o Redis com Docker

```bash
    docker run -p 6379:6379 --name redis -d redis
```

### 2. Suba o n8n com Docker

```bash
    docker run -it --rm \
        --name n8n \
        -p 5678:5678 \
        -v n8n_data:/home/node/.n8n \
        docker.n8n.io/n8nio/n8n
```

### 3. Clone este repositório e instale as dependências

```bash
    git clone https://github.com/Lucas-Jav/social-media-automation.git
    cd social-media-automation
    npm install
```

### 4. Configure as variáveis de ambiente

```bash
    LINKEDIN_USER="email@example.com"
    LINKEDIN_PASSWORD="12345678"

    REDIS_HOST="localhost"
    REDIS_PASSWORD=null
    REDIS_PORT=6379
```

### 5. Inicie a API

```bash
    npm run server
```

## 💡 O que essa automação faz?
 - Automatiza interações com o LinkedIn utilizando Playwright.
 - Processa filas de tarefas com Bull e BullMQ.
 - Pode ser facilmente estendida para gerar ou publicar conteúdo com IA.
 - É orquestrada visualmente pelo n8n, que pode se conectar com diversos serviços.

## Autor
Desenvolvido por Lucas Oliveira

## Exemplos de uso futuro
 - Geração automática de posts com IA.
 - Publicação agendada em múltiplas redes.
 - Criação de imagens e vídeos para conteúdo social.