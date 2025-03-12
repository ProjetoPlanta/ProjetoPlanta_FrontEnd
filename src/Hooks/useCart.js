import { useSelector } from 'react-redux';

export const useCart = () => {
  const data = useSelector((state) => state.cart);
  return data;
};