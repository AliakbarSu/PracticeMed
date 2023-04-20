const {
    expireUserTest,
    updateUserTests,
    listUsersActiveTests
} = require('./index')



describe('insert', () => {
    let tests = [
        {
            _id: "some-id",
            userId: "some-user-id",
            tests: [
                {type: "prod_Jvv487fb4ZqcIb", expired: true}, 
                {type: "prod_Jvv487fb4ZqcIb", expired: false}
            ]
        }
        
    ]
    beforeEach(() => {
        const updatedTest = {
            _id: "some-id",
            userId: "some-user-id",
            tests: [
                {type: "prod_Jvv487fb4ZqcIb", expired: true}, 
                {type: "prod_Jvv487fb4ZqcIb", expired: true}
            ]
        }
        Test.updateOne = async () => updatedTest
        Test.findOne = async () => tests[0]
    })


  it("Should updated user tests in the DB", async () => {

    const userTests = [
        {type: "prod_Jvv487fb4ZqcIb", expired: true}, 
        {type: "prod_Jvv487fb4ZqcIb", expired: true}
    ]

    const updatedTest = await updateUserTests(userTests, "some-user-id")

    expect(updatedTest.tests).toEqual(userTests)
  })

  it("Should return a list of tests for given userId", async () => {
    const expectedValue = tests[0].tests

    const actual = await listUsersActiveTests("some-user-id")

    expect(actual).toEqual(expectedValue)
  })
})


test('Should return a new array with expired tests', () => {
    const tests = [{type: "prod_Jvv487fb4ZqcIb", expired: false}]
    const expiredTests = [
        {type: "prod_Jvv487fb4ZqcIb", expired: true}, 
        {type: "prod_Jvv487fb4ZqcIb", expired: true}
    ]

    const actual = expireUserTest(tests, "prod_Jvv487fb4ZqcIb")

    expect(actual).toEqual(   
        expect.arrayContaining([ 
          expect.objectContaining(expiredTests[1])
        ])
      )
    expect(expireUserTest.length).toBe(2)
})
