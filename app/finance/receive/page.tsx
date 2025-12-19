import FinanceReceive from "@/app/page-component/finance/receive/accounts-receive";

export const metadata = {
  title: "Cadastro de Pessoas",
  description: "Cadastro",
};

export default async function CadFinance() {
  return (
    <>
      <FinanceReceive />
    </>
  );
}
