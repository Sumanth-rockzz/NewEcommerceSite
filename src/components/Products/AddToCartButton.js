import { useState } from "react";
import { cartActions } from "../../redux-store/cart-slice";
import { useDispatch } from "react-redux";
import { message, Button } from "antd";
import { addToCart } from "../../API/API";
const AddToCartButton = ({ item }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const addToCartHandler = () => {
    setLoading(true);
    dispatch(
      cartActions.addItem({
        key: item.id,
        id: item.id,
        title: item.title,
        price: item.price,
        total: item.price,
        quantity: 1,
      })
    );
    addToCart(item.id).then((res) => {
      message.success(`${item.title} has been added to cart!`);
      setLoading(false);
    });
  };
  return (
    <Button type="link" onClick={addToCartHandler} loading={loading}>
      <h4>Add to cart</h4>
    </Button>
  );
};

export default AddToCartButton;
