import type { Meta, StoryObj } from '@storybook/nextjs'
import { Popover } from '@yggdrasil/ui/popover'

const meta = {
  title: 'UI/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Popover content',
  },
}
