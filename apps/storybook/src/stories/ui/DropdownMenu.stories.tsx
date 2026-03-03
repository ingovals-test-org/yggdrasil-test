import type { Meta, StoryObj } from '@storybook/nextjs'
import { Button } from '@yggdrasil/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@yggdrasil/ui/dropdown-menu'

const meta = {
  title: 'UI/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
    controls: { exclude: ['children'] },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

const children = (
  <>
    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Billing</DropdownMenuItem>
      <DropdownMenuItem>Team</DropdownMenuItem>
      <DropdownMenuItem>Subscription</DropdownMenuItem>
    </DropdownMenuContent>
  </>
)

const checkedChildren = (
  <>
    <DropdownMenuTrigger asChild>
      <Button variant='outline'>Open</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className='w-56'>
      <DropdownMenuLabel>Appearance</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuCheckboxItem checked>Status Bar</DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem checked disabled>
        Activity Bar
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem>Panel</DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </>
)

export const Default: Story = {
  args: {
    children: children,
  },
}

export const Checked: Story = {
  args: {
    children: checkedChildren,
  },
}
