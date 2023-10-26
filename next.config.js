/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: { optimizeCss: true, webVitalsAttribution: ['CLS', 'LCP'] },
	// output: 'standalone',
	webpack(config, { dev, isServer }) {
		// Code splitting
		config.optimization.splitChunks.cacheGroups = {
			default: false,
			vendors: false,
		};

		config.optimization.splitChunks.chunks = 'async';
		config.optimization.splitChunks.minSize = 20000;
		config.optimization.splitChunks.maxAsyncRequests = 5;
		config.optimization.splitChunks.maxInitialRequests = 3;

		//Only minimize the bundle in production
		if (!dev && !isServer) {
			config.optimization.minimize = true;
			config.optimization.concatenateModules = true;
			config.optimization.usedExports = true;
		}
		return config;
	},
	transpilePackages: ['next'],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'api.hanhtrinhvanminh.com',
			},
		],
	},
};

module.exports = nextConfig;