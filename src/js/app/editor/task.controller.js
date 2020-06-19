var editorController = ['MAIN_DOMAIN', '$scope', 'taskData', 'pageData', 'userData', 'userService',function editorController(MAIN_DOMAIN, $scope, taskData, pageData, userData, userService) {
    $scope.protocol = taskData.name;
    $scope.progress = Math.round(taskData.pagesLeft / taskData.pagesTotal * 100);
    $scope.pagesTotal = pageData.unitData.pages;
    $scope.pagesDone = pageData.unitData.tasks.find(function(data) {
        return data.tasks_id === taskData.id;
    }).pages_done;
    $scope.activeUsers = [];
    $scope.activeUser = userData;
    $scope.MAIN_DOMAIN = MAIN_DOMAIN;
    $scope.unit = pageData.unitData;
    $scope.logoUrl = require('../../../images/ugle.gif').default;
    $scope.unit = pageData.unitData;

    userService.getUsers(pageData.unit_id, taskData.id).then(function(response) {
        $scope.activeUsers = response;
    });
}];

export default editorController;
