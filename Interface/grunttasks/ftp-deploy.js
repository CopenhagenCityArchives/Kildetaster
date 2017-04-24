module.exports = {
  deployment_resources: {
    auth: {
      host: 'kbhkilder.dk',
      port: 21,
      authKey: 'kbhkilder'
    },
    forceVerbose: true,
    src: '<%= package.build %>',
    dest: 'public_html/software/kildetaster-development',
    exclusions : [ '<%= package.build %>' + '/resources']
  },
  production_resources: {
    auth: {
      host: 'kbhkilder.dk',
      port: 21,
      authKey: 'kbhkilder'
    },
    forceVerbose: true,
    src: '<%= package.build %>',
    dest: 'public_html/software/kildetaster',
    exclusions : [ '<%= package.build %>' + '/resources/**']
  },
  deployment_index_file: {
    auth: {
      host: 'kbharkiv.dk',
      port: 21,
      authKey: 'kbharkiv'
    },
    forceVerbose : true,
    src: '<%= package.build %>',
    dest: 'public_html/kildetaster-development'
  },
  production_index_file: {
    auth: {
      host: 'kbharkiv.dk',
      port: 21,
      authKey: 'kbharkiv'
    },
    forceVerbose : true,
    src: '<%= package.build %>',
    dest: 'public_html/kildetaster'
  }
}
