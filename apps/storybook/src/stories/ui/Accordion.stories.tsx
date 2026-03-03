import type { Meta, StoryObj } from '@storybook/nextjs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@yggdrasil/ui/accordion'

const meta = {
  title: 'UI/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  argTypes: { type: { control: 'select', options: ['single', 'multiple'] } },
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

const children = (
  <>
    <AccordionItem value='item-1'>
      <AccordionTrigger>Upplýsingavernd og vefkökur</AccordionTrigger>
      <AccordionContent>
        Á vefsíðu Almenna lífeyrissjóðsins er gætt að persónuvernd þeirra sem heimsækja hana.
        Upplýsingum sem kunna að auðkenna þá sem heimsækja vefsvæðin okkar er aðeins safnað þegar
        notendur veita fyrir því upplýst samþykki. Almenni notar vefkökur (e.cookies) í þeim
        tilgangi að bæta vefsíður sínar og gera aðgengilegri fyrir notendur sem og til þess að bæta
        þjónustu sína almennt. Með því að samþykkja vefkökur fær notandinn að upplifa vefsíðu
        Almenna á sem bestan hátt.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value='item-2'>
      <AccordionTrigger>Vefkökur</AccordionTrigger>
      <AccordionContent>
        Vefkökur eru litlar textaskrár sem vefsvæði vistar á tölvunni eða snjalltækinu þínu þegar þú
        heimsækir vefsíður. Vefkökur gera okkur kleift að fá nafnlausar upplýsingar um hvernig
        notendur nota vefina og að muna stillingar notandans yfir ákveðinn tíma. Ef þú vilt ekki að
        upplýsingar frá þér skráist í vefkökur er hægt að breyta stillingum í vafranum þannig að þær
        séu ekki vistaðar án þess að beðið sé um leyfi fyrst. Þú getur stillt vafra til að útiloka
        og eyða kökum.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value='item-3'>
      <AccordionTrigger>Sjóðfélaga-, launagreiðenda- og lánavefur</AccordionTrigger>
      <AccordionContent>
        Notkun þín á vefnum er vistuð og skráð í viðskiptasögu sem og þær upplýsingar sem þú gefur
        okkur. Við kunnum að hafa samband við þig í síma, tölvupósti eða pósti til að veita þér
        upplýsingar um stöðu þína hjá sjóðnum.
      </AccordionContent>
    </AccordionItem>
  </>
)

export const Single: Story = {
  args: { type: 'single' },
  render: (args) => (
    <div className='w-lg'>
      <Accordion {...args}>{children}</Accordion>
    </div>
  ),
}

export const Multiple: Story = {
  args: { type: 'multiple' },
  render: (args) => (
    <div className='w-lg'>
      <Accordion {...args}>{children}</Accordion>
    </div>
  ),
}
