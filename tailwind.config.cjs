/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,js,svelte,ts}",
        "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}"
    ],
    theme: {
        extend: {
            fontFamily: {
                'kbd': ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New,monospace']
            }
        }
    },
    plugins: [
        require('flowbite/plugin')
    ],
    darkMode: 'class',
};
