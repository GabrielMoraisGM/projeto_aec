import { useState } from "react";
import AddressResponse from "../IAddress";

async function addressSubmit(
    zipCode: string,
    street: string,
    number: number,
    complement?: string,
    neighborhood?: string,
    city?: string,
    state?: string): Promise<AddressResponse> 
    {
    const response = await fetch('http://localhost:3000/address/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        zipCode: zipCode,
        street: street,
        number: number,
        complement: complement,
        neighborhood: neighborhood,
        city: city,
        state
      }),
    });
  
    console.log(response)
  
    if (!response.ok) {
      throw new Error('Login failed');
    }
  
    const data: AddressResponse = await response.json();

    return data;
}

function AddressCreate (){

    const [zipCode, setZipCode] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [complement, setComplement] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    const submitAddress = async () => {
        try{
            const result = await addressSubmit(zipCode, street, parseInt(number), complement, neighborhood,city,state)
            console.log('Address saved', result);
        }catch(error){
            console.error('Failed to save address: ', error);
        }
    }

    return(
        <>
            <form>
                <fieldset>
                    
                    <label>
                    Zip Code:
                    <input
                        name="zipCode"
                        placeholder="00000-000"
                        onChange={(e) => setZipCode(e.target.value)}
                    />
                    </label>

                    <label>
                    Street:
                    <input
                        type="street"
                        name="street"
                        placeholder="street"
                        onChange={(e) => setStreet(e.target.value)}
                    />
                    </label>

                    <label>
                    Number:
                    <input
                        type="number"
                        name="number"
                        placeholder="number"
                        onChange={(e) => setNumber(e.target.value)}
                    />
                    </label>

                    <label>
                    Complement:
                    <input
                        type="complement"
                        name="complement"
                        placeholder="complement"
                        onChange={(e) => setComplement(e.target.value)}
                    />
                    </label>

                    <label>
                    Neighborhood:
                    <input
                        type="neighborhood"
                        name="neighborhood"
                        placeholder="neighborhood"
                        onChange={(e) => setNeighborhood(e.target.value)}
                    />
                    </label>

                    <label>
                    City:
                    <input
                        type="city"
                        name="city"
                        placeholder="city"
                        onChange={(e) => setCity(e.target.value)}
                    />
                    </label>

                    <label>
                    State:
                    <input
                        type="state"
                        name="state"
                        placeholder="SP"
                        onChange={(e) => setState(e.target.value)}
                    />
                    </label>
                </fieldset>

                <input
                    type="submit"
                    value="Send"
                    onClick={submitAddress}
                />
            </form>
        </>
    )
}

export default AddressCreate