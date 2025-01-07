export default {
    async fetch(request) {
        if (request.method === 'POST') {
            const formData = await request.formData();
            const file = formData.get('image');

            if (!file) {
                return new Response('No file uploaded.', { status: 400 });
            }

            const bucket = MY_BUCKET; // R2 bucket binding
            const key = `uploads/${file.name}`;

            // Upload the file to R2
            await bucket.put(key, file.stream(), {
                httpMetadata: {
                    contentType: file.type,
                },
            });

            return new Response(`File uploaded successfully: ${key}`, { status: 200 });
        }

        return new Response('Method not allowed', { status: 405 });
    }
};
