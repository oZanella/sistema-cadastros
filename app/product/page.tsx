import Product from "../page-component/product/product";

export const metadata = {
  title: "Cadastro de Produtos",
  description: "Cadastro",
};

export default async function CadProduct() {
  return (
    <>
      <Product />
    </>
  );
}
