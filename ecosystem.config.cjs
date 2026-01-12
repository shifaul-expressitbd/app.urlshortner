module.exports = {
  apps: [
    {
      name: 'www.cutzy.app',
      script: 'node_modules/next/dist/bin/next',
      args: 'start --port 30000',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
  ],
};
