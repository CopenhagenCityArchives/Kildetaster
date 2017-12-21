define([], function() {

    var schoolController = /* @ngInject */ function schoolController(helpers, EDITORURL, $scope) {

        var that = this;

        $scope.isNumber = angular.isNumber;

        this.$onInit = function() {

            that.imageUrl = helpers.getImageUrlByPostId(this.data.post_id);

            that.editorUrl = EDITORURL + '/#/task/' + that.data.task_id + '/page/' + that.data.page_id + '/post/' + that.data.post_id;

        };

    };

    return schoolController;
});
