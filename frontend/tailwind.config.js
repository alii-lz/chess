/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            height: { "1/8": "12.5%" },
            width: { "1/8": "12.5%" }, // 12.5% is 1/8 of 100%
        },
    },
    plugins: [],
};
