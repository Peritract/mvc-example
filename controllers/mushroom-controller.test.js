const { index } = require("./mushroom");

const Mushroom = require("../models/mushroom");

describe("mushroomController - Index", () => {

    let fakeReq;
    let fakeRes;

    beforeEach(() => {
        fakeReq = {};
        fakeRes = { json: jest.fn() };
    })

    it("Sends an array to the response", async () => {

        // With a valid req & res, if the model returned something valid
        // index would give res.json an array

        jest.spyOn(Mushroom, "getAll").mockImplementation(() => [])
        
        await index(fakeReq, fakeRes);

        expect(fakeRes.json).toHaveBeenCalled();
        expect(fakeRes.json).toHaveBeenCalledTimes(1);
        expect(fakeRes.json).toHaveBeenCalledWith([]);
        expect(fakeRes.json.mock.calls[0][0] instanceof Array).toBe(true);
    })

    it("Sends a list of mushroom objects when given data", async () => {

        jest.spyOn(Mushroom, "getAll").mockImplementation(() => [new Mushroom({
            mushroom_id: -1,
            mushroom_name: "Fakella",
            age: 0,
            mushroom_role: "dupe"
        })])
        
        await index(fakeReq, fakeRes);

        expect(fakeRes.json.mock.calls[0][0][0] instanceof Mushroom);

    })

    afterEach(() => {
        jest.resetAllMocks();
    })

})