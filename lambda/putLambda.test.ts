import * as putLambda from "./putLambda"
// @ponicode
describe("putLambda.handler", () => {
    test("0", async () => {
        await putLambda.handler(9876)
    })

    test("1", async () => {
        await putLambda.handler({ path: "/path/to/file" })
    })

    test("2", async () => {
        await putLambda.handler(7588892)
    })

    test("3", async () => {
        await putLambda.handler({ path: "." })
    })

    test("4", async () => {
        await putLambda.handler({ path: "path/to/folder/" })
    })

    test("5", async () => {
        await putLambda.handler(-Infinity)
    })
})
