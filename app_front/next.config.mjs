/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000, // هر ثانیه بررسی کنه که فایلی عوض شده یا نه
        aggregateTimeout: 300, // یه تاخیر کوچیک برای بهینه‌سازی
      };
    }
    return config;
  },
};

export default nextConfig;