export interface MenuItem {
  id: number;
  name: string;
  category: string;
  stock: number;
  image: string;
}

export const menuData: MenuItem[] = [
  // DRINKS
  {
    id: 1,
    name: "Coca Cola",
    category: "Soft drinks",
    stock: 45,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Still Water",
    category: "Soft drinks",
    stock: 100,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Gin & Tonic",
    category: "Alcoholic drinks",
    stock: 20,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Heineken",
    category: "Alcoholic drinks",
    stock: 35,
    image: "https://via.placeholder.com/150",
  },

  // LIGHT BITES
  {
    id: 5,
    name: "Ham & Cheese",
    category: "Sandwiches",
    stock: 12,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    name: "Chicken Caesar",
    category: "Wraps",
    stock: 15,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 7,
    name: "Tuna Melt",
    category: "Toasties",
    stock: 8,
    image: "https://via.placeholder.com/150",
  },

  // SNACKS
  {
    id: 8,
    name: "Chocolate Muffin",
    category: "Sweet Treats",
    stock: 25,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 9,
    name: "Sea Salt Crisps",
    category: "Crisps and crackers",
    stock: 50,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 10,
    name: "Junior Pilot Box",
    category: "Kids snack boxes",
    stock: 10,
    image: "https://via.placeholder.com/150",
  },

  // DUTY FREE
  {
    id: 11,
    name: "Chanel No. 5",
    category: "Perfume",
    stock: 5,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 12,
    name: "Mac Lipstick",
    category: "Makeup",
    stock: 14,
    image: "https://via.placeholder.com/150",
  },
];
