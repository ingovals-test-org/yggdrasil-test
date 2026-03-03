'use client'

import { Button } from '@yggdrasil/ui/button'
import { useLocale } from 'next-intl'
import { SetLanguage } from '@/actions/set-language'

export function LanguageSwitcher() {
  const locale = useLocale()

  return (
    <div className='flex gap-2'>
      <Button
        type='button'
        aria-pressed={locale === 'is'}
        onClick={() => SetLanguage('is')}
        variant={locale === 'is' ? 'default' : 'outline'}
        size='sm'
      >
        IS
      </Button>
      <Button
        type='button'
        aria-pressed={locale === 'en'}
        onClick={() => SetLanguage('en')}
        variant={locale === 'en' ? 'default' : 'outline'}
        size='sm'
      >
        EN
      </Button>
    </div>
  )
}
