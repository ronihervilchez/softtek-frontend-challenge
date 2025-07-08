import { redirect } from 'next/navigation'

export default function NotFound() {
  // Usar redirect de Next.js para redirección del lado del servidor
  redirect('/')
}
