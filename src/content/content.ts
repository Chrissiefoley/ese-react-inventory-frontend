export interface MenuItem {
  id: number;
  name: string;
  category: string;
  description: string;
  count: number;
  price: string;
  image: string;
}

export const menuData: MenuItem[] = [
  // DRINKS
  {
    id: 1,
    name: "Coca Cola",
    category: "Soft drinks",
    description: "",
    count: 45,
    price: "£3.50",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Still Water",
    category: "Soft drinks",
    description: "",
    count: 100,
    price: "£3.00",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Gin & Tonic",
    category: "Alcoholic drinks",
    description: "",
    count: 20,
    price: "£9.50",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Heineken",
    category: "Alcoholic drinks",
    description: "",
    count: 35,
    price: "£7.50",
    image: "https://via.placeholder.com/150",
  },

  // LIGHT BITES
  {
    id: 5,
    name: "Ham & Cheese",
    category: "Sandwiches",
    description: "",
    count: 12,
    price: "£6.50",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    name: "Chicken Caesar",
    category: "Wraps",
    description: "",
    count: 15,
    price: "£7.50",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 7,
    name: "Tuna Melt",
    category: "Toasties",
    description: "",
    count: 8,
    price: "£6.50",
    image: "https://via.placeholder.com/150",
  },

  // SNACKS
  {
    id: 8,
    name: "Chocolate Muffin",
    category: "Sweet Treats",
    description: "",
    count: 25,
    price: "£2.50",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 9,
    name: "Sea Salt Crisps",
    category: "Crisps and crackers",
    description: "",
    count: 50,
    price: "£2.50",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 10,
    name: "Junior Pilot Box",
    category: "Kids snack boxes",
    description: "",
    count: 10,
    price: "£5.50",
    image: "https://via.placeholder.com/150",
  },

  // DUTY FREE
  {
    id: 11,
    name: "Chanel No. 5",
    category: "Perfume",
    description: "",
    count: 5,
    price: "£65.00",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 12,
    name: "Mac Lipstick",
    category: "Makeup",
    description: "",
    count: 14,
    price: "£9.50",
    image: "https://via.placeholder.com/150",
  },
];
