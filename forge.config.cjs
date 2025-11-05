module.exports = {
  packagerConfig: {
    name: "gym-app",
    asar: true,
    appCategoryType: "public.app-category.fitness",
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      platforms: ['win32'],
    },
    {
      name: '@electron-forge/maker-deb',
      platforms: ['linux'],
    }
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'abdererahm4ne',
          name: 'gym-app',        
        },
        draft: true,
        prerelease: false,
        generateReleaseNotes: true,
      },
    },
  ],
};
