// src/app/sitemap.js

export default function sitemap() {
    const baseUrl = 'https://vaidiklawns.com';

    return [
        {
            url: baseUrl,
            lastModified: new Date().toISOString(), // change: .toISOString() add karo
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date().toISOString(), // change
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/gallery`,
            lastModified: new Date().toISOString(), // change
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/packages`,
            lastModified: new Date().toISOString(), // change
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/venues`,
            lastModified: new Date().toISOString(), // change
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date().toISOString(), // change
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: new Date().toISOString(), // change
            changeFrequency: 'monthly',
            priority: 0.6,
        },
    ];
}