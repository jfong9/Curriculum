
import gql from 'graphql-tag'

const CURRICULUM_QUERY = gql`
    query curriculum($input: CurriculumInput!) {
        curriculum(input: $input) {
            topCategories {
                _id
                title
            }
            archivedTopCategories {
                _id
                title
            }
        }
    }
`
export function queryCurriculum(client, schoolId, art) {
    if (!schoolId || !art) return new Promise(() => {});
    let input = { schoolId, art}
    return client.query({
        "query": CURRICULUM_QUERY,
        "operationName": "curriculum",
        "variables": { input }
    })
    .then( res => res.data)
    .then( data => data.curriculum)
    .catch(console.error)
    .finally( () => {
        client.resetStore();
    })
}

export function mutateCreateTopCategory(client, parentId, title) {

}