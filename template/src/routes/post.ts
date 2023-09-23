import {createRoute, t} from "@grace-js/grace";

const route = createRoute({
    schema: {
        body: t.Object({
            name: t.String(),
            age: t.Numeric()
        }),
        response: {
            200: t.Object({
                message: t.String(),
            })
        }
    },
    handler: async ({body}) => {
        return {
            code: 'OK',
            body: {
                message: `Hello ${body.name}, you are ${body.age} years old!`
            }
        }
    }
});

export default route;
