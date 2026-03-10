import type { Meta, StoryObj } from '@storybook/nextjs'
import { Button } from '@yggdrasil/ui/button'
import { fn } from 'storybook/test'

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    controls: { exclude: ['asChild', 'onClick'] },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: { control: 'select', options: ['default', 'sm', 'lg', 'icon'] },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Button',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Button',
  },
}

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Button',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Button',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Button',
  },
}
