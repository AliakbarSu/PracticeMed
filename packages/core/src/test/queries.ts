export const listTestsQuery = `
    query GetTests {
        tests {
            available
            id
            name
            type
            description
            questions {
            id
            point
            text
            options {
                alpha
                correct
                id
                text
            }
            field
            correct_option_id
            correct_option_explanation
            }
        }
    }
`

export const getTestQuery = `
    query GetTest($id: ID!) {
        test(where: {id: $id}) {
            available
            id
            name
            type
            description
            questions {
            id
            point
            text
            options {
                alpha
                correct
                id
                text
            }
            field
            correct_option_id
            correct_option_explanation
            }
        }
    }
    
`
