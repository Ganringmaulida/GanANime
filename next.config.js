/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.myanimelist.net",
      },
      {
        hostname: "avatars.githubusercontent.com",
      },
      {
        hostname: "api.jikan.moe", // Tambahkan domain ini untuk mendukung gambar dari Jikan API
      },
    ],
  },
};

module.exports = nextConfig;
