module.exports = {



    // Get the different types of Platforms
    getArch: () => {

        return {

            'x86_64': 'x64',
            'x86': 'x86',
            'x64': 'x64',
            'amd64': 'x64'
        };
    },



    // Get the different types of Environments
    getPlatform: () => {

        return {

            'osx': 'osx',
            'mac': 'osx',
            'linux': 'linux',
            'win': 'windows'
        };
    },



    // Get the different extensions for Environments
    getExtensions: () => {

        return {

            'dmg': 'osx',
            'appimage': 'linux',
            'rpm': 'linux',
            'deb': 'linux',
            'snap': 'linux',
            'exe': 'win'
        };
    }
};