import type { Meta, StoryObj } from '@storybook/nextjs'
import { Input } from '@yggdrasil/ui/input'
import { fn } from 'storybook/test'

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onChange: fn() },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: '',
    placeholder: 'Type here...',
  },
}
