import type { Meta, StoryObj } from '@storybook/nextjs'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@yggdrasil/ui/collapsible'

const meta = {
  title: 'UI/Collapsible',
  component: Collapsible,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => (
    <div className='w-lg'>
      <Collapsible {...args}>{children}</Collapsible>
    </div>
  ),
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

const children = (
  <>
    <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
    <CollapsibleContent>
      Yes. Free to use for personal and commercial projects. No attribution required.
    </CollapsibleContent>
  </>
)

export const Default: Story = {
  args: {
    children: children,
  },
}
