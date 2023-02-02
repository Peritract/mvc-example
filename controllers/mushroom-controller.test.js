const { index, show, create, update, destroy } = require('./mushroom');
const Mushroom = require("../models/mushroom");

describe("mushroomControllerIndex", () => {

    let fakeReq;
    let fakeRes;

    beforeEach(() => {
       fakeReq = {};
       fakeRes = { json: jest.fn() };
    })

    it("Sends a list", async () => {

        jest.spyOn(Mushroom, 'getAll').mockImplementation(() => []);

        await index(fakeReq, fakeRes);

        expect(fakeRes.json).toHaveBeenCalled();
        expect(fakeRes.json).toHaveBeenCalledTimes(1);
        expect(fakeRes.json).toHaveBeenCalledWith([]);
        expect(fakeRes.json.mock.calls[0][0] instanceof Array).toBe(true);
    })

    it("Sends a list with the right number of items", async () => {
        
        jest.spyOn(Mushroom, 'getAll').mockImplementation(() => [1, 2, 3]);

        await index(fakeReq, fakeRes);

        expect(fakeRes.json.mock.calls[0][0].length).toBe(3);
    })

    afterEach(() => {
        jest.resetAllMocks();
    })

})

describe("mushroomControllerCreate", () => {

    let fakeReq;
    let fakeRes;
    const fakeCreate = jest.fn();

    beforeEach(() => {
       fakeRes = { json: jest.fn() };
    })

    it("Sends a list", async () => {

        fakeReq

        jest.spyOn(Mushroom, 'create').mockImplementation(() => new Mushroom({
            
        }));

        await index(fakeReq, fakeRes);

        expect(fakeRes.json).toHaveBeenCalled();
        expect(fakeRes.json).toHaveBeenCalledTimes(1);
        expect(fakeRes.json).toHaveBeenCalledWith([]);
        expect(fakeRes.json.mock.calls[0][0] instanceof Array).toBe(true);
    })

    afterEach(() => {
        jest.resetAllMocks();
    })

})