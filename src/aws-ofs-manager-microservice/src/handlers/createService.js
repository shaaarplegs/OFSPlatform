async function createService(event, context) {

    const {name} = JSON.parse(event.body)
    const {category} = JSON.parse(event.body)
    const {price} = JSON.parse(event.body)
    const now = new Date();

    const newService = {
        name,
        category,
        price,
        createdAt: now.toISOString()
    }

    return {
      statusCode: 201,
      body: JSON.stringify({ newService }),
    };
  }
  
  export const handler = createService;