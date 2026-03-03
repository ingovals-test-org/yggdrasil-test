import type { Meta, StoryObj } from '@storybook/nextjs'
import { Calendar, enGB, is } from '@yggdrasil/ui/calendar'

const meta = {
  title: 'UI/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
    controls: { exclude: ['className', 'locale'] },
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'multiple', 'range'],
    },
    captionLayout: {
      control: 'select',
      options: ['label', 'dropdown', 'dropdown-months', 'dropdown-years'],
    },
    buttonVariant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    lang: {
      control: 'select',
      options: ['is', 'en'],
      defaultValue: 'is',
      description: 'Locale of the calendar',
    },
    showOutsideDays: { control: 'boolean' },
  },
  tags: ['autodocs'],
  args: {
    mode: 'single',
    className: 'rounded-md border shadow-sm',
    captionLayout: 'label',
  },
  render: (args) => {
    const { lang } = args
    return <Calendar {...args} locale={lang === 'is' ? is : enGB} />
  },
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
