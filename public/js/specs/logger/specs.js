describe("logger", function() {
    beforeEach(function() {
        this.console = window.console;
    });

    afterEach(function() { 
        window.console = this.console; 
    });
    
    
    it("should output to the console", function() {
        window.console = { log: jasmine.createSpy() }

        logger.log( 'something' );

        expect(window.console.log).toHaveBeenCalledWith( 'something' );
    });

    it("should not output to the console if console does not exist", function() {
        window.console = undefined;

        expect( function () { logger.log( 'something' ); } ).not.toThrow();
    });
    
    
});

