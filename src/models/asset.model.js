module.exports = {

    // Get Response schema
    getSchema: () => ({

        id: { type: 'string' },
        name: { type: 'string' },
        size: { type: 'integer' },
        downloadCount: { type: 'integer' },
        createdAt: {
            type: 'string',
            format: 'date-time'
        },
        updatedAt: {
            type: 'string',
            format: 'date-time'
        },
        downloadUrl: { type: 'string' }
    }),




    // Parse Asset from GitHub Response
    parseGitHub: ({ id, name, size, download_count, created_at, updated_at, browser_download_url }) =>
        ({ id, name, size, downloadCount: download_count, createdAt: created_at, updatedAt: updated_at, downloadUrl: browser_download_url })
};