/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
	images: {
		domains: ['rickandmortyapi.com'],
		unoptimized: true,
	}
};

export default nextConfig;
