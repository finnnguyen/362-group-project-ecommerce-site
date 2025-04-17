module.exports = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:5173', 'https://tiedandtrue.vercel.app'],
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      headers: "*",
      credentials: true
    }
  },
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
