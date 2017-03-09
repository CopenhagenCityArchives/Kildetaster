module.exports = {
  deployment_resources: {
    auth: {
      host: 'phhw-121005.cust.powerhosting.dk',
      port: 21,
      authKey: 'kbhkilder'
    },
    forceVerbose: true,
    src: '<%= package.build %>',
    dest: 'public_html/kildetaster-development',
    exclusions : [ '<%= package.build %>' + '/resources/**']
  },
  deployment_index_file: {
    auth: {
      host: 'phhw-140602.cust.powerhosting.dk',
      port: 21,
      authKey: 'kbharkiv'
    },
    forceVerbose : true,
    src: '<%= package.build %>',
    dest: 'public_html/software/kildetaster-development'
  },
  production_resources: {
    auth: {
      host: 'phhw-121005.cust.powerhosting.dk',
      port: 21,
      authKey: 'kbhkilder'
    },
    forceVerbose: true,
    src: '<%= package.build %>',
    dest: 'public_html/kildetaster',
    exclusions : [ '<%= package.build %>' + '/resources/**']
  },
  prodution_index_file: {
    auth: {
      host: 'phhw-140602.cust.powerhosting.dk',
      port: 21,
      authKey: 'kbharkiv'
    },
    forceVerbose : true,
    src: '<%= package.build %>',
    dest: 'public_html/software/kildetaster'
  }  
}