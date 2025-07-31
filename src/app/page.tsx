import { redirect } from 'next/navigation';
import { ROUTES } from '@/common/constants/routes';

export default function Home() {
  return redirect(ROUTES.EVENTS)
}
