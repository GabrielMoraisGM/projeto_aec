import { useState } from 'react';
import AddressResponse from './IAddress';

async function addressDelete(id: number) {
    const response = await fetch('http://localhost:3000/address/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to delete address by id');
    }

    const data = await response.json();

    return data;
}

function AddressCard({ address }: { address: AddressResponse }) {
    const [deleted, setDeleted] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        try {
            setDeleting(true);
            await addressDelete(address.id);
            setDeleted(true);
        } catch (error) {
            console.error('Error deleting address:', error);
        } finally {
            setDeleting(false);
        }
    };

    if (deleted) {
        return null;
    }

    return (
        <article>
            <header>Address Information</header>
            <label>Id: {address.id}</label>
            <label>Zip Code: {address.zipCode}</label>
            <label>Street: {address.street}</label>
            <label>Number: {address.number}</label>
            <label>Complement: {address.complement}</label>
            <label>Neighborhood: {address.neighborhood}</label>
            <label>City: {address.city}</label>
            <label>State: {address.state}</label>

            <button className="outline" onClick={handleDelete} disabled={deleting}>
                {deleting ? 'Deleting...' : 'Delete'}
            </button>
        </article>
    );
}

export default AddressCard;
