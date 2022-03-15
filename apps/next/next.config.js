/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack5: true,
	env: {
    PASSWORD_PROTECT: process.env.VERCEL_ENV !== 'production',
  },
}

const { withExpo } = require('@expo/next-adapter')
const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')([
  'solito',
  'dripsy',
  '@dripsy/core',
  'moti',
  '@motify/core',
  '@motify/components',
  'app',
])

module.exports = withPlugins(
  [withTM, [withExpo, { projectRoot: __dirname }]],
  nextConfig,
)
