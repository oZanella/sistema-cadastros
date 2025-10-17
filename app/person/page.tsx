import Person from "../page-component/person/person";

export const metadata = {
  title: "Cadastro de Pessoas",
  description: "Cadastro",
};

export default async function Calendar() {
  return (
    <>
      <Person />
    </>
  );
}
