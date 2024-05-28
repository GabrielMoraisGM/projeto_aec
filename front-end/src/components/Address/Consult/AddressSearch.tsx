import { useState } from "react";
import AddressResponse from "../IAddress";
import AddressCard from "../AddressCard";

async function searchById(id: number | null): Promise<AddressResponse | AddressResponse[]> {
    if (typeof id !== "number") {
        const response = await fetch(`http://localhost:3000/address/${id}`);

        if (!response.ok) {
            throw new Error('Failed to search address by id');
        }

        const data: AddressResponse = await response.json();
        return data;
    } else {
        const response = await fetch(`http://localhost:3000/address`);

        if (!response.ok) {
            throw new Error('Failed to search address by id');
        }

        const data: AddressResponse[] = await response.json();
        return data;
    }
}

function AddressSearch(){
    const [id, setId] = useState('');
    const [address, setAddress] = useState<AddressResponse | AddressResponse[] | null>(null);

    const searchAddress = async () => {
        try {
            const result = await searchById(parseInt(id));
            setAddress(result);
        } catch (error) {
            console.error('Failed to search by id', error);
        }
    };

    return(
        <>
            <div id="Searchbard">
                <input
                    type="search"
                    name="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={(e) => setId(e.target.value)}
                    value={id}
                />
                <button className="outline" onClick={searchAddress}>
                    Search
                </button>
            </div>

            {address && Array.isArray(address) ? (
                <>
                    <h2>Multiple Addresses</h2>
                    {address.map((addr) => (
                        <AddressCard key={addr.id} address={addr} />
                    ))}
                </>
            ) : (
                <>
                    <h2>Single Address</h2>
                    {address && <AddressCard address={address} />}
                </>
            )}
        </>
    );
}

export default AddressSearch;
