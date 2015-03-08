module.exports = function(grunt) {

  // Configuration de Grunt
  grunt.initConfig({
    concat: {
      options: {
        separator: ';', // permet d'ajouter un point-virgule entre chaque fichier concaténé.
      },
      dist: {
        src: ['js/app.js', 'js/controllers/*', 'js/directives/*','js/factories/*','js/filters/*','js/services/*','js/script/*'], // la source
        dest: 'js/built.js' // la destination finale
      }
    },
    uglify: {
      options: {
        separator: ';', // permet d'ajouter un point-virgule entre chaque fichier concaténé.
      },
      dist: {
        src: ['js/built.js'], // la source
        dest: 'js/built.min.js' // la destination finale
      }
    },
    watch: {
      scripts: {
        files: '**/*.js', // tous les fichiers JavaScript de n'importe quel dossier
        tasks: ['concat:dist']
      }
    }
  })
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Définition des tâches Grunt
  grunt.registerTask('default', ['dev', 'watch']);
  grunt.registerTask('dev', ['concat:dist']);
  grunt.registerTask('dist', ['uglify:dist']);

}