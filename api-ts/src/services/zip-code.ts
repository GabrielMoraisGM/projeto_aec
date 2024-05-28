import Address from "../entities/address"

async function searchByZipCode(zipCode: number): Promise<Address> {
  const url = `https://viacep.com.br/ws/${zipCode}/json/`

  const data:any =  await fetch(url).then(res => res.json())

  let newAddress = buildAdress(data)
  return newAddress
}

async function buildAdress(template: any): Promise<Address>{

  let newAddress = new Address()

  newAddress.zipCode = template.cep
  newAddress.street = template.logradouro
  newAddress.number = template.number
  newAddress.neighborhood = template.bairro
  newAddress.city = template.localidade
  newAddress.state = template.uf

  return newAddress
}

export { searchByZipCode };
