module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',

  {
    settings: {
      cors: {
        origin: ['localhost:5173, https://tiedandtrue.vercel.app'],
        methods: ["*"],
        headers: "*",
        credentials: true
      }
    }
  }
];
