async function retrieveService(event, context) {

    const services = [
        {
            'name':"Plumbing",
            'category':"localServices",
            'price':5
        },
        {
            'name':"handyman",
            'category':"localServices",
            'price':25
        },
        {
            'name':"furniture assembling",
            'category':"localServices",
            'price':32
        },
    ]

    return {
      statusCode: 200,
      body: JSON.stringify({ services }),
    };
  }
  
  export const handler = retrieveService;