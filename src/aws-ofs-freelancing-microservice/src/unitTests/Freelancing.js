const createFreelancing = (props) => {
  const jsonObject = {
    id: "c9c79ed1-5b6b-4e7c-bd61-2963453e34ad",
    vertical_id: props.vertical_id,
    name:props.name,
    city:props.city,
    description:props.description,
    price:props.price,
    scheduledTime:props.scheduledTime
  }
  return jsonObject;
}

module.exports = createFreelancing;