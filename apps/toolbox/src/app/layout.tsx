import { ThemeProvider } from '@yggdrasil/ui/providers/theme-provider'
import { Toaster } from '@yggdrasil/ui/sonner'
import { PT_Mono, PT_Sans, PT_Serif } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale } from 'next-intl/server'

import '@yggdrasil/ui/theme.css'

const ptsans = PT_Sans({
  variable: '--font-pt-sans',
  subsets: ['latin'],
  weight: ['400', '700'],
})

const ptmono = PT_Mono({
  variable: '--font-pt-mono',
  subsets: ['latin'],
  weight: ['400'],
})

const ptserif = PT_Serif({
  variable: '--font-pt-serif',
  subsets: ['latin'],
  weight: ['400', '700'],
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  return (
    <html
      className={`${ptsans.variable} ${ptmono.variable} ${ptserif.variable} antialiased`}
      lang={locale}
      suppressHydrationWarning
    >
      <NextIntlClientProvider>
        <body>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            {children}
          </ThemeProvider>
        </body>
      </NextIntlClientProvider>
    </html>
  )
}
