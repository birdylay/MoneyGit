var simpleCartInstance = [];

angular.module('ngApp').controller('eCommerceCtrl', function($scope, $ionicModal, checkoutService) {

	setTimeout(function() {
		updateSimpleCartInstances();
	}, 100);

	$scope.checkoutService = checkoutService;

    $scope.showDetails = function(i) {
        $ionicModal.fromTemplateUrl('product' + i + '.html', {
			scope: $scope,
			animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
			$scope.modal.show();

			$('ion-modal-view .item_price').each(function(index, element) {
				$(this).html(simpleCart.toCurrency($(this).text()));
			});
			updateSimpleCartInstances();
        });
    };

});

angular.module('ngApp').controller('MainCtrl', function($scope, checkoutService) {

	$scope.checkoutService = checkoutService;

});

angular.module('ngApp').service('checkoutService', function($ionicModal) {

    this.showModal = function() {

        var service = this;

        $ionicModal.fromTemplateUrl('checkout.html', {
          	scope: null,
			animation: 'slide-in-up'
        }).then(function(modal) {
            service.modal = modal;
            service.modal.show();
			updateSimpleCartInstances();
        });
    };

    this.hideModal = function() {
        this.modal.hide();
    };

});

function updateSimpleCartInstances()
{
	simpleCart.update();

	$('.taxRate').text(simpleCart.taxRate() * 100);

	$('.item_price, .shop_price, .itemRow .item-price, .itemRow .item-total').each(function(index, element) {
		var price = parseFloat($(this).text().replace(/[^\d\.]/g, ''));
		$(this).html(simpleCart.toCurrency(price));
	});
}