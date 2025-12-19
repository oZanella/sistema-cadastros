import Products from "../../page-component/product/product";

export const metadata = {
  title: "Cadastro - Produtos",
  description: "Cadastro",
};

export default async function CadProducts() {
  return (
    <>
      <Products />
    </>
  );
}
