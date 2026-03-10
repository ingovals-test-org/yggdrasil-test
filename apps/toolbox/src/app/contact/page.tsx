import { Label } from '@yggdrasil/ui/label'

export default async function Index() {
  return (
    <div className='flex h-screen flex-col items-center justify-center gap-4'>
      <h1 className='font-bold text-4xl'>Contact page</h1>
      <p className='text-gray-600 text-lg'>Your one-stop shop for all your needs</p>
      <Label>Get Started</Label>
    </div>
  )
}
