export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const response = await fetch('http://localhost:8080/donate-blood', { // Adjust the URL to your backend
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req.body),
            });

            const data = await response.json();
            
            // Forward the response from the backend to the frontend
            res.status(response.status).json(data);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
