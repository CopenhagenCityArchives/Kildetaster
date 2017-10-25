define([


], function() {

    var directive = /*@ngInject*/ function(API, $state, helpers, solrService) {

        return {
            restrict: 'E',
            replace: true,

            scope: {
                data: "=",
                metadata: "="
            },

            templateUrl: 'sdk/directives/datapost-police.directive.tpl.html',

            link: { 
                pre: function(scope, element, attr) {
                    // Set up post information
                    scope.imageFront = "http://politietsregisterblade.dk/registerblade/" + scope.metadata.station +"/" + scope.metadata.film + "/" + scope.metadata.file_front + ".jpg";
                    scope.imageBack = "http://politietsregisterblade.dk/registerblade/" + scope.metadata.station +"/" + scope.metadata.film + "/" + scope.metadata.file_back + ".jpg";

                    scope.post = [];

                    scope.post.push({
                        label: "Person",
                        fields: [{
                            label: "Fornavne",
                            value: scope.data.firstnames
                        }, {
                            label: "Efternavn",
                            value: scope.data.lastname

                        }, {
                            label: "Civilstatus",
                            value: scope.data.civilstatus
                        },
                        {
                            label: "Stillinger",
                            value: scope.data.position
                        },
                        {
                            label: "Født",
                            value: scope.data.dateOfBirth
                        }]
                    });

                    if (scope.data.spouses && scope.data.spouses.length == 1) {
                        scope.post.push({
                            label: "Ægtefælle",
                            fields: [{
                                label: "Fornavne",
                                value: scope.data.spouses[0].firstnames
                            },
                            {
                                label: "Efternavn",
                                value: scope.data.spouses[0].lastname
                            }]
                        })
                    }

                    if (scope.data.parent) {
                        scope.post.push({
                            label: "Parent",
                            fields: [{
                                label: "Fornavne",
                                value: scope.data.parent.firstnames
                            }]
                        })
                    }

                    if (scope.data.children) {
                        scope.post.push({
                            label: "Børn",
                            fields: scope.data.children.map(function(child) {
                                return {
                                    label: "Barn",
                                    fields: [{
                                        label: "Firstnames",
                                        value: child.firstnames
                                    }]
                                };
                            })
                        });
                    }
                }
            }
        };
    };

    return directive;
});