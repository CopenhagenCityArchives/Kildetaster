define(['angular'], function(angular){angular.module('sdk-templates', ['shared/directives/dynamicInput.directive.tpl.html', 'shared/directives/dynamicSelect.directive.tpl.html', 'shared/directives/dynamicTypeahead.directive.tpl.html', 'shared/directives/imageViewer.directive.tpl.html', 'shared/directives/stepIndicator.directive.tpl.html', 'shared/directives/stepOf.directive.tpl.html', 'shared/directives/user.directive.tpl.html', 'sdk/templates/errors.tpl.html', 'sdk/templates/mypage.tpl.html', 'sdk/templates/opentasks.tpl.html']);

angular.module("shared/directives/dynamicInput.directive.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("shared/directives/dynamicInput.directive.tpl.html",
    "<div class=\"form-group dynamic-form\" ng-class=\"{ 'has-error': field.errorText }\">\n" +
    "    \n" +
    "    <label class=\"control-label\">\n" +
    "        {{field.labelText}}\n" +
    "        <span class=\"icon glyphicon glyphicon-question-sign\" uib-tooltip=\"{{field.helpText}}\" tooltip-placement=\"top\"></span>\n" +
    "    </label>\n" +
    "    \n" +
    "    <div class=\"dynamic-form__adjust\">\n" +
    "        <input type=\"{{field.type}}\" class=\"form-control\" ng-model=\"field.value\" ng-model-options=\"{ updateOn: 'blur' }\" ng-disabled=\"field.unreadable\" />\n" +
    "        <a href tabindex=\"-1\" class=\"icon glyphicon glyphicon-info-sign\" uib-tooltip=\"{{TEXT.FIELD_UNREADABLE}}\" tooltip-placement=\"left\" ng-click=\"toggleUnreadable()\"></a>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"help-block\" ng-if=\"field.errorText\">{{field.errorText}}</div>   \n" +
    "\n" +
    "</div>");
}]);

angular.module("shared/directives/dynamicSelect.directive.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("shared/directives/dynamicSelect.directive.tpl.html",
    "<div class=\"form-group\" ng-class=\"{ 'has-error': errorText }\">\n" +
    "    <label class=\"control-label\">\n" +
    "        {{field.labelText}}\n" +
    "        <span class=\"icon glyphicon glyphicon-question-sign\" uib-tooltip=\"{{field.helpText}}\" tooltip-placement=\"top\"></span>\n" +
    "    </label>\n" +
    "    <div class=\"dynamic-form__adjust\">\n" +
    "        <ui-select ng-model=\"field.value\" ng-disabled=\"field.unreadable\">\n" +
    "            <ui-select-match>\n" +
    "                <span ng-bind=\"$select.selected.name\"></span>\n" +
    "            </ui-select-match>\n" +
    "            <ui-select-choices repeat=\"option in (field.options | filter: $select.search) track by option.id\">\n" +
    "                <span ng-bind=\"option.name\"></span>\n" +
    "            </ui-select-choices>\n" +
    "        </ui-select>\n" +
    "        <span tabindex=\"-1\" class=\"icon glyphicon glyphicon-info-sign\" uib-tooltip=\"{{TEXT.FIELD_UNREADABLE}}\" tooltip-placement=\"left\" ng-click=\"toggleUnreadable()\"></span>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("shared/directives/dynamicTypeahead.directive.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("shared/directives/dynamicTypeahead.directive.tpl.html",
    "<div class=\"form-group dynamic-form\" ng-class=\"{ 'has-error': field.errorText }\">\n" +
    "    <label class=\"control-label\">\n" +
    "        {{field.labelText}}\n" +
    "        <span class=\"icon glyphicon glyphicon-question-sign\" uib-tooltip=\"{{field.helpText}}\" tooltip-placement=\"top\"></span>\n" +
    "    </label>\n" +
    "    <div class=\"dynamic-form__adjust\">\n" +
    "        \n" +
    "        <input \n" +
    "            type=\"text\" \n" +
    "            class=\"form-control\" \n" +
    "            ng-model=\"field.value\" \n" +
    "            ng-disabled=\"field.unreadable\" \n" +
    "            uib-typeahead=\"option as option.name for option in field.options | filter:{name:$viewValue}\"\n" +
    "            typeahead-append-to-body=\"true\"\n" +
    "        />\n" +
    "\n" +
    "        <a href tabindex=\"-1\" class=\"icon glyphicon glyphicon-info-sign\" uib-tooltip=\"{{TEXT.FIELD_UNREADABLE}}\" tooltip-placement=\"left\" ng-click=\"toggleUnreadable()\"></a>\n" +
    "    </div>\n" +
    "    <div class=\"help-block\" ng-if=\"field.errorText\">{{field.errorText}}</div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("shared/directives/imageViewer.directive.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("shared/directives/imageViewer.directive.tpl.html",
    "<section style=\"width:100%;height: 100%\">\n" +
    "\n" +
    "    <div class=\"target\" style=\"height: 100%\"></div>\n" +
    "\n" +
    "</section>\n" +
    "");
}]);

angular.module("shared/directives/stepIndicator.directive.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("shared/directives/stepIndicator.directive.tpl.html",
    "<div class=\"step-indicator\">\n" +
    "    <a class=\"step-indicator__item\" ui-sref=\".({ stepId: $index + 1})\" ng-class=\"{ filled: hasPrevious($index), current: isCurrent($index)}\" ng-repeat=\"step in steps(total) track by $index\"></a>\n" +
    "</div>");
}]);

angular.module("shared/directives/stepOf.directive.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("shared/directives/stepOf.directive.tpl.html",
    "<span>Trin {{current}} af {{total}}</span>");
}]);

angular.module("shared/directives/user.directive.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("shared/directives/user.directive.tpl.html",
    "<a ng-href=\"{{link}}\">\n" +
    "    <span class=\"glyphicon glyphicon-user\" aria-hidden=\"true\"></span>\n" +
    "    {{username}}\n" +
    "</a>");
}]);

angular.module("sdk/templates/errors.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("sdk/templates/errors.tpl.html",
    "<div ng-controller=\"errorsController\">\n" +
    "    \n" +
    "    <div class=\"row-fluid\">\n" +
    "        <div class=\"span12\">\n" +
    "            <h2>Mine fejlmeldinger</h2>\n" +
    "            <ul class=\"unstyled task-list\">\n" +
    "                <li>\n" +
    "                    <div class=\"task-list__header\">Kilde</div>\n" +
    "                    <div class=\"task-list__header\">Felt(er)</div>\n" +
    "                    <div class=\"task-list__header\" style=\"width: 25%\">Overgår til superbruger om</div>\n" +
    "                    <div class=\"task-list__header\"></div>\n" +
    "                </li>\n" +
    "                <li ng-repeat=\"error in errorList\" ng-class=\"{ odd: $odd }\">\n" +
    "\n" +
    "                    <div class=\"task-list__item\">\n" +
    "                        {{error.name}}\n" +
    "                    </div>\n" +
    "                    <div class=\"task-list__item\">\n" +
    "                        <div ng-repeat=\"field in error.fields\">\n" +
    "                            {{field.labelText}}\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"task-list__item\">\n" +
    "                        <div ng-if=\"error.timeleft\">{{error.timeleft}}</div>\n" +
    "                        <div ng-if=\"error.corrected\">Rettet af {{error.corrected.user.name}}</div>\n" +
    "                    </div>\n" +
    "                    <div class=\"task-list__item text-right\">\n" +
    "                        <a ng-href=\"{{error.url}}\" ng-if=\"error.timeleft\" class=\"btn btn-default\" ng-click=\"goToEditor(task)\">Ret</a>\n" +
    "                        <div ng-if=\"error.corrected\">{{error.corrected.date}}</div>\n" +
    "                    </div>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row-fluid\">\n" +
    "            <div class=\"span12 text-center\">\n" +
    "                <a href>Se flere</a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("sdk/templates/mypage.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("sdk/templates/mypage.tpl.html",
    "<div ng-controller=\"mypageController\">\n" +
    "    <div class=\"row-fluid\">\n" +
    "        <div class=\"span12\">\n" +
    "            <h1>Min side</h1>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"row-fluid\">\n" +
    "        <div class=\"span12\">\n" +
    "            <h2>Mine indtastninger</h2>\n" +
    "            <ul class=\"unstyled task-list\">\n" +
    "                <li>\n" +
    "                    <div class=\"task-list__header\">Protokol / kilde</div>\n" +
    "                    <div class=\"task-list__header\">Nået til</div>\n" +
    "                    <div class=\"task-list__header\"></div>\n" +
    "                </li>\n" +
    "                <li ng-repeat=\"task in openTasks\" ng-class=\"{ odd: $odd }\">\n" +
    "                    <div class=\"task-list__item\">\n" +
    "                        {{task.name}}\n" +
    "                    </div>\n" +
    "                    <div class=\"task-list__item\">\n" +
    "                        <div ng-if=\"task.open\">Side {{task.lastCompletedPage}}</div>\n" +
    "                        <div ng-if=\"!task.open\">Protokol færdig</div>\n" +
    "                    </div>\n" +
    "                    <div class=\"task-list__item text-right\">\n" +
    "                        <button type=\"button\" class=\"btn btn-default\" ng-if=\"task.open\" ng-click=\"goToEditor(task)\">Fortsæt</button>\n" +
    "                        <button type=\"button\" class=\"btn btn-default\" ng-if=\"!task.open\" ng-click=\"goToStatistics(task)\">Se statistik</button>\n" +
    "                    </div>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row-fluid\">\n" +
    "            <div class=\"span12 text-center\">\n" +
    "                <a href>Se flere</a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<!-- <div ng-controller=\"feedbackController\">\n" +
    "    <div class=\"row-fluid\">\n" +
    "        <div class=\"span12\">\n" +
    "            <h2>Feedback</h2>\n" +
    "            <h3>På mine indtastninger</h3>\n" +
    "\n" +
    "            <ul class=\"unstyled\">\n" +
    "                <li class=\"task-list\">\n" +
    "                    <div class=\"task-list__header\">Kilde</div>\n" +
    "                    <div class=\"task-list__header\">Status</div>\n" +
    "                </li>\n" +
    "                <li class=\"task-list\" ng-repeat=\"feedback in feedbackList\" ng-class=\"{ odd: $odd }\">\n" +
    "                    <div class=\"task-list__item\">\n" +
    "                        {{task.name}}\n" +
    "                        <div class=\"\">\n" +
    "                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos impedit magni beatae aspernatur facere!\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"task-list__item text-right\">\n" +
    "                        <button type=\"button\" class=\"btn btn-default\">Se feedback</button>\n" +
    "                    </div>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div> -->\n" +
    "");
}]);

angular.module("sdk/templates/opentasks.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("sdk/templates/opentasks.tpl.html",
    "<h1>Begravelsesprotekoller</h1>\n" +
    "\n" +
    "<p>Tekst fra Joomla</p>\n" +
    "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem laudantium unde fuga iusto sit harum autem ab quam sint animi, quis, tempore. Facere, debitis?</p>\n" +
    "\n" +
    "<a href>Se vejledning</a>\n" +
    "\n" +
    "<div ng-controller=\"opentasksController\">\n" +
    "    \n" +
    "    <ul class=\"unstyled task-list\">\n" +
    "        <li>\n" +
    "            <div class=\"task-list__header\">Protekolnavn</div>\n" +
    "            <div class=\"task-list__header\">Status</div>\n" +
    "            <div class=\"task-list__header\">Brugere online</div>\n" +
    "        </li>\n" +
    "        <li ng-repeat=\"task in tasks\" ng-class=\"{ odd: $odd }\">\n" +
    "            <div class=\"task-list__item\">\n" +
    "                <span>{{task.name}}</span>\n" +
    "                <span>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\">Start indtastning</button>\n" +
    "                </span>\n" +
    "            </div>\n" +
    "            <div class=\"task-list__item\">\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"span8\">\n" +
    "                        <uib-progressbar animate=\"'true'\" value=\"calcProgress(task)\" type=\"success\"><b>{{calcProgress(task)}}%</b></uib-progressbar>\n" +
    "                    </div>\n" +
    "                    <div class=\"span4 text-center\">\n" +
    "                        <span>{{task.pagesTotal - task.pagesLeft}}/{{task.pagesTotal}}</span>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"span12 text-left\">\n" +
    "                        <a href>Se statistik</a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "           \n" +
    "            <div class=\"task-list__item\">\n" +
    "                <ul class=\"unstyled\">\n" +
    "                    <li><a href>Jens Jensen</a> s.93</li>\n" +
    "                    <li><a href>Hanne Hansen</a> s.115</li>\n" +
    "                    <li><a href>+ 5 andre</a></li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "        </li>\n" +
    "        \n" +
    "    </ul>\n" +
    "\n" +
    "\n" +
    "</div>");
}]);
});