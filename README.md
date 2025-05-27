# whatsapp-panel with notion api and waha

## Configure the api (waha with docker)

First, install deps and run the docker image:

```bash
docker pull devlikeapro/waha

docker run -d --rm -p 3001:3000/tcp --name waha devlikeapro/waha
```

## Getting Started

First, install deps and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
