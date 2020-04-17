
const path = require('path');


const Machine = require('./machine.model');



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
        arch: { type: 'string' },
        platform: { type: 'string' },
        dist: { type: 'string' }
    }),




    // Parse Asset from GitHub Response
    parseGitHub: ({ id, name, size, download_count, created_at, updated_at }) => {

        // Setup default Asset
        const asset = {
            id,
            name,
            size, 
            downloadCount: download_count, 
            createdAt: created_at, 
            updatedAt: updated_at
        };

        // Try to set context
        const extention = path.extname(name).replace('.', '');

        if (extention) {
            // Set Dist
            asset.dist = extention;

            // Check if extension of Asset can be linked to Environment
            const assetPlatform = Machine.getExtensions()[extention];
            if(assetPlatform) asset.platform = assetPlatform;

            // Check for Platform
            const assetArch = Object.keys(Machine.getArch()).filter(x => name.includes(x))[0];
            if (assetArch) asset.arch = assetArch;
        }


        return asset;
    }
};