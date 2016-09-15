define([

    'angular',
    'angular-mocks',

    'app/editor/editor'

], function() {

    //Basic object to populate an input
    var helpers,

        originalRect = {
            x: 0,
            y: 0,
            width: 0.5,
            height: 0.3333
        },
        percentageRect = {
            x: 0,
            y: 0,
            width: 0.5,
            height: 0.4519023487962419
        },
        aspectRatio = 0.7375487223906453;

    describe('helpers', function() {

            beforeEach(function() {
                module('shared');

                inject(function(_helpers_) {
                    helpers = _helpers_;
                });

            });

            it('should convert from percentage height to openseadragon height', function() {

                var result = helpers.convertPercentToOpenSeadragonRect(originalRect, aspectRatio);

                expect(result).toEqual(percentageRect);
            });

            it('should convert from openseadragon height to percent', function() {

                var result = helpers.convertOpenSeadragonRectToPercent(percentageRect, aspectRatio);

                expect(result).toEqual(originalRect);
            });

    });

});
