export const color = [
    "White",
    "Black",
    "Red",
    "Maroon",
    "Beige",
    "Pink",
    "Green",
    "Yellow",
]
export const filters = [
    {
      id: 'color',
      name: 'Color',
      options: [
        { value: 'white', label: 'White', checked: false },
        { value: 'beige', label: 'Beige', checked: false },
        { value: 'blue', label: 'Blue', checked: false },
        { value: 'brown', label: 'Brown', checked: false },
        { value: 'green', label: 'Green', checked: false },
        { value: 'pink', label: 'Purple', checked: false },
      ],
    },
    {   
        id: 'size',
        name: 'Size',
        options: [
          { value: 'XS', label: 'XS', checked: false },
          { value: 'S', label: 'S', checked: false },
          { value: 'M', label: 'M', checked: false },
          { value: 'L', label: 'L', checked: false },
          { value: 'XL', label: 'XL', checked: false },
          { value: 'XXL', label: 'XXL', checked: false },
        ],
      },
    
  ]

  export const singleFilters = [
    {
        id: 'price',
        name: 'Price',
        options: [
            { value: '159-399', label: '₹159 To ₹399', checked: false },
            { value: '399-999', label: '₹399 To ₹999', checked: false },
            { value: '999-1999', label: '₹999 To ₹1999', checked: false },
            { value: '1999-2999', label: '₹1999 To ₹2999', checked: false },
            { value: '2999-3999', label: '₹2999 To ₹3999', checked: false },
            { value: '3999-4999', label: '₹3999 To ₹4999', checked: true },
      ],
    },
    {
        id: 'discount',
        name: 'Discount Range',
        options: [
            { value: '10', label: '10% and above' },
            { value: '20', label: '20% and above' },
            { value: '30', label: '30% and above' },
            { value: '40', label: '40% and above' },
            { value: '50', label: '50% and above' },
            { value: '60', label: '60% and above' },
            { value: '70', label: '70% and above' },
            { value: '80', label: '80% and above' },
            { value: '90', label: '90% and above' },
      ],
    },
    {
        id: 'stock',
        name: 'Availability',
        options: [
            { value: 'in-stock', label: 'In Stock' },
            { value: 'out_of_stock', label: 'Out of Stock' },
      ],
    }
  ]