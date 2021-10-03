module.exports = {
  apps: [
    // development
    {
      script: 'yarn dev',
      watch: '.',
      name: 'api',
      env_dev: {
        PORT: 3000,
        NODE_ENV: 'development'
      },
      ignore_watch: ['pm2.config.js']
    },
    {
      script: 'yarn dev',
      watch: '.',
      name: 'api2',
      env_dev: {
        PORT: 5000,
        NODE_ENV: 'production'
      },
      ignore_watch: ['pm2.config.js']
    },


    // production
    {
      script: 'yarn start',
      watch: '.',
      name: 'api',
      env_prod: {
        PORT: 3000,
        NODE_ENV: 'development'
      },
      ignore_watch: ['pm2.config.js']
    },
    {
      script: 'yarn start',
      watch: '.',
      name: 'api2',
      env_prod: {
        PORT: 5000,
        NODE_ENV: 'production'
      },
      ignore_watch: ['pm2.config.js']
    },
  ],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
}
