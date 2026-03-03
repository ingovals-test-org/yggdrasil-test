import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: 'standalone',
  // basePath is set at build time from environment variable
  // For production: BASE_PATH=/kista
  // For preview/dev: BASE_PATH can be empty or different
  basePath: process.env.BASE_PATH || '',
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
