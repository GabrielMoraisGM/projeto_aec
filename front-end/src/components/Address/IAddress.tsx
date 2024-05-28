interface AddressResponse{
    id: number,
    zipCode: string,
    street: string,
    number: number,
    complement?: string,
    neighborhood: string,
    city: string,
    state: string
}

export default AddressResponse