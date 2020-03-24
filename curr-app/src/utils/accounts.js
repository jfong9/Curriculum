
import { ApolloClient, InMemoryCache, HttpLink} from 'apollo-boost';
import { AccountsClient } from '@accounts/client';
import { AccountsClientPassword } from '@accounts/client-password'
import { accountsLink } from '@accounts/apollo-link'
import { from } from 'apollo-link'
import GraphQLClient from '@accounts/graphql-client'


const authLink = accountsLink(() => accountsClient);

const httpLink = new HttpLink({
    uri: 'http://localhost:4000'
})

const apolloClient = new ApolloClient({
    link: from([authLink, httpLink]),
    cache: new InMemoryCache(),
})

const accountsGraphQL = new GraphQLClient({graphQLClient: apolloClient})
const accountsClient = new AccountsClient({}, accountsGraphQL);
const accountsPassword = new AccountsClientPassword(accountsClient)

export { accountsClient, accountsGraphQL, accountsPassword, apolloClient };