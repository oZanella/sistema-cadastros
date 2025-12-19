import FinancePay from "@/app/page-component/finance/pay/accounts-pay";

export const metadata = {
  title: "Cadastro de Pessoas",
  description: "Cadastro",
};

export default async function CadFinance() {
  return (
    <>
      <FinancePay />
    </>
  );
}
