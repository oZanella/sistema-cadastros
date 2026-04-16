import { Suspense } from 'react';
import RegisterPerson from '@/app/page-component/person/register-person';

export default function Page() {
  return (
    <Suspense fallback={<div>Carregando formulário...</div>}>
      <RegisterPerson />
    </Suspense>
  );
}
