// @ts-check
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const typedocSidebar = {
  items: [
    {
      type: 'category',
      label: 'Classes',
      items: [{ type: 'doc', id: 'api/classes/RateLimiter', label: 'RateLimiter' }],
    },
    {
      type: 'category',
      label: 'Functions',
      items: [
        {
          type: 'doc',
          id: 'api/functions/rateLimitMiddleware',
          label: 'rateLimitMiddleware',
        },
      ],
    },
  ],
};
module.exports = typedocSidebar.items;
