export const formatIDR = (num: number) => {
  return new Intl.NumberFormat("id-ID").format(num);
};