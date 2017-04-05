module.exports = {
  deployment_resources: {
    auth: {
      host: 'phhw-160601.cust.powerhosting.dk',
      port: 21,
      authKey: 'kbharkiv'
    },
    forceVerbose: true,
    src: '<%= package.build %>',
    dest: 'public_html/kildetaster-development',
    exclusions : [ '<%= package.build %>' + '/resources']
  },
  deployment_index_file: {
    auth: {
      host: 'phhw-140602.cust.powerhosting.dk',
      port: 21,
      authKey: 'kbhkilder'
    },
    forceVerbose : true,
    src: '<%= package.build %>',
    dest: 'public_html/software/kildetaster-development'
  },
  production_resources: {
    auth: {
      host: 'phhw-160601.cust.powerhosting.dk',
      port: 21,
      authKey: 'kbharkiv'
    },
    forceVerbose: true,
    src: '<%= package.build %>',
    dest: 'public_html/kildetaster',
    exclusions : [ '<%= package.build %>' + '/resources/**']
  },
  production_index_file: {
    auth: {
      host: 'phhw-140602.cust.powerhosting.dk',
      port: 21,
      authKey: 'kbhkilder'
    },
    forceVerbose : true,
    src: '<%= package.build %>',
    dest: 'public_html/software/kildetaster'
  }  
}