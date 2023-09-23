import {createRoute, t} from "@grace-js/grace";

const route = createRoute({
    schema: {
        query: t.Object({
            name: t.String()
        }),
        response: {
            200: t.Object({
                message: t.String()
            })
        }
    },
    handler: async ({query}) => {
        return {
            code: 'OK',
            body: {
                message: `Hello ${query.name}!`
            }
        }
    }
});

export default route;
