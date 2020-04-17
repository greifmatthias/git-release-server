module.exports = {



    // Get the different types of Platforms
    getArch: () => {

        return {

            'x86': '32 bit',
            'x64': '64 bit',
            'arm': 'ARM'
        };
    },



    // Get the different types of Environments
    getPlatform: () => {

        return {

            'osx': 'Mac/osX',
            'linux': 'Linux',
            'win': 'Windows'
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