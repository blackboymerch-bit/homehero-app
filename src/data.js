export const quickServices = [
  { id: 1, name: 'Laundry', icon: 'shirt', category: 'Laundry' },
  { id: 2, name: 'Deep Cleaning', icon: 'spray', category: 'Cleaning' },
  { id: 3, name: 'Dry Cleaning', icon: 'diamond', category: 'Laundry' },
  { id: 4, name: 'Cooking Assistance', icon: 'chef', category: 'Kitchen' },
  { id: 5, name: 'House Cleaning', icon: 'sparkle', category: 'Cleaning' }
]

export const serviceCategories = ['All', 'Cleaning', 'Laundry', 'Kitchen', 'Outdoor']

export const initialServices = [
  { id: 1, name: 'Laundry', category: 'Laundry', description: 'Wash, dry & fold your clothes with care', price: 3000, duration: '90min', icon: 'shirt', favorite: false },
  { id: 2, name: 'Trash Disposal', category: 'Outdoor', description: 'Proper waste sorting & disposal', price: 1500, duration: '30min', icon: 'trash', favorite: false },
  { id: 3, name: 'Errand Running', category: 'Outdoor', description: 'We run your errands so you do not have to', price: 3000, duration: '60min', icon: 'bag', favorite: false },
  { id: 4, name: 'Deep Cleaning', category: 'Cleaning', description: 'Thorough deep clean for every corner of your home', price: 12000, duration: '240min', icon: 'spray', favorite: false },
  { id: 5, name: 'Dry Cleaning', category: 'Laundry', description: 'Premium dry cleaning pickup & delivery', price: 5000, duration: '60min', icon: 'diamond', favorite: false },
  { id: 6, name: 'Dish Washing', category: 'Kitchen', description: 'Let us handle the dishes after your meal', price: 2000, duration: '45min', icon: 'cutlery', favorite: false },
  { id: 7, name: 'Fumigation', category: 'Outdoor', description: 'Pest control & fumigation services', price: 15000, duration: '180min', icon: 'bug', favorite: false },
  { id: 8, name: 'Ironing', category: 'Laundry', description: 'Crisp, wrinkle-free clothes delivered', price: 2500, duration: '60min', icon: 'drop', favorite: false },
  { id: 9, name: 'Cooking Assistance', category: 'Kitchen', description: 'Skilled cook to prepare your meals', price: 6000, duration: '120min', icon: 'chef', favorite: false },
  { id: 10, name: 'House Cleaning', category: 'Cleaning', description: 'Professional home cleaning with eco-friendly supplies', price: 5000, duration: '120min', icon: 'sparkle', favorite: false },
  { id: 11, name: 'Car Washing', category: 'Outdoor', description: 'Professional car wash at your doorstep', price: 4000, duration: '60min', icon: 'car', favorite: false },
  { id: 12, name: 'Gardening', category: 'Outdoor', description: 'Lawn care, trimming & garden maintenance', price: 7000, duration: '120min', icon: 'flower', favorite: false }
]

export const starterBookings = [
  {
    id: 1,
    status: 'Active',
    title: 'Deep Cleaning',
    helper: 'Ibrahim M.',
    rating: 4.6,
    location: 'Lagos ...',
    date: 'Today',
    price: 12000,
    badge: 'Confirmed'
  }
]

export const profileMenu = [
  { id: 'favorites', label: 'Favorites', icon: 'heart', count: true },
  { id: 'trust', label: 'Trust & Safety', icon: 'shield' },
  { id: 'help', label: 'Help & Support', icon: 'question' },
  { id: 'worker', label: 'Worker Dashboard', icon: 'tool' }
]

export const workerJobs = [
  { id: 1, title: 'Deep Cleaning', location: 'Lekki', payout: 12000, time: 'ASAP' },
  { id: 2, title: 'Laundry Pickup', location: 'Yaba', payout: 3000, time: '11:00 AM' },
  { id: 3, title: 'Dish Washing', location: 'Surulere', payout: 2000, time: '2:00 PM' }
]
