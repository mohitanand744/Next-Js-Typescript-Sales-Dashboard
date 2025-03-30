"use client"

import React, { useState, useEffect } from 'react'
import {
  Package,
  Search,
  Filter,
  ChevronDown,
  Edit2,
  Eye,
  Plus,
  Tag,
  BarChart,
  AlertCircle,
  Trash2
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Define the Product type
type Product = {
  id: number
  name: string
  price: string
  numericPrice: number
  stock: number
  category: string
  status: string
  description?: string
  imageUrl?: string
}

export default function ProductsPage() {
  // Product data state
  const [allProducts, setAllProducts] = useState<Product[]>([
    { id: 1, name: "Premium Headphones", price: "$299", numericPrice: 299, stock: 45, category: "Electronics", status: "In Stock", description: "High-quality over-ear headphones with noise cancellation" },
    { id: 2, name: "Wireless Keyboard", price: "$89", numericPrice: 89, stock: 32, category: "Accessories", status: "In Stock", description: "Ergonomic wireless keyboard with long battery life" },
    { id: 3, name: "Ultra HD Monitor", price: "$499", numericPrice: 499, stock: 18, category: "Electronics", status: "Low Stock", description: "27-inch 4K Ultra HD monitor with HDR support" },
    { id: 4, name: "Ergonomic Mouse", price: "$59", numericPrice: 59, stock: 54, category: "Accessories", status: "In Stock", description: "Comfortable ergonomic mouse designed for all-day use" },
    { id: 5, name: "USB-C Dock", price: "$129", numericPrice: 129, stock: 23, category: "Accessories", status: "In Stock", description: "Multi-port USB-C dock with power delivery" },
    { id: 6, name: "Bluetooth Speaker", price: "$79", numericPrice: 79, stock: 41, category: "Audio", status: "In Stock", description: "Portable Bluetooth speaker with 20-hour battery life" },
    { id: 7, name: "Smartphone Case", price: "$29", numericPrice: 29, stock: 67, category: "Accessories", status: "In Stock", description: "Durable smartphone case with drop protection" },
    { id: 8, name: "Wireless Earbuds", price: "$149", numericPrice: 149, stock: 29, category: "Audio", status: "In Stock", description: "True wireless earbuds with active noise cancellation" },
    { id: 9, name: "Smartwatch", price: "$199", numericPrice: 199, stock: 15, category: "Wearables", status: "Low Stock", description: "Feature-rich smartwatch with health tracking" },
    { id: 10, name: "Laptop Backpack", price: "$69", numericPrice: 69, stock: 38, category: "Accessories", status: "In Stock", description: "Water-resistant backpack with laptop compartment" },
    { id: 11, name: "Wireless Charger", price: "$39", numericPrice: 39, stock: 0, category: "Accessories", status: "Out of Stock", description: "Fast wireless charging pad for compatible devices" },
    { id: 12, name: "Mechanical Keyboard", price: "$129", numericPrice: 129, stock: 22, category: "Accessories", status: "In Stock", description: "Mechanical keyboard with RGB backlighting" },
    { id: 13, name: "Gaming Mouse", price: "$79", numericPrice: 79, stock: 31, category: "Gaming", status: "In Stock", description: "High-precision gaming mouse with customizable buttons" },
    { id: 14, name: "External SSD", price: "$159", numericPrice: 159, stock: 0, category: "Storage", status: "Out of Stock", description: "Portable SSD with 1TB capacity and fast transfer speeds" },
    { id: 15, name: "Tablet Stand", price: "$25", numericPrice: 25, stock: 42, category: "Accessories", status: "In Stock", description: "Adjustable stand for tablets and e-readers" },
    { id: 16, name: "Webcam", price: "$89", numericPrice: 89, stock: 7, category: "Electronics", status: "Low Stock", description: "Full HD webcam with built-in microphone" },
  ])

  // Dialog states
  const [open, setOpen] = useState(false)
  const [isViewingProduct, setIsViewingProduct] = useState(false)
  const [isEditingProduct, setIsEditingProduct] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Form state for new/edit product
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: '',
    numericPrice: 0,
    stock: 0,
    category: '',
    status: 'In Stock',
    description: ''
  })

  // Form validation state
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    price?: string;
    stock?: string;
    category?: string;
  }>({})

  // State for search query
  const [searchQuery, setSearchQuery] = useState('')

  // State for filters
  const [categoryFilter, setCategoryFilter] = useState<string[]>([])
  const [statusFilter, setStatusFilter] = useState<string[]>([])
  const [priceFilter, setPriceFilter] = useState<string[]>([])

  // State for filtered products
  const [filteredProducts, setFilteredProducts] = useState(allProducts)

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 8

  // Price range options
  const priceRanges = [
    "Under $50",
    "$50 - $100",
    "$100 - $200",
    "$200 - $500",
    "Over $500"
  ]

  // Reset form data
  const resetFormData = () => {
    setNewProduct({
      name: '',
      price: '',
      numericPrice: 0,
      stock: 0,
      category: '',
      status: 'In Stock',
      description: ''
    });
    setFormErrors({});
  };

  // Handle add dialog open/close
  const handleAddDialogChange = (open: boolean) => {
    if (open) {
      // Reset form data when opening the add dialog
      resetFormData();
    }
    setOpen(open);
  };

  // Apply filters and search
  useEffect(() => {
    let result = [...allProducts]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query)
      )
    }

    // Apply category filter
    if (categoryFilter.length > 0) {
      result = result.filter(product => categoryFilter.includes(product.category))
    }

    // Apply status filter
    if (statusFilter.length > 0) {
      result = result.filter(product => statusFilter.includes(product.status))
    }

    // Apply price filter
    if (priceFilter.length > 0) {
      result = result.filter(product => {
        const price = product.numericPrice
        return priceFilter.some(range => {
          if (range === "Under $50") return price < 50
          if (range === "$50 - $100") return price >= 50 && price <= 100
          if (range === "$100 - $200") return price > 100 && price <= 200
          if (range === "$200 - $500") return price > 200 && price <= 500
          if (range === "Over $500") return price > 500
          return false
        })
      })
    }

    setFilteredProducts(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [allProducts, searchQuery, categoryFilter, statusFilter, priceFilter])

  // Get paginated products
  const getPaginatedProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage
    return filteredProducts.slice(startIndex, startIndex + productsPerPage)
  }

  // Calculate page count
  const pageCount = Math.ceil(filteredProducts.length / productsPerPage)

  // Get unique values for filters
  const categories = [...new Set(allProducts.map(p => p.category))]
  const statuses = [...new Set(allProducts.map(p => p.status))]

  // Toggle filter function
  const toggleFilter = (filter: string[], value: string, setFilter: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (filter.includes(value)) {
      setFilter(filter.filter(item => item !== value))
    } else {
      setFilter([...filter, value])
    }
  }

  // Clear all filters
  const clearFilters = () => {
    setCategoryFilter([])
    setStatusFilter([])
    setPriceFilter([])
    setSearchQuery('')
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === "price") {
      // Extract numeric price from the string (remove $ and other non-numeric characters)
      const numericValue = parseFloat(value.replace(/[^\d.]/g, '')) || 0
      setNewProduct({
        ...newProduct,
        [name]: value.startsWith('$') ? value : `$${value}`,
        numericPrice: numericValue
      })
    } else {
      setNewProduct({
        ...newProduct,
        [name]: value
      })
    }
  }

  // Handle numeric input changes
  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const numericValue = parseInt(value) || 0
    setNewProduct({
      ...newProduct,
      [name]: numericValue
    })
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setNewProduct({
      ...newProduct,
      [name]: value
    })
  }

  // Validate form
  const validateForm = (): boolean => {
    const errors: {
      name?: string;
      price?: string;
      stock?: string;
      category?: string;
    } = {}

    if (!newProduct.name?.trim()) {
      errors.name = "Name is required"
    }

    if (!newProduct.price) {
      errors.price = "Price is required"
    }

    if (newProduct.stock === undefined) {
      errors.stock = "Stock quantity is required"
    }

    if (!newProduct.category) {
      errors.category = "Category is required"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Add new product
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Create new product with unique ID
    const newId = Math.max(...allProducts.map(p => p.id)) + 1
    const productToAdd = {
      ...newProduct,
      id: newId,
    } as Product

    // Add to products list
    setAllProducts([productToAdd, ...allProducts])

    // Reset form
    setNewProduct({
      name: '',
      price: '',
      numericPrice: 0,
      stock: 0,
      category: '',
      status: 'In Stock',
      description: ''
    })

    // Close dialog
    setOpen(false)

    // Show success notification
    toast({
      title: "Product added",
      description: `${productToAdd.name} has been added to your product catalog.`,
      type: "success",
      duration: 5000,
      position: "top-center",
    })
  }

  // Get status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
      case "Low Stock":
        return "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "Out of Stock":
        return "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  // Handler for view product details
  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product)
    setIsViewingProduct(true)
  }

  // Handler for edit product
  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product)
    setNewProduct({
      name: product.name,
      price: product.price,
      numericPrice: product.numericPrice,
      stock: product.stock,
      category: product.category,
      status: product.status,
      description: product.description || ''
    })
    setIsEditingProduct(true)
  }

  // Update product
  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm() || !selectedProduct) {
      return
    }

    // Update product in the list
    const updatedProducts = allProducts.map(product =>
      product.id === selectedProduct.id
        ? { ...product, ...newProduct, id: selectedProduct.id } as Product
        : product
    )

    setAllProducts(updatedProducts)

    // Reset form and close dialog
    setNewProduct({
      name: '',
      price: '',
      numericPrice: 0,
      stock: 0,
      category: '',
      status: 'In Stock',
      description: ''
    })
    setIsEditingProduct(false)
    setSelectedProduct(null)

    // Show success notification
    toast({
      title: "Product updated",
      description: `${newProduct.name} has been updated successfully.`,
      type: "success",
      duration: 5000,
      position: "top-center",
    })
  }

  // Close product dialogs
  const closeProductDialogs = () => {
    setIsViewingProduct(false)
    setIsEditingProduct(false)
    setSelectedProduct(null)
    resetFormData();
  }

  // Handler for delete product
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedProduct) {
      setIsDeleteDialogOpen(true)
    }
  }

  // Delete product
  const handleDeleteProduct = () => {
    if (!selectedProduct) return

    // Remove product from the list
    const updatedProducts = allProducts.filter(product => product.id !== selectedProduct.id)
    setAllProducts(updatedProducts)

    // Close dialogs
    setIsDeleteDialogOpen(false)
    setIsViewingProduct(false)
    setIsEditingProduct(false)

    // Show success notification
    toast({
      title: "Product deleted",
      description: `${selectedProduct.name} has been deleted from your product catalog.`,
      type: "success",
      duration: 5000,
      position: "top-center",
    })

    // Reset selected product
    setSelectedProduct(null)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <p className="text-muted-foreground">
          Manage your product inventory and catalog.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex justify-end w-full gap-2 sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="w-4 h-4 mr-2" />
                Filter
                <Badge className="ml-2 h-5 px-1.5 text-xs" variant="secondary">
                  {categoryFilter.length + statusFilter.length + priceFilter.length || 0}
                </Badge>
                <ChevronDown className="w-4 h-4 ml-2 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[280px] max-h-[500px] overflow-auto" align="end">
              <DropdownMenuLabel>Filter Products</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs">Category</DropdownMenuLabel>
                {categories.map(category => (
                  <DropdownMenuCheckboxItem
                    key={category}
                    checked={categoryFilter.includes(category)}
                    onCheckedChange={() => toggleFilter(categoryFilter, category, setCategoryFilter)}
                  >
                    {category}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs">Status</DropdownMenuLabel>
                {statuses.map(status => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={statusFilter.includes(status)}
                    onCheckedChange={() => toggleFilter(statusFilter, status, setStatusFilter)}
                  >
                    {status}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs">Price Range</DropdownMenuLabel>
                {priceRanges.map(range => (
                  <DropdownMenuCheckboxItem
                    key={range}
                    checked={priceFilter.includes(range)}
                    onCheckedChange={() => toggleFilter(priceFilter, range, setPriceFilter)}
                  >
                    {range}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <Button
                variant="ghost"
                size="sm"
                className="justify-center w-full"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={open} onOpenChange={handleAddDialogChange}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-9">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Fill in the details to add a new product to your inventory.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddProduct} className="py-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-right">
                    Product Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    placeholder="Premium Headphones"
                    className={formErrors.name ? "border-red-500" : ""}
                  />
                  {formErrors.name && <p className="text-sm text-red-500">{formErrors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-right">
                    Price
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    placeholder="$99"
                    className={formErrors.price ? "border-red-500" : ""}
                  />
                  {formErrors.price && <p className="text-sm text-red-500">{formErrors.price}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock" className="text-right">
                    Stock Quantity
                  </Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    value={newProduct.stock}
                    onChange={handleNumericChange}
                    placeholder="25"
                    className={formErrors.stock ? "border-red-500" : ""}
                  />
                  {formErrors.stock && <p className="text-sm text-red-500">{formErrors.stock}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select
                    onValueChange={(value) => handleSelectChange('category', value)}
                  >
                    <SelectTrigger className={formErrors.category ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Accessories">Accessories</SelectItem>
                      <SelectItem value="Audio">Audio</SelectItem>
                      <SelectItem value="Gaming">Gaming</SelectItem>
                      <SelectItem value="Wearables">Wearables</SelectItem>
                      <SelectItem value="Storage">Storage</SelectItem>
                    </SelectContent>
                  </Select>
                  {formErrors.category && <p className="text-sm text-red-500">{formErrors.category}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select
                    defaultValue={newProduct.status}
                    onValueChange={(value) => handleSelectChange('status', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="In Stock">In Stock</SelectItem>
                      <SelectItem value="Low Stock">Low Stock</SelectItem>
                      <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    name="description"
                    value={newProduct.description}
                    onChange={handleInputChange}
                    placeholder="Product description..."
                  />
                </div>
                <DialogFooter className="pt-4 flex-col-reverse gap-3 sm:flex-row">
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Product</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Product Inventory</CardTitle>
              <CardDescription>Manage your products and stock levels</CardDescription>
            </div>
            {(searchQuery || categoryFilter.length > 0 || statusFilter.length > 0 || priceFilter.length > 0) && (
              <div className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} of {allProducts.length} products
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {/* Desktop Table View */}
          <div className="hidden overflow-hidden border rounded-md md:block">
            <div className="grid grid-cols-12 px-4 py-3 text-sm font-medium border-b bg-muted/50">
              <div className="col-span-4">Product</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-2">Stock</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>
            <div className="divide-y">
              {getPaginatedProducts().length > 0 ? (
                getPaginatedProducts().map(product => (
                  <div key={product.id} className="grid items-center grid-cols-12 px-4 py-3">
                    <div className="col-span-4 font-medium">{product.name}</div>
                    <div className="col-span-2">{product.price}</div>
                    <div className="col-span-2">{product.stock}</div>
                    <div className="col-span-2">{product.category}</div>
                    <div className="col-span-1">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusVariant(product.status)}`}>
                        {product.status}
                      </span>
                    </div>
                    <div className="flex justify-end col-span-1 gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-8 h-8 p-0"
                        title="View Details"
                        onClick={() => handleViewProduct(product)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-8 h-8 p-0"
                        title="Edit Product"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-8 text-center">
                  <p className="text-muted-foreground">No products match your criteria.</p>
                  <Button variant="link" onClick={clearFilters} className="mt-2">
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="space-y-4 md:hidden">
            {getPaginatedProducts().length > 0 ? (
              getPaginatedProducts().map(product => (
                <Card key={product.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-3 p-4 border-b">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                        <Tag className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">{product.category}</div>
                      </div>
                      <div className="ml-auto">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusVariant(product.status)}`}>
                          {product.status}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Price:</span>
                        <span className="text-sm">{product.price}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Stock:</span>
                        <span className="text-sm">{product.stock} units</span>
                      </div>
                      {product.description && (
                        <div className="pt-2 text-sm text-muted-foreground">
                          {product.description}
                        </div>
                      )}
                    </div>
                    <div className="flex border-t">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 py-2 rounded-none"
                        onClick={() => handleViewProduct(product)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <div className="w-px h-10 bg-border" />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 py-2 rounded-none"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="p-8 text-center border rounded-md">
                <p className="text-muted-foreground">No products match your criteria.</p>
                <Button variant="link" onClick={clearFilters} className="mt-2">
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </CardContent>
        {pageCount > 1 && (
          <CardFooter className="flex items-center justify-center gap-1 pt-8 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="flex items-center gap-1 mx-2">
              {Array.from({ length: pageCount }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  className="w-8 h-8 p-0"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
              disabled={currentPage === pageCount}
            >
              Next
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* View Product Dialog */}
      <Dialog open={isViewingProduct} onOpenChange={setIsViewingProduct}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
            <DialogDescription>
              Detailed information about this product.
            </DialogDescription>
          </DialogHeader>

          {selectedProduct && (
            <div className="py-4 space-y-4">
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold">{selectedProduct.name}</h3>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusVariant(selectedProduct.status)}`}>
                  {selectedProduct.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="font-medium">{selectedProduct.price}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Stock</p>
                  <p className="font-medium">{selectedProduct.stock} units</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-medium">{selectedProduct.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Product ID</p>
                  <p className="font-medium">#{selectedProduct.id}</p>
                </div>
              </div>

              {selectedProduct.description && (
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="mt-1">{selectedProduct.description}</p>
                </div>
              )}

              <DialogFooter className="flex justify-between gap-3">
                <Button variant="destructive" onClick={handleDeleteClick}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
                <Button onClick={() => handleEditProduct(selectedProduct)}>
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Product
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditingProduct} onOpenChange={setIsEditingProduct}>
        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the details of this product.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateProduct} className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name" className="text-right">
                Product Name
              </Label>
              <Input
                id="edit-name"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                className={formErrors.name ? "border-red-500" : ""}
              />
              {formErrors.name && <p className="text-sm text-red-500">{formErrors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-price" className="text-right">
                Price
              </Label>
              <Input
                id="edit-price"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                className={formErrors.price ? "border-red-500" : ""}
              />
              {formErrors.price && <p className="text-sm text-red-500">{formErrors.price}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-stock" className="text-right">
                Stock Quantity
              </Label>
              <Input
                id="edit-stock"
                name="stock"
                type="number"
                value={newProduct.stock}
                onChange={handleNumericChange}
                className={formErrors.stock ? "border-red-500" : ""}
              />
              {formErrors.stock && <p className="text-sm text-red-500">{formErrors.stock}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-category" className="text-right">
                Category
              </Label>
              <Select
                value={newProduct.category}
                onValueChange={(value) => handleSelectChange('category', value)}
              >
                <SelectTrigger className={formErrors.category ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                  <SelectItem value="Audio">Audio</SelectItem>
                  <SelectItem value="Gaming">Gaming</SelectItem>
                  <SelectItem value="Wearables">Wearables</SelectItem>
                  <SelectItem value="Storage">Storage</SelectItem>
                </SelectContent>
              </Select>
              {formErrors.category && <p className="text-sm text-red-500">{formErrors.category}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status" className="text-right">
                Status
              </Label>
              <Select
                value={newProduct.status}
                onValueChange={(value) => handleSelectChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="In Stock">In Stock</SelectItem>
                  <SelectItem value="Low Stock">Low Stock</SelectItem>
                  <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description" className="text-right">
                Description
              </Label>
              <Input
                id="edit-description"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
              />
            </div>
            <AlertDialogFooter className="gap-3">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteClick} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product
              {selectedProduct ? ` "${selectedProduct.name}"` : ''} from your product catalog.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProduct} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
} 