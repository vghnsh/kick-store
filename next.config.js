/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['tailwindui.com', 'i.ibb.co'], // Add the domain(s) you want to allow here
    formats: ['image/avif', 'image/webp'], // You can add other formats if needed
    dangerouslyAllowSVG: true,
  },
}

module.exports = nextConfig
