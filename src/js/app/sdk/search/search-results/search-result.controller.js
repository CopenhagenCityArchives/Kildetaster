define([], function() {
    var searchResultController = /*@ngInject*/ function searchResultController($scope, $state, $element, $compile) {

        var that = this;

        this.goToPost = function () {
            $state.go('search.page.result.post', {
                postId: that.data.id
            });
        };

        this.$onInit = function() {

            if (this.result && this.result.jsonObj) {

                this.data = JSON.parse(this.result.jsonObj);

                this.highlighting = this.result.highlighting;

                //HACK START
                // takes the dateOfDeath from the data and overwrites the wrongfully formatted dateOfDeath in the jsonObj data
                //This should be removed when the API is updated to return the correct date format (a timestamp)
                //this.data.dateOfDeath = this.result.dateOfDeath;
                //HACK END

                // Begravelser
                if (this.data.collection_id == 1) {
                    this.template = require('./burial.tpl.html');
                }
                // Politiets registerblade
                else if (this.data.collection_id == 17) {
                    this.template = require('./police.tpl.html');
                }
                // Erindringer
                else if (this.data.collection_id == 18) {
                    this.template = require('./erindring.tpl.html');
                }
                // Skoleprotokoller
                else if (this.data.collection_id == 100) {
                    this.template = require('./school.tpl.html');
                }
                // Efterretninger
                else if (this.data.collection_id == 19) {
                    this.template = require('./efterretning.tpl.html');
                } else {
                    throw new Error('invalid result type');
                }

                $element.children().append($compile(this.template)($scope));
            }

        };

        this.formatDate = function(datestring) {
          return moment(datestring).format("LL");
        }
    };
    return searchResultController;
});
