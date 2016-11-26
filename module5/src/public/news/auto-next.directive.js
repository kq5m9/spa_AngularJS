var app = angular.module("common");

app.directive('autoNext', autoNextDirective);

function autoNextDirective() {
	var ddo = {
		restrict: "A",
		link: autoNextDirectiveLink
	};
	return ddo;
}

function autoNextDirectiveLink($scope, element) {
	element.on("input", function(e) {
		if(element.val().length == element.attr("maxlength")) {
			var $nextElement = element.next();
			if($nextElement.length) {
				$nextElement[0].focus();
			}
		}
	});
}