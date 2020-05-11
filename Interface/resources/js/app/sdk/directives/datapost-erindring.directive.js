define([


], function() {

    var directive = /*@ngInject*/ function(API_ENDPOINT, $state, helpers, solrService) {

        return {
            restrict: 'E',
            replace: true,

            scope: {
                data: "=",
                metadata: "=",
                highlighting: "="
            },

            templateUrl: 'sdk/directives/datapost-erindring.directive.tpl.html',

            link: function(scope, element, attr) {
                // Set up post information
                scope.post = [];

                var highlights = [];
                if (scope.highlighting && scope.highlighting.erindring_document_text) {
                    highlights = scope.highlighting.erindring_document_text.map(function(hltext) {
                        return { value: hltext, html: true };
                    });
                }

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
                        label: "Stilling",
                        value: scope.data.position
                    },
                    {
                        label: "Forældres stilling",
                        value: scope.data.position_parent
                    },
                    {
                        label: "Født",
                        value: scope.data.yearOfBirth
                    }]
                },
                {
                    label: "Erindring",
                    fields: [{
                        label: "Nedskrevet",
                        value: scope.metadata.writtenYear
                    }, {
                        label: "Omfang",
                        value: scope.metadata.extent
                    }, {
                        label: "Håndskreven/maskinskreven",
                        value: scope.metadata.writeMethod
                    }, {
                        label: "Indeholder foto",
                        value: scope.metadata.containsPhotos
                    }]
                },
                {
                    label: "Kontekst",
                    fields: highlights
                })

                // Scope function definitions
                scope.renderPage = function (num) {
                    scope.pageRendering = true;
                    // Using promise to fetch the page
                    scope.pdfDoc.getPage(num).then(function(page) {
                        var viewport = page.getViewport(1.0);
                        scope.canvas.height = viewport.height;
                        scope.canvas.width = viewport.width;

                        // Render PDF page into canvas context
                        var renderContext = {
                            canvasContext: scope.ctx,
                            viewport: viewport
                        };
                        var renderTask = page.render(renderContext);

                        // Wait for rendering to finish
                        renderTask.promise.then(function() {
                            scope.pageRendering = false;
                            if (scope.pageNumPending !== null) {
                                // New page rendering is pending
                                scope.renderPage(pageNumPending);
                                scope.pageNumPending = null;
                            }
                        });
                    });
                }

                scope.queueRenderPage = function(num) {
                    if (scope.pageRendering) {
                        scope.pageNumPending = num;
                    } else {
                        scope.renderPage(num);
                    }
                }

                scope.onPrevPage = function() {
                    if (scope.pageNum <= 1) {
                        return;
                    }
                    scope.pageNum--;
                    scope.queueRenderPage(scope.pageNum);
                }

                scope.onNextPage = function() {
                    if (scope.pageNum >= scope.pdfDoc.numPages) {
                        return;
                    }
                    scope.pageNum++;
                    scope.queueRenderPage(scope.pageNum);
                }

                scope.pageRendering = false;
                scope.pageNum = 1;
                scope.pageNumPending = null;
                scope.canvas = element.find('canvas')[0];
                scope.ctx = scope.canvas.getContext("2d");
                scope.pdfUrl = 'http://www.kbharkiv.dk/kbharkiv/collections/erindringer/' + scope.metadata.filename;
                PDFJS.workerSrc = 'http://mozilla.github.io/pdf.js/build/pdf.worker.js';

                // Using DocumentInitParameters object to load binary data.
                var loadingTask = PDFJS.getDocument(scope.pdfUrl);
                loadingTask.promise.then(function(pdfDoc) {
                    scope.pdfDoc = pdfDoc;
                    scope.renderPage(scope.pageNum)
                });

            }
        };
    };

    return directive;
});