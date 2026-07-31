// src/app/sitemap.js

export default function sitemap() {
    return [
        {
            url: 'https://vaidik-wedding-lawns.vercel.app',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://vaidik-wedding-lawns.vercel.app/about',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://vaidik-wedding-lawns.vercel.app/gallery',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: 'https://vaidik-wedding-lawns.vercel.app/packages',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: 'https://vaidik-wedding-lawns.vercel.app/venues',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://vaidik-wedding-lawns.vercel.app/contact',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: 'https://vaidik-wedding-lawns.vercel.app/services',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
    ];
}