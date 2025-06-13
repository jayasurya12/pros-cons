producer-consumer-node/
│
├── producer/
│   ├── index.js
│   ├── queue.js
│   └── .env
│
├── consumer/
│   ├── index.js
│   ├── queue.js
│   └── .env
│
└── shared/
    └── redis.js



npm init -y
npm install bullmq express dotenv dd-trace ioredis



curl -X POST http://localhost:3000/produce -H "Content-Type: application/json" -d '{"data":"my task"}'
