import type { Meta, StoryObj } from '@storybook/nextjs'
import { Badge } from '@yggdrasil/ui/badge'
import { fn } from 'storybook/test'

const meta = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary'],
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Badge',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Badge',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Badge',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Badge',
  },
}
