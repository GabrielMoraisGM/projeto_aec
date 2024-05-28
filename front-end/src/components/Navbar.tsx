
async function downloadCsv(){
    try {
        const response = await fetch('http://localhost:3000/address/csv', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to generate CSV!');
        }

        // Process the response here, such as saving it to a file or displaying it to the user.
        // For example, if you want to force a download of the CSV file:
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data.csv');
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
    } catch (error) {
        console.error('Error downloading CSV:', error);
        // You might want to display an error message to the user here
    }
}

function Navbar(){
    return(
        <>
            <nav>
                <ul>
                    <li><strong>Acme Corp</strong></li>
                </ul>
                <ul>
                    <li><a href="/AddressCreate">Address Create</a></li>
                    <li><a href="/addressSearch">Consult by ID</a></li>
                    <button className="outline" onClick={downloadCsv}>Download</button>
                </ul>
            </nav>
        </>
    )
}

export default Navbar