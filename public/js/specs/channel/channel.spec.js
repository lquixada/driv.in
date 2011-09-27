
describe("Channel", function() {

    describe("init", function() {
        it("should connect to socket", function() {
            io = { connect: jasmine.createSpy().andReturn({}) };

            channel.init();

            expect( io.connect ).toHaveBeenCalled();
            expect( channel.socket ).toBeDefined();
        });
    });
    
});

