// @ts-check
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const typedocSidebar = {
  items: [
    {
      type: 'category',
      label: 'Functions',
      items: [{ type: 'doc', id: 'functions/greet', label: 'greet' }],
    },
  ],
};
module.exports = typedocSidebar.items;
