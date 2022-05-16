/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  env: {
    customKey: 'my-value',
    BASE_URL: 'https://api.bluchipnft.co/'
  },
  nextConfig,
}
