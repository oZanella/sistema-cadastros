import SupplierList from "../page-component/person/page-list-supplier/page";

export const metadata = {
  title: "Cadastro de Fornecedores",
  description: "Cadastro",
};

export default async function CadSupplier() {
  return (
    <>
      <SupplierList />
    </>
  );
}
