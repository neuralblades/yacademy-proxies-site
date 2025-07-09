// app/proxies/proxies-deep-dive/page.tsx
import { redirect } from 'next/navigation';

export default function ProxiesDeepDivePage() {
  // Redirect to the first child page
  redirect('/proxies/proxies-list');
}