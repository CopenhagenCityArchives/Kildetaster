module.exports = {
  deploy_resources_dev: {
    auth: {
      host: 'phhw-140602.cust.powerhosting.dk',
      port: 21,
      authKey: 'kbhkilder'
    },
    forceVerbose: true,
    src: '<%= package.build %>',
    dest: 'public_html/software/kildetaster-development',
    exclusions: ['<%= package.build %>' + '/index.html']
  },
  deploy_resources_dev_public_beta: {
    auth: {
      host: 'phhw-140602.cust.powerhosting.dk',
      port: 21,
      authKey: 'kbhkilder'
    },
    forceVerbose: true,
    src: '<%= package.build %>',
    dest: 'public_html/software/kildetaster-public-beta',
    exclusions: ['<%= package.build %>' + '/index.html']
  },
  deploy_resources_prod: {
    auth: {
      host: 'phhw-140602.cust.powerhosting.dk',
      port: 21,
      authKey: 'kbhkilder'
    },
    forceVerbose: true,
    src: '<%= package.build %>',
    dest: 'public_html/software/kildetaster',
    exclusions: ['<%= package.build %>' + '/index.html']

  },
  deploy_index_dev: {
    auth: {
      host: 'phvh-190204.cust.powerhosting.dk',
      port: 21,
      authKey: 'kbharkiv'
    },
    forceVerbose: true,
    src: '<%= package.build %>',
    dest: 'public_html/kildetaster-development',
    exclusions: ['<%= package.build %>' + '/resources/**', '<%= package.build %>' + '/resources']
  },
  deploy_index_dev_public_beta: {
    auth: {
      host: 'phvh-190204.cust.powerhosting.dk',
      port: 21,
      authKey: 'kbharkiv'
    },
    forceVerbose: true,
    src: '<%= package.build %>',
    dest: 'public_html/kildetaster-public-beta',
    exclusions: ['<%= package.build %>' + '/resources/**', '<%= package.build %>' + '/resources']
  },
  deploy_index_prod: {
    auth: {
      host: 'phvh-190204.cust.powerhosting.dk',
      port: 21,
      authKey: 'kbharkiv'
    },
    forceVerbose: true,
    src: '<%= package.build %>',
    dest: 'public_html/kildetaster',
    exclusions: ['<%= package.build %>' + '/resources/**', '<%= package.build %>' + '/resources']
  }
}
