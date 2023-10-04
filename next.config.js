/** @type {import('next').NextConfig} */


const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['localhost'],
  },
  // https://stackoverflow.com/questions/65598753/cant-build-react-next-project-found-page-without-a-react-component-as-default
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js']
}

module.exports = nextConfig
