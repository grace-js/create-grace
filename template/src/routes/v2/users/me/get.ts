import {createRouteWithExtras, t} from "@grace-js/grace";

type User = {
    id: number;
    name: string;
}

type UserContext = {
    user: User;
}

const createUserRoute = createRouteWithExtras<UserContext>();

const route = createUserRoute({
    schema: {
        response: {
            200: t.Object({
                id: t.Number(),
                name: t.String()
            })
        }
    },
    before: [
        async (context) => {
            context.user = {
                id: 123,
                name: 'John'
            }
        }
    ],
    handler: async ({user}) => {
        console.log("handler", user);
        return {
            code: 'OK',
            body: {
                id: user.id,
                name: user.name
            }
        }
    }
});

export default route;
