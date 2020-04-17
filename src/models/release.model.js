const Asset = require('./asset.model');



module.exports = {

    // Get Response schema
    getSchema: () => ({

        id: { type: 'string' },
        url: { type: 'string' },
        name: { type: 'string' },
        description: { type: 'string' },
        isPrerelease: { type: 'boolean' },
        createdAt: {
            type: 'string',
            format: 'date-time'
        },
        publishedAt: {
            type: 'string',
            format: 'date-time'
        },
        assets: {
            type: 'array',
            items: {
                type: 'object',
                properties: Asset.getSchema()
            }
        }
    }),



    // Parse Release from GitHub Response
    parseGitHub: ({ id, html_url, name, body, prerelease, created_at, published_at, assets }) => ({

        id,
        url: html_url,
        name,
        description: body,
        isPrerelease: prerelease,
        createdAt: new Date(created_at),
        publishedAt: new Date(published_at),

        assets: assets.map(x => Asset.parseGitHub(x))
    })

};